    export default class Player {
    constructor(game){
        this.game = game;
        this.width = 96;
        this.height = 96
        this.x = 60
        this.y = 100
        this.x2 = this.x - 30
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
    }
    draw(context){
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
        this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 40, 1, 0))
        // this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 70, 0))
        if(this.lives >= 2) this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 60 , 1, 0.5))
        if(this.lives >= 3) this.projectiles.push(new Projectile(this.game, this.x + 70, this.y , 1, -0.5))
        
        this.game.ammo--
        }
        if(this.powerUp){
            this.shootBottom()
        }
        
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






class Projectile {
    constructor(game, x, y, directionX, directionY, rot){
        this.game = game
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.rot = rot
        this.width = 10
        this.height = 3
        this.speed = 3
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
        }else{
        context.drawImage(this.image, this.x, this.y);
        }

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
    constructor(game, x, y, directionX, directionY, rot){
        super(game, x, y, directionX, directionY)
        this.speed = 2
        this.markedForDeletion = false
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
        this.y += this.directionY
        if(this.x < 0){ 
        this.markedForDeletion = true
        // console.log("goodbye World")
        }
        // console.log("X of bullet is: " + this.x)
    }

}


class testEP extends Projectile {
    constructor(game, x, y, directionX, directionY, rot, ang){
        super(game, x, y, directionX, directionY)
        this.speed = 2
        this.markedForDeletion = false
        this.rot = rot
        this.ang = ang
        console.log(ang)
        this.image = document.getElementById("projectile")
        this.va = 1 * 0.2 - 0.1  //rotation speed, velocity of angle
        this.angle = 0
    }
    update(){
        this.x += Math.sin(this.ang) * this.speed
        this.y += Math.cos(this.ang) * this.speed
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

export {Projectile, EnemyProjectile, testEP}