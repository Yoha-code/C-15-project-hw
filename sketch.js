var path,boy,cash,diamonds,jwellery,sword, end ;

var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, endImg;

var treasureCollection = 0;

//lives system
var lives = 3;

var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var START = 0
var PLAY=1;
var END=2;
var WIN = 3;
var gameState=0;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
 
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState == START && keyDown("space")){
    gameState = PLAY;
  }
  
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  path.velocityY = 4;

  //code to reset the background
  if(path.y > 600 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    
    }

    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 100;

    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 150;

    }else{
   
    if(swordGroup.isTouching(boy)) {
     // subtracting lives if the sword is touched
      lifeOver();
      swordGroup.destroyEach();
      
      if(lives >= 1){
          
       gameState = PLAY;
      }
          
      else if (lives === 0){
            
       gameState = END
      }  
   
  }
  
  }
  
  }

  if(gameState == END){
        
    cashG.destroyEach();
    cashG.setVelocityEach(0);
        
    jwelleryG.destroyEach();
    jwelleryG.setVelocityEach(0);
        
    diamondsG.destroyEach();
    diamondsG.setVelocityEach(0);
    
    swordGroup.destroyEach();
    swordGroup.setVelocityEach(0);

    boy.addAnimation("SahilRunning", endImg);
    boy.scale = 0.7
    boy.x = 200;
    boy.y = 300;

    path.velocityY = 0;  
  }

  drawSprites();
 
  if(gameState == START){
// inst.
    textSize(20);
    fill("red")
    text("Press space to start", 100, 250)
    text("Collect cash, jewels, and diamonds, but ", 20, 280)
    text("not the swords, or you lose a life.", 50, 300);
    text("Get 1000 points to win!", 90, 330);
    text("You have 3 lives, good luck!", 65, 360)
    
  }

  if(treasureCollection >= 1000){
    gameState = WIN;
  }

  if(gameState == WIN){
    // winning
    textSize(30);
    fill("black");
    text("YOU WIN!", 130, 300)

    cashG.destroyEach();
    cashG.setVelocityEach(0);
        
    jwelleryG.destroyEach();
    jwelleryG.setVelocityEach(0);
        
    diamondsG.destroyEach();
    diamondsG.setVelocityEach(0);
    
    swordGroup.destroyEach();
    swordGroup.setVelocityEach(0);

    path.velocityY = 0;
    
  }
    
    textSize(20);
    fill("black");
    text("Treasure: "+ treasureCollection,5,30);
    fill("red")
    text("Lives: "+ lives, 300, 30)

}
// the life over function to subtract lives
function lifeOver(){
  
    lives -= 1;
 }
// creating sprites using functions
function createCash() {
  
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 210;
  cashG.add(cash);

}
}

function createDiamonds() {
  
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);

}
}

function createJwellery() {
 
  if (World.frameCount % 250 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 210;
  jwelleryG.add(jwellery);

}
}

function createSword(){
  
  if (World.frameCount % 280 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 210;
  swordGroup.add(sword);

}
}

