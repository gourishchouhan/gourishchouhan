import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Quaternion, Vector3 } from "three";

import { fit } from "./riderFit";

export type Point = [number,number,number];
export function Rod({from,to,radius,color}:{from:Point;to:Point;radius:number;color:string}){
  const a=new Vector3(...from), b=new Vector3(...to);
  const direction=b.clone().sub(a);
  const rotation=new Quaternion().setFromUnitVectors(new Vector3(0,1,0),direction.clone().normalize());
  return <mesh castShadow position={a.lerp(b,.5)} quaternion={rotation}>
    <cylinderGeometry args={[radius,radius,direction.length(),8]}/><meshStandardMaterial color={color}/>
  </mesh>;
}

function Wheel({z,phase}:{z:number;phase:RefObject<number>}){
  const wheel=useRef<Group>(null!);
  useFrame(()=>{wheel.current.rotation.x=phase.current;});
  return <group position={[0,.39,z]} ref={wheel}>
    <mesh rotation={[0,Math.PI/2,0]} castShadow><torusGeometry args={[.35,.045,8,32]}/><meshStandardMaterial color="#252e32"/></mesh>
    <mesh rotation={[0,Math.PI/2,0]}><torusGeometry args={[.318,.018,6,32]}/><meshStandardMaterial color="#e6d5af"/></mesh>
    {Array.from({length:6},(_,i)=><mesh key={i} rotation={[i*Math.PI/6,0,0]}><cylinderGeometry args={[.009,.009,.64,5]}/><meshStandardMaterial color="#ced3cd"/></mesh>)}
  </group>;
}
export function Bicycle({phase,steering,parked=false}:{phase:RefObject<number>;steering?:RefObject<number>;parked?:boolean}){
  const crankset=useRef<Group>(null!);
  const fork=useRef<Group>(null!), platforms=useRef<Group>(null!);
  useFrame(()=>{
    const angle=phase.current*.65;
    crankset.current.rotation.x=angle;
    for(const crank of platforms.current.children)crank.children[0].rotation.x=-angle;
    fork.current.rotation.y=steering?.current ?? 0;
  });
  const frame=useMemo(()=>({
    rear:[0,.39,.65], front:[0,.39,-.65], crank:[0,fit.crankY,fit.crankZ], seat:[0,.96,.28], stem:[0,.97,fit.forkZ]
  } satisfies Record<string,Point>),[]);
  const {rear,front,crank,seat,stem}=frame;
  return <group>
    <Wheel z={rear[2]} phase={phase}/>
    <group position={[0,0,fit.forkZ]} ref={fork}><group position={[0,0,-fit.forkZ]}>
      <Wheel z={front[2]} phase={phase}/>
      <Rod from={stem} to={front} radius={.044} color="#dda537"/>
      <Rod from={stem} to={[0,fit.gripY,fit.gripZ]} radius={.037} color="#425451"/>
      <Rod from={[-fit.gripX,fit.gripY,fit.gripZ]} to={[fit.gripX,fit.gripY,fit.gripZ]} radius={.038} color="#463b32"/>
    </group></group>
    {([[rear,crank],[rear,seat],[crank,seat],[crank,stem],[seat,stem]] as [Point,Point][]).map(([a,b],i)=><Rod key={i} from={a} to={b} radius={.046} color="#e5a62f"/>)}
    <group position={crank} ref={crankset}>
      {[-1,1].map(side=><group key={side}>
        <Rod from={[side*.13,0,0]} to={[side*.13,side*fit.crankLength,0]} radius={.025} color="#475259"/>
      </group>)}
      <group ref={platforms}>{[-1,1].map(side=><group key={side} position={[side*fit.pedalX,side*fit.crankLength,0]}>
        <group><mesh><boxGeometry args={[.14,.045,.12]}/><meshStandardMaterial color="#332f2d"/></mesh></group>
      </group>)}</group>
    </group>
    {parked && <Rod from={[0,.42,.25]} to={[-.26,.01,.41]} radius={.022} color="#475259"/>}
    <mesh position={[0,fit.seatY,fit.seatZ]} scale={[.16,.065,.25]}><sphereGeometry args={[1,14,8]}/><meshStandardMaterial color="#653f2d"/></mesh>
    <mesh position={[0,1.0,-.72]} castShadow><cylinderGeometry args={[.22,.16,.25,8]}/><meshStandardMaterial flatShading color="#ba8050"/></mesh>
    <mesh position={[0,1.14,-.72]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.17,.22,8]}/><meshStandardMaterial color="#ebc68b"/></mesh>
  </group>;
}

