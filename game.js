function loadImages(){
//this function is used to load images 
//we need the images for the player, virus and the gem
    enemyImg=new Image;
    enemyImg.src="pictures/virus2.png";
    playerImg=new Image;
    playerImg.src="pictures/player.png";
    gemImg=new Image;
    gemImg.src="pictures/gem1.png";
    
}

function init(){
  //defines the elemenets that we use in our code
  //the four parameters:x coord,y coord, width, height
    canvas=document.getElementById("myCanvas");
    wide=700;
    high=400;
    canvas.width=wide;
    canvas.height=high;
    //create a pen to draw on the canvas
    pen=canvas.getContext('2d');
    //an indicator variable for game over
    gameOver=false;
    //we create our virus enemies, which correspond to the box used for clarity
    v1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:16,
    };
    v2={
        x:300,
        y:150,
        w:60,
        h:60,
        speed:10,
    };
    v3={
        x:450,
        y:20,
        w:60,
        h:60,
        speed:8,
    };
    virus=[v1,v2,v3];
    //now we create the player and gem
    player={
        x:20,
        y:high/2,
        w:60,
        h:60,
        speed:30,
        moving:false,
        health:80,
    };
    gem={
        x:wide-100,
        y:high/2,
        w:60,
        h:60,
    };
    //event listeners coming up on board
    canvas.addEventListener('mousedown',function(){
        player.moving=true;
    });
    canvas.addEventListener('mouseup',function(){
        player.moving=false;
    });
    
}
function collision(rect1,rect2){
    if(rect1.x<rect2.x+rect2.w&&rect1.x+rect1.w>rect2.x&&rect1.y<rect2.y+rect2.h&&rect1.y+rect1.h>rect2.y){
        return true;
    }
    return false;
}
function draw(){
    //before we draw anything new, clear the old canvas things
    pen.clearRect(0,0,wide,high); //we clear the entire canvas [this happens in quick succession]
    pen.fillStyle="red";
    //draw the player and the gem
    pen.drawImage(playerImg,player.x,player.y,player.w,player.h);
    pen.drawImage(gemImg,gem.x,gem.y,gem.w,gem.h);
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //for a single virus: pen.drawImage(enemyImg,box.x,box.y,box.w,box.h);
    for(let i=0;i<virus.length;i++){
        pen.drawImage(enemyImg,virus[i].x,virus[i].y,virus[i].w,virus[i].h);
    }
    //display the health of player
    pen.fillStyle="white";
    pen.fillText("Your Health: "+player.health,10,10);
}
function update(){
    //any dynamic change in the game is controlled by this funtion
    
    //if the state of the player is moving, change his x coord
    if(player.moving==true){
        player.x+=player.speed;
        player.health+=8;
    }
    //condition handling collision of player and virus
    for(let i=0;i<virus.length;i++){
        if(collision(virus[i],player)){
            //reduce the health of player
            player.health-=40;
            if(player.health<0){
                gameOver=true;
                alert("Virus killed You!");
            }
        }
    }
    
    //if there is a collision between the gem and player, the game stops
    if(collision(player,gem)){
        alert("You win the Game!");
        gameOver=true;
        return;
    }
    
    
    //we want the box we created to move along y axis as in box.y+=box.speed
    //now we need to impose some checks on the movement of the box by 
    //if(box.y>=high-box.h||box.y<0){
    //    box.speed*=-1;   
    //}
    for(let i=0;i<virus.length;i++){
        virus[i].y+=virus[i].speed;
        if(virus[i].y>=high-virus[i].h||virus[i].y<0){
        virus[i].speed*=-1;   
        }
    }
}
function gameLoop(){
    if(gameOver==true){
        clearInterval(f);
    }
    draw();
    update();
    
}
//for starting the game, you need to call the below functions
loadImages();
init();
var f=setInterval(gameLoop,100);