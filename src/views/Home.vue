<template>
  <div class="row my-0 gy-2 gx-2">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <div class="input-data">
          <button
            v-if="!isSearchActivated"
            type="submit"
            class="btn secondary-text no-text-shadow full-width with-border"
            @click="showSearch()"
          >
            <p>Поиск</p>
          </button>

          <div v-else>
            <select
              @change="updateProductData()"
              v-model.trim="selectData.product"
              :disabled="getProducts.length == 0"
            >
              <option value="0" selected>
                {{ getProducts.length > 0 ? "Выберите модель" : "Загрузка" }}
              </option>
              <option
                v-for="product in getProducts"
                :value="{ id: product.id, value: product.name }"
                :key="product.id"
              >
                {{ product.name }}
              </option>
            </select>
            <div class="offset-2px" />
            <select v-model.trim="selectData.storage">
              <option value="0" selected>Память</option>
              <option
                v-for="storage in productData.storages"
                :value="{ id: storage.id, value: storage.value }"
                :key="storage.id"
              >
                {{ storage.value }} GB
              </option>
            </select>
            <div class="offset-2px" />
            <select v-model.trim="selectData.color">
              <option value="0" selected>Цвет</option>
              <option
                v-for="color in productData.colors"
                :value="{ id: color.id, value: color.value }"
                :key="color.id"
              >
                {{ color.value }}
              </option>
            </select>
            <div class="offset-2px" />
            <button
              type="submit"
              class="btn primary full-width"
              @click="onSearch()"
            >
              <p>Готово</p>
            </button>
          </div>
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
      <div
        v-if="getListings.length > 0"
        class="row d-flex justify-content-center"
      >
        <div class="col-auto d-flex justify-content-start align-items-center">
          <component
            v-if="getPagination.has_prev"
            class="btn surface"
            :is="!getPagination.has_prev ? 'button' : 'router-link'"
            :disabled="!getPagination.has_prev"
            :to="{ name: 'Home', query: getFilterParams(false) }"
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
            :to="{ name: 'Home', query: getFilterParams(true) }"
          >
            <span class="material-icons-round">arrow_forward_ios</span>
          </component>
        </div>
      </div>
      <div v-else class="padding colored rounded section">
        <div class="secondary-text text-center center">
          <h5>Ничего не найдено</h5>
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
      selectData: {
        product: 0,
        storage: 0,
        color: 0,
      },
      productData: {
        storages: [],
        colors: [],
      },
    };
  },
  computed: {
    ...mapGetters([
      "getProducts",
      "getListings",
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
      };
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchListings"]),
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
      return filter;
    },
    showSearch() {
      this.isSearchActivated = true;
      this.fetchProducts();
    },
    onSearch() {
      this.isSearchActivated = false;
      console.log(this.selectData);
      const query = {
        model: this.selectData.product.id,
        storage: this.selectData.storage.id,
        color: this.selectData.color.id,
      };
      this.$router.push({ name: "Home", query: query });
    },
    updateProductData() {
      if (this.selectData.product == 0 || this.selectData.product.id == 0) {
        return;
      }
      this.productData.storages = this.getProducts.find(
        (product) => product.id == this.selectData.product.id
      ).storages;
      this.productData.colors = this.getProducts.find(
        (product) => product.id == this.selectData.product.id
      ).colors;
      // this.selectData.storage = this.productData.storages[0];
      // this.selectData.color = this.productData.colors[0];
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
  },
};
</script>

<style scoped>
</style>