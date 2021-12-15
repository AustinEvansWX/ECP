import { Canvas } from "../utilities/canvas";
import { randomInt } from "../utilities/math";
import { Snake } from "./snake";

const canvas = new Canvas('canvas', 800, 800);

const gridSize = 20;
const cellSize = canvas.element.width / gridSize;

const snake = new Snake(gridSize);
let apple = randomApple();

canvas.setLineWidth(2);
canvas.startLoop(gameLoop, 12);

function gameLoop() {
  canvas.clear();

  if (canvas.isButtonDown('w')) snake.direction = 'up';
  if (canvas.isButtonDown('s')) snake.direction = 'down';
  if (canvas.isButtonDown('a')) snake.direction = 'left';
  if (canvas.isButtonDown('d')) snake.direction = 'right';

  const head = snake.segments[0];
  const newHead = [...head];

  if (snake.direction == 'up') newHead[1] -= 1;
  if (snake.direction == 'down') newHead[1] += 1;
  if (snake.direction == 'left') newHead[0] -= 1;
  if (snake.direction == 'right') newHead[0] += 1;

  const [x, y] = newHead;
  let dead = false;

  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) dead = true;

  for (let segment of snake.segments) if (x == segment[0] && y == segment[1]) dead = true;

  if (dead) snake.reset();
  else snake.segments.unshift(newHead);

  if (x == apple[0] && y == apple[1]) apple = randomApple();
  else if (!dead) snake.segments.pop();

  for (let segment of snake.segments) {
    canvas.drawSquare(segment[0] * cellSize, segment[1] * cellSize, cellSize, 0, '#33e83f');
  }

  canvas.drawCircle((apple[0] + 0.5) * cellSize, (apple[1] + 0.5) * cellSize, cellSize / 2, '#ff432e');
}

function randomApple(): number[] {
  const [x, y] = [randomInt(0, gridSize - 1), randomInt(0, gridSize - 1)];
  for (let segment of snake.segments) if (segment[0] == x && segment[1] == y) return randomApple();
  return [x, y];
}