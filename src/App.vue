<template>
  <div id="app">
    <fieldset>
      <legend>Front Panel</legend>

      <label for="frontPanelWidth">Front panel width: </label>
      <input id="frontPanelWidth" v-model.number="frontPanelWidth" type="text" />
      <br />

      <label for="frontPanelHeight">Front panel height: </label>
      <input id="frontPanelHeight" v-model.number="frontPanelHeight" type="text" />
    </fieldset>

    <fieldset>
      <legend>Panel Reinforcement</legend>

      <label for="frontFullRails">Full support rails across front: </label>
      <input id="frontFullRails" v-model="frontFullRails" type="checkbox" />
      <br />

      <label for="frontRailWidth">Front rail width: </label>
      <input id="frontRailWidth" v-model.number="frontPartialRailWidth" type="text" :disabled="frontFullRails" />
      <br />

      <label for="rearFullRails">Full support rails across rear: </label>
      <input id="rearFullRails" v-model="rearFullRails" type="checkbox" />
      <br />

      <label for="rearRailWidth">Rear rail width: </label>
      <input id="rearRailWidth" v-model.number="rearPartialRailWidth" type="text" :disabled="rearFullRails" />
      <br />
    </fieldset>

    <fieldset>
      <legend>General Dimensions</legend>

      <label for="width">Width: </label>
      <input id="width" v-model.number="width" type="text" />
      <br />

      <label for="height">Height: </label>
      <input id="height" v-model.number="height" type="text" />
      <br />

      <label for="depth">Depth: </label>
      <input id="depth" v-model.number="depth" type="text" />
    </fieldset>

    <fieldset>
      <legend>Thicknesses</legend>

      <label for="frontPanelThickness">Front panel thickness: </label>
      <input id="frontPanelThickness" v-model.number="frontPanelThickness" type="text" />
      <br />

      <label for="rearPanelThickness">Rear panel thickness: </label>
      <input id="rearPanelThickness" v-model.number="rearPanelThickness" type="text" />
      <br />

      <label for="sideThickness">Side thickness: </label>
      <input id="sideThickness" v-model.number="sideThickness" type="text" />
      <br />

      <label for="topThickness">Top thickness: </label>
      <input id="topThickness" v-model.number="topThickness" type="text" />
      <br />

      <label for="bottomThickness">Bottom thickness: </label>
      <input id="bottomThickness" v-model.number="bottomThickness" type="text" />
      <br />
    </fieldset>

    <fieldset>
      <legend>Support Angle Dimensions</legend>

      <label for="angleVerticalLeg">Rail vertical leg: </label>
      <input id="angleVerticalLeg" v-model.number="angleVerticalLeg" type="text" />
      <br />

      <label for="angleHorizontalLeg">Rail horizontal leg: </label>
      <input id="angleHorizontalLeg" v-model.number="angleHorizontalLeg" type="text" />
      <br />

      <label for="angleThickness">Thickness: </label>
      <input id="angleThickness" v-model.number="angleThickness" type="text" />
      <br />

      <label for="verticalAngleLeg">Corner bracket leg: </label>
      <input id="verticalAngleLeg" v-model.number="verticalAngleLeg" type="text" />
      <br />

      <label for="verticalAngleThickness">Corner bracket thickness: </label>
      <input id="verticalAngleThickness" v-model.number="verticalAngleThickness" type="text" />
    </fieldset>

    <fieldset>
      <legend>Hardware</legend>

      <label for="screwFreeFitDiameter">Screw free fit diameter: </label>
      <input id="screwFreeFitDiameter" v-model.number="screwFreeFitDiameter" type="text" />
      <br />

      <label for="pemDiameter">PEM nut diameter: </label>
      <input id="pemDiameter" v-model.number="pemDiameter" type="text" />
      <br />

      <label for="hasHandles">Adjust front/side holes for handles: </label>
      <input id="hasHandles" v-model="hasHandles" type="checkbox" />
      <br />

      <label for="handleHoleDiameter">Handle hole diameter: </label>
      <input id="handleHoleDiameter" v-model.number="handleHoleDiameter" type="text" :disabled="!hasHandles" />
      <br />

      <label for="handleHoleSpacing">Handle hole spacing (center-to-center): </label>
      <input id="handleHoleSpacing" v-model.number="handleHoleSpacing" type="text" :disabled="!hasHandles" />
    </fieldset>

    <button v-on:click="downloadDxf()">Download DXF</button>

    <div>
      <h2>Front Panel</h2>
      <p>{{ frontPanelWidth }} W x {{ frontPanelHeight }} L x {{ frontPanelThickness }} T</p>
      <p>Hole locations:</p>
      <ul>
        <li>X: {{ frontPanelEndToCornerHole }}, Y: {{ frontPanelBottomEdgeToCornerHole }}, D: {{ hasHandles ? handleHoleDiameter : screwFreeFitDiameter }}</li>
        <li>X: {{ frontPanelEndToCornerHole }}, Y: {{ frontPanelHeight - frontPanelTopEdgeToCornerHole }}, D: {{ hasHandles ? handleHoleDiameter : screwFreeFitDiameter }}</li>
        <li>X: {{ frontPanelWidth - frontPanelEndToCornerHole }}, Y: {{ frontPanelBottomEdgeToCornerHole }}, D: {{ hasHandles ? handleHoleDiameter : screwFreeFitDiameter }}</li>
        <li>X: {{ frontPanelWidth - frontPanelEndToCornerHole }}, Y: {{ frontPanelHeight - frontPanelTopEdgeToCornerHole }}, D: {{ hasHandles ? handleHoleDiameter : screwFreeFitDiameter }}</li>
      </ul>

      <h2>Sides (x2)</h2>
      <p>{{ height }} W x {{ sideDepth }} H x {{ sideThickness }} T</p>
      <p>Hole locations:</p>
      <ul>
        <li>X: {{ sideBottomEdgeToHole }}, Y: {{ sideEndToFrontCornerHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ height - sideTopEdgeToHole }}, Y: {{ sideEndToFrontCornerHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ sideBottomEdgeToHole }}, Y: {{ sideDepth - sideEndToRearCornerHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ height - sideTopEdgeToHole }}, Y: {{ sideDepth - sideEndToRearCornerHole }}, D: {{ screwFreeFitDiameter }}</li>
      </ul>

      <h2>Rear Panel</h2>
      <p>{{ rearPanelWidth }} W x {{ height }} H x {{ rearPanelThickness }} T</p>
      <p>Hole locations:</p>
      <ul>
        <li>X: {{ rearPanelEndToCornerHole }}, Y: {{ rearPanelBottomEdgeToHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ rearPanelEndToCornerHole }}, Y: {{ height - rearPanelTopEdgeToHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ rearPanelWidth - rearPanelEndToCornerHole }}, Y: {{ rearPanelBottomEdgeToHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ rearPanelWidth - rearPanelEndToCornerHole }}, Y: {{ height - rearPanelTopEdgeToHole }}, D: {{ screwFreeFitDiameter }}</li>
      </ul>

      <h2>Top</h2>
      <p>{{ topWidth }} W x {{ topDepth }} H x {{ topThickness }} T</p>

      <h2>Bottom</h2>
      <p>{{ bottomWidth }} W x {{ bottomDepth }} H x {{ bottomThickness }} T</p>

      <h2>Left-Top/Right-Bottom Side Rails (x2)</h2>
      <h2>Right-Top/Left-Bottom Side Rails (x2)</h2>
      <p>{{ sideRailDepth }} L</p>
      <p>{{ frontFullRails ? 'Mitered at front' : 'Square at front' }}</p>
      <p>{{ rearFullRails ? 'Mitered at rear' : 'Square at rear' }}</p>
      <p>*Horizontal leg Hole locations:</p>
      <ul>
        <li>X: {{ angleHorizontalLeg / 2 }}, Y: {{ 0 }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleHorizontalLeg / 2 }}, Y: {{ 0 }}, D: {{ pemDiameter }}</li>
      </ul>
      <p>Vertical leg Hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ sideRailEndToFrontCornerHole }}, D: {{ screwFreeFitDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ sideRailDepth - sideRailEndToRearCornerHole }}, D: {{ screwFreeFitDiameter }}</li>
      </ul>

      <h2>Front Rails (x2)</h2>
      <p>{{ frontRailWidth }} L</p>
      <p>{{ frontFullRails ? 'Mitered on ends' : 'Square on ends' }}</p>
      <p>*Horizontal leg hole locations:</p>
      <ul>
        <li>X: {{ 0 }}, Y: {{ angleHorizontalLeg / 2 }}, D: {{ pemDiameter }}</li>
        <li>X: {{ 0 }}, Y: {{ angleHorizontalLeg / 2 }}, D: {{ pemDiameter }}</li>
      </ul>
      <p>Vertical leg hole locations:</p>
      <ul>
        <li>X: {{ frontRailEndToCornerHole }}, Y: {{ hasHandles ? frontRailEdgeToCornerHole : angleVerticalLeg / 2 }}, D: {{ frontFullRails ? screwFreeFitDiameter : pemDiameter }}</li>
        <li>X: {{ frontRailWidth - frontRailEndToCornerHole }}, Y: {{ hasHandles ? frontRailEdgeToCornerHole : angleVerticalLeg / 2 }},  D: {{ frontFullRails ? screwFreeFitDiameter : pemDiameter }}</li>
      </ul>

      <h2>Rear Rails (x2)</h2>
      <p>{{ rearRailWidth }} L</p>
      <p>{{ rearFullRails ? 'Mitered on ends' : 'Square on ends' }}</p>
      <p>*Horizontal leg hole locations:</p>
      <ul>
        <li>X: {{ 0 }}, Y: {{ angleHorizontalLeg / 2 }}, D: {{ pemDiameter }}</li>
        <li>X: {{ 0 }}, Y: {{ angleHorizontalLeg / 2 }}, D: {{ pemDiameter }}</li>
      </ul>
      <p>Vertical leg hole locations:</p>
      <ul>
        <li>X: {{ rearRailEndToCornerHole }}, Y: {{ angleVerticalLeg / 2 }}, D: {{ rearFullRails ? screwFreeFitDiameter : pemDiameter }}</li>
        <li>X: {{ rearRailWidth - rearRailEndToCornerHole }}, Y: {{ angleVerticalLeg / 2 }}, D: {{ rearFullRails ? screwFreeFitDiameter : pemDiameter }}</li>
      </ul>

      <h2>Front Corner Brackets (x2)</h2>
      <p>{{ cornerBracketLength }} L</p>
      <p>Front leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ frontCornerBracketEndToHole }}, D: {{ hasHandles ? handleHoleDiameter : pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketLength - frontCornerBracketEndToHole }}, D: {{ hasHandles ? handleHoleDiameter : pemDiameter }}</li>
      </ul>
      <p>Side leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketLength - cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
      </ul>

      <h2>Rear Corner Brackets (x2)</h2>
      <p>{{ cornerBracketLength }} L</p>
      <p>Rear leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketLength - cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
      </ul>
      <p>Side leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketLength - cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DxfDocument from './DxfDocument';
  import DxfBlock from './DxfBlock';

  export default {
    name: 'App',
    data: function () {
      return {
        frontPanelWidth: 19,
        frontPanelHeight: 1.75 - (1 / 32),
        frontFullRails: false,
        frontPartialRailWidth: 2,
        rearFullRails: false,
        rearPartialRailWidth: 2,
        width: 17,
        height: (1 + (3 / 4)) - (1 / 32),
        depth: 12,
        frontPanelThickness: 1 / 8,
        rearPanelThickness: 1 / 16,
        sideThickness: 1 / 16,
        topThickness: 1 / 16,
        bottomThickness: 1 / 16,
        angleVerticalLeg: 1 / 2,
        angleHorizontalLeg: 1 / 2,
        angleThickness: 1 / 16,
        verticalAngleLeg: 1 / 2,
        verticalAngleThickness: 1 / 16,
        screwFreeFitDiameter: 1 / 8,
        pemDiameter: 1 / 4,
        hasHandles: false,
        handleHoleDiameter: 1 / 16,
        handleHoleSpacing: 1 + (1 / 4),
      };
    },
    computed: {
      frontPanelTopEdgeToHole: function () {
        return this.sideTopEdgeToHole + ((this.frontPanelHeight - this.height) / 2);
      },
      frontPanelBottomEdgeToHole: function () {
        return this.sideBottomEdgeToHole + ((this.frontPanelHeight - this.height) / 2);
      },
      frontPanelTopEdgeToCornerHole: function () {
        return this.hasHandles ? (this.frontPanelHeight - this.handleHoleSpacing) / 2 : this.frontPanelTopEdgeToHole;
      },
      frontPanelBottomEdgeToCornerHole: function () {
        return this.hasHandles ? (this.frontPanelHeight - this.handleHoleSpacing) / 2 : this.frontPanelBottomEdgeToHole;
      },
      cornerHoleWidth: function () {
        return this.rearPanelWidth - (2 * (this.verticalAngleThickness + (this.verticalAngleLeg / 2)));
      },
      frontPanelEndToCornerHole: function () {
        return (this.frontPanelWidth - this.cornerHoleWidth) / 2;
      },
      sideDepth: function () {
        return this.depth - this.frontPanelThickness;
      },
      sideTopEdgeToHole: function () {
        return this.topThickness + (this.angleVerticalLeg / 2);
      },
      sideBottomEdgeToHole: function () {
        return this.bottomThickness + (this.angleVerticalLeg / 2);
      },
      sideEndToFrontCornerHole: function () {
        return this.sideRailEndToFrontCornerHole;
      },
      sideEndToRearCornerHole: function () {
        return this.sideRailEndToRearCornerHole + this.rearPanelThickness;
      },
      rearPanelWidth: function () {
        return this.width - (2 * this.sideThickness);
      },
      rearPanelTopEdgeToHole: function () {
        return this.sideTopEdgeToHole;
      },
      rearPanelBottomEdgeToHole: function () {
        return this.sideBottomEdgeToHole;
      },
      rearPanelEndToCornerHole: function () {
        return (this.rearPanelWidth - this.cornerHoleWidth) / 2;
      },
      topWidth: function () {
        return this.rearPanelWidth;
      },
      topDepth: function () {
        return this.depth - (this.frontPanelThickness + this.rearPanelThickness);
      },
      bottomWidth: function () {
        return this.rearPanelWidth;
      },
      bottomDepth: function () {
        return this.topDepth;
      },
      sideRailDepth: function () {
        return this.topDepth;
      },
      frontRailWidth: function () {
        return this.frontFullRails ? this.rearPanelWidth : this.frontPartialRailWidth;
      },
      rearRailWidth: function () {
        return this.rearFullRails ? this.rearPanelWidth : this.rearPartialRailWidth;
      },
      sideRailEndToFrontCornerHole: function () {
        return (this.verticalAngleLeg / 2) + (this.frontFullRails ? this.angleThickness : 0);
      },
      sideRailEndToRearCornerHole: function () {
        return (this.verticalAngleLeg / 2) + (this.rearFullRails ? this.angleThickness : 0);
      },
      cornerBracketLength: function () {
        return this.height - (2 * (this.topThickness + this.bottomThickness + this.angleThickness));
      },
      frontRailEndToCornerHole: function () {
        return (this.verticalAngleLeg / 2) + (this.frontFullRails ? this.angleThickness : 0);
      },
      rearRailEndToCornerHole: function () {
        return (this.verticalAngleLeg / 2) + (this.rearFullRails ? this.angleThickness : 0);
      },
      frontRailEdgeToCornerHole: function () {
        return this.hasHandles ? ((this.height - (this.topThickness + this.bottomThickness)) - this.handleHoleSpacing) / 2 : this.verticalAngleLeg / 2;
      },
      frontCornerBracketEndToHole: function () {
        return this.frontRailEdgeToCornerHole - this.angleThickness;
      },
      cornerBracketEndToHole: function () {
        return (this.verticalAngleLeg / 2) - this.angleThickness;
      },
    },
    methods: {
      downloadDxf: function () {
        const document = new DxfDocument('English');

        // Top
        const topBlock = new DxfBlock('top');
        topBlock.addRectangle(this.topWidth, this.topDepth);
        document.addBlock(topBlock);
        document.addBlockReference('top', 0, this.angleVerticalLeg + 1 + this.frontPanelHeight + 1, 'outlines');

        // Top front rail
        const topFrontRailBlock = new DxfBlock('top_front_rail');
        topFrontRailBlock.addRectangle(this.frontRailWidth, this.angleVerticalLeg);
        document.addBlock(topFrontRailBlock);
        document.addBlockReference('top_front_rail', 0, this.frontPanelHeight + 1, 'outlines');

        // Front panel
        const frontPanelBlock = new DxfBlock('front_panel');
        frontPanelBlock.addRectangle(this.frontPanelWidth, this.frontPanelHeight);
        frontPanelBlock.addSimpleAlignedDimension(0, 0, 0, this.frontPanelHeight, 'left');
        frontPanelBlock.addSimpleAlignedDimension(0, this.frontPanelHeight, this.frontPanelWidth, this.frontPanelHeight, 'up');
        frontPanelBlock.addCircle(this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, (this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter) / 2);
        frontPanelBlock.addSimpleDiameterDimension(this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter);
        frontPanelBlock.addCircle(this.frontPanelEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToCornerHole, (this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter) / 2);
        frontPanelBlock.addCircle(this.frontPanelWidth - this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, (this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter) / 2);
        frontPanelBlock.addCircle(this.frontPanelWidth - this.frontPanelEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToCornerHole, (this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter) / 2);
        document.addBlock(frontPanelBlock);
        document.addBlockReference('front_panel', 0, 0, 'outlines');

        // Bottom front rail
        const bottomFrontRailBlock = new DxfBlock('bottom_front_rail');
        bottomFrontRailBlock.addRectangle(this.frontRailWidth, this.angleHorizontalLeg);
        document.addBlock(bottomFrontRailBlock);
        document.addBlockReference('bottom_front_rail', 0, -(this.angleHorizontalLeg + 1), 'outlines');

        // Bottom
        const bottomBlock = new DxfBlock('bottom');
        bottomBlock.addRectangle(this.bottomWidth, this.bottomDepth);
        document.addBlock(bottomBlock);
        document.addBlockReference('bottom', 0, -(this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Rear panel
        const rearPanelBlock = new DxfBlock('rear_panel');
        rearPanelBlock.addRectangle(this.rearPanelWidth, this.height);
        document.addBlock(rearPanelBlock);
        document.addBlockReference('rear_panel', 0, -(this.height + 1 + this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

                console.log(document.toString());
        this.downloadText('drawing.dxf', document.toString());
      },
      downloadText: function (filename, text) {
        const link = document.createElement('a');
        link.setAttribute('href', 'data:application/dxf;charset=utf-8,' + encodeURIComponent(text));
        link.setAttribute('download', filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
</script>

<style>
  input, fieldset {
    margin-bottom: 0.5em;
  }
</style>
