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
                <input type="range" :value="baseSand" @input="setBaseSand($event.target.value)" min="0" max="4" step="1" />
            </div>
        </div>

        <div>
            <div>
                <label>Starting Sand ({{ startingSand }})</label>
            </div>
            <div>
                <input type="range" :value="startingSand" @input="setStartingSand($event.target.value)" min="100" max="100000" step="100" />
            </div>
        </div>
    </ControlGroup>
</template>

<script>
import ControlGroup from './ControlGroup.vue';
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
    components: {
        ControlGroup,
    },
    computed: {
        ...mapState("sand", ["baseSand", "startingSand", "sand"]),
        ...mapGetters("sand", ["sandTotal"]),
    },
    methods: mapMutations("sand", [
      "setBaseSand",
      "setStartingSand",
      "resetSand",
      "setSand",
      "updateSand"
    ]),
}
</script>
