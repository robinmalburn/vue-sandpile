<template>
    <div class="inline-container">
        <button class="btn" @click.prevent="toggle">
            <span
                class="icon"
                v-if="icon"
                v-html="icon"
            ></span>
            <span class="text">
                {{text}}
            </span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        startActive: {
            type: Boolean,
            default: false,
        },
        activeIcon: {
            type: String,
            default: ''
        },
        inactiveIcon: {
            type: String,
            default: ''
        },
        activeText: {
            type: String,
            default: ''
        },
        inactiveText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: this.startActive,
        };
    },
    computed: {
        icon(){ 
            return this.active ? this.activeIcon : this.inactiveIcon;
        },
        text(){
            return this.active ? this.activeText : this.inactiveText;
        }
    },
    methods: {
        toggle() {
            this.active = !this.active;

            this.$emit('toggle', this.active);
        }
    }
}
</script>
