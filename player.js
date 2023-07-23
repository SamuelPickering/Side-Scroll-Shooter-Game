     class Player {
    constructor(game){
        this.game = game;
        this.width = 96; 
        this.height = 96
        this.x = 60
        this.y = 100
        this.x2 = this.x - 30
        this.y2 = this.y
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 37
        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 3
        this.projectiles = []
        this.image = document.getElementById("player")
        this.ships = [new Ship(this.game, this.x, this.y),new Ship(this.game, this.x-60, this.y + 20), new Ship(this.game, this.x-60, this.y - 20) ] // the 4th and 5th ships are  new Ship(this.game, this.x-60, this.y + 20), new Ship(this.game, this.x-60, this.y - 20)         ,,,, new Ship(this.game, this.x-20, this.y + 40), new Ship(this.game, this.x-20, this.y - 40),
        this.shipsLeft = []
        this.powerUp = false
        this.powerUpTimer = 0 
        this.powerUPLimit = 10000
        this.shooty = true
        this.lives = 3
        this.shootyint = 0
        this.shootytimer = 12000
        this.special = false
        this.places = [100, 140]
        this.isSwitching = false
        this.accounted = 0
        this.invulnerable = false
        this.iFrameCounter = 0
        this.maxImmunity = 22500
    }
    update(deltaTime){

        if(this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed
        else this.speedY = 0
        if(this.game.keys.includes("ArrowLeft")) this.speedX = -this.maxSpeed
        else if (this.game.keys.includes("ArrowRight")) this.speedX = this.maxSpeed
        else this.speedX = 0
        // console.log(this.speedX)
        // console.log("first this.y " + this.speedY)
        let coom = this.y
        if(this.speedX > Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)){
            this.speedX = this.speedX * 0.5
            this.speedY = this.speedY * 0.5
        }
        // console.log(this.speedX)
        // console.log("second this.Y" + this.speedY)
        // console.log(coom - this.y)
        this.x += this.speedX
        this.y += this.speedY
        this.x2 = this.x - 30
        this.y2 = this.y
        this.ships.forEach(ship => {
            ship.update()
        })
        if(this.accounted === this.ships.length){ // this may cause a bug when hit lets see
            console.log("accounted")
            this.isSwitching = false
            let temp = this.ships.shift()
            this.ships.push(temp)
            this.accounted = 0
        } // this may cause a bug when hit lets see
        // vertical boundaries
        if(this.y > this.game.height - this.height * 0.5){ 
         this.y = this.game.height - this.height * 0.5 
         this.speedY = 0
        }
        else if (this.y < -this.height * 0.5){ 
            this.y = -this.height * 0.5
            this.speedY = 0 
        }
        //handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update(deltaTime)
        })
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion )
        // sprite animation
        if (this.frameX < this.maxFrame){
            this.frameX++
        }else {
            this.frameX = 0
        }
        if(this.powerUp){
            if (this.powerUpTimer > this.powerUPLimit){
                this.powerUpTimer = 0
                this.powerUp = false
                this.frameY = 0
            }else {
                this.powerUpTimer += deltaTime
                this.frameY = 1
                this.game.ammo += 0.1
            }
        }
        if(this.shooty){
            if(this.shootyint > this.shootytimer){
                this.shootyint = 0
                this.shooty = false
            } else {
                this.shootyint += deltaTime
            }
        }
        if(this.lives <= 0 && !this.debug){
            this.game.gameOver = true
        }
        // Invulnerability
        if(this.invulnerable){
            if(this.iFrameCounter > this.maxImmunity){
                this.invulnerable = false
                this.iFrameCounter = 0
            } else {
                this.iFrameCounter+= deltaTime
            }
        }
    }
    draw(context){
        if(this.invulnerable){
            context.fillRect(this.x,this.y, this.width, this.height)
        }
        if(this.game.debug) context.strokeRect(this.x2, this.y, this.width, this.height)
        //if (this.shooty) context.fillRect(this.x,this.y, this.width, this.height)
        this.projectiles.forEach(projectile => {
            projectile.draw(context)
        })
        // context.drawImage(this.image, this.x, this.y, this.width, this.height)
        // context.drawImage(this.image, this.x, this.y + 40, this.width, this.height)
        this.ships.forEach(ship => {
            ship.draw(context)
        })

    }
    shootTop(){
        if(this.game.ammo > 0){
        this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 40, 1, 0,6))
        // this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 70, 0))
        if(this.lives >= 2) this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 60 , 1, 0.5,6))
        if(this.lives >= 3) this.projectiles.push(new Projectile(this.game, this.x + 70, this.y , 1, -0.5,6))
        
        this.game.ammo--
        }
        if(this.powerUp){
            this.shootBottom()
        }
        this.releaseBomb()
        
    }
    shootBottom(){
        if(this.game.ammo > 0){
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175))
        }
    }
    enterPowerUp(){
        this.powerUpTimer = 0;
        this.powerUp = true;
        if(this.game.ammo < this.game.ammo) this.game.ammo = this.game.maxAmmo
    }
    shootLaser(){
        this.projectiles.push(new Laser(this.game, this.x + 80, this.y + 175))
        this.special = true
        console.log(this.lives)

    }

    restart(){
        this.x = 60
        this.y = 100
        this.ships = []
        this.ships = [new Ship(this.game, this.x, this.y),new Ship(this.game, this.x-60, this.y + 20), new Ship(this.game, this.x-60, this.y - 20) ]
        this.projectiles = []
        this.lives = 3

    }
    releaseBomb(){
        this.projectiles.push(new Bomb(this.game, this.x, this.y + 40, 0, 0.3, 1))
    }
}



class Ship {
    constructor(game, x, y, pos){
        this.game = game
        this.x = x
        this.y = y
        this.pos = pos
        this.image = document.getElementById("player")
        this.width = 96;
        this.height = 96
        this.desiredX = 0
        this.desiredY = 0
        this.places = 0
        this.switcher = 0
        this.exhaustXOffset =  35
        this.exhaustYOffset = -15
        this.exhaustImage = document.getElementById("playerexhaust")
        this.exhaustWidth = 64
        this.exhaustHeight = 64
        this.exhaustspWidth = 64
        this.exhaustspHeight = 64
        this.exhaustFrame = 0
        this.maxExhaustFrame = 3
        this.frameOffset = 4

    }
    update(){
        this.y += this.game.player.speedY
        this.x += this.game.player.speedX
        if(this.game.player.isSwitching){

            console.log("Switching")
            this.desiredY = this.game.player.ships[ this.game.player.ships.length - 1 - this.game.player.ships.indexOf(this)].y - this.y 
            this.desiredX = this.game.player.ships[ this.game.player.ships.length - 1 - this.game.player.ships.indexOf(this)].x - this.x 
            this.game.player.accounted++
            if(this.game.player.ships.indexOf(this) > 2){
                if(this.desiredY > 0){
                    this.desiredY+= 2
                }else if (this.desiredY < 0) {
                    this.desiredY -= 2
                }
                if(this.desiredX > 0){
                    this.desiredX += 2
                }else if (this.desiredX < 0) {
                    this.desiredX -= 2
                }
            }
            
            console.log( this.y + "switching to " + this.desiredY)
            // if(this.desiredY > 0){
            //     this.y+= 2
            //     this.desiredY-= 2
            // }else if (this.desiredY < 0){
            //     this.y-= 2
            //     this.desiredY+= 2
            // }
        }
        if(this.desiredY > 0){
            this.y+= 2
            this.desiredY-= 2
        }else if (this.desiredY < 0){
            this.y-= 2
            this.desiredY+= 2
        }
        if(this.desiredX > 0){
            this.x+= 2
            this.desiredX-= 2
        }else if (this.desiredX < 0){
            this.x-= 2
            this.desiredX+= 2
        }
        this.exhaustFrame > 3 ? this.exhaustFrame = 0 : this.exhaustFrame++;
        
       
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.exhaustImage, (this.exhaustFrame + this.frameOffset) * this.exhaustspWidth, 0, this.exhaustspWidth, this.exhaustspHeight, this. x - this.exhaustXOffset, this.y - this.exhaustYOffset, this.exhaustWidth, this.exhaustHeight)
    }
}

class GigaPlayer {
    constructor(game){
        this.game = game;
        this.width = 64; //76
        this.height = 18; //50
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.x = 60
        this.y = 100
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 37
        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 4
        this.projectiles = []
        this.image = document.getElementById("playergiga")
        this.invulnerable = false
        this.iFrameCounter = 0
        this.maxImmunity = 22200    //22500
        this.lives = 3
        this.x2 = this.x  + 25
        this.y2 = this.y - 10
        this.shootTimer = 0
        this.shootInterval = 300
        this.angle = 0
        this.axes = [];
        this.calculateAxes();
        this.vx = 0
        this.vy = 0

    }
    update(deltaTime){
        if(this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed
        else this.speedY = 0
        if(this.game.keys.includes("ArrowLeft")) this.speedX = -this.maxSpeed
        else if (this.game.keys.includes("ArrowRight")) this.speedX = this.maxSpeed
        else this.speedX = 0
        // console.log(this.speedX)
        // console.log("first this.y " + this.speedY)
        
        if(this.speedX > Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)){
            this.speedX = this.speedX * 0.5
            this.speedY = this.speedY * 0.5
        }
        if(this.y > this.game.height - this.height * 0.5){ 
            this.y = this.game.height - this.height * 0.5 
            this.speedY = 0
           }
           else if (this.y < -this.height * 0.5){ 
               this.y = -this.height * 0.5
               this.speedY = 0 
           }
        // this.x += this.speedX
        // this.y += this.speedY
        console.log(this.vx)
        this.x += this.vx
        this.y += this.vy
        this.projectiles.forEach(projectile => {
            projectile.update(deltaTime)
        })
        
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion )
        if(this.lives <= 0 && !this.debug){
            this.game.gameOver = true
        }
        // Invulnerability
        if(this.invulnerable){
            if(this.iFrameCounter > this.maxImmunity){
                this.invulnerable = false
                this.iFrameCounter = 0
            } else {
                this.iFrameCounter+= deltaTime
            }
        }

        this.x2 = this.x + 40
        this.y2 = this.y + 60
        this.shootTimer+= deltaTime
        // console.log(this.game.keys)
        if(this.game.input.spacebarPressed){
            this.shootTop()
        }

    }

    draw(context){
        context.save()
        if(this.invulnerable){
            context.fillRect(this.x2,this.y2, this.width, this.height)
            context.globalAlpha = 0.5
        }
        if(this.game.debug) context.strokeRect(this.x2, this.y2, this.width, this.height)
        context.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight)
        this.projectiles.forEach(projectile => {
            projectile.draw(context)
        })
        // context.fillRect(this.x2,this.y2, this.width, this.height)
        context.restore()
    }

    shootTop(){
        console.log( "ShootTop: " + this.shootTimer)
        if(this.shootTimer > this.shootInterval){
        this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 70, 1, 0,6))
        this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 50, 1, 0,6))
        this.shootTimer = 0
        
        this.releaseBomb()
        }
    }




    releaseBomb(){
        this.projectiles.push(new Bomb(this.game, this.x, this.y + 40, 0, 0.3, 1))
    }
    restart(){
        this.x = 60
        this.y = 100
        this.projectiles = []
        this.lives = 3
        this.invulnerable = false
    }
    calculateAxes() {
        let angle = this.angle + Math.PI / 4; // Adjust angle for rectangle corners
        this.axes.push({ x: Math.cos(angle), y: Math.sin(angle) });
        this.axes.push({ x: Math.cos(angle + Math.PI / 2), y: Math.sin(angle + Math.PI / 2) });
    }

    project(axis) {
        let x1 = this.x2 * axis.x;
        let y1 = this.y2 * axis.y;
        let x2 = (this.x2 + this.width) * axis.x;
        let y2 = (this.y2 + this.height) * axis.y;

        return {
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 }
        };
    }

    
}








class Projectile {
    constructor(game, x, y, directionX, directionY, rot, spd){
        this.game = game
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.rot = rot
        this.width = 10
        this.height = 3
        this.speed =  (spd || 3)
        this.markedForDeletion = false
        this.image = document.getElementById("projectile")
        this.piercing = false
        this.damage = 1
        this.va = Math.random() * 0.2 - 0.1  //rotation speed, velocity of angle
        this.angle = 0


    }
    update(){
        if(this.rot === 1){
            this.angle += this.va
        }
        this.x += this.speed * 2
        this.y += this.directionY
        if(this.x > this.game.width * 0.9) this.markedForDeletion = true
    }
    draw(context){
        if(this.rot === 1){
            // context.save()
            //  context.translate(this.x, this.y)
            // context.rotate(this.angle)  // rotating particles
            // context.drawImage(this.image, this.x, this.y)
            // context.restore()
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.strokeRect(
            -this.image.width / 2,
            -this.image.height / 2,
            this.image.width,
            this.image.height
);
            context.restore();
        }else if(this.image === document.getElementById("blue-ball")){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }else{
        context.drawImage(this.image, this.x, this.y);
        }

    }

    screenfilter(){
        if(this.x > this.game.width || this.x < -90 || this.y > 600 || this.y < -90) this.markedForDeletion = true
    }


}

class Laser extends Projectile {
    constructor(game){
        super(game)
        this.x = 40
        this.y = this.game.player.y + 30
        this.width = this.game.width * 0.7
        this.height = 8
        this.markedForDeletion = false
        this.laserTimer = 0
        this.laserMax = 5000
        this.piercing = true
        this.damage = 0.2
    }

    update(deltaTime){
        this.y = this.game.player.y + 44
        this.x = this.game.player.x + 82
        if(this.laserTimer > this.laserMax){
            this.markedForDeletion = true
            this.game.player.special = false
            this.laserTimer = 0
        }else {
            this.laserTimer+= deltaTime
        }
    }

    draw(context){
        // console.log("ig")
        context.fillRect(this.x, this.y, this.width, this.height)
    }

}

class EnemyProjectile extends Projectile {
    constructor(game, x, y, directionX, directionY, rot, speed=2){
        super(game, x, y, directionX, directionY)
        this.speed = speed
        this.markedForDeletion = false
        this.width = 50 //10
        this.rot = rot
        this.image = document.getElementById("projectile")
        this.va = 1 * 0.2 - 0.1  //rotation speed, velocity of angle
        this.angle = 0
    }
    update(){
        if(this.rot === 1){
            this.angle += this.va
        
        }

        this.x += this.speed * 2 * this.directionX
        this.y += this.directionY * this.speed * 2
        if(this.x < 0){ 
        this.markedForDeletion = true
        // console.log("goodbye World")
        }
        // console.log("X of bullet is: " + this.x)
    }

}

class SizeVProjectile extends EnemyProjectile{
    constructor(game, x, y, directionX, directionY, rot, speed=2, size){
    super(game, x, y, directionX, directionY, rot, speed)
    this.size = size
    this.width =  60  * this.size         //30 is the width of the actual image
    this.height = 12 * this.size        //12 is the width of the actual image

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class testEP extends Projectile {
    constructor(game, x, y, directionX, directionY, rot, ang, spd){
        super(game, x, y, directionX, directionY)
        this.speed = 1
        this.speedIncrease = (spd || 1.5)
        this.markedForDeletion = false
        this.rot = rot
        this.ang = ang
        this.image = document.getElementById("projectile")
        this.va = 1 * 0.2 - 0.1  //rotation speed, velocity of angle
        this.xOrigin = this.x
        this.yOrigin = this.y
    }
    update(){
        this.speed += this.speedIncrease
        this.x = Math.sin(this.ang * Math.PI/200) * this.speed + this.xOrigin
        this.y = Math.cos(this.ang * Math.PI/200) * this.speed + this.yOrigin
    }

}

class testEPCircle extends testEP {
    constructor(game, x, y, directionX, directionY, rot, ang, spd){
        super(game, x, y, directionX, directionY, rot, ang, spd)
        this.width = 25
        this.height = 25
        this.image = document.getElementById("blue-ball")
        this.imageWidth = 91
        this.imageHeight = 90
    }

    draw(context){
        context.save()
        // context.strokeStyle = "red";
        // context.strokeRect(this.x, this.y, this.width, this.height)
        context.restore()
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        // context.fillRect(this.x, this.y, this.width, this.height)
    }
}


class Aim extends Projectile {
    constructor(game, x, y, directionX, directionY, rot, ang){
        super(game, x, y, directionX, directionY)
        this.speed = 1
        this.markedForDeletion = false
        this.rot = rot
        this.ang = ang
        // console.log( "this is ang"  + ang)
        this.image = document.getElementById("projectile")
        this.va = 1 * 0.2 - 0.1  //rotation speed, velocity of angle
        this.xOrigin = this.x
        this.yOrigin = this.y
    }
    update(){
        this.speed+= 4
        this.x = Math.cos(this.ang) * this.speed + this.xOrigin
        this.y = Math.sin(this.ang) * this.speed + this.yOrigin
        console.log( "ang:" + this.ang)
    
    }

}
class StaggeredAim extends Aim{
    constructor(game, x, y, directionX, directionY, rot, ang, destinX,destinY, type=1, aimInterval=1000 ){
        super(game, x, y, directionX, directionY,rot,ang)
        this.destinX = destinX
        this.destinY = destinY
        this.type = type
        this.point = 0
        this.aimInterval = aimInterval
        this.aimTimer = 0
        this.aimed = false
        
        this.handleType()
    }
    update(deltaTime){
        if(this.type === 1){
        if(this.point < 50){
             this.x+= ((this.destinX + this.x) - this.x) / 70
             this.y-= ((this.destinY + this.y) - this.y) / 70
             this.point++
        if(this.point === 50){
            let tago = Math.atan2(this.game.player.y2 - this.y - this.height * 0.5, this.game.player.x2 - this.x)
            if (tago < 0) { tago += 2 * Math.PI ; }
            this.ang = tago
            this.xOrigin = this.x
            this.yOrigin = this.y
        }
        }else {
            this.speed+= 4
            this.x = Math.cos(this.ang) * this.speed + this.xOrigin
            this.y = Math.sin(this.ang) * this.speed + this.yOrigin
        }
     }else if(this.type === 2){
        if(!this.aimed){
        this.y+= (this.destinY - this.y) / 30
        this.x += (this.destinX - this.x) / 50
        console.log("ves")
        console.log(deltaTime)
        if(this.aimTimer > this.aimInterval){
            let tago = Math.atan2(this.game.player.y2 - this.y - this.height * 0.5, this.game.player.x2 - this.x)
            if (tago < 0) { tago += 2 * Math.PI ; }
            this.ang = tago
            this.xOrigin = this.x
            this.yOrigin = this.y
            this.aimed = true
        }else {this.aimTimer += deltaTime}
     
    }else {
        console.log("we aiming")
        this.speed+= 4
        this.x = Math.cos(this.ang) * this.speed + this.xOrigin
        this.y = Math.sin(this.ang) * this.speed + this.yOrigin
     }

    }

    }

    handleType(){
        if(this.type === 2){
            this.image = document.getElementById("blue-ball")
            this.width = 25
            this.height = 25
        }
    }
}


class VerticalAimed extends Projectile{
    constructor(game, x, y, yHome, inverison){
        super(game, x, y)
        this.markedForDeletion = false
        this.image = document.getElementById("projectile")
        this.inverison = inverison
        this.inverison !== "inverted" ?  this.yHome = yHome : this.yHome = 500 - yHome
        
        
    }

    update(){
        // if(this.y > this.yHome + 3){
        //     this.y -= 2
        // } else if(this.y < this.yHome  - 3){
        //     this.y += 2
        // } else {
        //     this.x--
        // }
        this.y+= (this.yHome - this.y) / 10
        if(Math.floor(this.y) === Math.floor(this.yHome)) this.x--
        if(this.inverison === "inverted"){
            if(Math.floor(this.y + 1) === Math.floor(this.yHome)) this.x--
        }

    }
}


    class VerticalAimed2 extends Projectile{
        constructor(game, x, y, yHome, xSpeed){
            super(game, x, y)
            this.markedForDeletion = false
            this.image = document.getElementById("projectile")
            this.yHome = yHome
            this.ySpeed = this.yHome / 20
            this.positioned = false
            this.point = 0
            this.xSpeed = xSpeed -2
            this.width =   60          //30 is the width of the actual image
            this.height = 12         //12 is the width of the actual image
        }
        update(){
            if(!this.positioned){
                this.y += this.ySpeed
                this.point++
                if(this.point >= 20){
                    this.positioned = true
                    console.log("Positioned!")
                } 
            } else {
                this.x += this.xSpeed
            }
            // console.log(this.x, this.y)
        }
        draw(context){
        // context.drawImage(this.image, this.x, this.y)
         context.drawImage(this.image, this.x, this.y, this.width, this.height);
        //  context.strokeRect(this.x, this.y, this.width, this.height)
            } 
    
        
    }

    class TopSinDown extends Projectile{
        constructor(game, x, y, xHome, yHome, angleSpeed){
            super(game, x, y)
            this.markedForDeletion = false
            this.image = document.getElementById("projectile")
            this.xHome = xHome
            this.yHome = yHome
            this.xSpeed = (this.xHome - this.x) / 15
            this.ySpeed = (this.yHome  - this.y) / 15
            this.positioned = false
            this.point = 0
            this.xOrigin = 0
            this.angle = 0
            this.angleSpeed = angleSpeed
        }
        update(){
            if(!this.positioned){
                this.x += this.xSpeed
                this.y += this.ySpeed
                this.point++
                if(this.point >= 15){
                    this.positioned = true
                    console.log("Positioned!")
                    this.xOrigin = this.x
                } 
            } else {
                this.x = 20 * Math.sin((this.angle ) * Math.PI/200) + (this.xOrigin - this.width / 2)
                this.y++
                this.angle += this.angleSpeed
            }
            console.log(this.x, this.y)
        }
    }

    class CurveBullet extends Projectile {
        constructor(game, x, y, anglespeed, inverison){
            super(game, x, y)
            this.image = document.getElementById("projectile")
            this.angle = 0
            this.angleSpeed = anglespeed
            this.inversion = inverison
            this.curveRadius = 60
            this.curveHeight = 30
            this.yOrigin = this.y

        }
        update(){
            this.x -= 2
            this.y = this.curveRadius * Math.cos((this.angle) * Math.PI/200) * this.inversion + (this.yOrigin - this.height / 2) 
            this.angle += this.angleSpeed
            console.log(this.y)
        }
        
      
    }

    class Bomb extends Projectile{
        constructor(game, x, y, launch, gravity, speed){
            super(game, x, y)
            this.launch = launch
            this.gravity = gravity
            this.speed = speed
            this.image =  document.getElementById("projectile")
        }
        update(){
            this.x+= this.speed
            this.y -= this.launch
            this.launch -= this.gravity
        }
    }


    class SinRadiusProjectile extends Projectile {
        constructor(game, x, y, rot,angleOffset  ){
            super(game, x, y)
            this.speed = 1
            this.markedForDeletion = false
            this.rot = rot - 2
            this.angleSpeed = 2
            this.angleOffset = angleOffset
            this.image = document.getElementById("slash")
            //this.va = 0 * 1 * 0.2 - 0.1  //rotation speed, velocity of angle
            this.xOrigin = this.x
            this.yOrigin = this.y
            this.radiusMultiplier = 100
            this.xFlight = 1
            this.radiusAngle = 0
            this.radiusSpeed = 0.02
            this.spriteWidth = 312
            this.spriteHeight = 566
            this.width = this.spriteWidth / 10
            this.height = this.spriteHeight / 10
            this.va = Math.random() * 0.2 - 0.1  //rotation speed, velocity of angle
            this.bullAngle = 0
        }
    
    
    
       update(){
        this.x = (100 * Math.abs(Math.sin(this.radiusAngle))) * Math.sin((this.angle + this.angleOffset) * Math.PI/200) + (this.xOrigin - this.width / 2) + this.xFlight
        this.y = (100 * Math.abs(Math.sin(this.radiusAngle))) * Math.cos((this.angle + this.angleOffset) * Math.PI/200) + (this.yOrigin - this.height / 2) 
        this.angle += this.angleSpeed
        this.xFlight -= 1
        this.radiusAngle += this.radiusSpeed
        this.bullAngle += this.va
       }

       draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)

    }

    }

    class TriLine extends EnemyProjectile {
        constructor(game, x, y, directionX, directionY, rot, ang, speed, offset){
            super(game, x, y, directionX, directionY, rot, ang, speed)
            this.speed = speed
            this.positioned = false
            this.yHome = this.y + this. directionY * 15
            this.point = 0
            this.offset = offset
        }
        update(){
            if(!this.positioned){
                this.y += this.directionY * this.offset
                this.x += this.directionX * this.offset
                this.point++
                if(this.point >= 15){
                    this.positioned = true
                    console.log("Positioned!")
                } 
            } 
            if(this.positioned){
                console.log("ok move now")
                this.y +=  -1 * this.directionY * this.speed
                this.x += -1 * this.directionX * this.speed
            }
            console.log(this.x, this.y)
            if(this.x < 0){ 
                this.markedForDeletion = true
                // console.log("goodbye World")
                }
        }
        
        
        
    }




// MovementX = this.speedX
// MovementY = this.speedY
// weird shit moveDistance = Math.sqrt(this.speedX * this.speedX + this.speedY * move.y)
/*

 MovementX = this.speedX
 MovementY = this.speedY
 weird shit moveDistance = Math.sqrt(this.speedX * this.speedX + this.speedY * this)
 if(moveDistance > move)
*/

export {Projectile, EnemyProjectile, testEP, Aim, VerticalAimed, SizeVProjectile, VerticalAimed2, Bomb, TopSinDown, CurveBullet, Player, GigaPlayer, SinRadiusProjectile, testEPCircle, TriLine, StaggeredAim}