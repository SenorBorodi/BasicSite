function light(aw){
     if(aw == 0)
         document.getElementById('lumina').src="Images/NuGif.png";
     else 
        document.getElementById('lumina').src="Images/Bec Gif.gif";
}
const navbar = () => {
    const burger = document.querySelector('.menu-buton');
    const nav = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.link');

    //menu-button

    burger.addEventListener('click', () => {
        nav.classList.toggle('navigation-active');
    });
}
navbar();

function GetImage(){
    var age = document.getElementById("age").value;

    age = parseInt(age);

    if(age < 0)
        document.getElementById('varsta').src = "Images/embrion.jpg";           
     else if(age < 5)
        document.getElementById('varsta').src="Images/baby.jpg";
    else if(age < 12)
        document.getElementById('varsta').src="Images/10years.jpg";
    else if(age < 16)
        document.getElementById('varsta').src="Images/13-15 boy.jpg";
    else if(age < 20)
        document.getElementById('varsta').src="Images/adolsecent.jpg";   
    else if(age < 37)
        document.getElementById('varsta').src = "Images/youngadult.jpg";    
    else if(age < 53)
        document.getElementById('varsta').src = "Images/40-52year-man.jpg";     
    else if(age < 65)
        document.getElementById('varsta').src = "Images/oldman.jpg";   
    else if(age < 75)
        document.getElementById('varsta').src = "Images/sub75.jpg";
    else if(age > 0)
        document.getElementById('varsta').src = "Images/veryoldman.jpg";
}
function age(){
    var age = document.getElementById("age").value;

    document.getElementById("age").value = age + " " + "Years";

    document.getElementById("months").value = (age * 12) + " " + "Months";

    document.getElementById("days").value = (age * 12 * 30) + " " +"Days";

    document.getElementById("hours").value = (age * 12 * 30 * 24) + " " +"Hours";

    document.getElementById("minutes").value = (age * 12 * 30 * 24 * 60) + " " +"Minutes";

    document.getElementById("seconds").value = (age * 12 * 30 * 24 * 60 * 60) + " " +"Seconds";   
}
function game(){
    const cvs = document.getElementById("GameCanvas");
    const ctx = cvs.getContext("2d");
    
    
    cvs.width = 400;
    cvs.height = 400;
    
    let frames = 0;
    
    let foodEaten = false;
    
    const direction = {
        current : 0,
        idle : 0,
        right : 1,
        down : 2,
        left : 3,
        up : 4
    }
    var score = 1;
    var cxx = document.getElementById("ScoreCanvas");
    var cxy = cxx.getContext("2d");

    function drawScore() {
        cxy.font = "45px arial";
        cxy.fillStyle = "black";
        cxy.rect(0,0,20000,30000);
        cxy.fillStyle = "black";
        cxy.fill();
        cxy.fillStyle = "white";
        cxy.fillText("Score: "+ score, 18, 85);
    }

    document.addEventListener("keydown", function(evt){
        switch(evt.keyCode){
            case 37:
                //move left
                if(direction.current != direction.left && direction.current != direction.right) direction.current = direction.left;
                break;
            case 38:
                //move up
                if(direction.current != direction.up && direction.current != direction.down) direction.current = direction.up;
                break;
            case 39:
                //move right
                if(direction.current != direction.right && direction.current != direction.left) direction.current = direction.right;
                break;
            case 40:
                //move down
                if(direction.current != direction.down && direction.current != direction.up) direction.current = direction.down;
                break;
        }
    
    });
    
    function getDistance(pointX1, pointY1, pointX2, pointY2) {
        let distanceX = pointX2 - pointX1;
        let distanceY = pointY2 - pointY1;
    
       return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
    }
    
    const food = {
        x : cvs.width/4,
        y : cvs.height/4,
        r : 10,
    
        draw : function(){
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 80, 80)";
            ctx.arc(this.x, this.y, this.r, 0 , 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }  
    }
    const snake = {
        radius : 10,
        position : [{ x : cvs.width/2, y : cvs.height/2}],
    
        draw : function() {
            ctx.fillStyle = "rgb(153, 255, 51)";
            for( let i = 0; i< this.position.length; i++){
                let p = this.position[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, this.radius, 0, 2*Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        },
    
        update : function() {
            if(frames % 6 == 0){
                if(foodEaten == true){
    
                    this.position.push({
                        x : this.position[this.position.length -1].x,
                        y : this.position[this.position.length -1].y                   
                    });
                    foodEaten = false;
                }
    
                if(this.position[0].x < 0 ) this.position[0].x = cvs.width - 10;
                if(this.position[0].x > cvs.width ) this.position[0].x = 10;
                if(this.position[0].y < 0 ) this.position[0].y = cvs.height - 10;
                if(this.position[0].y > cvs.height ) this.position[0].y = 10;
    
                for( let i = this.position.length -1; i > 0;  i--){
                        if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y && this.position.length > 2) {
                            this.position.splice(1);
                            alert("GAME OVER!");
                            document.location.reload();
                            
                        }
                        this.position[i].x = this.position[i-1].x; 
                        this.position[i].y = this.position[i-1].y; 
                    }
                if(direction.current == direction.right) {
    
                    this.position[0].x += 20;
                }
                if(direction.current == direction.left) {
                    this.position[0].x -= 20;
                }
                if(direction.current == direction.up) {
                    this.position[0].y -= 20;
                }
                if(direction.current == direction.down) {
                    this.position[0].y += 20;
                }; 
                if(getDistance(food.x,food.y,this.position[0].x, this.position[0].y) <= 2*food.r){
                    food.x = Math.random() * cvs.width;
                    food.y = Math.random() * cvs.height;
                    foodEaten = true;
                    score++;
                }
            }
    
        }
    }
    
    function main() {
    
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        snake.update();
        snake.draw();
        food.draw();
        drawScore();
        frames++;
        requestAnimationFrame(main);
    
    }
    requestAnimationFrame(main);
}
function GameMadeByMe(){
    var canvas = document.getElementById("GameCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 6;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 1.5;
    var dy = -1.5;
    var paddleHeight = 7;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }
    
    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
    
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "white";    
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "black";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    
    var brickRowCount = 4;
    var brickColumnCount = 8;
    var brickWidth = 25;
    var brickHeight = 7;
    var brickPadding = 10;
    var brickOffsetTop = 3;
    var brickOffsetLeft = 17;

    var bricks = [];

    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status : 1};
        }
    }
    
    function drawBricks() {
        var ok = 0;
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) 
                if (bricks[c][r].status == 1){
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.lineWidth = "3";
                    ctx.strokeStyle = "white";
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "black";
                    ctx.stroke();
                    ctx.fill();
                    ctx.closePath();
                    ok = 1;
               }
        }     
        if(ok == 0){
            alert("CONGRATULATIONS!!!YOU WON THE GAME!!");
            document.location.reload();
            clearInterval(interval); 
        }
    }

    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        ok = 1;
                        score++;
                    }
                }
            }
        }
    }

    var score = 0;
    var cxx = document.getElementById("ScoreCanvas");
    var cxy = cxx.getContext("2d");

    function drawScore() {
        cxy.font = "45px arial";
        cxy.fillStyle = "black";
        cxy.rect(0,0,20000,30000);
        cxy.fillStyle = "black";
        cxy.fill();
        cxy.fillStyle = "white";
        cxy.fillText("Score: "+ score, 18, 85);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }
        
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 3;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 3;
        }
        
        x += dx;
        y += dy;
    }
    
    var interval = setInterval(draw, 10);
}

/*https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Build_the_brick_field#setting_up_the_brick_variables*/
