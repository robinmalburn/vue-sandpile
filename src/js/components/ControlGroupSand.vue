<template>
    <ControlGroup legend="Sand" @reset="resetSand">
        <div>
            <div>Total Sand: {{ sandTotal }}</div>
            <div>
                <button class="btn" @click.prevent="$emit('clear', $event)">
                    Clear
                </button>
            </div>
        </div>

        <div>
            <div>
                <label>Base Sand ({{ baseSand }})</label>
            </div>
            <div>
                <input
                    type="range"
                    :value="baseSand"
                    @input="setBaseSand($event.target.value)"
                    min="0"
                    max="4"
                    step="1"
                />
            </div>
        </div>

        <div>
            <div>
                <label>Starting Sand ({{ startingSand }})</label>
            </div>
            <div>
                <input
                    type="range"
                    :value="startingSand"
                    @input="setStartingSand($event.target.value)"
                    min="100"
                    max="100000"
                    step="100"
                />
            </div>
        </div>
    </ControlGroup>
</template>

<script>
import ControlGroup from "./ControlGroup.vue";
import { mapState, mapActions } from "pinia";
import { useSandStore } from "../stores/sand";

export default {
    components: {
        ControlGroup,
    },
    computed: {
        ...mapState(useSandStore, [
            "baseSand",
            "startingSand",
            "sand",
            "sandTotal",
        ]),
    },
    methods: mapActions(useSandStore, [
        "setBaseSand",
        "setStartingSand",
        "resetSand",
        "setSand",
        "updateSand",
    ]),
};
</script>
