<template>
  <div class="row my-0 gy-2 gx-2">
    <div v-if="getListing" class="col-md-6">
      <div class="padding colored rounded-top section">
        <UserView :user="getListing.owner" />
      </div>
      <div
        class="padding colored section"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <h5>{{ getListing.product.name }}</h5>
        <div class="offset-2px"></div>
        <div class="secondary-text">
          <p>Год выпуска: {{ getListing.product.year.value }}</p>
          <p>Память: {{ getListing.storage.value }} GB</p>
          <p>Цвет: {{ getListing.color.value }}</p>
        </div>
      </div>
      <div
        v-if="getListingImages.length == 0"
        class="padding colored section"
        :class="{
          'no-border-bottom': getListing.is_owner,
          'rounded-bottom': !getListing.is_owner,
        }"
      >
        <div class="text-center">
          <div v-if="getListing.is_owner" class="accent-text">
            <p>
              <i
                >Загрузите фотографии, чтобы объявление стало доступно для
                других пользователей</i
              >
            </p>
          </div>
          <div v-else class="secondary-text">
            <p>
              <i>Ожидаем фотографии от автора объявления</i>
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="getListingImages.length > 0 || getListing.is_owner"
        class="padding colored section no-border-bottom"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <ImageScroller
          :images="getListingImages"
          :listing="getListing"
          @on-files-change="handleFiles"
        />

        <div v-if="files" class="offset-6px"></div>
        <div v-if="files" class="center">
          <div v-if="isRequest.uploadImage.error" class="error-text">
            <p>
              <i
                >Произошла ошибка при загрузке файлов. Повторите попытку чуть
                позже</i
              >
            </p>
          </div>
          <button
            type="button"
            class="btn primary with-shadow full-width"
            @click="uploadFiles()"
            :disabled="isRequest.uploadImage.loading"
          >
            <span class="material-icons-round">upload</span>
            <p v-if="!isRequest.uploadImage.loading">
              Загрузить: {{ files.length }}
            </p>
            <p v-else>Загрузка...</p>
          </button>
        </div>
      </div>
      <div
        v-if="getListingImages.length > 0 || getListing.is_owner"
        class="padding colored section no-border-bottom"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <div class="row gx-2 d-flex align-items-center">
          <div class="col">
            <h5>Описание</h5>
          </div>
          <div class="col-auto">
            <div v-if="getListing.is_owner">
              <button type="button" class="link secondary-text">
                <!-- <span class="material-icons-round">delete</span> -->
                <p>Редактировать</p>
              </button>
            </div>
          </div>
        </div>
        <div class="offset-2px"></div>
        <p>
          {{
            getListing.description ? getListing.description : "Нет повреждений"
          }}
        </p>
        <div class="offset-2px"></div>
        <p>Состояние: {{ getListing.condition_state.value }}</p>
        <p>Батарея: {{ getListing.battery_health }}%</p>
        <div class="offset-2px"></div>
        <p>В комплекте: {{ getListing.equipment.value }}</p>
        <div class="offset-6px"></div>
        <div class="secondary-text end">
          <p>
            <i>Опубликовано {{ formatDate(getListing.created_date) }}</i>
          </p>
        </div>
      </div>
      <div
        v-if="getListingImages.length > 0"
        class="padding colored section"
        :class="{
          'no-border-bottom': getListing.is_owner,
          'rounded-bottom': !getListing.is_owner,
        }"
      >
        <div class="row gx-2 d-flex align-items-center">
          <div class="col">
            <div class="accent-text mono">
              <h4>{{ numberWithCommas(getListing.price) }} KZT</h4>
            </div>
          </div>
          <div v-if="!getListing.is_owner" class="col-auto">
            <button type="button" class="btn secondary-text">
              <span class="material-icons-round">favorite</span>
            </button>
          </div>
          <div v-if="!getListing.is_owner" class="col-auto">
            <button type="button" class="btn accent with-shadow">
              <span class="material-icons-round">shopping_cart</span>
              <p>Купить</p>
            </button>
          </div>
          <div v-if="getListing.is_owner" class="col-auto">
            <button type="button" class="btn accent with-shadow">
              <span class="material-icons-round">autorenew</span>
              <p>Новая цена</p>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="getListing.is_owner"
        class="padding colored rounded-bottom section"
      >
        <div class="row gx-2 d-flex align-items-center center">
          <div class="col-auto d-flex align-items-center secondary-text">
            <p>
              <i>Уже не актуально? </i>
              <button
                v-if="!isClicked.deleteListing"
                type="button"
                class="link error-text"
                @click="isClicked.deleteListing = true"
              >
                <p><i>Удалить</i></p>
              </button>
              <button
                v-if="isClicked.deleteListing"
                type="button"
                class="link error-text"
                @click="deleteListing()"
                :disabled="isRequest.deleteListing.loading"
              >
                <p><i>Подтвердить</i></p>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-md-6">
      <DropSkeleton />
    </div>
    <div v-if="getListing" class="col-md-6">
      <div class="padding colored rounded section">
        <div class="with-icon">
          <span class="material-icons-round">comment</span>
          <h5>
            Сообщения{{
              getListingComments.length == 0
                ? ""
                : ": " + getListingComments.length
            }}
          </h5>
        </div>
        <div class="offset-6px"></div>
        <!-- <div class="line"></div> -->
        <!-- <div class="offset-6px"></div> -->
        <div v-if="getListingComments.length == 0" class="secondary-text">
          <p>
            <i>Возникли вопросы? Можете задать их тут</i>
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
            <div class="input-data">
              <textarea
                class="no-wrap"
                v-model="comment"
                placeholder="Напишите что-нибудь"
                rows="1"
              />
            </div>
          </div>
          <div class="col-auto">
            <button
              type="button"
              class="btn with-shadow"
              @click="sendComment"
              :disabled="isRequest.sendComment.loading"
            >
              <span class="material-icons-round">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import conditionDecoder from "@/services/condition-decoder";
import moment from "moment";
import ImageScroller from "@/components/ImageScroller";
import Comment from "@/components/Comment";
import UserView from "@/components/UserView";
import DropSkeleton from "@/components/DropSkeleton";

export default {
  name: "Item",
  mixins: [conditionDecoder],
  data() {
    return {
      files: null,
      comment: "",
      isClicked: {
        deleteListing: false,
      },
      isRequest: {
        deleteListing: {
          loading: false,
          error: false,
        },
        uploadImage: {
          loading: false,
          error: false,
        },
        sendComment: {
          loading: false,
          error: false,
        },
      },
    };
  },
  computed: mapGetters([
    "getListing",
    "getListingImages",
    "getListingComments",
  ]),
  created() {
    this.$store
      .dispatch("fetchListing", this.$route.params.id)
      .then(() => this.$store.dispatch("fetchComments", this.$route.params.id));
  },
  methods: {
    deleteListing() {
      this.isRequest.deleteListing.loading = true;
      this.isRequest.deleteListing.error = false;
      this.$store
        .dispatch("deleteListing", this.getListing.id)
        .then((r) => {
          this.$router.replace({
            name: "MyListings",
          });
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
          this.isRequest.deleteListing.error = true;
        })
        .finally(() => {
          this.isRequest.deleteListing.loading = false;
          this.isClicked.deleteListing = false;
        });
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).locale("ru").format("D MMM h:mm");
      }
    },

    handleFiles(files) {
      this.files = files;
    },
    uploadFiles() {
      const formData = new FormData();
      console.log(this.files);
      this.files.forEach((file) => {
        formData.append("files", file);
      });

      console.log(formData);
      const payloads = {
        id: this.$route.params.id,
        formData: formData,
      };
      this.isRequest.uploadImage.loading = true;
      this.isRequest.uploadImage.error = false;
      this.$store
        .dispatch("uploadImages", payloads)
        .then(() => {
          this.files = null;
          this.$store.dispatch("fetchListingImages", this.$route.params.id);
        })
        .catch((e) => {
          this.isRequest.uploadImage.error = true;
          console.log(e);
        })
        .finally(() => {
          this.isRequest.uploadImage.loading = false;
        });
    },
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
    ImageScroller,
    Comment,
    UserView,
    DropSkeleton,
  },
};
</script>

<style scoped>
</style>