import { Canvas } from "../utilities/canvas";
import { Vector2 } from "../utilities/math";

const canvas = new Canvas('canvas', 800, 800, 'black');

const v = new Vector2(400, 400);

function gameLoop() {
  canvas.clear();
  canvas.drawLine(10, 10, 100, 100, 'white')
}

canvas.startLoop(gameLoop, 30);