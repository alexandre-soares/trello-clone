<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpenNav: false
        }
    },
    methods: {
        openNav() {
            this.isOpenNav = !this.isOpenNav
        }
    }
}
</script>

<style lang="scss">
$background-color: #38a89d;

body,
html {
    height: 100%;
    margin: 0;
}

body {
    left: 0;
    position: relative;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    padding: 1rem;
    background-color: $background-color;
    height: 100%;
    overflow: auto;
    z-index: 1;
}

.container {
    margin-left: auto;
    margin-right: auto;
}

.app-title {
    color: white;
}

// NavBar

// Utilities

.full-width {
    width: 100%;
}

// Style for icons

.delete-icon {
    color: white;
    transition: all 0.4s ease-in;
}

.delete-icon:hover {
    color: red;
}

// Animations

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>
