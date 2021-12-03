<template>
  <div class="listing" v-for="listing in listings" :key="listing.id">
    <div class="row gx-2 d-flex justify-content-between">
      <div class="col-auto">
        <div class="square photo"></div>
      </div>
      <div class="col">
        <router-link :to="{ name: 'Item', params: { id: listing.id } }">
          {{
            listing.product.name +
            ", " +
            listing.storage.value +
            " GB, " +
            listing.color.value
          }}
        </router-link>
        <div class="offset-2px"></div>
        <p>
          <strong>{{ listing.owner.display_name + ", 92.4% " }}</strong
          >{{
            listing.description != "" ? listing.description : "Нет описания"
          }}
        </p>
        <div class="offset-2px"></div>
        <div class="row gx-1 gy-1 tags">
          <div class="col-auto">
            <div class="item accent-text">
              <p>{{ numberWithCommas(listing.price) }} KZT</p>
            </div>
          </div>
          <div class="col-auto">
            <div class="item">
              <span class="material-icons-round">bolt</span>
              <p>{{ listing.battery_health + "%" }}</p>
            </div>
          </div>
          <div class="col-auto">
            <div class="item">
              <span
                class="material-icons-round"
                :style="{
                  color: getCondition(listing.condition_state.id).color,
                }"
                >panorama_fish_eye</span
              >
              <div class="v-offset-2px"></div>
              <p>{{ listing.condition_state.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "Listings",
  mixins: [conditionDecoder],
  props: {
    listings: {
      type: Array,
    },
  },
};
</script>

<style scoped>
</style>