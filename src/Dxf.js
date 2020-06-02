export default class Dxf {
  constructor() {
    this.data = "";
  }

  addRaw(data) {
    this.data += data;
  }

  addTag(groupCode, value) {
    this.data += `${groupCode}\n${value}\n`;
  }

  beginSection(name) {
    this.addTag(0, 'SECTION');
    this.addTag(2, name);
  }

  endSection() {
    this.addTag(0, 'ENDSEC');
  }

  endFile() {
    this.addTag(0, 'EOF');
  }

  beginTable(name) {
    this.addTag(0, 'TABLE');
    this.addTag(2, name);
  }

  endTable() {
    this.addTag(0, 'ENDTAB');
  }

  beginBlock(name) {
    this.addTag(0, 'BLOCK');
    this.addTag(2, name);
  }

  endBlock() {
    this.addTag(0, 'ENDBLK');
  }

  addLine(x1, y1, x2, y2, layer) {
    this.addTag(0, 'LINE');
    if (layer) {
      this.addTag(8, layer);
    }
    this.addTag(10, x1);
    this.addTag(20, y1);
    this.addTag(30, 0);
    this.addTag(11, x2);
    this.addTag(21, y2);
    this.addTag(31, 0);
  }

  addBlockReference(name, x, y, layer='0') {
    this.addTag(0, 'INSERT');
    this.addTag(2, name);
    this.addTag(10, x);
    this.addTag(20, y);
    this.addTag(30, 0);
    this.addTag(8, layer);
  }

  toString() {
    return this.data;
  }
}