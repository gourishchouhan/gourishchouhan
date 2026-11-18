import { useLayoutEffect,useRef } from "react";
import { Color,InstancedMesh,Object3D } from "three";
import { groundHeight,headlandRocks } from "./terrain";

const patches=[[-1.7,-3.2],[2.1,-10],[-3.8,-13.4],[2.5,-18.4]] as const;
const blossoms=patches.flatMap(([x,z],patch)=>Array.from({length:5},(_,i)=>{
  const a=i*2.4+patch;
  const px=x+Math.cos(a)*.19*Math.sqrt(i),pz=z+Math.sin(a)*.19*Math.sqrt(i);
  return {x:px,z:pz,y:groundHeight(px,pz),h:.18+.045*((i+patch)%3),color:patch%2?"#f3cb73":"#eee9ce"};
}));

export function HeadlandDetails(){
  const petals=useRef<InstancedMesh>(null!),stems=useRef<InstancedMesh>(null!);
  useLayoutEffect(()=>{
    const pose=new Object3D();
    blossoms.forEach(({x,y,z,h,color},i)=>{
      pose.position.set(x,y+h/2,z);pose.scale.set(.014,h,.014);pose.updateMatrix();
      stems.current.setMatrixAt(i,pose.matrix);
      for(let k=0;k<6;k++){
        const a=2*Math.PI*k/5;
        const center=k===5;
        pose.position.set(x+(center?0:.049*Math.cos(a)),y+h+(center?.017:0),z+(center?0:.049*Math.sin(a)));
        pose.scale.setScalar(center?.039:.053);pose.scale.y*=.48;pose.updateMatrix();
        petals.current.setMatrixAt(i*6+k,pose.matrix);
        petals.current.setColorAt(i*6+k,new Color(center?"#b58636":color));
      }
    });
    for(const mesh of [petals.current,stems.current]){mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();}
    if(petals.current.instanceColor)petals.current.instanceColor.needsUpdate=true;
  },[]);
  return <>
    {headlandRocks.map(({x,z,halfX,halfZ,height})=><mesh key={x} position={[x,groundHeight(x,z)+height*.23,z]} scale={[halfX,height*.77,halfZ]} castShadow receiveShadow>
      <icosahedronGeometry args={[1,1]}/><meshStandardMaterial flatShading color="#8c8ea3"/>
    </mesh>)}
    <instancedMesh ref={stems} args={[undefined,undefined,blossoms.length]}><cylinderGeometry args={[1,1,1,5]}/><meshStandardMaterial color="#55774f"/></instancedMesh>
    <instancedMesh ref={petals} args={[undefined,undefined,blossoms.length*6]}><icosahedronGeometry args={[1,1]}/><meshStandardMaterial/></instancedMesh>
  </>;
}
