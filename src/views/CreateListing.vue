<template>
  <form @submit.prevent="createListing">
    <div class="row my-0 gx-2 gy-2">
      <div class="col">
        <div class="padding colored rounded section primary-text">
          <div class="with-icon">
            <span class="material-icons-round">create</span>
            <h5>Новое объявление</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-0 gx-2 gy-2">
      <div class="col-md-6 order-2 order-md-1">
        <div class="padding rounded-top colored section dashed">
          <div class="help-label">
            <span class="material-icons-round">visibility</span>
            <div class="v-offset-2px"></div>
            <p>Предварительный просмотр</p>
          </div>
          <div class="offset-2px"></div>
          <h5>{{ selectData.product.value }}</h5>
          <div class="offset-2px"></div>
          <p>Память: {{ selectData.storage.value }} GB</p>
          <p>Цвет: {{ selectData.color.value }}</p>
        </div>
        <div class="padding colored section dashed">
          <h5>Описание</h5>
          <div class="offset-2px"></div>
          <p>{{ selectData.description }}</p>
          <div class="offset-2px"></div>
          <p>Состояние: {{ selectData.condition_state.value }}</p>
          <p>Батарея: {{ selectData.battery_health }}%</p>
        </div>
        <div class="padding colored rounded-bottom section dashed">
          <h5>Дополнительная информация</h5>
          <div class="offset-2px"></div>
          <p>{{ selectData.equipment.value }}</p>
        </div>
        <div class="offset-4px"></div>
        <div class="padding colored rounded section dashed accent-text mono">
          <h4>{{ numberWithCommas(selectData.price) }} KZT</h4>
        </div>
      </div>
      <div class="col-md-6 order-1 order-md-2">
        <div class="padding colored rounded section">
          <div class="row gx-0 d-flex align-items-center">
            <div class="col">
              <h5>Шаг {{ currentStep }}</h5>
            </div>
            <div class="col-auto">
              <button
                v-if="currentStep < 4"
                type="button"
                class="btn primary"
                @click="nextStep"
                v-show="!isProductSelected"
              >
                <span class="material-icons-round">arrow_forward_ios</span>
                <p>Далее</p>
              </button>
              <button
                v-else
                type="button"
                class="btn accent"
                @click="nextStep"
                :disabled="isProductSelected"
              >
                <span class="material-icons-round">done</span>
                <p>Опубликовать</p>
              </button>
            </div>
          </div>
          <div class="offset-6px"></div>
          <div v-show="currentStep == 1">
            <div class="input-data">
              <select
                @change="onProductChange($event)"
                v-model.trim="selectData.product"
              >
                <option value="0" selected disabled>Выберите модель</option>
                <option
                  v-for="product in getProducts"
                  :value="{ id: product.id, value: product.name }"
                  :key="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
            </div>
            <div class="offset-2px" />
            <div class="input-data">
              <select
                v-model.trim="selectData.storage"
                :disabled="isProductSelected"
              >
                <option value="0" selected disabled>Память</option>
                <option
                  v-for="storage in productData.storages"
                  :value="{ id: storage.id, value: storage.value }"
                  :key="storage.id"
                >
                  {{ storage.value }} GB
                </option>
              </select>
            </div>
            <div class="offset-2px" />
            <div class="input-data">
              <select
                v-model.trim="selectData.color"
                :disabled="isProductSelected"
              >
                <option value="0" selected disabled>Цвет</option>
                <option
                  v-for="color in productData.colors"
                  :value="{ id: color.id, value: color.value }"
                  :key="color.id"
                >
                  {{ color.value }}
                </option>
              </select>
            </div>
          </div>
          <div v-show="currentStep == 2">
            <div class="input-data">
              <div class="row gx-1 gy-1">
                <div class="col-12">
                  <select
                    v-model.trim="selectData.condition_state"
                    :disabled="isProductSelected"
                  >
                    <option value="0" selected disabled>Состояние</option>
                    <option
                      v-for="conditionState in getConditions"
                      :value="{
                        id: conditionState.id,
                        value: conditionState.value,
                      }"
                      :key="conditionState.id"
                    >
                      {{ conditionState.value }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <select
                    v-model.trim="selectData.battery_health"
                    :disabled="isProductSelected"
                  >
                    <option value="0" selected disabled>Батарея</option>
                    <option
                      v-for="percent in Array.from(Array(100).keys()).reverse()"
                      :value="percent + 1"
                      :key="percent + 1"
                    >
                      {{ percent + 1 }}%
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="offset-2px" />
            <div class="input-data">
              <textarea
                name="description"
                v-model="selectData.description"
                placeholder="Описание"
                rows="6"
                :disabled="isProductSelected"
              ></textarea>
            </div>
          </div>
          <div v-show="currentStep == 3">
            <div class="input-data">
              <div class="row gx-1 gy-1">
                <div class="col-12">
                  <select
                    v-model.trim="selectData.equipment"
                    :disabled="isProductSelected"
                  >
                    <option value="0" selected disabled>Комплектация</option>
                    <option
                      v-for="equipment in getEquipments"
                      :value="{ id: equipment.id, value: equipment.value }"
                      :key="equipment.id"
                    >
                      {{ equipment.value }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div v-show="currentStep == 4">
            <div class="input-data">
              <input
                type="number"
                v-model="selectData.price"
                placeholder="Цена"
                step="500"
                :disabled="isProductSelected"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import conditionDecoder from "@/services/condition-decoder";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateListing",
  data() {
    return {
      listingData: {
        imei: 0,
      },
      selectData: {
        product: 0,
        storage: 0,
        color: 0,
        condition_state: 0,
        battery_health: 0,
        description: "",
        equipment: 0,
        price: 0,
      },
      productData: {
        storages: [],
        colors: [],
      },
      currentStep: 1,
    };
  },
  mixins: [conditionDecoder],
  computed: {
    ...mapGetters(["getProducts", "getConditions", "getEquipments"]),
    isProductSelected() {
      return this.selectData.product == 0;
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchConditions", "fetchEquipments"]),
    onProductChange() {
      this.updateProductData();
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
      this.selectData.storage = this.productData.storages[0];
      this.selectData.color = this.productData.colors[0];
    },

    nextStep() {
      if (this.currentStep >= 4) {
        this.createListing();
      } else {
        this.currentStep += 1;
      }
    },
    createListing() {
      const data = {
        product_id: this.selectData.product.id,
        storage_id: this.selectData.storage.id,
        color_id: this.selectData.color.id,
        description: this.selectData.description,
        battery_health: this.selectData.battery_health,
        price: this.selectData.price,
        condition_state_id: this.selectData.condition_state.id,
        equipment_id: this.selectData.equipment.id,
      };

      this.$store
        .dispatch("createListing", data)
        .then(() => {
          this.$router.replace({ name: "MyListings" });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(data);
      console.log("listing created");
    },
  },
  async created() {
    this.fetchProducts().then(() => {
      this.fetchConditions();
      this.fetchEquipments();
      this.updateProductData();
    });
  },
  components: {},
};
</script>

<style>
</style>