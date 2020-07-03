<template>
    <div id="app">
        <h1>Trello Clone</h1>
        <router-view />
    </div>
</template>

<style>
body,
html {
    height: 100%;
    margin: 0;
}

html {
    /* font-size: 62,5%; */
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    padding: 1rem;
    background-color: #38a89d;
    height: 100%;
    overflow: auto;
}

.container {
    margin-left: auto;
    margin-right: auto;
}
</style>
