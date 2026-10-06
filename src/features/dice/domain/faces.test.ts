import { describe, expect, it } from "vitest";
import { Quaternion, Vector3 } from "three";
import { detectTopFace, FACES, totalOf } from "./faces";

describe("canonical D6 faces", () => {
  it("has the standard opposing pairs and the correct number of visible pips", () => {
    const byAxis = Object.fromEntries(FACES.map((face) => [face.axis, face.value]));
    expect(byAxis["+x"] + byAxis["-x"]).toBe(7);
    expect(byAxis["+y"] + byAxis["-y"]).toBe(7);
    expect(byAxis["+z"] + byAxis["-z"]).toBe(7);
    for (const face of FACES) expect(face.pips).toHaveLength(face.value);
  });

  for (const face of FACES) {
    it(`reads ${face.value} when its local face points upward`, () => {
      const rotation = new Quaternion().setFromUnitVectors(new Vector3(...face.normal), new Vector3(0, 1, 0));
      expect(detectTopFace(rotation)).toMatchObject({ value: face.value, valid: true });
    });
  }

  it("rejects an edge-balanced orientation", () => {
    const rotation = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 4);
    expect(detectTopFace(rotation).valid).toBe(false);
  });

  it("adds only the detected face values", () => {
    expect(totalOf([5, 2, 6])).toBe(13);
  });
});
