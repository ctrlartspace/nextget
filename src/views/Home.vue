<template>
  <div v-if="getListings" class="row my-0 gy-2 gx-2">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <div class="input-data">
          <button
            v-if="!isSearchActivated"
            type="submit"
            class="btn secondary-text no-text-shadow full-width"
            @click="isSearchActivated = true"
          >
            <p>Поиск</p>
          </button>

          <div v-else>
            <select>
              <option value="0" selected disabled>Выберите модель</option>
            </select>
            <div class="offset-2px" />
            <select>
              <option value="0" selected disabled>Память</option>
            </select>
            <div class="offset-2px" />
            <select>
              <option value="0" selected disabled>Цвет</option>
            </select>
            <div class="offset-2px" />
            <button
              type="submit"
              class="btn primary full-width"
              @click="isSearchActivated = false"
            >
              <p>Готово</p>
            </button>
          </div>
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
        <!-- <div
          class="
            help-label
            transparent
            secondary-text
            d-flex
            justify-content-center
          "
        >
          <p>{{ model.product.name }}</p>
        </div>
        <div class="offset-4px"></div> -->
        <div class="padding colored rounded section">
          <Listings :listings="getListingsByProductModel(model.product.id)" />
        </div>
        <div class="offset-4px"></div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-auto d-flex justify-content-start align-items-center">
          <component
            v-if="getPagination.has_prev"
            class="btn surface"
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
            class="btn surface"
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
  data() {
    return {
      isSearchActivated: false,
    };
  },
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