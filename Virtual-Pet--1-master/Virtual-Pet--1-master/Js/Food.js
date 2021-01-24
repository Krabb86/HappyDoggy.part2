class Food{
    constructor(x,y){
         this.foodStock = 0;
         this.lastFed;
        this.image = loadImage("images/Milk.png");
    }
    display(){
        if(this.foodStock > 0){

            image(this.image,100,450);
            
      }
    }
  
    getFoodStock(){
      return this.foodStock;
  }
   updateFoodStock(foodStock){
       this.foodStock = foodStock;
   }
   deductFood(){
       if(this.foodStock > 0){
           this.foodStock = this.foodStock - 1;
       }
   }
}