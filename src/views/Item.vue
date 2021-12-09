<template>
  <div v-if="getListing" class="row my-0 gy-2 gx-2">
    <div class="col-md-6">
      <div class="padding colored rounded-top section">
        <div class="row gx-2">
          <div class="col-auto d-flex align-items-center">
            <div class="square avatar">
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
      <div class="padding colored section">
        <h5>{{ getListing.product.name }}</h5>
        <div class="offset-2px"></div>
        <div class="secondary-text">
          <p>Год выпуска: {{ getListing.product.year.value }}</p>
          <p>Память: {{ getListing.storage.value }} GB</p>
          <p>Цвет: {{ getListing.color.value }}</p>
        </div>
      </div>
      <div class="padding colored section no-border-bottom">
        <div
          class="
            row
            gx-0
            gy-2
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <div
            class="
              col-6 col-md-auto
              order-2 order-md-1
              d-none d-sm-flex
              align-items-center
              justify-content-center
            "
          >
            <button
              type="button"
              class="btn transparent secondary-text"
              @click="scrollToLeft()"
            >
              <span class="material-icons-round">arrow_back_ios</span>
            </button>
          </div>
          <div class="col-12 col-md-9 order-1 order-md-2">
            <div class="scroller" ref="scroller">
              <div
                v-if="getListing.is_owner"
                class="image d-flex align-items-center justify-content-center"
              >
                <input
                  type="file"
                  name="files"
                  id="files"
                  ref="files"
                  class="input-file"
                  multiple
                  accept="image/*"
                  @change="handleFilesUpload"
                />
                <label class="btn" for="files">
                  <span class="material-icons-round">add_a_photo</span>
                </label>
              </div>

              <div v-for="index in 7" class="image" :key="index">
                <a href="https://via.placeholder.com/1500" target="_blank">
                  <!-- <img src="https://via.placeholder.com/1280x720" alt=""/>-->
                </a>
              </div>
            </div>
          </div>
          <div
            class="
              col-6 col-md-auto
              order-3 order-md-3
              d-none d-sm-flex
              align-items-center
              justify-content-center
            "
          >
            <button
              type="button"
              class="btn transparent secondary-text"
              @click="scrollToRight()"
            >
              <span class="material-icons-round">arrow_forward_ios</span>
            </button>
          </div>
        </div>
        <div v-if="files" class="offset-6px"></div>
        <div v-if="files" class="center">
          <button type="button" class="btn primary" @click="submitFiles()">
            <span class="material-icons-round">upload</span>
            <p>Загрузить {{ "(" + files.length + ")" }}</p>
          </button>
        </div>
      </div>
      <div class="padding colored section no-border-bottom">
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
      <div class="padding colored no-border-bottom section">
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
            <button type="button" class="btn accent">
              <span class="material-icons-round">shopping_cart</span>
              <p>Купить</p>
            </button>
          </div>
          <div v-if="getListing.is_owner" class="col-auto">
            <button type="button" class="btn accent">
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

export default {
  name: "Item",
  mixins: [conditionDecoder],
  data() {
    return {
      loading: false,
      isDeleteClicked: false,
      isDeleteRequestNow: false,
      files: null,
    };
  },
  computed: mapGetters(["getListing"]),
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
    scrollToRight() {
      this.$refs.scroller.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    },
    scrollToLeft() {
      this.$refs.scroller.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
    submitFiles() {
      const formData = new FormData();
      console.log(this.files);
      for (var i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        console.log(file);
        formData.append("files[" + i + "]", file);
      }
    },
  },
};
</script>

<style scoped>
</style>