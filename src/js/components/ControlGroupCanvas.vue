<template>
    <ControlGroup legend="Canvas" @reset="resetDimensions">
        <div>
            <div>
                <label>Resolution ({{resolution}}px <span v-html="'&#215;'"></span> {{resolution}}px)</label>
            </div>
            <div>
                <input type="range" :value="resolution" @input="setResolution($event.target.value)" :min="minResolution" :max="maxResolution" step="1"/>
            </div>
        </div>
        <div>
            <div>
                <label>Width ({{cols }} Cols)</label>
            </div>
            <div>
                <input type="range" :value="width" @input="setWidth($event.target.value)" :min="minWidth" :max="maxWidth" :step="resolution" />
            </div>
        </div>
        <div>
            <div>
                <label>Height ({{ rows }} Rows)</label>
            </div>
            <div>
                <input type="range"  :value="height" @input="setHeight($event.target.value)" :min="minHeight" :max="maxHeight" :step="resolution" />
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
    },
    methods: mapMutations("canvas", [
        "setHeight",
        "setWidth",
        "setResolution",
        "resetDimensions"
    ]),
}
</script>
