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
        this._insertEntities(dxf);
      dxf.endSection(); // ENTITIES
    dxf.endBlock(); // BLOCK

    return dxf.toString();
  }
}
