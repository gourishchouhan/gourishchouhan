import { AmbientLight, DirectionalLight, Mesh, MeshPhongMaterial, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, SRGBColorSpace, TextureLoader, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export async function mountEarth(canvas:HTMLCanvasElement) {
  const texture=await new TextureLoader().loadAsync("/earth-surface.webp");
  texture.colorSpace=SRGBColorSpace;
  const renderer=new WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setSize(420,420,false);
  const scene=new Scene();
  const globe=new Mesh(new SphereGeometry(1,64,48),new MeshPhongMaterial({map:texture,shininess:8}));
  scene.add(globe,new AmbientLight(0xffffff,1.6));
  const lat=22*Math.PI/180,lon=79*Math.PI/180;
  const india=new Vector3(Math.cos(lat)*Math.cos(lon),Math.sin(lat),-Math.cos(lat)*Math.sin(lon));
  const marker=new Mesh(new SphereGeometry(.029,16,12),new MeshBasicMaterial({color:"#ffcf6c"}));
  marker.position.copy(india).multiplyScalar(1.009);scene.add(marker);
  const camera=new PerspectiveCamera(34,1,.1,12);
  camera.position.copy(india).multiplyScalar(3.6);
  const light=new DirectionalLight(0xfff4dc,2);
  light.position.copy(camera.position).add(new Vector3(-2,3,1));scene.add(light);
  const controls=new OrbitControls(camera,canvas);
  controls.enablePan=false;controls.enableZoom=false;controls.rotateSpeed=.7;
  const render=()=>renderer.render(scene,camera);
  controls.addEventListener("change",render);
  controls.update();render();
  return (key:string)=>{
    if(key==="ArrowLeft" || key==="ArrowRight")camera.position.applyAxisAngle(camera.up,key==="ArrowLeft"?-.18:.18);
    else {
      const axis=new Vector3().crossVectors(camera.position,camera.up).normalize();
      const angle=controls.getPolarAngle();
      camera.position.applyAxisAngle(axis,Math.max(-angle+.03,Math.min(Math.PI-angle-.03,key==="ArrowUp"?-.15:.15))*-1);
    }
    controls.update();
  };
}
