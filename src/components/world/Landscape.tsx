import { Coast } from "./Coast";
import { Observatory } from "./Observatory";
import { Landing } from "./Landing";
import { Meadow } from "./Meadow";
import { trees,groundHeight } from "./terrain";
import { HeadlandDetails } from "./HeadlandDetails";
export function Landscape(){
  return <>
    <Coast/><Meadow/><Observatory/><Landing/>
    {trees.map(([x,z],i)=><group key={x+":"+z} position={[x,groundHeight(x,z),z]} rotation={[0,i,0]}>
      <mesh castShadow position={[0,1,0]} rotation={[0,0,.09]}><cylinderGeometry args={[.17,.29,2,9]}/><meshStandardMaterial color="#354054"/></mesh>
      <mesh castShadow position={[-.36,1.66,.15]} rotation={[.15,0,.71]}><cylinderGeometry args={[.09,.17,1.1,7]}/><meshStandardMaterial color="#354054"/></mesh>
      <mesh castShadow position={[.72,2.16,-.22]} scale={[.81,.78,.71]}><icosahedronGeometry args={[1,1]}/><meshStandardMaterial flatShading color="#66a36d"/></mesh>
      <mesh castShadow position={[.24,2.8,0]} scale={[1.12,1.03+.23*(i%3),1.04]}><icosahedronGeometry args={[1,1]}/><meshStandardMaterial flatShading color={i%2?"#549565":"#357c5c"}/></mesh>
      <mesh castShadow position={[-.66,2.12,.31]} scale={[.88,.76,.82]}><icosahedronGeometry args={[1,0]}/><meshStandardMaterial flatShading color="#91b96a"/></mesh>
    </group>)}
    {trees.map(([x,z],i)=><group key={i} position={[x,groundHeight(x,z),z]}>
      <mesh position={[1.2,.17,.4]} scale={[.65,.32,.48]} castShadow><dodecahedronGeometry args={[1]}/><meshStandardMaterial flatShading color="#9392b0"/></mesh>
      <mesh position={[.7,.25,-.8]} scale={[.48,.42,.56]} castShadow><icosahedronGeometry args={[1,0]}/><meshStandardMaterial flatShading color="#779662"/></mesh>
    </group>)}
    <HeadlandDetails/>
    {Array.from({length:6},(_,i)=>{
      const angle=2.8+i*.72;
      return <group key={i} position={[Math.cos(angle)*48,-1.65,Math.sin(angle)*45]} rotation={[0,i,0]}>
        <mesh scale={[6+i%3,3+i%2,4]}><icosahedronGeometry args={[1,2]}/><meshStandardMaterial flatShading color="#777696"/></mesh>
        <mesh position={[3,0,1]} scale={[3,2.5,2.8]}><icosahedronGeometry args={[1,1]}/><meshStandardMaterial flatShading color="#777696"/></mesh>
      </group>;
    })}
  </>;
}
