import { Quaternion, Vector3 } from "three";

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
export type Axis = "+x" | "-x" | "+y" | "-y" | "+z" | "-z";

export interface FaceDefinition {
  value: DieValue;
  axis: Axis;
  normal: readonly [number, number, number];
  pips: readonly (readonly [number, number])[];
}

// The same definitions drive pip geometry and top-face detection.
// Opposites: 1/6, 2/5, 3/4. Pip coordinates are in face-local units.
export const FACES: readonly FaceDefinition[] = [
  { value: 1, axis: "+y", normal: [0, 1, 0], pips: [[0, 0]] },
  { value: 6, axis: "-y", normal: [0, -1, 0], pips: [[-.28, -.32], [-.28, 0], [-.28, .32], [.28, -.32], [.28, 0], [.28, .32]] },
  { value: 2, axis: "-z", normal: [0, 0, -1], pips: [[-.28, -.28], [.28, .28]] },
  { value: 5, axis: "+z", normal: [0, 0, 1], pips: [[-.28, -.28], [.28, -.28], [0, 0], [-.28, .28], [.28, .28]] },
  { value: 3, axis: "+x", normal: [1, 0, 0], pips: [[-.28, -.28], [0, 0], [.28, .28]] },
  { value: 4, axis: "-x", normal: [-1, 0, 0], pips: [[-.28, -.28], [.28, -.28], [-.28, .28], [.28, .28]] },
];

export type QuaternionLike = { x: number; y: number; z: number; w: number };

export interface TopFace {
  value: DieValue;
  confidence: number;
  separation: number;
  valid: boolean;
}

export function detectTopFace(rotation: QuaternionLike): TopFace {
  const quaternion = new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w).normalize();
  const ranked = FACES.map((face) => ({
    value: face.value,
    dot: new Vector3(...face.normal).applyQuaternion(quaternion).y,
  })).sort((a, b) => b.dot - a.dot);
  const confidence = ranked[0].dot;
  const separation = confidence - ranked[1].dot;
  return { value: ranked[0].value, confidence, separation, valid: confidence >= 0.82 && separation >= 0.32 };
}

export function totalOf(values: readonly DieValue[]): number {
  return values.reduce<number>((total, value) => total + value, 0);
}
