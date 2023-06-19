//  export default class Background {
//     constructor(game){
//         this.game = game
//         this.image1 = document.getElementById('layer1')
//         this.image2 = document.getElementById('layer2')
//         this.image3 = document.getElementById('layer3')
//         this.image4 = document.getElementById('layer4')
//         this.layer1 = new Layer(this.game,  0.8)
//         // this.layer2 = new Layer(this.game, this.image2, 0.4)
//         // this.layer3 = new Layer(this.game, this.image3, 1)
//         // this.layer4 = new Layer(this.game, this.image4, 1.5)
//         this.layers = [this.layer1, ]
//     }
//     update(){
//         this.layers.forEach(layer => layer.update())
//     }
//     draw(context){
//         this.layers.forEach(layer => layer.draw(context))
//     }
// }



// class Layer {
//     constructor(game,  speedModifier){
//         this.game = game;
//         this.image = new Image()
//         this.image.src = "assets/better space background.png"
//         this.image.height = 600
//         console.log(this.image)
//         this.speedModifier = speedModifier
//         // this.width = 1768
//         // this.height = 600
//         this.width = 1920
//         this.height = 1080
//         // this.image.style.transform = "scale(1.5)";
//         this.image.style.filter = "grayscale(100%)"
//         console.log(this.image)
//         this.x = 0
//         this.y = 0

//     }
//     update(){
//         if (this.x <= -this.width) this.x = 0
//         this.x -= this.game.speed * this.speedModifier
//     }
//     draw(context){
//         context.drawImage(this.image, this.x, this.y)
//         context.drawImage(this.image, this.x + this.width, this.y)
//     }
// }


export default class Background {
    constructor(game) {
      this.game = game;
      this.layer1 = new Layer(this.game, 0.1, "layer1");
      this.layer2 = new Layer(this.game, 0.3, "layer2");
      this.layer3 = new Layer(this.game, 0.9, "layer3");
      // this.layer4 = new Layer(this.game, 1.5, "layer4");
      this.layers = [this.layer1, this.layer2, this.layer3];
    }
    
    update() {
      this.layers.forEach((layer) => layer.update());
    }
    
    draw(context) {
      this.layers.forEach((layer) => layer.draw(context));
    }
    restart(){
      this.layers.forEach((layer) => layer.restart())
    }
  }
  
  class Layer {
    constructor(game, speedModifier, imageId) {
      this.game = game;
      this.speedModifier = speedModifier;
      this.image = document.getElementById(imageId);
      this.x = 0;
      this.y = 0;
      this.image.width = 1000
      
      // Apply grayscale filter to the image
      this.image.style.filter = "grayscale(100%)";
    }
    
    update() {
      if (this.x <= -this.image.width) this.x = 0;
      this.x -= this.game.speed * this.speedModifier;
    }
    
    draw(context) {
      context.drawImage(this.image, this.x, this.y, 1000, 600);
      context.drawImage(this.image, this.x + this.image.width, this.y, 1000, 600);
    }
    restart(){
      this.x = 0
    }
  }

export {Background, Layer};