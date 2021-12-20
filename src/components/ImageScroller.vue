<template>
  <div v-if="images.length > 0 || listing.is_owner" class="row gx-0 gy-2 d-flex align-items-center justify-content-between">
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
        class="btn transparent secondary-text"
        @click="scrollToLeft()"
      >
        <span class="material-icons-round">arrow_back_ios</span>
      </button>
    </div>
    <div class="col-12 col-md-9 order-1 order-md-2">
      <div class="scroller" ref="scroller">
        <div
          v-if="listing.is_owner"
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
          <label class="btn transparent text-large" for="files">
            <span class="material-icons-round">add_a_photo</span>
          </label>
        </div>

        <div v-for="image in images" class="image box-69" :key="image.id" @click="onImageClick(image.id)">
           <img
              :src="`https://aman3d.pythonanywhere.com/uploads/listings/${listing.id}/thumbnail_${image.id}`"
              alt=""
            />
          <!-- <a
            :href="`https://aman3d.pythonanywhere.com/uploads/listings/${listing.id}/full_${image.id}`"
            target="_blank"
          >
           
          </a> -->
        </div>
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
        class="btn transparent secondary-text"
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
      selectedFiles: null
    }
  },
  props: {
    images: {
      type: Array,
    },
    listing: {
      type: Object,
    },
    handle: {
      type: Function
    }
  },
  methods: {
    scrollToRight() {
      this.$refs.scroller.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    },
    scrollToLeft() {
      this.$refs.scroller.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    },
    onImageClick(id) {
      console.log(id)
    },
    handleFiles() {
      this.files = this.$refs.files.files
      this.$emit('on-files-change', this.files)
    }
  },
};
</script>

<style>
</style>