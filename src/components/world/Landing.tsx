import { groundHeight,shoreDistance } from "./terrain";

// Run a timber landing out from the eastern beach.
export function Landing(){
  const z=3;
  let shore=10;
  while(shoreDistance(shore,z)>.65)shore+=.1;
  const deck=groundHeight(shore,z);
  return <group position={[shore,deck,z]}>
    {Array.from({length:17},(_,i)=><mesh castShadow receiveShadow key={i} position={[i*.28,0,0]}>
      <boxGeometry args={[.26,.13,1.25]}/><meshStandardMaterial color={i%3?"#ac9183":"#c3a99a"}/>
    </mesh>)}
    {[0,2.25,4.48].map(x=><group key={x}>{[-.59,.59].map(side=><mesh castShadow key={side} position={[x,-.35,side]}>
      <cylinderGeometry args={[.085,.11,1.55,8]}/><meshStandardMaterial color="#494654"/>
    </mesh>)}</group>)}
    <group position={[3,-deck+.09,1.32]} rotation={[0,.19,0]}>
      <mesh scale={[1.35,.25,.48]}><sphereGeometry args={[1,12,6]}/><meshStandardMaterial color="#b96c64" flatShading/></mesh>
      <mesh position={[0,.13,0]} scale={[1.15,.13,.36]}><sphereGeometry args={[1,12,6]}/><meshStandardMaterial color="#584e60"/></mesh>
      {[-.45,.4].map(x=><mesh key={x} position={[x,.24,0]}><boxGeometry args={[.19,.055,.65]}/><meshStandardMaterial color="#dfbe9f"/></mesh>)}
    </group>
  </group>;
}
