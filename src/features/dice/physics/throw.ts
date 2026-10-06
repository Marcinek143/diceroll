import type { QuaternionLike } from "../domain/faces";

export interface ThrowDie {
  id: number;
  position: [number, number, number];
  rotation: QuaternionLike;
  impulse: { x: number; y: number; z: number };
  torque: { x: number; y: number; z: number };
  angularVelocity: { x: number; y: number; z: number };
}

export interface ThrowPlan { id: number; dice: ThrowDie[] }

function random() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / 4294967296;
}

function between(min: number, max: number) { return min + random() * (max - min); }

function uniformQuaternion(): QuaternionLike {
  const u = random(), v = random(), w = random();
  const a = Math.sqrt(1 - u), b = Math.sqrt(u), t = 2 * Math.PI;
  return { x: a * Math.sin(t * v), y: a * Math.cos(t * v), z: b * Math.sin(t * w), w: b * Math.cos(t * w) };
}

const slots: [number, number][] = [[-2.1, -.7], [2.1, -.7], [-2.1, .7], [2.1, .7]];

export function createThrowPlan(id: number, count: number): ThrowPlan {
  if (count < 1 || count > 4) throw new Error("Dice count must be between one and four.");
  const order = [...slots];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    id,
    dice: Array.from({ length: count }, (_, i) => {
      const [sx, sz] = order[i];
      const x = sx + between(-.3, .3), z = sz + between(-.12, .12);
      // Aim across the tray, with independent perturbations. No result is selected.
      const impulse = {
        x: -Math.sign(sx) * between(1.3, 2.7) + between(-.8, .8),
        y: between(1.1, 2.2),
        z: -Math.sign(sz) * between(.6, 1.35) + between(-.4, .4),
      };
      return {
        id: i,
        position: [x, between(1.05, 1.2) + i * .1, z] as [number, number, number],
        rotation: uniformQuaternion(),
        impulse,
        torque: { x: between(-1.8, 1.8), y: between(-1.8, 1.8), z: between(-1.8, 1.8) },
        angularVelocity: { x: between(-6, 6), y: between(-6, 6), z: between(-6, 6) },
      };
    }),
  };
}
