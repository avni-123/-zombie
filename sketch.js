var zombie, zombieImg;

var bg, bgImg;

var shooter, shooterImg;

var heart1, heart1Img;

var heart2, heartImg;

var heart3, heart3Img;

var shooter2, shooter2Img;

var bullet, bulletImg;

var zombieGroup;

var bulletGroup;

function preload(){

  zombieImg = loadImage("zombie.png");

  bgImg = loadImage("bg.jpg");

  shooterImg = loadAnimation("shooter1.png", "shooter2.png");

  heart1Img = loadImage("heart_1.png");

  heart2Img = loadImage("heart_2.png");

  heart3Img = loadImage("heart_3.png");

  shooter2Img = loadImage("shooter3.jpg");

  bulletImg = loadImage("bullet.png");

}

function setup(){

  createCanvas(windowWidth, windowHeight);

  //adding background

  bg = createSprite(displayWidth / 2, displayHeight / 2);
  bg.addImage("bgImg", bgImg);
  bg.scale = 1.2;

  //adding player

  shooter = createSprite(displayWidth/7-100, displayHeight/2+200);
  shooter.addAnimation("shooter", shooterImg);
  shooter.scale = 0.3;

  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.addImage("heart1Img", heart1Img);
  heart1.scale = 0.4;
  heart1.visible = false;

  heart2 = createSprite(displayWidth - 100, 40, 20, 20);
  heart2.addImage("heart2Img", heart2Img);
  heart2.scale = 0.4;
  heart2.visible = false;

  heart3 = createSprite(displayWidth - 150, 40, 20, 20);
  heart3.addImage("heart3Img", heart3Img);
  heart3.scale = 0.4;

  zombieGroup = new Group();

  bulletGroup = new Group();

}

function draw(){

  background(0);

  Zombie();

  if(zombieGroup.isTouching(bulletGroup)){

    for(var i= 0; i < zombieGroup.length; i = i + 1){

      if(zombieGroup[i].isTouching(bulletGroup)){

        zombieGroup[i].destroyEach();

      }

    }

  }

  drawSprites();

  if(keyDown("space")){

    shooter.addImage(shooter2Img);

  }

  if(keyDown(RIGHT_ARROW) || touches.length > 0){

    var bullet = Bullet();
    bullet.y = shooter.y;
    bullet.addImage("bulletImg", bulletImg);

  }

}

function keyPressed(){

  if(keyCode === UP_ARROW || touches.length > 0){

    shooter.y = shooter.y - 100;

  }

  if(keyCode === DOWN_ARROW || touches.length > 0){

    shooter.y = shooter.y + 100;

  }

}

function Zombie(){

  if(frameCount%80 === 0){

    zombie = createSprite(random(width/2, width), random(100, 500), 30, 30);

    zombie.addImage("zombieImg", zombieImg);

    zombie.scale = 0.1;

    zombie.velocityX = -2;

    zombie.lifeTime = 400;

    zombie.depth = shooter.depth;
    
    shooter.depth = shooter.depth + 1;

    zombieGroup.add(zombie);

  }

}

function Bullet(){

  bullet = createSprite(displayWidth/7-100, 650, 20, 20);

  bullet.velocityX = 11;

  bullet.scale = 0.2;

  bullet.lifeTime = 300;

  return bullet;

}
