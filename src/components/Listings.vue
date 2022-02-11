<template>
  <div class="listing" v-for="listing in listings" :key="listing.id">
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
        <div class="offset-2px"></div>
        <div class="d-inline">
          Состояние:
          <span :class="getConditionColor(listing.condition_state.id)">
            {{ listing.condition_state.value + " " }}
          </span>
          <span>
            {{ listing.battery_health + "% " }}
          </span>
        </div>
        <div class="offset-2px"></div>
        <div class="d-inline">
          <p>
            <span class="accent-text">
              <strong>
                {{ numberWithCommas(listing.price) + " KZT " }}
              </strong>
            </span>
            <span class="date secondary-text">
              {{ fromNow(listing.created_date) }}
            </span>
          </p>
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
  methods: {
    getConditionColor(condition) {
      switch (condition) {
        case 1:
          return "condition10";
        case 2:
          return "condition9";
        case 3:
          return "condition8";
        case 4:
          return "condition7";
        default:
          return "condition9";
      }
    },
  },
};
</script>

<style scoped>
</style>