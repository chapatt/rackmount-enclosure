export default class DxfUtils {
  // dxf should implement DxfEntitiesMixin
  static addHorizontalOvalToDxf(dxf, x, y, radius, eccentricity) {
    const leftCenter = x - (eccentricity / 2);
    const rightCenter = x + (eccentricity / 2);
    dxf.addArc(leftCenter, y, radius, 90, 270);
    dxf.addArc(rightCenter, y, radius, 270, 90);
    dxf.addLine(leftCenter, y + radius, rightCenter, y + radius)
    dxf.addLine(leftCenter, y - radius, rightCenter, y - radius)
  }

  // dxf should implement DxfEntitiesMixin
  static addRackHolesToDxf(dxf, centerX, centerY, rackHoleDimensions) {
    if (rackHoleDimensions.data.length === 0) {
      return;
    }

    const spaceSum = rackHoleDimensions.data.reduce((spaceSum, { spaceBelow }) => {
      return spaceSum + (spaceBelow ? spaceBelow : 0);
    }, 0);
    let y = centerY - (spaceSum / 2);
    rackHoleDimensions.data.reduceRight((_, { spaceBelow }) => {
      y += spaceBelow ? spaceBelow : 0;
      if (this.circularRackHoles) {
        dxf.addCircle(centerX - (rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2);
        dxf.addCircle(centerX + (rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2);
      } else {
        DxfUtils.addHorizontalOvalToDxf(dxf, centerX - (rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2, this.rackHoleEccentricity);
        DxfUtils.addHorizontalOvalToDxf(dxf, centerX + (rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2, this.rackHoleEccentricity);
      }
    }, null);
  }

  // dxf should implement DxfEntitiesMixin
  // perspective should be 'top' or 'side'
  // uprightDirection should be 'top', 'right', 'bottom', or 'left'
  // The start (in startMitered) is on the left when looking at the side view with the upright leg on top
  static addRailToDxf(dxf, flatLeg, uprightLeg, thickness, length, uprightDirection, perspective, startMitered, endMitered) {
    if (perspective === 'side') {
      const isHorizontal = uprightDirection === 'top' || uprightDirection === 'bottom';
      dxf.addRectangle(isHorizontal ? length : flatLeg, isHorizontal ? flatLeg : length);

      let x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6;
      switch (uprightDirection) {
        case 'top':
          x1 = thickness;
          x2 = length - thickness;
          x3 = uprightLeg;
          x4 = length - uprightLeg;
          x5 = 0;
          x6 = length;
          y1 = 0;
          y2 = flatLeg - thickness;
          y3 = flatLeg;
          break;
        case 'right':
          x1 = 0;
          x2 = flatLeg - thickness;
          x3 = flatLeg;
          y1 = length - thickness;
          y2 = thickness;
          y3 = length - flatLeg;
          y4 = flatLeg;
          y5 = length;
          y6 = 0;
          break;
        case 'bottom':
          x1 = length - thickness;
          x2 = thickness;
          x3 = uprightLeg;
          x4 = length - uprightLeg;
          x5 = length;
          x6 = 0;
          y1 = flatLeg;
          y2 = thickness;
          y3 = 0;
          break;
        case 'left':
          x1 = flatLeg;
          x2 = thickness;
          x3 = 0;
          y1 = thickness;
          y2 = length - thickness;
          y3 = flatLeg;
          y4 = length - flatLeg;
          y5 = 0;
          y6 = length;
          break;
      }
      let startX, endX;
      let startY, endY;
      switch (uprightDirection) {
        case 'top':
        case 'bottom':
          if (startMitered) {
            dxf.addLine(x1, y1, x1, y2);
            dxf.addLine(x3, y2, x3, y3);
            startX = x1
          } else {
            startX = x5;
          }
          if (endMitered) {
            dxf.addLine(x2, y2, x2, y1);
            dxf.addLine(x4, y2, x4, y3);
            endX = x2;
          } else {
            endX = x6;
          }
          dxf.addLine(startX, y2, endX, y2);
          break;
        case 'left':
        case 'right':
          if (startMitered) {
            dxf.addLine(x1, y1, x2, y1);
            dxf.addLine(x2, y3, x3, y3);
            startY = y1;
          } else {
            startY = y5;
          }
          if (endMitered) {
            dxf.addLine(x2, y2, x1, y2);
            dxf.addLine(x2, y4, x3, y4);
            endY = y2;
          } else {
            endY = y6;
          }

          dxf.addLine(x2, startY, x2, endY);
          break;
      }
    } else if (perspective === 'top') {
      let x1, x2, x3, x4, x5, x6, startX1, endX1, startX2, endX2;
      let y1, y2, y3, y4, y5, y6, startY1, endY1, startY2, endY2;
      switch (uprightDirection) {
        case 'top':
          x1 = length;
          x2 = 0;
          x3 = length - flatLeg;
          x4 = flatLeg;
          x5 = length - thickness;
          x6 = thickness;
          y1 = flatLeg;
          y2 = 0;
          y3 = flatLeg - thickness;
          break;
        case 'right':
          x1 = flatLeg;
          y1 = 0;
          x2 = 0;
          y2 = length;
          y3 = flatLeg;
          y4 = length - flatLeg;
          x3 = flatLeg - thickness;
          y5 = thickness;
          y6 = length - thickness;
          break;
        case 'bottom':
          x1 = 0;
          x2 = length
          x3 = flatLeg;
          x4 = length - flatLeg;
          x5 = thickness;
          x6 = length - thickness;
          y1 = 0;
          y2 = flatLeg;
          y3 = thickness;
          break;
        case 'left':
          x1 = 0;
          y1 = length;
          x2 = flatLeg;
          y2 = 0;
          y3 = length - flatLeg;
          y4 = flatLeg;
          x3 = thickness;
          y5 = length - thickness;
          y6 = thickness;
          break;
      }
      switch (uprightDirection) {
        case 'top':
        case 'bottom':
          if (startMitered) {
            startX1 = x3;
            startX2 = x5;
          } else {
            startX1 = x1;
            startX2 = x1;
          }
          if (endMitered) {
            endX1 = x4;
            endX2 = x6;
          } else {
            endX1 = x2;
            endX2 = x2;
          }
          dxf.addLine(x1, y1, startX1, y2); // start end
          dxf.addLine(startX1, y2, endX1, y2); // minor length
          dxf.addLine(endX1, y2, x2, y1); // end end
          dxf.addLine(x2, y1, x1, y1); // major length
          dxf.addLine(startX2, y3, endX2, y3); // upright leg indication
          break;
        case 'right':
        case 'left':
          if (startMitered) {
            startY1 = y3;
            startY2 = y5;
          } else {
            startY1 = y1;
            startY2 = y1;
          }
          if (endMitered) {
            endY1 = y4;
            endY2 = y6;
          } else {
            endY1 = y2;
            endY2 = y2;
          }
          dxf.addLine(x1, y1, x2, startY1); // start end
          dxf.addLine(x2, startY1, x2, endY1); // minor length
          dxf.addLine(x2, endY1, x1, y2); // end end
          dxf.addLine(x1, y2, x1, y1); // major length
          dxf.addLine(x3, startY2, x3, endY2); // upright leg indication
          break;
      }
    }
  }
}
