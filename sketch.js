var PLAY = 1
var END = 0
var gameState = PLAY;

var monkey, monkey_running, Monkeyimg1;
var banana, bananaimg;
var stone, stoneimg;
var back_ground, bgimg;
var score;
var cloudgroup
var obsticalgroup
var obstical
var cloud

function preload() {
  Monkeyimg1 = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  stoneimg = loadImage("stone.png");
  bananaimg = loadImage("banana.png");
  bgimg = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(400, 400);
  ground = createSprite(400, 370, 800, 10)
  ground.velocityX = -4
  ground.x = ground.width / 2;
  ground.visible = true
  score = 0
  back_ground = createSprite(200, -10, 400, 380)
  back_ground.addAnimation("imgforbackground", bgimg)
  back_ground.velocityX = -4
  back_ground.x = back_ground.width / 2;
  //back_ground.visible=false
  score = 0
  player = createSprite(200, 200, 20, 20)
  player.addAnimation("monkeyimagething", Monkeyimg1)
  player.scale = 0.1
  player.visible = true

  cloudgroup = new Group()
  obsticalgroup = new Group()

}

function draw() {
  background(220);
  player.collide(ground)

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (gameState === PLAY) {

    score = score + Math.round(getFrameRate() / 60)
    fill("black")
    text("Score: " + score, 50, 390)

    if (keyDown("space")) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
    if (cloudgroup.isTouching(player)) {
      player.scale = player.scale + 0.1;
      cloudgroup.destroyEach();
    }
    if (back_ground.x < 0) {
      back_ground.x = back_ground.width / 2;
    }
    spawnfood()
    spawnobsticals()
    if (obsticalgroup.isTouching(player)) {
      gameState = END;
    }
    //end()
  }
  if (gameState === END) {
    player.velocityX = 0
    cloudgroup.velocityX = 0
    obsticalgroup.velocityX = 0
    fill("black")
    text("Score: " + score, 50, 390)
  }

  drawSprites()

}

function spawnfood() {
  if (frameCount % 160 === 0) {
    cloud = createSprite(500, 120, 10, 10)
    cloud.y = Math.round(random(80, 220))
    cloud.velocityX = -3
    cloud.addImage(bananaimg)
    cloud.scale = 0.05

    cloud.lifeTime = 600
    cloudgroup.add(cloud)

  }

}

function spawnobsticals() {
  if (frameCount % 180 === 0) {
    obstical = createSprite(500, 355, 10, 10)
    obstical.velocityX = -3
    obstical.scale = 0.1
    obstical.lifeTime = 300
    obstical.addImage(stoneimg)
    obsticalgroup.add(obstical)
  }

}
//function end(){
//  if(player.isTouching(obstical)){
//player.velocity=0
//obstical.velocity=0
//cloud.velocity=0
//  }
//}