import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { driveKeys } from "./Player";
import { WalkInput } from "./walking";

const unavailable = <p role="status">The 3D view is unavailable. You can access the portfolio and résumé above.</p>;
class GraphicsBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? unavailable : this.props.children; }
}

function Experience() {

  const keys = useRef(new Set<string>());
  const invalidate = useRef(() => {});
  const stage = useRef<HTMLDivElement>(null);
  const walk = useRef(new WalkInput());
  const [riding,setRiding]=useState(false);
  const [bikeInRange,setBikeInRange]=useState(false);
  const [lost, setLost] = useState(false);
  const onLost = useCallback(() => setLost(true), []);
  const wake = useCallback((fn: () => void) => { invalidate.current = fn; }, []);
  const clearInput=useCallback(()=>{
    keys.current.clear();
    walk.current.reset();
  },[]);
  useEffect(() => {
    if (document.activeElement === document.body) stage.current?.focus({ preventScroll: true });
    const clear = clearInput;
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      clear();
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [clearInput]);
  function toggleBicycle(){
    if(!riding && !bikeInRange)return;
    clearInput();
    setRiding(!riding);
    stage.current?.focus({preventScroll:true});
    invalidate.current();
  }
  function press(code:string){
    if(!riding && code==="KeyW" && !keys.current.has(code))walk.current.pressForward(performance.now());
    keys.current.add(code);
    invalidate.current();
  }
  function release(code:string){
    keys.current.delete(code);
    if(code==="KeyW")walk.current.releaseForward();
  }
  if (lost) return unavailable;
  return <>
    <div className="stage" ref={stage} role="application" aria-label="Portfolio world" aria-describedby="controls" tabIndex={0}
      onPointerDown={() => stage.current?.focus({preventScroll:true})}
      onBlur={clearInput}
      onKeyDown={event => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.code === "KeyB" && !event.repeat) toggleBicycle();

        if (!driveKeys.has(event.code)) return;
        event.preventDefault();

        if(!event.repeat)press(event.code);
      }}
      onKeyUp={event => release(event.code)}>
      <Canvas shadows camera={{position:[5,9,17],fov:44,near:.05,far:110}} frameloop="demand" dpr={[1,1.5]} gl={{antialias:true,alpha:true}}
        fallback={unavailable}>
        <Scene riding={riding} onBikeRange={setBikeInRange} keys={keys} walk={walk} wake={wake} onLost={onLost}/>
      </Canvas>
    </div>
    <div className="world-controls">
      <p id="controls">{riding ? "W / S to cycle, A / D to steer" : "WASD / arrows to walk / double-tap W to run"}</p>
      <div className="touch-pad" aria-label="Movement controls">
        {([["KeyW","Forward","\u2191"],["KeyA","Left","\u2190"],["KeyS","Back","\u2193"],["KeyD","Right","\u2192"]] as const).map(([code,label,icon]) =>
          <button key={code} aria-label={label} onPointerDown={event=>{
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            press(code);
          }} onLostPointerCapture={()=>release(code)}>{icon}</button>)}
      </div>
      {(riding || bikeInRange) && <button onClick={toggleBicycle}>{riding ? "Park bicycle" : "Ride bicycle"} <kbd>B</kbd></button>}
    </div>
  </>;
}
export default function WorldExperience() {
  return <GraphicsBoundary><Experience/></GraphicsBoundary>;
}

