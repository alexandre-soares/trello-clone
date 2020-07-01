<template>
    <div class="board">
        <div class="tasks">
            <div
                class="column"
                v-for="(column, $columnIndex) of board.columns"
                :key="$columnIndex"
                @drop="moveTask($event, column.tasks)"
                @dragover.prevent
                @dragenter.prevent
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

            e.dataTransfer.setData('task-index', taskIndex)
            e.dataTransfer.setData('from-column-index', fromColumnIndex)
        },
        moveTask(e, toTasks) {
            const fromColumnIndex = e.dataTransfer.getData('from-column-index')
            const fromTasks = this.board.columns[fromColumnIndex].tasks

            const taskIndex = e.dataTransfer.getData('task-index')

            this.$store.commit('MOVE_TASK', {
                fromTasks,
                toTasks,
                taskIndex
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
