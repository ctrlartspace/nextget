<template>
  <footer>
    <div class="footer padding rounded-top section">
      <div class="row gx-4 gy-2">
        <div class="col-12 d-flex justify-content-center">
          <div class="row gx-2 gy-0 d-flex justify-content-center">
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
        <div
          class="
            col-12
            secondary-text
            d-flex
            justify-content-center
            text-center
          "
        >
          <p>
            © 2021 «Nextget», Сервис объявлений по продаже новой и подержанной
            техники Apple
          </p>
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