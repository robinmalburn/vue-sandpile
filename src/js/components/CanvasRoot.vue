<template>
    <div>
        <canvas
            class="vue-canvas"
            ref="vue-canvas"
            :width="width"
            :height="height"
            @mousedown="$emit('mousedown', $event)"
            @mouseup="$emit('mouseup', $event)"
            @mouseleave="$emit('mouseleave', $event)"
            @mousemove="$emit('mousemove', $event)"
            />
        <slot />
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                provider: {
                    context: null,
                    width: this.width,
                    height: this.height
                }
            }
        },
        provide() {
            return {
                provider: this.provider
            }
        },
        watch:{
            width(value){
                this.provider.width = value;
            },
            height(value){
                this.provider.height = value;
            }
        },
        mounted() {
            this.provider.context = this.$refs['vue-canvas'].getContext('2d');
        }
    }
</script>
