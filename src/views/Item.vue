<template>
  <div v-if="getListing" class="row my-0 gy-2 gx-2">
    <div class="col-md-6">
      <div class="padding colored rounded-top section">
        <router-link :to="{ name: 'Item' }">
          <div class="row gx-2">
            <div class="col-auto d-flex align-items-center">
              <div class="square avatar">
                <img
                  :src="`https://www.tinygraphs.com/squares/${getListing.owner.phone}?theme=duskfalling&numcolors=3`"
                />
              </div>
            </div>
            <div class="col surface-text">
              <p>
                <strong>{{ getListing.owner.display_name }}</strong>
              </p>
              <div class="secondary-text">
                <p>
                  Отзывы: 100%, на сайте с
                  {{ getCreatedDate(getListing.owner.created_date) }}
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="padding colored section">
        <h5>{{ getListing.product.name }}</h5>
        <div class="offset-2px"></div>
        <div class="secondary-text">
          <p>Год выпуска: {{ getListing.product.year.value }}</p>
          <p>Память: {{ getListing.storage.value }} GB</p>
          <p>Цвет: {{ getListing.color.value }}</p>
        </div>
      </div>
      <div class="padding colored section no-border-bottom">
        <div class="row gx-2 d-flex align-items-center">
          <div class="col">
            <h5>Описание</h5>
          </div>
          <div class="col-auto">
            <div v-if="getListing.is_owner">
              <button type="button" class="link secondary-text">
                <!-- <span class="material-icons-round">delete</span> -->
                <p>Редактировать</p>
              </button>
            </div>
          </div>
        </div>
        <div class="offset-2px"></div>
        <p>{{ getListing.description }}</p>
        <div class="offset-2px"></div>
        <p>Состояние: {{ getListing.condition_state.value }}</p>
        <p>Батарея: {{ getListing.battery_health }}%</p>
      </div>
      <div class="padding colored no-border-bottom section">
        <h5>Дополнительная информация</h5>
        <div class="offset-2px"></div>
        <p>{{ getListing.equipment.value }}</p>
      </div>
      <div
        class="padding colored section"
        :class="{
          'no-border-bottom': getListing.is_owner,
          'rounded-bottom': !getListing.is_owner,
        }"
      >
        <div class="row gx-2 d-flex align-items-center">
          <div class="col">
            <div class="accent-text mono">
              <h4>{{ numberWithCommas(getListing.price) }} KZT</h4>
            </div>
          </div>
          <div v-if="!getListing.is_owner" class="col-auto">
            <button type="button" class="btn secondary-text">
              <span class="material-icons-round">favorite</span>
            </button>
          </div>
          <div v-if="!getListing.is_owner" class="col-auto">
            <button type="button" class="btn accent">
              <span class="material-icons-round">shopping_cart</span>
              <p>Купить</p>
            </button>
          </div>
          <div v-if="getListing.is_owner" class="col-auto">
            <button type="button" class="btn accent">
              <span class="material-icons-round">autorenew</span>
              <p>Новая цена</p>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="getListing.is_owner"
        class="padding colored rounded-bottom section"
      >
        <div class="row gx-2 d-flex align-items-center">
          <div class="col-auto d-flex align-items-center secondary-text">
            <p>
              <i>Уже не актуально? </i>
              <button type="button" class="link error-text">
                <!-- <span class="material-icons-round">delete</span> -->
                <p><i>Удалить</i></p>
              </button>
            </p>
          </div>
          <div class="col d-flex justify-content-end"></div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="padding colored rounded section">
        <div class="with-icon">
          <span class="material-icons-round">chat</span>
          <h5>Комменатарии</h5>
        </div>
        <div class="offset-2px"></div>
        <div class="secondary-text">
          <p><i>Недоступно</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "Item",
  mixins: [conditionDecoder],
  data() {
    return {
      loading: false,
    };
  },
  computed: mapGetters(["getListing"]),
  created() {
    this.$store.dispatch("fetchListing", this.$route.params.id).then((r) => {
      this.loading = false;
      console.log(r);
    });
  },
};
</script>

<style scoped>
</style>