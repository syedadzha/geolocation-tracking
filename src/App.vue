<template>
  <div id="app">
    <Navbar />

    <router-view class="main" @click="closeSidebar" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  methods: {
    closeSidebar() {
      document.getElementById("mobile-demo").style.left = "0";
    }
  }
};
</script>

<style>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}
</style>
