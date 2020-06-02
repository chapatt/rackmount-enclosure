import Dxf from './Dxf';
import DxfEntitiesMixin from './DxfEntitiesMixin';

export default class DxfBlock extends DxfEntitiesMixin(Object) {
  constructor(name) {
    super();

    this.name = name;
    this.lines = [];
  }

  toString() {
    let dxf = new Dxf();

    dxf.beginBlock(this.name);
      dxf.beginSection('ENTITIES');
        this.lines.forEach(({ x1, y1, x2, y2 }) => {
          dxf.addLine(x1, y1, x2, y2);
        });
      dxf.endSection(); // ENTITIES
    dxf.endBlock(); // BLOCK

    return dxf.toString();
  }
}
