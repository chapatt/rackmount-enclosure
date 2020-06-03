export default Base => class extends Base {
  constructor() {
    super();

    this.lines = [];
    this.circles = [];
  }

  addLine(x1, y1, x2, y2, layer=null) {
    this.lines.push({ x1, y1, x2, y2, layer });
  }

  // x and y are bottom left corner
  addRectangle(w, h, x=0, y=0, layer) {
    this.addLine(x, y, x, y + h, layer);
    this.addLine(x, y + h, x + w, y + h, layer);
    this.addLine(x + w, y + h, x + w, y, layer);
    this.addLine(x + w, y, x, y, layer);
  }

  addCircle(x, y, radius, layer) {
    this.circles.push({ x, y, radius, layer });
  }
}