var grid;
var clickedGrid
var size;
var pictures;

var amountOfJewels;

var rows;
var cols;

function setup() {
  size = 600;
  pictures = new Array(3);
  pictures[0] = [color(200,20,20), color(20,200,20), color(20,20,200), color(200,150,0), color(0,150,110), color(255,10,240)]
  createCanvas(size, size);
  setupGame();
}

function draw() {
  background(100);
  showGrid(grid);
  showClicked(clickedGrid);
}

function setupGame() {
	amountOfJewels = 6;

	rows  = 8;
	cols = 8;
	grid = [];
	clickedGrid = [];
	for (let r = 0; r < rows; r++) {
	  	let newRow = [];
	  	let newClickedRow = [];
	  	for (let c = 0; c < cols; c++) {
	  		newRow.push(null);
	  		newClickedRow.push(false);
	  	}
	  	grid.push(newRow);
	  	clickedGrid.push(newClickedRow);
	}
	fillGrid();

}

function showGrid(matrix) {
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < matrix[r].length; c++) {
			matrix[r][c].show(size, matrix.length);
		}
	}
}

function showClicked(matrix) {
	let jewelSize = size / rows;
	for (let r = 0; r < matrix.length; r++) {

		for (let c = 0; c < matrix[r].length; c++) {

			if (matrix[r][c]) {
				noFill();
				strokeWeight(2);
				stroke(grid[r][c].kleur);
				rect(c*jewelSize+1, r*jewelSize+1, jewelSize-2, jewelSize-2);

			}
		}
	}
}

function fillGrid() {
	// Vult de algemene grid
	let matrix = makeCopy(grid);
	let geenGeldigGridGevonden = true;
	while (geenGeldigGridGevonden) {
		for (let r = 0; r < matrix.length; r++) {
			for (let c = 0; c < matrix[r].length; c++) {
				matrix[r][c] = new Jewel(r,c);
			}
		}

		check = [!checkWholeGrid(matrix), checkForPossiblePlays(matrix)];
		if (check[0] && check[1]) {
			geenGeldigGridGevonden = false;
		}
	}
	grid = matrix;	
}

function swap(matrix, r1, c1, r2, c2) {
	// Geeft een kopie van de matrix terug met 2 elementen verwisseld
	let copy = makeCopy(matrix);
	let element1 = copy[r1][c1];
	copy[r1][c1] = copy[r2][c2];
	copy[r2][c2] = element1;
	return copy;
}

function checkForPossiblePlays(matrix) {
	// Geeft terug of er een swap is die een combo geeft
	function checkForPossiblePlaysHorizontalSwap(matrix) {
		// Geeft terug of er in de horizontale richting een swap is die een combo geeft
		for (let row = 0; row < matrix.length; row++) {
			for (let col = 0; col < matrix[0].length-1; col++) {
				newMatrix = swap(matrix, row, col, row, col+1);
				if (checkGridAtPosition(newMatrix, row, col)[0] >= 3 || checkGridAtPosition(newMatrix, row, col)[1] >= 3) {
					return true;
				}
				if (checkGridAtPosition(newMatrix, row, col+1)[0] >= 3 || checkGridAtPosition(newMatrix, row, col+1)[1] >= 3) {
					return true;
				}
			}
		}
		return false;
	}

	if (checkForPossiblePlaysHorizontalSwap(matrix) || checkForPossiblePlaysHorizontalSwap(giveTranspose(matrix))) {
		return true;
	}
	else {
		return false;
	}
}

function makeCopy(matrix) {
	// Geeft een kopie van de matrix terug
	newMatrix = [];
	for (let row = 0; row < matrix.length; row++) {
		newRow = [];
		for (let col = 0; col < matrix[0].length; col++) {
			newRow.push(matrix[row][col]);
		}
		newMatrix.push(newRow);
	}
	return newMatrix;
}

function checkWholeGrid(matrix) {
	// Alleen voor aanmaken van nieuwe Grid
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[0].length; col++) {
			if (checkGridAtPosition(matrix, row, col)[0] >= 3 || checkGridAtPosition(matrix, row, col)[1] >= 3) {
				return true;
			}
		}
	}
	return false;
}

function checkGridAtPosition(matrix, r, c) {
	// Geeft lengte horizontale combo en verticale combo terug
	let kind = matrix[r][c].soort;

	let horNum = horizontalChainAt(r, c, kind, matrix);
	let verNum = horizontalChainAt(c, r, kind, giveTranspose(matrix));

	return [horNum, verNum];
}

function horizontalChainAt(r, c, kind, matrix) {
	// Geeft de lengte van zelfde_soort_rij op pos (r;c) terug
	let cMin = c;
	while (cMin >= 0 && kind === matrix[r][cMin].soort) {
	    cMin--;
	}
	let cMax = c;
	while (cMax < matrix.length && kind === matrix[r][cMax].soort) {
	    cMax++;
	}
	return cMax-cMin-1;
}

function giveTranspose(matrix) {
	// Geeft de getransponeerde matrix terug
	let newMatrix = []
	for (let col = 0; col < matrix[0].length; col++) {
		newRow = [];
		for (let row = 0; row < matrix.length; row++) {
			newRow.push(matrix[row][col]);
		}
		newMatrix.push(newRow);
	}
	return newMatrix;
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

function mousePressed() {
	if (mouseX <= size && mouseY <= size) {
		let rMouse = Math.floor(mouseY / (size/cols));
		let cMouse = Math.floor(mouseX / (size/rows));

		clickedGrid[rMouse][cMouse] = !clickedGrid[rMouse][cMouse];

		let amountClicked = 0;
	}
}