<template>
  <div class="comment">
    <div class="row gx-0">
      <div class="col">
        <p :class="{ 'accent-text': comment.owner.id == listing.owner.id }">
          <strong>{{ comment.owner.display_name + ": " }}</strong>
        </p>
        <div class="offset-2px"></div>
        <p>{{ comment.text }}</p>

        <div v-if="comment.comment_type.id == 2">
          <div class="offset-2px"></div>
          <div class="padding light-accent rounded with-border">
            <p>
              <span class="accent-text">
                {{ comment.is_owner ? "Вы предложили" : "Предложил" }}
                <strong>{{ numberWithCommas(comment.offer) + " KZT " }}</strong>
              </span>
            </p>
            <div
              v-if="
                !comment.is_owner &&
                comment.owner.id != listing.owner.id &&
                comment.is_auth
              "
              class="offset-4px"
            ></div>
            <button
              v-if="
                !comment.is_owner &&
                comment.owner.id != listing.owner.id &&
                comment.is_auth
              "
              type="button"
              class="btn accent with-border no-text-shadow"
              @click="acceptOffer({ id: listing.id, price: comment.offer })"
            >
              <p>Принять</p>
            </button>
          </div>
        </div>
        <div v-if="comment.comment_type.id == 3">
          <div class="offset-2px"></div>
          <div class="padding light-primary rounded with-border">
            <p>
              <span class="primary-text">
                Новая цена
                <strong>{{ numberWithCommas(comment.offer) + " KZT " }}</strong>
              </span>
            </p>
          </div>
        </div>
        <div class="offset-2px"></div>
        <div class="d-inline secondary-text">
          <p>{{ fromNow(comment.created_at) + " " }}</p>
          <div v-if="comment.is_owner">
            <button
              v-if="!isClicked.deleteComment"
              type="button"
              class="link secondary-text"
              @click="isClicked.deleteComment = true"
            >
              <p>• Удалить</p>
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
    listing: {
      type: Object,
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
    acceptOffer(data) {
      this.$store
        .dispatch("updateListing", data)
        .then(() => {
          return this.$store.dispatch("fetchListing", this.$route.params.id);
        })
        .then(() =>
          this.$store.dispatch("fetchComments", this.$route.params.id)
        );
    },
  },
};
</script>

<style>
</style>