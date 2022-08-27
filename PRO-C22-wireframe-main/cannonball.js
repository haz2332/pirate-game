class Cannonball{
    constructor(x,y) 
    {
        
        this.r = 30

        var options={
        isStatic:true
        }
       

        this.cannonballImg= loadImage("assets/cannonball.png")
        this.body=Bodies.circle(x,y,this.r,options)
        World.add(world,this.body)
    }
    display(){
        push()
        imageMode(CENTER)
        image(this.cannonballImg,this.body.position.x,this.body.position.y,this.r,this.r)
        pop()
        
    }
    shoot(){
       var newAngle=cannon.a-28
       newAngle=newAngle*(3.14/180) 
       var velocity=p5.Vector.fromAngle(newAngle)
       velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})

    }

    remove(index){
       Matter.Body.setVelocity(this.body,{x:0,y:0}) 
        setTimeout(()=>{
            Matter.World.remove(world,balls[index].body)
            delete balls[index]
        }
        ,2000)
    }

}