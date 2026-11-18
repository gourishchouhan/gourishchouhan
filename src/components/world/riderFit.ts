import { Vector3 } from "three";

export const fit = {
  seatY: 1.02, seatZ: .27, crankY: .43, crankZ: .08,
  crankLength: .16, pedalX: .20, gripX: .31, gripY: 1.19, gripZ: -.40,
  forkZ: -.46, wheelRadius: .39, wheelbase: 1.30,
};

export function pedalTarget(out:Vector3,side:number,angle:number){
  return out.set(side*fit.pedalX,fit.crankY+side*fit.crankLength*Math.cos(angle),
    fit.crankZ+side*fit.crankLength*Math.sin(angle));
}

export function gripTarget(out:Vector3,side:number,steer:number){
  const x=side*fit.gripX,z=fit.gripZ-fit.forkZ;
  return out.set(x*Math.cos(steer)+z*Math.sin(steer),fit.gripY,
    fit.forkZ-x*Math.sin(steer)+z*Math.cos(steer));
}

// Intersect two circles in the limb's bend plane. The pole selects the knee/elbow side.
export function bendJoint(out:Vector3,root:Vector3,end:Vector3,pole:Vector3,
  upper:number,lower:number,axis:Vector3,bend:Vector3){
  axis.subVectors(end,root);
  const distance=Math.max(.0001,axis.length());
  axis.divideScalar(distance);
  bend.copy(pole).addScaledVector(axis,-pole.dot(axis)).normalize();
  const along=(upper*upper-lower*lower+distance*distance)/(2*distance);
  return out.copy(root).addScaledVector(axis,along)
    .addScaledVector(bend,Math.sqrt(Math.max(0,upper*upper-along*along)));
}
