import Dxf from './Dxf';
import DxfEntitiesMixin from './DxfEntitiesMixin';

export default class DxfDocument extends DxfEntitiesMixin(Object) {
  constructor(units=null) {
    super();

    this.units = units; // English or Metric
    this.blocks = [];
    this.blockReferences = [];
  }

  toString() {
    let dxf = new Dxf();

    dxf.beginSection('HEADER');
      dxf.addTag(9, '$MEASUREMENT');
      dxf.addTag(70, this.units === 'English' ? 0 : 1);
      dxf.addTag(9, '$DIMASZ');
      dxf.addTag(40, 0.125);
      dxf.addTag(9, '$DIMAUNIT');
      dxf.addTag(70, 0);
      dxf.addTag(9, '$DIMEXO');
      dxf.addTag(40, 0.0625);
      dxf.addTag(9, '$DIMEXE');
      dxf.addTag(40, 0.25);
      dxf.addTag(9, '$DIMTXT');
      dxf.addTag(40, 0.125);
      dxf.addTag(9, '$DIMGAP');
      dxf.addTag(40, 0.0625);
    dxf.endSection(); // HEADER

    this.nextHandle = this.firstHandle;

    dxf.beginSection('BLOCKS');
      this.blocks.forEach((block) => {
        block.firstHandle = this.nextHandle;
        dxf.addRaw(block.toString());
        this.nextHandle = block.nextHandle;
      });
    dxf.endSection(); // BLOCKS
    dxf.beginSection('ENTITIES');
      this._insertEntities(dxf);
      this.blockReferences.forEach(({ name, x, y, layer }) => {
        dxf.addBlockReference(this.nextHandle++, name, x, y, layer);
      });
    dxf.endSection(); // ENTITIES
    dxf.endFile();

    return dxf.toString();
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  addBlockReference(name, x, y, layer='0') {
    this.blockReferences.push({ name, x, y, layer });
  }

  addMinimum(dxf) {
    dxf.beginSection('HEADER');
      dxf.addTag(9, '$ACADVER')
      dxf.addTag(1, 'AC1021');

      dxf.addTag(9, '$HANDSEED');
      dxf.addTag(5, '20000');

      dxf.addTag(9, '$MEASUREMENT');
      dxf.addTag(70, 0);
    dxf.endSection(); // HEADER

    dxf.beginSection('CLASSES');
    dxf.endSection(); // CLASSES

    dxf.beginSection('TABLES');
      dxf.beginTable('VPORT');
        dxf.addTag(2, '*ACTIVE')
        dxf.addTag(70, 0);
      dxf.endTable();
      dxf.beginTable('LTYPE');
        // BYBLOCK
        // BYLAYER
        // CONTINUOUS
      dxf.endTable();
      dxf.beginTable('LAYER');
        // ‘0’
      dxf.endTable();
      dxf.beginTable('STYLE');
        // STANDARD
      dxf.endTable();
      dxf.beginTable('VIEW');
      dxf.endTable();
      dxf.beginTable('UCS');
      dxf.endTable();
      dxf.beginTable('APPID');
        // ACAD
      dxf.endTable();
      dxf.beginTable('DIMSTYLE');
        // STANDARD
      dxf.endTable();
      dxf.beginTable('BLOCK_RECORDS');
        // *MODEL_SPACE
        // *PAPER_SPACE
      dxf.endTable();
    dxf.endSection(); // TABLES

    dxf.beginSection('BLOCKS');
      // *MODEL_SPACE
      // *PAPER_SPACE
    dxf.endSection(); // BLOCKS

    dxf.beginSection('OBJECTS');
    dxf.endSection(); // OBJECTS
  }
}
