<template>
  <div class="listing" v-for="listing in listings" :key="listing.id">
    <div class="row gx-2 d-flex justify-content-between">
      <div class="col-auto">
        <div class="square photo">
          
        </div>
      </div>
      <div class="col">
        <router-link :to="{ name: 'Item', params: { id: listing.id } }">
          {{ listing.product.name + ', ' + listing.storage.value + ' GB, ' + listing.color.value }}
        </router-link>
        <div class="offset-s"></div>
        <div class="info">
          <p><strong>{{ listing.owner.display_name + ', 92.4% '}}</strong>{{ listing.description != '' ?  listing.description : 'Нет описания'}}</p>
        </div>
        <div class="offset-s"></div>
        <div class="row gx-1 gy-1 tags">
          <div class="col-auto">
            <div class="item accent-text">
              <p>{{ numberWithCommas(listing.price) }} KZT</p>
            </div>
          </div>
          <div class="col-auto">
            <div class="item">
              <span class="material-icons-round">battery_std</span>
              <p>{{ listing.battery_health + '%' }}</p>
            </div>
          </div>
          <div class="col-auto">
            <div class="item" :style="{ color: getCondition(listing.condition_state.id).color }">
              <span  class="material-icons-round">perm_device_information</span>
              <p>{{ listing.condition_state.value }}</p>
            </div>
          </div>
        </div>
      </div>
      
		</div>
  </div>

</template>

<script>
import conditionDecoder from '@/services/condition-decoder'

export default {
	name: 'Listings',
	mixins: [conditionDecoder],
	props: {
		listings: {
			type: Array
		}
	}
}
</script>

<style scoped>

</style>