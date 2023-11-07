export class Coordinate {
  x: number;
  y: number;

  constructor({ x, y }: Coordinate) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
