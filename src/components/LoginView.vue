<template>
  <div class="row my-0 gx-2 gy-2 justify-content-md-center">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <form @submit.prevent="signIn">
          <div class="center">
            <h5>Авторизация</h5>
          </div>
          <div class="offset-6px"></div>
          <div v-if="isRequest.login.error" class="help-label error">
            <span class="material-icons-round">priority_high</span>
            <div class="v-offset-2px"></div>
            <p>Неверный логин или пароль</p>
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="phone_number">Номер телефона</label>
            <div class="d-flex align-items-center secondary-text mono">
              <p>+7</p>
              <div class="v-offset-2px"></div>
              <input
                type="phone"
                id="phone_number"
                v-model="formatPhone"
                placeholder="000 000 00 00"
              />
            </div>

            <div class="offset-6px"></div>

            <label for="password">Пароль</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder=">"
            />

            <div class="offset-6px"></div>
            <router-link
              class="secondary-text center"
              :to="{ name: 'Register' }"
              ><p>Забыли пароль?</p></router-link
            >
            <div class="offset-8px"></div>

            <button
              type="submit"
              class="btn primary full-width"
              :disabled="isRequest.login.loading"
            >
              <p>Вход</p>
            </button>
          </div>
          <div class="offset-6px"></div>
          <router-link class="secondary-text center" :to="{ name: 'Register' }"
            ><p>Создать аккаунт</p></router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      phone_number: "",
      password: "",
      session_url: "login",
      isRequest: {
        login: {
          loading: false,
          error: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["GET_LOGO"]),
    formatPhone: {
      get: function () {
        return this.phone_number
          .toString()
          .replace(
            /\D*([0-9]{3})\D*([0-9]{3})\D*([0-9]{2})\D*([0-9]{2})\D*/,
            "$1 $2 $3 $4",
            "$1 $2 $3 $4"
          );
      },
      set: function (newValue) {
        this.phone_number = null;
        this.phone_number = +newValue.replaceAll(/\D/g, "");
      },
    },
  },
  methods: {
    signIn() {
      this.isRequest.login.loading = true;
      this.isRequest.login.error = false;
      const auth = {
        username: this.phone_number,
        password: this.password,
      };
      this.$store
        .dispatch("login", auth)
        .then(() => {
          this.$router.replace({ name: "MyListings" });
        })
        .catch((error) => {
          console.log(error);
          this.isRequest.login.error = true;
        })
        .finally(() => {
          this.isRequest.login.loading = false;
        });
      console.log(auth);
    },
  },
};
</script>

<style scoped>
</style>