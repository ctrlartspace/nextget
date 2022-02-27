<template>
  <div class="skeleton">
    <div class="padding colored rounded-top section">
      <UserViewSkeleton />
    </div>
    <div class="padding colored section">
      <div class="title"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
    </div>
    <div class="padding colored section no-border-bottom">
      <div class="image box-large"></div>
    </div>
    <div class="padding colored section no-border-bottom">
      <div class="title"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
      <div class="offset-2"></div>
      <div class="desc"></div>
    </div>
    <div class="padding colored rounded-bottom section">
      <div class="title"></div>
      <div class="offset-2"></div>
    </div>
  </div>
</template>

<script>
import UserViewSkeleton from "@/components/skeleton/UserViewSkeleton";
export default {
  name: "DropSkeleton",
  components: {
    UserViewSkeleton,
  },
};
</script>

<style>
</style>