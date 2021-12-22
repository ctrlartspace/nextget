<template>
  <div class="comment" v-for="comment in comments" :key="comment.id">
    <div class="row gx-2">
      <div class="col-auto">
        <div class="image box-24">
          <img
            :src="`https://www.tinygraphs.com/squares/${comment.owner.id}?theme=duskfalling&numcolors=3&size=24`"
            alt="avatar"
          />
        </div>
      </div>
      <div class="col">
        <p>
          <strong>{{ comment.owner.display_name + ": " }}</strong>
        </p>

        <p>{{ comment.text }}</p>
        <div class="d-inline secondary-text">
          <p>{{ formatDate(comment.created_at) + " " }}</p>
          <!-- <div v-if="comment.is_owner">
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
              class="link secondary-text"
              @click="deleteComment(comment.id)"
              :disabled="isDeleteRequestNow"
            >
              <p>Удалить</p>
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "Comments",
  data() {
    return {
      isDeleteClicked: false,
      isDeleteRequestNow: false,
    };
  },
  mixins: [conditionDecoder],
  props: {
    comments: {
      type: Array,
    },
  },
  methods: {
    deleteComment(id) {
      console.log(this.isDeleteRequestNow);
      this.isDeleteRequestNow = true;
      this.$store
        .dispatch("deleteComment", id)
        .then(() => {
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