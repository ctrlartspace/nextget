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
      type: String,
    },
    payloads: {
      type: Object,
    },
  },
  data() {
    return {
      isConfirmed: false,
      isLoading: false,
      isFailed: false,
    };
  },
  methods: {
    makeRequest() {
      this.$emit("onBefore");

      if (this.askConfirm && !this.isConfirmed) {
        this.isConfirmed = true;
        return;
      }

      console.log(this.payloads);
      if (this.payloads.valid != null && !this.payloads.valid) {
        this.isConfirmed = false;
        this.isLoading = false;
        this.isFailed = true;
        this.$emit("onError");
        this.$emit("onComplete");
        console.warn("valid failed");
        return;
      }

      this.isFailed = false;
      this.isLoading = true;

      delete this.payloads.valid; // удаляем потому что не проходит валидация marshamllow
      this.$store
        .dispatch(this.action, this.payloads)
        .then((r) => {
          this.$emit("onSuccess");
          console.log(r)
        })
        .catch((e) => {
          this.$emit("onError");
          this.isFailed = true;
          console.log(e)
        })
        .finally(() => {
          this.$emit("onComplete");
          this.isConfirmed = false;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>