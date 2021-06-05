
var spaceShip;
var bg1,bgImage;
var obstacles;
var spaceshipIMg;
var obstacleImg,obstacle;
var obstacleGroup;
var gameState=1;
var gameOverImg,gameOver;
var missiles,misslesImg;
var missilesGroup;
var missiledown,missileleft,missileright,missileup;
function preload(){
  bgImage=loadImage("starry-night-sky.jpg");
  spaceshipIMg=loadImage("newnano/bluespaceship.png");
  obstacleImg=loadImage("newnano/stones/asteroid.png");
  gameOverImg=loadImage("newnano/gameOver.png");
  missiledown=loadImage("newnano/missiledown.png");
  missileup=loadImage("newnano/missileup.png");
  missileright=loadImage("newnano/missileright.png");
  missileleft=loadImage("newnano/missileleft.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg1=createSprite(width/2,height/2)
  bg1.addImage(bgImage);
  spaceShip=createSprite(windowWidth/2, windowHeight/2, 25, 50);
  spaceShip.addImage(spaceshipIMg)
  spaceShip.scale=1.5;
  spaceShip.debug=true;
  spaceShip.setCollider("circle",0,0,20);
  gameOver=createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.6;
  gameOver.visible=false;
  obstacleGroup=new Group();
  missilesGroup=new Group();
}

function draw() {
  background("black");  
  //spaceShip.rotation=0
  if(gameState===1){
 spawnObstacles();
 spawnMissiles();
  infiniteBg();
  camera.position.x=spaceShip.x;
  camera.position.y=spaceShip.y;
  if(spaceShip.isTouching(obstacleGroup) || spaceShip.isTouching(missilesGroup) ){
    gameState=0;
    obstacleGroup.destroyEach();
    spaceShip.visible=false;
    missilesGroup.destroyEach();
   
  }   
  }
  else{ 
    camera.position.x=gameOver.x;
    camera.position.y=gameOver.y;
    gameOver.visible=true;
  }
 
  drawSprites();
  
}

function keyPressed(){

  if(keyCode===LEFT_ARROW){
    //bg1.velocityX=10;
    //bg1.velocityY=0
   // bg1.velocityX=bg1.velocityX+2
    spaceShip.rotation=spaceShip.rotation-20
    spaceShip.velocityX=-10;
    
  }
  if(keyCode===RIGHT_ARROW){
   // bg1.velocityX=bg1.velocityX-2
    //bg1.velocityX=-10;
    //bg1.velocityY=0
    spaceShip.rotation=spaceShip.rotation+20
    spaceShip.velocityX=10;
  }
  if(keyCode===DOWN_ARROW){
   // bg1.velocityY=bg1.velocityY-2
    //bg1.velocityY=-10;
    //bg1.velocityX=0
    spaceShip.rotation=spaceShip.rotation-20
    spaceShip.velocityY=10;
  }
  if(keyCode===UP_ARROW){
    //bg1.velocityY=bg1.velocityY+2
    //bg1.velocityY=+10;
    //bg1.velocityX=0
    spaceShip.rotation=spaceShip.rotation+20
    spaceShip.velocityY=-10;
  }
  
}
function spawnObstacles(){
  if(frameCount%40===0){
   
    obstacles=createSprite();
    obstacles.addImage(obstacleImg)
    
    if(Math.round(random(1,2))===1){
      console.log("vertical")
    if(spaceShip.velocityY>0){
    obstacles.x = random(0,width)
    obstacles.y =spaceShip.y+height/2-50
    }
    if(spaceShip.velocityY<0){
      obstacles.x = random(0,width)
      obstacles.y =spaceShip.y-height/2+50
    }
  }else{
    console.log("horizontal")
    if(spaceShip.velocityX<0){
      obstacles.x =spaceShip.x-width/2-50
      obstacles.y = random(0,height)
      }
    
      if(spaceShip.velocityX>0){
        obstacles.x =spaceShip.x+width/2+50
        obstacles.y = random(0,height)
        }
      }
    
    obstacleGroup.add(obstacles);
    obstacles.scale=0.6;
    obstacles.debug=true;
    obstacles.setCollider("circle",0,0,100);
  }
}

function infiniteBg(){
  
  if(spaceShip.x>bg1.x+bg1.width/2-width/2 || spaceShip.x<bg1.x-bg1.width/2+width/2){
    bg1.x=spaceShip.x
  }

  if(spaceShip.y>bg1.y+bg1.height/2-height/2 || spaceShip.y<bg1.y-bg1.height/2+height/2){
    bg1.y=spaceShip.y
  }


  
  
}
function spawnAttackers(){
  if(frameCount%60===0){
    
}
}
function spawnMissiles(){
  if(frameCount%80===0){
    var direction=Math.round(random(1,4));
    switch(direction){
      case 1: missiles=createSprite(random(spaceShip.x-100,spaceShip.x+100),spaceShip.y-height/2); 
      missiles.velocityY=20;
      missiles.addImage(missiledown);
      missiles.setCollider("rectangle",2,0,6,14)
      break;
      case 2:missiles=createSprite(random(spaceShip.x-100,spaceShip.x+100),spaceShip.y+height/2); 
      missiles.velocityY=-20;
      missiles.addImage(missileup);
      missiles.setCollider("rectangle",-2,0,6,14)
      break;
      case 3:missiles=createSprite(spaceShip.x-width/2,random(spaceShip.y-100,spaceShip.y+100)); 
      missiles.velocityX=20;
      missiles.addImage(missileright);
      missiles.setCollider("rectangle",0,-2,14,6)
      break;
      case 4:missiles=createSprite(spaceShip.x+width/2,random(spaceShip.y-100,spaceShip.y+100)); 
      missiles.velocityX=-20;
      missiles.addImage(missileleft);
      missiles.setCollider("rectangle",0,2,14,6)
      break;
    }
   

  
   missiles.lifetime=width;
   missilesGroup.add(missiles);
    missiles.scale=3;
missiles.debug=true;
  }
}