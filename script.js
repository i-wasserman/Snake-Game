var snake;
var scl = 20;
var food;
var score = 0;
var highscore = 0;
var level = 1;
var theColor;


let colorlist = ['red', 'crimson', 'firebrick']
let colorlist2 = ['orange', 'yellow', 'gold', 'goldenrod']
let colorlist3 = ['green', 'forestgreen', 'seagreen', 'limegreen']
let colorlist4 = ['royalblue', 'deepskyblue', 'cornflowerblue', 'dodgerblue']
let colorlist5 = ['blueviolet', 'darkviolet', 'darkorchid', 'mediumpurple']
let insults = ["how hard is it to just not run into things?", "wow, you suck at this game", "this game really isn't that complicated, you know", "seriously? are you even trying?", "is that really the best you can do?"]

function setup() {
  var canvas = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x);
  snake = new Snake();
  frameRate(8);
  pickLocation();
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("level").innerHTML = "Level: " + level;
  document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
}

function pickLocation() {
  var columns = floor((width/scl));
  var rows = floor((height/scl));
  food = createVector(floor(random(columns)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();
  fill('white');
  rect(food.x, food.y, scl, scl);
  if (snake.eat(food)) {
    pickLocation();
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW){
    snake.dir(0, -1);
  }else if(keyCode === DOWN_ARROW){
    snake.dir(0, 1);
  }else if(keyCode === LEFT_ARROW){
    snake.dir(-1, 0);
  }else if(keyCode === RIGHT_ARROW){
    snake.dir(1, 0);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];


  this.dir = function(x, y){
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      score++;
      document.getElementById("score").innerHTML = "Score: " + score;
      return true;
    }else{
      return false;
    }
  }

  this.death = function(){
    for (var k = 0; k < this.tail.length; k++) {
      var pos = this.tail[k];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        updateHighscore();
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        var insult = insults[insults.length * Math.random() | 0];
        document.getElementById("insults").innerHTML = insult;
        if (9 < highscore){
          level = 2;
          frameRate(10);
        }
        if (19 < highscore){
          level = 3;
          frameRate(12);
        }
        if (29 < highscore){
          level = 4;
          frameRate(15);
        }
        if (39 < highscore){
          level = 5;
          frameRate(18);
        }
        document.getElementById("level").innerHTML = "Level: " + level;
      }
    }
  }


  this.update = function(){
    for (var j = 0; j < this.tail.length - 1; j++) {
      this.tail[j] = this.tail[j + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
    
    theColor = colorlist[colorlist.length * Math.random() | 0];
    if (level > 1){
      theColor = colorlist2[colorlist2.length * Math.random() | 0];
    }
    if (level > 2){
      theColor = colorlist3[colorlist3.length * Math.random() | 0];
    }
    if (level > 3){
      theColor = colorlist4[colorlist4.length * Math.random() | 0];
    }
    if (level > 4){
      theColor = colorlist5[colorlist5.length * Math.random() | 0];
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);

    updateHighscore();
    document.getElementById("score").innerHTML = "Score: " + score;
    if (9 < highscore){
      level = 2;
      frameRate(10);
    }
    if (19 < highscore){
      level = 3;
      frameRate(12);
    }
    if (29 < highscore){
      level = 4;
      frameRate(15);
    }
    if (39 < highscore){
      level = 5;
      frameRate(18);
    }
    document.getElementById("level").innerHTML = "Level: " + level;
  }

  this.show = function() {
    fill(theColor);
    stroke(theColor);
    strokeWeight(2);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}

function updateHighscore(){
  if(score > highscore){
      highscore = score;
    }
  document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
}
