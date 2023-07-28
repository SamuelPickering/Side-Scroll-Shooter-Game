export default  class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 25
        this.fontFamily = "Bangers"
        this.color = "white"
    }
    draw(context){
        context.save()
        context.fillStyle = this.color
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = "black"
        context.font = this.fontSize + "px " + this.fontFamily
        //score
        context.fillText("Score: " +this.game.score,20,40)
        context.fillText("Damage dealt: " + this.game.bossDamage, 20,140)
        context.fillText("HP", 20,490)

        //timer
        const formattedTime = (this.game.gameTime * 0.001).toFixed(1)
        context.fillText("timer: " + formattedTime, 20, 100)
        // game over messages
        if(this.game.gameOver){
            context.textAlign = "center"
            let message1
            let message2
            if(this.game.score > this.game.winningScore){
                message1 = "You Win! Congratulations you won"
                message2 = "Well done"
            } else {
                message1 = "You Lost "
                message2 = "Try again next time "
            }
            context.font = "70px " + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40)
            context.font = "25px " + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40)
        }
        //ammo
        if (this.game.player.powerUp) context.fillStyle = "#ffffbd"
        for(let i = 0; i < 20; i++){
            context.fillRect(20 + 5 * i,50,3,20)
        }
        context.fillStyle = "#ff0000"
        for(let i = 0; i < this.game.player.lives; i++){
            context.fillRect( 50 + 20 + 5 * i,470,3,20)
        }
        context.restore()
    }
}