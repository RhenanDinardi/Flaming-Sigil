<template>
  <div id="app">
    <div id="loading"></div>
    <header class="d-flex flex-column flex-md-row align-items-center px-3 px-md-4 mb-3 banner-top">
      <div class="container d-flex justify-content-between">
        <h6 class="px-4 py-2 my-0 mr-md-auto font-weight-normal">LOGO 200X45</h6>
      </div>
    </header>
    <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm">
      <div class="container d-flex justify-content-between">
        <h4 id="pageTitle" class="my-0 mr-md-auto font-weight-normal">Meus Personagens</h4>
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

  .banner-top{
    background-color: transparent;
    color: #787f86;
  }

  .banner-top h6{
    background-color: #787f8633;
    border-radius: 5px;
  }

  #loading {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    overflow: visible;
    background: #33333359
    url('https://www.philau.edu/assets/images/loading.gif') no-repeat center center;
    display: none;
  }

</style>
