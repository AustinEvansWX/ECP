import { Vector2 } from "./math";

export class Canvas {
  element: HTMLCanvasElement;
  backgroundColor: string;

  context: CanvasRenderingContext2D;

  loop: number = -1;

  constructor(id: string, width: number, height: number, backgroundColor: string = 'black') {
    const canvas = document.getElementById(id);

    if (!canvas) throw Error(`No element with id ${id} found`);
    if (canvas.tagName != 'CANVAS') throw Error(`Element with id ${id} is not of type canvas`)

    this.element = (<HTMLCanvasElement>canvas);
    this.context = (<CanvasRenderingContext2D>this.element.getContext('2d'));

    this.element.width = width;
    this.element.height = height;

    this.backgroundColor = backgroundColor;
  }

  startLoop(loopFunction: Function, frameRate: number): void {
    this.loop = setInterval(loopFunction, 1e3 / frameRate);
  }

  stopLoop(): void {
    clearInterval(this.loop);
  }

  clear(): void {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.element.width, this.element.height);
  }

  setColor(color: string): void {
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
  }

  drawRect(x: number, y: number, width: number, height: number, angle: number, color?: string): void {
    if (color) this.setColor(color);

    if (angle > 0) {
      this.context.save();
      this.context.translate(x + width / 2, y + height / 2);
      this.context.rotate(angle * (Math.PI / 180));
      this.context.translate(-(x + width / 2), -(y + height / 2));
      this.context.fillRect(x, y, width, height);
      this.context.restore();
    } else {
      this.context.fillRect(x, y, width, height);
    }
  }

  drawCircle(x: number, y: number, radius: number, color?: string): void {
    if (color) this.setColor(color);

    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.fill();
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, color?: string): void {
    if (color) this.setColor(color);

    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }
}