var grid;
var clickedGrid;
var size;
var pictures;
var points = 1000;
var themes;
var theme;
var themesounds;

var amountOfJewels;
var rows;
var cols;
var test;
var song;

var slider;
var deltaE;

var pageBackgrounds;
var gameBackgrounds;

var body;
var veranderThemaKnop;

function setup() {
    size = 700;
    slider = document.getElementById("deltaE");
    deltaE = slider.value / 100;
    slider.oninput = function () {
        deltaE = this.value / 100;
    };
    pageBackgrounds = [[70, 100, 140], [70, 100, 140], [150, 20, 20], [100, 46, 0], [0, 150, 0],[255, 48, 196]];
    gameBackgrounds = [[77, 111, 154], [77, 111, 154], [255, 255, 255], [0, 150, 0], [255, 130, 0],[235, 235, 0]];

    body = document.getElementById("body");
    veranderThemaKnop = document.getElementById("knop");


    setupGame();
}

function draw() {
    background(gameBackgrounds[theme][0], gameBackgrounds[theme][1], gameBackgrounds[theme][2]);


    showGrid(grid);
    showClicked(clickedGrid);
    if (!checkForPossiblePlays(grid)) {
        document.getElementById("gameOver").innerHTML = "Doe jullie laptops maar toe, je bent dood";
    }
}

function changeTheme() {
    theme++;
    if (theme >= themes.length) {
        theme = 0;
    }
    body.style.backgroundColor = 'rgb(' + pageBackgrounds[theme][0] + ',' + pageBackgrounds[theme][1] + ',' + pageBackgrounds[theme][2] + ')';
    veranderThemaKnop.style.backgroundColor = 'rgb(' + pageBackgrounds[theme][0] + ',' + pageBackgrounds[theme][1] + ',' + pageBackgrounds[theme][2] + ')';
}

function setupGame() {
    createCanvas(size, size);

    amountOfJewels = 8;
    themes = [];
    theme = 0;

    rows = 9;
    cols = 9;
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

    function load(name) {
        return loadImage("../Game/img/" + name + ".png");
    }

    let images = [];
    let arne = [];
    let kerst = [];
    let paas = [];
    let fruit = [];
    let emoji = [];

    for (let i = 0; i < 8; i++) {
        images.push(load("gem" + i));
        arne.push(load("n" + i));
        kerst.push(load("kerst" + i));
        paas.push(load("Paas" + i + " 150x150"));
        fruit.push(load("fruit" + i));
        emoji.push(load("emoji" + i));
    }
    themes.push(images);
    themes.push(arne);
    themes.push(kerst);
    themes.push(paas);
    themes.push(fruit);
    themes.push(emoji);


    themesounds = [];
    let normalSounds = [];
    let kerstSounds = [];

    for (let i = 0; i < 3; i++) {
        normalSounds.push(loadSound("../Game/sounds/normal" + i + ".mp3"));
        kerstSounds.push(loadSound("../Game/sounds/kerst" + i + ".mp3"));

    }
    themesounds.push(normalSounds);
    themesounds.push(normalSounds);
    themesounds.push(kerstSounds);
    themesounds.push(normalSounds);
    themesounds.push(normalSounds);
    themesounds.push(normalSounds);



    fillGrid();

}

function showGrid(matrix) {
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            matrix[r][c].show(size, r, c, theme);
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
                stroke(color(56, 80, 112));
                rect(c * jewelSize + 1, r * jewelSize + 1, jewelSize - 2, jewelSize - 2);

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
                matrix[r][c] = new Jewel(false, r, 1);
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
            for (let col = 0; col < matrix[0].length - 1; col++) {
                newMatrix = swap(matrix, row, col, row, col + 1);
                if (checkGridAtPosition(newMatrix, row, col)[0] >= 3 || checkGridAtPosition(newMatrix, row, col)[1] >= 3) {
                    return true;
                }
                if (checkGridAtPosition(newMatrix, row, col + 1)[0] >= 3 || checkGridAtPosition(newMatrix, row, col + 1)[1] >= 3) {
                    return true;
                }
            }
        }
        return false;
    }

    return checkForPossiblePlaysHorizontalSwap(matrix) || checkForPossiblePlaysHorizontalSwap(giveTranspose(matrix));
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
    return cMax - cMin - 1;
}

function checkThisPlay(matrix, r1, c1, r2, c2) {
    let newMatrix = swap(matrix, r1, c1, r2, c2)
    let check1 = checkGridAtPosition(newMatrix, r1, c1);
    let check2 = checkGridAtPosition(newMatrix, r2, c2);
    return check1[0] >= 3 || check1[1] >= 3 || check2[0] >= 3 || check2[1] >= 3;
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

function checkNeighboursSelected(matrix, r, c) {
    // Geeft positie terug van buur die op true staat, anders [-1, -1]

    // Check links
    if (c > 0 && matrix[r][c - 1]) {
        return [r, c - 1];
    }
    // Check rechts
    else if (c < matrix[0].length - 1 && matrix[r][c + 1]) {
        return [r, c + 1];
    }
    // Check boven
    else if (r > 0 && matrix[r - 1][c]) {
        return [r - 1, c];
    }
    // Check onder
    else if (r < matrix.length - 1 && matrix[r + 1][c]) {
        return [r + 1, c];
    }
    else {
        return [-1, -1];
    }
}

function fillMatrixWith(matrix, x) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            matrix[row][col] = x;
        }
    }
    return matrix;
}

function returnHorizontalCombos(matrix, r, c, kind) {
    let cMin = c;
    while (cMin >= 0 && kind === matrix[r][cMin].soort) {
        cMin--;
    }
    let cMax = c;
    while (cMax < matrix.length && kind === matrix[r][cMax].soort) {
        cMax++;
    }
    return [cMin + 1, cMax - 1];
}

function searchForCombosAtPosition(matrix, r, c) {
    // Geeft een array met alle posities die deel uitmaken van een combo
    let hor = returnHorizontalCombos(matrix, r, c, matrix[r][c].soort);
    let ver = returnHorizontalCombos(giveTranspose(matrix), c, r, matrix[r][c].soort);
    let returnList = [];
    if (hor[1] - hor[0] + 1 >= 3) {
        for (let i = hor[0]; i <= hor[1]; i++) {
            returnList.push([r, i]);
        }
    }
    if (ver[1] - ver[0] + 1 >= 3) {
        for (let i = ver[0]; i <= ver[1]; i++) {
            returnList.push([i, c]);
        }
    }
    return returnList;
}

function searchAndDeleteCombos(matrix) {
    let jewels = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            jewels.push([i, j]);
        }
    }
    for (let j = 0; j < jewels.length; j++) {
        let positions = searchForCombosAtPosition(matrix, jewels[j][0], jewels[j][1]);
        for (let i = 0; i < positions.length; i++) {
            grid[positions[i][0]][positions[i][1]] = new Jewel(true, 0, grid[positions[i][0]][positions[i][1]].soort);
        }
    }
}

function contains(array, value) {
    for (let i = 0; i < array; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}


function replenishGrid() {
    let thereWhereEmptySpaces = false;
    for (let r = 0; r < grid.length; r++) {
        for (c = 0; c < grid[0].length; c++) {
            if (!grid[r][c].real) {
                points += 100;
                thereWhereEmptySpaces = true;
                for (r2 = r; r2 >= 0; r2--) {
                    if (r2 === 0) {
                        grid[r2][c] = new Jewel(false, -1, 1);
                    }
                    else {
                        grid[r2][c] = grid[r2 - 1][c];
                    }
                }
            }
        }
    }
    if (thereWhereEmptySpaces) {
        searchAndDeleteCombos(grid);
        replenishGrid();
        document.getElementById("points").innerHTML = points;
    }
}

function thisRowAndColumnWasClicked(r, c) {
    // Alle functionaliteit voor het aanklikken van een Jewel
    let neighbour = checkNeighboursSelected(clickedGrid, r, c);

    if (neighbour[0] === -1) {
        let thisWas = clickedGrid[r][c];
        fillMatrixWith(clickedGrid, false);
        clickedGrid[r][c] = !thisWas;
    }
    else {
        if (!checkThisPlay(grid, r, c, neighbour[0], neighbour[1])) {
            fillMatrixWith(clickedGrid, false);
        }
        else {
            playRandomSound();
            // Er zijn 2 juwelen aangeduid en deze kunnen gewisseld worden.
            grid = swap(grid, r, c, neighbour[0], neighbour[1]);
            let jewels = [[r, c], [neighbour[0], neighbour[1]]];
            searchAndDeleteCombos(grid);
            replenishGrid();
            fillMatrixWith(clickedGrid, false);
        }
    }
}

function playRandomSound() {
    for (let i = 0; i < themesounds.length; i++) {
        for (let j = 0; j < themesounds[i].length; j++) {
            if (themesounds[i][j].isPlaying()) { // .isPlaying() returns a boolean
                themesounds[i][j].stop();
            }
        }
    }
    let n = Math.floor(Math.random() * themesounds[theme].length);

    themesounds[theme][n].play();
}

function mousePressed() {
    if (mouseX <= size && mouseY <= size) {
        let rMouse = Math.floor(mouseY / (size / cols));
        let cMouse = Math.floor(mouseX / (size / rows));

        thisRowAndColumnWasClicked(rMouse, cMouse);
    }
}

class Jewel {
    constructor(geen, row, verplichteSoort) {
        if (!geen) {
            this.soort = Math.floor(Math.random() * amountOfJewels);
            this.v = 0;
            this.m = 1;
            this.g = 9.81;

            this.jewelSize = size / cols;

            this.height = row * this.jewelSize;
            this.real = !geen;
        }
        else {
            this.soort = verplichteSoort;
            this.real = !geen;
        }

    }

    fall(rij) {
        let newHeight = rij * this.jewelSize;

        if ((newHeight - this.height) ** 2 > 0 || this.v ** 2 > 0) {
            for (let i = 0; i < 10; i++) {
                let gravity = this.m * this.g;
                let w = 0;
                if (this.v !== 0) {
                    w = -(this.v ** 2 / 100) * this.v ** 2 / this.v;
                }
                let F = gravity + w;
                let a = F / this.m / 1000;
                this.v += a;
                this.height += this.v;
                if (this.height >= newHeight) {
                    let b = 0.1;
                    if (this.v - b > 0) {
                        let c = deltaE;
                        this.height -= this.v;
                        this.v -= b;
                        this.v = -c * this.v;
                    }
                    else {
                        this.v = 0;
                        this.height = newHeight;
                    }
                }
            }
        }
    }

    show(size, rij, kolom, thema) {
        if (this.soort !== -1) {
            this.fall(rij);
            let percentage = 0.8
            let x = kolom * this.jewelSize + (1 - percentage) / 2 * this.jewelSize;
            let y = this.height + (1 - percentage) / 2 * this.jewelSize;


            let img = themes[thema][this.soort];
            image(img, x, y, percentage * this.jewelSize, percentage * this.jewelSize);
        }

    }
}