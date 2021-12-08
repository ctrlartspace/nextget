<template>
  <div v-if="getListings" class="row my-0 gy-2 gx-2">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <div class="with-icon">
          <span class="material-icons-round">filter_alt</span>
          <h5>Фильтры</h5>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <!-- <div class="padding colored rounded section">
        <h5>Все объявления</h5>
        <div class="offset-6px"></div>
        <Listings :listings="getListings" />
      </div> -->
      <div v-for="model in getProductModels" :key="model.id">
        <div class="padding colored rounded section">
          <div class="help-label primary">
            <!-- <span class="material-icons-round">visibility</span> -->
            <div class="v-offset-2px"></div>
            <p>{{ model.product.name }}</p>
          </div>

          <div class="offset-6px"></div>
          <Listings :listings="getListingsByProductModel(model.product.id)" />
        </div>
        <div class="offset-6px"></div>
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
  ]),
  methods: {
    ...mapActions(["fetchListings"]),
  },
  async created() {
    this.fetchListings();
  },
  components: {
    Listings,
  },
};
</script>

<style scoped>
</style>