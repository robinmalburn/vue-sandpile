import { defineStore } from "pinia";

const INITIAL_STATE = {
    baseSand: 0,
    startingSand: 1000,
};

export const useSandStore = defineStore("sand", {
    state: () => ({
        ...INITIAL_STATE,
        sand: [],
    }),

    getters: {
        sandTotal: (state) => state.sand.reduce((acc, val) => acc + val, 0),
    },

    actions: {
        setBaseSand(amount) {
            this.baseSand = parseInt(amount, 10);
        },
        setStartingSand(amount) {
            this.startingSand = parseInt(amount, 10);
        },
        resetSand() {
            Object.keys(INITIAL_STATE).forEach((key) => {
                this[key] = INITIAL_STATE[key];
            });
        },
        setSand(sand) {
            this.sand = sand;
        },
        updateSand({ idx, amount }) {
            this.sand.splice(idx, 1, amount);
        },
    },
});
