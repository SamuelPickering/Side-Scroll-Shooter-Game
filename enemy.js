import { EnemyProjectile } from "./player.js";




export default  class Enemy {
    constructor(game){
        this.game = game;
        this.x = this.game.width
        this.speedX = 2
        this.markedForDeletion = false
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 37
        this.onScreen = false
    }
    update(deltaTime){
        this.x += this.speedX - this.game.speed
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if( this.x + this.width < 0) this.markedForDeletion = true;
        // sprite animation
        if(this.frameX < this.maxFrame){
            this.frameX++
        }else this.frameX = 0
        if(this.isShooting >= 1){
            if(this.shootTimer > this.shootInterval){
                this.shootProjectile()
                this.shootTimer = 0
            }else {
                if(this.onScreen){
                this.shootTimer += deltaTime
                }
            }
        }
        if(this.type === "type1"){
            this.y = this.curveRadius + (Math.sin(this.x * 0.01) * this.curveHeight) * this.inversion
        }
    }
    
    draw(context){
        if(this.game.debug) context.strokeRect(this.x,this.y, this.width, this.height )
        if(this.uniframe){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }else{
        context.drawImage(this.image,this.frameX * this.width,this.frameY *  this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }

        if (this.game.debug){
            context.font = "20px Arial"
            context.fillText(this.lives, this.x, this.y)
        }
    }
    shootProjectile(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,0))
    }
}
class Angler1 extends Enemy {
    constructor(game){
       super(game)
       this.width = 228 
       this.height = 169 
       this.y = Math.random() * (this.game.height * 0.95 - this.height)
       this.image = document.getElementById("angler1")
       this.frameY = Math.floor(Math.random() * 3)
       this.lives = 2
       this.score = this.lives

    }
}


class Angler2 extends Enemy {
    constructor(game){
       super(game)
       this.width = 213
       this.height = 165 
       this.y = Math.random() * (this.game.height * 0.95 - this.height)
       this.image = document.getElementById("ship2")
       this.frameY = Math.floor(Math.random() * 2)
       this.lives = 3
       this.score = this.lives
       this.item = true
       this.uniframe = true     //meaning only 1 frame

    }
}
class LuckyFish extends Enemy {
    constructor(game){
       super(game)
       this.width = 99
       this.height = 95
       this.y = Math.random() * (this.game.height * 0.95 - this.height)
       this.image = document.getElementById("lucky")
       this.frameY = Math.floor(Math.random() * 2)
       this.lives = 15
       this.score = this.lives
       this.type = "lucky"

    }
}

class HiveWhale extends Enemy {
    constructor(game){
       super(game)
       this.width = 400
       this.height = 227
       this.y = Math.random() * (this.game.height * 0.95 - this.height)
       this.image = document.getElementById("hivewhale")
       this.frameY = 0
       this.lives = 15
       this.score = this.lives
       this.type = "hive"
       this.speedX = Math.random() * -1.2 - 0.2

    }
}

class Drone extends Enemy {
    constructor(game, x, y){
       super(game)
       this.width = 115
       this.height = 95
       this.x = x
       this.y = y
       this.image = document.getElementById("drone")
       this.frameY = Math.floor(Math.random() * 2)
       this.lives = 3
       this.score = this.lives
       this.type = "drone"
       this.speedX = Math.random() * -4.2 - 0.5

    }
}

class NewShip extends Enemy {
    constructor(game, x, y, inversion, type){
       super(game)
       this.width = 115
       this.height = 95
       this.x = x
       this.y = y
       this.inversion = inversion
       this.type = type
       this.image = document.getElementById("ship2")
       this.frameY = Math.floor(Math.random() * 2)
       this.lives = 3
       this.score = this.lives
       this.speedX = -2
       this.item = true
       this.uniframe = true  
       this.shootInterval = 2000
       this.shootTimer = 0
       this.curve1 = false
       this.curveHeight = 80
       // this.curveCenterX = canvas.width / 2
       this.curveRadius = 500 / 2 - this.curveHeight;
       this.isShooting = Math.floor(Math.random() * 2)
       this.hasParts = true
       this.parts = document.getElementById("ship2Part")
       
    }
}
class NewShip5 extends Enemy {
    constructor(game, x, y, inversion, type){
       super(game)
       this.width = 115
       this.height = 95
       this.x = x
       this.y = y
       this.inversion = inversion
       this.type = type
       this.image = document.getElementById("ship5")
       this.frameY = Math.floor(Math.random() * 2)
       this.lives = 6
       this.score = this.lives
       this.speedX = -1.5
       this.item = false
       this.uniframe = true  
       this.shootInterval = 2000
       this.shootTimer = 0
       this.curve1 = false
       this.curveHeight = 80
       // this.curveCenterX = canvas.width / 2
       this.curveRadius = 500 / 2 - this.curveHeight;
       this.isShooting = 1
       this.hasParts = true
       this.parts = document.getElementById("ship5Part")
       
    }
}
class Alien {
    constructor(game){
        this.game = game
        this.image = new Image()
        this.image.src = 'assets/inverted alientest.png'
        this.speed = 5
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.width = this.spriteWidth / 4
        this.height = this.spriteHeight / 4
        this.x = 700
        this.y = 300
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 2
        // this.angleSpeed = Math.random() * 0.2
        // this.curve = Math.random() * 7
        this.isMovingLeft = true
        this.curveHeight = 100
        this.curveCenterX = 1000 / 2 // the 1000 is canvas width
        this.curveRadius = 500 / 2 - this.curveHeight; // the 500 is canvas height
        this.bing = false    //optimize this trash later
        this.bingCounter = 0
        this.lBing = false
        this.lBingCounter = false
        this.direction = -1
        this.bings = 0
        this.lives = 3
        this.score = this.lives
        this.markedForDeletion = false
        this.shootInterval = 2000
        this.shootTimer = 0
        this.onScreen = false

    }
    update(deltaTime){
        // if (this.isMovingLeft) {
            this.x += this.speed * this.direction; // Move to the left
        //   } else {
        //     this.x += this.speed; // Move to the right
        //   }
        
          // Curve upwards
          if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
          if (this.x <= 0 && this.bings < 4) {
            if(this.bings === 3){
                this.markedForDeletion = true
            }
            this.direction = 1; // Switch direction to right
            this.bing = true
            this.bings++
          } else if (this.x >= 1000 && this.bings < 4) {
            // this.Lbing = true
            if(this.bings === 3){
                this.markedForDeletion = true
            }
            this.direction = -1; // Switch direction to left
            this.bing = true
            this.bings++
          }
          if(this.bing){
            if(this.bingCounter > 20){
                this.bing = false
                this.bingCounter = 0
            }
            this.y -= this.direction * this.speed
            this.bingCounter++
          }

        // if(gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        // }

        if(this.shootTimer > this.shootInterval){
            this.shootProjectile()
            this.shootTimer = 0
        }else {
            if(this.onScreen){
            this.shootTimer += deltaTime
            }
        }

    }
    draw(context){
      context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    shootProjectile(){

        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y + this.height / 2, 0))
    }
}
class Aliencu{
    constructor(x, inversion, type){
        this.x = x
        this.inversion = inversion
        this.type = type
        this.image = new Image()
        this.image.src = 'assets/inverted alientest.png'
        this.speed = 5
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.width = this.spriteWidth / 4
        this.height = this.spriteHeight / 4
        this.y = 230
        this.frame = 0
        this.flapSpeed = 2
        this.angle = Math.random() * 2
        // this.angleSpeed = Math.random() * 0.2
        // this.curve = Math.random() * 7
        this.isMovingLeft = true
        this.curveHeight = 80
        // this.curveCenterX = canvas.width / 2
        this.curveRadius = 500 / 2 - this.curveHeight;
        this.bing = false    //optimize this trash later
        this.bingCounter = 0
        this.lBing = false
        this.lBingCounter = false
        this.direction = -1
        this.bings = 0
        this.sin =  Math.sin(this.x) * 3
        this.sinHeight = 2
        this.frequency = 2
  
  
    }
    update(){
        // // if (this.isMovingLeft) {
        //     this.x += this.speed * this.direction; // Move to the left
        // //   } else {
        // //     this.x += this.speed; // Move to the right
        // //   }
        
        //   // Curve upwards
        //   if (this.x <= 0 && this.bings < 3) {
        //     this.direction = 1; // Switch direction to right
        //     this.bing = true
        //     this.bings++
        //   } else if (this.x >= canvas.width && this.bings < 3) {
        //     // this.Lbing = true
        //     this.direction = -1; // Switch direction to left
        //     this.bing = true
        //     this.bings++
        //   }
        //   if(this.bing){
        //     if(this.bingCounter > 20){
        //         this.bing = false
        //         this.bingCounter = 0
        //     }
        //     this.y -= this.direction * this.speed
        //     this.bingCounter++
        //   }
        // if(gameFrame % this.flapSpeed === 0){ fix later
            this.frame > 4 ? this.frame = 0 : this.frame++;
            this.x-= 4
        // }
        if(this.type === "type1"){
        this.y = this.curveRadius + (Math.sin(this.x * 0.01) * this.curveHeight) * this.inversion
        }
  
    }
    draw(context){
      context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }


export {Enemy, Angler1, Angler2, LuckyFish, HiveWhale, Drone, NewShip, NewShip5, Alien, Aliencu};




