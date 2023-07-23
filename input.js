//  export default class InputHandler {
//     constructor(game){
//         this.game = game;
//         window.addEventListener('keydown', e => {
//             if( (e.key === "ArrowUp" ||
//                 e.key === "ArrowDown" || e.key === "ArrowLeft" ||
//                 e.key === "ArrowRight"
//             )
//              && !this.game.keys.includes(e.key)){
//                 this.game.keys.push(e.key)
//             }  if (e.key === " "){
//                 this.game.player.shootTop()
//                 console.log("shooting")
//             } else if (e.key === "d"){
//                 this.game.debug = !this.game.debug
//             }else if (e.key === "x"){
//                 if(!this.game.player.special){
//                 this.game.player.shootLaser()
//             }
//             } else if (e.key === "c"){
//                 console.log("if u")
//                 this.game.player.isSwitching = true
//             } else if (e.key === "Enter" && this.game.gameOver){
//                 this.game.restartGame()
//             } else if (e.key === "p" || e.key === "P"){
//                 this.game.pause()
//             }
            
//         })
//         window.addEventListener('keyup', e =>{
//             if(this.game.keys.includes(e.key)){
//                 console.log(this.game.keys.indexOf(e.key))
//                 this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
//             }
            
//         })
//         // window.addEventListener('keyup', e =>{
//         //     if(this.game.keys.includes(e.key)){
//         //         this.game.keys.splice(this.game.keys.indexOf(e.key, 1), 1)
//         //     }
           
//         // })
//     }
// }



// export default class InputHandler {
//   constructor(game) {
//     this.game = game;
//     this.spacebarPressed = false;

//     window.addEventListener('keydown', (e) => {
//       if (
//         (e.key === 'ArrowUp' ||
//           e.key === 'ArrowDown' ||
//           e.key === 'ArrowLeft' ||
//           e.key === 'ArrowRight') &&
//         !this.game.keys.includes(e.key)
//       ) {
//         this.game.keys.push(e.key);
//       }

//       if (e.key === ' ') {
//         if (!this.spacebarPressed) {
//           this.spacebarPressed = true;
//           this.game.player.shootTop();
//           console.log('shooting');
//         }
//       } else if (e.key === 'd') {
//         this.game.debug = !this.game.debug;
//       } else if (e.key === 'x') {
//         if (!this.game.player.special) {
//           this.game.player.shootLaser();
//         }
//       } else if (e.key === 'c') {
//         console.log('if u');
//         this.game.player.isSwitching = true;
//       } else if (e.key === 'Enter' && this.game.gameOver) {
//         this.game.restartGame();
//       } else if (e.key === 'p' || e.key === 'P') {
//         this.game.pause();
//       }
//     });

//     window.addEventListener('keyup', (e) => {
//       if (this.game.keys.includes(e.key)) {
//         console.log(this.game.keys.indexOf(e.key));
//         this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
//       }

//       if (e.key === ' ') {
//         this.spacebarPressed = false;
//       }
//     });
//   }
// }



//  class InputHandler1 {
//   constructor(game) {
//     this.game = game;
//     this.spacebarPressed = false;
//     console.log(this.game)
//     console.log(this.game.player.vx)
//     addEventListener("keydown", function(e){
//       if(e.code === "KeyD") this.game.player.vx = 5
//       if(e.code === "KeyA")  this.game.player.vx = -5
//       if(e.code === "KeyW") this.game.player.vy = 5
//       if(e.code === "KeyS") this.game.player.vy = -5
//       if (e.code === "Space") this.game.player.shootTop();
//     })
    
//     addEventListener("keyup", function(e){
//       if(e.code === "KeyD") this.game.player.vx = 0
//       if(e.code === "KeyA")  this.game.player.vx = 0
//       if(e.code === "KeyW") this.game.player.vy = 0
//       if(e.code === "KeyS") this.game.player.vy = 0
//       if (e.code === "Space") this.spacebarPressed = false
//     })
    
//   }
// }


class InputHandler1 {
  constructor(game) {
    this.game = game;
    this.spacebarPressed = false;
    this.left = false
    this.right = false
    this.up = false
    this.down = false
    this.vx = 0
    this.vy = 0

    // Arrow function for keydown event listener
    addEventListener("keydown", (e) => {
      if (e.code === "KeyD") this.right = true
      if (e.code === "KeyA") this.left = true
      if (e.code === "KeyW") this.up = true
      if (e.code === "KeyS") this.down = true
      if (e.code === "Space") this.spacebarPressed = true
      if (e.code === "KeyP") this.game.pause();
      if (e.code === "KeyJ") this.game.playBoss(2)
      if (e.code === "KeyK") this.game.playBoss(3)
      if (e.code === "KeyL") this.game.playBoss(4)
    });

    // Arrow function for keyup event listener
    addEventListener("keyup", (e) => {
      if (e.code === "KeyD") this.right = false
      if (e.code === "KeyA") this.left = false
      if (e.code === "KeyW") this.up = false
      if (e.code === "KeyS") this.down = false
      if (e.code === "Space") this.spacebarPressed = false;
    });
  }

  update(){
    this.vx = 0
    this.vy = 0
    if(this.spacebarPressed) this.game.player.shootTop()
    if(this.left) this.vx = -4
    if(this.right) this.vx = 4
    if(this.up) this.vy = -4
    if(this.down) this.vy = 4
    if(this.vx !== 0 && this.vy !== 0){
      this.vx /= 1.38
      this.vy /= 1.38
    }
    this.game.player.vx = this.vx
    this.game.player.vy = this.vy
  }
}







export {InputHandler1}