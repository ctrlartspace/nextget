<template>
  <div class="comment">
    <div class="row gx-2 gy-0">
      <div class="col-auto">
        <p :class="{ 'accent-text': comment.listing.is_owner == true }">
          <strong>
            {{ comment.is_my ? "Вы" : comment.owner.display_name }}
          </strong>
        </p>
      </div>
      <div
        v-if="comment.owner.role.id > 1"
        class="col d-flex justify-content-end primary-text"
      >
        <p>{{ comment.owner.role.name }}</p>
      </div>
    </div>

    <div class="offset-2"></div>
    <p>{{ comment.text }}</p>

    <div v-if="comment.comment_type.id == 2">
      <div class="offset-2"></div>
      <div class="padding light-accent rounded with-border">
        <p>
          <span class="accent-text">
            {{ comment.is_my ? "Вы предложили" : "Предложил" }}
            <strong>{{ numberWithCommas(comment.offer) + " KZT " }}</strong>
          </span>
        </p>
        <div v-if="comment.listing.is_my">
          <div class="offset-4"></div>
          <request-layer
            ask-confirm
            action="updateListing"
            :payloads="{ id: comment.listing.id, price: comment.offer }"
            #="{ isConfirmed, isLoading, makeRequest }"
          >
            <button
              type="button"
              class="btn accent with-border no-text-shadow"
              :disabled="isLoading"
              @click="makeRequest"
            >
              <p>{{ isConfirmed ? "Подтвердить" : "Принять" }}</p>
            </button>
          </request-layer>
        </div>
      </div>
    </div>
    <div v-if="comment.comment_type.id == 3">
      <div class="offset-2"></div>
      <div class="padding light-primary rounded with-border">
        <p>
          <span class="primary-text">
            Новая цена
            <strong>{{ numberWithCommas(comment.offer) + " KZT " }}</strong>
          </span>
        </p>
      </div>
    </div>
    <div class="offset-2"></div>
    <div class="d-inline secondary-text">
      <p>{{ fromNow(comment.created_at) + " " }}</p>
      <div v-if="comment.is_my">
        <p>•{{ " " }}</p>
        <request-layer
          ask-confirm
          action="deleteComment"
          :payloads="{ id: comment.id }"
          #="{ isConfirmed, isLoading, makeRequest }"
        >
          <button
            type="button"
            class="link secondary-text"
            :class="{ 'error-text': isConfirmed }"
            @click="makeRequest"
            :disabled="isLoading"
          >
            <p>{{ isConfirmed ? "Подтвердить" : "Удалить" }}</p>
          </button>
        </request-layer>
      </div>
    </div>
  </div>
</template>

<script>
import RequestLayer from "@/components/ui/RequestLayer";
import conditionDecoder from "@/services/condition-decoder";

export default {
  name: "Comment",
  data() {
    return {
      isClicked: {
        deleteComment: false,
      },
    };
  },
  mixins: [conditionDecoder],
  props: {
    comment: {
      type: Object,
    },
  },
  components: {
    RequestLayer,
  },
};
</script>

<style>
</style>