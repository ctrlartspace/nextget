<template>
  <div class="padding colored rounded section">
    <div class="with-icon">
      <span class="material-icons-round">comment</span>
      <h5>
        Комментарии{{
          getListingComments.length == 0
            ? ""
            : " (" + getListingComments.length + ")"
        }}
      </h5>
    </div>
    <div class="offset-6px"></div>
    <div v-if="getListingComments.length == 0" class="secondary-text">
      <p>
        <strong>Здесь вы можете:</strong><br />
        • предложить свою цену<br />
        • попросить добавить новые фото<br />
        • задать уточняющие вопросы
      </p>
    </div>
    <div>
      <Comment
        v-for="comment in getListingComments"
        :comment="comment"
        :listing-owner-id="getListing.owner_id"
        @on-comment-delete="onCommentDelete"
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
            placeholder="Предложить цену"
            step="5"
            pattern="[0-9]*"
            inputmode="numeric"
          />
        </div>
      </div>
      <div class="col-auto">
        <button
          v-if="!offer.isActive"
          type="button"
          class="btn accent with-border"
          @click="offer.isActive = !offer.isActive"
        >
          <span class="material-icons-round">local_offer</span>
        </button>
        <button
          v-else
          type="button"
          class="btn with-border"
          @click="offer.isActive = !offer.isActive"
        >
          <span class="material-icons-round">textsms</span>
        </button>
      </div>
      <div class="col-auto">
        <button
          type="button"
          class="btn primary with-border full-rounded"
          @click="sendComment"
          :disabled="isRequest.sendComment.loading"
        >
          <span class="material-icons-round">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Comment from "@/components/Comment";
const NumberFormat = new Intl.NumberFormat("ru-RU");

export default {
  name: "CommentBlock",
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
    ...mapGetters(["getListing", "getListingComments"]),
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
    sendComment() {
      if (this.comment.length == 0) return;
      const payloads = {
        id: this.$route.params.id,
        comment: { text: this.comment },
      };
      this.isRequest.sendComment.loading = true;
      this.$store
        .dispatch("addComment", payloads)
        .then(() => {
          this.comment = "";
          return this.$store.dispatch("fetchComments", this.$route.params.id);
        })
        .finally(() => {
          this.isRequest.sendComment.loading = false;
        });
    },
    onCommentDelete(id) {
      console.log("deleted comment: " + id);
      this.$store.dispatch("fetchComments", this.$route.params.id);
    },
  },
  components: {
    Comment,
  },
};
</script>

<style>
</style>