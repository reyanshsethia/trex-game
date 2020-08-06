var trex,count,  trex_running,PLAY,END,gameState,reset,obstaclesGroup,cloudsGroup,gameOver,restart, trex_collided,obstacleImage,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6,cloudImage;
var ground, invisibleGround, groundImage,gameOverImage,restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obstacleImage = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage ("cloud.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  PLAY = 1
  END = 0
  count = 0
  
  gameState = PLAY
  gameOver = createSprite(300,100)
  gameOver.addImage("gameOverImage",gameOverImage)
  gameOver.visible = false
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  restart = createSprite (300,150)
  restart.addImage("restartimage",restartImage)
  restart.scale = 0.5
  restart.visible = false
  if(mousePressedOver(restart)) {
    reset();
  }
  
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}

function draw() {
  background(180);
  if (gameState === PLAY){
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
    count = count+ Math.round(World.frameRate/60);
  text("score "+count,500,50)
    if (trex.isTouching(obstaclesGroup)){
      gameState = END
        }
    
    
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    trex.collide(invisibleGround);
    spawnObstacles()
  spawnClouds()
    
  }
  
  else if (gameState === END){
    trex.velocityY = trex.velocityY + 0.8
    trex.collide(invisibleGround);
    gameOver.visible = true;
    restart.visible = true;
    
  text("score "+count,500,50)
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.addImage("trex47",trex_collided)
    
    
    
    
    
    
  }
    
  

if(mousePressedOver(restart)){
      reset()
    }
  gameOver.depth = 40
  
  
  drawSprites();
  

}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage("obstacle",obstacleImage);break;
      case 2: obstacle.addImage("obstacle",obstacleImage2);break;
      case 3: obstacle.addImage("obstacle",obstacleImage3);break;
      case 4: obstacle.addImage("obstacle",obstacleImage4);break;
      case 5: obstacle.addImage("obstacle",obstacleImage5);break;
      case 6: obstacle.addImage("obstacle",obstacleImage6);break;
      default: break  
    }  
    console.log(rand)
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add (obstacle)
  }
    
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(90,120);
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
  }
  
  
  
}
  function reset(){
 gameState = PLAY
 gameOver.visible = false
 restart.visible = false
 obstaclesGroup.destroyEach()
 cloudsGroup.destroyEach()
 trex.addAnimation("trex",trex_running)
 count = 0 
}
