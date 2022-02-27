<template>
  <div
    v-if="images.length > 0 || listing.is_my"
    class="row gx-0 gy-2 d-flex align-items-center justify-content-between"
  >
    <div
      class="
        col-6 col-md-auto
        order-2 order-md-1
        d-none d-sm-flex
        align-items-center
        justify-content-center
      "
    >
      <button
        type="button"
        class="btn transparent secondary-text no-text-shadow"
        @click="scrollToLeft()"
      >
        <span class="material-icons-round">arrow_back_ios</span>
      </button>
    </div>
    <div class="col-12 col-md-9 order-1 order-md-2">
      <div v-if="!fullSize" class="scroller" ref="scroller">
        <div
          v-if="listing.is_my"
          class="
            image
            box-69
            dash
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <input
            type="file"
            name="files"
            id="files"
            ref="files"
            class="input-file"
            multiple
            accept="image/*"
            @change="handleFiles"
          />
          <div class="d-block">
            <label class="btn transparent text-large" for="files">
              <span class="material-icons-round">add_a_photo</span>
            </label>
            <div class="text-very-small">
              <p>Добавить</p>
            </div>
          </div>
        </div>

        <div
          v-for="(image, index) in images"
          class="image box-69"
          :key="image.id"
        >
          <img
            :src="`https://aman3d.pythonanywhere.com/uploads/listings/${listing.id}/thumbnail_${image.id}`"
            alt=""
            @click="toggleFullSize(index)"
          />

          <!-- <a
            :href="`https://aman3d.pythonanywhere.com/uploads/listings/${listing.id}/full_${image.id}`"
            target="_blank"
          >
           
          </a> -->
        </div>
      </div>
      <div v-else class="full-image">
        <img
          :src="`https://aman3d.pythonanywhere.com/uploads/listings/${listing.id}/full_${images[fullImageIndex].id}`"
          alt=""
          @click="toggleFullSize(0)"
        />
      </div>
    </div>
    <div
      class="
        col-6 col-md-auto
        order-3 order-md-3
        d-none d-sm-flex
        align-items-center
        justify-content-center
      "
    >
      <button
        type="button"
        class="btn transparent secondary-text no-text-shadow"
        @click="scrollToRight()"
      >
        <span class="material-icons-round">arrow_forward_ios</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageScroller",
  data() {
    return {
      selectedFiles: null,
      fullSize: false,
      fullImageIndex: 0,
    };
  },
  props: {
    images: {
      type: Array,
    },
    listing: {
      type: Object,
    },
    handle: {
      type: Function,
    },
  },
  methods: {
    scrollToRight() {
      console.log(this.fullImageIndex);
      if (!this.fullSize) {
        this.$refs.scroller.scrollBy({
          left: 100,
          behavior: "smooth",
        });
      } else {
        this.fullImageIndex =
          this.fullImageIndex < this.images.length - 1
            ? this.fullImageIndex + 1
            : this.images.length - 1;
      }
    },
    scrollToLeft() {
      console.log(this.fullImageIndex);
      if (!this.fullSize) {
        this.$refs.scroller.scrollBy({
          left: -100,
          behavior: "smooth",
        });
      } else {
        this.fullImageIndex =
          this.fullImageIndex > 0 ? this.fullImageIndex - 1 : 0;
      }
    },
    toggleFullSize(imageIndex) {
      this.fullSize = !this.fullSize;
      this.fullImageIndex = imageIndex;
    },
    handleFiles() {
      this.files = this.$refs.files.files;
      this.$emit("on-files-change", this.files);
    },
  },
};
</script>

<style>
</style>