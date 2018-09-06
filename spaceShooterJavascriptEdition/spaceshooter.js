

alert("you are here");
var screenWidth = 640;
var screenHeight = 480;

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

//GLOBAL

var saucer = new Saucer();
function Saucer() {
    this.w = 64;
    this.h = 64;
    this.dx = 10;
    this.dy = 2;
    this.x;
    this.y;
    this.imageDelay = 2;
    this.imageDelayCounter = 0;
    this.currentImage = 0;
    this.image = [];
    for (var i = 0; i < 4; i++) {
        var img = new Image();
        img.src = "img/saucer" + (i + 1) + ".gif";
        this.image.push(img);
    }
    this.draw = function () {
        this.imageDelayCounter++;
        if (this.imageDelayCounter > this.imageDelay) {
            this.imageDelayCounter = 0;
            this.currentImage++;
            if (this.currentImage > 3) {
                this.currentImage = 0;
            }
        }
        ctx.drawImage(this.image[this.currentImage], this.x, this.y);
    }
    this.nextPosition = function () {
        // check screen bounds
        //LEFT
        if (this.dx < 0) {
            if (this.x + this.dx < 0) {
                this.dx = this.dx * -1;
            } else {
                this.x += this.dx;
            }
        } else {
            if (this.x + this.dx > screenWidth - this.w) {
                this.dx = this.dx * -1;
            } else {
                this.x += this.dx;
            }
        }
        //UP
        if (this.dy < 0) {
            if (this.y + this.dy < 0) {
                //this.dy = this.dy * -1;
                this.dy = Math.floor(Math.random() * 5) + 1;
            } else {
                this.y += this.dy;
            }
        } else {
            if (this.y + this.dy > screenHeight - 100 - this.h) {
                this.dy = this.dy * -1;
            } else {
                this.y += this.dy;
            }
        }
    }
}
var shooter = new Shooter();
function Shooter() {
    this.w = 64;
    this.h = 64;
    this.dx = 0;
    this.dy = 0;
    this.x;
    this.y;
    this.isShooting = false;
    this.imageDelay = 2;
    this.imageDelayCounter = 0;
    this.currentImage = 0;
    this.image = [];
    for (var i = 0; i < 4; i++) {
        var img = new Image();
        img.src = "img/shooter" + (i + 1) + ".gif";
        this.image.push(img);
    }
    this.draw = function () {
        this.imageDelayCounter++;
        if (this.imageDelayCounter > this.imageDelay) {
            this.imageDelayCounter = 0;
            this.currentImage++;
            if (this.currentImage > 3) {
                this.currentImage = 0;
            }
        }
        ctx.drawImage(this.image[this.currentImage], this.x, this.y);
    }
    this.nextPosition = function () {
        // check screen bounds
        //LEFT
        if (this.x + this.dx < 0 || this.x + this.dx > screenWidth - this.w) {
            this.dx = 0;
        } else {
            this.x = this.x + this.dx;
        }
    }
}
var bullets = [];
function Bullet() {
    this.r = 4;
    this.dx = 0;
    this.dy = -8;
    this.x;
    this.y;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    this.nextPosition = function () {
        if (this.y + this.dy < 0) {
            bullets.shift();
        } else {
            this.y += this.dy;
        }
    }
    this.addToList = function(){
        bullets.push(this);
    }
}
function init() {
    saucer.x = 50;
    saucer.y = 50;
    shooter.x = 100;
    shooter.y = 400;
    window.setInterval(update, 70);
}
function update() {
    clearScreen();
    saucer.nextPosition();
    shooter.nextPosition();
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].nextPosition();
    }
    paint();
}
function paint() {
    saucer.draw();
    shooter.draw();
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }
}
function clearScreen() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, screenWidth, screenHeight);
}

document.onkeydown = function (e) {
    if (e.keyCode === 37) { // left
        shooter.dx = -8;
    } else if (e.keyCode === 39) {  //right
        shooter.dx = 8;
    } else if (e.keyCode === 32) { //spacebar
        shooter.isShooting = true;
        var bullet = new Bullet();
        bullet.x = shooter.x + 32;
        bullet.y = shooter.y + 2;
        bullet.addToList();
    } 
};

document.onkeyup = function (e) {
    if (e.keyCode === 37) { // left
        shooter.dx = 0;
    } else if (e.keyCode === 39) {  //right
        shooter.dx = 0;
    } else if (e.keyCode === 32) { //spacebar
        shooter.isShooting = false;
    }  
};

init();