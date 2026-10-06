import { beforeAll, describe, expect, it } from "vitest";
import RAPIER from "@dimforge/rapier3d-compat";
import { detectTopFace } from "../domain/faces";
import { createThrowPlan } from "./throw";
import { PHYSICS, TRAY } from "./config";

beforeAll(async () => { await RAPIER.init(); });

function buildWorld() {
  const world = new RAPIER.World({ x: 0, y: PHYSICS.gravity, z: 0 });
  world.timestep = PHYSICS.fixedStep;
  const tray = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  const fixed = (half: [number, number, number], position: [number, number, number], friction: number, restitution: number) => {
    world.createCollider(RAPIER.ColliderDesc.cuboid(...half).setTranslation(...position).setFriction(friction).setRestitution(restitution), tray);
  };
  const { halfWidth: w, halfDepth: d, wallHeight: h, wallThickness: t } = TRAY;
  fixed([w + t, .2, d + t], [0, -.2, 0], PHYSICS.floorFriction, PHYSICS.floorRestitution);
  for (const s of [-1, 1]) {
    fixed([t / 2, h / 2, d + t], [s * (w + t / 2), h / 2, 0], PHYSICS.wallFriction, PHYSICS.wallRestitution);
    fixed([w + t, h / 2, t / 2], [0, h / 2, s * (d + t / 2)], PHYSICS.wallFriction, PHYSICS.wallRestitution);
  }
  return world;
}

describe("Rapier tray containment", () => {
  it("keeps repeated 1–4 dice throws inside the physical basin and lets dice settle", () => {
    const ambiguous: string[] = [];
    for (let count = 1; count <= 4; count++) {
      for (let trial = 0; trial < 40; trial++) {
        const world = buildWorld();
        const bodies = createThrowPlan(trial, count).dice.map((die) => {
          const body = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(...die.position)
            .setRotation(die.rotation)
            .setLinearDamping(PHYSICS.linearDamping)
            .setAngularDamping(PHYSICS.angularDamping)
            .setCcdEnabled(true));
          world.createCollider(RAPIER.ColliderDesc.roundCuboid(.43, .43, .43, .07).setFriction(PHYSICS.dieFriction).setRestitution(PHYSICS.dieRestitution), body);
          body.setAngvel(die.angularVelocity, true);
          body.applyImpulse(die.impulse, true);
          body.applyTorqueImpulse(die.torque, true);
          return body;
        });
        for (let step = 0; step < 600; step++) {
          world.step();
          for (const body of bodies) {
            const p = body.translation();
            expect(Math.abs(p.x), `count=${count} trial=${trial} step=${step} x`).toBeLessThan(TRAY.halfWidth - .2);
            expect(Math.abs(p.z), `count=${count} trial=${trial} step=${step} z`).toBeLessThan(TRAY.halfDepth - .2);
            expect(p.y, `count=${count} trial=${trial} step=${step} y`).toBeGreaterThan(.2);
          }
        }
        for (const body of bodies) {
          expect(body.isSleeping(), `count=${count} trial=${trial} did not sleep`).toBe(true);
          const top = detectTopFace(body.rotation());
          if (!top.valid) ambiguous.push(JSON.stringify({ count, trial, position: body.translation(), top }));
        }
        world.free();
      }
    }
    // A rare die can genuinely rest on an edge; the UI reports UNRESOLVED.
    expect(ambiguous.length).toBeLessThan(40);
  }, 60000);
});
