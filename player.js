



 export default class Player {
    constructor(game){
        this.game = game;
        this.width = 96;
        this.height = 96
        this.x = 60
        this.y = 100
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 37
        this.speedY = 0
        this.maxSpeed = 2
        this.projectiles = []
        this.image = document.getElementById("player")
        this.ships = [new Ship(this.game, this.x, this.y), new Ship(this.game, this.x-20, this.y + 40), new Ship(this.game, this.x-20, this.y - 40), new Ship(this.game, this.x-60, this.y + 20), new Ship(this.game, this.x-60, this.y - 20)]
        this.powerUp = false
        this.powerUpTimer = 0 
        this.powerUPLimit = 10000
        this.shooty = false
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
        this.y += this.speedY
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
        if(this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5
        else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5
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
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        if (this.shooty) context.fillRect(this.x,this.y, this.width, this.height)
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
        this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 60, 0))
        if(this.shooty){
        this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 70 , 0.5))
        this.projectiles.push(new Projectile(this.game, this.x + 100, this.y + 50, -0.5))
        }
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
        

    }
    update(){
        this.y += this.game.player.speedY
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

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}






class Projectile {
    constructor(game, x, y, direction){
        this.game = game
        this.x = x
        this.y = y
        this.width = 10
        this.height = 3
        this.speed = 3
        this.markedForDeletion = false
        this.image = document.getElementById("projectile")
        this.piercing = false
        this.damage = 1
        this.direction = direction
    }
    update(){
        this.x += this.speed * 2
        this.y += this.direction
        if(this.x > this.game.width * 0.8) this.markedForDeletion = true
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y);
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
        console.log(this)
    }

    update(deltaTime){
        this.y = this.game.player.y + 30
        if(this.laserTimer > this.laserMax){
            console.log("deleted")
            this.markedForDeletion = true
            this.game.player.special = false
            this.laserTimer = 0
        }else {
            console.log(this.laserTimer)
            this.laserTimer+= deltaTime
        }
    }

    draw(context){
        // console.log("ig")
        context.fillRect(this.x, this.y, this.width, this.height)
    }

}