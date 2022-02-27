<template>
  <div class="row my-0 gy-2 gx-2">
    <div class="col-12">
      <div v-if="getUser" class="padding colored rounded section">
        <UserView :user="getUser" />
        <div class="offset-6"></div>
        <button type="button" class="link error-text" @click="logoutToMain">
          <p>Выход из аккаунта</p>
        </button>
      </div>
      <div v-else class="padding colored rounded section">
        <UserViewSkeleton />
        <div class="offset-6"></div>
        <button type="button" class="link error-text" @click="logoutToMain">
          <p>Выход из аккаунта</p>
        </button>
      </div>
    </div>
    <div class="col-12">
      <div class="padding colored rounded-top section">
        <h5>Мои объявления</h5>
      </div>
      <!-- <div class="line"></div> -->
      <div v-if="getListings">
        <div class="padding colored rounded-bottom">
          <div
            v-if="getListings.length <= 0"
            class="text-center secondary-text"
          >
            <p>Нет объявлений</p>
            <div class="offset-6"></div>
          </div>
          <ListingsMini :listings="getListings" v-else />
          <router-link
            class="btn bold no-text-shadow with-shadow full-width"
            :to="{ name: 'CreateListing' }"
          >
            <p>Создать объявление</p>
          </router-link>
        </div>
      </div>
      <div v-else>
        <div class="padding colored rounded-bottom">
          <ListingsMiniSkeleton />
          <ListingsMiniSkeleton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListingsMini from "@/components/ListingsMini";
import ListingsMiniSkeleton from "@/components/skeleton/ListingsMiniSkeleton";
import UserView from "@/components/UserView";
import UserViewSkeleton from "@/components/skeleton/UserViewSkeleton";
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
    ListingsMini,
    ListingsMiniSkeleton,
    UserView,
    UserViewSkeleton,
  },
};
</script>

<style scoped>
</style>


