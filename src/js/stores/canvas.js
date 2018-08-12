const DIMENSIONS = {
    min: 250,
    max: 800,
    default: 325,
};

const RESOLUTION = {
    min: 5,
    max: 15,
    default: 5,
}

const INITIAL_STATE = {
    width: DIMENSIONS.default,
    height: DIMENSIONS.default,
    resolution: RESOLUTION.default,
};

const state = () => ({
    ...INITIAL_STATE
});

const mutations = {
    setWidth: (state, width) => state.width = parseInt(width, 10),
    setHeight: (state, height) => state.height = parseInt(height, 10),
    setResolution: (state, resolution) => state.resolution = parseInt(resolution),
    resetDimensions: state => Object.keys(INITIAL_STATE).forEach(key => state[key] = INITIAL_STATE[key]),
};

const getters = {
    cols: state => Math.floor(state.width / state.resolution),
    rows: state => Math.floor(state.height / state.resolution),
    minWidth: (state) => {
        let minWidth = DIMENSIONS.min;
        let minCols = Math.floor(minWidth / state.resolution);
        
        if (minCols % 2 === 0) {
            minWidth += state.resolution;
        }

        return minWidth;
    },
    maxWidth: (state) => {
        let maxWidth = DIMENSIONS.max;
        let maxCols = Math.floor(maxWidth / state.resolution);
        
        if (maxCols % 2 === 0) {
            maxWidth += state.resolution;
        }

        return maxWidth;
    },
    minHeight: (state) => {
        let minHeight = DIMENSIONS.min;
        let minCols = Math.floor(minHeight / state.resolution);
        
        if (minCols % 2 === 0) {
            minHeight += state.resolution;
        }

        return minHeight;
    },
    maxHeight: (state) => {
        let maxHeight = DIMENSIONS.max;
        let maxCols = Math.floor(maxHeight / state.resolution);
        
        if (maxCols % 2 === 0) {
            maxHeight += state.resolution;
        }

        return maxHeight;
    },
    minResolution: (state) => RESOLUTION.min,
    maxResolution: (state) => RESOLUTION.max,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}
