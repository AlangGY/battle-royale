interface CoordinateConstructorOptions {
  x: number;
  y: number;
}

export class Coordinate {
  x: number;
  y: number;

  constructor({ x, y }: CoordinateConstructorOptions) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  isSame(coordinate: Coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }

  distanceTo(coordinate: Coordinate) {
    return Math.abs(this.x - coordinate.x) + Math.abs(this.y - coordinate.y);
  }
}
