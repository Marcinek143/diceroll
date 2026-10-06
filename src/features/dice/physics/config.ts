export const TRAY = { halfWidth: 4.4, halfDepth: 1.75, wallHeight: 2.8, wallThickness: .3 } as const;
export const PHYSICS = {
  gravity: -14,
  fixedStep: 1 / 60,
  linearDamping: .32,
  angularDamping: .45,
  dieFriction: .67,
  dieRestitution: .38,
  floorFriction: .75,
  floorRestitution: .22,
  wallFriction: .7,
  wallRestitution: .35,
} as const;
