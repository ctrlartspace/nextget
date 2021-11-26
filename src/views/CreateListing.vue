<template>
  <form @submit.prevent="createListing">
    <div class="row my-0 gx-2 gy-2">
      <div class="col-md-6">
      

        <div class="padding colored section">
          <h5>{{ selectData.product.value }}</h5>
          <div class="info block">
            <div class="offset-s"></div>
            <!-- <p>Год выпуска: {{ selectData.product.year.value }}</p> -->
            <p>Память: {{ selectData.storage.value }} GB</p>
            <p>Цвет: {{ selectData.color.value }}</p>
          </div>
        </div>
        <div class="padding colored section no-border-bottom">
          <h5>Описание</h5>
          <div class="offset-s"></div>
          <div class="info black inline">
            <p>{{ selectData.product_id }}</p>
            <div class="offset-s"></div>
            <p>Состояние: {{ selectData.product_id }}</p>
            <p>Батарея: {{ selectData.product_id }}%</p>
          </div>
        </div>
        <div class="padding colored rounded-bottom section">
          <h5>Дополнительная информация</h5>
        </div>
      </div>


      <div v-show="currentStep==1" class="col-md-6">
        <div class="padding colored rounded section">
          <h5>1. Модель</h5>
          <div class="offset"></div>
          <div class="input-data">
            <select @change="onProductChange($event)" v-model.trim="selectData.product">
              <option value="0" selected disabled>Выберите модель</option>
              <option v-for='product in getProducts' :value="{ id: product.id, value: product.name }" :key="product.id">
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="offset-s"/>
          <div class="input-data">
            <select v-model.trim="selectData.storage" :disabled="isProductSelected">
              <option value="0" selected disabled>Память</option>
              <option v-for='storage in productData.storages' :value="{ id: storage.id, value: storage.value }" :key="storage.id">
                {{ storage.value }} GB
              </option>
            </select>
          </div>
          <div class="offset-s"/>
          <div class="input-data">
            <select v-model.trim="selectData.color" :disabled="isProductSelected">
              <option value="0" selected disabled>Цвет</option>
              <option v-for='color in productData.colors' :value="{ id: color.id, value: color.value }" :key="color.id">
                {{ color.value }}
              </option>
            </select>
          </div>

        </div>
      </div>
      <div v-show="currentStep==2" class="col-md-6">
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
      <div v-show="currentStep==3" class="col-md-6">
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
      <div class="col-6">
      </div>
      <div class="col-6">
        <div class="padding colored rounded section">
          <button type="button" class="btn primary" @click="nextStep">
            <p>Далее</p>
            <span class="material-icons-round">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="row my-2 gx-2">
      <div class="col">
        <div class="padding colored rounded section">
          <h5>Дополнительная информация</h5>
          <div class="offset"></div>
          <div class="input-data">
            <input type="number" v-model="selectData.price" placeholder="Цена" :disabled="isProductSelected">
          </div>
          <div class="offset"></div>
          <router-link class="btn accent" :to="{ name: 'CreateListing' }">
            <span class="material-icons-round">done</span>
            <p>Далее</p>
          </router-link>
        </div>
      </div>
    </div> -->
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
        product: 0,
        storage: 0,
        color: 0,
        condition_state:  0,
        battery_health: 0,
        description: '',
        price: 0
      },
      productData: {
        storages: [],
        colors: []
      },
      currentStep: 1
      
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getConditions']),
    isProductSelected() { return this.selectData.product.id == 0 }
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchConditions']),
    onProductChange() {
      this.updateProductData()
    },
    updateProductData() {
      if (this.selectData.product.id == 0) return
      this.productData.storages = this.getProducts.find((product) => product.id == this.selectData.product.id).storages
      this.productData.colors = this.getProducts.find((product) => product.id == this.selectData.product.id).colors
      this.selectData.storage.id = this.productData.storages[0].id
      this.selectData.color.id = this.productData.colors[0].id
      console.log(this.productData);
    },

    nextStep() {
      // console.log(this.selectData);
      if (this.currentStep < 3) {
        this.currentStep += 1
      }
      // this.$store.dispatch('createListing', this.selectData).then(() => {
      //   this.$router.replace({ name : 'MyListings'})
      // }).catch(error => {
      //   console.log(error);
      // })
    },
    createListing() {
      console.log("listing created")
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