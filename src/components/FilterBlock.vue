<template>
  <div class="section">
    <button
      v-if="!isActive"
      type="submit"
      class="
        btn
        primary
        no-text-shadow
        full-width
        with-border
        
        bold
      "
      @click="activate()"
    >
      <p>Поиск</p>
    </button>
    <div v-else class="padding colored rounded input-data">
      <!-- Select Product -->
      <div class="with-action">
        <select
          @change="update()"
          v-model.trim="selectData.product"
          :disabled="!getProducts.length"
        >
          <option value="0" selected>Модель</option>
          <option
            v-for="product in getProducts"
            :value="{ id: product.id, value: product.name }"
            :key="product.id"
          >
            {{ product.name }}
          </option>
        </select>
        <button
          v-if="selectData.product != 0"
          type="button"
          class="btn transparent no-text-shadow"
          @click="(selectData.product = 0), update()"
        >
          <span class="material-icons-round">clear</span>
        </button>
      </div>
      <div class="offset-2"></div>

      <!-- Select Storage -->
      <div class="with-action">
        <select
          @change="update()"
          v-model.trim="selectData.storage"
          :disabled="!getProperties.storages"
        >
          <option value="0" selected>Память</option>
          <option
            v-for="storage in getProperties.storages"
            :value="{ id: storage.id, value: storage.value }"
            :key="storage.id"
          >
            {{ storage.value }} GB
          </option>
        </select>
        <button
          v-if="selectData.storage != 0"
          type="button"
          class="btn transparent no-text-shadow"
          @click="(selectData.storage = 0), update()"
        >
          <span class="material-icons-round">clear</span>
        </button>
      </div>
      <div class="offset-2"></div>

      <!-- Select Color -->
      <div class="with-action">
        <select
          @change="update()"
          v-model.trim="selectData.color"
          :disabled="!getProperties.colors"
        >
          <option value="0" selected>Цвет</option>
          <option
            v-for="color in getProperties.colors"
            :value="{ id: color.id, value: color.value }"
            :key="color.id"
          >
            {{ color.value }}
          </option>
        </select>
        <button
          v-if="selectData.color != 0"
          type="button"
          class="btn transparent no-text-shadow"
          @click="(selectData.color = 0), update()"
        >
          <span class="material-icons-round">clear</span>
        </button>
      </div>
      <div class="offset-2"></div>

      <!-- Select Condition -->
      <div class="with-action">
        <select
          @change="update()"
          v-model.trim="selectData.condition"
          :disabled="!getProperties.conditions"
        >
          <option value="0" selected>Состояние</option>
          <option
            v-for="condition in getProperties.conditions"
            :value="{ id: condition.id, value: condition.value }"
            :key="condition.id"
          >
            {{ condition.value }}
          </option>
        </select>
        <button
          v-if="selectData.condition != 0"
          type="button"
          class="btn transparent no-text-shadow"
          @click="(selectData.condition = 0), update()"
        >
          <span class="material-icons-round">clear</span>
        </button>
      </div>

      <!-- Search -->
      <div class="offset-6"></div>
      <button
        type="submit"
        class="btn primary no-text-shadow full-width with-border"
        @click="search()"
      >
        <p>Показать ({{ getListingsCount }})</p>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FilterBlock",
  data() {
    return {
      isActive: false,
      selectData: {
        product: 0,
        storage: 0,
        color: 0,
        condition: 0,
      },
      productData: {
        storages: [],
        colors: [],
      },
    };
  },
  computed: {
    ...mapGetters(["getProducts", "getProperties", "getListingsCount"]),
    getQuery() {
      return {
        model: this.selectData.product.id,
        storage: this.selectData.storage.id,
        color: this.selectData.color.id,
        condition: this.selectData.condition.id,
      };
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchProperties", "fetchListingsCount"]),
    activate() {
      this.isActive = true;
      this.fetchProducts();
      this.fetchProperties();
      this.fetchListingsCount(this.getQuery);
      this.$emit("onActivate", this.isActive)
    },
    search() {
      this.isActive = false
      this.$emit("onActivate", this.isActive)
      this.$router.push({ name: "Home", query: this.getQuery });
    },
    update() {
      this.fetchListingsCount(this.getQuery);
      console.log(this.selectData);
    },
  },
};
</script>

<style>
</style>