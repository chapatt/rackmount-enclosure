import Dxf from './Dxf';
import DxfEntitiesMixin from './DxfEntitiesMixin';

export default class DxfDocument extends DxfEntitiesMixin(Object) {
  constructor() {
    super();

    this.blocks = [];
    this.blockReferences = [];
    this.lines = [];
  }

  toString() {
    let dxf = new Dxf();

    dxf.beginSection('BLOCKS');
      this.blocks.forEach((block) => {
        dxf.addRaw(block.toString());
      });
    dxf.endSection(); // BLOCKS
    dxf.beginSection('ENTITIES');
      this.lines.forEach(({ x1, y1, x2, y2, layer }) => {
        dxf.addLine(x1, y1, x2, y2, layer);
      });
      this.blockReferences.forEach(({ name, x, y, layer }) => {
        dxf.addBlockReference(name, x, y, layer);
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
