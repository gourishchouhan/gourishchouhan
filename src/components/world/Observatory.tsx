import {useMemo,useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {Group} from "three";
import {observatory,groundHeight} from "./terrain";
import {Rod} from "./Explorer";

const brass="#e4b45c", verdigris="#32776d", ink="#243b43";
function Orbit({radius,tilt,color}:{radius:number;tilt:number;color:string}){
  return <group rotation={[tilt,0,.35]}>
    <mesh castShadow><torusGeometry args={[radius,.052,8,64]}/><meshStandardMaterial color={color} metalness={.27} roughness={.48}/></mesh>
    <mesh position={[radius,0,0]}><sphereGeometry args={[.16,14,10]}/><meshStandardMaterial color={color}/></mesh>
  </group>;
}
export function Observatory(){
  const instrument=useRef<Group>(null!),rotor=useRef<Group>(null!);
  const reduced=useMemo(()=>matchMedia("(prefers-reduced-motion: reduce)"),[]);
  useFrame((_,dt)=>{
    if(reduced.matches||document.hidden)return;
    rotor.current.rotation.z+=Math.min(dt,.1)*1.2;
    instrument.current.rotation.y+=Math.min(dt,.1)*.17;
  });
  return <group position={[observatory.x,groundHeight(observatory.x,observatory.z)-.38,observatory.z]}>
    <mesh receiveShadow castShadow><cylinderGeometry args={[1.95,2.15,.9,16]}/><meshStandardMaterial color="#696e76"/></mesh>
    <mesh position={[0,.65,0]} castShadow><cylinderGeometry args={[1.68,1.78,.44,16]}/><meshStandardMaterial color="#d4c9a9"/></mesh>
    <mesh position={[0,1.45,0]} castShadow><cylinderGeometry args={[1.44,1.61,1.25,16]}/><meshStandardMaterial color={ink}/></mesh>
    {Array.from({length:12},(_,i)=>{
      const a=i*Math.PI/6;
      return <group key={i} rotation={[0,a,0]}>
        <mesh position={[0,1.49,1.49]}><boxGeometry args={[.48,.71,.09]}/><meshStandardMaterial color={i%4?"#56a89b":"#e8ba72"}/></mesh>
        <mesh position={[.29,1.47,1.50]}><boxGeometry args={[.075,1.08,.13]}/><meshStandardMaterial color={brass}/></mesh>
      </group>;
    })}
    <mesh position={[0,2.17,0]} castShadow><cylinderGeometry args={[1.89,1.68,.26,16]}/><meshStandardMaterial color={verdigris}/></mesh>
    <mesh position={[0,2.56,0]} castShadow><cylinderGeometry args={[.49,1.85,.58,16]}/><meshStandardMaterial flatShading color="#487f72"/></mesh>
    <Rod from={[0,2.6,0]} to={[0,4.28,0]} radius={.11} color={brass}/>
    <group position={[0,4.22,0]} ref={instrument}>
      <Orbit radius={1.42} tilt={.31} color={brass}/>
      <Orbit radius={1.16} tilt={1.24} color="#70b6a6"/>
      <group rotation={[0,1.1,0]}><Orbit radius={.92} tilt={.51} color="#e5d4a3"/></group>
      <mesh><icosahedronGeometry args={[.36,1]}/><meshStandardMaterial color="#ffcd73" emissive="#ce8831" emissiveIntensity={.48}/></mesh>
    </group>
    <group rotation={[0,.46,0]}>
    <Rod from={[1.38,.82,.5]} to={[2.82,3.48,.92]} radius={.093} color={ink}/>
    <Rod from={[2.82,3.48,.92]} to={[2.82,3.48,1.28]} radius={.09} color={brass}/>
    <group position={[2.82,3.48,1.28]} ref={rotor}>
      {[0,1,2,3,4].map(i=><group rotation={[0,0,i*2*Math.PI/5]} key={i}>
        <Rod from={[0,0,0]} to={[0,1,0]} radius={.033} color={brass}/>
        <mesh position={[.11,.69,.03]} rotation={[.36,0,-.17]} scale={[.18,.47,.04]} castShadow>
          <sphereGeometry args={[1,8,6]}/><meshStandardMaterial color="#e8dbb6"/>
        </mesh>
      </group>)}
      <mesh><sphereGeometry args={[.125,12,8]}/><meshStandardMaterial color={brass}/></mesh>
    </group>
    </group>
  </group>;
}
