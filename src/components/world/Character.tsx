import {useMemo,useRef,type RefObject} from "react";
import {useFrame} from "@react-three/fiber";
import {Group,Mesh,Vector3,Vector2} from "three";
import {groundHeight} from "./terrain";
import {bendJoint,fit,gripTarget,pedalTarget} from "./riderFit";
import {Rod,type Point} from "./Explorer";

const up=new Vector3(0,1,0);
const skin="#ad7658", navy="#424b51", blazer="#204852", leather="#563e33";
function Oval({at,size,color}:{at:Point;size:Point;color:string}){
  return <mesh position={at} scale={size} castShadow><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={color}/></mesh>;
}
function segment(mesh:Mesh,start:Vector3,end:Vector3,axis:Vector3){
  axis.subVectors(end,start);
  mesh.scale.y=axis.length();
  mesh.quaternion.setFromUnitVectors(up,axis.normalize());
  mesh.position.copy(start).lerp(end,.5);
}

type PoseProps={runBlend:RefObject<number>;riding:boolean;phase:RefObject<number>;motion:RefObject<number>;steering:RefObject<number>};
function Limb({arm,side,riding,phase,motion,steering,runBlend}:PoseProps & {arm:boolean;side:number}){
  const upper=useRef<Mesh>(null!),lower=useRef<Mesh>(null!),joint=useRef<Mesh>(null!),tip=useRef<Group>(null!);
  const v=useMemo(()=>({
    root:new Vector3(),end:new Vector3(),bend:new Vector3(),worldFoot:new Vector3(),
    pole:new Vector3(side*.24,0,arm?1:-1),axis:new Vector3(),perp:new Vector3(),
  }),[arm,side]);
  useFrame(()=>{
    const {root,end,bend,pole,axis,perp}=v;
    const cycle=(phase.current/(2*Math.PI)+(side>0?.5:0))%1;
    const stance=.55-.13*runBlend.current;
    const length=1.23+.46*runBlend.current;
    const swing=Math.max(0,(cycle-stance)/(1-stance));
    // During stance the planted shoe moves back by the distance the body has travelled.
    const sweep=cycle<stance ? cycle-stance/2 : stance*(.5-swing*swing*(3-2*swing));
    const reach=sweep*length*motion.current;
    const lift=Math.sin(Math.PI*swing)*(.17+.13*runBlend.current)*motion.current;
    if(arm){
      root.set(side*.226,riding?1.61:1.44,riding?-.014:-.017);
      if(riding)gripTarget(end,side,steering.current);
      else end.set(side*.26,.76+.16*runBlend.current,-.035-reach*.78);
    }else{
      root.set(side*.15,riding?fit.seatY+.15:.92,riding?fit.seatZ-.015:0);
      if(riding){
        tip.current.rotation.x=0;
        pedalTarget(end,side,phase.current*.65);
        // Solve to the ankle, above and behind the ball of the foot on the pedal.
        end.y+=.115;end.z+=.064;
      }else{
        end.set(side*.15,.115+lift,.035+reach);
        v.worldFoot.copy(end);
        tip.current.parent!.localToWorld(v.worldFoot);
        end.y+=groundHeight(v.worldFoot.x,v.worldFoot.z)-(v.worldFoot.y-end.y);
        tip.current.rotation.x=-.15*Math.sin(swing*2*Math.PI)*motion.current;
      }
    }
    bendJoint(bend,root,end,pole,arm?.355:.46,arm?.38:.45,axis,perp);
    segment(upper.current,root,bend,axis);segment(lower.current,bend,end,axis);
    joint.current.position.copy(bend);tip.current.position.copy(end);
  });
  return <>
    <mesh ref={upper} castShadow><cylinderGeometry args={[arm?.083:.104,arm?.105:.125,1,12]}/><meshStandardMaterial color={arm?blazer:navy}/></mesh>
    <mesh ref={joint}><sphereGeometry args={[arm?.081:.10,12,8]}/><meshStandardMaterial color={arm?skin:navy}/></mesh>
    <mesh ref={lower} castShadow><cylinderGeometry args={[arm?.055:.074,arm?.078:.095,1,12]}/><meshStandardMaterial color={arm?blazer:navy}/></mesh>
    <group ref={tip}>{arm?<><Oval at={[0,0,0]} size={[.069,.062,.079]} color={skin}/>
      <Oval at={[0,.055,.007]} size={[.066,.031,.064]} color="#ece1ce"/>
      {side===-1 && <Oval at={[-.058,.062,.009]} size={[.016,.028,.026]} color="#ba9d66"/>}</>:<>
      <Oval at={[0,-.028,-.04]} size={[.103,.09,.18]} color={leather}/>
      <Oval at={[0,-.077,-.054]} size={[.105,.025,.178]} color="#cbb685"/>
      <Oval at={[0,.015,.034]} size={[.089,.088,.095]} color={leather}/>
    </>}</group>
  </>;
}

export function Character(props:PoseProps){
  const {riding}=props;
  const jacket=useMemo(()=>[[.17,0],[.205,.08],[.19,.19],[.24,.37],[.225,.48],[.13,.54]].map(([x,y])=>new Vector2(x,y)),[]);
  return <>
    <Oval at={[0,riding?fit.seatY+.15:.92,riding?fit.seatZ-.015:0]} size={[.225,.15,.178]} color={navy}/>
    <group position={[0,riding?1.21:.96,riding?.216:0]} rotation={[riding?-.43:-.03,0,0]}>
      <mesh castShadow scale={[1.1,1,.82]}><latheGeometry args={[jacket,18]}/><meshStandardMaterial color={blazer}/></mesh>
      <mesh position={[0,.065,0]} scale={[1,1,.85]}><cylinderGeometry args={[.218,.214,.043,18]}/><meshStandardMaterial color="#684b37"/></mesh>
      <Oval at={[0,.53,0]} size={[.105,.126,.095]} color={skin}/>
      <Oval at={[0,.456,-.13]} size={[.106,.097,.042]} color="#f2e5d0"/>
      <Rod from={[0,.465,-.17]} to={[.006,.36,-.175]} radius={.022} color="#8b573f"/>
      {[-1,1].map(side=><Rod key={side} from={[side*.125,.475,-.092]} to={[side*.019,.30,-.166]} radius={.026} color="#54716f"/>)}
      {[.24,.15].map(y=><Oval key={y} at={[.028,y,-.163]} size={[.015,.015,.009]} color="#c5aa71"/>)}
      <Rod from={[-.166,.367,-.134]} to={[-.093,.375,-.151]} radius={.014} color="#f3dfb8"/>
      <group position={[0,.69,-.015]} rotation={[riding?.32:0,0,0]}>
        <Oval at={[0,0,0]} size={[.173,.207,.16]} color={skin}/>
        <Oval at={[0,-.014,-.155]} size={[.038,.045,.047]} color="#b57a54"/>
        {[-1,1].map(side=><group key={side}>
          <Oval at={[side*.163,-.016,.006]} size={[.035,.052,.039]} color={skin}/>
          <Oval at={[side*.066,.013,-.147]} size={[.016,.020,.011]} color="#282e30"/>
          <Rod from={[side*.043,.053,-.149]} to={[side*.092,.052,-.136]} radius={.011} color="#3a302c"/>
        </group>)}
        <Oval at={[0,.11,.036]} size={[.178,.14,.159]} color="#44352e"/>
        <group rotation={[0,0,-.17]}>
          <Oval at={[-.043,.151,-.073]} size={[.145,.075,.104]} color="#4e3c32"/>
        </group>
        {[-1,1].map(side=><group key={side}>
          <group position={[side*.079,.016,-.173]} rotation={[0,-side*.14,0]} scale={[1,.85,1]}>
            <mesh><torusGeometry args={[.063,.0065,8,28]}/><meshStandardMaterial color="#b18a57" metalness={.45} roughness={.32}/></mesh>
            <mesh><circleGeometry args={[.06,28]}/><meshBasicMaterial color="#f5fcff" transparent opacity={.085} depthWrite={false} side={2}/></mesh>
          </group>
          <Rod from={[side*.142,.015,-.162]} to={[side*.172,.025,.044]} radius={.006} color="#986f48"/>
        </group>)}
        <Rod from={[-.024,.025,-.178]} to={[.024,.025,-.178]} radius={.006} color="#b18a57"/>
      </group>
    </group>
    {[-1,1].map(side=><group key={side}><Limb {...props} side={side} arm/><Limb {...props} side={side} arm={false}/></group>)}
  </>;
}
