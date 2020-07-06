<template>
    <div class="task-view">
        <div class="task-view__task">
            <div class="task-view__header">
                <input
                    type="text"
                    class="task-view__input-name"
                    :value="task.name"
                    @change="updateTaskProperty($event, 'name')"
                    @keyup.enter="updateTaskProperty($event, 'name')"
                />
                <div @click="deleteTask($event, task.id)">
                    <BaseIcon name="delete" class="delete-icon"></BaseIcon>
                </div>
            </div>


            <textarea
                :value="task.description"
                class="task-view__description"
                @change="updateTaskProperty($event, 'description')"
            ></textarea>
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
    },
    methods: {
        updateTaskProperty(e, key) {
            this.$store.commit('UPDATE_TASK', {
                task: this.task,
                key,
                value: e.target.value
            })
            this.$router.push({ name: 'board' })
        },
        deleteTask(e, taskId) {
            this.$store.commit('DELETE_TASK', {
                taskId
            })
            this.$router.push({ name: 'board' })
        }
    }
}
</script>

<style lang="scss" scoped>
.task-view {
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: #dae1e7;
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

    &__header {
        display: flex;
        justify-content: space-between;
    }

    &__task {
        width: 100%;
    }

    &__description {
        position: relative;
        background: transparent;
        padding: 0.5rem;
        border: none;
        margin-top: 1rem;
        width: 90%;
        font-family: 'Roboto';
        line-height: 1.5;
    }

    &__input-name {
        padding: 0.5rem;
        border: none;
        display: block;
        margin-right: 2rem;
        font-weight: 600;
        width: 90%;
        border-radius: 0.25rem;
    }
}
</style>
