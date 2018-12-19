// Schrijf hier je code
function width(grid) {
    return grid[0].length;
}

function height(grid) {
    return grid.length;
}

function isInside(grid, position) {
    return (position.x < width(grid) && position.x >= 0 && position.y >= 0 && position.y < height(grid));
}

function swap(grid, p, q) {
    let a = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];

    grid[q.y][q.x] = a;
}

function horizontalChainAt(grid, position) {
    let xMin = position.x;
    while (grid[position.y][position.x] === grid[position.y][xMin]) {
        xMin--;
    }
    let xMax = position.x;
    while (grid[position.y][position.x] === grid[position.y][xMax]) {
        xMax++;
    }

    return xMax-xMin-1;
}

function verticalChainAt(grid, position) {
    let { x, y } = position;
    let i;
    for (i = 1; y + i < height(grid); ++i) {
        if (grid[y + i][x] !== grid[y][x]) {
            break;
        }
    }
    let j;
    for (j = 1; y - j >= 0; ++j) {
        if (grid[y - j][x] !== grid[y][x]) {
            break;
        }
    }
    return i + j - 1;
}

function removeChains(grid) {
    const positions = [];
    const result = {};
    const w = width(grid);
    const h = height(grid);
    for (let y = 0; y !== h; ++y) {
        let x = 0;
        while (x < w) {
            const n = horizontalChainAt(grid, { x, y });
            if (n > 2) {
                for (let i = 0; i !== n; ++i) {
                    positions.push({ x: x + i, y });
                }
            }
            x += n;
        }
    }
    for (let x = 0; x !== w; ++x) {
        let y = 0;
        while (y < h) {
            const n = verticalChainAt(grid, { x, y });
            if (n > 2) {
                for (let i = 0; i !== n; ++i) {
                    positions.push({ x, y: y + i });
                }
            }
            y += n;
        }
    }
    for (const position of positions) {
        const { x, y } = position;
        const color = grid[y][x];
        result[color] = (result[color] || 0) + 1;
    }
    for (const { x, y } of positions) {
        grid[y][x] = '';
    }
    return result;
}

function collapse(grid) {
    for (let x = 0; x < width(grid); x++) {
        for (let y = 0; y < height(grid); y++) {
            if (grid[y][x] === ""){
                let ty = y;
                while (ty > 0){
                    grid[ty][x] = grid[ty-1][x];
                    ty--;
                }
                grid[0][x] = "";
            }
        }
    }
}

