



 export default class Player {
    constructor(game){
        this.game = game;
        this.width = 120;
        this.height = 190
        this.x = 20
        this.y = 100
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 37
        this.speedY = 0
        this.maxSpeed = 2
        this.projectiles = []
        this.image = document.getElementById("player")
        this.powerUp = false
        this.powerUpTimer = 0 
        this.powerUPLimit = 10000
        this.shooty = false
        this.shootyint = 0
        this.shootytimer = 12000
        this.special = false
    }
    update(deltaTime){
        if(this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed
        else this.speedY = 0
        this.y += this.speedY
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
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)

    }
    shootTop(){
        if(this.game.ammo > 0){
        this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
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






class Projectile {
    constructor(game, x, y){
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
    }
    update(){
        this.x += this.speed
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