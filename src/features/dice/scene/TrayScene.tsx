"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody, RoundCuboidCollider, useAfterPhysicsStep, type RapierRigidBody } from "@react-three/rapier";
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { OrthographicCamera } from "three";
import { detectTopFace, type DieValue } from "../domain/faces";
import type { RollPhase } from "../domain/roll";
import { createThrowPlan, type ThrowDie, type ThrowPlan } from "../physics/throw";
import { PHYSICS, TRAY } from "../physics/config";
import { DieVisual } from "./Die";

type SceneProps = {
  count: number;
  plan: ThrowPlan | null;
  onPhase: (phase: RollPhase) => void;
  onComplete: (values: DieValue[]) => void;
  onImpact: (intensity: number) => void;
};

const FIXED_STEP = PHYSICS.fixedStep;

function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (!(camera instanceof OrthographicCamera)) return;
    const aspect = size.width / size.height;
    // Change the view, not the physical tray, when the viewport changes.
    const horizontal = aspect < 1.25 ? 10.2 : 11.6;
    camera.left = -horizontal / 2;
    camera.right = horizontal / 2;
    camera.top = horizontal / (2 * aspect);
    camera.bottom = -camera.top;
    camera.position.set(0, 16, 3.2);
    camera.lookAt(0, .5, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

function Tray() {
  const { halfWidth: w, halfDepth: d, wallHeight: h, wallThickness: t } = TRAY;
  const wallMaterial = <meshStandardMaterial color="#222b31" roughness={.9} metalness={.03}/>;
  return <RigidBody type="fixed" colliders={false} name="tray">
    <CuboidCollider args={[w + t, .2, d + t]} position={[0, -.2, 0]} friction={PHYSICS.floorFriction} restitution={PHYSICS.floorRestitution}/>
    <mesh receiveShadow position={[0, -.025, 0]}><boxGeometry args={[2 * (w + t), .05, 2 * (d + t)]}/><meshStandardMaterial color="#1b2429" roughness={1}/></mesh>
    {([-1, 1] as const).map((sign) => <group key={`x${sign}`}>
      <CuboidCollider args={[t / 2, h / 2, d + t]} position={[sign * (w + t / 2), h / 2, 0]} friction={PHYSICS.wallFriction} restitution={PHYSICS.wallRestitution}/>
      <mesh castShadow receiveShadow position={[sign * (w + t / 2), h / 2, 0]}><boxGeometry args={[t, h, 2 * (d + t)]}/>{wallMaterial}</mesh>
    </group>)}
    {([-1, 1] as const).map((sign) => <group key={`z${sign}`}>
      <CuboidCollider args={[w + t, h / 2, t / 2]} position={[0, h / 2, sign * (d + t / 2)]} friction={PHYSICS.wallFriction} restitution={PHYSICS.wallRestitution}/>
      <mesh castShadow={sign < 0} receiveShadow position={[0, h / 2, sign * (d + t / 2)]}><boxGeometry args={[2 * (w + t), h, t]}/>{sign > 0 ? <meshStandardMaterial color="#222b31" roughness={.9} metalness={.03} transparent opacity={.23} depthWrite={false}/> : wallMaterial}</mesh>
    </group>)}
  </RigidBody>;
}

function PhysicalDie({ die, register, onImpact, onFirstImpact }: {
  die: ThrowDie;
  register?: (id: number, body: RapierRigidBody | null) => void;
  onImpact?: (intensity: number) => void;
  onFirstImpact?: () => void;
}) {
  const body = useRef<RapierRigidBody>(null);
  const launched = useRef(false);
  useEffect(() => {
    const instance = body.current;
    if (!instance || !register || launched.current) return;
    launched.current = true;
    register(die.id, instance);
    instance.setAngvel(die.angularVelocity, true);
    instance.applyImpulse(die.impulse, true);
    instance.applyTorqueImpulse(die.torque, true);
    return () => register(die.id, null);
  }, [die, register]);

  return <RigidBody
    ref={body}
    name={`die-${die.id + 1}`}
    colliders={false}
    position={die.position}
    quaternion={[die.rotation.x, die.rotation.y, die.rotation.z, die.rotation.w]}
    linearDamping={PHYSICS.linearDamping}
    angularDamping={PHYSICS.angularDamping}
    canSleep
    ccd
    onCollisionEnter={onFirstImpact}
    onContactForce={onImpact ? (event) => onImpact(event.maxForceMagnitude) : undefined}
  >
    <RoundCuboidCollider args={[.43, .43, .43, .07]} friction={PHYSICS.dieFriction} restitution={PHYSICS.dieRestitution}/>
    <DieVisual/>
  </RigidBody>;
}

function IdleDice({ count }: { count: number }) {
  // Preview bodies are real rigid bodies. Gravity lets them find their own resting
  // poses, but they do not create a roll result or a history entry.
  const dice = useMemo(() => createThrowPlan(0, count).dice, [count]);
  return <>{dice.map((die) => <PhysicalDie key={die.id} die={die}/>)}</>;
}

function Throw({ plan, onPhase, onComplete, onImpact }: Omit<SceneProps, "count" | "plan"> & { plan: ThrowPlan }) {
  const bodies = useRef<(RapierRigidBody | null)[]>([]);
  const settledFor = useRef<number[]>(Array(plan.dice.length).fill(0));
  const ambiguousFor = useRef<number[]>(Array(plan.dice.length).fill(0));
  const published = useRef(false);
  const elapsed = useRef(0);
  const firstImpact = useRef(false);
  const phaseRef = useRef(onPhase);
  const completeRef = useRef(onComplete);
  const impactRef = useRef(onImpact);
  phaseRef.current = onPhase;
  completeRef.current = onComplete;
  impactRef.current = onImpact;

  const register = useCallback((id: number, body: RapierRigidBody | null) => { bodies.current[id] = body; }, []);
  const handleFirstImpact = () => {
    if (!firstImpact.current) { firstImpact.current = true; phaseRef.current("SETTLING"); }
  };

  useAfterPhysicsStep(() => {
    if (published.current || bodies.current.filter(Boolean).length !== plan.dice.length) return;
    elapsed.current += FIXED_STEP;
    let allStable = true;
    let allAtRest = true;
    let anyAmbiguous = false;
    const values: DieValue[] = [];
    for (let i = 0; i < plan.dice.length; i++) {
      const body = bodies.current[i]!;
      const linear = body.linvel();
      const angular = body.angvel();
      const linearSpeed = Math.hypot(linear.x, linear.y, linear.z);
      const angularSpeed = Math.hypot(angular.x, angular.y, angular.z);
      const face = detectTopFace(body.rotation());
      const lowMotion = body.isSleeping() || (linearSpeed < .12 && angularSpeed < .18);
      settledFor.current[i] = lowMotion && face.valid ? settledFor.current[i] + FIXED_STEP : 0;
      ambiguousFor.current[i] = lowMotion && !face.valid ? ambiguousFor.current[i] + FIXED_STEP : 0;
      if (settledFor.current[i] < .55) allStable = false;
      if (settledFor.current[i] < .55 && ambiguousFor.current[i] < 1.3) allAtRest = false;
      if (ambiguousFor.current[i] >= 1.3) anyAmbiguous = true;
      values.push(face.value);
    }
    if (allStable) {
      published.current = true;
      if (process.env.NODE_ENV !== "production") {
        console.debug("DiceRoll physical faces", bodies.current.map((body, i) => ({ die: i + 1, rotation: body?.rotation(), top: detectTopFace(body!.rotation()) })));
      }
      completeRef.current(values);
    } else if ((allAtRest && anyAmbiguous) || elapsed.current > 20) {
      published.current = true;
      phaseRef.current("UNRESOLVED");
    }
  });

  return <>{plan.dice.map((die) => <PhysicalDie key={die.id} die={die} register={register} onFirstImpact={handleFirstImpact} onImpact={(force) => impactRef.current(force)}/>)}</>;
}

export function TrayScene(props: SceneProps) {
  return <Canvas
    shadows
    orthographic
    camera={{ position: [0, 16, 3.2], near: .1, far: 60 }}
    dpr={[1, 1.75]}
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    style={{ width: "100%", height: "100%" }}
    aria-label="Three dimensional dice rolling tray"
  >
    <CameraRig/>
    <ambientLight intensity={1.3}/>
    <hemisphereLight args={["#ffffff", "#4a5557", 1.4]}/>
    <directionalLight position={[-4, 10, 5]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-.0002}/>
    <directionalLight position={[5, 7, -3]} intensity={.7}/>
    <Suspense fallback={null}>
      <Physics gravity={[0, PHYSICS.gravity, 0]} timeStep={FIXED_STEP} colliders={false}>
        <Tray/>
        {props.plan
          ? <Throw key={props.plan.id} plan={props.plan} onPhase={props.onPhase} onComplete={props.onComplete} onImpact={props.onImpact}/>
          : <IdleDice key={props.count} count={props.count}/>}
      </Physics>
    </Suspense>
  </Canvas>;
}
