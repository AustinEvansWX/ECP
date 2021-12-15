interface EventMap {
  [key: string]: boolean;
}

export class Canvas {
  element: HTMLCanvasElement;
  backgroundColor: string;

  context: CanvasRenderingContext2D;

  loop: number = -1;

  events: EventMap = {};

  constructor(id: string, width: number, height: number, backgroundColor: string = 'black') {
    const canvas = document.getElementById(id);

    if (!canvas) throw Error(`No element with id ${id} found`);
    if (canvas.tagName != 'CANVAS') throw Error(`Element with id ${id} is not of type canvas`)

    this.element = (<HTMLCanvasElement>canvas);
    this.context = (<CanvasRenderingContext2D>this.element.getContext('2d'));

    this.element.width = width;
    this.element.height = height;

    this.backgroundColor = backgroundColor;

    this.eventHandler();
  }

  startLoop(loopFunction: Function, frameRate: number): void {
    this.loop = setInterval(loopFunction, 1e3 / frameRate);
  }

  stopLoop(): void {
    clearInterval(this.loop);
  }

  eventHandler(): void {
    window.addEventListener('keydown', e => this.processEvents(e));
    window.addEventListener('keyup', e => this.processEvents(e));
  }

  processEvents(event: KeyboardEvent): void {
    switch (event.type) {
      case 'keydown':
        this.events[event.key] = true;
        break;
      case 'keyup':
        this.events[event.key] = false;
        break;
    }
  }

  isButtonDown(key: string): boolean {
    return !!this.events[key];
  }

  clear(): void {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.element.width, this.element.height);
  }

  setColor(color: string): void {
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
  }

  setLineWidth(width: number): void {
    this.context.lineWidth = width;
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

  drawSquare(x: number, y: number, size: number, angle: number, color?: string): void {
    this.drawRect(x, y, size, size, angle, color);
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

  drawPolygon(points: number[][], color?: string): void {
    if (color) this.setColor(color);

    const path = new Path2D();

    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      if (i == 0) path.moveTo(p[0], p[1]);

      const p2 = points[i + 1];
      if (!p2) {
        path.closePath();
        break;
      }

      path.lineTo(p2[0], p2[1]);
    }

    this.context.fill(path);
  }

  drawGrid(gridSize: number, color: string = 'white'): void {
    this.setColor(color);
    const cellSize = this.element.width / gridSize;
    for (let i = 0; i <= gridSize; i++) {
      const location = cellSize * i;
      this.drawLine(location, 0, location, 800);
      this.drawLine(0, location, 800, location);
    }
  }
}
