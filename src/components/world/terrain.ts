export const observatory = {x:-4.7,z:-6.5};

export function shoreDistance(x:number,z:number) {
  // Stretch only the coast ahead of spawn. Keep the harbor and the southern beach in place.
  const north=Math.min(1,Math.max(0,(-z-3)/16));
  const localZ=z/(1+.82*north*north*(3-2*north));
  const angle=Math.atan2(localZ/12,x/17);
  const rim=1+.13*Math.sin(3*angle+.5)+.08*Math.cos(5*angle)-.09*Math.sin(2*angle);
  return (rim-Math.hypot(x/17,localZ/12))*13;
}

export function groundHeight(x:number,z:number) {
  const d=shoreDistance(x,z);
  const interior=Math.max(0,Math.min(1,d/4));
  const headland=2.4*Math.exp(-((x+5)**2+(z+7)**2)/26);
  const meadow=.8+.23*Math.sin(x*.45)+.18*Math.cos(z*.5);
  return Math.min(0,d)*.45+Math.min(1.1,Math.max(0,d)*.34)+interior*(headland+meadow);
}

export const trees:[number,number][]=[
  [-8,-4],[-9,-2],[-7,-5],[-11,2],[-10,4],[-8,5],[4,-7],[5.5,-7.5],
  [7,-6],[8.4,-7.3],[12,-2],[13,-1],[11,6],[9,7],[-4,8],[-5,7],
].filter(([x,z])=>shoreDistance(x,z)>1) as [number,number][];

export const headlandRocks=[
  {x:-2.9,z:-13.1,halfX:.91,halfZ:.62,height:.86},
  {x:2.8,z:-16.5,halfX:1.12,halfZ:.74,height:1.22},
  {x:3.9,z:-17.2,halfX:.57,halfZ:.45,height:.6},
];
