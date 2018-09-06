
// GLOBALS
// list of words
var words = [
"gandalf",
"aragron",
"shire",
"elf",
"orc",
"silmarillion",
"dwarf",
"sauron",
"anduin",
"hobbit",
"wizard",
"boromir",
"legolas",
"mordor",
"frodo",
"samwise",
"meriadoc",
"saruman",
"philogy",
"tolkien"
];

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var wordToFind;
var characterList;
var letterChosen;
var letterBoxes = [];

var screenWidth = 600;
var youLose = false;
var youWin = false;
var screenHeight = 600;
var centerLine = screenWidth / 2;
var letterWidth = 100;
var letterHeight = 100;
var headSize = 50;
var relationToHead = 1.5;
var armLength = relationToHead * 0.68 * headSize;
var legLength = relationToHead * 0.8 * headSize;

var bodyPartDrawn = [false, false, false, false, false, false];
var bodyDrawFunction = [drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, drawLeftLeg];

// INIT
   function init() {
		wordToFind = words[Math.floor(Math.random() * words.length)];
		characterList = Array.from(wordToFind.toUpperCase());
		drawGallows();
		clearLetterChosen();
		drawLetterBoxes();
	}
	function reInit() {
		clearCanvas();
		for(var i = 0; i < bodyPartDrawn.length; i++){
			bodyPartDrawn[i] = false;
		}
		youLose = false;
		youWin = false;
		letterBoxes.length = 0;
		init();
		
	}

// DRAWING FUNCTIONS
// hangman  color:  #616669
	function clearCanvas() {
		ctx.beginPath();
		ctx.fillStyle = "#CBCEC5";
		ctx.fillRect(2, 2, screenWidth - 4, screenHeight - 4);

	}	
	function drawHead() {
		ctx.beginPath();
		ctx.strokeStyle = "#616669";
		ctx.lineWidth = 2;
		ctx.arc(centerLine, 125 + (headSize / 2), headSize / 2, 0, 2 * Math.PI);
		ctx.stroke();
	}
	function drawBody() {
		var bodyOrigionY = 125 + headSize;
		var bodyDestinationY = bodyOrigionY + relationToHead * headSize;
		ctx.beginPath();
		ctx.strokeStyle = "#616669";
		ctx.lineWidth = 2;
		ctx.moveTo(centerLine, bodyOrigionY);
		ctx.lineTo(centerLine, bodyDestinationY);
		ctx.stroke();

	}
	function drawLeftArm() {
		var armOrigionY = 125 + headSize + 15;
		var armDestinationY = armOrigionY + 0.5 * armLength; // (sin(30))
		var armDestinationX = centerLine - 0.87 * armLength; // cos(30)
		ctx.beginPath();
		ctx.strokeStyle = "#616669";
		ctx.lineWidth = 2;
		ctx.moveTo(centerLine, armOrigionY);
		ctx.lineTo(armDestinationX, armDestinationY);
		ctx.stroke();		
	}
	function drawRightArm() {
		var armOrigionY = 125 + headSize + 15;
		var armDestinationY = armOrigionY + 0.5 * armLength; // (sin(30))
		var armDestinationX = centerLine + 0.87 * armLength; // cos(30)
		ctx.beginPath();
		ctx.strokeStyle = "#616669";
		ctx.lineWidth = 2;
		ctx.moveTo(centerLine, armOrigionY);
		ctx.lineTo(armDestinationX, armDestinationY);
		ctx.stroke();		
	}
	function drawLeftLeg() {
		var legOrigionY = 125 + headSize + relationToHead * headSize;
		var legDestinationY = legOrigionY + 0.7 * legLength;
		var legDestinationX = centerLine + 0.7 * legLength;
		ctx.beginPath();
		ctx.strokeStyle = "#616669";
		ctx.lineWidth = 2;	
		ctx.moveTo(centerLine, legOrigionY);
		ctx.lineTo(legDestinationX, legDestinationY);
		ctx.stroke();
	}
	function drawRightLeg() {
		var legOrigionY = 125 + headSize + relationToHead * headSize;
		var legDestinationY = legOrigionY + 0.7 * legLength;
		var legDestinationX = centerLine - 0.7 * legLength;
		ctx.beginPath();
		ctx.strokeStyle = "#616669";
		ctx.lineWidth = 2;	
		ctx.moveTo(centerLine, legOrigionY);
		ctx.lineTo(legDestinationX, legDestinationY);
		ctx.stroke();	
	}

// gallow    color:  #666D69  
	// base
	function drawGallows() {
		ctx.beginPath();
		ctx.strokeStyle = "#666D69";
		ctx.lineWidth = 10;
		ctx.moveTo(250, 400);
		ctx.lineTo(450, 400);
		ctx.stroke();

		// pole
		ctx.moveTo(425, 400);
		ctx.lineTo(425, 50);
		ctx.stroke();

		// overhang
		ctx.lineTo(290, 50);
		ctx.stroke();

		//brace
		ctx.moveTo(385, 50);
		ctx.lineTo(425, 90);
		ctx.stroke();

		//rope
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#F5E5BC";
		ctx.moveTo(centerLine, 55);
		ctx.lineTo(centerLine, 125);
		ctx.stroke();
	}
function drawX() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font="250px Georgia";
	ctx.fillText("X",centerLine - 90, 275);	
}
function displayWin() {
	youWin = true;
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font="75px Georgia";
	ctx.fillText("You Won!", 150, 275);		
}
// letters  color:  #BB613E
function clearLetterChosen() {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(5, 5, 59, 55);
}
function drawLetterChosen() {
	ctx.beginPath();
	ctx.strokeStyle = "#BB613E";
	ctx.lineWidth = 2;
	ctx.font="48px Georgia";
	ctx.strokeText(letterChosen,15,50);
}
function letterBox(x, y) {
	this.x = x;
	this.y = y;
	this.chosen = false;
}

function drawLetterBoxes() {
	var numBoxes = characterList.length;
	var padding = 600 - 50 * numBoxes
	var startX = padding / 2;
	for(var i = 0; i < numBoxes; i++) {
		letterBoxes.push(new letterBox(startX, 495));
		drawBox(startX, 450);
//		drawLetter(characterList[i], startX + 5, 495);
		startX = startX + 50;
	}
}

function drawBox(x, y) {
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(x, y, 50, 50);
	ctx.strokeStyle = "#83382A";
	ctx.lineWidth = 2;
	ctx.rect(x,y,50,50);
	ctx.stroke();
}

function drawLetter(l, x, y) {
	ctx.beginPath();
	ctx.strokeStyle = "#BB613E";
	ctx.lineWidth = 2;
	ctx.font="45px Georgia";
	ctx.strokeText(l,x,y);}


// UPDATE
function drawBodyParts() {
	for (var i = 0; i < bodyPartDrawn.length; i++) {
		if (! bodyPartDrawn[i]) {
			bodyDrawFunction[i]();
			bodyPartDrawn[i] = true;
			return;
		}
	}
	youLose = true;
	drawX();
}

document.onkeydown = function (e) {
	if (youLose || youWin) {
		return;
	}
//	 if (e.keyCode == 32) // space bar
//	 {
//	 	drawBodyParts();
//	 	return;
//	 }
  	clearLetterChosen();
  	var tmpLetterChosen = keyCodeDict[e.keyCode];
  	if (tmpLetterChosen != undefined) {
      	letterChosen = tmpLetterChosen;
      	drawLetterChosen();
      	var letterFound = false;
      	for (var i = 0; i < characterList.length; i++){
      		if(letterChosen === characterList[i]){
      			drawLetter(characterList[i], letterBoxes[i].x + 5, letterBoxes[i].y);
      			letterBoxes[i].chosen = true;
      			letterFound = true;
      		} 
      	}
      	if (!letterFound) {
      		drawBodyParts();
      		return;
      	}
      	var allTrue = true;
      	for (var i = 0; i < letterBoxes.length; i++) {
      		if (letterBoxes[i].chosen == false) {
      			allTrue = false;
      			return;
      		}
      	}
      	if (allTrue) {
      		displayWin();
      	}
  	}	
};

var reset = document.querySelector("#reset");
reset.addEventListener("click", function() {
	reInit();
});

//  FOUND LETTER


// DID NOT FIND LETTER


// GAME OVER
function gameOver() {
	youLose = true;
	drawX();
}

//WIN


//USE

//apendix


// keycode list
var keyCodeDict = {

	65: "A",
	66: "B",
	67: "C",
	68: "D",
	69: "E",
	70: "F",
	71: "G",
	72: "H",
	73: "I",
	74: "J",
	75: "K",
	76: "L",
	77: "M",
	78: "N",
	79: "O",
	80: "P",
	81: "Q",
	82: "R",
	83: "S",
	84: "T",
	85: "U",
	86: "V",
	87: "W",
	88: "X",
	89: "Y",
	90: "Z"

};



init();