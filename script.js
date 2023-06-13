import Player from "./player.js"
import UI from "./ui.js"
import { Angler1, Angler2, LuckyFish, HiveWhale, Drone, NewShip, Alien, Aliencu, NewShip5} from "./enemy.js"
import InputHandler from "./input.js"
import { Background, Layer} from "./background.js"




window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 1000
    canvas.height = 500
    console.log(shipped)

    const shipMap = []
    const tileShips = []
    // i is increased by 220 bc there are 220 tiles
    let tileAmount = 220
    for(let i = 0; i < shipped.length; i+= tileAmount){
        shipMap.push(shipped.slice(i, i + tileAmount))
    }
    console.log(shipMap)

    // shipMap.forEach((row, i) =>{
    //     row.forEach((symbol, j) => {
    //         // console.log(j)
    //         if(symbol === 2449){
    //         console.log(j * 32)
    //         tileShips.push(new NewShip(this, j * 32,i * 32))
    //         }
    //     })
    // })


    class Particle {
        constructor(game, x, y, image){
            this.game = game
            this.x = x;
            this.y = y;
            this.image = image
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 50
            this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1)
            this.size = this.spriteSize * this.sizeModifier
            this.speedX = Math.random() * 6 - 3
            this.speedY = Math.random() * -15;
            this.gravity = 0.5
            this.markedForDeletion = false
            this.angle = 0
            this.va = Math.random() * 0.2 - 0.1  //rotation speed, velocity of angle
            // this.bounced = false
            // this.bottomBounceBoundary = 100

        }
    
        
        update(){
            this.angle += this.va
            this.speedY += this.gravity
            this.x -= this.speedX + this.game.speed
            this.y += this.speedY;
            if(this.y > this.game.height + this.size || this.x < 0 - this.size){ 
            this.markedForDeletion = true
            }

        }
        draw(context){
            context.save()
            context.translate(this.x, this.y)
            context.rotate(this.angle)  // rotating particles
           context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size)
            context.restore()
        }

    }

    class Explosion {
        constructor(game, x, y){
            this.game = game
            // this.x = x
            // this.y = y
            this.frameX = 0
            this.maxFrame = 10
            this.spriteHeight = 128
            this.spriteWidth = 128
            this.width = this.spriteWidth
            this.height = this.spriteHeight
            this.x = x - this.width / 2
            this.y = y - this.height /2 
            this.fps = 15
            this.timer = 0
            this.spriteInterval = 1000 / this.fps
            this.markedForDeletion = false
            this.image = document.getElementById("explosion")
        }
        update(deltaTime){
            if(this.timer > this.spriteInterval){
                this.frameX++
                this.timer = 0
            }else {
                this.timer+= deltaTime
            }

            if(this.frameX > this.maxFrame){
                this.markedForDeletion = true
            }
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.spriteWidth , 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }



    class PowerUps {
        constructor(game, x, y){
            this.game = game
            this.x = x
            this.y = y
            this.width = 100
            this.height = 100
            this.image = document.getElementById("shipUp")
            this.markedForDeletion = false
        }
        update(){
            this.x -= this.game.speed + 1
            if( this.x + this.width < 0) this.markedForDeletion = true;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }


    }
    class Game {
        constructor(width, height){
            this.width = width
            this.height = height
            this.background = new Background(this)
            this.player = new Player(this);
            this.input =  new InputHandler(this)
            this.ui = new UI(this)
            this.keys = []
            this.enemies = [new Alien(this)]
            this.enemyProjectiles = []
            this.particles = []
            this.explosions = []
            this.powerUps = []
            this.enemyTimer = 0
            this.enemyInterval = 1000;
            this.ammo = 20
            this.maxAmmo = 50
            this.ammoTimer = 0
            this.ammoInterval = 500
            this.gameOver = false;
            this.score = 0
            this.winningScore = 50
            this.gameTime = 0
            this.timeLimit = 55000
            this.speed = 1
            this.debug = false
            this.cope = tileShips
            shipMap.forEach((row, i) =>{
                row.forEach((symbol, j) => {
                    // console.log(j)
                    if(symbol === 1){
                    console.log(j * 32)
                    tileShips.push(new NewShip(this, j * 32,i * 32 , 1, "type0"))
                    }else if(symbol === 3){
                        tileShips.push(new NewShip(this, j * 32,i * 32 , 1, "type1"))
                    }
                })
            })
            this.cope.push(new Alien(this))
            this.cope.push(new Aliencu(600, 1, "type1"))
            this.cope.push(new Aliencu(650, 1, "type1"))
            this.cope.push(new Aliencu(700, 1, "type1"))
            this.cope.push(new Aliencu(750, 1, "type1"))
            this.cope.push(new Aliencu(800, 1, "type1"))
            this.cope.push(new NewShip5(this, 850, 200, 1, "type0"))
        }
        update(deltaTime){
            if(!this.gameOver) this.gameTime += deltaTime
            if(this.gameTime > this.timeLimit) this.gameOver = true
            this.background.update()
            // this.background.layer4.update()
            this.player.update(deltaTime)
            if (this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0
            }else {
                this.ammoTimer += deltaTime
            }
            this.particles.forEach(particle => particle.update())
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)
            this.explosions.forEach(explosion => explosion.update(deltaTime))
            this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion)
            this.enemyProjectiles.forEach(projectile => {
                projectile.update(deltaTime)
                if (this.checkCollisons2(this.player, projectile)){
                    projectile.markedForDeletion = true
                    this.player.lives--              // for now we are popping not shifting
                    if(this.player.ships.length > 1){
                    this.player.shipsLeft.push(this.player.ships.pop())
                    }
                }

            })
            this.enemyProjectiles= this.enemyProjectiles.filter(projectile => !projectile.markedForDeletion )
            // replacing enemies with cope ship array
            this.cope.forEach(enemy => {
                enemy.update(deltaTime);
                if (this.checkCollisons2(this.player, enemy)){
                   enemy.markedForDeletion = true
                    this.player.lives--
                    if(this.player.ships.length > 1){
                        this.player.shipsLeft.push(this.player.ships.pop())
                        }
                   if(enemy.type === "lucky") this.player.enterPowerUp() 
                   else{ 
                    if(!this.gameOver) this.score-- ;     }                    
                }


            this.powerUps.forEach(power => {
                if (this.checkCollisons(this.player, power)){
                    power.markedForDeletion = true
                    this.player.shooty = true
                    this.player.shootyint = 0
                }
            })

               this.player.projectiles.forEach(projectile => {
                if(this.checkCollisons(projectile, enemy)){
                    //console.log("bruh") this helped way to much
                    enemy.lives-= projectile.damage
                    if(!projectile.piercing) projectile.markedForDeletion = true
                    if(enemy.hasParts){
                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5, enemy.parts))
                    }
                    if (enemy.lives <= 0){
                        enemy.markedForDeletion = true;
                        this.addExplosion(enemy)
                        if (enemy.type === "hive"){
                            for(let i = 0; i < 2; i++){
                            this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width , enemy.y + Math.random() * enemy.height * 0.5))
                            }
                        }
                        if(enemy.item){
                            this.powerUps.push(new PowerUps(this, enemy.x, enemy.y))
                        }
                        
                        if(!this.gameOver)this.score += enemy.score
                        if( this.score > this.winningScore) this.gameOver = true
                    }
                }
               })
            })
            // replacing instances of enemies array with cope ship
            this.cope = this.cope.filter(enemy => !enemy.markedForDeletion)
            this.powerUps.forEach(power => {power.update()})
            this.powerUps = this.powerUps.filter(power => !power.markedForDeletion)
            if( this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy()
                this.enemyTimer = 0
            }else {
                this.enemyTimer += deltaTime
            }
            // console.log(this.enemyProjectiles)

        }
        draw(context){
            this.background.draw(context)
            this.ui.draw(context)
            this.player.draw(context)
            this.particles.forEach(particle => particle.draw(context))
            this.powerUps.forEach(power => power.draw(context))
            this.cope.forEach(enemy => {
                enemy.draw(context)
            })
            this.explosions.forEach(explosion => explosion.draw(context))
            this.enemyProjectiles.forEach(proj => proj.draw(context))



        }
        addEnemy(){
            const randomize = Math.random();
            if(randomize < 0.3) this.enemies.push(new Angler1(this))
            else if (randomize < 0.6) this.enemies.push(new LuckyFish(this))
            else if (randomize < 0.8) this.enemies.push(new HiveWhale(this))
            else this.enemies.push(new Angler2(this))
        }
        addExplosion(enemy){
            this.explosions.push(new Explosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
        }
        checkCollisons(rect1, rect2){
           
            return ( rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y) 
                          
        }
        checkCollisons2(rect1, rect2){
           
            return ( rect1.x2 < rect2.x + rect2.width &&
                    rect1.x2 + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y) 
                          
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lasTime = 0
    //animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lasTime
        lasTime = timeStamp
        ctx.clearRect(0,0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
    console.log("hi")
})