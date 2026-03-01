<template>
    <div class="inline-container">
        <button class="btn btn-color-picker" @click="openPicker" ref="button">
            <span class="swatch" :style="{ backgroundColor: value }" />
            <span class="text">{{ value }}</span>
        </button>
        <div v-show="open" class="popup" @click.self="cancel">
            <div class="popup-inner" :style="{ top: `${y}px`, left: `${x}px` }">
                <PhotoshopPicker
                    v-model="color"
                    :currentColor="value"
                    :title="popupTitle"
                    @ok="choose"
                    @cancel="cancel"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { PhotoshopPicker } from "vue-color";
export default {
    components: {
        PhotoshopPicker,
    },
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
    methods: {
        openPicker() {
            this.color = this.value;
            this.x = this.$refs.button.getBoundingClientRect().left;
            this.y =
                this.$refs.button.getBoundingClientRect().top -
                this.$refs.button.clientHeight;
            this.open = true;
        },
        cancel() {
            this.color = this.value;
            this.open = false;
        },
        choose() {
            this.open = false;
            this.$emit("change", this.color);
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
