const button = document.querySelector('#start-button');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const displayWidth = canvas.width;
const displayHeight = canvas.height;
const gridWidth = 24;
const gridHeight = 24;
const cellWidth = displayWidth / gridWidth;
const cellHeight = displayHeight / gridHeight;
const appleImage = new Image(cellWidth, cellHeight);
appleImage.src = './apple.png';
let highScore = 0;

const state = {};

// drawing helpers

function clear(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, displayWidth, displayHeight);
}

function drawCell(x, y){
    context.fillRect(x * cellWidth + 2.5, y * cellHeight + 2.5, cellWidth - 5, cellHeight - 5);
}

function drawDiamond(x, y){
    const vertices = [[1, 0.5], [0.5, 0], [0, 0.5], [0.5, 1]];
    const coords = [];
    for (const [vx, vy] of vertices) {
        coords.push([(x + vx) * cellWidth, (y + vy) * cellHeight]);
    }
    context.beginPath();
    context.moveTo(coords[0][0],coords[0][1]);
    for (const [cx, cy] of coords) {
        context.lineTo(cx, cy);
    }
    context.fill();
}

function drawImage(image, x, y){
    x *= cellWidth;
    y *= cellHeight;
    context.drawImage(image, x, y, cellWidth, cellHeight);
}

// coord helpers

function coordToKey(x, y){
    return `${x},${y}`;
}

function keyToCoord(key){
    return key.split(',').map(Number);
}

// game logic helpers

function resetState(){
    state.x = 11;
    state.y = 11;
    state.dx = 1;
    state.dy = 0;
    state.delay = 160; // start at about 6 updates/second
    state.tail = [];
    state.length = 3;
    state.score = 0;
    placeFruit();
}

function placeFruit(){
    const coords = [];
    for(x = 0; x < gridWidth; x++){
        for(y = 0; y < gridHeight; y++){
            const key = coordToKey(x, y);
            if(state.tail.includes(key)) continue;
            coords.push([x, y]);
        }
    }
    const idx = Math.floor(Math.random() * coords.length);
    const [fx, fy] = coords[idx];
    state.fx = fx; state.fy = fy;
}

function scoreUpdate(){
    if(state.score > highScore) highScore = state.score;
    document.querySelector('#score').innerHTML = `Score: ${state.score} High Score: ${highScore}`;
}

function draw(){
    clear();
    context.fillStyle = 'white';
    drawDiamond(state.x, state.y);
    for (const key of state.tail) {
        const [x, y] = keyToCoord(key);
        drawCell(x, y);
    }
    drawImage(appleImage, state.fx, state.fy);
    // drawDisplay();
}

function drawDisplay(){
    context.font = "32px serif";
    context.fillText(`Score: ${state.score}`, 0, 32);
    const hs = `High Score: ${highScore}`;
    const hsWidth = context.measureText(hs).width;
    context.fillText(hs, displayWidth - hsWidth, 32);
}

function loop(){
    // check for lose conditions
    const key = coordToKey(state.x, state.y);
    let running = false;
    if(state.x < 0 || state.x >= gridWidth){}
    else if(state.y < 0 || state.y >= gridHeight){}
    else if(state.tail.includes(key)){}
    else{running = true;}
    if(!running) {
        button.innerHTML = "Game Over! Try again?";
        return;
    };
    // simulate
    state.tail.unshift(key);
    state.tail = state.tail.slice(0, state.length - 1);
    state.x += state.dx;
    state.y += state.dy;
    if(state.x === state.fx && state.y === state.fy){
        state.length++;
        state.delay *= 0.95;
        state.score++;
        scoreUpdate();
        placeFruit();
    }
    // draw
    draw();
    // setup next loop
    setTimeout(loop, state.delay);
}

function keyDown(event){
    const {keyCode} = event;
    let dx = 0;
    let dy = 0;
    if(keyCode === 68){dx = 1;}
    else if(keyCode === 65){dx = -1;}
    else if(keyCode === 87){dy = -1;}
    else if(keyCode === 83){dy = 1;}
    if(dx === state.dx || dy === state.dy){
        // either pressed in same direction or reverse
        // either way ignore
    }
    else{
        state.dx = dx;
        state.dy = dy;
    }
}

function main(){
    button.addEventListener('click', e => {
        running = true;
        button.innerHTML = "Reset";
        resetState();
        loop();
    });
    window.addEventListener('keydown', keyDown);
    clear();
    // resetState();
    // draw();
}

appleImage.onload = main;