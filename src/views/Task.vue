<template>
    <div class="task-view">
        <div class="task-view__task">
            {{ task.name }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getTask']),
        task() {
            return this.getTask(this.$route.params.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.task-view {
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 8rem;
    margin-left: auto;
    margin-right: auto;

    text-align: left;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    width: 60%;
    padding: 3rem;

    &__task {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        cursor: pointer;
    }
}
</style>
