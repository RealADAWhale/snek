var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var snek = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

snek.src = "images/snek.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 85;
var constant;

var isGameOver = 1
var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp);

function moveUp(){

	if(isGameOver == 1)
	{
		isGameOver = 0
		gap = 85;
		bX = 10;
		bY = 150;

		gravity = 1.5;

		score = 0;
		pipe = [];

		pipe[0] = {
		    x : cvs.width,
		    y : 0
		};
	}
	
	bY -= 25;
	fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    

	    ctx.drawImage(bg,0,0);

	    for(var i = 0; i < pipe.length; i++){
        
	        constant = pipeNorth.height+gap;
	        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
	        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
            
			if(isGameOver == 0)
			{
	        	pipe[i].x--;
			}
        
	        if( pipe[i].x == 125 ){
	            pipe.push({
	                x : cvs.width,
	                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
	            }); 
	        }

	        // detect collision
        
	        if( bX + snek.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+snek.height >= pipe[i].y+constant) || bY + snek.height >=  cvs.height - fg.height){
            
				isGameOver = 1
	        }
        
	
		    if(isGameOver == 0)
			{
	       	 	if(pipe[i].x == 5){
	       		 	score++;
	        		scor.play();
	        	}
			}
	    }

	    ctx.drawImage(fg,0,cvs.height - fg.height);
    
	    ctx.drawImage(snek,bX,bY);
    	if(isGameOver == 0)
		{
			bY += gravity;
		}

	    ctx.fillStyle = "#FFF";
	    ctx.font = "20px Verdana";
	    ctx.fillText("Score : "+score,10,cvs.height-20);
		
		if(isGameOver == 1)
		{
		    ctx.fillStyle = "#FFF";
		    ctx.font = "20px Verdana";
		    ctx.fillText("GAME OVER",cvs.width/2 - 55,cvs.height/2);
		}
		
	    requestAnimationFrame(draw);
    
}

draw();
























