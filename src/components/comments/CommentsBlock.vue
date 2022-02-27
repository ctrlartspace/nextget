<template>
  <div class="padding colored rounded section">
    <div class="with-icon">
      <span class="material-icons-round">comment</span>
      <h5>
        Комментарии
        <span class="secondary-text">
          {{ comments.length == 0 ? "" : comments.length }}
        </span>
      </h5>
    </div>
    <div class="offset-6px"></div>
    <div v-if="comments.length == 0" class="secondary-text">
      <p>
        Здесь вы можете:<br />
        • предложить свою цену<br />
        • попросить добавить новые фото<br />
        • задать уточняющие вопросы
      </p>
    </div>
    <div>
      <comment
        v-for="comment in comments"
        :comment="comment"
        @on-comment-delete="deleteComment"
        @on-offer-accept="acceptOffer"
        :key="comment.id"
      />
    </div>

    <div class="offset-6px"></div>
    <div class="row gx-2 gy-0 d-flex align-items-center">
      <div class="col">
        <div v-if="!offer.isActive" class="input-data">
          <textarea
            class="no-wrap"
            v-model="comment"
            placeholder="Сообщение"
            rows="1"
          />
        </div>
        <div v-else class="input-data input-price">
          <input
            type="text"
            v-model="getOffer"
            placeholder="Предложите цену"
            step="5"
            pattern="[0-9]*"
            inputmode="numeric"
          />
        </div>
      </div>

      <div class="col-auto">
        <button
          v-if="!offer.isActive && !listing.is_my"
          type="button"
          class="btn accent with-border"
          @click="offer.isActive = !offer.isActive"
        >
          <span class="material-icons-round">local_offer</span>
        </button>
        <button
          v-if="offer.isActive && !listing.is_my"
          type="button"
          class="btn surface with-border"
          @click="offer.isActive = !offer.isActive"
        >
          <span class="material-icons-round">textsms</span>
        </button>
      </div>
      <div class="col-auto">
        <button
          type="button"
          class="btn primary with-border full-rounded"
          @click="addComment"
          :disabled="isRequest.sendComment.loading"
        >
          <span class="material-icons-round">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comments/Comment";
const NumberFormat = new Intl.NumberFormat("ru-RU");

export default {
  name: "CommentsBlock",
  props: {
    comments: {
      type: Object,
    },
    listing: {
      type: Object,
    },
  },
  data() {
    return {
      comment: "",
      offer: {
        isActive: false,
        value: 0,
      },
      isRequest: {
        sendComment: {
          loading: false,
          error: false,
        },
      },
    };
  },
  computed: {
    getOffer: {
      get: function () {
        return this.offer.value == ""
          ? ""
          : NumberFormat.format(this.offer.value);
      },
      set: function (newValue) {
        this.offer.value = null;
        this.offer.value = +newValue.replaceAll(/\D/g, "");
      },
    },
  },
  methods: {
    addComment() {
      if (!(this.comment.length > 0 || this.offer.value > 0)) return;
      const payloads = {
        id: this.$route.params.id,
        comment: {
          text: this.comment,
          offer: this.offer.value,
          comment_type_id:
            this.offer.value > 0
              ? 2
              : 1 /* если есть предложенная цена, ставим типа 2 (offer)*/,
        },
      };
      this.isRequest.sendComment.loading = true;
      this.$store
        .dispatch("addComment", payloads)
        .then(() => {
          this.comment = "";
          this.offer.isActive = false;
          this.offer.value = 0;
        })
        .finally(() => {
          this.isRequest.sendComment.loading = false;
        });
    },
    deleteComment(id) {
      console.log(id);
      this.$store.dispatch("deleteComment", id)
    },
    acceptOffer(offer) {
      const payloads = {
        id: this.listing.id,
        price: offer,
      };
      console.log(payloads);
      this.$store.dispatch("updateListing", payloads)

    },
  },
  components: {
    Comment,
  },
};
</script>

<style>
</style>