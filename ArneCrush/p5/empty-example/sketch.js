var grid;
var size;



function setup() {
  // put setup code here
  size = 600;
  createCanvas(size, size);
  let rijen = 8;
  let kolommen = 8;
  grid = [];
  for (let rows = 0; rows < rijen; rows++) {
  	  grid.push(new Array(kolommen));
  }
  fillGrid();
  
}

function draw() {
  // put drawing code here
  background(100);
  showGrid();
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
			grid[r][c] = new Jewel(r,c, "green");
		}
	}
}

class Jewel {
	constructor(rij, kolom, kleur) {
		this.rij = rij;
		this.kolom = kolom;
		this.kleur = color(100, 10, 100);
	}

	show(size, amount) {
		let jewelSize = size / amount;
		fill(this.kleur);
		noStroke();
		ellipse(this.kolom*jewelSize+jewelSize/2, this.rij*jewelSize+jewelSize/2, jewelSize, jewelSize);
	}
}