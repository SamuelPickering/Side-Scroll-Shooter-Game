import {Player, GigaPlayer} from "./player.js"
import UI from "./ui.js"
import { Angler1, Angler2, LuckyFish, HiveWhale, Drone, NewShip, Alien, Aliencu, NewShip5, SprayShip, AlienTarget, Meteor, ShipY,RevengeShip, SummonedRevengeShip, AlienBu, AlienBuPoint, AlienBuCircle, HorseMiniBoss, HomingMissle, WhaleBoss1, WhaleBoss11, WhaleBoss12, Boss3, Boss4, ShootingBall, DamagingExplosion, ShipMini, Ship4, MultiShotShip, AlienGroup} from "./enemy.js"
import { spawnCu5, spawnCu6, spawnCu7 } from "./group spawners.js"
// import InputHandler from "./input.js"
import { InputHandler1 } from "./input.js"
import { Background, Layer} from "./background.js"




window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 1000
    canvas.height = 500
    console.log(shipped)
    ctx.imageSmoothingEnabled = false;

    const shipMap = []
    // let this.cope = []
    // i is increased by 220 bc there are 220 tiles
    let tileAmount = 220
    let Level1TileAmount = 250
    let Level2TileAmount = 400
    // for(let i = 0; i < shipped.length; i+= tileAmount){
    //     shipMap.push(shipped.slice(i, i + tileAmount))
    // }
    // for(let i = 0; i < Level1.length; i+= Level1TileAmount){
    //     shipMap.push(Level1.slice(i, i + Level1TileAmount))
    // }
       for(let i = 0; i < Level2.length; i+= Level2TileAmount){
        shipMap.push(Level2.slice(i, i + Level2TileAmount))
    }
    console.log(shipMap)

    // shipMap.forEach((row, i) =>{
    //     row.forEach((symbol, j) => {
    //         // console.log(j)
    //         if(symbol === 2449){
    //         console.log(j * 32)
    //         this.cope.push(new NewShip(this, j * 32,i * 32))
    //         }
    //     })
    // })
    
    let inversioncount = 0
    let gamesong = new Audio()
    // gamesong.src = "assets/Lovely VGM 522 - Command & Conquer_ Tiberian Sun - Scouting.mp3"
    // gamesong.src = "assets/Unholy Ambush.mp3"
    gamesong.src = "assets/09 H.G. Virus.mp3"
    // gamesong.src = "assets/13 Adam.mp3"
    gamesong.currentTime = 0
    // gamesong.play();                                   //UN COMMENT FOR SOUND
    let songtimer = 0
    function musicUpdate( songtimer, deltaTime, gamesong){
        songtimer += deltaTime
        if(songtimer > 105000 && !gamesong.paused){
            gamesong.pause()
            songtimer = 0
        }else if(gamesong.paused) {
            gamesong.currentTime = 1
            gamesong.play()
        }
        
        return songtimer
    }

    


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
            context.drawImage(this.image, this.frameX * this.spriteWidth , 0, this.spriteWidth , this.spriteHeight , this.x, this.y, this.width , this.height )
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
            // this.player = new Player(this);
            this.player = new GigaPlayer(this);
            this.input =  new InputHandler1(this)
            this.ui = new UI(this)
            this.keys = []
            this.enemies = [new Alien(this)]
            this.enemySpawners = []
            this.enemyProjectiles = []
            this.particles = []
            this.explosions = []
            this.bossExplosions = []
            this.powerUps = []
            this.obstacles = []
            this.warnings = []
            this.meteorTimer = 0
            this.meteorInterval = 400;
            // this.meteorSpawn = true
            this.offset =   0
            this.ammo = 1
            this.maxAmmo = 2
            this.ammoTimer = 0
            this.ammoInterval = 500
            this.gameOver = false;
            this.paused = false
            this.score = 0
            this.winningScore = 5000
            this.gameTime = 0
            this.timeLimit = 345000
            this.speed = 1
            this.debug = false
            this.cope = []
            this.notInvertedCount = 0
            this.invertedCount = 0
            this.bossLevel = true
            this.bossDamage = 0
            // this.cope.push(new Aliencu (this, 0, 400, "type8", 1, 1))
            // this.cope.push(new Aliencu (this, 1200 + 32 * 2, 40, "type5", 1, 0))
            // this.cope.push(new Aliencu (this, 1200 + 32 * 4, 40, "type5", 1, 0))

            // this.cope.push(new Aliencu (this, -200, 440, "type6", -1, 0))
            // this.cope.push(new Aliencu (this, -200 + 32 * 2, 440, "type6", -1, 0))
            // this.cope.push(new Aliencu (this, -200 + 32 * 4, 440, "type6", -1, 0))
            // this.cope.push(new Aliencu (this, 1000  + 32 * 6, 40, "type5", 1, 0))

            // this.cope.push(new SprayShip (this,  + 550, 200, 1, "type0"))
            // this.cope.push(new WhaleBoss12(this, 750, 200,))                       //WhaleBoss
            // this.cope.push(new Boss3(this, 650, 250,))   ///     remember this
            // this.cope.push(new Boss4 (this, 650, 250 ))
            // this.cope.push(new WhaleBoss12(this))
            // this.cope.push(new ShootingBall(this, 500, 100, 240, 70))                      
            // this.cope.push(new HorseMiniBoss(this,800, 100, 1, "type0" ))
            // this.cope.push(new AlienTarget(this, 200, 1, "type1"))
            // this.cope.push(new AlienBuCircle(this, 0))
            // this.cope.push(new AlienBuCircle(this, 100))
            // this.cope.push(new AlienBu(this, 700,200))
            // this.cope.push(new AlienBuPoint(this, 500,200))
            // this.cope.push(new AlienBuPoint(this, 500,300))
            // this.cope.push(new AlienBuPoint(this, 500,400))
            // this.cope.push(new AlienBuPoint(this, 800,200))
            // this.cope.push(new AlienBuPoint(this, 800,400))
            // this.cope.push(new AlienBu (this, 0, 400, "type2"))
            // this.cope.push(new AlienBuCircle(this, 300))
            // this.cope.push(new ShipY (this, 200, 0, 1, "type0"))
            // this.cope.push(new ShipY (this, 250, 500, -1, "type0"))
            // this.cope.push(new NewShip5(this,750, 200, 1, "type0"))
            // this.cope.push(new Ship4(this, 500, 200, 1))
            // this.cope.push(new RevengeShip(this,700, 100, 1, "vengeful" ))
            // this.obstacles.push(new Meteor(this))
            // this.cope.push(new ShipMini(this, 400, 200, 1, "type0", 1) )
            // (game, x, y, inversion, type, id)
            // this.cope.push(new Aliencu(this, 200, 250, "type2", -1))
            // this.cope.push(new Aliencu(this, 400, 250, "type2", 1))
            // this.cope.push(new Aliencu(this, 600, 250, "type2", -1))
            // this.cope.push(new Aliencu(this, 800, 250, "type2", 1))
            // this.cope.push(new MultiShotShip(this, 900, 200))

        }

        update(deltaTime){
            // console.log(deltaTime)
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
                    if(!this.debug && !this.player.invulnerable){
                    this.player.lives--              // for now we are popping not shifting
                    this.player.invulnerable = true
                    if(this.player.ships){
                    if(this.player.ships.length > 1){
                    this.player.shipsLeft.push(this.player.ships.pop())
                    } }
                  }
                }
                projectile.screenfilter()

            })
            this.enemyProjectiles= this.enemyProjectiles.filter(projectile => !projectile.markedForDeletion )
            // replacing enemies with cope ship array
            this.cope.forEach(enemy => {
                enemy.update(deltaTime);
                if (this.checkCollisons2(this.player, enemy)){
                   if(!enemy.boss)enemy.markedForDeletion = true
                   if(!this.debug && !this.player.invulnerable){
                    this.player.lives--
                    this.player.invulnerable = true
                    if(this.player.ships){
                    if(this.player.ships.length > 1){
                        this.player.shipsLeft.push(this.player.ships.pop())
                        } }
                    }
                   if(enemy.type === "lucky") this.player.enterPowerUp() 
                   else{ 
                    if(!this.gameOver) this.score-- ;     }                    
                }

               




               this.player.projectiles.forEach(projectile => {
                if(this.checkCollisons(projectile, enemy)){
                    //console.log("bruh") this helped way to much
                    enemy.lives-= projectile.damage
                    if(!projectile.piercing) projectile.markedForDeletion = true
                    // if(enemy.hasParts){
                    // this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5, enemy.parts))
                    // }
                    if(enemy.boss){
                        enemy.damaged = true
                        enemy.damagedTimer = 0
                    }
                    if (enemy.lives <= 0 && !enemy.boss){
                        if(enemy.type === "vengeful"){
                            enemy.vengeShot()
                        }
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
                    }
                }
               })

               if(this.bossLevel === true){
                this.obstacles.forEach((obs) => {
                    if(!enemy.boss){
                    if(this.checkCollisons(obs, enemy)){
                        if(enemy.type === "vengeful"){
                            enemy.vengeShot()
                        }
                        enemy.markedForDeletion = true;
                        this.addExplosion(enemy)
                    }
                    }
                })

                }
               
            })
            this.enemySpawners.forEach(spawner => spawner.update())
            this.powerUps.forEach(power => {
                if (this.checkCollisons(this.player, power)){
                    power.markedForDeletion = true
                    this.player.shooty = true
                    this.player.shootyint = 0
                }
            })
            this.obstacles.forEach(obs => {
                if(this.checkCollisons2(this.player, obs)){
                    if(obs.hasAfterMath) obs.afterMath()
                    if(obs.killable) obs.markedForDeletion = true
                    if(!this.debug && !this.player.invulnerable){
                        this.player.lives--
                        this.player.invulnerable = true
                        if(this.player.ships){
                        if(this.player.ships.length > 1){
                            this.player.shipsLeft.push(this.player.ships.pop())
                            } }
                        }
                
                }

                this.player.projectiles.forEach(projectile => {
                    if(obs.rotating){
                        this.rectanglesIntersect(projectile, obs)
                    }else {
                    if(!obs.passthrough){
                    if(this.checkCollisons(projectile, obs)){
                        obs.lives-= projectile.damage
                        if(!projectile.piercing) projectile.markedForDeletion = true
                        if(obs.lives <= 0){
                            obs.markedForDeletion = true
                            if(obs.hasAfterMath) obs.afterMath()
                        }
                    }
                    }
                }
            })
            
        })
            // replacing instances of enemies array with cope ship
            this.cope = this.cope.filter(enemy => !enemy.markedForDeletion)
            this.enemySpawners = this.enemySpawners.filter(spawner => !spawner.markedForDeletion)
            this.powerUps.forEach(power => {power.update()})
            this.powerUps = this.powerUps.filter(power => !power.markedForDeletion)
            this.obstacles = this.obstacles.filter(obs => !obs.markedForDeletion)
            this.obstacles.forEach(obs => obs.update(deltaTime))
            this.warnings =  this.warnings.filter(warning => !warning.markedForDeletion)
            this.warnings.forEach(warning => warning.update(deltaTime))
            this.input.update()
            if(this.meteorSpawn) this.addMeteor(deltaTime)

            //  songtimer = musicUpdate(songtimer, deltaTime, gamesong)
            if(transitionFade)BlackFadeUpdate(deltaTime)
            // console.log(this.enemyProjectiles)

        }
        draw(context){
            this.background.draw(context)
            this.warnings.forEach(warning => warning.draw(context))
            this.player.draw(context)
            this.particles.forEach(particle => particle.draw(context))
            this.powerUps.forEach(power => power.draw(context))
            // this.obstacles.forEach(obs => obs.draw(context))
            this.cope.forEach(enemy => {
                enemy.draw(context)
            })
            this.obstacles.forEach(obs => obs.draw(context))
            this.explosions.forEach(explosion => explosion.draw(context))
            this.enemyProjectiles.forEach(proj => proj.draw(context))
            // context.fillRect(1000 - 100/2,100, 100, 30 )
            // context.fillRect(1000 - 100,200, 100, 30 )
            // context.fillRect(980 ,300, 100, 30 )
            // context.fillRect(1000 + 100/2,400, 100, 30 )
            // context.fillRect(800,450, 100, 30 )
            this.ui.draw(context)
            if(transitionFade) BlackFadeDraw(context)



        }
        addMeteor(deltaTime){
            if(this.meteorTimer > this.meteorInterval){
            this.obstacles.push(new Meteor(this))
            this.meteorTimer = 0
            } else this.meteorTimer += deltaTime
        }
        addExplosion(enemy){
            this.explosions.push(new Explosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5 ))
            // this.explosions.push(new Explosion(this, enemy.x + enemy.width * 0.5, 200 ))
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
                    rect1.y2 < rect2.y + rect2.height &&
                    rect1.height + rect1.y2 > rect2.y) 
                          
        }
         rectanglesIntersect(rect1, rect2) {
            function lineIntersects(line1Start, line1End, line2Start, line2End) {
                let q1 = line1Start.cross(line2Start) * line1Start.cross(line2End);
                let q2 = line1End.cross(line2Start) * line1End.cross(line2End);
                return q1 <= 0 && q2 <= 0; }
            rect2.calculateAxes()
            let axes = [...rect1.axes, ...rect2.axes];
    
            for (let axis of axes) {
                let rect1Projection = rect1.project(axis);
                let rect2Projection = rect2.project(axis);
    
                if (!lineIntersects(rect1Projection.start, rect1Projection.end, rect2Projection.start, rect2Projection.end)) {
                    return false;
                }
            }
    
            return true;
        }
        restartGame(){
            this.cope.splice(0, this.cope.length)
            this.invertedCount = 0
            this.notInvertedCount = 0
            console.log(this.cope)
            this.gameTime = 0
            this.score = 0
            this.enemyProjectiles = []
            this.particles = []
            this.explosions = []
            this.powerUps = []
            this.obstacles = []
            this.warnings = []
            this.ammo = 1
            let wasGameOver = false
            if(this.gameOver){wasGameOver = true }
            //  this.spawnEnemies()
            console.log(this.cope)
            this.player.restart()
            this.background.restart()
            gamesong.currentTime = 1               // UNCOMMENT THIS STUFF OUT
            gamesong.play();
            // songtimer = 0
            this.gameOver = false
            this.paused = false
            if(wasGameOver) animate(0)

        }
        playBoss(num){
            this.restartGame()
            if(num === 2){ 
                this.cope.push(new WhaleBoss12(this, 750, 200,))   
                gamesong.src = "assets/13 Adam.mp3"
                gamesong.currentTime = 1               
                gamesong.play()
            }                    //WhaleBoss
            else if (num === 3){ 
                this.cope.push(new Boss3(this, 650, 250,))
                gamesong.src = "assets/09 H.G. Virus.mp3"
                gamesong.currentTime = 1               
                gamesong.play()
            }   ///     remember this
            else if(num === 4) {this.cope.push(new Boss4 (this, 650, 250 ))
                gamesong.src = "assets/Unholy Ambush.mp3"
                gamesong.currentTime = 1               
                gamesong.play() }
        }
        stopMusic(){
            gamesong.pause()
            gamesong.currentTime = 1
        }
        spawnEnemies(){
            
            // shipMap.forEach((row, i) =>{
            //     row.forEach((symbol, j) => {
            //         if(symbol !== 0){
            //             if(symbol === 1){
                    
            //                 console.log(j * 32)
            //                 this.cope.push(new NewShip(this, j * 32,i * 32 , 1, "type0", this.invertedCount))
            //                 console.log("this shit should be here" + " id = " + this.invertedCount)
            //                 console.log( "" + j * 32 + "  "  + i * 32)
            //                 console.log(this.cope)
            //                 this.notInvertedCount++; }
            //                 // }else if(symbol === 3){
            //                 //     this.cope.push(new NewShip(this, j * 32,i * 32 , 1, "type1", this.notInvertedCount))
            //                  if(symbol === 4){
            //                     this.cope.push(new NewShip(this, j * 32,i * 32 , -1, "type1", this.invertedCount))
            //                     // console.log("There should be one at " + j * 32 + "and" + i * 32 )
            //                     this.invertedCount++
        
            //                 } else if (symbol === 6){
            //                     this.cope.push(new NewShip5(this, j * 32, i * 32, 1, "type0"))
            //                 }
            //         }

            //     })
            // })
            shipMap.forEach((row, i) =>{
                row.forEach((symbol, j) => {
                    if(symbol !== 0){
                        if(symbol === 9){
                            console.log("gottem")
                            
                            this.cope.push(new ShipMini(this, this.offset + j * 32,i * 32 , 1, "type0", this.invertedCount))
                            console.log("this shit should be here" + " id = " + this.invertedCount)
                            console.log( "" + j * 32 + "  "  + i * 32)
                            console.log(this.cope)
                            this.notInvertedCount++; }
                            // }else if(symbol === 3){
                            //     this.cope.push(new NewShip(this, j * 32,i * 32 , 1, "type1", this.notInvertedCount))
                             if(symbol === "ok"){
                                this.cope.push(new NewShip(this, j * 32,i * 32 , -1, "type1", this.invertedCount))
                                // console.log("There should be one at " + j * 32 + "and" + i * 32 )
                                this.invertedCount++
        
                            } else if (symbol === 6){
                                this.cope.push(new Aliencu(this, this.offset + j * 32, i * 32, 1, "type0"))
                            }else if (symbol === 1){
                                this.cope.push(new NewShip(this, this.offset + j * 32,i * 32 , 1, "type0", this.invertedCount))
                            } else if (symbol === 5){
                                this.cope.push(new Aliencu(this, this.offset + j * 32, i * 32, 1, "type1"))
                                console.log("ugh")
                            } else if (symbol === 7){
                                this.cope.push(new Aliencu(this, this.offset + j * 32, i * 32, -1, "type1"))
                            }else if (symbol === 4){
                                this.cope.push(new NewShip5(this, this.offset + j * 32, i * 32, 1, "type0"))
                                console.log("yellow ship")
                            }else if (symbol === 8){
                                this.cope.push(new Ship4(this, this.offset + j * 32, i * 32, 1))
                            }else if (symbol === 10){
                                spawnGroup2(this, this.offset + j * 32, i * 32, 1, "type2", 6)
                                console.log("Spawned a group 2 at : " + j * 32)
                            }else if (symbol === 11){
                                spawnGroup2(this, this.offset + j * 32, i * 32, -1, "type2", 6)
                            }else if (symbol === 12){
                                spawnGroup1(this, this.offset + j * 32, i * 32, "type2", 1, 6)
                                console.log("Spawned group1 at : " + j * 32 + "y :" + i * 32)
                            }else if (symbol === 13){
                                spawnGroup1(this, this.offset + j * 32, i * 32,  "type2", -1, 6)
                                console.log("Spawned group1 at : " + j * 32  + "y :" + i * 32 + "with inversion")
                            }else if (symbol === 14){
                                this.cope.push(new RevengeShip(this, this.offset + j * 32, i * 32, 1, "vengeful"))
                            }else if(symbol === 15){
                                this.cope.push(new MultiShotShip(this, this.offset + j * 32, i * 32))
                            }else if (symbol === 16){
                                spawnGroup1(this, this.offset + j * 32, i * 32, "type3", 1, 4)
                            }
                    }

                })
            })
            
            // this.cope.push(new Alien(this))
            // this.cope.push(new Aliencu(this, 2000 + 600, 200, 1, "type1"))
            // this.cope.push(new Aliencu(this, 2000 + 650, 200, 1, "type1"))
            // this.cope.push(new Aliencu(this, 2000 + 700, 200, 1, "type1"))
            // this.cope.push(new Aliencu(this, 2000 + 750, 200, 1, "type1"))
            // this.cope.push(new Aliencu(this,  2000 + 800 + 2000, 200, 1, "type1"))
            // this.cope.push(new NewShip5(this, 2000 + 850, 200, 1, "type0"))
            // this.cope.forEach(enemy => enemy.startOffset())
        }
        pause(){
            console.log("P was pressed ig")
            this.paused = !this.paused
        }
    }

    const game = new Game(canvas.width, canvas.height)
    // game.spawnEnemies()
    // spawnGroup1(game, 1000, 350, "type2", 1, 6)
    // spawnGroup1(game, 1000, 100, "type2", -1, 6)
    function spawnGroup1(game, x, y, type, inversion, num){
        // if(x > 3584 - this.offset)
        let lastSpawn = 96 * (num - 1)
        let currentCount = 0
        for(let i = 0; i <= lastSpawn; i += 96 ){
            let isShooting = currentCount % 2
            if(type !== "type2" || x  < 3004 + game.offset) {isShooting = 0 ; console.log(x) }
            // console.log(isShooting)
            game.cope.push(new Aliencu(game, x + i, y, type, inversion, isShooting))
            currentCount++
        }

    }
    function spawnGroup2(game, x, y, inversion, type, num){
        let lastSpawn = 96 * (num - 1)
        let currentCount = 0
        for(let i = 0; i <= lastSpawn; i += 96 ){
            let isShooting = currentCount % 2
            if(x < 3004 + game.offset) isShooting = 0
            game.cope.push(new NewShip(game, x + i, y, inversion, type, 69))
            currentCount++
            console.log(type)
        }

    }
    // spawnCu5(game, 1)
    // game.enemySpawners.push(new AlienGroup(game, 500, 1, spawnCu5))
    // game.enemySpawners.push(new AlienGroup(game, 500, 1, spawnCu6))
    // game.enemySpawners.push(new AlienGroup(game, 2500, 1, spawnCu7))
    // spawnGroup1(game, 1000, 250, "type2", 1, 6)
    // spawnGroup2(game, 1100, 400, 1, "type2", 6)
    let fadeOpacity = 0
    let transitionFade = false
    let Faded = false
    let BlackFadeIncreaseTimer = 0
    function BlackFadeUpdate(deltaTime){
        if(!Faded){
        if(BlackFadeIncreaseTimer > 30){
            fadeOpacity += 0.03
            BlackFadeIncreaseTimer = 0
            if(fadeOpacity > 1){
                Faded = true
                // Level function
            }
        }else BlackFadeIncreaseTimer += deltaTime
    } else {
        if(BlackFadeIncreaseTimer > 30){
            fadeOpacity -= 0.09
            BlackFadeIncreaseTimer = 0
            if(fadeOpacity <= 0){
                Faded = false
                transitionFade = false
               
            }
        }else BlackFadeIncreaseTimer += deltaTime
    }
       
    }
    function BlackFadeDraw(context){
        context.save()
        context.fillStyle = "black"
        context.globalAlpha = fadeOpacity
        context.fillRect(0,0,1000,500)
        context.restore()
        console.log(fadeOpacity)
    }



    
    let lasTime = 0
    transitionFade = false
    //animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lasTime
        lasTime = timeStamp
        if(!game.gameOver && !game.paused){

        ctx.clearRect(0,0, canvas.width, canvas.height)
        game.update(deltaTime)
    }
        game.draw(ctx)
        // console.log(deltaTime)
         if (!game.gameOver) requestAnimationFrame(animate)
    }
    animate(0)
    console.log("hi")
})