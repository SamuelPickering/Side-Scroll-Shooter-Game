// The oval like in double dealer


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






    //code for increbily fun phase 1 of Boss 2 hard mode maybe
class WhaleBoss12 extends WhaleBoss1 {
    constructor(game,x,y){
        super(game, x, y)
        this.lives = 120
        this.phase = 1
        this.spreadShootTimer = 0
        this.spreadShootInterval =   550             //2500          // 750 for hardmode (: speed 6 for bullet and 6 bull amount

    }
    update(deltaTime){
        if(this.frameX < this.maxFrame){
            this.frameX++
        }else this.frameX = 0

        if(this.phase === 1){ 
            //code
            if(this.spreadShootTimer > this.spreadShootInterval){
                this.shootSpreadHalf(6, "circle", 6)
                this.spreadShootTimer = 0
            }else {this.spreadShootTimer += deltaTime}
        }

        if(this.phase === 2){

        }



        if(!(this.staggerSpreadTimer > this.staggerSpreadInterval)){
            this.x = 20 * Math.sin((this.xAngle ) * Math.PI/200) + (this.Xorigin - this.width * 0.5) 
            this.y = 150 * Math.cos((this.yAngle * 2 ) * Math.PI/200) + (this.Yorigin - this.height * 0.5) 
            this.xAngle+= this.xAngleSpeed
            this.yAngle += this.yAngleSpeed
            }
    }
}

if(this.phase === 2){
    if(this.staggerSpreadTimer > this.staggerSpreadInterval){
        if(this.staggerShotTimer > this.staggerShotInterval){
            let offed = 1 / this.off * this.fakeI * 400 //400
            let onned = 1 / this.off  * this.fakeI * 440 //400
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, offed, 3))
            this.game.enemyProjectiles.push(new testEP(this.game, this.x, this.y + this.height * 0.5, -1, 234, 1, onned, 3)) // maybe for hardmode
            this.fakeI++
            this.staggerShotTimer = 0
            if(this.fakeI > this.off){
                //if(this.fakeI)
                this.fakeI = this.stagbulletAmount
                this.staggerShotTimer = 0
                this.staggerSpreadTimer = 0
            }
        }else this.staggerShotTimer+= deltaTime
        
    }else {
        this.staggerSpreadTimer += deltaTime
    }
}