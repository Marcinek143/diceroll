"use client";

import { RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import { Quaternion, Vector3 } from "three";
import { FACES } from "../domain/faces";

const FRONT = new Vector3(0, 0, 1);

export function DieVisual() {
  const faceRotations = useMemo(() => FACES.map((face) => new Quaternion().setFromUnitVectors(FRONT, new Vector3(...face.normal))), []);
  return <group>
    <RoundedBox args={[1, 1, 1]} radius={.095} smoothness={5} castShadow receiveShadow>
      <meshPhysicalMaterial color="#f8f5ee" roughness={.34} metalness={0} clearcoat={.12} clearcoatRoughness={.5}/>
    </RoundedBox>
    {FACES.map((face, index) => <group key={face.value} quaternion={faceRotations[index]}>
      {face.pips.map(([x, y], pipIndex) => <group key={pipIndex} position={[x, y, .501]}>
        <mesh position={[0, 0, -.001]}><circleGeometry args={[.067, 24]}/><meshBasicMaterial color="#d2c7b9"/></mesh>
        <mesh position={[0, 0, .001]}><circleGeometry args={[.052, 24]}/><meshStandardMaterial color="#20252b" roughness={.88}/></mesh>
      </group>)}
    </group>)}
  </group>;
}
