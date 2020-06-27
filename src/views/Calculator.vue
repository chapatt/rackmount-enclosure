<template>
  <div id="calculator">
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

        <label for="rackHoleDiameter">Rack hole diameter: </label>
        <input id="rackHoleDiameter" v-model.number="rackHoleDiameter" type="number" />
        <br />

        <label for="circularRackHoles">Rack holes are circular: </label>
        <input id="circularRackHoles" v-model="circularRackHoles" type="checkbox" />
        <br />

        <label for="rackHoleEccentricity">Rack hole eccentricity: </label>
        <input id="rackHoleEccentricity" v-model.number="rackHoleEccentricity" type="number" :disabled="circularRackHoles" />
        <br />

        <label for="rackNotches" class="not-implemented">Rack holes are open notches (not implemented): </label>
        <input id="rackNotches" v-model="rackNotches" type="checkbox" :disabled="true || circularRackHoles" />
        <br />

        <label for="rackNotchRadiusCorners" class="not-implemented">Radius corners of rack notches (not implemented): </label>
        <input id="rackNotchRadiusCorners" v-model="rackNotchRadiusCorners" type="checkbox" :disabled="true || !rackNotches || circularRackHoles" />
        <br />

        <label for="rackNotchCornerRadius" class="not-implemented">Rack notch corner radius (not implemented): </label>
        <input id="rackNotchCornerRadius" v-model.number="rackNotchCornerRadius" type="number" :disabled="true || !rackNotches || !rackNotchRadiusCorners || circularRackHoles" />
        <br />

        <hr />

        <label for="rackHolePreset">Preset: </label>
        <select id="rackHolePreset" @change="setRackHolePreset($event)">
          <option value="none" selected disabled hidden>&nbsp;</option>
          <option v-for="(preset, index) in rackHolePresets" :key="index" :value="index">{{preset.name}}</option>
        </select>
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

    <button v-on:click="generateDrawing()">Generate Drawing</button>

    <button v-on:click="downloadDxf()" :disabled="!dxfString">Download DXF</button>

    <button v-on:click="downloadSvg()" :disabled="!svgString">Download SVG</button>

    <div v-html="svgString" class="dxf-view" />
  </div>
</template>

<script>
  import DxfDocument from '../Dxf/DxfDocument';
  import DxfBlock from '../Dxf/DxfBlock';

  import { Helper } from 'dxf';

  const defaultParams = {
    frontPanelWidth: 19,
    frontPanelHeight: (1 + (3 / 4)) - (1 / 32),
    frontPanelRadiusedCorners: true,
    frontPanelCornerRadius: 0.0625,
    rackHoles: true,
    rackHoleDiameter: 0.25,
    circularRackHoles: false,
    rackHoleEccentricity: 0.125,
    rackNotches: false,
    rackNotchRadiusCorners: true,
    rackNotchCornerRadius: 0.0625,
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
    screwFreeFitDiameter: 1 / 8,
    pemDiameter: 1 / 4,
    hasHandles: false,
    handleHoleDiameter: 1 / 16,
    handleHoleSpacing: 1 + (1 / 4),
  };

  const rackHolePresets = [
    {
      name: '19-inch, 1U',
      horizontalSpacing: 18.312,
      data: [
        { spaceBelow: 1.25 },
        { spaceBelow: 0 },
      ],
    },
    {
      name: '19-inch, 2U',
      horizontalSpacing: 18.312,
      data: [
        { spaceBelow: 3 },
        { spaceBelow: 0 },
      ],
    },
    {
      name: '19-inch, 2U, 8 holes',
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
      horizontalSpacing: 4.938,
      data: [
        { spaceBelow: 0 },
      ],
    },
  ];

  export default {
    name: 'App',
    data: function () {
      return {
        url: window.location,
        dxfString: null,
        svgString: null,
        drawingSpacing: 1,
        rackHoleDimensions: {
          horizontalSpacing: 18.312,
          data: [],
        },
        ...defaultParams,
      };
    },
    computed: {
      frontPanelEdgeToBody: function () {
        return (this.frontPanelHeight - this.height) /2;
      },
      frontPanelEndToBodyInside: function () {
        return (this.frontPanelWidth - this.topWidth) / 2;
      },
      frontPanelTopEdgeToHole: function () {
        return this.sideTopEdgeToHole + this.frontPanelEdgeToBody;
      },
      frontPanelBottomEdgeToHole: function () {
        return this.sideBottomEdgeToHole + this.frontPanelEdgeToBody;
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
      topFrontToOneQuarter: function () {
        return this.topDepth / 4;
      },
      topSideToOneQuarter: function () {
        return this.topWidth / 4;
      },
      topSideToFrontRailEnd: function () {
        return (this.topWidth - this.frontRailWidth) / 2;
      },
      topSideToRearRailEnd: function () {
        return (this.topWidth - this.rearRailWidth) / 2;
      },
    },
    methods: {
      setRackHolePreset: function (event) {
        const index = event.target.value;
        this.rackHoleDimensions = {
          ...rackHolePresets[index],
          data: [ ...rackHolePresets[index].data ],
        };
      },
      addRackHoleRow: function () {
        this.rackHoleDimensions.data.push({
          spaceBelow: 0,
        })
      },
      removeRackHoleRow: function () {
        this.rackHoleDimensions.data.pop();
      },
      // dxf should implement DxfEntitiesMixin
      addHorizontalOvalToDxf(dxf, x, y, radius, eccentricity) {
        const leftCenter = x - (eccentricity / 2);
        const rightCenter = x + (eccentricity / 2);
        dxf.addArc(leftCenter, y, radius, 90, 270);
        dxf.addArc(rightCenter, y, radius, 270, 90);
        dxf.addLine(leftCenter, y + radius, rightCenter, y + radius)
        dxf.addLine(leftCenter, y - radius, rightCenter, y - radius)
      },
      // dxf should implement DxfEntitiesMixin
      addRackHolesToDxf(dxf, centerX, centerY) {
        if (this.rackHoleDimensions.data.length === 0) {
          return;
        }

        const spaceSum = this.rackHoleDimensions.data.reduce((spaceSum, { spaceBelow }) => {
          return spaceSum + (spaceBelow ? spaceBelow : 0);
        }, 0);
        let y = centerY - (spaceSum / 2);
        this.rackHoleDimensions.data.reduceRight((_, { spaceBelow }) => {
          y += spaceBelow ? spaceBelow : 0;
          if (this.circularRackHoles) {
            dxf.addCircle(centerX - (this.rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2);
            dxf.addCircle(centerX + (this.rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2);
          } else {
            this.addHorizontalOvalToDxf(dxf, centerX - (this.rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2, this.rackHoleEccentricity);
            this.addHorizontalOvalToDxf(dxf, centerX + (this.rackHoleDimensions.horizontalSpacing / 2), y, this.rackHoleDiameter / 2, this.rackHoleEccentricity);
          }
        }, null);
      },
      // dxf should implement DxfEntitiesMixin
      // perspective should be 'top' or 'side'
      // uprightDirection should be 'top', 'right', 'bottom', or 'left'
      // The start (in startMitered) is on the left when looking at the side view with the upright leg on top
      addRailToDxf(dxf, flatLeg, uprightLeg, thickness, length, uprightDirection, perspective, startMitered, endMitered) {
        if (perspective === 'side') {
          const isHorizontal = uprightDirection === 'top' || uprightDirection === 'bottom';
          dxf.addRectangle(isHorizontal ? length : flatLeg, isHorizontal ? flatLeg : length);

          let x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6;
          switch (uprightDirection) {
            case 'top':
              x1 = thickness;
              x2 = length - thickness;
              x3 = uprightLeg;
              x4 = length - uprightLeg;
              x5 = 0;
              x6 = length;
              y1 = 0;
              y2 = flatLeg - thickness;
              y3 = flatLeg;
              break;
            case 'right':
              x1 = 0;
              x2 = flatLeg - thickness;
              x3 = flatLeg;
              y1 = length - thickness;
              y2 = thickness;
              y3 = length - flatLeg;
              y4 = flatLeg;
              y5 = length;
              y6 = 0;
              break;
            case 'bottom':
              x1 = length - thickness;
              x2 = thickness;
              x3 = uprightLeg;
              x4 = length - uprightLeg;
              x5 = length;
              x6 = 0;
              y1 = flatLeg;
              y2 = thickness;
              y3 = 0;
              break;
            case 'left':
              x1 = flatLeg;
              x2 = thickness;
              x3 = 0;
              y1 = thickness;
              y2 = length - thickness;
              y3 = flatLeg;
              y4 = length - flatLeg;
              y5 = 0;
              y6 = length;
              break;
          }
          let startX, endX;
          let startY, endY;
          switch (uprightDirection) {
            case 'top':
            case 'bottom':
              if (startMitered) {
                dxf.addLine(x1, y1, x1, y2);
                dxf.addLine(x3, y2, x3, y3);
                startX = x1
              } else {
                startX = x5;
              }
              if (endMitered) {
                dxf.addLine(x2, y2, x2, y1);
                dxf.addLine(x4, y2, x4, y3);
                endX = x2;
              } else {
                endX = x6;
              }
              dxf.addLine(startX, y2, endX, y2);
              break;
            case 'left':
            case 'right':
              if (startMitered) {
                dxf.addLine(x1, y1, x2, y1);
                dxf.addLine(x2, y3, x3, y3);
                startY = y1;
              } else {
                startY = y5;
              }
              if (endMitered) {
                dxf.addLine(x2, y2, x1, y2);
                dxf.addLine(x2, y4, x3, y4);
                endY = y2;
              } else {
                endY = y6;
              }

              dxf.addLine(x2, startY, x2, endY);
              break;
          }
        } else if (perspective === 'top') {
          let x1, x2, x3, x4, x5, x6, startX1, endX1, startX2, endX2;
          let y1, y2, y3, y4, y5, y6, startY1, endY1, startY2, endY2;
          switch (uprightDirection) {
            case 'top':
              x1 = length;
              x2 = 0;
              x3 = length - flatLeg;
              x4 = flatLeg;
              x5 = length - thickness;
              x6 = thickness;
              y1 = flatLeg;
              y2 = 0;
              y3 = flatLeg - thickness;
              break;
            case 'right':
              x1 = flatLeg;
              y1 = 0;
              x2 = 0;
              y2 = length;
              y3 = flatLeg;
              y4 = length - flatLeg;
              x3 = flatLeg - thickness;
              y5 = thickness;
              y6 = length - thickness;
              break;
            case 'bottom':
              x1 = 0;
              x2 = length
              x3 = flatLeg;
              x4 = length - flatLeg;
              x5 = thickness;
              x6 = length - thickness;
              y1 = 0;
              y2 = flatLeg;
              y3 = thickness;
              break;
            case 'left':
              x1 = 0;
              y1 = length;
              x2 = flatLeg;
              y2 = 0;
              y3 = length - flatLeg;
              y4 = flatLeg;
              x3 = thickness;
              y5 = length - thickness;
              y6 = thickness;
              break;
          }
          switch (uprightDirection) {
            case 'top':
            case 'bottom':
              if (startMitered) {
                startX1 = x3;
                startX2 = x5;
              } else {
                startX1 = x1;
                startX2 = x1;
              }
              if (endMitered) {
                endX1 = x4;
                endX2 = x6;
              } else {
                endX1 = x2;
                endX2 = x2;
              }
              dxf.addLine(x1, y1, startX1, y2); // start end
              dxf.addLine(startX1, y2, endX1, y2); // minor length
              dxf.addLine(endX1, y2, x2, y1); // end end
              dxf.addLine(x2, y1, x1, y1); // major length
              dxf.addLine(startX2, y3, endX2, y3); // upright leg indication
              break;
            case 'right':
            case 'left':
              if (startMitered) {
                startY1 = y3;
                startY2 = y5;
              } else {
                startY1 = y1;
                startY2 = y1;
              }
              if (endMitered) {
                endY1 = y4;
                endY2 = y6;
              } else {
                endY1 = y2;
                endY2 = y2;
              }
              dxf.addLine(x1, y1, x2, startY1); // start end
              dxf.addLine(x2, startY1, x2, endY1); // minor length
              dxf.addLine(x2, endY1, x1, y2); // end end
              dxf.addLine(x1, y2, x1, y1); // major length
              dxf.addLine(x3, startY2, x3, endY2); // upright leg indication
              break;
          }
        }
      },
      generateDrawing: function () {
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
        this.addRailToDxf(topFrontRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.frontRailWidth, 'bottom', 'side', this.frontFullRails, this.frontFullRails);
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
        this.rackHoles && this.addRackHolesToDxf(frontPanelBlock, this.frontPanelWidth / 2, this.frontPanelHeight / 2);
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
        this.addRailToDxf(bottomFrontRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.frontRailWidth, 'bottom', 'top', this.frontFullRails, this.frontFullRails);
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
        this.addRailToDxf(bottomRightSideRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.sideRailDepth, 'left', 'top', this.frontFullRails, this.rearFullRails);
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
        this.addRailToDxf(frontRightCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'top', 'side', false, false);
        frontRightCornerBracketBlock.addCircle(this.frontCornerBracketEndToHole, this.angleVerticalLeg / 2, this.frontCornerBracketFrontLegHoleDiameter / 2);
        frontRightCornerBracketBlock.addCircle(this.cornerBracketHeight - this.frontCornerBracketEndToHole, this.angleVerticalLeg / 2, this.frontCornerBracketFrontLegHoleDiameter / 2);
        dxfDocument.addBlock(frontRightCornerBracketBlock);
        dxfDocument.addBlockReference('front_right_corner_bracket', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + (2 * this.drawingSpacing) + this.bottomThickness + this.angleThickness, -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.drawingSpacing), 'outlines');

        // Rear Right Corner Bracket
        const rearRightCornerBracketBlock = new DxfBlock('rear_right_corner_bracket');
        this.addRailToDxf(rearRightCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'top', 'side', false, false);
        rearRightCornerBracketBlock.addCircle(this.cornerBracketEndToHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        rearRightCornerBracketBlock.addCircle(this.cornerBracketHeight - this.cornerBracketEndToHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        dxfDocument.addBlock(rearRightCornerBracketBlock);
        dxfDocument.addBlockReference('rear_right_corner_bracket', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + (2 * this.drawingSpacing) + this.bottomThickness + this.angleThickness, -(this.frontPanelEdgeToBody + this.sideDepth + this.angleHorizontalLeg + this.verticalAngleLeg + (3 * this.drawingSpacing)), 'outlines');

        // Top Right Side Rail
        const topRightSideRailBlock = new DxfBlock('top_right_side_rail');
        this.addRailToDxf(topRightSideRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.sideRailDepth, 'left', 'side', this.rearFullRails, this.frontFullRails);
        topRightSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        topRightSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailDepth - this.sideRailEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        topRightSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.pemDiameter / 2);
        topRightSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.pemDiameter / 2);
        dxfDocument.addBlock(topRightSideRailBlock);
        dxfDocument.addBlockReference('top_right_side_rail', this.sideThickness + this.bottomWidth + this.angleHorizontalLeg + this.height + (3 * this.drawingSpacing), -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Bottom Left Side Rail
        const bottomLeftSideRailBlock = new DxfBlock('bottom_left_side_rail');
        this.addRailToDxf(bottomLeftSideRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.sideRailDepth, 'right', 'top', this.rearFullRails, this.frontFullRails);
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
        this.addRailToDxf(frontLeftCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'bottom', 'side', false, false);
        frontLeftCornerBracketBlock.addCircle(this.cornerBracketEndToHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        frontLeftCornerBracketBlock.addCircle(this.cornerBracketHeight - this.cornerBracketEndToHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        dxfDocument.addBlock(frontLeftCornerBracketBlock);
        dxfDocument.addBlockReference('front_left_corner_bracket', (this.sideThickness + this.topThickness + this.angleThickness) - (this.angleHorizontalLeg + this.height + (2 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.angleHorizontalLeg + this.drawingSpacing), 'outlines');

        // Rear Left Corner Bracket
        const rearLeftCornerBracketBlock = new DxfBlock('rear_left_corner_bracket');
        this.addRailToDxf(rearLeftCornerBracketBlock, this.verticalAngleLeg, this.verticalAngleLeg, this.verticalAngleThickness, this.cornerBracketHeight, 'bottom', 'side', false, false);
        rearLeftCornerBracketBlock.addCircle(this.cornerBracketEndToHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        rearLeftCornerBracketBlock.addCircle(this.cornerBracketHeight - this.cornerBracketEndToHole, this.angleVerticalLeg / 2, this.pemDiameter / 2);
        dxfDocument.addBlock(rearLeftCornerBracketBlock);
        dxfDocument.addBlockReference('rear_left_corner_bracket', (this.sideThickness + this.topThickness + this.angleThickness) - (this.angleHorizontalLeg + this.height + (2 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.sideDepth + this.angleHorizontalLeg + this.verticalAngleLeg + (3 * this.drawingSpacing)), 'outlines');

        // Top Left Side Rail
        const topLeftSideRailBlock = new DxfBlock('top_left_side_rail');
        this.addRailToDxf(topLeftSideRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.sideRailDepth, 'right', 'side', this.frontFullRails, this.rearFullRails);
        topLeftSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailEndToFrontCornerHole, this.screwFreeFitDiameter / 2);
        topLeftSideRailBlock.addCircle(this.angleVerticalLeg / 2, this.sideRailDepth - this.sideRailEndToRearCornerHole, this.screwFreeFitDiameter / 2);
        topLeftSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topFrontToOneQuarter, this.pemDiameter / 2);
        topLeftSideRailBlock.addCircle(this.angleHorizontalLeg / 2, this.topDepth - this.topFrontToOneQuarter, this.pemDiameter / 2);
        dxfDocument.addBlock(topLeftSideRailBlock);
        dxfDocument.addBlockReference('top_left_side_rail', this.sideThickness - (this.angleHorizontalLeg + this.height + this.angleHorizontalLeg + (3 * this.drawingSpacing)), -(this.frontPanelEdgeToBody + this.bottomDepth + this.angleHorizontalLeg + (2 * this.drawingSpacing)), 'outlines');

        // Bottom Rear Rail
        const bottomRearRailBlock = new DxfBlock('bottom_rear_rail', 'outlines');
        this.addRailToDxf(bottomRearRailBlock, this.angleHorizontalLeg, this.angleVerticalLeg, this.angleThickness, this.rearRailWidth, 'top', 'top', this.rearFullRails, this.rearFullRails);
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
        this.addRailToDxf(topRearRailBlock, this.angleVerticalLeg, this.angleHorizontalLeg, this.angleThickness, this.rearRailWidth, 'top', 'side', this.rearFullRails, this.rearFullRails);
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
      downloadDxf: function () {
        this.downloadText('drawing.dxf', this.dxfString);
      },
      downloadSvg: function () {
        this.downloadText('drawing.svg', this.svgString);
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
      generateUrl: function () {
        const inputParams = Object.keys(defaultParams).reduce((obj, key) => ({ ...obj, [key]: this[key] }), {});
        const queryString = new URLSearchParams(inputParams);
        queryString.append('rackHoleHorizontalSpacing', this.rackHoleDimensions.horizontalSpacing);
        const rackHoleDataQueryParam = this.rackHoleDimensions.data.map(({ spaceBelow }) => spaceBelow).join(',');
        this.url = location.protocol + '//' + location.host + location.pathname
          + `?${queryString}`
          + ((this.rackHoleDimensions.data.length > 0) ? `&rackHoleData=${rackHoleDataQueryParam}` : '');
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

        const rackHoleHorizontalSpacing = this.$route.query.rackHoleHorizontalSpacing;
        if (rackHoleHorizontalSpacing) {
          this.rackHoleDimensions.horizontalSpacing = rackHoleHorizontalSpacing;
        }

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
    created: function () {
      this.initDefaultParams();

      // Expose this const for use in the template
      this.rackHolePresets = rackHolePresets;
    },
  }
</script>

<style>
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
