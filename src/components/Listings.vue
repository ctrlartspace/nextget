<template>
  <div class="listing" v-for="listing in listings" :key="listing.id">
    <!-- <div class="date secondary-text">
      <p>{{ formatDate(listing.created_date) }}</p>
    </div> -->
    <div class="offset-2px"></div>
    <div class="row gx-2 d-flex justify-content-between">
      <div class="col-auto">
        <div
          class="image box-69 d-flex align-items-center justify-content-center"
          :class="{ 'with-border': listing.images.length == 0 }"
        >
          <img
            v-if="listing.images.length > 0"
            :src="`https://aman3d.pythonanywhere.com/uploads/listings/${listing.id}/thumbnail_${listing.images[0].id}`"
            alt=""
          />
          <div v-else class="transparent secondary-text text-large">
            <span class="material-icons-round">no_photography</span>
          </div>
        </div>
      </div>
      <div class="col ellipsis">
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
        <div class="d-inline">
          <p>
            <span class="surface-text">
              <strong>
                {{
                  (Math.random() * (3 - 5) + 5).toFixed(1) +
                  " • " +
                  listing.owner.display_name +
                  ": "
                }}
              </strong>
            </span>
            {{
              listing.description != ""
                ? listing.description
                : "Нет повреждений"
            }}
          </p>
        </div>
        <div class="offset-8px"></div>
        <div class="row gx-2 tags surface-text d-flex align-items-center">
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
              >
                panorama_fish_eye
              </span>
              <div class="v-offset-2px"></div>
              <p>{{ listing.condition_state.value }}</p>
            </div>
          </div>
          <!-- <div class="col-auto ms-auto ">
            <div class="date secondary-text">
              <p>{{ formatDate(listing.created_date) }}</p>
            </div>
          </div> -->
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