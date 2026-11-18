export const walkSpeed = 2.65;
export const runSpeed = 5.15;
const doubleTapWindow = 300;

export class WalkInput {
  running = false;
  private previousPress = -Infinity;
  pressForward(now:number){
    this.running = now - this.previousPress <= doubleTapWindow;
    this.previousPress = this.running ? -Infinity : now;
  }
  releaseForward(){ this.running=false; }
  reset(){ this.running=false; this.previousPress=-Infinity; }
}

// The follow camera looks along the ground from (5, 17.5) toward the character.
const viewAngle=Math.atan2(5,17.5);
export function walkingHeading(left:number,forward:number){
  return Math.atan2(left,forward)+viewAngle;
}
