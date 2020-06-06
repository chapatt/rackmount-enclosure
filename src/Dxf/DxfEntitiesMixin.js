export default Base => class extends Base {
  constructor() {
    super();

    this.lines = [];
    this.circles = [];
    this.alignedDimensions = [];
    this.diameterDimensions = [];
  }

  _insertEntities(dxf) {
    this.lines.forEach(({ x1, y1, x2, y2 }) => {
      dxf.addLine(x1, y1, x2, y2);
    });
    this.circles.forEach(({ x, y, radius, layer }) => {
      dxf.addCircle(x, y, radius, layer);
    });
    this.alignedDimensions.forEach(({ x1, y1, x2, y2, extX, extY, textX, textY }) => {
      dxf.addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY);
    });
    this.diameterDimensions.forEach(({ x1, y1, x2, y2, textX, textY }) => {
      dxf.addDiameterDimension(x1, y1, x2, y2, textX, textY);
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

  // textX and textY are optional
  addAlignedDimension(x1, y1, x2, y2, extX, extY, textX, textY, layer) {
    this.alignedDimensions.push({ x1, y1, x2, y2, extX, extY, textX, textY, layer });
  }

  addSimpleAlignedDimension(x1, y1, x2, y2, direction, layer) {
    let extX, extY;

    switch (direction) {
    case 'up':
      extX = x2;
      extY = y2 + 0.3125;
      break;
    case 'right':
      extX = x2 + 0.3125;
      extY = y2;
      break;
    case 'down':
      extX = x2;
      extY = y2 - 0.3125;
      break;
    case 'left':
      extX = x2 - 0.3125;
      extY = y2;
      break;
    }

    this.addAlignedDimension(x1, y1, x2, y2, extX, extY, null, null, layer);
  }

  // textX and textY are optional
  addDiameterDimension(x1, y1, x2, y2, textX, textY, layer) {
    this.diameterDimensions.push({ x1, y1, x2, y2, textX, textY, layer });
  }

  addSimpleDiameterDimension(x, y, diameter, angleDeg, layer) {
    let x1, y1, x2, y2;

    //x1 = x - (diameter / 2);
    //x2 = x + (diameter / 2);
    //y1 = y2 = y;

    const radius = diameter / 2;
    const angleRad = angleDeg * (Math.PI / 180);
    const angleOppositeRad = angleRad + Math.PI;

    x1 = x + (radius * Math.cos(angleOppositeRad));
    y1 = y + (radius * Math.sin(angleOppositeRad));
    x2 = x + (radius * Math.cos(angleRad));
    y2 = y + (radius * Math.sin(angleRad));

    this.diameterDimensions.push({ x1, y1, x2, y2, textX: null, textY: null, layer });
  }
}