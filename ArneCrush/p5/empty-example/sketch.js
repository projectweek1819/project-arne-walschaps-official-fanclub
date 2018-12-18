var grid;
var size;
var pictures;

var amountOfJewels;



function setup() {
  // put setup code here
  size = 600;
  pictures = new Array(3);
  pictures[0] = [color(200,20,20), color(20,200,20), color(20,20,200), color(200,150,0), color(0,150,110), color(255,10,240)]
  createCanvas(size, size);
  setupGame();
}


function draw() {
  // put drawing code here
  background(100);
  showGrid();
}

function setupGame() {
	amountOfJewels = 6;

	let rijen = 8;
	let kolommen = 8;
	grid = [];
	for (let rows = 0; rows < rijen; rows++) {
	  	grid.push(new Array(kolommen));
	}
	fillGrid();
}

function showGrid() {
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[r].length; c++) {
			grid[r][c].show(size, grid.length);
		}
	}
}

function fillGrid() {
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[r].length; c++) {
			grid[r][c] = new Jewel(r,c);
		}
	}
}

function checkWholeGrid() {

}

function checkGridAtPosition(r, c) {
	let color = grid[r][c].kleur;
}

class Jewel {
	constructor(rij, kolom) {
		this.rij = rij;
		this.kolom = kolom;
		this.soort = Math.floor(Math.random()*amountOfJewels);
		this.level = 0;

		this.kleur = pictures[this.level][this.soort];


	}

	show(size, amount) {
		let jewelSize = size / amount;
		fill(this.kleur);
		noStroke();
		ellipse(this.kolom*jewelSize+jewelSize/2, this.rij*jewelSize+jewelSize/2, jewelSize, jewelSize);
	}

}