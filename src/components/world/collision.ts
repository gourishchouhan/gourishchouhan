

import { trees, headlandRocks, observatory, shoreDistance } from "./terrain";

// Expand each solid footprint by the player's half-width for swept point tests.
const solids = [
  {x:observatory.x,z:observatory.z,halfX:1.95,halfZ:1.95},
  ...trees.map(([x, z]) => ({ x, z, halfX: .35, halfZ: .35 })),
  ...headlandRocks,
].map(({ x, z, halfX, halfZ }) => ({
  left: x - halfX - .68, right: x + halfX + .68,
  back: z - halfZ - .68, front: z + halfZ + .68,
}));

// Resolve each axis against the first face crossed. Diagonal input slides along walls.
export function collide(x: number, z: number, dx: number, dz: number) {
  let nextX = x + dx;
  for (const box of solids) {
    if (z <= box.back || z >= box.front) continue;
    if (x <= box.left) nextX = Math.min(nextX, box.left);
    if (x >= box.right) nextX = Math.max(nextX, box.right);
  }
  let nextZ = z + dz;
  for (const box of solids) {
    if (nextX <= box.left || nextX >= box.right) continue;
    if (z <= box.back) nextZ = Math.min(nextZ, box.back);
    if (z >= box.front) nextZ = Math.max(nextZ, box.front);
  }
  if (shoreDistance(nextX,z)<.8) nextX=x;
  if (shoreDistance(nextX,nextZ)<.8) nextZ=z;
  return { x: nextX, z: nextZ };
}
