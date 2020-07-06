<template>
    <div class="board">
        <div class="tasks">
            <BoardColumn
                v-for="(column, $columnIndex) of board.columns"
                :key="$columnIndex"
                :column="column"
                :columnIndex="$columnIndex"
                :board="board"
            />
            <div class="column">
                <input
                    type="text"
                    class="new-column-input"
                    v-model="newColumnName"
                    placeholder="+ New Column Name"
                    @keyup.enter="createColumn"
                />
            </div>
        </div>

        <div class="task-bg" v-if="isTaskOpen" @click.self="close">
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'

export default {
    components: {
        BoardColumn
    },
    data() {
        return {
            newColumnName: ''
        }
    },
    computed: {
        ...mapState(['board']),
        isTaskOpen() {
            return this.$route.name === 'task'
        }
    },
    methods: {
        close() {
            this.$router.push({ name: 'board' })
        },
        createColumn() {
            this.$store.commit('CREATE_COLUMN', {
                name: this.newColumnName
            })

            this.newColumnName = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.tasks {
    display: flex;
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

.new-column-input {
    display: flex;
    background: transparent;
    border: none;
    background-color: #dae1e7;
    min-width: 350px;
    padding: 0.5rem;
    margin-right: 1rem;
    text-align: left;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    cursor: pointer;
}
</style>
