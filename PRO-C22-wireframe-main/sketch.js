const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var balls=[]
var boats=[]



function preload() {
 backgroundImg= loadImage("assets/background.gif")
 towerImg= loadImage("assets/tower.png")

 

}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

 tower= Bodies.rectangle(150,350,160,310,options);
 World.add(world,tower);

angleMode(DEGREES)
 angle=20

cannon= new Cannon(180,110,130,100,angle);
cannonball= new Cannonball(cannon.x,cannon.y);
//boat= new Boat(width-80,height-60,170,170,-80);
 
}

function draw() {
  background(189);
  Engine.update(engine);
  image(backgroundImg,0,0,1200,600)
  cannon.display()
  
 // Matter.Body.setVelocity(boat.body,{x:-1,y:0})
  //boat.display()
 
 rect(ground.position.x, ground.position.y,width*2,1);
 showBoats();
 for(var i=0;i<balls.length;i++ ){
   showCannonballs(balls[i],i)
   collisionWithBoats(i)
 }

 
 push()
 imageMode(CENTER)
 image(towerImg,tower.position.x, tower.position.y,160,310);
 pop()
   
}
function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length-1].shoot()
  }


  
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var cannonball= new Cannonball(cannon.x,cannon.y);
    balls.push(cannonball)
  }
}

function showCannonballs(ball,i){
if(ball){
  ball.display()
  if(ball.body.position.x>=width||ball.body.position.y>=height-50){
    ball.remove(i)
  }
}
}

function showBoats(){
  if(boats.length>0){
  if(boats[boats.length-1].body.position.x<width-300 || boats[boats.length-1]===undefined){
    
    var positions=[-40,-60,-70,-20]
    var position=random(positions)
    var boat = new Boat(width-80,height-60,170,170,position);
    boats.push(boat)  
  }
    for(var i=0;i<boats.length;i++){
    if(boats[i]){
      Matter.Body.setVelocity(boats[i].body,{x:-1,y:0});
      boats[i].display()
    }
  }
  }
  else{
  var boat = new Boat(width-80,height-60,170,170,-80); 
  boats.push(boat) 
  }
}

function collisionWithBoats(index){
for(var i=0;i<boats.length;i++){
  if(boats[i]!==undefined&&balls[index]!==undefined){
var collision= Matter.SAT.collides(balls[index].body,boats[i].body)
if(collision.collided){
  boats[i].remove(i)
  Matter.World.remove(world,balls[index].body)
  delete balls[index]
}
  }
}
}