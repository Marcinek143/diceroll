import { describe, expect, it } from "vitest";
import { createThrowPlan } from "./throw";

describe("physical throw planning", () => {
  it("spawns one to four dice within the tray and gives each an independent impulse", () => {
    for (let count = 1; count <= 4; count++) {
      const plan = createThrowPlan(count, count);
      expect(plan.dice).toHaveLength(count);
      for (const die of plan.dice) {
        expect(Math.abs(die.position[0])).toBeLessThan(3);
        expect(Math.abs(die.position[2])).toBeLessThan(1.5);
        expect(die.position[1]).toBeGreaterThan(1);
        expect(die.impulse.y).toBeGreaterThan(0);
        const q = die.rotation;
        expect(Math.hypot(q.x, q.y, q.z, q.w)).toBeCloseTo(1, 5);
      }
    }
  });
});
