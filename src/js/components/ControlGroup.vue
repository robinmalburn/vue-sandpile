<template>
    <fieldset>
        <legend>{{legend}}</legend>
        <slot />
        <div v-if="canReset">
            <button class="btn" @click.prevent="$emit('reset', $event)">
                Reset
            </button>
        </div>
    </fieldset>
</template>

<script>
export default {
    props: {
        legend: {
            type: String,
            required: true,
        },
        canReset: {
            type: Boolean,
            default: true,
        }
    }
}
</script>
