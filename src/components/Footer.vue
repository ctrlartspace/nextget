<template>
  <footer>
    <div class="footer padding colored rounded-top section">
      <div class="row gx-2 gy-2">
        <div class="col-md-6 order-2 order-md-1">
          <p>
            <strong
              >Сервис объявлений по продаже новой и подержанной техники Apple
            </strong>
          </p>
          <div class="offset-2px"></div>
          <a class="btn" href="https://www.apple.com/" target="_blank">
            <span class="material-icons-round">apple</span>
          </a>
          <div class="offset-2px"></div>
          <p>© 2021 «Nextget»</p>
        </div>
        <div class="col-md-6 order-1 order-md-2">
          <p><strong>Информация</strong></p>
          <div class="offset-2px"></div>
          <router-link class="secondary-text" :to="{ name: 'Home' }">
            <p>Вакансии</p>
          </router-link>
          <div class="offset-2px"></div>
          <router-link class="secondary-text" :to="{ name: 'Home' }">
            <p>Сотрудничество</p>
          </router-link>
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