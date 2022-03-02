<template>
  <div class="d-inline">
    <slot
      :isConfirmed="isConfirmed"
      :isLoading="isLoading"
      :makeRequest="makeRequest"
    ></slot>
  </div>
</template>

<script>
export default {
  name: "RequestLayer",
  props: {
    askConfirm: {
      type: Boolean,
    },
    action: {
      type: String
    },
    payloads: {
      type: Object
    }
  },
  data() {
    return {
      isConfirmed: false,
      isLoading: false,
    };
  },
  methods: {
    makeRequest() {
      if (this.askConfirm && !this.isConfirmed) {
        this.isConfirmed = true;
        return;
      }

      this.isLoading = true;
      this.$store
        .dispatch(this.action, this.payloads)
        .then(() => {
          this.$emit("onComplete");
        })
        .catch(() => {
          this.$emit("onError");
        })
        .finally(() => {
          this.isLoading = false;
          this.isConfirmed = false;
        });
    },
  },
};
</script>

<style>
</style>