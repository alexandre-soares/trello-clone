import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board'
import { saveStatePlugin, uuid } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
    plugins: [saveStatePlugin],
    state: {
        board
    },
    getters: {
        getTask(state) {
            // console.log('getTask function launched')
            // console.log('colums' + state.board.columns)

            return id => {
                for (const column of state.board.columns) {
                    for (const task of column.tasks) {
                        // console.log(task.id)

                        if (task.id === id) {
                            // console.log('task' + task)

                            return task
                        }
                    }
                }
            }
        }
    },
    mutations: {
        CREATE_TASK(state, { tasks, name }) {
            tasks.push({
                name,
                id: uuid(),
                description: ''
            })
        },
        DELETE_TASK(state, { taskId }) {
            // console.log(taskId)

            for (const column of state.board.columns) {
                // console.log(column.tasks)
                let i = 0
                for (const task of column.tasks) {
                    // console.log('index is now ' + i)
                    if (task.id === taskId) {
                        column.tasks.splice(i, 1)
                        break
                    }
                    i = i + 1
                }
            }
        },
        CREATE_COLUMN(state, { name }) {
            state.board.columns.push({
                name,
                tasks: []
            })
        },
        DELETE_COLUMN(state, { columnName }) {
            // console.log('column name is ')
            // console.log(columnName)

            let i = 0

            for (const column of state.board.columns) {
                if (column.name === columnName) {
                    console.log(i)
                    state.board.columns.splice(i, 1)
                    break
                }
                i++
            }
        },
        UPDATE_TASK(state, { task, key, value }) {
            Vue.set(task, key, value)
        },
        MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
            const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
            toTasks.splice(toTaskIndex, 0, taskToMove)
        },
        MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
            const columnList = state.board.columns

            const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
            columnList.splice(toColumnIndex, 0, columnToMove)
        }
    }
})
