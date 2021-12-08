<template>
  <div class="row my-0 gx-2 gy-2 justify-content-md-center">
    <div class="col-md-4">
      <div class="padding colored rounded section">
        <form @submit.prevent="register">
          <div class="center">
            <h5>Регистрация</h5>
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="phone_number">Номер телефона</label>
            <input
              type="number"
              id="phone_number"
              v-model="registerData.phone"
              placeholder="7XXXXXXXXXX"
            />
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="display_name">Как Вас зовут?</label>
            <input
              type="text"
              id="display_name"
              v-model="registerData.display_name"
              placeholder="Ваше имя"
            />
          </div>
          <div class="offset-6px"></div>
          <div class="input-data">
            <label for="password">Придумайте пароль</label>
            <input
              type="password"
              id="password"
              v-model="registerData.password"
              placeholder="Пароль"
            />
          </div>
          <div class="offset-8px"></div>
          <div class="input-data">
            <button
              type="submit"
              class="btn accent full-width"
              :disabled="isRequestNow"
            >
              Создать аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      registerData: {
        phone: "",
        display_name: "",
        password: "",
      },
      isRequestNow: false,
    };
  },
  methods: {
    async register() {
      this.isRequestNow = true;
      this.$store
        .dispatch("register", this.registerData)
        .then(() => {
          this.$router.replace({ name: "Login" });
          this.isRequestNow = false;
        })
        .catch(() => {
          this.isRequestNow = false;
        });
    },
  },
};
</script>

<style scoped>
</style>