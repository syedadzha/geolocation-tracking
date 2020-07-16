<template>
  <div class="signup container">
    <div :class="load_state" class="orange lighten-2">
      <div class="indeterminate orange darken-2"></div>
    </div>
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center orange-text lighten-1">Sign Up</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
        <p class="red-text feedback" v-if="feedback">{{ feedback }}</p>
      </div>
      <div class="field center">
        <button class="btn orange lighten-1">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
      load_state: ""
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.load_state = "progress";
        this.feedback = null;
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        let checkAlias = firebase.functions().httpsCallable("checkAlias");
        checkAlias({ slug: this.slug }).then(result => {
          if (!result.data.unique) {
            this.feedback = "This alias already exists";
            this.load_state = "";
          } else {
            db.collection("users")
              .doc(this.slug)
              .set({ alias: this.alias, geolocation: null })
              .then(() => {
                return firebase
                  .auth()
                  .createUserWithEmailAndPassword(this.email, this.password);
              })
              .then(cred => {
                return db
                  .collection("users")
                  .doc(this.slug)
                  .update({
                    user_id: cred.user.uid
                  });
              })
              .then(() => {
                this.$router.push({ name: "GMap" });
              })
              .catch(err => {
                this.feedback = err.message;
                this.load_state = "";
              });
          }
        });
      } else {
        this.feedback = "Please fill in all fields";
        this.load_state = "";
      }
    }

    // signup() {
    //   if (this.alias && this.email && this.password) {
    //     this.load_state = "progress";
    //     this.feedback = null;
    //     this.slug = slugify(this.alias, {
    //       replacement: "-",
    //       remove: /[$*_+~.()'"!\-:@]/g,
    //       lower: true
    //     });
    //     let ref = db.collection("users").doc(this.slug);
    //     ref.get().then(doc => {
    //       if (doc.exists) {
    //         this.feedback = "This alias already exists";
    //         this.load_state = "";
    //       } else {
    //         ref
    //           .set({ alias: this.alias, geolocation: null })
    //           .then(() => {
    //             return firebase
    //               .auth()
    //               .createUserWithEmailAndPassword(this.email, this.password);
    //           })
    //           .then(cred => {
    //             return ref.update({
    //               user_id: cred.user.uid
    //             });
    //           })
    //           .then(() => {
    //             this.$router.push({ name: "GMap" });
    //           })
    //           .catch(err => {
    //             this.feedback = err.message;
    //             this.load_state = "";
    //           });
    //       }
    //     });
    //   } else {
    //     this.feedback = "Please fill in all fields";
    //     this.load_state = "";
    //   }
    // }
  }
};
</script>

<style>
.signup {
  max-width: 450px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin: 16px;
}
.signup .feedback {
  margin: 0;
}
.signup form {
  margin-top: 0;
}
.progress {
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
