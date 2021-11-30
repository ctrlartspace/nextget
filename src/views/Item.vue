<template>
  <div v-if="getListing" class="row my-0 gy-2 gx-2">
    <div class="col-md-6">

      <div class="padding colored rounded-top section">
        <router-link :to="{ name: 'Register' }">
          <div class="row gx-2 info">
            <div class="col-auto">
              <div class="square avatar">
                <img :src="`https://www.tinygraphs.com/squares/${getListing.owner.phone}?theme=duskfalling&numcolors=3`">
              </div>
            </div>
            <div class="col">
              <div class="block">
                <div class="black">
                  <p><strong>{{ getListing.owner.display_name }}</strong></p>
                </div>
                <p>Отзывы: 100%, на сайте с {{ getCreatedDate(getListing.owner.created_date) }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="padding colored section">
        <div class="row gx-2">
          <div class="col">
            <h5>{{ getListing.product.name }}</h5>
          </div>
          <div class="col-auto">
            <div v-if="getListing.is_owner" class="info clickable">
              <router-link :to="{ name: 'Register' }">Редактировать</router-link>
            </div>
          </div>
        </div>
        <div class="info block">
          <div class="offset-s"></div>
          <p>Год выпуска: {{ getListing.product.year.value }}</p>
          <p>Память: {{ getListing.storage.value }} GB</p>
          <p>Цвет: {{ getListing.color.value }}</p>
        </div>
      </div>
      <div class="padding colored section no-border-bottom">
        <h5>Описание</h5>
        <div class="offset-s"></div>
        <div class="info black inline">
          <p>{{ getListing.description }}</p>
          <div class="offset-s"></div>
          <p>Состояние: {{ getListing.condition_state.value }}</p>
          <p>Батарея: {{ getListing.battery_health }}%</p>
        </div>
      </div>
      <div class="padding colored rounded-bottom section">
        <h5>Дополнительная информация</h5>
        <div class="offset-s"></div>
        <div class="info black inline">
          <p>Комплектация: {{ getListing.equipment.value }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="padding colored rounded section">
        <div class="with-icon">
          <span class="material-icons-round">chat</span>
          <h5>Комменатарии</h5>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import conditionDecoder from '@/services/condition-decoder'

export default {
  name: 'Item',
  mixins: [conditionDecoder],
  data() {
    return {
      loading: false,
    }
  },
  computed: mapGetters(['getListing']),
  created() {
    this.$store.dispatch('fetchListing', this.$route.params.id).then((r) => {
      this.loading = false
      console.log(r);
    })
  },
  
}
</script>

<style scoped>

</style>