<template>
  <div class="login-container">
    <h1>Iniciar sesión</h1>
    <div class="login-error" v-if="errorLogin">Ha ocurrido un error al iniciar sesión, revisa que tus datos sean correctos.</div>
    <form @submit.prevent="login">
      <div>
        <v-text-field label="Nombre de usuario" name="email" v-model="email" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field label="Contraseña" type="password" name="password" v-model="password"></v-text-field>
      </div>
      <div class="btn-login">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>

      <div class="container-btn-register-forgot-pass">
        <div class="btn-registrarse"><span>¿No tienes cuenta?</span> <router-link to="/register">¡Crear una!</router-link></div>
        <div class="btn-forgot-pass"><router-link to="/forgot-pass">He olvidado la contraseña</router-link></div>
      </div>

      <button type="button" @click="logout()" v-if="isLogged">Logout</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/* eslint-disable */
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      rules: [(value) => !!value || "Requerido"],
      errorLogin: false,
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
          this.errorLogin = true;
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
.login-container {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 15%;
  padding-left: 15%;

  .login-error {
    font-size: 13px;
    text-align: center;
    color: $color-1;
    padding-top: 5px;
    padding-bottom: 10px;
  }

  h1 {
    margin-bottom: 0;
  }

  .btn-login {
    text-align: right;
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

    .btn-forgot-pass {
      text-align: center;
      a {
        color: $color-12;
      }
    }
  }
}
</style>
