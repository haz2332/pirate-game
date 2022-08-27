class Boat{
   constructor(x,y,w,h,boatpos)
   {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.boatpos = boatpos 

      this.Boat=loadImage("assets/boat.png")

      var options={
        friction:1.01,
        density:1,
        restitution:0.8,  
     }
     this.body=Bodies.rectangle(x,y,w,h,options)
     World.add(world,this.body)
   }
   display(){
       push()
       translate(this.body.position.x,this.body.position.y)
       imageMode(CENTER)
       image(this.Boat,0,this.boatpos,this.w,this.h)
       pop()
   }

   remove(index){
      setTimeout(()=>{
      Matter.World.remove(world,boats[index].body)  
      delete boats[index]
      }
      ,2000)
   }

}