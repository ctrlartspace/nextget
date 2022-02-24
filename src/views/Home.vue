<template>
  <div class="row my-0 gy-2 gx-2">
    <div class="col-12">
      <FilterBlock />
    </div>
    <div class="col-12">
      <div v-if="!getListings">
        <div class="padding colored rounded section">
          <ListingsSkeleton />
        </div>
        <div class="offset-4px"></div>
        <div class="padding colored rounded section">
          <ListingsSkeleton />
        </div>
      </div>

      <div v-else>
        <div v-for="model in getProductModels" :key="model.id">
          <div class="padding colored rounded section">
            <Listings :listings="getListingsByProductModel(model.product.id)" />
          </div>
          <div class="offset-4px"></div>
        </div>

        <div
          v-if="getListings.length > 0"
          class="row d-flex justify-content-center"
        >
          <div class="col-auto d-flex justify-content-start align-items-center">
            <component
              v-if="getPagination.has_prev"
              class="btn surface with-border no-text-shadow full-rounded"
              :is="!getPagination.has_prev ? 'button' : 'router-link'"
              :disabled="!getPagination.has_prev"
              :to="{ name: 'Home', query: getFilterParams(false) }"
            >
              <span class="material-icons-round">arrow_back_ios</span>
            </component>
          </div>
          <div
            class="col-auto d-flex justify-content-center align-items-center"
          >
            <div class="section secondary-text text-large">
              <p>Страница {{ getPagination.page }}</p>
            </div>
          </div>
          <div class="col-auto d-flex justify-content-end align-items-center">
            <component
              v-if="getPagination.has_next"
              class="btn primary no-text-shadow full-rounded"
              :is="!getPagination.has_next ? 'button' : 'router-link'"
              :disabled="!getPagination.has_next"
              :to="{ name: 'Home', query: getFilterParams(true) }"
            >
              <span class="material-icons-round">arrow_forward_ios</span>
            </component>
          </div>
        </div>

        <div v-else class="padding section">
          <div class="secondary-text text-center center">
            <h5>Ничего не найдено</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "@/components/Listings";
import ListingsSkeleton from "@/components/skeleton/ListingsSkeleton";
import FilterBlock from "@/components/FilterBlock";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getListings",
      "getListingsCount",
      "getProductModels",
      "getListingsByProductModel",
      "getAveragePrice",
      "getPagination",
    ]),
    getQueryParams() {
      return {
        page: this.$route.query.page ? this.$route.query.page : 1,
        model: this.$route.query.model ? this.$route.query.model : 0,
        storage: this.$route.query.storage ? this.$route.query.storage : 0,
        color: this.$route.query.color ? this.$route.query.color : 0,
        condition: this.$route.query.condition
          ? this.$route.query.condition
          : 0,
      };
    },
  },
  methods: {
    ...mapActions(["fetchListings", "fetchListingsCount"]),
    getFilterParams(isNextPage) {
      const filter = {};
      filter.page = isNextPage
        ? this.getPagination.next_num
        : this.getPagination.prev_num;
      if (this.getQueryParams.model > 0)
        filter.model = this.getQueryParams.model;
      if (this.getQueryParams.storage > 0)
        filter.storage = this.getQueryParams.storage;
      if (this.getQueryParams.color > 0)
        filter.color = this.getQueryParams.color;
      if (this.getQueryParams.condition > 0)
        filter.condition = this.getQueryParams.condition;
      return filter;
    },
  },
  async created() {
    this.fetchListings(this.getQueryParams);
  },
  watch: {
    $route(to) {
      if (to.name == "Home") {
        console.log(this.getQueryParams);
        console.log(this.$route.query.model);
        this.fetchListings(this.getQueryParams);
      }
    },
  },
  components: {
    Listings,
    ListingsSkeleton,
    FilterBlock,
  },
};
</script>

<style scoped>
</style>