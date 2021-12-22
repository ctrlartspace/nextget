<template>
  <Header />
  <main class="main">
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(["initTheme"]),
  },
  mounted() {
    this.initTheme();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons+Round");
@import "./style.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 700px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
