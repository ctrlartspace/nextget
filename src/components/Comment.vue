<template>
  <div class="comment">
    <div class="row gx-2">
      <!-- <div class="col-auto">
        <div class="image box-24">
          <img
            :src="`https://www.tinygraphs.com/squares/${comment.owner.id}?theme=duskfalling&numcolors=3&size=48`"
            alt="avatar"
          />
        </div>
      </div> -->
      <div class="col">
        <p :class="{ 'accent-text': comment.owner.id == listingOwnerId }">
          <strong>{{ comment.owner.display_name + ": " }}</strong>
        </p>

        <p>{{ comment.text }}</p>
        <div class="d-inline secondary-text">
          <p>{{ formatDate(comment.created_at) + " " }}</p>
          <div v-if="comment.is_owner">
            <button
              v-if="!isDeleteClicked"
              type="button"
              class="link secondary-text"
              @click="isDeleteClicked = true"
            >
              <p>Удалить</p>
            </button>
            <button
              v-if="isDeleteClicked"
              type="button"
              class="link error-text"
              @click="deleteComment(comment.id)"
              :disabled="isDeleteRequestNow"
            >
              <p>Подтвердить</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "Comment",
  data() {
    return {
      isDeleteClicked: false,
      isDeleteRequestNow: false,
    };
  },
  mixins: [conditionDecoder],
  props: {
    comment: {
      type: Object,
    },
    listingOwnerId: {
      type: Number,
    },
  },
  methods: {
    deleteComment(id) {
      console.log(this.isDeleteRequestNow);
      this.isDeleteRequestNow = true;
      this.$store
        .dispatch("deleteComment", id)
        .then(() => {
          this.$emit("on-comment-delete", id);
          this.isDeleteRequestNow = false;
        })
        .catch(() => {
          this.isDeleteRequestNow = false;
          this.isDeleteClicked = false;
        });
    },
  },
};
</script>

<style>
</style>