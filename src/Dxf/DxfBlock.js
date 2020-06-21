import Dxf from './Dxf';
import DxfEntitiesMixin from './DxfEntitiesMixin';

export default class DxfBlock extends DxfEntitiesMixin(Object) {
  constructor(name, layer=null) {
    super();

    this.name = name;
    this.layer = layer;
  }

  toString() {
    let dxf = new Dxf();

    dxf.beginBlock(this.name, this.layer);
      this._insertEntities(dxf);
    dxf.endBlock(); // BLOCK

    return dxf.toString();
  }
}
