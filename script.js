// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };


const generateRandomFood=()=> {
    const foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    const foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x: foodX, y: foodY };
}
let food = generateRandomFood();
let score = 0;



// Game loop (run every 100ms)
const gameLoop=()=>{
    if (checkCollision()) {
        alert('Game Over! Your score: ' + score);
        resetGame();
    } else {
        moveSnake();
        drawEverything();
    }
}

setInterval(gameLoop, 100);

const drawEverything=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

const moveSnake=()=> {
    const newHead = {
        x: snake[0].x + direction.x * boxSize,
        y: snake[0].y + direction.y * boxSize
    };

    snake.unshift(newHead);

    // If the snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
        food = generateRandomFood();
        score++;
    } else {
        snake.pop(); // Remove the last part of the snake
    }
}

const changeDirection=(event)=> {
    const key = event.key;

    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

document.addEventListener('keydown', changeDirection);


const checkCollision=()=> {
    const head = snake[0];

    // Check if the snake hits the walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Check if the snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = generateRandomFood();
    score = 0;
}
