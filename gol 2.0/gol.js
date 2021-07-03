function make2DArray(cols, rows) {
    arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let arr;
let grid;
let cols;
let rows;
let resolution = 30;
let playBool = true;
let resSlider;
let sliderVal;
let drawModeBool = true;


function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }

    button = createButton('Randomize Grid');
    button.position(19, 50);
    button.mousePressed(randomizeGrid);

    button = createButton('Clear Grid');
    button.position(19, 80);
    button.mousePressed(clearGrid);

    button = createButton('Play Toggle');
    button.position(19, 110);
    button.mousePressed(play);

    // button = createButton('Draw Toggle');
    // button.position(19, 140);
    // button.mousePressed(drawMode);

    resSlider = createSlider(5, 100, 30);
    resSlider.position(19, 140);

    
    loop();
}

function draw() {

    sliderVal = resSlider.value();
    
    background(0);

    textSize(20);
    fill(150);
    stroke(0);
    text(playBool, 120, 130);
    // text(drawModeBool, 125, 160);
    text("hint: try drawing!", 19, 185);
    textSize(13);
    text("try pressing c, d, u, e, r, k, l", 19, 200);



    // drawing on grid
    stroke(255);
    if (mouseIsPressed === true && drawModeBool) {
        // making drawing easier when not playing
        if (playBool) {
            loop();
        } else {
            noLoop();
        }
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (mouseX >= x && mouseX <= x + (resolution-1) &&
                    mouseY >= y && mouseY <= y + (resolution-1)) {
                    if (grid[i][j] == 0) {
                        grid[i][j] = 1;
                        fill(255);
                        stroke(0);
                        rect(x, y, resolution-1, resolution-1); 
                    } else {
                        grid[i][j] = 0;
                        fill(0);
                        stroke(0);
                        rect(x, y, resolution-1, resolution-1);
                    }
                    
                    
                }
            }
        }
    }


    // draw grid of rects
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution-1, resolution-1);   
            }
        }
    }


    if (playBool) {
        let next = make2DArray(cols, rows);

        // calculate the next generation/array based on prev grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {

            
                // count amount of alive neighbours
                let neighbours = countNeighbours(grid, i, j);

                // grab current state of a cell
                let state = grid[i][j];

                // rules of conways game of life logic
                if (state == 0 && neighbours== 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
                
            }
        }
        
        grid = next;
    }  
}



function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            //edges continuing off to loop around
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum += grid[col][row];
        }
    }

    // remove self count as neighbour
    sum -= grid[x][y];
    return sum;
}

function randomizeGrid() {
    resolution = sliderVal;
    cols = floor(windowWidth / resolution);
    rows = floor(windowHeight / resolution);
    grid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function clearGrid() {
    resolution = sliderVal;
    cols = floor(windowWidth / resolution);
    rows = floor(windowHeight / resolution);
    grid = make2DArray(cols, rows);
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function play() {
    playBool = !playBool;
}

// function drawMode() {
//     drawModeBool = !drawModeBool;
// }

function mouseReleased() {
    loop();
    draw();
}

function mouseDragged() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (mouseX >= x && mouseX <= x + (resolution-1) &&
                mouseY >= y && mouseY <= y + (resolution-1)) {
                if (grid[i][j] == 0) {
                    grid[i][j] = 1;
                    fill(255);
                    stroke(0);
                    rect(x, y, resolution-1, resolution-1); 
                } else {
                    grid[i][j] = 0;
                    fill(0);
                    stroke(0);
                    rect(x, y, resolution-1, resolution-1);
                }
                
                
            }
        }
    }
}

// secret key
function keyTyped() {
    if (key == "c") {
        clearGrid();
    }

    let rx = floor(random(arr.length-5));
    let ry = floor(random(arr[0].length-6));
    console.log(arr.length);
    console.log(rx);
    if (key === "d") {
        // down glider
        grid[1+rx][1+ry] = 1;
        grid[3+rx][1+ry] = 1;
        grid[4+rx][2+ry] = 1;
        grid[4+rx][3+ry] = 1;
        grid[4+rx][4+ry] = 1;
        grid[4+rx][5+ry] = 1;
        grid[3+rx][5+ry] = 1;
        grid[2+rx][5+ry] = 1;
        grid[1+rx][4+ry] = 1;
    }

    if (key == "u") {
        // up glider
        grid[1+rx][1+ry] = 1;
        grid[2+rx][1+ry] = 1;
        grid[3+rx][1+ry] = 1;
        grid[1+rx][2+ry] = 1;
        grid[4+rx][2+ry] = 1;
        grid[1+rx][3+ry] = 1;
        grid[1+rx][4+ry] = 1;
        grid[2+rx][5+ry] = 1;
        grid[2+rx][5+ry] = 1;
    }

    if (key == "r") {
        // diag R glider down
        grid[2+rx][1+ry] = 1;
        grid[3+rx][2+ry] = 1;
        grid[3+rx][3+ry] = 1;
        grid[2+rx][3+ry] = 1;
        grid[1+rx][3+ry] = 1;
    }

    if (key == "l") {
        //diag L glider down
        grid[2+rx][1+ry] = 1;
        grid[1+rx][2+ry] = 1;
        grid[3+rx][3+ry] = 1;
        grid[2+rx][3+ry] = 1;
        grid[1+rx][3+ry] = 1;
    }

    if (key == "e") {
        // diag R glider up
        grid[1+rx][1+ry] = 1;
        grid[2+rx][1+ry] = 1;
        grid[3+rx][1+ry] = 1;
        grid[3+rx][2+ry] = 1;
        grid[2+rx][3+ry] = 1;
    }

    if (key == "k") {
        //diag L glider up
        grid[1+rx][1+ry] = 1;
        grid[2+rx][1+ry] = 1;
        grid[3+rx][1+ry] = 1;
        grid[1+rx][2+ry] = 1;
        grid[2+rx][3+ry] = 1;
    }

}