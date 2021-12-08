<template>
  <footer>
    <div class="footer padding colored rounded-top section">
      <a class="btn" href="https://www.apple.com/" target="_blank">
        <span class="material-icons-round">apple</span>
      </a>
      <div class="offset-2px"></div>
      <div class="row gx-4 gy-2">
        <div class="col-md-6 order-2 order-md-1 secondary-text">
          <p>
            © 2021 «Nextget», Сервис объявлений по продаже новой и подержанной
            техники Apple
          </p>
        </div>
        <div class="col-md-6 order-1 order-md-2">
          <div class="row gx-2 gy-0">
            <div class="col-auto">
              <router-link class="secondary-text" :to="{ name: 'Home' }">
                <p>Вакансии</p>
              </router-link>
            </div>
            <div class="col-auto">
              <router-link class="secondary-text" :to="{ name: 'Home' }">
                <p>Сотрудничество</p>
              </router-link>
            </div>
            <div class="col-auto">
              <router-link class="secondary-text" :to="{ name: 'Home' }">
                <p>Реклама</p>
              </router-link>
            </div>
            <div class="col-auto">
              <router-link class="secondary-text" :to="{ name: 'Home' }">
                <p>Условия использования</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: mapGetters(["GET_LOGO"]),
};
</script>

<style>
</style>