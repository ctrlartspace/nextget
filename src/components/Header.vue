<template >
  <header>
    <div class="nav padding rounded-bottom">
      <div class="row gx-2 d-flex">
        <div
          class="
            col
            d-flex
            align-items-center
            justify-content-center justify-content-md-start
          "
        >
          <router-link :to="{ name: 'Home' }">
            <img class="logo" :src="GET_LOGO" alt="logo" />
          </router-link>
        </div>
        <!-- <div class="col-auto d-flex align-items-center">
          <router-link class="btn surface" :to="{ name: 'Home' }">
            <span class="material-icons-round">view_stream</span>
          </router-link>
        </div> -->

        <div
          v-if="IS_AUTHENTIFICATED"
          class="d-none d-sm-flex col-auto d-flex align-items-center"
        >
          <router-link
            class="btn surface accent-text bordered no-text-shadow"
            :to="{ name: 'CreateListing' }"
          >
            <p><strong>Создать</strong></p>
            <!-- <span class="material-icons-round">edit</span> -->
          </router-link>
        </div>
        <!-- <div class="d-none d-sm-flex col-auto d-flex align-items-center">
          <button class="btn surface bordered" @click="updateTheme()">
            <span class="material-icons-round">{{ !IS_DARK_THEME ? 'dark_mode' : 'light_mode' }}</span>
          </button>
        </div> -->
        <div
          v-if="IS_AUTHENTIFICATED"
          class="d-none d-sm-flex col-auto d-flex align-items-center"
        >
          <router-link
            class="btn surface no-text-shadow"
            :to="{ name: 'MyListings' }"
          >
            <span class="material-icons-round">account_box</span>
          </router-link>
        </div>
        <!-- <div
          v-if="!IS_AUTHENTIFICATED"
          class="col-auto d-flex align-items-center"
        >
          <router-link class="btn primary" :to="{ name: 'Login' }">
            <span class="material-icons-round">login</span>
          </router-link>
        </div> -->
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
