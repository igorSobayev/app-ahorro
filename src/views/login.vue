<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <v-text-field label="User Name" name="email" v-model="email" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field label="Password" type="password" name="password" v-model="password"></v-text-field>
      </div>

      <v-btn type="submit" depressed color="primary"> Login </v-btn>
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
      rules: [(value) => !!value || "Required.", (value) => (value && value.length >= 3) || "Min 3 characters"],
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
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
