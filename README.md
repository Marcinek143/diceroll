# DiceRoll

DiceRoll is a responsive D6 roller built with Next.js, React, Three.js, React Three Fiber, and Rapier. The original Stitch exports (`code.html`, `DESIGN.md`, and `screen.png`) remain design references.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. For a production build, run `npm run build` followed by `npm run start`.

## Physics and results

- Rapier owns die movement, rotation, contact response, and sleep state. Each throw creates new rigid bodies with independent positions, uniform random quaternions, linear impulses, angular impulses, and angular velocities.
- The selected dice are visible before rolling. These idle dice settle under Rapier gravity and do not publish a result; changing the quantity replaces them with the selected number of physical dice.
- The floor and four visible walls have matching fixed colliders. A rounded cuboid collider follows each rounded die.
- A roll completes only after every die maintains low motion and a clear upward face for at least 0.55 simulated seconds. A physically ambiguous or stalled roll is reported as unresolved without changing any die's position or orientation.
- `src/features/dice/domain/faces.ts` defines both pip placement and face detection. The detector rotates the six local face normals by the settled Rapier quaternion and selects the one most aligned with world up. The UI total and saved history derive from those readings.
- `src/features/dice/physics/config.ts` holds the tray and physics parameters shared by rendering and the headless simulation tests.
- In development builds, completed rolls log physical quaternions and detected faces to the browser console.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

The simulation test runs 160 randomized throws across one, two, three, and four dice, checking containment at every physics step. A rare die may genuinely come to rest in an ambiguous pose; the app reports that state instead of inventing a result.

The two ad placements are layout placeholders. No advertising provider is integrated.
