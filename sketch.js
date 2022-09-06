const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground 
let engine;
let world;
var fruit
var rope, rope2, rop3
var link, link2,link3
var bunny, buton,bloon, mute
var bunnyimg, buttonimg,fruitimg,background1, blink,eat, cry,starimg
var dist1, dist2
var cutsnd,winsnd,bloonsnd,crysnd,music
var wincounter,starcount
var gamestate=1
var check1=1
var starcounter1, starcounter2
function preload(){
 bunnyimg=loadImage("bunny.png")
  background1=loadImage("wall.png")
 fruitimg=loadImage("fruit.png")
 starimg=loadImage("star.png")
 blink=loadAnimation("blink_2.png","blink_3.png")
 eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
 cry=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
 cry.looping=false
 eat.looping=false
 cutsnd=loadSound("cut1.wav")
 winsnd=loadSound("win.wav")
bloonsnd=loadSound("wind.wav")
  crysnd=loadSound("cry.wav")
  music=loadSound("music.wav")
}
function setup() 
{
 wincounter=1
  bunny= createSprite(500,windowHeight-100)
  blink.frameDelay=50
  cry.frameDelay=100
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("cry",cry)
  bunny.addAnimation("eat",eat)

  bunny.scale=(0.25)
  blink.frameDelay=20
 frameRate(80)
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  imageMode(CENTER)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  rope=new Rope(4,{x:250,y:50})
  rope2=new Rope(6,{x:100,y:20})
  rop3=new Rope(6,{x:400,y:20})
  ground= new GROUND(windowWidth/2,windowHeight,windowWidth,50)
  platform=new GROUND(600,400,800,50,{restitution:0.5})
    fruit=Bodies.circle(250,200,20,{density:0.002,friction:1,airFriction:1})
   
    link1= new LINK(rope,fruit)
    link2= new LINK(rope2,fruit)
    link3= new LINK(rop3,fruit)
  Matter.Composite.add(rope.body,fruit)
  //Matter.Composite.add(rope2.body,fruit)
  //Matter.Composite.add(rop3.body,fruit)
  buton= createImg("buton.png")
  buton.position(220,50)
  buton.size(50,50)
  buton.mouseClicked(click1)
  buton2=createImg("buton.png")
  buton2.position(70,20)
  buton2.mouseClicked(click2)
  buton2.size(50,50)
  buton3=createImg("buton.png")
  buton3.position(370,20)
  buton3.mouseClicked(click3)
  buton3.size(50,50)
  bloon=createImg("bloon.png")
  bloon.position(5,475)
  bloon.size(200,100)
  bloon.mouseClicked(blow)
  bloon2=createImg("blonn222.png")
  bloon2.position(450,250)
  bloon2.size(50,100)
  bloon2.mouseClicked(blow2)
  mute=createImg("mute.png")
  mute.position(windowWidth-50,50)
  mute.size(50,50)
  mute.mouseClicked(mute1)
  /*platform1= createImg("2dplatform.png")
  platform1.position(190,300)
  platform1.size(930,200)*/
  star1=createImg("star.png")
  star1.position(450,100)
  star1.size(20,20)
}

function draw() 
{
  
  if(!music.isPlaying()&&gamestate==1){
   
    music.play()
  }
  if(dist1<50){
    eating()
  }
  if(dist2<25&&check1==1){
     starcount+=1
     check1=0
  }
if (gamestate==0){
  music.stop()
  crysnd.stop()
  winsnd.stop()
  bloonsnd.stop()
  cutsnd.stop()
}
  background(51);
  image(background1,750,350,width,height)
 drawSprites()

  Engine.update(engine);

  ground.show()
  platform.show()
  rope.show()
  rope2.show()
  rop3.show()
  if(fruit!==null){
    dist1=dist(fruit.position.x,fruit.position.y,bunny.x,bunny.y)
    dist2=dist(fruit.position.x,fruit.position.y,450,100)
    console.log(fruit.position.x,fruit.position.y)
  push()
  imageMode(CENTER)
 ellipse(/*fruitimg,*/fruit.position.x,fruit.position.y,20)
  pop()
  var collision = Matter.SAT.collides(fruit, ground.body);
  if (collision.collided) {
    bunny.changeAnimation("cry")
    bunny.y=600
    if(!crysnd.isPlaying()&&gamestate==1){
      crysnd.play()
    }
  } 
  }
  console.log(gamestate)
}

function click1(){
  rope.break()
  link1.delete()
  if(gamestate==1){
  cutsnd.play()
  }
}
function eating(){
  if(wincounter==1){
    if(gamestate==1){
    winsnd.play()
    }
    }
  wincounter=0
  bunny.changeAnimation("eat")
  World.remove
  fruit=null
  
}
function blow(){
 if(400<fruit.position.y&&fruit.position.y<550){
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
   
 }
 if(gamestate==1){
  bloonsnd.play()
}
}
function blow2(){
  if(fruit.position.x>450){
  Matter.Body.setPosition(fruit,{x:450,y:200})
    //fruit.position.x=450
  //fruit.position.y=200
 
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:-0.02,y:0.25})
  }
}
function mute1(){
  
  if (gamestate==1){
    gamestate=0
  } else if(gamestate==0){
    gamestate=1
  }
 
}
function click2(){
rope2.break()
link2.delete()
if(gamestate==1){
  cutsnd.play()
}

}
function click3(){
rop3.break()
link3.delete()
if(gamestate==1){
  cutsnd.play()
}
}