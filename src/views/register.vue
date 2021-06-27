<template>
  <div class="register-container">
    <h1>Formulario de registro</h1>
    <form @submit.prevent="registrarse">
      <div>
        <v-text-field label="Nombre *" name="nombre" v-model="nombre" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field label="Email *" type="email" name="email" v-model="email" :rules="rules" hide-details="auto"></v-text-field>
        <div class="pass-match" v-if="!passMatch">Las contraseñas no coinciden</div>
        <v-text-field label="Contraseña *" type="password" name="password" :rules="rules" v-model="password" hide-details="auto"></v-text-field>
        <v-text-field label="Repetir contraseña *" type="password" name="password2" :rules="rules" v-model="password2" hide-details="auto"></v-text-field>
      </div>
      <div class="create-acc">
        <button type="submit" class="btn btn-primary">Crear cuenta</button>
      </div>

      <div class="container-btn-login">
        <div class="btn-registrarse"><span>¿Ya tienes cuenta?</span> <router-link to="/login">¡Inciar sesión!</router-link></div>
      </div>
    </form>

    <adviceAction v-model="showAdvice" :title="dialogTitle" :text="dialogText" :type="dialogType" :time="15" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adviceAction from "@/components/adviceAction";

/* eslint-disable */
export default {
  name: "Register",
  components: { adviceAction },
  data() {
    return {
      email: "",
      nombre: "",
      password: "",
      password2: "",
      passMatch: true,
      rules: [(value) => !!value || "Requerido"],
      showAdvice: false,
      dialogTitle: "",
      dialogText: "",
      dialogType: "success",
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_BASE_API_CONNECTION);
  },
  computed: {
    ...mapGetters(["isLogged"]),
  },
  watch: {
    password(newOne, oldOne) {
      if (newOne !== "" && this.password2 !== "" && newOne !== this.password2) {
        this.passMatch = false;
      } else {
        this.passMatch = true;
      }
    },
    password2(newOne, oldOne) {
      if (newOne !== "" && this.password !== "" && newOne !== this.password) {
        this.passMatch = false;
      } else {
        this.passMatch = true;
      }
    },
  },
  methods: {
    registrarse() {
      if (!this.passMatch || this.email === "" || this.nombre === "") return;
      console.log("REGISTRANDOSE");
      this.$store
        .dispatch("user/register", {
          email: this.email,
          password: this.password,
          name: this.nombre,
        })
        .then((res) => {
          if (res !== 200) {
            this.showAdvice = true;
            this.dialogTitle = "¡Ha ocurrido un error!";
            this.dialogText = "Algo no ha ido bien al crearse la cuenta, comprueba que el correo electrónico no tenga ya asociada una cuenta";
            this.dialogType = "fail";
          } else {
            this.showAdvice = true;
            this.dialogTitle = "¡Ya casi lo tienes!";
            this.dialogText = "Para poder iniciar sesión, necesitas confirmar el correo mediante el enlace que se te ha enviado ahora.";
            this.dialogType = "success";
            // this.$router.push({ name: "Operaciones" });
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 15000);
          }
        })
        .catch((err) => {
          this.showAdvice = true;
          this.dialogTitle = "¡Ha ocurrido un error!";
          this.dialogText = "Algo no ha ido bien al crearse la cuenta";
          this.dialogType = "fail";
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
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

  .create-acc {
    margin-top: 15px;
    text-align: right;
  }

  .pass-match {
    margin-top: 15px;
    margin-bottom: 5px;
    color: $color-1;
  }

  .container-btn-login {
    margin-top: 20px;
  }
}
</style>

<style lang="scss"></style>
