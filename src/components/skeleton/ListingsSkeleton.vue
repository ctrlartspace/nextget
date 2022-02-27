<template>
  <div class="listing skeleton" v-for="index in 1" :key="index">
    <div class="row gx-2 d-flex justify-content-between">
      <div class="col-auto">
        <div
          class="image box-large"
        ></div>
      </div>
      <div class="col ellipsis">
        <div class="title" />
        <div class="offset-2px"></div>
        <div class="desc" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListingsSkeleton",
};
</script>

<style scoped>
</style>