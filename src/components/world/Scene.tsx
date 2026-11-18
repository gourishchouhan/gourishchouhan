import { useEffect, type ComponentProps } from "react";
import { useThree } from "@react-three/fiber";
import { Player } from "./Player";
import { Landscape } from "./Landscape";
import { Sky } from "./Sky";

export function Scene({wake,onLost,...player}:ComponentProps<typeof Player> & {
  wake:(fn:()=>void)=>void; onLost:()=>void;
}){
  const {invalidate,gl}=useThree();
  useEffect(()=>{
    wake(invalidate);
    const canvas=gl.domElement;
    canvas.addEventListener("webglcontextlost",onLost);
    return ()=>{canvas.removeEventListener("webglcontextlost",onLost);wake(()=>{});};
  },[wake,invalidate,gl,onLost]);
  return <>
    <color attach="background" args={["#aa9ed5"]}/>
    <fog attach="fog" args={["#aa9ed5",26,76]}/>
    <hemisphereLight args={["#fff1dc","#807b97",1.35]}/>
    <directionalLight castShadow position={[-10,15,-7]} intensity={1.8}
      shadow-mapSize-width={1024} shadow-mapSize-height={1024}
      shadow-camera-left={-24} shadow-camera-right={24} shadow-camera-top={24} shadow-camera-bottom={-24} shadow-normalBias={.035}/>
    <Sky/><Landscape/><Player {...player}/>
  </>;
}
