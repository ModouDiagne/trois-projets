window.onload = function (){

    var canvas;
    var context;
    var delay = 100;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var sizeBlock = 30;
    var snackee;
    var pomme;
    var widthEnBlock = canvasWidth / sizeBlock;
    var heightEnBlock = canvasHeight / sizeBlock;
    var score ;
    var timeOut;




    init();
    // Fonction mqui permet d'initialiser
    function init(){
        score = 0;
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "20px solid gray";
        // canvas.style.backgroundColor = "black";

        document.body.appendChild(canvas);
    
        // Maintenant on va dessiner dans le canvas
        // On aura besoin du context
        context = canvas.getContext("2d"); // Capturer le contexte du canvas
        snackee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4],], "droite");
        pomme = new Apple([10,10]);

        refreshCanvas();

    }

    function refreshCanvas(){
        // xCord += 5;
        // yCord += 5;

        snackee.advance();
        if (snackee.checkCollision()){

            GameOver();
            //Game Over
        }
        else {
            if(snackee.isEatingApple(pomme)){
                score++;

                snackee.ateApple = true;


                do {

                    pomme.setNewPosition();
                    }while (pomme.isOnSnake(snackee));

            }
            // Effacer tout le contenu du canva a partir de  0  0 jusqua tout l
            context.clearRect(0,0,canvasWidth,canvasHeight);
            // rectangle de de position par rapport a l'horizontal de 30 vertical 30 longueur 100 et largeur 30 
            drawScore();
            snackee.draw();
            pomme.draw();
            timeOut = setTimeout(refreshCanvas,delay);
            //setInterval(refreshCanvas,delay);
        }
            
    }

    function GameOver(){

        context.save();
        context.font = "bold 70px  sans-serif";
        context.fillStyle = "#000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeStyle = "red";
        context.lineWidth = 5;
        //context.fillText("Pour rejouer Appuyez sur la touche Espace", 5,30);     
        var centerX = canvasWidth / 2;
        var centerY = canvasHeight / 2;
        context.strokeText("Game Over", centerX,centerY - 180);
        context.fillText("Game Over", centerX,centerY - 180);


        context.restore();
    };

    function restart(){
        snackee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4],], "droite");
        pomme = new Apple([10,10]);
        score = 0;

        clearTimeout (timeOut);

        refreshCanvas();


    }

    function drawScore(){
        context.save();
        context.font = "bold 200px  sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "gray";
        var centerX = canvasWidth / 2;
        var centerY = canvasHeight / 2;
        context.fillText(score.toString(), centerX,centerY);
        

        context.restore();


    }
    function drawBlock (context, position){
        var x = position[0] * sizeBlock;
        var y = position[1] * sizeBlock;
        context.fillRect(x,y,sizeBlock,sizeBlock);


    }

    function Snake (body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = true;
        this.draw = function(){
            context.save();
            context.fillStyle = "red"; // la couleur du dessin
            for (var i = 0; i < this.body.length ; i++){
                drawBlock(context, this.body[i]);
            }
            context.restore();


        };

        this.advance = function() {
            var nextPosition = this.body[0].slice(); // Copie le premier element du tableau
            switch (this.direction){
                case "droite":
                    nextPosition[0] += 1; //on incremente de un le x [][]
                    break;
                case "gauche":
                    nextPosition[0] -= 1;
                    break;
                case "haut":
                    nextPosition[1] -= 1;
                    break;
                case "bas":
                    nextPosition[1] += 1;
                    break;
                default :
                    throw("Invalid Direction");
            };
            //nextPosition[0] += 1;
            this.body.unshift(nextPosition); // Ajoute un nouveau elemt devant

            if (!this.ateApple)
                this.body.pop(); // supprime le dernier element;
            else
                this.ateApple = false;

        };
        // setDirection(newDirection)
        this.setDirection = function(newDirection){
            var allowedDirections;
            switch (this.direction){
                case "droite":
                case "gauche":
                    allowedDirections = ["bas","haut"];
                    
                    break;
                case "haut":
                case "bas":
                    allowedDirections = ["droite","gauche"];
                    break;
                default :
                    throw("Invalid Direction");
            };
            if (allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }


        };

        this.checkCollision = function(){
            var collisionMur = false;
            var collisionSnake = false;
            var tete = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = tete[0];
            var snakeY = tete[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthEnBlock  - 1;
            var maxY = heightEnBlock - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                collisionMur = true;
            }

            for (var i =0; i < rest.length ; i++){
                if (snakeX === rest[i][0] && snakeY === rest[i][1]){
                    collisionSnake = true;

                }
            }

            return collisionMur || collisionSnake;
        };

        this.isEatingApple = function(appleToEat){
            var tete = this.body[0];
            if (tete[0] === appleToEat.position[0] && tete[1] === appleToEat.position[1])
                return true;
            else
                return false;

             
        }

    }

    function Apple(position){
        this.position = position;
        this.draw = function(){
            context.save();
            context.fillStyle = "green";
            context.beginPath();
            var radius = sizeBlock / 2;
            var x = this.position[0] * sizeBlock + radius;
            var y = this.position[1] * sizeBlock + radius;
            context.arc(x,y,radius,0,Math.PI*2,true);
            context.fill();
            context.restore();
        };

        this.setNewPosition = function(){
            var newX = Math.round (Math.random() * (widthEnBlock - 1));
            var newY = Math.round (Math.random() * (heightEnBlock - 1));
            this.position = [newX,newY];

        };

        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.length; i++){
                if (this.position[0] === snakeToCheck.body[i][0]  && this.position[1] === snakeToCheck.body[i][1] )
                    isOnSnake = true;
            }
            return isOnSnake;
            
        }

    }

    document.onkeydown = function HandleKeyDown(event){
        var key = event.key;
        var newDirection;
        switch(key){
            case 'ArrowUp':
                newDirection = "haut";
                break;
            case 'ArrowDown':
                newDirection = "bas";
                break;
            case 'ArrowRight':
                newDirection = "droite";
                break;
            case 'ArrowLeft':
                newDirection = "gauche";
                break;
            case ' ':
                restart();
                return;

            default:
                return;
        };
        snackee.setDirection(newDirection);

    }
   

}