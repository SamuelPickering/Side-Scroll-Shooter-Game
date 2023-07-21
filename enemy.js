import { Aim, EnemyProjectile, testEP, VerticalAimed, VerticalAimed2,SizeVProjectile, Bomb, TopSinDown, CurveBullet, SinRadiusProjectile, testEPCircle, TriLine, StaggeredAim } from "./player.js";




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
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if(this.onScreen){
        this.x += this.speedX - this.game.speed
        // if(this.x - this.width < 1000){ // on screen
        //     this.onScreen = true
        // }
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
            this.y = this.curveRadius + (Math.sin(this.x * 0.02) * this.curveHeight) * this.inversion + this.Yorigin
        }else if (this.type === "type2"){
            this.x +=  -this.game.speed
            this.y -= 0.75 * this.inversion
            
        }
        // if(this.id >= 7 && this.type !== "type0"){
        //     this.y += 200
        //     // console.log(this.y)                      //Lets see if commenting this makes anything bug out
        // }
        // if(this.inversion === -1){
        //     console.log(this.id)
        // }
        // console.log(this.type)
        // console.log(this.x, this.y)
        if(this.hasExhaust){
            this.exhaustFrame > 3 ? this.exhaustFrame = 0 : this.exhaustFrame++;
        }
        } else {
            this.x += -1.5 - this.game.speed
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
        // this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 2.25, 1))
        // this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0, 1))
        // this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, -2.25, 1))
        let off = 6 * 2
        
        for(let i = 0; i < off; i++){
            let offed = 1 / off * i * 400
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 3))
            
        }
        console.log("I'll have my vengeance")
    }
    aimShot(){
        //Bruh
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
    constructor(game, x, y, inversion, type, id, isShooting=0){
       super(game)
       this.width = 128 //115
       this.height = 128 //95
       this.id = id
       this.x = x
       this.y = y
       this.inversion = inversion
       this.type = type
       this.image = document.getElementById("ship2")
       this.frameY = Math.floor(Math.random() * 2)
       this.hitboxWidth = 90
       this.hitboxHeight = 90
       this.hitBoxOffsetX = 0
       this.hitboxOffsetY = 0
       this.lives = 2
       this.score = this.lives
       this.speedX = -1.5
       this.item = true
       this.uniframe = true  
       this.shootInterval = 2000
       this.shootTimer = 0
       this.curve1 = false
       this.Yorigin = this.y
       this.curveHeight = 80
       // this.curveCenterX = canvas.width / 2
       this.curveRadius = 500 / 2 - this.curveHeight;
       this.isShooting =   isShooting              //Math.floor(Math.random() * 2)
       this.hasParts = true
       this.parts = document.getElementById("ship2Part")
       this.exhaustXOffset =  -this.width / 1.5 -12
       this.exhaustYOffset = -48
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
       this.width =  128           //115
       this.height =  128          //95
       this.x = x
       this.y = y
       this.hitboxWidth = 90
       this.hitboxHeight = 90
       this.hitBoxOffsetX = 0
       this.hitboxOffsetY = 0
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
       this.Yorigin = this.y
       this.isShooting = 1
       this.hasParts = true
       this.parts = document.getElementById("ship5Part")
       this.exhaustXOffset =  -this.width / 1.5 -29
       this.exhaustYOffset = -54
       this.exhaustImage = document.getElementById("ship5Exhaust")
       this.exhaustWidth = 40
       this.exhaustHeight = 40
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
        this.hitboxWidth = 90
        this.hitboxHeight = 90
        this.hitBoxOffsetX = 0
        this.hitboxOffsetY = 0
        this.image = document.getElementById("ship3")
        this.inversion = inversion
        this.type = type
        this.uniframe = true
        this.speedX = 1
        this.yShot = 10
        this.xShot = -1
        this.shootInterval = 1000
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
        
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if(this.onScreen){
            this.x += this.speedX - this.game.speed
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
                    // this.shootProjectile()
                    // this.shootSpread(8)
                    // this.shootSpreadHalf(5)
                    // this.aimedShot()
                    // this.topDown()
                    this.shootCurveBullet()
                    
                    this.shootTimer = 0
                    this.yShot-= 0.2 * 9 * this.bing

                }else {
                    if(this.onScreen){
                    this.shootTimer += deltaTime
                    }
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
        
        for(let i = num; i < num; i++){
            let offed = 1 / num * i * 400
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed))
            console.log( offed)
        }
    }
    shootSpreadHalf(num){
        let off = num * 2
        
        for(let i = num; i < off; i++){
            let offed = 1 / off * i * 400
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed))
            console.log( offed)
        }
    }
    aimedShot(){
        let tago = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
        if (tago < 0) { tago += 2 * Math.PI ; }
        console.log(tago)

        console.log("tago is : " + tago)
        this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago))
        for(let i = 4; i <= 8; i++){
            this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago / 6 * i))
        }


        let directionX = this.game.player.y - this.y
        let directionY = this.game.player.x - this.x
        directionX /= length
        directionY /= length

        
    }
    aimedSpreadHalf5(){
    let tago = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
    if (tago < 0) { tago += 2 * Math.PI ; }
    console.log(tago)

    console.log("tago is : " + tago)
    this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago))
    for(let i = 4; i <= 8; i++){
        this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago / 6 * i))
        }
   }
   topDown(){
    this.game.enemyProjectiles.push(new TopSinDown(this.game, this.x, this.y, 100, 50, 1.5))
    this.game.enemyProjectiles.push(new TopSinDown(this.game, this.x, this.y, 300, 50, 1.5))
    this.game.enemyProjectiles.push(new TopSinDown(this.game, this.x, this.y, 500, 50, 1.5))
    this.game.enemyProjectiles.push(new TopSinDown(this.game, this.x, this.y, 700, 50, 1.5))
    this.game.enemyProjectiles.push(new TopSinDown(this.game, this.x, this.y, 900, 50, 1.5))
   }
   shootCurveBullet(){
    this.game.enemyProjectiles.push(new CurveBullet(this.game, this.x, this.y, 2.0, 1))
    this.game.enemyProjectiles.push(new CurveBullet(this.game, this.x, this.y, 2.0, -1))

   }
}
class MultiShotShip extends Enemy {
    constructor(game, x, y){
        super(game)
        this.x = x
        this.y = y
        this.width = 115
        this.height = 95
        this.hitboxWidth = 90
        this.hitboxHeight = 90
        this.hitBoxOffsetX = 0
        this.hitboxOffsetY = 0
        this.speedX = -0.5
        this.image = new Image()
        this.image.src = "assets/multi shot ship.png"
        this.shootInterval = 3000
        this.shootTimer = 0
        this.lives = 2
        this.uniframe = true

    }
    update(deltaTime){
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if(this.onScreen){
            this.x += this.speedX - this.game.speed
            if(this.shootTimer > this.shootInterval){
                this.shootSpreadShot(3)
                this.shootTimer = 0
            }else this.shootTimer += deltaTime
            if( this.x + this.width < 0) this.markedForDeletion = true;

        }else { this.x += -1.5 - this.game.speed}
    }
    shootSpreadShot(num){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 2.25, 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0, 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, -2.25, 1))
    }
}
class Ship4 extends Enemy {
    constructor(game, x, y, inversion){
        super(game)
        this.width = 115
        this.height = 95
        this.x = x
        this.y = y
        this.hitboxWidth = 90
        this.hitboxHeight = 90
        this.hitBoxOffsetX = 0
        this.hitboxOffsetY = 0
        this.image = document.getElementById("ship4")
        this.inversion = inversion
        // this.type = type
        this.uniframe = true
        this.speedX = -0.5
        this.shootInterval = 3000
        this.shootTimer = 0
        this.isShooting = 1
        this.lives = 4
        this.score = 10
        this.bing = 1
        // this.exhaustXOffset =  -this.width  + 15
        // this.exhaustYOffset = -35
        // this.exhaustImage = document.getElementById("ship3Exhaust")
        // this.exhaustWidth = 32
        // this.exhaustHeight = 32
        // this.exhaustspWidth = 32
        // this.exhaustspHeight = 32
        // this.exhaustFrame = 0
        // this.maxExhaustFrame = 3
        // this.frameOffset = 0
        // this.hasExhaust = true

    }
    update(deltaTime){
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if(this.onScreen){

        this.x += this.speedX - this.game.speed
        if(this.shootTimer > this.shootInterval){
            this.shootTimer = 0
            this.aimedShot()
        }else this.shootTimer += deltaTime
        }else {this.x += -1.5 - this.game.speed}
    }
    aimedShot(){
        let tago = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
        if (tago < 0) { tago += 2 * Math.PI ; }
        console.log(tago)

        console.log("tago is : " + tago)
        this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago))
    }
}
class ShipY extends Enemy {
    constructor(game, x,y, inversion, type){
        super(game)
        this.width = 64 //115
        this.height = 64 //95
        this.x = x
        this.y = y - this.height / 2
        this.hitboxWidth = 90
        this.hitboxHeight = 90
        this.hitBoxOffsetX = 0
        this.hitboxOffsetY = 0
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
    constructor(game, x,y, inversion, type="vengeful"){
        super(game)
        this.width = 115
        this.height = 95
        this.x = x
        this.y = y
        this.hitboxWidth = 90
        this.hitboxHeight = 90
        this.hitBoxOffsetX = 0
        this.hitboxOffsetY = 0
        this.image = document.getElementById("revengeShip")
        this.inversion = inversion
        this.type = type
        this.uniframe = true
        this.lives = 2
        this.score = 2
        this.speedX = -2
        this.isShooting = 0
        this.onScreen = false
        this.vengeful = true
        this.exhaustXOffset =  -this.width / 1.5 -5
        this.exhaustYOffset = -15
        this.exhaustImage = document.getElementById("vengeExhaust")
        this.exhaustWidth = 72
        this.exhaustHeight = 72
        this.exhaustspWidth = 64
        this.exhaustspHeight = 64
        this.exhaustFrame = 0
        this.maxExhaustFrame = 3
        this.frameOffset = 0
        this.hasExhaust = true
        this.staggerShotTimer = 0
        this.staggerSpreadTimer = 0
        this.staggerSpreadInterval = 2200
        this.staggerShotInterval = 1000
        this.stagbulletAmount = 10
        this.off = this.stagbulletAmount * 2
        this.fakeI = this.stagbulletAmount
        
    }

    update(deltaTime){
        if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
        }
        if(this.onScreen){

            if(this.x > 600){
                this.x += this.speedX - this.game.speed
            }
            if(this.staggerSpreadTimer > this.staggerSpreadInterval){
                if(this.staggerShotTimer > this.staggerShotInterval){
                    let offed = 1 / this.off * this.fakeI * 400
                    this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 2))
                    this.fakeI+= 2
                    this.staggerShotTimer = 0
                    if(this.fakeI > this.off){
                        this.fakeI = this.stagbulletAmount
                        this.staggerShotTimer = 0
                        this.staggerSpreadTimer = 0
                    }
                }else this.staggerShotTimer+= deltaTime
                
            }else {
                this.staggerSpreadTimer += deltaTime
            }

        } else {this.x += -1.5 - this.game.speed}


    }



}

class SummonedRevengeShip extends RevengeShip {
    constructor(game, x,y, inversion, type="vengeful", destinX, destinY){
        super(game, x,y, inversion, type)
        this.destinX = destinX
        this.destinY = destinY
        this.point = 0
    }
    update(){
        if(this.point < 50){
        this.x+= ((this.destinX + this.x) - this.x) / 70
        this.y-= ((this.destinY + this.y) - this.y) / 70
        this.point++
    }
    }
}

class ShipMini extends Enemy {
    constructor(game, x, y, inversion, type, id){
       super(game)
       this.width = 64
       this.height = 64
       this.id = id
       this.x = x
       this.y = y
       this.hitboxWidth = 90
       this.hitboxHeight = 90
       this.hitBoxOffsetX = 0
       this.hitboxOffsetY = 0
       this.inversion = inversion
       this.type = type
       this.image = document.getElementById("shipmini")
       this.frameY = Math.floor(Math.random() * 2)
       this.lives = 3
       this.score = this.lives
       this.speedX = -1.5
       this.uniframe = true  
       this.shootInterval = 2000
       this.shootTimer = 0
       this.curve1 = false
       this.Yorigin = this.y
       this.curveHeight = 80
       // this.curveCenterX = canvas.width / 2
       this.curveRadius = 500 / 2 - this.curveHeight;
       this.isShooting =   1              //Math.floor(Math.random() * 2)
       this.hasParts = true
       this.parts = document.getElementById("ship2Part")
       this.exhaustXOffset =  -this.width / 1.5 -10
       this.exhaustYOffset = -22
       this.exhaustImage = document.getElementById("ship2Exhaust")
       this.exhaustWidth = 16
       this.exhaustHeight = 32  
       this.exhaustspWidth = 32
       this.exhaustspHeight = 32
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
    constructor(game, x, y, type, inversion,isShooting){
        this.game = game
        this.x = x
        this.y = y
        this.inversion = inversion
        this.type = type
        this.image = new Image()
        this.image.src = 'assets/inverted alientest.png'
        this.speed = -1.5
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.width = this.spriteWidth / 4
        this.height = this.spriteHeight / 4
        this.frame = 0
        this.flapSpeed = 2
        this.angle = 0
        this.angleSpeed = 2
        this.lives = 2
        this.inversion = inversion
        this.curveRadius = 60
        this.curveHeight = 30
        this.isShooting = isShooting
        this.shootTimer = 0
        this.shootInterval = 1500
        this.bing = false
        this.sign = 1 * this.inversion
        this.bingTimer = 0
        this.bingInterval = 1600               //2200
        this.eqX = 0
        this.yOrigin = this.y
        this.yTarget =  this.inversion === 1 ? 100 : 400
        this.onScreen = false
        this.markedForDeletion = false
        this.isLeftSpawning = (this.type === "type4" || this.type === "type6") ?  true : false
        console.log(this.isLeftSpawning)

  
  
    }
    update(deltaTime){
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
        if(!this.isLeftSpawning){
        if(this.x - this.width < 1000){ this.onScreen = true}}
        else if (this.isLeftSpawning){
            if(this.x  + this.width > 0){this.onScreen = true}
        }
        if(this.onScreen){
        if( this.x + this.width < 0 && this.type !== "type4") this.markedForDeletion = true;
            this.frame > 4 ? this.frame = 0 : this.frame++;
            
        // }
        if (this.type === "type0"){
            
            this.x+= this.speed - this.game.speed
            
        }
        if(this.type === "type1"){
            // console.log(this.x, this.y)
            this.x+= this.speed - this.game.speed
            this.y = this.curveRadius * Math.cos((this.x) * Math.PI/200 * 0.85) * this.inversion + (this.yOrigin - this.height / 2) 
            this.angle += this.angleSpeed
        }
        if(this.type === "type2"){
            // console.log("X: " + this.x + "Y: "  + this.y)
            if(!this.bing){
                if(this.bingTimer > this.bingInterval){
                    this.bing = true
                    this.yOrigin = this.y
                }else {
                    this.bingTimer += deltaTime
                    this.x+= this.speed - this.game.speed +2
                }
            }
            else {
                this.y =  this.yOrigin - (this.eqX * this.eqX / 2.7 * this.inversion )
                this.eqX += 0.2
                this.x -= 4
                // console.log("X: " + this.x + "Y: "  + this.y + "binged")
            }
        }
        if(this.type === "type3"){
            this.x += this.speed * 2 - this.game.speed
        }
        if(this.type === "type4"){
            this.y = Math.sin(this.angle) * 90 * this.inversion + this.yOrigin
            this.angle += 0.01
            this.x += 3
            console.log(this.isLeftSpawning)
        }

        if(this.type === "type5"){
            if(this.bingTimer > this.bingInterval){
            this.x += 6
            this.y += 1.5 * this.inversion
        }else {
            this.bingTimer += deltaTime
            this.x -= 6
            this.y += 1.5 * this.inversion
        }
        }
        if(this.type === "type6"){
            if(this.bingTimer > this.bingInterval){
            this.x -= 6
            this.y += 1.5 * this.inversion
        }else {
            this.bingTimer += deltaTime
            this.x += 6
            this.y += 1.5 * this.inversion
        }
        }
        if(this.type === "type7"){
            if(this.bing){
            this.x -= 4.5 * this.inversion
            this.y = Math.sin(this.angle) * 60 * -this.sign  + this.yOrigin
            this.angle += 0.07
            if(this.angle > 3){
                this.bing = false
                this.angle = 0
                this.sign *= -1
            }

        }else {
            this.y -= 5 * this.sign
            if(this.sign === 1){
            if(this.y <= this.yTarget){ this.bing = true
            this.yOrigin = this.y
            this.yTarget = 400 }
            }else if (this.sign === -1){
                if(this.y >= this.yTarget){ this.bing = true
                    this.yOrigin = this.y
                    this.yTarget = 100 }
            }
        }
        }

        if(this.type === "type8"){
            this.x += this.speed - this.game.speed
            if(this.isShooting){
                if(this.shootTimer > this.shootInterval){
                    this.shootSpreadShot()
                    
                    this.shootTimer = 0 // or this.shooting = false
    
                }else {this.shootTimer += deltaTime}

        }
    }
        
    }
    if(this.type === "type9"){
        this.x -= this.speed - this.game.speed
        if(!this.bing){
            if(this.game.player.x - this.x > 30){ this.shootSpreadShotUp(); this.bing = true }
        }
        // if(this.isShooting){
        //     if(this.shootTimer > this.shootInterval){
        //         this.shootSpreadShotUp()
                
        //         this.shootTimer = 0 // or this.shooting = false

        //     }else {this.shootTimer += deltaTime}

    //}

        if(this.isShooting && this.type !== "type8" && this.type !== "type9"){
            if(this.shootTimer > this.shootInterval){
                this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, -0.75 * this.inversion))
                
                this.shootTimer = 0 // or this.shooting = false

            }else {this.shootTimer += deltaTime
            console.log(this.shootTimer)}
        }
        // console.log(this.isShooting)
    }else { if(!this.isLeftSpawning)this.x += -1.5 - this.game.speed
            else this.x -= -1.5 - this.game.speed}
}
  
    
    startOffset(){
        console.log("kyfjf")
        this.x -= this.game.offset
    }
    draw(context){
      context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    shootSpreadShot(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 2.25, 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0, 1))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, -2.25, 1))
    }
    shootSpreadShotUp(){
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,0.7, -0.75, 0,2))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,0, -1, 0, 2))
        this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-0.7, -0.75, 0, 2))
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
    constructor(game, x, y, type = "type0", inversion = 1){
        this.game = game
        this.image = new Image()
        this.image.src =  "assets/red alien sheet.png"  //'assets/enemy3.png'
        this.type = type
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 218
        this.spriteHeight = 177
        this.width = this.spriteWidth / 3
        this.height = this.spriteHeight / 3
        this.x = x
        this.y = y
        this.frame = 0
        this.Yorigin = y
        this.flapSpeed = 3
        this.angle = 0
        this.angleSpeed = 2.5
        this.yFlight = 0
        this.xFlight = 0
        this.lives = 2
        this.score = 2
        this.markedForDeletion = false
        this.shootTimer = 0
        this.shootInterval = 2200
        this.eX = 0
        this.bingTimer = 0
        this.bingInterval = 2200
        this.bing = false
        //this.curve = Math.random() * 200 + 4

    }
    update(deltaTime){
            if(this.x - this.width < 1000){ // on screen
            this.onScreen = true
            }
        if(this.onScreen){
        if(this.type === "type1"){
            this.y =  400 - (this.eX * this.eX / 1.3 )
            this.eX += 0.2
            this.x += 3
            if(this.shootTimer > this.shootInterval){
                this.aimedShot()
                this.shootTimer =0
            } else this.shootTimer+= deltaTime
        } else if (this.type === "type2") {
            //ok
            if(this.bing){
                this.x += 3
                this.y -= 3
            } else {
                this.x += 2
                this.bingTimer > this.bingInterval ? this.bing++ : this.bingTimer+= deltaTime
                console.log(this.bingTimer)
            }
        } else{
        this.x += -1
        this.y = 80 * Math.cos((this.angle ) * Math.PI/200) + (this.Yorigin - this.height / 2) + this.yFlight
        this.angle += this.angleSpeed
        if(this.shootTimer > this.shootInterval){
            this.aimedShot()
            this.shootTimer =0
        } else this.shootTimer+= deltaTime }
        // this.yFlight += 0
        // this.xFlight += 0

        if( this.x + this.width < 0) this.markedForDeletion = true;
        //animate sprites
   
            this.frame > 4 ? this.frame = 0 : this.frame++;
    }else {this.x += -1.5 - this.game.speed}

    }
    draw(context){
      context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    aimedShot(){
        let tago = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
        if (tago < 0) { tago += 2 * Math.PI ; }
        console.log(tago)

        console.log("tago is : " + tago)
        this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago))
    }
}   

class AlienBuPoint extends AlienBu {
    constructor(game,x, y){
        super(game, x, y)
        this.targetY = y
        this.y = 0
        this.shootTimer = 0
        this.shootInterval = 2200
    }
    update(deltaTime){
        this.y+= (this.targetY - this.y) / 10
        if(this.shootTimer > this.shootInterval){
            this.aimedShot()
            this.shootTimer =0
        } else this.shootTimer+= deltaTime
        //animate sprites
        this.frame > 4 ? this.frame = 0 : this.frame++;
    }
}

class AlienBuCircle extends AlienBu {
    constructor(game, x, y, angleOffset){
        super(game,x,y)
        this.image = new Image()
        this.image.src =  "assets/red alien sheet.png"  //'assets/enemy3.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 218
        this.spriteHeight = 177
        this.width = this.spriteWidth / 3
        this.height = this.spriteHeight / 3
        this.x = x
        this.y = y
        this.Xorigin = x
        this.Yorigin = y
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

class HorseMiniBoss {
    constructor(game, x, y, inversion, type){
        this.game = game
        this.x = x
        this.y = y
        this.lastX = x
        this.lastY = y
        this.inversion = inversion
        this.type = type
        this.image = new Image()
        this.image.src = 'assets/Horse.png'
        this.speed = 5
        this.width = 120;
        this.height = 190
        this.frameX = 37
        this.frameY = 1
        this.maxFrame = 37
        this.spreadShootInterval = 4000
        this.spreadTimer = 0
        this.dashInterval = 33000
        this.dashTimer = 0
        this.dashing = false
        this.dashed = false
        this.chargingdash = false
        this.dashchargeTimer = 0
        this.dashCharge = 1500
        this.vertShotTimer = 0
        this.vertShotInterval = 2000
        this.wallDashTimer = 2001
        this.wallDashInterval = 2000
        this.boss = true

    }
    update(deltaTime){

        if(!this.dashing && !this.chargingdash)this.x--
        else if(this.chargingdash) this.frameX++
        else {
            this.speed+= 8
            this.x = Math.cos(this.angle) * this.speed + this.lastX
            this.y = Math.sin(this.angle) * this.speed + this.lastY
        }
        this.frameX--
        if (this.frameX >= 1){
            this.frameX--
        }else {
            this.frameX = this.maxFrame
        }
        if(this.spreadTimer > this.spreadShootInterval){
            // this.shootSpreadHalf(4)
            // this.shootHiveVert()
            this.fireHomingMissle()
            this.spreadTimer = 0
        } else {
            this.spreadTimer += deltaTime
        }
        if(this.vertShotTimer > this.vertShotInterval){
            // this.shootVert(100, "verted")
            // this.shootVert(100, "inverted")
            // this.shootVert(200, "verted")
            // this.shootVert(200, "inverted")

            this.vertShotTimer = 0
        } else {
            this.vertShotTimer += deltaTime
        }
        if(!this.dashed){
            if(this.dashTimer > this.dashInterval){
                this.dashchargeTimer += deltaTime
                this.chargingdash = true
                if(this.dashchargeTimer > this.dashCharge){
                    this.dash()
                    this.chargingdash = false
                    this.dashing = true
                    this.dashed = true
                }
            }else {
                this.dashTimer += deltaTime
            }
        }
        if((this.x < 0 || this.x > 1000 || this.y > 500 + 40|| this.y < 0 - 40) ){
            this.dash()
            this.wallDashTimer = 0
            this.speed = 0
        } 
        
        

    }

    dash(){
        this.lastX = this.x
        this.lastY = this.y
        console.log(this.x, this.y, this.lastX, this.lastY)
        this.angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
        if (this.angle < 0) { this.angle += 2 * Math.PI ; }
        // this.speed+= 0.4
        // this.x = Math.cos(this.angle) * this.speed + this.lastX
        // this.y = Math.sin(this.angle) * this.speed + this.lastY
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)

    }

    shootSpreadHalf(num){
        let off = num * 2
        
        for(let i = num; i < off; i++){
            let offed = 1 / off * i * 400
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed))
            
        }
    }

    shootVert(num, inverison){
        this.game.enemyProjectiles.push(new VerticalAimed(this.game, this.x, this.y, num, inverison))
    }
    shootHiveVert(){
        this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y,  15, -3))
        this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y, 50, -3))
        this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y,  100, -3))
        this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y, -50, -3))
        this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y,  -100, -3))
    }

    fireHomingMissle(){
        this.game.obstacles.push(new HomingMissle(this.game, this.x, this.y, 1))
        this.game.obstacles.push(new HomingMissle(this.game, this.x, this.y - 100, 1))
    }


}

class Level1Boss extends HorseMiniBoss {
    constructor(game, x, y, inversion, type){
        super(game, x, y, inversion, type)
        this.minionSpawnTimer = 0
        this.minionSpawnInterval = 10000
        this.angle
    }
}

    class WhaleBoss1 {
        constructor(game,x,y){
            this.game = game
            this.x = x
            this.y = y
            this.width = 400
            this.height = 227
            this.image = document.getElementById("hivewhale")
            this.frameX = 0
            this.frameY = 0
            this.maxFrame = 37
            this.boss = true
            this.spreadTimer = 0
            this.spreadShootInterval = 2000
            this.spawnDroneTimer = 0
            this.spawnDroneInterval = 4000
            this.lives = 100
            this.Xorigin = x
            this.Yorigin = y
            this.xAngle = 0
            this.yAngle = 0
            this.xAngleSpeed = 0.5
            this.yAngleSpeed = 0.75
            this.staggerSpreadTimer = 0
            this.staggerSpreadInterval = 4000
            this.staggerShotTimer = 0
            this.staggerShotInterval = 200
            this.stagbulletAmount = 10
            this.off = this.stagbulletAmount * 2
            this.fakeI = this.stagbulletAmount
            this.damaged = false
            this.damagedTimer = 0


        }
        update(deltaTime){
            // Sprite Animation
            if(this.frameX < this.maxFrame){
                this.frameX++
            }else this.frameX = 0

            // Attacks
            // if(this.spreadTimer > this.spreadShootInterval){
            //     this.shootSpreadHalf(4)
            //     this.spreadTimer = 0
            // } else this.spreadTimer += deltaTime
            
            if(this.spawnDroneTimer > this.spawnDroneInterval){
                this.game.cope.push(new MiniDrone(this.game, this.x, this.y + this.height / 2, 1.5))
                this.spawnDroneTimer = 0
                // this.shootSpreadHalf(12)
                // this.fireSinRadius()
                // this.spawnExplosion()
                // this.spawnWarning()
                
            } else this.spawnDroneTimer+= deltaTime


            // if(this.staggerSpreadTimer > this.staggerSpreadInterval){
            //     if(this.staggerShotTimer > this.staggerShotInterval){
            //         let offed = 1 / this.off * this.fakeI * 400
            //         this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 2))
            //         this.fakeI++
            //         this.staggerShotTimer = 0
            //         if(this.fakeI > this.off){
            //             this.fakeI = this.stagbulletAmount
            //             this.staggerShotTimer = 0
            //             this.staggerSpreadTimer = 0
            //         }
            //     }else this.staggerShotTimer+= deltaTime
                
            // }else {
            //     this.staggerSpreadTimer += deltaTime
            // }

            if(this.staggerSpreadTimer > this.staggerSpreadInterval){
                if(this.staggerShotTimer > this.staggerShotInterval){
                    let offed = 1 / this.off * (this.fakeI - 5) * 400
                    this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x + this.width * 0.60, this.y + this.height * 0.5 - 90, -1, 234, 1, offed + 120  , 2))
                    this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x + this.width * 0.60, this.y + this.height * 0.5 + 40, -1, 234, 1, -offed  + 80 , 2))
                    this.fireHomingMissle()
                    // this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed + 200, 2))
                    // this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, -offed , 2))
                    // this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, -offed + 400, 2))
                    this.fakeI++
                    this.staggerShotTimer = 0
                    console.log(offed)
                    console.log(offed + 120, -offed + 80 )
                    if(this.fakeI - 5 >  this.off -5){
                        this.fakeI = this.stagbulletAmount
                        this.staggerShotTimer = 0
                        this.staggerSpreadTimer = 0
                        this.fireHomingMissle()
                    }
                }else this.staggerShotTimer+= deltaTime
                
            }else {
                this.staggerSpreadTimer += deltaTime
            }




            // let off = num * 2                                  DELETE THIS!!!!!!!!!!!!!!!!!!!!
            
            // for(let i = num - 5; i < off - 5; i++){
            //     let offed = 1 / off * i * 400
            //     this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed))
            //     this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed))
                
            // }




            //Movement
            if(!(this.staggerSpreadTimer > this.staggerSpreadInterval)){
            this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width / 2) 
            this.y = 150 * Math.cos((this.yAngle ) * Math.PI/200) + (this.Yorigin - this.height / 2) 
            this.xAngle+= this.xAngleSpeed
            this.yAngle += this.yAngleSpeed
            }

        }

        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image,this.frameX * this.width,this.frameY *  this.height, this.width, this.height, this.x, this.y, this.width, this.height)
            // context.drawImage(this.image, this.x, this.y, this.width, this.height)
            this.drawBossHealthBar(context, 450, 450, 200, 40, this.maxLives, this.lives)
            if(this.damaged){
                this.drawDamageAnimation(context, this.x, this.y, this.width, this.height)
            }
    
        }
        drawBossHealthBar(context, x, y, width, height, maxHealth, currentHealth) {
            // Draw the background of the health bar
            context.save()
            context.fillStyle = 'gray';
            context.fillRect(x, y, width, height);
          
            // Calculate the current health percentage
            const healthPercentage = currentHealth / maxHealth;
          
            // Determine the color based on the health percentage
            const barColor = healthPercentage > 0.5 ? 'green' : healthPercentage > 0.2 ? 'yellow' : 'red';
          
            // Draw the actual health bar
            const barWidth = width * healthPercentage;
            context.fillStyle = barColor;
            context.fillRect(x, y, barWidth, height);
          
            // Draw the border of the health bar
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.strokeRect(x, y, width, height);
            context.restore()
          }
           drawDamageAnimation(context, x, y, width, height) {
            context.save()
            const animationColor = 'rgba(255, 255, 255, 0.2)'; // Red overlay with 50% opacity
            const heightOffset = 70  // for whale only current;y
          
            context.fillStyle = animationColor;
            context.fillRect(x, y, width, height - heightOffset);
          
            // setTimeout(() => {
            //   // After the animation duration, clear the red overlay
            //   context.clearRect(x, y, width, height);
            // }, animationDuration);
            context.restore()
          }
          damageCounter(deltaTime){
            this.damagedTimer+= deltaTime
            this.damaged = this.damagedTimer > 70 ? false : true
          }



        // let off = num * 2                       The top circle
            
        // for(let i = num - 5; i < off - 5; i++){
        //     let offed = 1 / off * i * 400
        //     this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed))
        //     this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed))
            
        // }


        shootSpreadHalf(num, type="rect", speed=2){
            let off = num * 2
            if(type === "rect"){
            
            for(let i = num ; i < off ; i++){
                let offed = 1 / off * i * 400
                this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed, speed))
                // this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed))
                
            }
        }else {
            for(let i = num ; i < off ; i++){
                let offed = 1 / off * i * 400
                this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 0, offed, speed))
                
            }
        }
        }
        fireHomingMissle(){
            this.game.obstacles.push(new HomingMissle(this.game, this.x + this.width * 0.75, this.y + 110, 1, ))
            this.game.obstacles.push(new HomingMissle(this.game, this.x + this.width * 0.75, this.y  + 10, -1, 2))
        }

        fireSinRadius(){
            // let tago = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
            // if (tago < 0) { tago += 2 * Math.PI ; }
            this.game.enemyProjectiles.push(new SinRadiusProjectile(this.game, this.x, this.y, 1,  0))
            this.game.enemyProjectiles.push(new SinRadiusProjectile(this.game, this.x, this.y, 1, 100))
            this.game.enemyProjectiles.push(new SinRadiusProjectile(this.game, this.x, this.y, 1, 200))
            this.game.enemyProjectiles.push(new SinRadiusProjectile(this.game, this.x, this.y, 1, 300))
        }
        spawnWarning(){
            this.game.warnings.push(new Warning(this.game, 300, 200, 128, 128, this.spawnExplosion, 300, 200))
            this.game.warnings.push(new Warning(this.game, 300, 350, 128, 128, this.spawnExplosion,300, 350))
        }

        spawnExplosion(x, y){
            this.game.obstacles.push(new DamagingExplosion(this.game, x,y))
        }
    }

    class WhaleBoss11 extends WhaleBoss1 {
        constructor(game,x,y){
            super(game, x, y)
            this.lives = 120
            this.maxLives = 120
            this.phase = 3
            this.wide_AimTimer = 0
            this.wide_AimTimerInterval = 2000
            this.staggerW_ATimer = 501
            this.staggerW_AInterval = 500
            this.w_AAmount = 0
            this.color = "red"

        }
        update(deltaTime){
            // Sprite Animation
            if(this.frameX < this.maxFrame){
                this.frameX++
            }else this.frameX = 0

            if(this.phase === 1){
                if(this.wide_AimTimer > this.wide_AimTimerInterval){
                    if(this.staggerW_ATimer > this.staggerW_AInterval){
                        this.wide_AimAttack(deltaTime)
                        this.staggerW_ATimer = 0
                        this.w_AAmount++
                        if(this.w_AAmount >= 2){
                            this.w_AAmount = 0
                            this.staggerW_ATimer = 301
                            this.wide_AimTimer = 0
                        }
                    } else {this.staggerW_ATimer += deltaTime}
                }else this.wide_AimTimer+= deltaTime
                if(this.lives < 50) this.phase += 2
            }

            //Attacks

            if(this.phase === 3){
                this.color = "blue"
                if(this.spreadTimer > this.spreadShootInterval){
                    // this.shootSpreadHalf(3, "rect", 3)
                    this.shootTriShot()
                    this.spreadTimer = 0
                } else this.spreadTimer += deltaTime 
            }
            
            if(this.spawnDroneTimer > this.spawnDroneInterval){
                this.game.cope.push(new MiniDrone(this.game, this.x, this.y + this.height / 2, 1.5))
                this.spawnDroneTimer = 0
                // this.shootSpreadHalf(12)
                // this.fireSinRadius()
                // this.spawnExplosion()
                // this.spawnWarning()
                
            } else this.spawnDroneTimer+= deltaTime

            //Movement
            if(!(this.staggerSpreadTimer > this.staggerSpreadInterval)){
            this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) 
            this.y = 150 * Math.cos((this.yAngle ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
            this.xAngle+= this.xAngleSpeed
            this.yAngle += this.yAngleSpeed
            }

        }

        wide_AimAttack(deltaTime){
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0))
            let tago = Math.atan2(this.game.player.y2 - this.y - this.height * 0.5, this.game.player.x2 - this.x)
            if (tago < 0) { tago += 2 * Math.PI ; }
            this.game.enemyProjectiles.push(new Aim(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, tago))
        }
        shootTriShot(){
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0.55, 1))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0, 1))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, -0.55, 1))
        }
        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
            context.save()
            context.fillStyle = `${this.color}`
            context.fillRect(this.x, this.y, this.width, this.height)
            context.restore()
            context.drawImage(this.image,this.frameX * this.width,this.frameY *  this.height, this.width, this.height, this.x, this.y, this.width, this.height)

            // context.drawImage(this.image, this.x, this.y, this.width, this.height)
    
        }
    }

    class WhaleBoss12 extends WhaleBoss1 {
        constructor(game,x,y){
            super(game, x, y)
            this.maxLives = 200
            this.lives = 200 //120
            this.phase = 2
            this.spreadShootTimer = 0
            this.spreadShootInterval =  200       //2500          // 550 for hardmode (: speed 6 for bullet and 6 bull amount
            this.staggerSpreadTimer = 0
            this.staggerSpreadInterval =  1200        //3000
            this.staggerShotTimer = 0
            this.staggerShotInterval = 150 //200
            this.stagbulletAmount = 10
            this.off = this.stagbulletAmount * 2
            this.fakeI = this.stagbulletAmount
            this.fakeIReverser = 1
            this.hiveShotTimer = 0
            this.hiveShotInterval =   1500       //1500
            this.hiveAmount = 1
            this.triShotTimer = 0
            this.triShotInterval = 1200
            this.staggerTriTimer = 0
            this.staggerTriInterval = 250
            this.triShotLocationOffset = -70
            this.triShotInversion = 1
            this.triAmount = 0
            this.attackQueue = 1

        }
        update(deltaTime){
            if(this.frameX < this.maxFrame){
                this.frameX++
            }else this.frameX = 0
            // if(this.lives > 130){
            //     this.phase = 1
            // }else if(this.lives > 60){
            //     this.phase = 2
            // } else if(this.lives > 0){
            //     this.phase = 3
            // }
            if(this.damaged){this.damageCounter(deltaTime)}
            if(this.phase === 1){ 
                //code
                if(this.spreadShootTimer > this.spreadShootInterval){
                    this.shootSpreadHalf(5, "circle", 6)
                    // this.shootHiveVert()
                    this.spreadShootTimer = 0
                }else {this.spreadShootTimer += deltaTime}
                if(this.spawnDroneTimer > this.spawnDroneInterval){
                    this.game.cope.push(new MiniDrone(this.game, this.x, this.y + this.height / 2, 1.5))
                    this.spawnDroneTimer = 0
                    // this.shootSpreadHalf(12)
                    // this.fireSinRadius()
                    // this.spawnExplosion()
                    // this.spawnWarning()
                    
                } else this.spawnDroneTimer+= deltaTime
            }

            if(this.phase === 2){
                if(this.attackQueue === 1){
                    if(this.staggerSpreadTimer > this.staggerSpreadInterval){
                        if(this.staggerShotTimer > this.staggerShotInterval){
                            if(this.fakeI < this.off){
                                this.staggerShotInterval = 150
                            let offed = 1 / this.off * this.fakeI * 400 //400
                            let onned = 1 / this.off  * this.fakeI * 440 //400
                            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 3))
                            // this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, onned, 3))
                            this.fakeI++
                            this.staggerShotTimer = 0 
                            if(this.fakeI === this.off) this.staggerShotTimer -= 300
                            }
                            if(this.fakeI >= this.off){
                                console.log(this.attackQueue)
                                this.staggerShotInterval = 150 //200
                                let offed = 1 / this.off * (this.fakeI - this.fakeIReverser) * 360 //400
                                this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 3))
                                this.fakeIReverser++
                                this.staggerShotTimer = 0
                                
                                if(this.fakeI < this.fakeIReverser * 2){
                                this.fakeI = this.stagbulletAmount
                                this.fakeIReverser = 0
                                this.staggerShotTimer = 0
                                this.staggerSpreadTimer = 0
                                this.attackQueue = 2
                                console.log(this.attackQueue)
                            }
                            }
                        }else this.staggerShotTimer+= deltaTime
                        
                    }else {
                        this.staggerSpreadTimer += deltaTime
                        }
             }else if(this.attackQueue === 2){
                if(this.hiveShotTimer > this.hiveShotInterval){
                    // this.shootHiveVert(this.hiveAmount)
                    if(this.hiveAmount < 4){
                        this.shootHiveVert(this.hiveAmount)
                        this.hiveAmount++
                    }
                    else{
                        this.hiveAmount = 1
                        this.attackQueue--
                    }
                    this.hiveShotTimer = 0
                    
                }else {this.hiveShotTimer += deltaTime}
             }


            }
            if(this.phase === 3){
                // if(this.hiveShotTimer > this.hiveShotInterval){
                //     // this.shootHiveVert(this.hiveAmount)
                //     this.hiveAmount > 3 ? this.hiveAmount = 1 : this.hiveAmount++
                //     this.hiveShotTimer = 0
                    
                // }else {this.hiveShotTimer += deltaTime}
                if(this.triShotTimer > this.triShotInterval){
                    if(this.staggerTriTimer > this.staggerTriInterval){
                    this.shootTriShot(this.triShotLocationOffset)
                    this.triShotLocationOffset += 60 * this.triShotInversion
                    this.triAmount++
                    if(this.triAmount > 3){ 
                        this.triShotTimer = 0
                        // this.triShotLocationOffset = -140
                        this.triAmount = 0
                        this.triShotLocationOffset = -70
                    }
                    this.staggerTriTimer = 0
                    }else {this.staggerTriTimer+= deltaTime}
                }else {this.triShotTimer += deltaTime}
                this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) 
                this.y = 35 * Math.cos((this.yAngle * 0.5 ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
                this.xAngle+= this.xAngleSpeed
                this.yAngle += this.yAngleSpeed
                
            }



            if(!(this.staggerSpreadTimer > this.staggerSpreadInterval) && this.phase !== 3){
                this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) 
                this.y = 130 * Math.cos((this.yAngle * 2 ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
                this.xAngle+= this.xAngleSpeed
                this.yAngle += this.yAngleSpeed
                }
        }
        shootHiveVert(num){
            console.log(num)
            this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  1, -3))
            for(let i = 1; i <= num; i++){
                this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  i * 100, -3))
                this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  i * -100, -3))
            }
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4, 50, -3))
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  100, -3))
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y, -50, -3))
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y,  -100, -3))
        }
        shootTriShot(num){
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - (num) , -1, -0.45, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - 15 - (num),-1, -0.45, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - (num) ,-1 , 0, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - 15 - (num),-1, 0, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5  - (num),-1 , 0.45, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - 15 - (num) ,-1, 0.45, 0))
        }

    }


    class MiniDrone extends Enemy{
            constructor(game, x, y, divisor){
               super(game)
               this.spriteWidth = 115
               this.spriteHeight = 95
               this.divisor = divisor 
               this.width = this.spriteWidth / divisor
               this.height = this.spriteHeight / divisor
               this.x = x
               this.y = y
               this.image = document.getElementById("drone")
               this.frameY = Math.floor(Math.random() * 2)
               this.lives = 3
               this.score = this.lives
               this.type = "drone"
               this.speedX = Math.random() * -4.2 - 0.5
        }

        update(){
            this.x-= 2
            this.frameX > this.maxFrame ?  this.frameX = 0 : this.frameX++


        }

        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth,  this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
          }
        

    }

    class Boss3 extends WhaleBoss1 {
        constructor(game,x,y){
            super(game, x, y)
            this.maxLives = 200
            this.lives = 200 //120
            this.phase = 4
            this.spreadShootTimer = 0
            this.spreadShootInterval =  200       //2500          // 550 for hardmode (: speed 6 for bullet and 6 bull amount
            this.staggerSpreadTimer = 0
            this.staggerSpreadInterval =  3000       //3000          1200 hardmode maybe
            this.staggerShotTimer = 0
            this.staggerShotInterval = 150 //200
            this.stagbulletAmount = 10
            this.off = this.stagbulletAmount * 2
            this.fakeI = this.stagbulletAmount
            this.fakeIReverser = 1
            this.hiveShotTimer = 0
            this.hiveShotInterval =   1500       //1500
            this.hiveAmount = 1
            this.triShotTimer = 0
            this.triShotInterval = 1200
            this.staggerTriTimer = 0
            this.staggerTriInterval = 250
            this.triShotLocationOffset = -70
            this.triShotInversion = 1
            this.triAmount = 0
            this.bubbleTimer = 0
            this.bubbleInterval = 5000
            this.attackQueue = 1
            this.summonTimer = 5000
            this.summonInterval = 9000
            this.summonType = 1
            this.groupAimTimer = 0
            this.groupAimInterval = 2000

        }
        update(deltaTime){
            if(this.frameX < this.maxFrame){
                this.frameX++
            }else this.frameX = 0
            // if(this.lives > 130){
            //     this.phase = 3
            // }else if(this.lives > 60){
            //     this.phase = 3
            // } else if(this.lives > 0){
            //     this.phase = 3
            // }
            if(this.damaged){this.damageCounter(deltaTime)}
            if(this.phase === 1){ 
                //code
                if(this.spreadShootTimer > this.spreadShootInterval){
                    this.shootSpreadHalf(5, "circle", 6)
                    // this.shootHiveVert()
                    this.spreadShootTimer = 0
                }else {this.spreadShootTimer += deltaTime}
                if(this.spawnDroneTimer > this.spawnDroneInterval){
                    this.game.cope.push(new MiniDrone(this.game, this.x, this.y + this.height / 2, 1.5))
                    this.spawnDroneTimer = 0
                    // this.shootSpreadHalf(12)
                    // this.fireSinRadius()
                    // this.spawnExplosion()
                    // this.spawnWarning()
                    
                } else this.spawnDroneTimer+= deltaTime
            }

            if(this.phase === 2){
                if(this.staggerSpreadTimer > this.staggerSpreadInterval){
                    if(this.staggerShotTimer > this.staggerShotInterval){
                        let offed = 1 / this.off * (this.fakeI - 5) * 400
                        this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed + 200, 2))
                        this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, -offed , 2))
                        // this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, -offed + 400, 2))
                        this.fakeI++
                        this.staggerShotTimer = 0
                        console.log(offed)
                        if(this.fakeI - 5 >  this.off -5){
                            this.fakeI = this.stagbulletAmount
                            this.staggerShotTimer = 0
                            this.staggerSpreadTimer = 0
                        }
                    }else this.staggerShotTimer+= deltaTime
                    
                }else {
                    this.staggerSpreadTimer += deltaTime
                }


            }
            if(this.phase === 3){
                if(this.staggerSpreadTimer > this.staggerSpreadInterval){
                    if(this.staggerShotTimer > this.staggerShotInterval){
                        let offed = 1 / this.off * (this.fakeI - 8) * 400
                        this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x + 200, this.y + this.height * 0.5 - 50, -1, 234, 1, offed + 200, 2))
                        this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x + 200, this.y + this.height * 0.5 + 0, -1, 234, 1, -offed , 2))
                        // this.game.enemyProjectiles.push(new testEPCircle(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, -offed + 400, 2))
                        this.fakeI++
                        this.staggerShotTimer = 0
                        console.log(offed)
                        if(this.fakeI - 5 >  this.off -5){
                            this.fakeI = this.stagbulletAmount
                            this.staggerShotTimer = 0
                            this.staggerSpreadTimer = 0
                        }
                    }else this.staggerShotTimer+= deltaTime
                    
                }else {
                    this.staggerSpreadTimer += deltaTime
                }
                if(this.bubbleTimer > this.bubbleInterval){
                    this.shootBubble()
                    this.bubbleTimer = 0
                }else this.bubbleTimer+= deltaTime
                
            }

            if(this.phase === 4){
                if(this.summonTimer > this.summonInterval){
                    //this.SummonMinions(this.summonType)
                    this.summonTimer = 0
                }else {this.summonTimer += deltaTime}

                this.x = 15 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) + 100
                this.y = 30 * Math.cos((this.yAngle * 2 ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
                this.xAngle+= this.xAngleSpeed
                this.yAngle += this.yAngleSpeed
                if(this.groupAimTimer > this.groupAimInterval){
                    this.groupAim()
                    this.groupAimTimer = 0
                }else {this.groupAimTimer += deltaTime}
            }



            if(!(this.staggerSpreadTimer > this.staggerSpreadInterval) && (this.phase !== 3 && this.phase !== 4)){
                this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) 
                this.y = 50 * Math.cos((this.yAngle * 2 ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
                this.xAngle+= this.xAngleSpeed
                this.yAngle += this.yAngleSpeed
                }
        }
        shootHiveVert(num){
            console.log(num)
            this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  1, -3))
            for(let i = 1; i <= num; i++){
                this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  i * 100, -3))
                this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  i * -100, -3))
            }
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4, 50, -3))
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y + this.height * 0.4,  100, -3))
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y, -50, -3))
            // this.game.enemyProjectiles.push(new VerticalAimed2(this.game, this.x, this.y,  -100, -3))
        }
        shootTriShot(num){
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - (num) , -1, -0.45, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - 15 - (num),-1, -0.45, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - (num) ,-1 , 0, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - 15 - (num),-1, 0, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5  - (num),-1 , 0.45, 0))
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 - 15 - (num) ,-1, 0.45, 0))
        }
        shootBubble(){
            this.game.obstacles.push(new HomingMissle(this.game, this.x + this.width * 0.75, this.y + 110, 1, 2 ))
            this.game.obstacles.push(new HomingMissle(this.game, this.x + this.width * 0.75, this.y  + 10, -1, 2))
        }
        SummonMinions(type){
            if(type === 1){
                this.game.cope.push(new ShootingBall(this.game, this.x, this.y  + this.height * 0.5, -210, 210, type))
                this.game.cope.push(new ShootingBall(this.game, this.x, this.y  + this.height * 0.5, -90, 190, type))
                this.game.cope.push(new ShootingBall(this.game, this.x, this.y  + this.height * 0.5, -50, 0, type))
                this.game.cope.push(new ShootingBall(this.game, this.x, this.y  + this.height * 0.5, -210, -170, type))
                this.game.cope.push(new ShootingBall(this.game, this.x, this.y  + this.height * 0.5, -90, -190, type))
            }
        }
        groupAim(){
            this.game.cope.push(new StaggeredAim(this.game, this.x, this.y  + this.height * 0.5,1,1,0,0.5, -100, 50))
            this.game.cope.push(new StaggeredAim(this.game, this.x, this.y  + this.height * 0.5,1,1,0,0.5, -200, 150))
            this.game.cope.push(new StaggeredAim(this.game, this.x, this.y  + this.height * 0.5,1,1,0,0.5, -100, -50))
            this.game.cope.push(new StaggeredAim(this.game, this.x, this.y  + this.height * 0.5,1,1,0,0.5, -200, -150))
        }

    }

    class ShootingBall extends Enemy{
        constructor(game, x, y, destinX, destinY, type){
            super(game)
            this.x = x
            this.y = y
            this.staggerSpreadInterval = 2000
            this.staggerSpreadTimer = 0
            this.staggerShotInterval = 300
            this.staggerShotTimer = 0
            this.width = 50
            this.height = 50
            this.lives = 2
            this.stagbulletAmount = 15
            this.off = this.stagbulletAmount //* 2
            this.fakeI = 0
            this.destinX = destinX
            this.destinY = destinY
            this.point = 0
            this.inversion = -1
            this.type = type



        }
        update(deltaTime){
            if(this.point <= 35){
                // this.x += this.destinX / 15
                this.x+= ((this.destinX + this.x) - this.x) / 50
                // this.y -= this.destinY / 15
                this.y-= ((this.destinY + this.y) - this.y) / 50
                // this.y+= (this.targetY - this.y) / 50
                this.point++
            }
            if(this.type === 1){
            if(this.staggerSpreadTimer > this.staggerSpreadInterval){
                if(this.staggerShotTimer > this.staggerShotInterval){
                    console.log("ok")
                    // this.staggerShotInterval = 150
                    let offed = 1 / this.off * (this.inversion * this.fakeI) * 400 //400
                    // let onned = 1 / this.off  * this.fakeI * 440 //400
                    this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 3))
                    // this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, onned, 3))
                    this.fakeI++
                    console.log(offed)
                    console.log(this.fakeI)
                    this.staggerShotTimer = 0
                    if(this.fakeI === this.stagbulletAmount){
                        // this.staggerSpreadTimer = 0 // Delete maybe
                        // this.fakeI = 0
                        this.markedForDeletion = true
                    }
                    
                }else this.staggerShotTimer += deltaTime
            }else this.staggerSpreadTimer += deltaTime
         }
        }
        draw(context){
            context.fillRect(this.x,this.y,this.width, this.height)
        }


    }

    class Boss4 extends WhaleBoss1 {
        constructor(game, x, y){
            super(game, x, y)
            this.spawnExplosionTimer = 3000
            this.spawnExplosionInterval = 2000 // was 4000
            this.image = document.getElementById("Boss4")
            this.spriteWidth = 384
            this.spriteHeight = 384
            this.width = this.spriteWidth
            this.height = this.spriteHeight
            this.maxLives = 200
            this.lives = 200
            this.bulletLineTimer = 0
            this.bulletLineInterval = 1000
        }
        update(deltaTime){
            if(this.spawnExplosionTimer > this.spawnExplosionInterval){
                // this.SummonRevengeShips()
                this.spawnWarning()
                this.spawnExplosionTimer = 0
            }else {this.spawnExplosionTimer += deltaTime}
            
            if(this.bulletLineTimer > this.bulletLineInterval){
                // this.bulletLine()
                this.bulletLineTimer = 0
            }else {this.bulletLineTimer+= deltaTime}
            
            //Movement
            this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) 
            this.y = 150 * Math.cos((this.yAngle ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
            this.xAngle+= this.xAngleSpeed
            this.yAngle += this.yAngleSpeed
        }
        spawnWarning(){
            let ExplosionArr = explosionArrayHolder[0]
            for(let i = 0; i < ExplosionArr.length; i++){
                if(ExplosionArr[i] === 1){
                    let x =  i % 7 * 128                          
                    let y = Math.floor(i / 7) * 128
                    this.game.warnings.push(new Warning(this.game, x, y, 128, 128, this.spawnExplosion, x, y))
                }
            }
            explosionArrayHolder.push(explosionArrayHolder.shift())
        }
        bulletLine(){
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 0, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 33, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 66, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 100, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 166, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 266, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 300, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 400, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 100, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 433, -1, 0, 0, 4, 2))
            this.game.enemyProjectiles.push(new SizeVProjectile(this.game, 700, 466, -1, 0, 0, 4, 2))
        

        }
        SummonRevengeShips(){
            this.game.cope.push(new SummonedRevengeShip(this.game, this.x, this.y + this.height * 0.5, 1, "vengeful", 200, 100))
            this.game.cope.push(new SummonedRevengeShip(this.game, this.x, this.y + this.height * 0.5, 1, "vengeful", 200, 25))
            this.game.cope.push(new SummonedRevengeShip(this.game, this.x, this.y + this.height * 0.5, 1, "vengeful", -50, -100))
            this.game.cope.push(new SummonedRevengeShip(this.game, this.x, this.y + this.height * 0.5, 1, "vengeful", -50, 100))
        }
    }

class Meteor {
    constructor(game){
        this.game = game
        this.x = 1000
        this.y = Math.random() * 500
        this.image = document.getElementById("meteor")
        this.speed = 5
        this.width = 64
        this.height = 64
        this.frame = 0
        this.maxFrame = 4
        this.speedY =  Math.random() * (2 - -2) + -2
        this.lives = 2
        this.score = 2
        this.killable = true
        this.frameTimer = 0
        this.frameInterval = 75

    }
    update(deltaTime){
        this.x -= this.speed
        this.y -= this.speedY
        if( this.x + this.width < 0) this.markedForDeletion = true;
        if(this.frameTimer > this.frameInterval){
        this.frame > this.maxFrame ?  this.frame = 0 : this.frame++
        this.frameTimer = 0
        } else this.frameTimer += deltaTime
        // console.log(this.frame)
    }
    draw(context){
        // context.drawImage(this.image, this.x, this.y, this.width, this.height)
        // context.fillRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frame * this.width,  0, this.width, this.height, this.x, this.y, this.width, this.height)
    }

}

class HiveProjectile {
    constructor(game, x, y, ProjectileNum, spread){
        this.game = game
        this.x = x
        this.y = y
        this.num = ProjectileNum
        this.spread = spread
        this.accounted = 0
    }
    spawn(){
        for(let i = Math.ceil(this.num/2); i >= 0; i--){
            this.game.enemyProjectiles.push(new EnemyProjectile(this.game, this.x, this.y  + this.height * 0.5 ,-1, 0))
        }
    }
}


class HomingMissle {
    constructor(game, x, y, inversion, type=1){
        this.game = game
        this.x = x
        this.y = y
        this.inversion = inversion
        this.type = type
        this.image = new Image()
        this.image.src = "assets/container.png"
        this.bing = true
        this.width = 64
        this.height = 64
        this.spriteWidth = 280
        this.spriteHeight = 280
        this.Xorigin = this.x
        this.Yorigin = this.y
        this.angle = 0
        this.speed = 3
        this.lives = 1
        this.frameX = 0
        this.frameY = 0
        this.frameYChanger = 1
        this.killable = true
        this.markedForDeletion = false
        this.hasAfterMath = this.type === 2 ? true : false


        // this.calculateAxes();
    }
    update(){
         if(this.bing){
            this.x = 150 * Math.sin((this.angle * 100 ) * Math.PI/200)  + (this.Xorigin - this.width / 2) 
            }else {
                this.Xorigin = this.x
                this.Yorigin = this.y
                this.angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x)
                if (this.angle < 0) { this.angle += 2 * Math.PI ; }
                // this.speed+= 0.4
                this.x = Math.cos(this.angle) * this.speed + this.Xorigin
                this.y = Math.sin(this.angle) * this.speed + this.Yorigin
            }
            
            if(this.frameX >= 2){
                this.frameX = 0
                this.frameY += this.frameYChanger
                this.frameYChanger *= -1
            }else this.frameX++
            // if(!this.bing){
            //  if(Math.sin(this.angle) > 0.93) this.king = false
            // }


            
            console.log( "this.x: " + this.x)
            if(this.bing){
                this.y += 1 * this.inversion
                this.angle += 0.01
                if(this.angle > 1.8){
                    this.bing = false
                }
            } 
            console.log(this.angle)

    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth,this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x,this.y, this.width, this.height)
        if(this.type === 2){
            context.drawImage(document.getElementById("projectile"), this.x + 20, this.y + 30)
        }
            }
    afterMath(){
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, -0.5, 1, 0, 4, 1))
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, -0.5, 1, 0, 4, 2))
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, -0.5, 1, 0, 4, 3))
        // mid
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 0, 1, 0, 4, 1))
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 0, 1, 0, 4, 2))
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 0, 1, 0, 4, 3))
        // bottom
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 0.5, 1, 0, 4, 1))
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 0.5, 1, 0, 4, 2))
        this.game.enemyProjectiles.push(new TriLine(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5, 1, 0.5, 1, 0, 4, 3))
    }
        
    
    
} 

class DamagingExplosion {
    constructor(game, x, y){
        this.game = game
        this.x = x
        this.y = y
        this.image = document.getElementById("explosion2")
        this.width = 256 / 2
        this.height = 256 / 2
        this.frame = 0
        this.maxFrame = 12
        this.markedForDeletion = false
        this.frame5Counter = 0
        this.frame5Interval = 100
        this.killable = false
        this.passthrough = true
        this.fps = 15
        this.timer = 0
        this.spriteInterval = 1000 / this.fps
    }
    update(deltaTime){
        if(this.frame === 5){
            if(this.frame5Counter > this.frame5Interval){
                this.frame++
                this.frame5Counter = 0
                console.log(this.frame)
            } else this.frame5Counter += deltaTime
        }else {
        if(this.timer > this.spriteInterval){
            this.frame++
            this.timer = 0
        }else {
            this.timer+= deltaTime
        }

        if(this.frame > this.maxFrame){
            this.markedForDeletion = true
        }
    }
    }
    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frame * this.width * 2, 0, this.width *2, this.height * 2, this.x - 60, this.y - 70, this.width * 2, this.height * 2)
    }
}

class Warning {
    constructor(game, x, y, width, height, funct, arg1, arg2){
        this.game = game
        this.x = x
        this.y = y
        this.width = width 
        this.height = height 
        this.funct = funct
        this.opacity = 0.2
        this.aliveTimer = 0
        this.aliveInterval = 1000
        this.markedForDeletion = false
        this.arg1 = arg1
        this.arg2 = arg2
    }
    update(deltaTime){
        this.opacity < 1 ? this.opacity+= 0.025 : this.opacity = 1
        if(this.aliveTimer > this.aliveInterval){
            this.markedForDeletion = true
            this.funct(this.arg1, this.arg2)
        } else {
            this.aliveTimer += deltaTime
        }
    }
    draw(context){
        context.save()
        context.fillStyle = `rgba(250,75,43,${this.opacity})`;
        context.fillRect(this.x,this.y,this.width,this.height);
        context.restore()
    }
}

 class AlienGroup {
    constructor(game, x, inversion, spawnFunction){
        this.game = game
        this.x = x 
        this.inversion = inversion
        this.spawnReady = false
        this.spawnFunction = spawnFunction
        this.markedForDeletion = false
    }
    update(){
        this.x += -1.5 - this.game.speed
        if(this.x <= 1000){
            this.spawnReady = true
        }
        if(this.spawnReady){
            this.spawnFunction(this.game, this.inversion)
            this.markedForDeletion = true
        }
    }
 }



 let ExplosionTemplate = [ 1, 0, 1, 0, 0, 0, 0,
                           1, 0, 0, 0, 0, 0, 1,
                           1, 0, 1, 0, 0, 0, 0,
                           1, 0, 0, 0, 1, 0, 1,]
let ExplosionTemplate2 = [ 1, 0, 1, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1,
                            0, 0, 1, 0, 0, 0, 0,
                            0, 0, 0, 0, 1, 0, 1,]
let ExplosionTemplate3 = [ 1, 0, 1, 0, 0, 0, 0,
                            1, 1, 1, 1, 1, 1, 1,
                            1, 0, 1, 0, 0, 0, 0,
                            1, 0, 0, 0, 1, 0, 1,]
let explosionArrayHolder = [ExplosionTemplate, ExplosionTemplate2, ExplosionTemplate3]

// let x =  i % 7 * 128                          
// let y = Math.floor(i / 7) * 128




export {Enemy, Angler1, Angler2, LuckyFish, HiveWhale, Drone, NewShip, NewShip5, Alien, Aliencu, SprayShip, AlienTarget, Meteor, ShipY, RevengeShip, SummonedRevengeShip, AlienBu, AlienBuPoint, AlienBuCircle, HorseMiniBoss, HomingMissle, WhaleBoss1, WhaleBoss11, WhaleBoss12, Boss3, Boss4, MiniDrone, ShootingBall, DamagingExplosion, Warning, ShipMini, Ship4, MultiShotShip, AlienGroup};




