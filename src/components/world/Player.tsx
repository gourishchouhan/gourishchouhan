import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { Group } from "three";
import { groundHeight } from "./terrain";
import { collide } from "./collision";
import { walkSpeed,runSpeed,walkingHeading,type WalkInput } from "./walking";
import { Character } from "./Character";
import { fit } from "./riderFit";
import { Bicycle } from "./Explorer";

function restOnGround(bike:Group,x:number,z:number,heading:number,parked:boolean){
  const sx=Math.sin(heading),cz=Math.cos(heading),half=fit.wheelbase/2;
  const front=groundHeight(x-sx*half,z-cz*half);
  const rear=groundHeight(x+sx*half,z+cz*half);
  const crossSlope=groundHeight(x+cz*.5,z-sx*.5)-groundHeight(x-cz*.5,z+sx*.5);
  bike.rotation.set(-Math.atan2(rear-front,fit.wheelbase),heading,Math.atan(crossSlope)-(parked?.11:0),"YXZ");
  bike.position.set(x,(front+rear)/2,z);
}

export const driveKeys=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"]);
export function Player({keys,walk,riding,onBikeRange}:{keys:RefObject<Set<string>>;walk:RefObject<WalkInput>;riding:boolean;onBikeRange:(close:boolean)=>void}){
  const actor=useRef<Group>(null!), parked=useRef<Group>(null!);
  const speed=useRef(0), phase=useRef(0), motion=useRef(0);
  const steering=useRef(0);
  const parkedPhase=useRef(0);
  const runBlend=useRef(0);
  const velocity=useRef({x:0,z:0});
  const inRange=useRef(false);
  const lastMode=useRef(false);
  useLayoutEffect(()=>{
    actor.current.rotation.y=Math.PI+.25;
    actor.current.position.set(0,groundHeight(0,4),4);
    restOnGround(parked.current,1.45,4.15,-.8,true);
  },[]);
  useLayoutEffect(()=>{
    if(lastMode.current===riding)return;
    const body=actor.current, bike=parked.current;
    if(riding){
      body.position.copy(bike.position);
      body.rotation.y=bike.rotation.y;
      phase.current=parkedPhase.current;
    }else{
      parkedPhase.current=phase.current;
      restOnGround(bike,body.position.x,body.position.z,body.rotation.y,true);
      const x=body.position.x,z=body.position.z;
      // Try either side, then behind, for a clear landing beside the parked bike.
      for(const angle of [0,Math.PI,Math.PI/2,-Math.PI/2]){
        const dir=body.rotation.y+angle;
        const next=collide(x,z,Math.cos(dir)*1.1,-Math.sin(dir)*1.1);
        if(Math.hypot(next.x-x,next.z-z)>.8){
          body.position.set(next.x,groundHeight(next.x,next.z),next.z);break;
        }
      }
    }
    velocity.current.x=velocity.current.z=runBlend.current=0;
    speed.current=0;motion.current=0;steering.current=0;lastMode.current=riding;
  },[riding]);
  useFrame(({camera,invalidate,size},delta)=>{
    const dt=Math.max(.00001,Math.min(delta,.08)),held=keys.current,body=actor.current;
    const forward=Number(held.has("KeyW")||held.has("ArrowUp"))-Number(held.has("KeyS")||held.has("ArrowDown"));
    const left=Number(held.has("KeyA")||held.has("ArrowLeft"))-Number(held.has("KeyD")||held.has("ArrowRight"));
    if(riding){
      speed.current+=(forward*7-speed.current)*(1-Math.exp(-dt*(forward?3:9)));
      steering.current+=(left*.52-steering.current)*(1-Math.exp(-dt*10));
      body.rotation.y+=speed.current*Math.tan(steering.current)/fit.wheelbase*dt;
    }else{
      const moving=Boolean(forward||left);
      const sprint=walk.current.running && held.has("KeyW") && forward>0;
      const pace=moving?(sprint?runSpeed:walkSpeed):0;
      const bearing=walkingHeading(left,forward);
      const response=1-Math.exp(-(moving?13:20)*dt);
      const v=velocity.current;
      v.x+=(-Math.sin(bearing)*pace-v.x)*response;
      v.z+=(-Math.cos(bearing)*pace-v.z)*response;
      speed.current=Math.hypot(v.x,v.z);
      if(speed.current<.025){v.x=v.z=speed.current=0;}
      if(moving){
        const turn=bearing-body.rotation.y;
        body.rotation.y+=Math.atan2(Math.sin(turn),Math.cos(turn))*(1-Math.exp(-16*dt));
      }
    }
    if(Math.abs(speed.current)<.015)speed.current=0;
    const heading=body.rotation.y;
    const vx=riding?-Math.sin(heading)*speed.current:velocity.current.x;
    const vz=riding?-Math.cos(heading)*speed.current:velocity.current.z;
    const next=collide(body.position.x,body.position.z,vx*dt,vz*dt);
    const distance=Math.hypot(next.x-body.position.x,next.z-body.position.z);
    runBlend.current+=((riding?0:Math.min(1,Math.max(0,(distance/dt-walkSpeed)/(runSpeed-walkSpeed))))-runBlend.current)*(1-Math.exp(-12*dt));
    const strideLength=1.23+.46*runBlend.current;
    phase.current+=riding?-distance/fit.wheelRadius*Math.sign(speed.current):distance*2*Math.PI/strideLength;
    motion.current+=(Math.min(1,distance/(dt*1.1))-motion.current)*(1-Math.exp(-dt*16));
    const y=groundHeight(next.x,next.z);
    if(riding)restOnGround(body,next.x,next.z,heading,false);
    else{
      body.position.set(next.x,y,next.z);
      body.rotation.set(0,heading,0,"YXZ");
    }
    const close=!riding && body.position.distanceTo(parked.current.position)<2.2;
    if(close!==inRange.current){inRange.current=close;onBikeRange(close);}
    const zoom=size.width<size.height?1.32:1;
    camera.position.set(next.x+5*zoom,y+8*zoom,next.z+15*zoom);
    camera.lookAt(next.x,y+1,next.z-2.5);
    if(speed.current||held.size||motion.current>.002||Math.abs(steering.current)>.002)invalidate();
  },-2);
  return <>
    <group ref={parked} visible={!riding}><Bicycle parked phase={parkedPhase}/></group>
    <group ref={actor}>{riding && <Bicycle phase={phase} steering={steering}/>}<Character runBlend={runBlend} steering={steering} riding={riding} phase={phase} motion={motion}/></group>
  </>;
}
