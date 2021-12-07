<template >
  <header>
    <div class="nav padding colored rounded-bottom">
      <div class="row gx-2">
        <div class="col-auto me-auto d-flex align-items-center">
          <router-link v-show="IS_AUTHENTIFICATED" :to="{ name: 'Home' }">
            <img class="logo" :src="GET_LOGO" alt="logo" />
           
          </router-link>
        </div>
        <div class="col-auto d-flex align-items-center">
          <button class="btn" @click="updateTheme()">
            <span class="material-icons-round">dark_mode</span>
          </button>
        </div>
        <div class="col-auto d-flex align-items-center">
          <router-link
            v-show="IS_AUTHENTIFICATED"
            class="btn"
            :to="{ name: 'CreateListing' }"
          >
            <span class="material-icons-round">create</span>
          </router-link>
        </div>
        <div class="col-auto d-flex align-items-center">
          <router-link
            v-show="IS_AUTHENTIFICATED"
            class="btn"
            :to="{ name: 'MyListings' }"
          >
            <span class="material-icons-round">account_circle</span>
            <p>Мой аккаунт</p>
          </router-link>
          <router-link
            v-show="!IS_AUTHENTIFICATED"
            class="btn primary"
            :to="{ name: 'Login' }"
          >
            <span class="material-icons-round">login</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      logo: "https://aman3d.pythonanywhere.com/logo_light.svg"
    }
  },
  computed: mapGetters(["IS_AUTHENTIFICATED", "IS_LOADING", "GET_LOGO"]),
  methods: {
    ...mapActions(["logout", "updateTheme"]),
    // updateTheme() {
    //   if (document.documentElement.className == "light") {
    //     document.documentElement.className = "dark";
    //   } else {
    //     document.documentElement.className = "light";
    //   }
    //   this.getLogo()
    // },
    // getLogo() {
    //   this.logo =
    //     document.documentElement.className == "light"
    //       ? "https://aman3d.pythonanywhere.com/logo_light.svg"
    //       : "https://aman3d.pythonanywhere.com/logo_dark.svg";
    // },
  },
  components: {},
};
</script>

<style scoped>
</style>
