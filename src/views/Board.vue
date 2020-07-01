<template>
    <div class="board">
        <div class="tasks">
            <div
                class="column"
                v-for="(column, $columnIndex) of board.columns"
                :key="$columnIndex"
                draggable
                @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
                @dragover.prevent
                @dragenter.prevent
                @dragstart.self="pickupColumn($event, $columnIndex)"
            >
                <div class="flex items-center mb-2 font-bold">
                    {{ column.name }}
                </div>
                <div class="list-reset">
                    <div
                        class="task"
                        v-for="(task, $taskIndex) of column.tasks"
                        :key="$taskIndex"
                        draggable
                        @dragstart="
                            pickupTask($event, $taskIndex, $columnIndex)
                        "
                        @click="goToTask(task)"
                        @dragover.prevent
                        @dragenter.prevent
                        @drop.stop="
                            moveTaskOrColumn(
                                $event,
                                column.tasks,
                                $columnIndex,
                                $taskIndex
                            )
                        "
                    >
                        <span class="task__name">
                            {{ task.name }}
                        </span>
                        <p
                            v-if="task.description"
                            class="task__name--description"
                        >
                            {{ task.description }}
                        </p>
                    </div>

                    <input
                        type="text"
                        class="task-input"
                        placeholder="+ Enter new task"
                        @keyup.enter="createTask($event, column.tasks)"
                    />
                </div>
            </div>
        </div>

        <div class="task-bg" v-if="isTaskOpen" @click.self="close">
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['board']),
        isTaskOpen() {
            return this.$route.name === 'task'
        }
    },
    methods: {
        goToTask(task) {
            this.$router.push({ name: 'task', params: { id: task.id } })
        },
        close() {
            this.$router.push({ name: 'board' })
        },
        createTask(e, tasks) {
            this.$store.commit('CREATE_TASK', {
                tasks,
                name: e.target.value
            })
            e.target.value = ''
        },
        pickupTask(e, taskIndex, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-task-index', taskIndex)
            e.dataTransfer.setData('from-column-index', fromColumnIndex)

            e.dataTransfer.setData('type', 'task')
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
.tasks {
    display: flex;
}

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

.column {
    background-color: #dae1e7;
    min-width: 350px;
    padding: 0.5rem;
    margin-right: 1rem;
    text-align: left;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
}

.board {
    padding: 1rem;
    background-color: #38a89d;
    height: 100%;
    overflow: auto;
}

.task-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
}

.task-input {
    display: block;
    padding: 1rem;
    width: 90%;
    background: transparent;
    border: none;
}
</style>
