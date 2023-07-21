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



export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.spacebarPressed = false;

    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight') &&
        !this.game.keys.includes(e.key)
      ) {
        this.game.keys.push(e.key);
      }

      if (e.key === ' ') {
        if (!this.spacebarPressed) {
          this.spacebarPressed = true;
          this.game.player.shootTop();
          console.log('shooting');
        }
      } else if (e.key === 'd') {
        this.game.debug = !this.game.debug;
      } else if (e.key === 'x') {
        if (!this.game.player.special) {
          this.game.player.shootLaser();
        }
      } else if (e.key === 'c') {
        console.log('if u');
        this.game.player.isSwitching = true;
      } else if (e.key === 'Enter' && this.game.gameOver) {
        this.game.restartGame();
      } else if (e.key === 'p' || e.key === 'P') {
        this.game.pause();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.game.keys.includes(e.key)) {
        console.log(this.game.keys.indexOf(e.key));
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }

      if (e.key === ' ') {
        this.spacebarPressed = false;
      }
    });
  }
}