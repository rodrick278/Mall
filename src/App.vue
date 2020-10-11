<template>
  <div id="app">
    <main-tabbar></main-tabbar>

    <router-view></router-view>
  </div>
</template>

<script>
  import MainTabbar from "components/content/mainTabbar/MainTabBar";

  export default {
  name: "App",
  components: {
    MainTabbar
  },
};
</script>

<style>
  @import "assets/css/base.css";
</style>