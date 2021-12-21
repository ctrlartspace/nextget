<template>
  <div v-if="getListing" class="row my-0 gy-2 gx-2">
    <div class="col-md-6">
      <div class="padding colored rounded-top section">
        <div class="row gx-2">
          <div class="col-auto d-flex align-items-center">
            <div class="image box-48">
              <img
                :src="`https://www.tinygraphs.com/squares/${getListing.owner.phone}?theme=duskfalling&numcolors=3`"
              />
            </div>
          </div>
          <div class="col surface-text">
            <router-link :to="{ name: 'Item' }">
              <p>
                <strong>{{ getListing.owner.display_name }}</strong>
              </p>
            </router-link>
            <div class="d-inline">
              <div class="surface-text">
                <p>
                  <strong>
                    {{ (Math.random() * (3 - 5) + 5).toFixed(1) + " ★ " }}
                  </strong>
                </p>
              </div>
              <div class="secondary-text">
                <p>
                  {{
                    " на сайте с " +
                    getCreatedDate(getListing.owner.created_date)
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
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
        class="padding colored section no-border-bottom"
      >
        <div class="center">
          <div v-if="getListing.is_owner" class="accent-text">
            <p>
              <i
                >Загрузите фотографии, чтобы объявление стало доступно для
                других пользователей</i
              >
            </p>
          </div>
          <div v-else class="secondary-text">
            <p><i>Автор еще не добавил фотографии</i></p>
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
          <div v-if="isImageLoadingFailed" class="error-text">
            <p>
              <i
                >Произошла ошибка при загрузке файлов. Повторите попытку чуть
                позже</i
              >
            </p>
          </div>
          <button
            type="button"
            class="btn primary with-shadow"
            @click="uploadFiles()"
            :disabled="isImageLoadingProgress"
          >
            <span class="material-icons-round">upload</span>
            <p v-if="!isImageLoadingProgress">Загрузить: {{ files.length }}</p>
            <p v-else>Загрузка...</p>
          </button>
        </div>
      </div>
      <div
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
        <p>{{ getListing.description }}</p>
        <div class="offset-2px"></div>
        <p>Состояние: {{ getListing.condition_state.value }}</p>
        <p>Батарея: {{ getListing.battery_health }}%</p>
      </div>
      <div
        class="padding colored no-border-bottom section"
        :class="{ 'disabled-text': getListingImages.length == 0 }"
      >
        <h5>Дополнительная информация</h5>
        <div class="offset-2px"></div>
        <p>{{ getListing.equipment.value }}</p>
        <div class="offset-2px"></div>
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
                v-if="!isDeleteClicked"
                type="button"
                class="link error-text"
                @click="isDeleteClicked = true"
              >
                <p><i>Удалить</i></p>
              </button>
              <button
                v-if="isDeleteClicked"
                type="button"
                class="link error-text"
                @click="deleteListing()"
                :disabled="isDeleteRequestNow"
              >
                <p><i>Подтвердить удаление</i></p>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="padding colored rounded section">
        <div class="with-icon">
          <span class="material-icons-round">chat</span>
          <h5>Комменатарии</h5>
        </div>
        <div class="offset-6px"></div>
        <div class="line"></div>
        <div class="offset-6px"></div>
        <div class="secondary-text">
          <p>
            <i
              >Сообщения отключены пользователем
              {{ getListing.owner.display_name }}</i
            >
          </p>
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

export default {
  name: "Item",
  mixins: [conditionDecoder],
  data() {
    return {
      loading: false,
      isDeleteClicked: false,
      isDeleteRequestNow: false,
      files: null,
      isImageLoadingProgress: false,
      isImageLoadingFailed: false,
    };
  },
  computed: mapGetters(["getListing", "getListingImages"]),
  created() {
    this.$store.dispatch("fetchListing", this.$route.params.id).then((r) => {
      this.loading = false;
      console.log(r);
    });
  },
  methods: {
    deleteListing() {
      console.log(this.isDeleteRequestNow);
      this.isDeleteRequestNow = true;
      this.$store
        .dispatch("deleteListing", this.getListing.id)
        .then((r) => {
          this.$router.replace({
            name: "MyListings",
          });
          console.log(r);
          this.isDeleteRequestNow = false;
        })
        .catch((e) => {
          console.log(e);
          this.isDeleteRequestNow = false;
          this.isDeleteClicked = false;
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
      this.isImageLoadingProgress = true;
      this.isImageLoadingFailed = false;
      this.$store
        .dispatch("uploadImages", payloads)
        .then((r) => {
          this.isImageLoadingProgress = false;
          this.isImageLoadingFailed = false;
          this.files = null;
          console.log(r);
          this.$store.dispatch("fetchListingImages", this.$route.params.id);
        })
        .catch((e) => {
          this.isImageLoadingProgress = false;
          this.isImageLoadingFailed = true;
          console.log(e);
        });
    },
  },
  components: {
    ImageScroller,
  },
};
</script>

<style scoped>
</style>