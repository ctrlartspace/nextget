<template>
  <div class="row my-0 gx-2 gy-2 justify-content-md-center">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <form @submit.prevent="signIn">
          <div class="center">
            <h5>Авторизация</h5>
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="phone_number">Номер телефона</label>
            <input
              type="number"
              id="phone_number"
              v-model="login"
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
          <router-link :to="{ name: 'Register' }">Забыли пароль?</router-link>
          <div class="offset-8px"></div>
          <div class="input">
            <button
              type="submit"
              class="btn primary full-width"
              :disabled="loading"
            >
              Вход
            </button>
          </div>
          <div class="offset-6px"></div>
          <router-link :to="{ name: 'Register' }">Создать аккаунт</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      login: "",
      password: "",
      session_url: "login",
      loading: false,
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      const auth = {
        username: this.login,
        password: this.password,
      };
      this.$store
        .dispatch("login", auth)
        .then(() => {
          this.$router.replace({ name: "MyListings" });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
      console.log(auth);
    },
  },
};
</script>

<style scoped>
</style>