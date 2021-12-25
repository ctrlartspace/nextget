<template >
  <header>
    <div class="nav padding rounded-bottom">
      <div class="row gx-2 d-flex justify-content-center">
        <div class="col-auto d-flex align-items-center">
          <router-link :to="{ name: 'Home' }">
            <img class="logo" :src="GET_LOGO" alt="logo" />
          </router-link>
        </div>
        <div class="col-auto d-flex align-items-center">
          <router-link class="btn surface" :to="{ name: 'Home' }">
            <span class="material-icons-round">view_stream</span>
          </router-link>
        </div>
        <div class="col-auto d-flex align-items-center">
          <button class="btn surface bordered" @click="updateTheme()">
            <span class="material-icons-round">dark_mode</span>
          </button>
        </div>
        <div class="col-auto d-flex align-items-center">
          <router-link
            v-show="IS_AUTHENTIFICATED"
            class="btn surface"
            :to="{ name: 'CreateListing' }"
          >
            <span class="material-icons-round">edit</span>
          </router-link>
        </div>
        <div class="col-auto d-flex align-items-center">
          <router-link
            v-show="IS_AUTHENTIFICATED"
            class="btn surface"
            :to="{ name: 'MyListings' }"
          >
            <span class="material-icons-round">account_box</span>
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
  computed: mapGetters(["IS_AUTHENTIFICATED", "IS_LOADING", "GET_LOGO"]),
  methods: {
    ...mapActions(["logout", "updateTheme"]),
  },
  components: {},
};
</script>

<style scoped>
</style>
