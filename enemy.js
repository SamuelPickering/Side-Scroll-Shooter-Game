import { EnemyProjectile, testEP } from "./player.js";




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
            // // if(this.inversion === -1){
            // //     this.y += 200
            // }
        }
        if(this.id >= 7 && this.type !== "type0"){
            this.y += 200
            // console.log(this.y)
        }
        // if(this.inversion === -1){
        //     console.log(this.id)
        // }
        if(this.hasExhaust){
            this.exhaustFrame > 3 ? this.exhaustFrame = 0 : this.exhaustFrame++;
        }
 
    }
    
    draw(context){
        if(this.game.debug) context.strokeRect(this.x,this.y, this.width, this.height )
        if(this.uniframe){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }else{
        context.drawImage(this.image,this.frameX * this.width,this.frameY *  this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        if(this.hasExhaust){
            context.drawImage(this.exhaustImage, (this.exhaustFrame + this.frameOffset) * this.exhaustspWidth, 0, this.exhaustspWidth, this.exhaustspHeight, this. x - this.exhaustXOffset, this.y - this.exhaustYOffset, this.exhaustWidth, this.exhaustHeight)
        }

        if (this.game.debug){
            context.font = "20px Arial"
            context.fillText(this.lives, this.x, this.y)
        }
    }
    shootProjectile(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0))
    }
    startOffset(){
        this.x -= this.game.offset
    }
    vengeShot(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 2.25, 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0, 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, -2.25, 1))
        console.log("I'll have my vengeance")
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
    constructor(game, x, y, inversion, type, id){
       super(game)
       this.width = 115
       this.height = 95
       this.id = id
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
       this.exhaustXOffset =  -this.width / 1.5
       this.exhaustYOffset = -20
       this.exhaustImage = document.getElementById("ship2Exhaust")
       this.exhaustWidth = 32
       this.exhaustHeight = 32
       this.exhaustspWidth = 32
       this.exhaustspHeight = 32
       this.exhaustFrame = 0
       this.maxExhaustFrame = 3
       this.frameOffset = 0
       this.hasExhaust = true
       
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
       this.exhaustXOffset =  -this.width / 1.5
       this.exhaustYOffset = -20
       this.exhaustImage = document.getElementById("ship5Exhaust")
       this.exhaustWidth = 32
       this.exhaustHeight = 32
       this.exhaustspWidth = 32
       this.exhaustspHeight = 32
       this.exhaustFrame = 0
       this.maxExhaustFrame = 3
       this.frameOffset = 0
       this.hasExhaust = true
       
    }
}
class SprayShip extends Enemy {
    constructor(game, x,y, inversion, type){
        super(game)
        this.width = 115
        this.height = 95
        this.x = x
        this.y = y
        this.image = document.getElementById("ship3")
        this.inversion = inversion
        this.type = type
        this.uniframe = true
        this.speedX = -0.2
        this.yShot = 10
        this.xShot = -1
        this.shootInterval = 300
        this.shootTimer = 0
        this.isShooting = 1
        this.lives = 4
        this.score = 10
        this.bing = 1
        this.sprayCount = 8
        this.exhaustXOffset =  -this.width  + 15
        this.exhaustYOffset = -35
        this.exhaustImage = document.getElementById("ship3Exhaust")
        this.exhaustWidth = 32
        this.exhaustHeight = 32
        this.exhaustspWidth = 32
        this.exhaustspHeight = 32
        this.exhaustFrame = 0
        this.maxExhaustFrame = 3
        this.frameOffset = 0
        this.hasExhaust = true




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
        if(this.hasExhaust){
            this.exhaustFrame > 3 ? this.exhaustFrame = 0 : this.exhaustFrame++;
        }
        if(this.isShooting >= 1){
            if(this.shootTimer > this.shootInterval){
                if(this.yShot < -10){
                    this.bing = -1
                    this.xShot = 1
                }
                this.shootProjectile()
                
                this.shootTimer = 0
                this.yShot-= 0.2 * 9 * this.bing

            }else {
                if(this.onScreen){
                this.shootTimer += deltaTime
                }
            }
        }
  
    }
    shootProjectile(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,this.xShot, this.yShot, 1))
    }
    shootTest(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,this.xShot, 2., 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,this.xShot, 0., 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,this.xShot, -2., 1))
    }
    shootSpread(num){
        for(let i = 0; i < num; i++){
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 1 / num * i, 1, 4))
        }
    }
}
class ShipY extends Enemy {
    constructor(game, x,y, inversion, type){
        super(game)
        this.width = 115
        this.height = 95
        this.x = x
        this.y = y - this.height / 2
        this.image = document.getElementById("shipY")
        this.inversion = inversion
        this.type = type
        this.uniframe = true
        this.lives = 1
        this.score = 2
        this.speedY = 4
    }
    update(){
        this.y+= this.speedY * this.inversion
    }
}
class RevengeShip extends Enemy {
    constructor(game, x,y, inversion, type){
        super(game)
        this.width = 115
        this.height = 95
        this.x = x
        this.y = y 
        this.image = document.getElementById("revengeShip")
        this.inversion = inversion
        this.type = type
        this.uniframe = true
        this.lives = 3
        this.score = 2
        this.speedX = -2
        this.isShooting = 0
        this.onScreen = false
        this.vengeful = true
        this.exhaustXOffset =  -this.width / 1.5
        this.exhaustYOffset = -20
        this.exhaustImage = document.getElementById("vengeExhaust")
        this.exhaustWidth = 64
        this.exhaustHeight = 64
        this.exhaustspWidth = 64
        this.exhaustspHeight = 64
        this.exhaustFrame = 0
        this.maxExhaustFrame = 3
        this.frameOffset = 0
        this.hasExhaust = true
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
    startOffset(){
        console.log("kyfjf")
        this.x -= this.game.offset
    }
    
}
class Aliencu{
    constructor(game, x, inversion, type){
        this.game = game
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
        this.onScreen = false
        this.markedForDeletion = false
  
  
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
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if( this.x + this.width < 0) this.markedForDeletion = true;
            this.frame > 4 ? this.frame = 0 : this.frame++;
            this.x-= 4
        // }
        if(this.type === "type1"){
        this.y = this.curveRadius + (Math.sin(this.x * 0.01) * this.curveHeight) * this.inversion
        }
  
    }
    startOffset(){
        console.log("kyfjf")
        this.x -= this.game.offset
    }
    draw(context){
      context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }

  class AlienTarget {
    constructor(game, x, inversion, type){
        this.game = game
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
        this.frame = 0
        this.flapSpeed = 2
        this.y = 0
        this.targetY = 400
  }
  update(){
    // if(this.x - this.width < 1000){ // on screen
    //     this.onScreen = true
    // }
    if( this.x + this.width < 0) this.markedForDeletion = true;
        this.frame > 4 ? this.frame = 0 : this.frame++;
    this.y+= (this.targetY - this.y) / 50
    this.x += 5
  }
  draw(context){
    context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }

}

let gameFrame = 0

class AlienBu {
    constructor(game, angleOffset){
        this.game = game
        this.image = new Image()
        this.image.src = 'assets/enemy3.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 218
        this.spriteHeight = 177
        this.width = this.spriteWidth / 3
        this.height = this.spriteHeight / 3
        this.x = Math.random() * 2
        this.y = Math.random() * 2
        this.Xorigin = 300
        this.Yorigin = 300
        this.frame = 0
        this.flapSpeed = 3
        this.angle = 0
        this.angleSpeed = 2.5
        this.angleOffset = angleOffset
        console.log(this.angleOffset)
        this.yFlight = 0
        this.xFlight = 0
        this.lives = 2
        this.score = 2
        this.markedForDeletion = false
        //this.curve = Math.random() * 200 + 4

    }
    update(){
        this.x = 80 * Math.sin((this.angle + this.angleOffset) * Math.PI/200) + (this.Xorigin - this.width / 2) + this.xFlight
        this.y = 80 * Math.cos((this.angle + this.angleOffset) * Math.PI/200) + (this.Yorigin - this.height / 2) + this.yFlight
        this.angle += this.angleSpeed
        this.yFlight += 0
        this.xFlight += 0
        console.log(this.x)
        if( this.x + this.width < 0) this.markedForDeletion = true;
        //animate sprites
   
            this.frame > 4 ? this.frame = 0 : this.frame++;
        

    }
    draw(context){
      context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}



class Meteor {
    constructor(game){
        this.game = game
        this.x = 900
        this.y = Math.random() * 500
        this.image = document.getElementById("tempMeteor")
        this.speed = 5
        this.width = 64
        this.height = 64
        this.speedY =  Math.random() * (2 - -2) + -2
        this.lives = 2
        this.score = 2

    }
    update(){
        this.x -= this.speed
        this.y -= this.speedY
        if( this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}


export {Enemy, Angler1, Angler2, LuckyFish, HiveWhale, Drone, NewShip, NewShip5, Alien, Aliencu, SprayShip, AlienTarget, Meteor, ShipY, RevengeShip, AlienBu};




