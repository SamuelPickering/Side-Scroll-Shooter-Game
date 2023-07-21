import {  Enemy, Aliencu } from "./enemy.js"


function spawnCu7(game, inversion){
    if(inversion === 1){
    game.cope.push(new Aliencu(game, 900, 440, "type7", 1, 0))
    game.cope.push(new Aliencu(game, 900, 540, "type7", 1, 0))
    game.cope.push(new Aliencu(game, 900, 640, "type7", 1, 0))
    game.cope.push(new Aliencu(game, 900, 740, "type7", 1, 0))
    game.cope.push(new Aliencu(game, 900, 840, "type7", 1, 0)) 
    }else {
        game.cope.push(new Aliencu(game, 100, 60, "type7", -1, 0))
        game.cope.push(new Aliencu(game, 100, -60, "type7", -1, 0))
        game.cope.push(new Aliencu(game, 100, -160, "type7", -1, 0))
        game.cope.push(new Aliencu(game, 100, -260, "type7", -1, 0))
        game.cope.push(new Aliencu(game, 100, -360, "type7", -1, 0))
    }
}


function spawnCu5 (game, inversion){
if(inversion === 1){
     game.cope.push(new Aliencu (game, 1200, 40, "type5", 1, 0))
     game.cope.push(new Aliencu (game, 1200 + 32 * 2, 40, "type5", 1, 0))
     game.cope.push(new Aliencu (game, 1200 + 32 * 4, 40, "type5", 1, 0))
} else {
     game.cope.push(new Aliencu (game, 1200, 460, "type5", -1, 0))

}
}

function spawnCu6 (game, inversion){
    if(inversion === 1){
        game.cope.push(new Aliencu (game, -200, 40, "type6", 1, 0))
        game.cope.push(new Aliencu (game, -200 + 32 * 2, 40, "type6", 1, 0))
        game.cope.push(new Aliencu (game, -200 + 32 * 4, 40, "type6", 1, 0))
    }else {
        game.cope.push(new Aliencu (game, -200, 440, "type6", -1, 0))
        game.cope.push(new Aliencu (game, -200 + 32 * 2, 440, "type6", -1, 0))
        game.cope.push(new Aliencu (game, -200 + 32 * 4, 440, "type6", -1, 0))
    }
}

export {spawnCu5, spawnCu6, spawnCu7}
