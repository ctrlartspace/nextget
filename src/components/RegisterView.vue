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
            <label for="display_name">Имя</label>
            <input
              type="text"
              id="display_name"
              v-model="registerData.display_name"
              placeholder=">"
            />
            <div class="offset-6px"></div>
            <label for="password">Придумайте пароль</label>
            <input
              type="password"
              id="password"
              v-model="registerData.password"
              placeholder=">"
            />
          </div>
          <div class="offset-6px"></div>
          <button
            type="submit"
            class="btn accent full-width"
            :disabled="isRequestNow"
          >
            <p>Создать аккаунт</p>
          </button>
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
        phone_number: "",
        display_name: "",
        password: "",
      },
      isRequestNow: false,
    };
  },
  computed: {
    formatPhone: {
      get: function () {
        return this.registerData.phone_number
          .toString()
          .replace(
            /\D*([0-9]{4})\D*([0-9]{3})\D*([0-9]{2})\D*([0-9]{2})\D*/,
            "$1 $2 $3 $4",
            "$1 $2 $3 $4"
          );
      },
      set: function (newValue) {
        this.registerData.phone_number = null;
        this.registerData.phone_number = +newValue.replaceAll(/\D/g, "");
        this.registerData.phone_number =
          this.registerData.phone_number.toString();
      },
    },
  },
  methods: {
    async register() {
      console.log(this.registerData);
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