<template>
  <div id="app">
    <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm">
      <div class="container d-flex justify-content-between">
        <h4 class="my-0 mr-md-auto font-weight-normal"> Meus Personagens</h4>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    background: #ececec;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 1rem;
  }

  header{
    background-color: #0062cc;
    color: whitesmoke;
  }

</style>
