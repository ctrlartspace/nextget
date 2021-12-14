<template>
  <div class="row my-0 gx-2 gy-2 justify-content-md-center">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <form @submit.prevent="signIn">
          <div class="center">
            <router-link :to="{ name: 'Home' }">
              <img class="logo" :src="GET_LOGO" alt="logo" />
            </router-link>
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="phone_number">Номер телефона</label>
            <input
              type="phone"
              id="phone_number"
              v-model="formatPhone"
              placeholder="+7"
            />
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="password">Пароль</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Пароль"
            />
          </div>
          <div class="offset-6px"></div>
          <router-link class="secondary-text center" :to="{ name: 'Register' }"
            ><p>Забыли пароль?</p></router-link
          >
          <div class="offset-8px"></div>
          <div class="input">
            <button
              type="submit"
              class="btn primary full-width"
              :disabled="isRequestNow"
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
      isRequestNow: false,
    };
  },
  computed: {
    ...mapGetters(["GET_LOGO"]),
    formatPhone: {
      get: function () {
        return '+' + this.phone_number.toString().replace(/\D*([0-9]{4})\D*([0-9]{3})\D*([0-9]{2})\D*([0-9]{2})\D*/, '$1 $2 $3 $4', '$1 $2 $3 $4');
      },
      set: function (newValue) {
        this.phone_number = null;
        this.phone_number = +newValue.replaceAll(/\D/g, "");
      },
    },
  },
  methods: {
    signIn() {
      this.isRequestNow = true;
      const auth = {
        username: this.phone_number,
        password: this.password,
      };
      this.$store
        .dispatch("login", auth)
        .then(() => {
          this.$router.replace({ name: "MyListings" });
          this.isRequestNow = false;
        })
        .catch((error) => {
          console.log(error);
          this.isRequestNow = false;
        });
      console.log(auth);
    },
  },
};
</script>

<style scoped>
</style>