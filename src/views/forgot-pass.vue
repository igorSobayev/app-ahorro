<template>
  <div class="forgot-pass-container">
    <h1>Recuperar contraseña</h1>
    <form @submit.prevent="login">
      <div>
        <v-text-field label="Email" name="email" v-model="email" :rules="rules" hide-details="auto"></v-text-field>
      </div>
      <div class="btn-login">
        <button type="submit" class="btn btn-primary">Recuperar</button>
      </div>

      <div class="container-btn-register-forgot-pass">
        <div class="btn-registrarse"><span>¿No tienes cuenta?</span> <router-link to="/register">¡Crear una!</router-link></div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/* eslint-disable */
export default {
  name: "ForgotPass",
  data() {
    return {
      email: "",
      password: "",
      rules: [(value) => !!value || "Requerido"],
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_BASE_API_CONNECTION);
  },
  computed: {
    ...mapGetters(["isLogged"]),
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Operaciones" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.forgot-pass-container {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 15%;
  padding-left: 15%;

  h1 {
    margin-bottom: 0;
    width: 80%;
    text-align: center;
    line-height: 40px;
  }

  .btn-login {
    text-align: right;
    margin-top: 20px;
  }

  .container-btn-register-forgot-pass {
    margin-top: 30px;

    .btn-registrarse {
      margin-bottom: 10px;
      text-align: center;

      a {
        color: $color-11;
      }
    }
  }
}
</style>
