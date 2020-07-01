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
export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        taskIndex: {
            type: Number,
            required: true
        },
        column: {
            type: Object,
            required: true
        },
        columnIndex: {
            type: Number,
            required: true
        },
        board: {
            type: Object,
            required: true
        }
    },
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
        },
        moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex) {
            const type = e.dataTransfer.getData('type')

            if (type === 'task') {
                this.moveTask(
                    e,
                    toTasks,
                    toTaskIndex !== undefined ? toTaskIndex : toTasks.length
                )
            } else {
                this.moveColumn(e, toColumnIndex)
            }
        },
        moveTask(e, toTasks, toTaskIndex) {
            const fromColumnIndex = e.dataTransfer.getData('from-column-index')
            const fromTasks = this.board.columns[fromColumnIndex].tasks
            const fromTaskIndex = e.dataTransfer.getData('from-task-index')

            this.$store.commit('MOVE_TASK', {
                fromTasks,
                fromTaskIndex,
                toTasks,
                toTaskIndex
            })
        },
        moveColumn(e, toColumnIndex) {
            const fromColumnIndex = e.dataTransfer.getData('from-column-index')

            this.$store.commit('MOVE_COLUMN', {
                fromColumnIndex,
                toColumnIndex
            })
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
