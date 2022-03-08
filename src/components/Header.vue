<template >
  <header>
    <div class="nav padding rounded">
      <div class="row gx-2 gy-3 d-flex">
        <!-- <div class="d-none d-md-flex col-auto d-flex align-items-center">
          <router-link
            class="btn surface with-border no-text-shadow full-rounded"
            :to="{ name: 'CreateListing' }"
          >
            <span class="material-icons-round">edit</span>
          </router-link>
        </div> -->
        <div class="col-12">
          <router-link
            class="
              d-flex
              align-items-center
              justify-content-sm-start justify-content-center
            "
            :to="{ name: 'Home' }"
          >
            <img class="logo" :src="GET_LOGO" alt="logo" />
          </router-link>
        </div>
        <!-- <div class="d-none d-md-flex col-12"></div> -->

        <div class="d-none d-md-flex col-12 align-items-center">
          <router-link
            class="link text-large surface-text"
            :to="{ name: 'MyListings' }"
          >
            <span class="material-icons-round">account_box</span>
            <p><strong>Мой аккаунт</strong></p>
          </router-link>
        </div>
        <div class="d-none d-md-flex col-12 align-items-center">
          <router-link
            class="link text-large surface-text"
            :to="{ name: 'CreateListing' }"
          >
            <span class="material-icons-round">edit</span>
            <p><strong>Создать объявление</strong></p>
          </router-link>
        </div>
        <div class="d-none d-md-flex col-12 align-items-center">
          <button
            type="button"
            class="link text-large secondary-text"
            @click="updateTheme"
          >
            <span class="material-icons-round">{{
              IS_DARK_THEME ? "light_mode" : "dark_mode"
            }}</span>
            <p>{{ IS_DARK_THEME ? "Светлая" : "Темная" }} тема</p>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: mapGetters([
    "IS_AUTHENTIFICATED",
    "IS_LOADING",
    "GET_LOGO",
    "IS_DARK_THEME",
  ]),
  methods: {
    ...mapActions(["logout", "updateTheme"]),
  },
  components: {},
};
</script>

<style scoped>
</style>
