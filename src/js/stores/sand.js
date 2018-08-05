const INITIAL_STATE = {
    baseSand: 0,
    startingSand: 1000,
};

const state = () => ({
    ...INITIAL_STATE,
    sand: [],
});

const mutations = {
    setBaseSand: (state, amount) => state.baseSand = parseInt(amount, 10),
    setStartingSand: (state, amount) => state.startingSand = parseInt(amount, 10),
    resetSand: state => Object.keys(INITIAL_STATE).forEach(key => {
        state[key] = INITIAL_STATE[key];
    }),
    setSand: (state, sand) => state.sand = sand,
    updateSand: (state, {idx, amount}) => state.sand.splice(idx, 1, amount),
};

const getters = {
    sandTotal: state => state.sand.reduce((acc, val) => acc + val, 0),
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}
