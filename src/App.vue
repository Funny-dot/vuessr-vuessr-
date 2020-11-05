<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      console.log('App.vue beforeCreate');
    },

    created() {
      console.log('App.vue created');
    },

    beforeMount() {
      console.log('App.vue beforeMount');
    },

    mounted() {
      console.log('App.vue mounted');
    }
  }
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
