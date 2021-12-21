<template>
  <div class="row my-0 gy-2 gx-2">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <div class="with-icon">
          <span class="material-icons-round">filter_alt</span>
          <h5>Фильтры</h5>
        </div>
      </div>
    </div>
    <div v-if="getListings" class="col-md-8">
      <!-- <div class="padding colored rounded section">
        <h5>Все объявления</h5>
        <div class="offset-6px"></div>
        <Listings :listings="getListings" />
      </div> -->
      <div v-for="model in getProductModels" :key="model.id">
        <div class="padding colored rounded section">
          <div
            class="
              help-label
              transparent
              secondary-text
              d-flex
              justify-content-center
            "
          >
            <!-- <span class="material-icons-round">visibility</span> -->
            <!-- <div class="v-offset-2px"></div> -->
            <p>{{ model.product.name }}</p>
          </div>

          <div class="offset-6px"></div>
          <Listings :listings="getListingsByProductModel(model.product.id)" />
        </div>
        <div class="offset-4px"></div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-auto d-flex justify-content-start align-items-center">
          <component
            v-if="getPagination.has_prev"
            class="btn"
            :is="!getPagination.has_prev ? 'button' : 'router-link'"
            :disabled="!getPagination.has_prev"
            :to="{ name: 'Home', query: { page: getPagination.prev_num } }"
          >
            <span class="material-icons-round">arrow_back_ios</span>
          </component>
        </div>
        <div class="col-auto d-flex justify-content-center align-items-center">
          <div class="secondary-text">
            <p>
              <strong>{{ getPagination.page }}</strong>
            </p>
          </div>
        </div>
        <div class="col-auto d-flex justify-content-end align-items-center">
          <component
            v-if="getPagination.has_next"
            class="btn"
            :is="!getPagination.has_next ? 'button' : 'router-link'"
            :disabled="!getPagination.has_next"
            :to="{ name: 'Home', query: { page: getPagination.next_num } }"
          >
            <span class="material-icons-round">arrow_forward_ios</span>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "@/components/Listings";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  computed: mapGetters([
    "getListings",
    "getProductModels",
    "getListingsByProductModel",
    "getAveragePrice",
    "getPagination",
  ]),
  methods: {
    ...mapActions(["fetchListings"]),
  },
  async created() {
    this.fetchListings(this.$route.query.page ? this.$route.query.page : 1);
  },
  watch: {
    $route(to) {
      if (to.name == "Home") {
        this.fetchListings(this.$route.query.page ? this.$route.query.page : 1);
      }
    },
  },
  components: {
    Listings,
  },
};
</script>

<style scoped>
</style>