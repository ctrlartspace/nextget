<template>
  <div class="row my-0 gy-2 gx-2">
    <div v-if="getListing" class="col-12">
      <div class="padding colored rounded-top section">
        <UserView :user="getListing.owner" />
      </div>
      <div
        class="padding colored section"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <h5>{{ getListing.product.name }}</h5>
        <div class="offset-2"></div>
        <div class="secondary-text">
          <p>Год выпуска: {{ getListing.product.year.value }}</p>
          <p>Память: {{ getListing.storage.value }} GB</p>
          <p>Цвет: {{ getListing.color.value }}</p>
        </div>
      </div>
      <div
        v-if="getListingImages.length > 0 || getListing.is_my"
        class="padding colored section no-border-bottom"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <ImageScroller
          :images="getListingImages"
          :listing="getListing"
          @on-files-change="handleFiles"
        />

        <div v-if="files" class="offset-6"></div>
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
        class="padding colored section no-border-bottom"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <div class="row gx-3 gy-0">
          <div class="col d-flex justify-content-center">
            <div class="text-very-large bold">
              <p>{{ getListing.condition_state.value }}</p>
            </div>
          </div>
          <div class="col d-flex justify-content-center">
            <div class="text-very-large bold">
              <p>{{ getListing.battery_health }}%</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="getListingImages.length > 0 || getListing.is_my"
        class="padding colored section no-border-bottom"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <h5>Описание</h5>

        <div class="offset-2"></div>
        <p>
          {{
            getListing.description ? getListing.description : "Нет повреждений"
          }}
        </p>

        <p>В комплекте: {{ getListing.equipment.value }}</p>
        <div class="offset-6"></div>
        <div class="secondary-text text-very-small end">
          <p>
            {{ formatDate(getListing.created_date) }}
          </p>
        </div>
      </div>
      <div
        v-if="getListingImages.length > 0"
        class="padding colored section"
        :class="{
          'no-border-bottom': getListing.is_my,
          'rounded-bottom': !getListing.is_my,
        }"
      >
        <div class="row gx-2 d-flex align-items-center">
          <div
            v-if="isClicked.editPrice"
            class="col input-data input-price-edit"
          >
            <div class="text-very-large">
              <input
                ref="input"
                v-model="getCurrency"
                type="text"
                placeholder="Новая цена"
                step="5"
                pattern="[0-9]*"
                inputmode="numeric"
              />
            </div>
          </div>
          <div v-else class="col">
            <div class="accent-text mono">
              <h4>{{ numberWithCommas(getListing.price) }} KZT</h4>
            </div>
          </div>
          <div v-if="!getListing.is_my" class="col-auto">
            <button type="button" class="btn accent with-shadow">
              <span class="material-icons-round">east</span>
              <p>Принять</p>
            </button>
          </div>
          <div v-if="getListing.is_my" class="col-auto">
            <button
              v-if="isClicked.editPrice"
              type="button"
              class="btn primary with-shadow"
              @click="updatePrice()"
              :disabled="isRequest.editPrice.loading"
            >
              <span class="material-icons-round">done</span>
              <p>Готово</p>
            </button>
            <button
              v-else
              type="button"
              class="btn accent with-shadow"
              @click="(isClicked.editPrice = true), focusInput()"
            >
              <span class="material-icons-round">autorenew</span>
              <p>Новая цена</p>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="getListingImages.length == 0"
        class="padding colored section"
        :class="{
          'no-border-bottom': getListing.is_my,
          'rounded-bottom': !getListing.is_my,
        }"
      >
        <div class="text-center">
          <div v-if="getListing.is_my" class="error-text">
            <p>
              <i>Добавьте фотографии устройства</i>
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
        v-if="getListing.is_my"
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
    <div v-else class="col-12">
      <drop-skeleton />
    </div>
    <div v-if="getListing" class="col-12">
      <comments-block :comments="getListingComments" :listing="getListing" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import conditionDecoder from "@/services/condition-decoder";
import ImageScroller from "@/components/ImageScroller";
import CommentsBlock from "@/components/comments/CommentsBlock";
import UserView from "@/components/UserView";
import DropSkeleton from "@/components/skeleton/DropSkeleton";
const NumberFormat = new Intl.NumberFormat("ru-RU");

export default {
  name: "Item",
  mixins: [conditionDecoder],
  data() {
    return {
      files: null,
      newPrice: 0,
      isClicked: {
        editPrice: false,
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
        editPrice: {
          loading: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getListing", "getListingImages", "getListingComments"]),
    getCurrency: {
      get: function () {
        return this.newPrice == "" ? "" : NumberFormat.format(this.newPrice);
      },
      set: function (newValue) {
        this.newPrice = null;
        this.newPrice = +newValue.replaceAll(/\D/g, "");
      },
    },
  },
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
    updatePrice() {
      if (this.newPrice == 0 || this.newPrice == this.getListing.price) {
        this.isClicked.editPrice = false;
        return;
      }
      this.isRequest.editPrice.loading = true;
      const payloads = {
        id: this.getListing.id,
        price: this.newPrice,
      };
      this.$store
        .dispatch("updateListing", payloads)
        .then(() => {
          this.isClicked.editPrice = false;
        })
        .finally(() => {
          this.isRequest.editPrice.loading = false;
        });
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
    focusInput() {
      console.log("sdf");
      this.$nextTick(() => this.$refs.input.focus());
    },
  },
  components: {
    ImageScroller,
    CommentsBlock,
    UserView,
    DropSkeleton,
  },
};
</script>

<style scoped>
</style>