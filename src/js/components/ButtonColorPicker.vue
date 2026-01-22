<template>
    <div class="inline-container">
        <button class="btn btn-color-picker" @click="open = true" ref="button">
            <span class="swatch" :style="{ backgroundColor: value }" />
            <span class="text">{{ value }}</span>
        </button>
        <div v-show="open" class="popup">
            <div class="popup-inner" :style="{ top: `${y}px`, left: `${x}px` }">
                <PhotoshopPicker
                    :value="color"
                    @cancel="cancel"
                    @input="color = $event"
                    @ok="choose"
                    :head="popupTitle"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { PhotoshopPicker } from "vue-color";
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
        popupTitle: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            open: false,
            color: this.value,
            x: 0,
            y: 0,
        };
    },
    components: {
        PhotoshopPicker,
    },
    methods: {
        cancel() {
            this.color = this.value;
            this.open = false;
        },
        choose() {
            this.open = false;
            this.$emit("change", this.color);
        },
    },
    watch: {
        open(value) {
            if (value) {
                this.x = this.$refs.button.getBoundingClientRect().left;
                this.y =
                    this.$refs.button.getBoundingClientRect().top -
                    this.$refs.button.clientHeight;
            }
        },
    },
};
</script>

<style scoped>
.btn-color-picker .text {
    display: inline-block;
    min-width: 60px;
}

.btn-color-picker .swatch {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 8px;
    border: 1px solid grey;
}

.popup {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}

.popup-inner {
    position: absolute;
    z-index: 100;
}
</style>
