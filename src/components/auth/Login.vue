<template>
  <div class="login container">
    <div :class="load_state" class="orange lighten-2">
      <div class="indeterminate orange darken-2"></div>
    </div>
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center orange-text lighten-1">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
        <p class="red-text feedback" v-if="feedback">{{ feedback }}</p>
      </div>
      <div class="field center">
        <button class="btn orange lighten-1">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      load_state: ""
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.load_state = "progress";
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.load_state = "";
            this.$router.push({ name: "GMap" });
          })
          .catch(err => {
            this.feedback = err.message;
            this.load_state = "";
          });
        this.feedback = null;
      } else {
        this.feedback = "Please fill in all fields";
        this.load_state = "";
      }
    }
  }
};
</script>

<style>
.login {
  max-width: 450px;
  margin-top: 60px;
}
.login form {
  margin-top: 0;
}
.progress {
  margin: 0;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin: 16px;
}
.login .feedback {
  margin: 0;
}
/* label focus color */
input:focus + label {
  color: #ffa726 !important;
}
/* label underline focus color */
input:focus {
  border-bottom: 1px solid #ffa726 !important;
  box-shadow: 0 1px 0 0 #ffa726 !important;
}
</style>
