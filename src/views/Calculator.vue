<template>
  <div id="calculator">
    <router-link to="/">Home</router-link>
    <fieldset>
      <legend>Front Panel</legend>

      <label for="frontPanelWidth">Front panel width: </label>
      <input id="frontPanelWidth" v-model.number="frontPanelWidth" type="number" />
      <br />

      <label for="frontPanelHeight">Front panel height: </label>
      <input id="frontPanelHeight" v-model.number="frontPanelHeight" type="number" />
      <br />

      <label for="frontPanelRadiusedCorners">Radius corners of front panel: </label>
      <input id="frontPanelRadiusedCorners" v-model="frontPanelRadiusedCorners" type="checkbox" />
      <br />

      <label for="frontPanelCornerRadius">Front panel corner radius: </label>
      <input id="frontPanelCornerRadius" v-model.number="frontPanelCornerRadius" type="number" :disabled="!frontPanelRadiusedCorners" />
      <br />

      <label for="rackHoles">Rack holes: </label>
      <input id="rackHoles" v-model="rackHoles" type="checkbox" />
      <br />

      <fieldset :disabled="!rackHoles">
        <legend>Rack Holes</legend>

        <label for="rackHolePreset">Preset: </label>
        <select id="rackHolePreset" @change="setRackHolePreset($event)">
          <option value="none" selected disabled hidden>&nbsp;</option>
          <option v-for="(preset, index) in rackHolePresets" :key="index" :value="index">{{preset.name}}</option>
        </select>
        <br />

        <label for="rackHoleDiameter">Rack hole diameter: </label>
        <input id="rackHoleDiameter" v-model.number="rackHoleDimensions.diameter" type="number" />
        <br />

        <label for="circularRackHoles">Rack holes are circular: </label>
        <input id="circularRackHoles" v-model="rackHoleDimensions.circular" type="checkbox" />
        <br />

        <label for="rackHoleEccentricity">Rack hole eccentricity: </label>
        <input id="rackHoleEccentricity" v-model.number="rackHoleDimensions.eccentricity" type="number" :disabled="rackHoleDimensions.circular" />
        <br />

        <label for="rackNotches" class="not-implemented">Rack holes are open notches (not implemented): </label>
        <input id="rackNotches" v-model="rackHoleDimensions.notches" type="checkbox" :disabled="true || rackHoleDimensions.circular" />
        <br />

        <label for="rackNotchRadiusCorners" class="not-implemented">Radius corners of rack notches (not implemented): </label>
        <input id="rackNotchRadiusCorners" v-model="rackHoleDimensions.notchRadiusCorners" type="checkbox" :disabled="true || !rackHoleDimensions.notches || rackHoleDimensions.circular" />
        <br />

        <label for="rackNotchCornerRadius" class="not-implemented">Rack notch corner radius (not implemented): </label>
        <input id="rackNotchCornerRadius" v-model.number="rackHoleDimensions.notchCornerRadius" type="number" :disabled="true || !rackHoleDimensions.notches || !rackHoleDimensions.notchRadiusCorners || rackHoleDimensions.circular" />
        <br />

        <label for="rackHoleHorizontalSpacing">Rack hole horizontal spacing (center-to-center): </label>
        <input id="rackHoleHorizontalSpacing" v-model.number="rackHoleDimensions.horizontalSpacing" type="number" />
        <br />

        <div v-for="(row, index) in rackHoleDimensions.data" :key="index">
          <div>&bull; Rack hole row #{{index + 1}}</div>

          <div class="space" v-if="index < rackHoleDimensions.data.length - 1">
            <div class="space-symbol">
              <div style="border-width: 2px 1px 2px 0;"></div>
              <div style="border-width: 2px 0 2px 1px;"></div>
            </div>
            <input v-if="index < rackHoleDimensions.data.length - 1" v-model.number="rackHoleDimensions.data[index].spaceBelow" type="number" />
          </div>
        </div>

        <button v-on:click="addRackHoleRow()">Add Row</button>
        <button v-on:click="removeRackHoleRow()" :disabled="rackHoleDimensions.data.length === 0">Remove Row</button>
      </fieldset>
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

      <p>Outer dimensions of the box (the front panel can extend past this).</p>

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

    <br />

    <button v-on:click="generateDrawing()">Generate Drawing</button>
    <button v-on:click="downloadDxf()" :disabled="!dxfString">Download DXF</button>
    <button v-on:click="downloadSvg()" :disabled="!svgString">Download SVG</button>

    <div v-html="svgString" class="dxf-view" ref="dxfView" />
  </div>
</template>

<script>
  import { DxfDocument, DxfBlock } from 'dxf-composer';
  import { Helper } from 'dxf';
  import panzoom from 'panzoom';

  import DxfUtils from '../DxfUtils';

  const defaultParams = {
    frontPanelWidth: 19,
    frontPanelHeight: (1 + (3 / 4)) - (1 / 32),
    frontPanelRadiusedCorners: true,
    frontPanelCornerRadius: 0.0625,
    rackHoles: true,
    frontFullRails: true,
    frontPartialRailWidth: 2,
    rearFullRails: true,
    rearPartialRailWidth: 2,
    width: 17,
    height: 1 + (1 / 2),
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
    screwFreeFitDiameter: 0.1285, // #4-40 free-fit
    pemDiameter: 0.166, // PEM CLS-440-2
    hasHandles: false,
    handleHoleDiameter: 1 / 16,
    handleHoleSpacing: 1 + (1 / 4),
  };

  const rackHoleProperties = [
    'diameter',
    'circular',
    'eccentricity',
    'notches',
    'notchRadiusCorners',
    'notchCornerRadius',
    'horizontalSpacing',
  ];

  const rackHolePresets = [
    {
      name: '19-inch, 1U',
      diameter: 0.228,
      circular: false,
      eccentricity: 0.125,
      notches: false,
      notchRadiusCorners: true,
      notchCornerRadius: 0.0625,
      horizontalSpacing: 18.312,
      data: [
        { spaceBelow: 1.25 },
        { spaceBelow: 0 },
      ],
    },
    {
      name: '19-inch, 2U',
      diameter: 0.228,
      circular: false,
      eccentricity: 0.125,
      notches: false,
      notchRadiusCorners: true,
      notchCornerRadius: 0.0625,
      horizontalSpacing: 18.312,
      data: [
        { spaceBelow: 3 },
        { spaceBelow: 0 },
      ],
    },
    {
      name: '19-inch, 2U, 8 holes',
      diameter: 0.228,
      circular: false,
      eccentricity: 0.125,
      notches: false,
      notchRadiusCorners: true,
      notchCornerRadius: 0.0625,
      horizontalSpacing: 18.312,
      data: [
        { spaceBelow: 1.25 },
        { spaceBelow: 0.5 },
        { spaceBelow: 1.25 },
        { spaceBelow: 0 },
      ],
    },
    {
      name: '500 Series, 1U',
      diameter: 0.1285,
      circular: true,
      eccentricity: 0,
      notches: false,
      notchRadiusCorners: true,
      notchCornerRadius: 0.0625,
      horizontalSpacing: 4.938,
      data: [
        { spaceBelow: 0 },
      ],
    },
  ];

  export default {
    name: 'Calculator',
    data() {
      return {
        url: window.location,
        dxfString: null,
        svgString: null,
        drawingSpacing: 1,
        rackHoleDimensions: {
          diameter: 0.228,
          circular: false,
          eccentricity: 0.125,
          notches: false,
          notchRadiusCorners: true,
          notchCornerRadius: 0.0625,
          horizontalSpacing: 18.312,
          data: [
            { spaceBelow: 1.25 },
            { spaceBelow: 0 },
          ],
        },
        ...defaultParams,
      };
    },
    computed: {
      frontPanelEdgeToBody() {
        return (this.frontPanelHeight - this.height) /2;
      },
      frontPanelEndToBodyInside() {
        return (this.frontPanelWidth - this.topWidth) / 2;
      },
      frontPanelTopEdgeToHole() {
        return this.sideTopEdgeToHole + this.frontPanelEdgeToBody;
      },
      frontPanelBottomEdgeToHole() {
        return this.sideBottomEdgeToHole + this.frontPanelEdgeToBody;
      },
      frontPanelTopEdgeToCornerHole() {
        return this.hasHandles ? (this.frontPanelHeight - this.handleHoleSpacing) / 2 : this.frontPanelTopEdgeToHole;
      },
      frontPanelBottomEdgeToCornerHole() {
        return this.hasHandles ? (this.frontPanelHeight - this.handleHoleSpacing) / 2 : this.frontPanelBottomEdgeToHole;
      },
      frontPanelCornerHoleDiameter() {
        return this.hasHandles ? this.handleHoleDiameter : this.screwFreeFitDiameter;
      },
      cornerHoleWidth() {
        return this.rearPanelWidth - (2 * (this.verticalAngleThickness + (this.verticalAngleLeg / 2)));
      },
      frontPanelEndToCornerHole() {
        return (this.frontPanelWidth - this.cornerHoleWidth) / 2;
      },
      sideDepth() {
        return this.depth - this.frontPanelThickness;
      },
      sideTopEdgeToHole() {
        return this.topThickness + (this.angleVerticalLeg / 2);
      },
      sideBottomEdgeToHole() {
        return this.bottomThickness + (this.angleVerticalLeg / 2);
      },
      sideEndToFrontCornerHole() {
        return this.sideRailEndToFrontCornerHole;
      },
      sideEndToRearCornerHole() {
        return this.sideRailEndToRearCornerHole + this.rearPanelThickness;
      },
      rearPanelWidth() {
        return this.width - (2 * this.sideThickness);
      },
      rearPanelTopEdgeToHole() {
        return this.sideTopEdgeToHole;
      },
      rearPanelBottomEdgeToHole() {
        return this.sideBottomEdgeToHole;
      },
      rearPanelEndToCornerHole() {
        return (this.rearPanelWidth - this.cornerHoleWidth) / 2;
      },
      topWidth() {
        return this.rearPanelWidth;
      },
      topDepth() {
        return this.depth - (this.frontPanelThickness + this.rearPanelThickness);
      },
      bottomWidth() {
        return this.rearPanelWidth;
      },
      bottomDepth() {
        return this.topDepth;
      },
      sideRailDepth() {
        return this.topDepth;
      },
      frontRailWidth() {
        return this.frontFullRails ? this.rearPanelWidth : this.frontPartialRailWidth;
      },
      frontRailCornerHoleDiameter() {
        return this.frontFullRails ? this.screwFreeFitDiameter : this.pemDiameter;
      },
      rearRailWidth() {
        return this.rearFullRails ? this.rearPanelWidth : this.rearPartialRailWidth;
      },
      rearRailCornerHoleDiameter() {
        return this.rearFullRails ? this.screwFreeFitDiameter : this.pemDiameter;
      },
      sideRailEndToFrontCornerHole() {
        return (this.verticalAngleLeg / 2) + (this.frontFullRails ? this.angleThickness : 0);
      },
      sideRailEndToRearCornerHole() {
        return (this.verticalAngleLeg / 2) + (this.rearFullRails ? this.angleThickness : 0);
      },
      cornerBracketHeight() {
        return this.height - ((2 * this.angleThickness) + this.topThickness + this.bottomThickness);
      },
      frontRailEndToCornerHole() {
        return (this.verticalAngleLeg / 2) + (this.frontFullRails ? this.angleThickness : 0);
      },
      rearRailEndToCornerHole() {
        return (this.verticalAngleLeg / 2) + (this.rearFullRails ? this.angleThickness : 0);
      },
      frontRailEdgeToCornerHole() {
        return this.hasHandles ? ((this.height - (this.topThickness + this.bottomThickness)) - this.handleHoleSpacing) / 2 : this.angleVerticalLeg / 2;
      },
      frontCornerBracketEndToHole() {
        return this.frontRailEdgeToCornerHole - this.angleThickness;
      },
      cornerBracketEndToHole() {
        return (this.angleVerticalLeg / 2) - this.angleThickness;
      },
      frontCornerBracketFrontLegHoleDiameter() {
        return this.hasHandles ? this.handleHoleDiameter : this.pemDiameter;
      },
      earWidth() {
        return (this.frontPanelWidth - this.width) / 2;
      },
      topFrontToOneQuarter() {
        return this.topDepth / 4;
      },
      topSideToOneQuarter() {
        return this.topWidth / 4;
      },
      topSideToFrontRailEnd() {
        return (this.topWidth - this.frontRailWidth) / 2;
      },
      topSideToRearRailEnd() {
        return (this.topWidth - this.rearRailWidth) / 2;
      },
    },
    methods: {
      setRackHolePreset(event) {
        const index = event.target.value;
        this.rackHoleDimensions = {
          ...rackHolePresets[index],
          data: [ ...rackHolePresets[index].data ],
        };
      },
      addRackHoleRow() {
        this.rackHoleDimensions.data.push({
          spaceBelow: 0,
        })
      },
      removeRackHoleRow() {
        this.rackHoleDimensions.data.pop();
      },
      generateDrawing() {
        const dxfDocument = new DxfDocument('English');

        // Top
        const topBlock = new DxfBlock('top');
        topBlock.addRectangle(this.topWidth, this.topDepth);
        topBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        topBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        topBlock.addCircle(this.topWidth - (this.angleHorizontalLeg / 2), this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        topBlock.addCircle(this.topWidth - (this.angleHorizontalLeg / 2), this.topDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        if (this.frontFullRails) {
          topBlock.addCircle(this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
          topBlock.addCircle(this.topWidth - this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
        } else {
          topBlock.addCircle(this.topSideToFrontRailEnd + this.frontRailEndToCornerHole, this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
          topBlock.addCircle(this.bottomWidth - (this.topSideToFrontRailEnd + this.frontRailEndToCornerHole), this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
        }
        if (this.rearFullRails) {
          topBlock.addCircle(this.topSideToOneQuarter, this.topDepth - (this.angleHorizontalLeg / 2), this.screwFreeFitDiameter / 2);
          topBlock.addCircle(this.topWidth - this.topSideToOneQuarter, this.topDepth - (this.angleHorizontalLeg / 2), this.screwFreeFitDiameter / 2);
        } else {
          topBlock.addCircle(this.topSideToRearRailEnd + this.rearRailEndToCornerHole, this.bottomDepth - (this.angleHorizontalLeg / 2), this.screwFreeFitDiameter / 2);
          topBlock.addCircle(this.bottomWidth - (this.topSideToRearRailEnd + this.rearRailEndToCornerHole), this.bottomDepth - (this.angleHorizontalLeg / 2), this.screwFreeFitDiameter / 2);
        }
        dxfDocument.addBlock(topBlock);
        dxfDocument.addBlockReference('top', this.sideThickness, -this.frontPanelEdgeToBody + this.angleVerticalLeg + this.frontPanelHeight + (2 * this.drawingSpacing), 'outlines');

        // Top Front Rail
        const topFrontRailBlock = new DxfBlock('top_front_rail');
        DxfUtils.addRailToDxf(topFrontRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.frontRailWidth, 'bottom', 'side', this.frontFullRails, this.frontFullRails);
        if (this.frontFullRails) {
          topFrontRailBlock.addCircle(this.frontRailEndToCornerHole, this.frontRailEdgeToCornerHole, this.frontRailCornerHoleDiameter / 2);
          topFrontRailBlock.addCircle(this.frontRailWidth - this.frontRailEndToCornerHole, this.frontRailEdgeToCornerHole,  this.frontRailCornerHoleDiameter / 2);
          topFrontRailBlock.addCircle(this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
          topFrontRailBlock.addCircle(this.topWidth - this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
        } else {
          topFrontRailBlock.addCircle(this.frontRailEndToCornerHole, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
          topFrontRailBlock.addCircle(this.frontRailWidth - this.frontRailEndToCornerHole, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
        }
        dxfDocument.addBlock(topFrontRailBlock);
        dxfDocument.addBlockReference('top_front_rail', (this.width - this.frontRailWidth) / 2, -this.frontPanelEdgeToBody + this.frontPanelHeight + this.drawingSpacing, 'outlines');

        // Front Panel
        const frontPanelBlock = new DxfBlock('front_panel');
        if (this.frontPanelRadiusedCorners) {
          frontPanelBlock.addRoundedRectangle(this.frontPanelWidth, this.frontPanelHeight, this.frontPanelCornerRadius);
        } else {
          frontPanelBlock.addRectangle(this.frontPanelWidth, this.frontPanelHeight);
        }
        this.rackHoles && DxfUtils.addRackHolesToDxf(frontPanelBlock, this.frontPanelWidth / 2, this.frontPanelHeight / 2, this.rackHoleDimensions);
        frontPanelBlock.addSimpleAlignedDimension(0, 0, 0, this.frontPanelHeight, 'left');
        frontPanelBlock.addSimpleAlignedDimension(0, this.frontPanelHeight, this.frontPanelWidth, this.frontPanelHeight, 'up');
        frontPanelBlock.addCircle(this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        frontPanelBlock.addSimpleDiameterDimension(this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.frontPanelCornerHoleDiameter, 45);
        frontPanelBlock.addCircle(this.frontPanelEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        frontPanelBlock.addCircle(this.frontPanelWidth - this.frontPanelEndToCornerHole, this.frontPanelBottomEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        frontPanelBlock.addCircle(this.frontPanelWidth - this.frontPanelEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToCornerHole, this.frontPanelCornerHoleDiameter / 2);
        if (this.frontFullRails) {
          frontPanelBlock.addCircle(this.frontPanelEndToBodyInside + this.topSideToOneQuarter, this.frontPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          frontPanelBlock.addCircle(this.frontPanelEndToBodyInside + this.topSideToOneQuarter, this.frontPanelHeight - this.frontPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
          frontPanelBlock.addCircle(this.frontPanelWidth - (this.frontPanelEndToBodyInside + this.topSideToOneQuarter), this.frontPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          frontPanelBlock.addCircle(this.frontPanelWidth - (this.frontPanelEndToBodyInside + this.topSideToOneQuarter), this.frontPanelHeight - this.frontPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
        } else {
          frontPanelBlock.addCircle(this.frontPanelEndToBodyInside + this.topSideToFrontRailEnd + this.frontRailEndToCornerHole, this.frontPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          frontPanelBlock.addCircle(this.frontPanelEndToBodyInside + this.topSideToFrontRailEnd + this.frontRailEndToCornerHole, this.frontPanelHeight - this.frontPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
          frontPanelBlock.addCircle(this.frontPanelWidth - (this.frontPanelEndToBodyInside + this.topSideToFrontRailEnd + this.frontRailEndToCornerHole), this.frontPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          frontPanelBlock.addCircle(this.frontPanelWidth - (this.frontPanelEndToBodyInside + this.topSideToFrontRailEnd + this.frontRailEndToCornerHole), this.frontPanelHeight - this.frontPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
        }
        dxfDocument.addBlock(frontPanelBlock);
        dxfDocument.addBlockReference('front_panel', -this.earWidth, -this.frontPanelEdgeToBody, 'outlines');

        // Bottom Front Rail
        const bottomFrontRailBlock = new DxfBlock('bottom_front_rail');
        DxfUtils.addRailToDxf(bottomFrontRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.frontRailWidth, 'bottom', 'top', this.frontFullRails, this.frontFullRails);
        if (this.frontFullRails) {
          bottomFrontRailBlock.addCircle(this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
          bottomFrontRailBlock.addCircle(this.topWidth - this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
        } else {
          bottomFrontRailBlock.addCircle(this.frontRailEndToCornerHole, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
          bottomFrontRailBlock.addCircle(this.frontRailWidth - this.frontRailEndToCornerHole, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
        }
        dxfDocument.addBlock(bottomFrontRailBlock);
        dxfDocument.addBlockReference('bottom_front_rail', (this.width - this.frontRailWidth) / 2, -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.drawingSpacing), 'outlines');

        // Bottom
        const bottomBlock = new DxfBlock('bottom');
        bottomBlock.addRectangle(this.bottomWidth, this.bottomDepth);
        bottomBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        bottomBlock.addCircle(this.angleHorizontalLeg / 2, this.bottomDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        bottomBlock.addCircle(this.bottomWidth - (this.angleHorizontalLeg / 2), this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        bottomBlock.addCircle(this.bottomWidth - (this.angleHorizontalLeg / 2), this.bottomDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        if (this.frontFullRails) {
          bottomBlock.addCircle(this.topSideToOneQuarter, this.bottomDepth - (this.angleHorizontalLeg / 2), this.screwFreeFitDiameter / 2);
          bottomBlock.addCircle(this.bottomWidth - this.topSideToOneQuarter, this.bottomDepth - (this.angleHorizontalLeg / 2), this.screwFreeFitDiameter / 2);
        } else {
          bottomBlock.addCircle(this.topSideToFrontRailEnd + this.frontRailEndToCornerHole, this.bottomDepth - this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
          bottomBlock.addCircle(this.bottomWidth - (this.topSideToFrontRailEnd + this.frontRailEndToCornerHole), this.bottomDepth - this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
        }
        if (this.rearFullRails) {
          bottomBlock.addCircle(this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
          bottomBlock.addCircle(this.bottomWidth - this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
        } else {
          bottomBlock.addCircle(this.topSideToRearRailEnd + this.rearRailEndToCornerHole, this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
          bottomBlock.addCircle(this.bottomWidth - (this.topSideToRearRailEnd + this.rearRailEndToCornerHole), this.angleHorizontalLeg / 2, this.screwFreeFitDiameter / 2);
        }
        dxfDocument.addBlock(bottomBlock);
        dxfDocument.addBlockReference('bottom', this.sideThickness, -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Bottom Right Side Rail
        const bottomRightSideRailBlock = new DxfBlock('bottom_right_side_rail');
        DxfUtils.addRailToDxf(bottomRightSideRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.sideRailDepth, 'left', 'top', this.frontFullRails, this.rearFullRails);
        bottomRightSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.pemDiameter / 2);
        bottomRightSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.pemDiameter / 2);
        dxfDocument.addBlock(bottomRightSideRailBlock);
        dxfDocument.addBlockReference('bottom_right_side_rail', this.sideThickness + this.bottomWidth + this.drawingSpacing, -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Right Side
        const rightSideBlock = new DxfBlock('right_side');
        rightSideBlock.addRectangle(this.height, this.sideDepth);
        rightSideBlock.addCircle(this.sideBottomEdgeToHole, this.sideDepth - this.sideEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.height - this.sideTopEdgeToHole, this.sideDepth - this.sideEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.sideBottomEdgeToHole, this.sideEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.height - this.sideTopEdgeToHole, this.sideEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.sideBottomEdgeToHole, this.sideDepth - (3 * this.topFrontToOneQuarter), this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.sideBottomEdgeToHole, this.sideDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.height - this.sideTopEdgeToHole, this.sideDepth - (3 * this.topFrontToOneQuarter), this.screwFreeFitDiameter / 2);
        rightSideBlock.addCircle(this.height - this.sideTopEdgeToHole, this.sideDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        dxfDocument.addBlock(rightSideBlock);
        dxfDocument.addBlockReference('right_side', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + (2 * this.drawingSpacing), -(this.frontPanelEdgeToBody + this.sideDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Front Right Corner Bracket
        const frontRightCornerBracketBlock = new DxfBlock('front_right_corner_bracket');
        DxfUtils.addRailToDxf(frontRightCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'top', 'side', false, false);
        frontRightCornerBracketBlock.addCircle(this.frontCornerBracketEndToHole, this.verticalAngleLeg / 2, this.frontCornerBracketFrontLegHoleDiameter / 2);
        frontRightCornerBracketBlock.addCircle(this.cornerBracketHeight - this.frontCornerBracketEndToHole, this.verticalAngleLeg / 2, this.frontCornerBracketFrontLegHoleDiameter / 2);
        dxfDocument.addBlock(frontRightCornerBracketBlock);
        dxfDocument.addBlockReference('front_right_corner_bracket', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + (2 * this.drawingSpacing) + this.bottomThickness + this.angleThickness, -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.drawingSpacing), 'outlines');

        // Rear Right Corner Bracket
        const rearRightCornerBracketBlock = new DxfBlock('rear_right_corner_bracket');
        DxfUtils.addRailToDxf(rearRightCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'top', 'side', false, false);
        rearRightCornerBracketBlock.addCircle(this.cornerBracketEndToHole, this.verticalAngleLeg / 2, this.pemDiameter / 2);
        rearRightCornerBracketBlock.addCircle(this.cornerBracketHeight - this.cornerBracketEndToHole, this.verticalAngleLeg / 2, this.pemDiameter / 2);
        dxfDocument.addBlock(rearRightCornerBracketBlock);
        dxfDocument.addBlockReference('rear_right_corner_bracket', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + (2 * this.drawingSpacing) + this.bottomThickness + this.angleThickness, -(this.frontPanelEdgeToBody + this.sideDepth + this.angleHorizontalLeg + this.verticalAngleLeg + (3 * this.drawingSpacing)), 'outlines');

        // Top Right Side Rail
        const topRightSideRailBlock = new DxfBlock('top_right_side_rail');
        DxfUtils.addRailToDxf(topRightSideRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.sideRailDepth, 'left', 'side', this.rearFullRails, this.frontFullRails);
        topRightSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        topRightSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailDepth - this.sideRailEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        topRightSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.pemDiameter / 2);
        topRightSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.pemDiameter / 2);
        dxfDocument.addBlock(topRightSideRailBlock);
        dxfDocument.addBlockReference('top_right_side_rail', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + this.height + (3 * this.drawingSpacing), -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Bottom Left Side Rail
        const bottomLeftSideRailBlock = new DxfBlock('bottom_left_side_rail');
        DxfUtils.addRailToDxf(bottomLeftSideRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.sideRailDepth, 'right', 'top', this.rearFullRails, this.frontFullRails);
        bottomLeftSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.pemDiameter / 2);
        bottomLeftSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.pemDiameter / 2);
        dxfDocument.addBlock(bottomLeftSideRailBlock);
        dxfDocument.addBlockReference('bottom_left_side_rail', this.sideThickness - (this.angleHorizontalLeg + this.drawingSpacing), -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Left Side
        const leftSideBlock = new DxfBlock('left_side');
        leftSideBlock.addRectangle(this.height, this.sideDepth);
        leftSideBlock.addCircle(this.height - this.sideBottomEdgeToHole, this.sideDepth - this.sideEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.sideTopEdgeToHole, this.sideDepth - this.sideEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.height - this.sideBottomEdgeToHole, this.sideEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.sideTopEdgeToHole, this.sideEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.sideTopEdgeToHole, this.sideDepth - (3 * this.topFrontToOneQuarter), this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.sideTopEdgeToHole, this.sideDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.height - this.sideBottomEdgeToHole, this.sideDepth - (3 * this.topFrontToOneQuarter), this.screwFreeFitDiameter / 2);
        leftSideBlock.addCircle(this.height - this.sideBottomEdgeToHole, this.sideDepth - this.topFrontToOneQuarter, this.screwFreeFitDiameter / 2);
        dxfDocument.addBlock(leftSideBlock);
        dxfDocument.addBlockReference('left_side', this.sideThickness - (this.angleHorizontalLeg + this.height + (2 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.sideDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Front Left Corner Bracket
        const frontLeftCornerBracketBlock = new DxfBlock('front_left_corner_bracket');
        DxfUtils.addRailToDxf(frontLeftCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'bottom', 'side', false, false);
        frontLeftCornerBracketBlock.addCircle(this.cornerBracketEndToHole, this.verticalAngleLeg / 2, this.pemDiameter / 2);
        frontLeftCornerBracketBlock.addCircle(this.cornerBracketHeight - this.cornerBracketEndToHole, this.verticalAngleLeg / 2, this.pemDiameter / 2);
        dxfDocument.addBlock(frontLeftCornerBracketBlock);
        dxfDocument.addBlockReference('front_left_corner_bracket', (this.sideThickness + this.topThickness + this.angleThickness) - (this.angleHorizontalLeg + this.height + (2 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.drawingSpacing), 'outlines');

        // Rear Left Corner Bracket
        const rearLeftCornerBracketBlock = new DxfBlock('rear_left_corner_bracket');
        DxfUtils.addRailToDxf(rearLeftCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'bottom', 'side', false, false);
        rearLeftCornerBracketBlock.addCircle(this.cornerBracketEndToHole, this.verticalAngleLeg / 2, this.pemDiameter / 2);
        rearLeftCornerBracketBlock.addCircle(this.cornerBracketHeight - this.cornerBracketEndToHole, this.verticalAngleLeg / 2, this.pemDiameter / 2);
        dxfDocument.addBlock(rearLeftCornerBracketBlock);
        dxfDocument.addBlockReference('rear_left_corner_bracket', (this.sideThickness + this.topThickness + this.angleThickness) - (this.angleHorizontalLeg + this.height + (2 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.sideDepth + this.angleHorizontalLeg + this.verticalAngleLeg + (3 * this.drawingSpacing)), 'outlines');

        // Top Left Side Rail
        const topLeftSideRailBlock = new DxfBlock('top_left_side_rail');
        DxfUtils.addRailToDxf(topLeftSideRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.sideRailDepth, 'right', 'side', this.frontFullRails, this.rearFullRails);
        topLeftSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        topLeftSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailDepth - this.sideRailEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        topLeftSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.pemDiameter / 2);
        topLeftSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.pemDiameter / 2);
        dxfDocument.addBlock(topLeftSideRailBlock);
        dxfDocument.addBlockReference('top_left_side_rail', this.sideThickness - (this.angleHorizontalLeg + this.height + this.angleHorizontalLeg + (3 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Bottom Rear Rail
        const bottomRearRailBlock = new DxfBlock('bottom_rear_rail', 'outlines');
        DxfUtils.addRailToDxf(bottomRearRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.rearRailWidth, 'top', 'top', this.rearFullRails, this.rearFullRails);
        if (this.rearFullRails) {
          bottomRearRailBlock.addCircle(this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
          bottomRearRailBlock.addCircle(this.topWidth - this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
        } else {
          bottomRearRailBlock.addCircle(this.rearRailEndToCornerHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
          bottomRearRailBlock.addCircle(this.rearRailWidth - this.rearRailEndToCornerHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        }
        dxfDocument.addBlock(bottomRearRailBlock);
        dxfDocument.addBlockReference('bottom_rear_rail', (this.width - this.rearRailWidth) / 2, -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.bottomDepth + this.angleHorizontalLeg + (3 * this.drawingSpacing)), 'outlines');

        // Rear Panel
        const rearPanelBlock = new DxfBlock('rear_panel');
        rearPanelBlock.addRectangle(this.rearPanelWidth, this.height);
        rearPanelBlock.addCircle(this.rearPanelEndToCornerHole, this.rearPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
        rearPanelBlock.addCircle(this.rearPanelEndToCornerHole, this.height - this.rearPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
        rearPanelBlock.addCircle(this.rearPanelWidth - this.rearPanelEndToCornerHole, this.rearPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
        rearPanelBlock.addCircle(this.rearPanelWidth - this.rearPanelEndToCornerHole, this.height - this.rearPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
        if (this.rearFullRails) {
          rearPanelBlock.addCircle(this.topSideToOneQuarter, this.rearPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
          rearPanelBlock.addCircle(this.topSideToOneQuarter, this.height - this.rearPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          rearPanelBlock.addCircle(this.rearPanelWidth - this.topSideToOneQuarter, this.rearPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
          rearPanelBlock.addCircle(this.rearPanelWidth - this.topSideToOneQuarter, this.height - this.rearPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
        } else {
          rearPanelBlock.addCircle(this.topSideToRearRailEnd + this.rearRailEndToCornerHole, this.rearPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          rearPanelBlock.addCircle(this.topSideToRearRailEnd + this.rearRailEndToCornerHole, this.height - this.rearPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
          rearPanelBlock.addCircle(this.rearPanelWidth - (this.topSideToRearRailEnd + this.rearPanelBottomEdgeToHole), this.rearPanelBottomEdgeToHole, this.screwFreeFitDiameter / 2);
          rearPanelBlock.addCircle(this.rearPanelWidth - (this.topSideToRearRailEnd + this.rearRailEndToCornerHole), this.height - this.rearPanelTopEdgeToHole, this.screwFreeFitDiameter / 2);
        }
        dxfDocument.addBlock(rearPanelBlock);
        dxfDocument.addBlockReference('rear_panel', this.sideThickness, -(this.frontPanelEdgeToBody + this.height + this.angleHorizontalLeg + this.bottomDepth + this.angleHorizontalLeg + (4 * this.drawingSpacing)), 'outlines');

        // Top Rear Rail
        const topRearRailBlock = new DxfBlock('top_rear_rail');
        DxfUtils.addRailToDxf(topRearRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.rearRailWidth, 'top', 'side', this.rearFullRails, this.rearFullRails);
        topRearRailBlock.addCircle(this.rearRailEndToCornerHole, this.angleVerticalLeg / 2, this.rearRailCornerHoleDiameter / 2);
        topRearRailBlock.addCircle(this.rearRailWidth - this.rearRailEndToCornerHole, this.angleVerticalLeg / 2, this.rearRailCornerHoleDiameter / 2);
        if (this.rearFullRails) {
          topRearRailBlock.addCircle(this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
          topRearRailBlock.addCircle(this.topWidth - this.topSideToOneQuarter, this.angleHorizontalLeg / 2, this.pemDiameter / 2);
        }
        dxfDocument.addBlock(topRearRailBlock);
        dxfDocument.addBlockReference('top_rear_rail', (this.width - this.rearRailWidth) / 2, -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.height + this.angleHorizontalLeg + this.bottomDepth + this.angleHorizontalLeg + (5 * this.drawingSpacing)), 'outlines');

        dxfDocument.firstHandle = 31;
        this.dxfString = dxfDocument.toString();

        const helper = new Helper(this.dxfString);
        this.svgString = helper.toSVG();
      },
      downloadDxf() {
        this.downloadText('drawing.dxf', this.dxfString);
      },
      downloadSvg() {
        this.downloadText('drawing.svg', this.svgString);
      },
      downloadText(filename, text) {
        const link = document.createElement('a');
        link.setAttribute('href', 'data:application/dxf;charset=utf-8,' + encodeURIComponent(text));
        link.setAttribute('download', filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      generateUrl() {
        const inputParams = Object.keys(defaultParams).reduce((obj, key) => ({ ...obj, [key]: this[key] }), {});
        const queryString = new URLSearchParams(inputParams);

        rackHoleProperties.forEach(prop => {
          const capProp = prop.charAt(0).toUpperCase() + prop.slice(1);
          queryString.append(`rackHole${capProp}`, this.rackHoleDimensions[prop]);
        });

        const rackHoleDataQueryParam = this.rackHoleDimensions.data.map(({ spaceBelow }) => spaceBelow).join(',');

        this.url = location.protocol + '//' + location.host + location.pathname + location.hash.split('?')
          + `?${queryString}`
          + ((this.rackHoleDimensions.data.length > 0) ? `&rackHoleData=${rackHoleDataQueryParam}` : '');
      },
      initDefaultParams() {
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

        rackHoleProperties.forEach(prop => {
          const capProp = prop.charAt(0).toUpperCase() + prop.slice(1);
          const queryValue = this.$route.query[`rackHole${capProp}`];
          if (queryValue) {
            const valueAsNumber = Number.parseFloat(queryValue);
            if (!Number.isNaN(valueAsNumber)) {
              this.rackHoleDimensions[prop] = queryValue;
            }
          }
        });

        const rackHoleData = this.$route.query.rackHoleData;
        if (rackHoleData) {
          const valuesAsNumbers = rackHoleData.split(',').map(spaceBelow => ({ spaceBelow: Number.parseFloat(spaceBelow) }));
          const includesNaN = valuesAsNumbers.some(value => Number.isNaN(value));
          if (!includesNaN) {
            this.rackHoleDimensions.data = valuesAsNumbers;
          }
        }
      },
    },
    created() {
      this.initDefaultParams();

      // Expose this const for use in the template
      this.rackHolePresets = rackHolePresets;
    },
    mounted() {
      this.generateDrawing();

      this.$nextTick(() => {
        const svgEl = this.$refs.dxfView.getElementsByTagName('svg')[0];
        this.panzoom = panzoom(svgEl);
      });
    },
    destroyed() {
      this.panzoom.dispose();
    }
  }
</script>

<style scoped>
  html {
    font-family: sans-serif;
  }

  input, fieldset, label, button, select {
    margin: 0.5em 0;
  }

  fieldset, .dxf-view {
    border-width: 2px;
    border-color: darkgray;
    border-style: solid;
  }

  label.not-implemented {
    color: #888;
  }

  input, button {
    margin-right: 1em;
  }

  button, .dxf-view {
    margin-bottom: 1em;
  }

  .dxf-view {
    height: 30em;
    padding: 1em;
    overflow: hidden;
  }

  .space {
    display: flex;
    flex-direction: row;
  }

  .space input {
    align-self: center;
  }

  .space-symbol {
    align-self: stretch;
    margin-right: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-collapse: collapse;
  }

  .space-symbol div {
    width: 0.2em;
    border-style: solid;
    border-color: #aaa;
  }
</style>
