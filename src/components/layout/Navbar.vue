<template>
  <div class="navbar">
    <nav class="orange lighten-1">
      <div class="nav-wrapper container">
        <router-link class="brand-logo" :to="{ name: 'GMap' }">
          <i class="material-icons red-text">location_on</i>Geolocation
        </router-link>
        <!-- <a href="#!" class="brand-logo">Geo Location</a> -->
        <a
          href="#"
          data-target="mobile-demo"
          class="sidenav-trigger"
          @click="sidebar"
        >
          <i class="material-icons">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="user">{{ user.email }}</li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li id="close" @click="closeSidebar">
        <a class="">
          <span class="center brand-logo">Geolocation</span>
          <i  class="material-icons orange-text right">close</i>
          </a>
      </li>
      <li v-if="user">
        <a>{{ user.email }}</a>
      </li>
      <li v-if="!user" @click="closeSidebar">
        <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
      </li>
      <li v-if="!user" @click="closeSidebar">
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </li>
      <li v-if="user" @click="closeSidebar">
        <a @click="logout">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
    sidebar() {
      document.getElementById("mobile-demo").style.transition = "all 0.5s";
      document.getElementById("mobile-demo").style.left = "315px";
    },
    closeSidebar() {
      document.getElementById("mobile-demo").style.left = "0";
    }
  },
  created() {
    //   let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style lang="">
#close {
  cursor: pointer;
}
.navbar{
  z-index: 2;
}
.navbar .brand-logo i {
  font-size: 42px;
  margin: 0;
}
.navbar .sidenav #close i{
  margin: 0;
}

@media only screen and (max-width: 600px) {
  .navbar .brand-logo i {
    font-size: 0;
  }
}
</style>
