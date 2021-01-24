//Create variables here
var dog, dogHappy, dogSprite, dogImg;
var foodS, foodStock;
var database;
var feedPet,addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/happydog.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);

  foodObj = new Food(150,200);

  feedPet = createButton("Feed the dog");
  feedPet.position(750,50);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(750,75);
  addFood.mousePressed(addFoods);

  

  dogSprite = createSprite(250,250,2,2);
  dogSprite.addImage(dogImg);
  dogSprite.scale = 0.15;
  database = firebase.database();
  foodStock = database.ref('Food');
 foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val(); 
  });
 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
  text("Last Feed:"+ lastFed%12 + "PM",350,70);
   }else if(lastFed == 0){ 
     text("Last Feed:12 AM",350,70);
      }else{
        text("Last Feed:" + lastFed + "AM",350,70);}
  

 
}
function readStock(data){   
  foodS=data.val();
 }

function writeStock(x){
  if(x<=0){
      x=0;
   }else{
 x=x-1;    

}
database.ref('/').update({
     Food:x
  })

  drawSprites();

  text("Food:"+ foodStock,490,20);
  fill("red");
  stroke(2);
}

function addFoods(){
  foodS++;
  database.ref('/').update({ Food:foodS }) 
  foodObj.display();
}
function feedDog(){
  foodStock = foodStock - 1;
  dogSprite.addImage(dogHappy);
}





