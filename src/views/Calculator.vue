<template>
  <div id="calculator">
    <fieldset>
      <legend>Front Panel</legend>

      <label for="frontPanelWidth">Front panel width: </label>
      <input id="frontPanelWidth" v-model.number="frontPanelWidth" type="number" />
      <br />

      <label for="frontPanelHeight">Front panel height: </label>
      <input id="frontPanelHeight" v-model.number="frontPanelHeight" type="number" />
    </fieldset>

    <fieldset>
      <legend>Panel Reinforcement</legend>

      <label for="frontFullRails">Full support rails across front: </label>
      <input id="frontFullRails" v-model="frontFullRails" type="checkbox" />
      <br />

      <label for="frontRailWidth">Front rail width: </label>
      <input id="frontRailWidth" v-model.number="frontPartialRailWidth" type="number" :disabled="frontFullRails" />
      <br />

      <label for="rearFullRails">Full support rails across rear: </label>
      <input id="rearFullRails" v-model="rearFullRails" type="checkbox" />
      <br />

      <label for="rearRailWidth">Rear rail width: </label>
      <input id="rearRailWidth" v-model.number="rearPartialRailWidth" type="number" :disabled="rearFullRails" />
      <br />
    </fieldset>

    <fieldset>
      <legend>General Dimensions</legend>

      <label for="width">Width: </label>
      <input id="width" v-model.number="width" type="number" />
      <br />

      <label for="height">Height: </label>
      <input id="height" v-model.number="height" type="number" />
      <br />

      <label for="depth">Depth: </label>
      <input id="depth" v-model.number="depth" type="number" />
    </fieldset>

    <fieldset>
      <legend>Thicknesses</legend>

      <label for="frontPanelThickness">Front panel thickness: </label>
      <input id="frontPanelThickness" v-model.number="frontPanelThickness" type="number" />
      <br />

      <label for="rearPanelThickness">Rear panel thickness: </label>
      <input id="rearPanelThickness" v-model.number="rearPanelThickness" type="number" />
      <br />

      <label for="sideThickness">Side thickness: </label>
      <input id="sideThickness" v-model.number="sideThickness" type="number" />
      <br />

      <label for="topThickness">Top thickness: </label>
      <input id="topThickness" v-model.number="topThickness" type="number" />
      <br />

      <label for="bottomThickness">Bottom thickness: </label>
      <input id="bottomThickness" v-model.number="bottomThickness" type="number" />
      <br />
    </fieldset>

    <fieldset>
      <legend>Support Angle Dimensions</legend>

      <label for="angleVerticalLeg">Rail vertical leg: </label>
      <input id="angleVerticalLeg" v-model.number="angleVerticalLeg" type="number" />
      <br />

      <label for="angleHorizontalLeg">Rail horizontal leg: </label>
      <input id="angleHorizontalLeg" v-model.number="angleHorizontalLeg" type="number" />
      <br />

      <label for="angleThickness">Rail thickness: </label>
      <input id="angleThickness" v-model.number="angleThickness" type="number" />
      <br />

      <label for="verticalAngleLeg">Corner bracket leg: </label>
      <input id="verticalAngleLeg" v-model.number="verticalAngleLeg" type="number" />
      <br />

      <label for="verticalAngleThickness">Corner bracket thickness: </label>
      <input id="verticalAngleThickness" v-model.number="verticalAngleThickness" type="number" />
    </fieldset>

    <fieldset>
      <legend>Hardware</legend>

      <label for="screwFreeFitDiameter">Screw free fit diameter: </label>
      <input id="screwFreeFitDiameter" v-model.number="screwFreeFitDiameter" type="number" />
      <br />

      <label for="pemDiameter">PEM nut diameter: </label>
      <input id="pemDiameter" v-model.number="pemDiameter" type="number" />
      <br />

      <label for="hasHandles">Adjust front/side holes for handles: </label>
      <input id="hasHandles" v-model="hasHandles" type="checkbox" />
      <br />

      <label for="handleHoleDiameter">Handle hole diameter: </label>
      <input id="handleHoleDiameter" v-model.number="handleHoleDiameter" type="number" :disabled="!hasHandles" />
      <br />

      <label for="handleHoleSpacing">Handle hole spacing (center-to-center): </label>
      <input id="handleHoleSpacing" v-model.number="handleHoleSpacing" type="number" :disabled="!hasHandles" />
    </fieldset>

    <button v-on:click="generateUrl()">Generate URL</button>
    <input v-model="url" type="text" readonly />
    <button v-on:click="initDefaultParams()">Reset</button>

    <button v-on:click="generateDxf()">Generate DXF</button>

    <button v-if="this.dxfString" v-on:click="downloadDxf()">Download DXF</button>

    <div ref="dxfView" class="dxf-view" />

    <div>
      <h2>Front Panel</h2>
      <p>{{ frontPanelWidth }} W x {{ frontPanelHeight }} L x {{ frontPanelThickness }} T</p>
      <p>Hole locations:</p>
      <ul>
        <li>X: {{ frontPanelEndToCornerHole }}, Y: {{ frontPanelBottomEdgeToCornerHole }}, D: {{ frontPanelCornerHoleDiameter }}</li>
        <li>X: {{ frontPanelEndToCornerHole }}, Y: {{ frontPanelHeight - frontPanelTopEdgeToCornerHole }}, D: {{ frontPanelCornerHoleDiameter }}</li>
        <li>X: {{ frontPanelWidth - frontPanelEndToCornerHole }}, Y: {{ frontPanelBottomEdgeToCornerHole }}, D: {{ frontPanelCornerHoleDiameter }}</li>
        <li>X: {{ frontPanelWidth - frontPanelEndToCornerHole }}, Y: {{ frontPanelHeight - frontPanelTopEdgeToCornerHole }}, D: {{ frontPanelCornerHoleDiameter }}</li>
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
        <li>X: {{ frontRailEndToCornerHole }}, Y: {{ frontRailEdgeToCornerHole }}, D: {{ frontRailCornerHoleDiameter }}</li>
        <li>X: {{ frontRailWidth - frontRailEndToCornerHole }}, Y: {{ frontRailEdgeToCornerHole }},  D: {{ frontRailCornerHoleDiameter }}</li>
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
        <li>X: {{ rearRailEndToCornerHole }}, Y: {{ angleVerticalLeg / 2 }}, D: {{ rearRailCornerHoleDiameter }}</li>
        <li>X: {{ rearRailWidth - rearRailEndToCornerHole }}, Y: {{ angleVerticalLeg / 2 }}, D: {{ rearRailCornerHoleDiameter }}</li>
      </ul>

      <h2>Front Corner Brackets (x2)</h2>
      <p>{{ cornerBracketHeight }} L</p>
      <p>Front leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ frontCornerBracketEndToHole }}, D: {{ frontCornerBracketFrontLegHoleDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketHeight - frontCornerBracketEndToHole }}, D: {{ frontCornerBracketFrontLegHoleDiameter }}</li>
      </ul>
      <p>Side leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketHeight - cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
      </ul>

      <h2>Rear Corner Brackets (x2)</h2>
      <p>{{ cornerBracketHeight }} L</p>
      <p>Rear leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketHeight - cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
      </ul>
      <p>Side leg hole locations:</p>
      <ul>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
        <li>X: {{ angleVerticalLeg / 2 }}, Y: {{ cornerBracketHeight - cornerBracketEndToHole }}, D: {{ pemDiameter }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DxfDocument from '../Dxf/DxfDocument';
  import DxfBlock from '../Dxf/DxfBlock';

  import DxfParser from 'dxf-parser';
  import * as ThreeDxf from 'three-dxf';

  const defaultParams = {
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
  }

  export default {
    name: 'App',
    data: function () {
      return {
        url: window.location,
        dxfString: null,
        ...defaultParams,
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
      frontPanelCornerHoleDiameter: function () {
        return this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter;
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
      frontRailCornerHoleDiameter: function () {
        return this.frontFullRails ? this.screwFreeFitDiameter : this.pemDiameter;
      },
      rearRailWidth: function () {
        return this.rearFullRails ? this.rearPanelWidth : this.rearPartialRailWidth;
      },
      rearRailCornerHoleDiameter: function () {
        return this.rearFullRails ? this.screwFreeFitDiameter : this.pemDiameter;
      },
      sideRailEndToFrontCornerHole: function () {
        return (this.verticalAngleLeg / 2) + (this.frontFullRails ? this.angleThickness : 0);
      },
      sideRailEndToRearCornerHole: function () {
        return (this.verticalAngleLeg / 2) + (this.rearFullRails ? this.angleThickness : 0);
      },
      cornerBracketHeight: function () {
        return this.height - ((2 * this.angleThickness) + this.topThickness + this.bottomThickness);
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
      frontCornerBracketFrontLegHoleDiameter: function () {
        return this.hasHandles ? this.handleHoleDiameter : this.pemDiameter;
      },
      earWidth: function () {
        return (this.frontPanelWidth - this.width) / 2;
      },
    },
    methods: {
      generateUrl: function () {
        const inputParams = Object.keys(defaultParams).reduce((obj, key) => ({ ...obj, [key]: this[key] }), {});
        const queryString = new URLSearchParams(inputParams);
        this.url = location.protocol + '//' + location.host + location.pathname + '?' + queryString;
      },
      generateDxf: function () {
        const dxfDocument = new DxfDocument('English');

        // Top
        const topBlock = new DxfBlock('top');
        topBlock.addRectangle(this.topWidth, this.topDepth);
        dxfDocument.addBlock(topBlock);
        dxfDocument.addBlockReference('top', this.sideThickness, this.angleVerticalLeg + 1 + this.frontPanelHeight + 1, 'outlines');

        // Top front rail
        const topFrontRailBlock = new DxfBlock('top_front_rail');
        topFrontRailBlock.addRectangle(this.frontRailWidth, this.angleVerticalLeg);
        dxfDocument.addBlock(topFrontRailBlock);
        dxfDocument.addBlockReference('top_front_rail', (this.width - this.frontRailWidth) / 2, this.frontPanelHeight + 1, 'outlines');

        // Front panel
        const frontPanelBlock = new DxfBlock('front_panel');
        frontPanelBlock.addRectangle(this.frontPanelWidth, this.frontPanelHeight);
        frontPanelBlock.addSimpleAlignedDimension(0, 0, 0, this.frontPanelHeight, 'left');
        frontPanelBlock.addSimpleAlignedDimension(0, this.frontPanelHeight, this.frontPanelWidth, this.frontPanelHeight, 'up');
        frontPanelBlock.addCircle(this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        frontPanelBlock.addSimpleDiameterDimension(this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.frontPanelCornerHoleDiameter, 45);
        frontPanelBlock.addCircle(this.frontPanelEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        frontPanelBlock.addCircle(this.frontPanelWidth - this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        frontPanelBlock.addCircle(this.frontPanelWidth - this.frontPanelEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        dxfDocument.addBlock(frontPanelBlock);
        dxfDocument.addBlockReference('front_panel', -this.earWidth, 0, 'outlines');

        // Bottom front rail
        const bottomFrontRailBlock = new DxfBlock('bottom_front_rail');
        bottomFrontRailBlock.addRectangle(this.frontRailWidth, this.angleHorizontalLeg);
        dxfDocument.addBlock(bottomFrontRailBlock);
        dxfDocument.addBlockReference('bottom_front_rail', (this.width - this.frontRailWidth) / 2, -(this.angleHorizontalLeg + 1), 'outlines');

        // Bottom
        const bottomBlock = new DxfBlock('bottom');
        bottomBlock.addRectangle(this.bottomWidth, this.bottomDepth);
        dxfDocument.addBlock(bottomBlock);
        dxfDocument.addBlockReference('bottom', this.sideThickness, -(this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Bottom Left Side Rail
        const bottomLeftSideRailBlock = new DxfBlock('bottom_left_side_rail');
        bottomLeftSideRailBlock.addRectangle(this.angleHorizontalLeg, this.sideRailDepth);
        dxfDocument.addBlock(bottomLeftSideRailBlock);
        dxfDocument.addBlockReference('bottom_left_side_rail', this.sideThickness + this.bottomWidth + 1, -(this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Left Side
        const leftSideBlock = new DxfBlock('left_side');
        leftSideBlock.addRectangle(this.height, this.sideDepth);
        dxfDocument.addBlock(leftSideBlock);
        dxfDocument.addBlockReference('left_side', this.sideThickness + this.bottomWidth + 1 + this.angleHorizontalLeg + 1, -(this.sideDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Front Left Corner Bracket
        const frontLeftCornerBracketBlock = new DxfBlock('front_left_corner_bracket');
        frontLeftCornerBracketBlock.addRectangle(this.cornerBracketHeight, this.verticalAngleLeg);
        dxfDocument.addBlock(frontLeftCornerBracketBlock);
        dxfDocument.addBlockReference('front_left_corner_bracket', this.sideThickness + this.bottomWidth + 1 + this.angleHorizontalLeg + 1 + this.bottomThickness + this.angleThickness, -(this.angleHorizontalLeg + 1), 'outlines');

        // Rear Left Corner Bracket
        const rearLeftCornerBracketBlock = new DxfBlock('rear_left_corner_bracket');
        rearLeftCornerBracketBlock.addRectangle(this.cornerBracketHeight, this.verticalAngleLeg);
        dxfDocument.addBlock(rearLeftCornerBracketBlock);
        dxfDocument.addBlockReference('rear_left_corner_bracket', this.sideThickness + this.bottomWidth + 1 + this.angleHorizontalLeg + 1 + this.bottomThickness + this.angleThickness, -(this.sideDepth + 1 + this.angleHorizontalLeg + 1 + this.verticalAngleLeg + 1), 'outlines');

        // Top Left Side Rail
        const topLeftSideRailBlock = new DxfBlock('top_left_side_rail');
        topLeftSideRailBlock.addRectangle(this.angleHorizontalLeg, this.sideRailDepth);
        dxfDocument.addBlock(topLeftSideRailBlock);
        dxfDocument.addBlockReference('top_left_side_rail', this.sideThickness + this.bottomWidth + 1 + this.angleHorizontalLeg + 1 + this.height + 1, -(this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Bottom rear rail
        const bottomRearRailBlock = new DxfBlock('bottom_rear_rail');
        bottomRearRailBlock.addRectangle(this.rearRailWidth, this.angleHorizontalLeg);
        dxfDocument.addBlock(bottomRearRailBlock);
        dxfDocument.addBlockReference('bottom_rear_rail', (this.width - this.rearRailWidth) / 2, -(this.angleHorizontalLeg + 1 + this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Rear panel
        const rearPanelBlock = new DxfBlock('rear_panel');
        rearPanelBlock.addRectangle(this.rearPanelWidth, this.height);
        dxfDocument.addBlock(rearPanelBlock);
        dxfDocument.addBlockReference('rear_panel', this.sideThickness, -(this.height + 1 + this.angleHorizontalLeg + 1 + this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        // Top rear rail
        const topRearRailBlock = new DxfBlock('top_rear_rail');
        topRearRailBlock.addRectangle(this.rearRailWidth, this.angleHorizontalLeg);
        dxfDocument.addBlock(topRearRailBlock);
        dxfDocument.addBlockReference('top_rear_rail', (this.width - this.rearRailWidth) / 2, -(this.angleHorizontalLeg + 1 + this.height + 1 + this.angleHorizontalLeg + 1 + this.bottomDepth + 1 + this.angleHorizontalLeg + 1), 'outlines');

        this.dxfString = dxfDocument.toString();
        console.log(this.dxfString);

        const parser = new DxfParser();
        const dxfObject = parser.parseSync(this.dxfString);
        console.log(dxfObject);
        new ThreeDxf.Viewer(dxfObject, this.$refs.dxfView, 400, 400);
      },
      downloadDxf: function () {
        this.downloadText('drawing.dxf', this.dxfString);
      },
      downloadText: function (filename, text) {
        const link = document.createElement('a');
        link.setAttribute('href', 'data:application/dxf;charset=utf-8,' + encodeURIComponent(text));
        link.setAttribute('download', filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      initDefaultParams: function () {
        Object.keys(defaultParams).forEach(key => {
          const queryValue = this.$route.query[key];
          if (queryValue) {
            const valueAsNumber = Number.parseFloat(queryValue);
            if (!Number.isNaN(valueAsNumber)) {
              this[key] = valueAsNumber;
              return;
            }
          }

          this[key] = defaultParams[key];
        });
      },
    },
    created: function () {
      this.initDefaultParams();
    },
  }
</script>

<style>
  input, fieldset {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
  fieldset, .dxf-view {
    border-width: 2px;
    border-color: darkgray;
    border-style: solid;
  }
  input, button {
    margin-right: 1em;
  }
  button, .dxf-view {
    margin-bottom: 1em;
  }
  .dxf-view {
    width: 400px;
    height: 400px;
  }
</style>
