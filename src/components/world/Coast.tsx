import { useEffect,useMemo,useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, PlaneGeometry, ShaderMaterial } from "three";
import { groundHeight, shoreDistance } from "./terrain";

function surface(water:boolean){
  const size=water?160:72;
  const grid=water?256:240;
  const geo=new PlaneGeometry(size,size,grid,grid);
  geo.rotateX(-Math.PI/2);
  const positions=geo.attributes.position;
  const distances=new Float32Array(positions.count);
  for(let i=0;i<positions.count;i++){
    const x=positions.getX(i), z=positions.getZ(i);
    distances[i]=shoreDistance(x,z);
    positions.setY(i,water?.015:groundHeight(x,z));
  }
  geo.setAttribute("shore",new BufferAttribute(distances,1));
  geo.computeVertexNormals();
  return geo;
}

const vertex=`
attribute float shore;
varying vec3 point;
varying float coast;
void main(){
  point=position; coast=shore;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}`;

const waterFragment=`
uniform float time;
varying vec3 point;
varying float coast;
void main(){
  float depth=max(-coast,0.);
  vec3 water=mix(vec3(.26,.70,.67),vec3(.095,.48,.53),smoothstep(.3,9.,depth));
  float wave=sin(point.x*.85+time*.7)*.055+sin(point.z*1.4-time*.9)*.055;
  float swash=.20+.11*sin(time*1.15);
  float rim=1.-smoothstep(.035,.095,abs(depth+wave-swash));
  float ripple=1.-smoothstep(.025,.095,abs(fract(depth*.64-time*.1+wave)-.5));
  float broken=smoothstep(.05,.8,sin(point.x*.8+point.z*1.5)+.35);
  water=mix(water,vec3(.72,.91,.88),rim*.92+ripple*broken*.50*exp(-depth*.24));
  float streak=sin(point.z*6.+sin(point.x*.44+time*.4)*1.4-time*.7);
  water+=.07*smoothstep(.96,1.,streak)*smoothstep(.78,1.,sin(point.x*.65+point.z*.8));
  float haze=smoothstep(30.,74.,distance(cameraPosition,point));
  gl_FragColor=vec4(mix(water,vec3(.667,.62,.835),haze),1.);
}`;

export function Coast(){
  const land=useMemo(()=>surface(false),[]);
  const sea=useMemo(()=>surface(true),[]);
  const water=useRef<ShaderMaterial>(null!);
  const uniforms=useMemo(()=>({time:{value:0}}),[]);
  const reduced=useMemo(()=>matchMedia("(prefers-reduced-motion: reduce)"),[]);
  useFrame((_,dt)=>{if(!reduced.matches)water.current.uniforms.time.value+=Math.min(dt,.1);});
  useEffect(()=>()=>{land.dispose();sea.dispose();},[land,sea]);
  return <>
    <mesh geometry={land} receiveShadow>
      <meshStandardMaterial color="#656384" roughness={1} customProgramCacheKey={()=>"harbor-contours-v1"} onBeforeCompile={shader=>{
        shader.vertexShader="attribute float shore; varying vec3 terrainPoint; varying float inland;\n"+shader.vertexShader;
        shader.vertexShader=shader.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>\nterrainPoint=position; inland=shore;");
        shader.fragmentShader="varying vec3 terrainPoint; varying float inland;\n"+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
          vec2 p=terrainPoint.xz;
          float h=terrainPoint.y;
          float band=abs(fract(h/.29+.5)-.5);
          float contour=1.-smoothstep(.015,.045+fwidth(h)*2.,band);
          float field=.5+.5*sin(p.x*.39+p.y*.21)*cos(p.y*.46);
          diffuseColor.rgb*=mix(vec3(.84,.93,1.),vec3(.77,1.15,1.03),field);
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.28,.30,.44),contour*.57);
          float wet=1.-smoothstep(.15,1.25,inland);
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.25,.235,.34),wet);
          float lane=abs(p.x-.85*sin(p.y*.6));
          vec2 branch=vec2(clamp(p.x,0.,10.),3.+.8*sin(clamp(p.x,0.,10.)*.55));
          float track=min(max(lane,max(-21.-p.y,p.y-7.)),length(p-branch));
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.47,.43,.47),1.-smoothstep(.74,1.05,track));
        `);
      }}/>
    </mesh>
    <mesh geometry={sea}><shaderMaterial ref={water} uniforms={uniforms} vertexShader={vertex} fragmentShader={waterFragment}/></mesh>
  </>;
}
