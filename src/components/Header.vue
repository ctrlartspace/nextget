<template >
  <header>
    <div class="nav v-padding rounded">
      <div class="row gx-2 d-flex">
        <div class="d-none d-md-flex col-auto d-flex align-items-center">
          <router-link
            class="btn surface with-border no-text-shadow full-rounded"
            :to="{ name: 'CreateListing' }"
          >
            <span class="material-icons-round">edit</span>
          </router-link>
        </div>
        <div class="col d-flex align-items-center justify-content-center">
          <router-link :to="{ name: 'Home' }">
            <img class="logo" :src="GET_LOGO" alt="logo" />
          </router-link>
        </div>

        <div class="d-none d-md-flex col-auto align-items-center">
          <router-link
            class="btn surface with-border no-text-shadow full-rounded"
            :to="{ name: 'MyListings' }"
          >
            <span class="material-icons-round">account_box</span>
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
