<template>
  <div class="row gx-2">
    <div class="col-auto d-flex align-items-center">
      <div class="image box-medium">
        <img
          :src="`https://www.tinygraphs.com/squares/${user.id}?theme=bythepool&numcolors=3&size=96`"
        />
      </div>
    </div>
    <div class="col">
      <p>
        <strong>{{ user.display_name }}</strong>
      </p>
      <div class="d-inline secondary-text">
        <p>
          <span class="surface-text">
            <strong>
              {{ (Math.random() * (3 - 5) + 5).toFixed(1) + " • " }}
            </strong>
          </span>
          {{ "на сайте с " + formatDateDay(user.created_date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "UserView",
  mixins: [conditionDecoder],
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style>
</style>