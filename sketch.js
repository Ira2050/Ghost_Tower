var ghostImg, towerImg, doorImg, climberImg;
var ghost, door,tower, climber;
var doorsGroup, climbersGroup;
var gameState = "play";
var invisibleBlock;
var invisibleBlockGroup;
var sound;

function preload(){
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
 doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  sound = loadSound("spooky.wav");
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup(){
  createCanvas (600,600);
  sound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
}

function draw(){
  background(0);
  
  if (gameState === "play"){
     if (tower.y > 400){
    tower.y = 300;
  }
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 5;
  }
  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 5;
  }
  if (keyDown("space")){
    ghost.velocityY = -5
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y >600){
     ghost.destroy();
    gameState = "end";
    }
  
  spawnDoors();
  drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(40);
    text("Game Over",300,300);
  }
  
 
  
}

function spawnDoors(){
  
  if (frameCount % 240 === 0){
    door = createSprite(200,50);
    climber = createSprite(200,100);
    invisibleBlock = createSprite(200,120);
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 3;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    
    door.lifetime = 900;
    climber.lifetime = 900;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}

