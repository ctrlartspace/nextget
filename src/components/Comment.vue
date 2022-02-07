<template>
  <div class="comment">
    <div class="row gx-0">
      <div class="col">
        <p :class="{ 'accent-text': comment.owner.id == listingOwnerId }">
          <strong>{{ comment.owner.display_name + ": " }}</strong>
        </p>

        <p>{{ comment.text }}</p>
        <div class="offset-2px"></div>
        <div class="d-inline secondary-text">
          <p>{{ formatDate(comment.created_at) + " " }}</p>
          <div v-if="comment.is_owner">
            <button
              v-if="!isClicked.deleteComment"
              type="button"
              class="link secondary-text"
              @click="isClicked.deleteComment = true"
            >
              <p>Удалить</p>
            </button>
            <button
              v-if="isClicked.deleteComment"
              type="button"
              class="link error-text"
              @click="deleteComment(comment.id)"
              :disabled="isRequest.deleteComment.loading"
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
      isClicked: {
        deleteComment: false,
      },
      isRequest: {
        deleteComment: {
          loading: false,
          error: false,
        },
      },
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
      this.isRequest.deleteComment.loading = true;
      this.$store
        .dispatch("deleteComment", id)
        .then(() => {
          this.$emit("on-comment-delete", id);
        })
        .catch(() => {
          this.isClicked.deleteComment = false;
          this.isRequest.deleteComment.error = true;
        })
        .finally(() => {
          this.isRequest.deleteComment.loading = false;
        });
    },
  },
};
</script>

<style>
</style>