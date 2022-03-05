<template>
  <Header />
  <main class="main">
    <router-view />
  </main>
  <Footer />
  <nav-bottom class="d-sm-none"/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import NavBottom from "@/components/ui/NavBottom.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    NavBottom,
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons+Round");
@import "./reset.css";
@import "./style.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: normal;
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 14px;
}

/* _MEDIA */
@media (max-width: 768px) {
  #app {
    margin-top: 20vh;
  }
}
</style>
