<template>
    <div id="container">

        <header id="header">
            <h1>Abelian Sandpile</h1>
        </header>

        <aside id="controls">
            <div>
                <ButtonToggle 
                    activeText="Play"
                    inactiveText="Pause"
                    inactiveIcon="&#9208;"
                    activeIcon="&#9654;"
                    @toggle="doLoop = !doLoop"
                />
                <button class="btn" @click.prevent="reset">
                    <span v-html="'&#8634;'"></span> Restart
                </button>
            </div>
        
            <MenuCollapsible class="display-sm hamburger-menu">
                <ControlGroupSand @clear="clear" />
                <ControlGroupCanvas />
            </MenuCollapsible>

            <div class="display-md">
                <ControlGroupSand @clear="clear" />
                <ControlGroupHeatmap />
                <ControlGroupCanvas />
            </div>
        </aside>

        <section id="content" ref="content">
            <CanvasRoot
                :width="width"
                :height="height"
                @mousedown.left="setInteracting(10, $event)"
                @mouseup.left="interacting = false"
                @mouselave="interacting = false"
                @mousemove="updateInteracting($event)"
            >
                <CanvasGridHeatMap 
                    :grid="sand"
                    :height="height"
                    :width="width"
                    :resolution="resolution"
                    :colorStep0="color0"
                    :colorStep1="color1"
                    :colorStep2="color2"
                    :colorStep3="color3"
                />
            </CanvasRoot>
       </section>
    </div>
</template>

<script>
import ButtonToggle from "./ButtonToggle.vue";
import CanvasRoot from "./CanvasRoot.vue";
import CanvasGridHeatMap from "./CanvasGridHeatMap.vue";
import ControlGroupSand from "./ControlGroupSand.vue";
import ControlGroupHeatmap from "./ControlGroupHeatmap.vue";
import ControlGroupCanvas from "./ControlGroupCanvas.vue";
import MenuCollapsible from "./MenuCollapsible.vue";
import { pixelToCoord, coordToPixel } from "../utilities.js";
import { mapState, mapGetters, mapMutations } from "vuex";

let onResizeTimerId = undefined;

export default {
  components: {
    ButtonToggle,
    CanvasRoot,
    CanvasGridHeatMap,
    ControlGroupSand,
    ControlGroupHeatmap,
    ControlGroupCanvas,
    MenuCollapsible,
  },

  data() {
    return {
      interacting: false,
      interactingX: null,
      interactingY: null,
      interactingAmount: 10,
      doLoop: true,
      timeout: null
    };
  },

  computed: {
    ...mapState("heatmap", ["color0", "color1", "color2", "color3"]),
    ...mapState("canvas", ["width", "height", "resolution"]),
    ...mapGetters("canvas", [
        "minWidth",
        "maxWidth",
        "minHeight",
        "maxHeight",
        "minResolution",
        "maxResolution",
        "cols",
        "rows"
    ]),
    ...mapState("sand", ["baseSand", "startingSand", "sand"]),
  },
  methods: {
    ...mapMutations("canvas", ["setHeight", "setWidth", "setResolution"]),
    ...mapMutations("sand", ["setSand", "updateSand"]),
    constrainCanvas(grow) {
        const amount = grow ? this.resolution : -this.resolution;
        const width = Math.max(
            this.minWidth,
            Math.min(this.maxWidth, this.width + amount)
        );
        const height = Math.max(
            this.minHeight,
            Math.min(this.maxHeight, this.height + amount)
        );

        if (this.cols % 2 === 0 || this.width > this.maxWidth || this.width < this.minHeight) {
            this.setWidth(width);
        }

        if (this.rows % 2 === 0 || this.height > this.maxHeight || this.height < this.minHeight) {
            this.setHeight(height);
        }
    },
    setInteracting(amount, e) {
      (this.interacting = true), this.updateInteracting(e);
      this.interactingAmount = amount;
    },
    updateInteracting(e) {
      let x = e.offsetX || e.layerX;

      let y = e.offsetY || e.layerY;

      x = Math.round(x / this.resolution);

      if (x > 0 && x < this.cols) {
        this.interactingX = x;
      }

      y = Math.round(y / this.resolution);

      if (y > 0 && y < this.rows) {
        this.interactingY = y;
      }
    },
    clear() {
      const sand = new Array(this.rows * this.cols);
      sand.fill(this.baseSand);
      this.setSand(sand);
    },
    reset() {
      this.clear();
      let middle = coordToPixel(
        Math.floor(this.cols / 2),
        Math.floor(this.rows / 2),
        this.cols
      );

      this.updateSand({ idx: middle, amount: this.startingSand });
    },
    optimiseCanvas() {
        const {width, height} = this.$refs.content.getBoundingClientRect();

        const dimension = Math.floor(Math.min(width, height));

        let resolution = Math.round(0.0125 * dimension);
        resolution = Math.min(resolution, this.maxResolution);
        resolution = Math.max(resolution, this.minResolution);

        this.setWidth(dimension);
        this.setHeight(dimension);
        this.setResolution(resolution);
    },
    onResize() {
        clearTimeout(onResizeTimerId);
        onResizeTimerId = setTimeout(
            () => {
               this.optimiseCanvas()
            },
            100
        );
    },
    $_setUp() {
      window.addEventListener('resize', this.onResize);
      this.optimiseCanvas();
      this.reset();
    },
    $_update() {
      if (this.interacting) {
        const idx = coordToPixel(
          this.interactingX,
          this.interactingY,
          this.cols
        );

        this.updateSand({
          idx,
          amount: (this.sand[idx] += this.interactingAmount)
        });
      }

      this.$_topple();
    },
    $_topple() {
      let nextSand = Array.from(this.sand);

      this.sand.forEach((grains, idx) => {
        if (grains >= 4) {
          nextSand[idx] = nextSand[idx] - 4;

          let { x, y } = pixelToCoord(idx, this.cols);

          if (x > 0) {
            let siblingIdx = coordToPixel(x - 1, y, this.cols);

            nextSand[siblingIdx] = nextSand[siblingIdx] + 1;
          }

          if (x < this.cols - 1) {
            let siblingIdx = coordToPixel(x + 1, y, this.cols);

            nextSand[siblingIdx] = nextSand[siblingIdx] + 1;
          }

          if (y > 0) {
            let siblingIdx = coordToPixel(x, y - 1, this.cols);

            nextSand[siblingIdx] = nextSand[siblingIdx] + 1;
          }

          if (y < this.rows - 1) {
            let siblingIdx = coordToPixel(x, y + 1, this.cols);

            nextSand[siblingIdx] = nextSand[siblingIdx] + 1;
          }
        }
      });

      this.setSand(nextSand);
    },
    $_loop() {
      requestAnimationFrame(() => {
        this.$_update();

        if (this.doLoop) {
          this.$_loop();
        }
      });
    }
  },
  watch: {
    doLoop(value) {
      if (value) {
        this.$_loop();
      }
    },
    resolution(value, oldValue) {
      value = parseInt(value, 10);
      oldValue = parseInt(oldValue, 10);
      this.constrainCanvas(value > oldValue);
      this.reset();
    },
    width(value, oldValue) {
      value = parseInt(value, 10);
      oldValue = parseInt(oldValue, 10);
      this.constrainCanvas(value > oldValue);
      this.reset();
    },

    height(value, oldValue) {
      value = parseInt(value, 10);
      oldValue = parseInt(oldValue, 10);
      this.constrainCanvas(value > oldValue);
      this.reset();
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$_setUp();

      this.$_loop();
    });
  },
  beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style scoped>
    .hamburger-menu {
        margin: 12px auto;
    }
</style>
