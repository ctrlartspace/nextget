<template>
  <div class="bottom-nav padding surface with-border rounded-top">
    <div class="row gx-2 gy-2 d-flex justify-content-around">
      <div class="d-flex col-auto d-flex align-items-center">
        <router-link
          class="btn surface with-border no-text-shadow full-rounded"
          :to="{ name: 'Home' }"
        >
          <span class="material-icons-round">home</span>
        </router-link>
      </div>
      <div class="d-flex col-6 d-flex align-items-center">
        <router-link
          class="btn primary with-border no-text-shadow with-shadow full-width"
          :to="{ name: 'CreateListing' }"
        >
          <!-- <span class="material-icons-round">edit</span> -->
          <p>Создать</p>
        </router-link>
      </div>
      <div class="d-flex col-auto d-flex align-items-center">
        <router-link
          class="btn surface with-border no-text-shadow full-rounded"
          :to="{ name: 'MyListings' }"
        >
          <span class="material-icons-round">account_box</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBottom",
};
</script>

<style>
</style>