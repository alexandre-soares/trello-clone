<template>
    <button type="button" class="button" :class="typeClasses">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String
        }
    },
    computed: {
        typeClasses() {
            switch (this.type) {
                case 'danger':
                    return 'bg-red'
                default:
                    return 'bg-teal'
            }
        }
    }
}
</script>

<style lang="css" scoped>
.button {
    display: inline-block;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5;
    color: white;
    border-radius: 0.25rem;
    align-items: center;
}
</style>
