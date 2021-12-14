<template>
  <form @submit.prevent="createListing">
    <div class="row my-0 gx-2 gy-2">
      <div class="col">
        <div class="padding colored rounded section primary-text">
          <div class="with-icon">
            <span class="material-icons-round">post_add</span>
            <h5>Новое объявление</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-0 gx-2 gy-2">
      <div class="d-none d-sm-block col-md-6 order-2 order-md-1">
        <div class="padding rounded-top colored section hatch dash">
          <div class="help-label secondary">
            <span class="material-icons-round">visibility</span>
            <div class="v-offset-2px"></div>
            <p>Предварительный просмотр</p>
          </div>
          <div
            class="asd"
            :class="{ 'disabled-text': selectData.product == 0 }"
          >
            <div class="offset-6px"></div>
            <h5>
              {{
                selectData.product == 0 ? "Модель" : selectData.product.value
              }}
            </h5>
            <div class="offset-2px"></div>
            <p>
              Память:
              {{
                selectData.storage == 0 ? "-" : selectData.storage.value + "GB"
              }}
            </p>
            <p>
              Цвет: {{ selectData.color == 0 ? "-" : selectData.color.value }}
            </p>
          </div>
        </div>
        <div
          class="padding colored section hatch dash"
          :class="{ 'disabled-text': selectData.condition_state == 0 }"
        >
          <h5>Описание</h5>
          <div class="offset-2px"></div>
          <p>
            {{
              selectData.description == ""
                ? "Нет описания"
                : selectData.description
            }}
          </p>
          <div class="offset-2px"></div>
          <p>
            Состояние:
            {{
              selectData.condition_state == 0
                ? "-"
                : selectData.condition_state.value
            }}
          </p>
          <p>
            Батарея:
            {{
              selectData.battery_health == 0
                ? "-"
                : selectData.battery_health + "%"
            }}
          </p>
        </div>
        <div
          class="padding colored rounded-bottom section hatch dash"
          :class="{ 'disabled-text': selectData.equipment == 0 }"
        >
          <h5>Дополнительная информация</h5>
          <div class="offset-2px"></div>
          <p>
            {{
              selectData.equipment == 0
                ? "Комплектация"
                : selectData.equipment.value
            }}
          </p>
        </div>
        <div class="offset-4px"></div>
        <div
          class="padding colored rounded section hatch dash accent-text mono"
          :class="{ 'disabled-text': selectData.price == 0 }"
        >
          <h4>{{ numberWithCommas(selectData.price) }} KZT</h4>
        </div>
      </div>

      <div class="col-md-6 order-1 order-md-2">
        <div class="padding colored rounded section">
          <div class="row gx-0 d-flex align-items-center">
            <div class="col">
              <h5 v-if="currentStep < 4">Шаг {{ currentStep }} из 3</h5>
              <h5 v-if="currentStep == 4">Цена</h5>
            </div>
            <div class="col-auto d-flex align-items-center">
              <button
                v-if="currentStep > 1"
                type="button"
                class="btn"
                @click="prevStep"
                v-show="isProductSelected"
              >
                <span class="material-icons-round">arrow_back_ios</span>
              </button>
              <div class="v-offset-4px"></div>
              <button
                v-if="currentStep < 4"
                :disabled="!isProductSelected"
                type="button"
                class="btn primary"
                @click="nextStep"
              >
                <span class="material-icons-round">arrow_forward_ios</span>
                <p>Далее</p>
              </button>
              <button
                v-if="currentStep == 4"
                type="button"
                class="btn accent"
                @click="createListing"
                :disabled="!isProductSelected || isRequestNow"
              >
                <span class="material-icons-round">arrow_forward_ios</span>
                <p>Опубликовать</p>
              </button>
            </div>
          </div>
          <div class="offset-6px"></div>
          <div v-if="empty_fields.length > 0" class="help-label error">
            <span class="material-icons-round">priority_high</span>
            <div class="v-offset-2px"></div>
            <p>Заполните все поля</p>
          </div>
          <div v-if="empty_fields.length > 0" class="offset-2px"></div>
          <div v-show="currentStep == 1" class="input-data">
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
            <div class="offset-2px" />
            <select
              v-model.trim="selectData.storage"
              :disabled="!isProductSelected"
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
            <div class="offset-2px" />
            <select
              v-model.trim="selectData.color"
              :disabled="!isProductSelected"
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
          <div v-show="currentStep == 2" class="input-data">
            <select
              v-model.trim="selectData.condition_state"
              :disabled="!isProductSelected"
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
            <div class="offset-2px" />
            <select
              v-model.trim="selectData.battery_health"
              :disabled="!isProductSelected"
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
            <div class="offset-2px" />
            <textarea
              name="description"
              v-model="selectData.description"
              placeholder="Описание повреждений (царапины, трещины, потертости и т.д.)"
              rows="6"
              :disabled="!isProductSelected"
            />
          </div>
          <div v-show="currentStep == 3" class="input-data">
            <select
              v-model.trim="selectData.equipment"
              :disabled="!isProductSelected"
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
          <div v-show="currentStep == 4" class="input-data">
            <div v-if="getAveragePrice" class="accent-text">
              <p>Средняя цена за эту модель ~ <strong>{{ numberWithCommas(getAveragePrice) }} KZT</strong></p>
            </div>
            <div class="offset-2px"></div>
            <input
              type="text"
              v-model="getCurrency"
              placeholder="Цена"
              step="500"
              pattern="[0-9]*"
              inputmode="numeric"
              :disabled="!isProductSelected"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import conditionDecoder from "@/services/condition-decoder";
import { mapActions, mapGetters } from "vuex";
const NumberFormat = new Intl.NumberFormat("ru-RU");

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
      empty_fields: [],
      isRequestNow: false,
    };
  },
  mixins: [conditionDecoder],
  computed: {
    ...mapGetters(["getProducts", "getConditions", "getEquipments", "getAveragePrice"]),
    isProductSelected() {
      return this.selectData.product != 0;
    },
    getCurrency: {
      get: function () {
        return NumberFormat.format(this.selectData.price);
      },
      set: function (newValue) {
        this.selectData.price = null;
        this.selectData.price = +newValue.replaceAll(/\D/g, "");
      },
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "fetchConditions", "fetchEquipments", "fetchAveragePrice"]),
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
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep -= 1;
      }
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep += 1;
      }
      if (this.currentStep == 4) {
        this.fetchAveragePrice(this.selectData.product.id);
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

      this.empty_fields = [];
      if (!this.selectData.product) {
        this.empty_fields.push("product");
      }
      if (!this.selectData.storage) {
        this.empty_fields.push("storage");
      }
      if (!this.selectData.color) {
        this.empty_fields.push("color");
      }
      if (!this.selectData.description) {
        this.empty_fields.push("description");
      }
      if (!this.selectData.price) {
        this.empty_fields.push("price");
      }
      if (!this.selectData.condition_state) {
        this.empty_fields.push("condition_state");
      }
      if (!this.selectData.equipment) {
        this.empty_fields.push("equipment");
      }
      if (this.empty_fields.length > 0) {
        this.currentStep = 1;
        console.log(this.empty_fields);
      } else {
        this.isRequestNow = true;
        this.$store
          .dispatch("createListing", data)
          .then((r) => {
            this.isRequestNow = false;
            this.$router.replace({ name: "Item", params: { id: r.data.id } });
            console.log(r);
          })
          .catch((error) => {
            this.isRequestNow = false;
            console.log(error);
          });
        console.log(data);
      }
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