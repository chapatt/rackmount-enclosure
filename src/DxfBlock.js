import Dxf from './Dxf';
import DxfEntitiesMixin from './DxfEntitiesMixin';

export default class DxfBlock extends DxfEntitiesMixin(Object) {
  constructor(name) {
    super();

    this.name = name;
  }

  toString() {
    let dxf = new Dxf();

    dxf.beginBlock(this.name);
      dxf.beginSection('ENTITIES');
        this._insertLines(dxf);
        this._insertCircles(dxf);
        this._insertDimensions(dxf);
      dxf.endSection(); // ENTITIES
    dxf.endBlock(); // BLOCK

    return dxf.toString();
  }
}
