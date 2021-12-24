<template>
  <div class="row my-0 gy-2 gx-2">
    <div v-if="getUser" class="col-md-6">
      <div class="padding colored rounded section">
        <div class="row gx-2">
          <div class="col-auto d-flex align-items-center">
            <div class="image box-48">
              <img
                :src="`https://www.tinygraphs.com/squares/${getUser.phone}?theme=duskfalling&numcolors=3`"
              />
            </div>
          </div>
          <div class="col">
            <p>
              <strong>{{ getUser.display_name }}</strong>
            </p>
            <div class="d-inline">
              <div class="surface-text">
                <p>
                  <strong>
                    {{ (Math.random() * (3 - 5) + 5).toFixed(1) + " ★ " }}
                  </strong>
                </p>
              </div>
              <div class="secondary-text">
                <p>
                  {{ " на сайте с " + getCreatedDate(getUser.created_date) }}
                </p>
              </div>
            </div>
          </div>
          <div class="offset-6px"></div>
          <button type="button" class="link error-text" @click="logoutToMain">
            <p>Выход из аккаунта</p>
          </button>
        </div>
      </div>
    </div>
    <div v-if="getListings" class="col-md-6">
      <div
        class="
          row
          gx-0
          padding
          colored
          rounded-top
          section
          d-flex
          align-items-center
        "
      >
        <div class="col">
          <h5>Мои объявления</h5>
        </div>
        <div class="col-auto">
          <router-link
            class="btn primary with-shadow"
            :to="{ name: 'CreateListing' }"
          >
            <span class="material-icons-round">add</span>
            <p>Добавить</p>
          </router-link>
        </div>
      </div>
      <!-- <div class="line"></div> -->
      <div v-if="getListings.length > 0" class="padding colored rounded-bottom">
        <Listings :listings="getListings" />
      </div>
      <div v-else class="padding colored rounded-bottom secondary-text center">
        <p>Нет объявлений ☹</p>
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "@/components/Listings";
import { mapGetters, mapActions } from "vuex";
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "MyListings",
  mixins: [conditionDecoder],
  computed: mapGetters(["getListings", "getUser"]),
  methods: {
    ...mapActions(["fetchMyListings", "fetchUser", "logout", "resetListings"]),
    logoutToMain() {
      console.log("click");
      this.logout();
      this.$router.push(`/`);
    },
  },
  async created() {
    this.resetListings();
    this.fetchUser().then(() => this.fetchMyListings());
  },
  components: {
    Listings,
  },
};
</script>

<style scoped>
</style>


