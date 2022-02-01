<template>
  <footer>
    <div class="footer padding rounded-top section">
      <div class="row gx-4 gy-2">
        <div class="col-12 d-flex justify-content-center">
          <div class="row gx-2 gy-2 d-flex justify-content-center">
            <div v-if="IS_AUTHENTIFICATED" class="col-auto">
              <router-link class="" :to="{ name: 'MyListings' }">
                <p>Личный кабинет</p>
              </router-link>
            </div>
            <div v-if="IS_AUTHENTIFICATED" class="col-auto">
              <router-link class="" :to="{ name: 'CreateListing' }">
                <p>Создать объявление</p>
              </router-link>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <button type="button" class="link" @click="updateTheme">
                <p>{{ IS_DARK_THEME ? "Светлая" : "Темная" }} тема</p>
              </button>
            </div>
            <div class="col-auto d-flex justify-content-center">
              <router-link class="secondary-text" :to="{ name: 'Home' }">
                <p>Условия использования</p>
              </router-link>
            </div>
            <div class="col-12 secondary-text text-center">
              <p>© 2021-2022 «Лайтлист», Объявления по продаже техники Apple</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Footer",
  computed: mapGetters([
    "IS_AUTHENTIFICATED",
    "IS_LOADING",
    "GET_LOGO",
    "IS_DARK_THEME",
  ]),
  methods: {
    ...mapActions(["logout", "updateTheme"]),
  },
};
</script>

<style>
</style>