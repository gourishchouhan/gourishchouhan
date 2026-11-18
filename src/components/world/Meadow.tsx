import {useLayoutEffect,useRef} from "react";
import {InstancedMesh,Matrix4,Color} from "three";
import {groundHeight,shoreDistance} from "./terrain";

export function Meadow(){
  const plants=useRef<InstancedMesh>(null!);
  useLayoutEffect(()=>{
    let seed=71;
    const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    let count=0;
    for(let i=0;i<1300;i++){
      const x=rand()*34-17,z=rand()*26-13;
      if(shoreDistance(x,z)<1.5 || Math.abs(x-.85*Math.sin(z*.6))<1.35 || (x>0&&Math.abs(z-3)<2))continue;
      for(let j=0;j<4;j++){
        const gx=x+rand()*.55,gz=z+rand()*.55,h=.10+rand()*.23;
        const matrix=new Matrix4().makeScale(.055+rand()*.06,h,.07);
        plants.current.setMatrixAt(count,matrix.setPosition(gx,groundHeight(gx,gz)+h*.4,gz));
        plants.current.setColorAt(count++,new Color(j===0?"#b6c784":"#6f9976"));
      }
    }
    plants.current.count=count;
    plants.current.instanceMatrix.needsUpdate=true;
    if(plants.current.instanceColor)plants.current.instanceColor.needsUpdate=true;
    plants.current.computeBoundingSphere();
  },[]);
  return <instancedMesh ref={plants} args={[undefined,undefined,5200]}><coneGeometry args={[1,1,3]}/><meshLambertMaterial/></instancedMesh>;
}
