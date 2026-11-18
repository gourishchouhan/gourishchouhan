import {useEffect,useRef} from "react";
import {useFrame,useThree} from "@react-three/fiber";
import {Group} from "three";
export function Sky(){
  const sun=useRef<Group>(null!), birds=useRef<Group>(null!), clouds=useRef<Group>(null!);
  const time=useRef(0);
  const {invalidate}=useThree();
  const reduced=useRef(false);
  useEffect(()=>{
    const media=matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>{reduced.current=media.matches;invalidate();};
    sync();media.addEventListener("change",sync);
    return ()=>media.removeEventListener("change",sync);
  },[invalidate]);
  useFrame((_,dt)=>{
    if(!reduced.current)time.current+=Math.min(dt,.1);
    const t=time.current;
    sun.current.position.set(20*Math.cos(t*.015),23+4*Math.sin(t*.015),-55);
    clouds.current.position.x=Math.sin(t*.035)*6;
    birds.current.position.set(Math.sin(t*.24)*5,6+Math.sin(t*.52)*.5,-13+Math.cos(t*.24)*2);
    birds.current.children.forEach((bird,i)=>bird.children.forEach((wing,j)=>{
      wing.rotation.z=(j?1:-1)*(.25+Math.sin(t*7+i)*.45);
    }));
    if(!reduced.current && !document.hidden)invalidate();
  });
  return <>
    <group ref={sun}><mesh><sphereGeometry args={[2.5,24,16]}/><meshBasicMaterial color="#fff5be" fog={false}/></mesh></group>
    <group ref={clouds}>{Array.from({length:18},(_,i)=><group key={i} position={[Math.sin(i*2.4)*36,12+i%3,Math.cos(i*2.4)*36]}>
      <mesh scale={[4,1,1.5]}><sphereGeometry args={[1,12,8]}/><meshLambertMaterial color="#fffaf1"/></mesh>
      <mesh scale={[2,1,1.4]} position={[1,.6,.4]}><sphereGeometry args={[1,12,8]}/><meshLambertMaterial color="#fffaf1"/></mesh>
    </group>)}</group>
    <group ref={birds}>{[0,1,2].map(i=><group key={i} position={[i*1.1,i*.25,i*.7]}>
      {[-1,1].map(side=><group key={side}><mesh position={[side*.22,0,0]}><boxGeometry args={[.45,.08,.2]}/><meshLambertMaterial color="#384750"/></mesh></group>)}
    </group>)}</group>
  </>;
}
