const INITIAL_STATE = {
    color0: '#3288bd',
    color1: '#99d594',
    color2: '#fee08b',
    color3: '#d53e4f',
};

const state = () => ({
    ...INITIAL_STATE,
});

const mutations = {
    updateColor: (state, {step, color}) => state[step] = color,
    resetColors: state => Object.keys(INITIAL_STATE).forEach(key => state[key] = INITIAL_STATE[key]),
};

export default {
    namespaced: true,
    state,
    mutations,
}
