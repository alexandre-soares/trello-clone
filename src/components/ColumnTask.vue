<template>
    <div
        class="task"
        draggable
        @dragstart="pickupTask($event, taskIndex, columnIndex)"
        @click="goToTask(task)"
        @dragover.prevent
        @dragenter.prevent
        @drop.stop="
            moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)
        "
    >
        <span class="task__name">
            {{ task.name }}
        </span>
        <p v-if="task.description" class="task__name--description">
            {{ task.description }}
        </p>
    </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        taskIndex: {
            type: Number,
            required: true
        }
    },
    mixins: [movingTasksAndColumnsMixin],
    methods: {
        pickupTask(e, taskIndex, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-task-index', taskIndex)
            e.dataTransfer.setData('from-column-index', fromColumnIndex)
            e.dataTransfer.setData('type', 'task')
        },
        goToTask(task) {
            this.$router.push({ name: 'task', params: { id: task.id } })
        }
    }
}
</script>

<style lang="scss" scoped>
.task {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fff;
    color: #3d4852;
    cursor: pointer;
    text-decoration: none;

    &__name {
        font-weight: 600;
        flex-shrink: unset;
        width: 100%;

        &--description {
            font-size: small;
        }
    }
}
</style>
