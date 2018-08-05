<template>
    <ControlGroup legend="Heatmap" @reset="resetColors">
        <div>
            <label>0 Grains</label>
            <ButtonColorPicker 
                :key="`${color0}-color0`"
                :value="color0"
                popupTitle="Color - 0 Grains"
                @change="updateColor({step:'color0', color: $event})"
            />
        </div>
        <div>
            <label>1 Grains</label>
            <ButtonColorPicker
                :key="`${color1}-color1`"
                :value="color1"
                popupTitle="Color - 1 Grains"
                @change="updateColor({step:'color1', color: $event})"
            />
        </div>
        <div>
            <label>2 Grains</label>
            <ButtonColorPicker
                :key="`${color2}-color2`"
                :value="color2"
                popupTitle="Color - 2 Grains"
                @change="updateColor({step:'color2', color: $event})"
            />
        </div>
        <div>
            <label>3 Grains</label>
            <ButtonColorPicker
                :key="`${color3}-color3`"
                :value="color3"
                popupTitle="Color - 3 Grains"
                @change="updateColor({step:'color3', color: $event})"
            />
        </div>
    </ControlGroup>
</template>

<script>
import ButtonColorPicker from "./ButtonColorPicker.vue";
import ControlGroup from "./ControlGroup.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    ButtonColorPicker,
    ControlGroup
  },
  computed: mapState("heatmap", [
      "color0",
      "color1",
      "color2",
      "color3"
    ]),
    methods: mapMutations("heatmap", ["updateColor", "resetColors"]),
};
</script>
