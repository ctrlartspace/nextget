<template>
  <form @submit.prevent="nextStep">
    <div class="row my-0 gx-2 gy-2">
      <div class="col-md-4">
        <div class="padding colored rounded section">
          <h5>1. Модель</h5>
          <div class="offset"></div>
          <div class="input-data">
            <select @change="onProductChange($event)" v-model.trim="selectData.product_id">
              <option value="0" selected disabled>Выберите модель</option>
              <option v-for='product in getProducts' :value="product.id" :key="product.id">
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="offset-s"/>
          <div class="input-data">
            <select v-model.trim="selectData.storage_id" :disabled="isProductSelected">
              <option value="0" selected disabled>Память</option>
              <option v-for='storage in productData.storages' :value="storage.id" :key="storage.id">
                {{ storage.value }} GB
              </option>
            </select>
          </div>
          <div class="offset-s"/>
          <div class="input-data">
            <select v-model.trim="selectData.color_id" :disabled="isProductSelected">
              <option value="0" selected disabled>Цвет</option>
              <option v-for='color in productData.colors' :value="color.id" :key="color.id">
                {{ color.value }}
              </option>
            </select>
          </div>

        </div>
      </div>
      <div class="col-md-4">
        <div class="padding colored rounded section">
          <h5>2. Состояние</h5>
          <div class="offset"></div>
          <div class="input-data">
            <div class="row gx-1 gy-1">
              <div class="col-12">
                <select v-model.trim="selectData.condition_state_id" :disabled="isProductSelected">
                  <option value="0" selected disabled>Состояние</option>
                  <option v-for='conditionState in getConditions' :value="conditionState.id" :key="conditionState.id">
                    {{ conditionState.value }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <select v-model.trim="selectData.battery_health" :disabled="isProductSelected">
                  <option value="0" selected disabled>Батарея</option>
                  <option v-for='percent in Array.from(Array(100).keys()).reverse()' :value="percent + 1" :key="percent  + 1">
                    {{ percent + 1 }}%
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="offset-s"/>
          <div class="input-data">
            <textarea name="description" v-model="selectData.description" placeholder="Описание" rows="6" :disabled="isProductSelected"></textarea>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="padding colored rounded section">
          <h5>3. Комплектация</h5>
          <div class="offset"></div>
          <div class="input-data">
            <div class="row gx-1 gy-1">
              <div class="col-12">
                <select v-model.trim="selectData.condition_state_id" :disabled="isProductSelected">
                  <option value="0" selected disabled>Состояние</option>
                  <option v-for='conditionState in getConditions' :value="conditionState.id" :key="conditionState.id">
                    {{ conditionState.value }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <select v-model.trim="selectData.battery_health" :disabled="isProductSelected">
                  <option value="0" selected disabled>Батарея</option>
                  <option v-for='percent in Array.from(Array(100).keys()).reverse()' :value="percent + 1" :key="percent  + 1">
                    {{ percent + 1 }}%
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-2 gx-2">
      <div class="col">
        <div class="padding colored rounded section">
          <h5>Дополнительная информация</h5>
          <div class="offset"></div>
          <div class="input-data">
            <input type="number" v-model="selectData.price" placeholder="Цена" :disabled="isProductSelected">
          </div>
          <div class="offset"></div>
          <router-link class="btn accent" :to="{ name: 'CreateListing' }" @click="nextStep">
            <span class="material-icons-round">done</span>
            <p>Далее</p>
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreateListing',
  data() {
    return {
      listingData: {
        imei: 0
      },
      selectData: {
        product_id: 0,
        storage_id: 0,
        color_id: 0,
        condition_state_id: 0,
        battery_health: 0,
        description: '',
        price: 0
      },
      productData: {
        storages: [],
        colors: []
      }
      
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getConditions']),
    isProductSelected() { return this.selectData.product_id == 0 }
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchConditions']),
    onProductChange() {
      this.updateProductData()
    },
    updateProductData() {
      if (this.selectData.product_id == 0) return
      this.productData.storages = this.getProducts.find((product) => product.id == this.selectData.product_id).storages
      this.productData.colors = this.getProducts.find((product) => product.id == this.selectData.product_id).colors
      this.selectData.storage_id = this.productData.storages[0].id
      this.selectData.color_id = this.productData.colors[0].id
    },

    nextStep() {
      console.log(this.selectData);
      this.$store.dispatch('createListing', this.selectData).then(() => {
        this.$router.replace({ name : 'MyListings'})
      }).catch(error => {
        console.log(error);
      })
    }
  },
  async created() {
		this.fetchProducts().then(() => {
      this.updateProductData()
      this.fetchConditions()
    })
	},
  components: {
  }
}
</script>

<style>

</style>