<template>
    <div
        class="column"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, columnIndex)"
    >
        <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
        </div>
        <div class="list-reset">
            <ColumnTask
                v-for="(task, $taskIndex) of column.tasks"
                :key="$taskIndex"
                :task="task"
                :taskIndex="$taskIndex"
                :column="column"
                :columnIndex="columnIndex"
                :board="board"
            />
            <input
                type="text"
                class="task-input"
                placeholder="+ Enter new task"
                @keyup.enter="createTask($event, column.tasks)"
            />
        </div>
    </div>
</template>

<script>
import ColumnTask from '@/components/ColumnTask'

export default {
    components: {
        ColumnTask
    },
    props: {
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
        createTask(e, tasks) {
            this.$store.commit('CREATE_TASK', {
                tasks,
                name: e.target.value
            })
            e.target.value = ''
        },
        pickupColumn(e, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-column-index', fromColumnIndex)
            e.dataTransfer.setData('type', 'column')
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
.column {
    background-color: #dae1e7;
    min-width: 350px;
    padding: 0.5rem;
    margin-right: 1rem;
    text-align: left;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    cursor: pointer;
}

.task-input {
    display: block;
    padding: 1rem;
    width: 90%;
    background: transparent;
    border: none;
}
</style>
