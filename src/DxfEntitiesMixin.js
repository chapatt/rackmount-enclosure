export default Base => class extends Base {
  constructor() {
    super();

    this.lines = [];
    this.circles = [];
    this.dimensions = [];
  }

  _insertLines(dxf) {
    this.lines.forEach(({ x1, y1, x2, y2 }) => {
      dxf.addLine(x1, y1, x2, y2);
    });
  }

  _insertCircles(dxf) {
    this.circles.forEach(({ x, y, radius, layer }) => {
      dxf.addCircle(x, y, radius, layer);
    });
  }

  _insertDimensions(dxf) {
    this.dimensions.forEach(({ x1, y1, x2, y2, extX, extY, textX, textY }) => {
      dxf.addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY);
    });
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

  addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY, layer) {
    this.dimensions.push({ x1, y1, x2, y2, extX, extY, textX, textY, layer })
  }

  addSimpleAlignedDimension(x1, y1, x2, y2, direction, layer) {
    let extX, extY, textX, textY;

    let lesserX, greaterX, lesserY, greaterY;
    if (y2 > y1) {
      greaterY = y2
      lesserY = y1
    } else {
      lesserY = y2;
      greaterY = y1;
    }
    if (x2 > x1) {
      greaterX = x2
      lesserX = x1
    } else {
      lesserX = x2;
      greaterX = x1;
    }


    switch (direction) {
    case 'up':
      extX = x2;
      extY = y2 + 0.3125;
      textX = lesserX + ((greaterX - lesserX) / 2);
      textY = y1 + 0.4375;
      break;
    case 'right':
      extX = x2 + 0.3125;
      extY = y2;
      textX = y1 + 0.4375;
      textY = lesserY + ((greaterY - lesserY) / 2);
      break;
    case 'down':
      extX = x2;
      extY = y2 - 0.3125;
      textX = lesserX + ((greaterX - lesserX) / 2);
      textY = y1 - 0.4375;
      break;
    case 'left':
      extX = x2 - 0.3125;
      extY = y2;
      textX = y1 - 0.4375;
      textY = lesserY + ((greaterY - lesserY) / 2);
      break;
    }

    this.addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY, layer);
  }
}