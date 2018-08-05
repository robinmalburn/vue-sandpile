<template>
    <div>
        <button class="btn" @click.prevent="active = !active">
            <div class="hamburger" :class="{active}">
                <div class="horizontal-bar"></div>
                <div class="horizontal-bar"></div>
                <div class="horizontal-bar"></div>
            </div>
        </button>
        <div v-show="active">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: false,
        };
    }
}
</script>

<style scoped>
    .hamburger {
        width: 28px;
        height: 18px;
    }

    .hamburger .horizontal-bar{
        width: 75%;
        height: 2px;
        background-color: #222;
        margin: 4px auto;
        transition: opacity 0.1s, transform 0.25s;
    }

    .hamburger.active .horizontal-bar:first-child {
        transform: rotate(-45deg) translate(-4px, 4px);
    }

    .hamburger.active .horizontal-bar:nth-child(even) {
        opacity: 0;
    }

    .hamburger.active .horizontal-bar:last-child {
        transform: rotate(45deg) translate(-4px, -4px);
    }
</style>
