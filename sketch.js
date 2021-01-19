var gameOver,gameOverImage
var restart
var restartImage
var gameState = "PLAY";
var jump,die,checkpoint
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png","trex1.png");
  trex_collided = loadAnimation("trex_collided.png");
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
 
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
 // trex.debug=true
  trex.setCollider("circle",0,0,30)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  //obstaclesGroup = new Group();
  obstaclesGroup=createGroup()
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
 // gameOver=createSprite(300,100,20,20)
 // gameOver.addImage(gameOverImage)
 // gameOver.scale=3
  restart=createSprite(63,90,40,40)
  restart.scale=0.7
  restart.addImage(restartImage)
  restart.visible=false
  score = 0;
}

function draw() {
  background(200);
  text("Score: "+ score, 500,50);
  
ground.velocityX = -(4+2*score/100)
  if(score>0 && score %100===0){checkpoint.play()}
  if(gameState === "PLAY"){

    restart.visible=false
    //move the ground
    score = score + Math.round(getFrameRate()/60);
    console.log(getFrameRate()+' '+frameCount)
    ground.velocityX = -4;
    if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -13;
jump.play()
    }
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(trex.isTouching(obstaclesGroup)){
    gameState="END"
    die.play()
  }
  }
  else if(gameState === "END"){
    //stop the ground
    ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0)
 cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
     trex.changeAnimation("collided" , trex_collided)
 textSize(40)
    fill("red")
    text("Game Over",200,100)
 restart.visible=true
  
    if(mousePressedOver(restart))
  {
    gameState="PLAY"
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running", trex_running);
    score=0
  }
  
  }
  
  
  
  
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+2*score/100)

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}