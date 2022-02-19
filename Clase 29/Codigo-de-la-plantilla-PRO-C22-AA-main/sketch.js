const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine;
var world;
var fondo;
var torre;
var cannonobj;
var angle;
var mbalas=[];
var mboats=[];

function preload() {
  fondo=loadImage("assets/background.gif");
  torre=loadImage("assets/tower.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine=Engine.create();
  world=engine.world

  angleMode(DEGREES);
  angle=15;
  cannonobj=new Cannon(150, 170, 190, 140, angle);
}

function draw() {
  Engine.update(engine);
  image(fondo, 0, 0, width, height);
  image(torre, 60, 200, width/6, height/1.8);
  cannonobj.display();

  for(var i=0; i<mbalas.length;i++){
    shootbullets(mbalas[i], i);
    console.log("for");
  }
  boats();
  //boatobj.display()
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var bulletobj;
    bulletobj=new Bullets(cannonobj.x, cannonobj.y);
    bulletobj.trayectoria=[]
    //console.log("trayectoria.after", trayectoria.length);
    console.log("genera bala");
    Matter.Body.setAngle(bulletobj.body, cannonobj.angle);
    mbalas.push(bulletobj);
    console.log("llenado de matriz");
  }
}

function shootbullets(ball,index){
  if(ball){
    ball.display()
    console.log("showbullets");
  }
}

function boats(){
  
  if(mboats.length>0){
    if(mboats[mboats.length-1]===undefined || mboats[mboats.length-1].body.position.x<width-300){
      var positions=[-40, -60, -70, -20]
      var posicion=random(positions);
      var boatobj=new Boat(width/2.3, height/2.5, 100, 100, posicion);
      mboats.push(boatobj);
    }
  
  console.log("matriz de botes", mboats.length)
  for(var i=0; i<mboats.length;i++){
    if(mboats[i]){
      console.log("mboats[i] ", mboats[i] );
      console.log("entra al ciclo for");
      Matter.Body.setVelocity(mboats[i].body,{x:-1, y:0});
      mboats[i].display();
    }
  }

}
else {
  var boatobj=new Boat(width/2.3, height/2.5, 100, 100, -60);
      mboats.push(boatobj);
}
  
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    mbalas[mbalas.length-1].shoot();
    console.log("keyReleased");
  }
}
