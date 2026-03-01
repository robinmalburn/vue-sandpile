import { defineStore } from "pinia";

const DIMENSIONS = {
    min: 250,
    max: 800,
    default: 325,
};

const RESOLUTION = {
    min: 5,
    max: 15,
    default: 5,
};

const INITIAL_STATE = {
    width: DIMENSIONS.default,
    height: DIMENSIONS.default,
    resolution: RESOLUTION.default,
};

export const useCanvasStore = defineStore("canvas", {
    state: () => ({ ...INITIAL_STATE }),

    getters: {
        cols: (state) => Math.floor(state.width / state.resolution),
        rows: (state) => Math.floor(state.height / state.resolution),
        minWidth: (state) => {
            let minWidth = DIMENSIONS.min;
            if (Math.floor(minWidth / state.resolution) % 2 === 0) {
                minWidth += state.resolution;
            }
            return minWidth;
        },
        maxWidth: (state) => {
            let maxWidth = DIMENSIONS.max;
            if (Math.floor(maxWidth / state.resolution) % 2 === 0) {
                maxWidth += state.resolution;
            }
            return maxWidth;
        },
        minHeight: (state) => {
            let minHeight = DIMENSIONS.min;
            if (Math.floor(minHeight / state.resolution) % 2 === 0) {
                minHeight += state.resolution;
            }
            return minHeight;
        },
        maxHeight: (state) => {
            let maxHeight = DIMENSIONS.max;
            if (Math.floor(maxHeight / state.resolution) % 2 === 0) {
                maxHeight += state.resolution;
            }
            return maxHeight;
        },
        minResolution: () => RESOLUTION.min,
        maxResolution: () => RESOLUTION.max,
    },

    actions: {
        setWidth(width) {
            this.width = parseInt(width, 10);
        },
        setHeight(height) {
            this.height = parseInt(height, 10);
        },
        setResolution(resolution) {
            this.resolution = parseInt(resolution, 10);
        },
        resetDimensions() {
            Object.keys(INITIAL_STATE).forEach((key) => {
                this[key] = INITIAL_STATE[key];
            });
        },
    },
});
