<template>
  <div class="view-profile container" id="container">
    <div v-if="profile" class="card">
      <h2 class="orange-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="orange-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment" />
          <p class="red-text feedback" v-if="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
    
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "ViewProfile",

  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    };
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null;
        db.collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now()
          })
          .then(() => {
            this.newComment = null;
          });
      } else {
        this.feedback = "You must enter a comment";
      }
    }
  },
  created() {
    let ref = db.collection("users");

    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });

    // profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });

    //   comments
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            });
          }
        });
      });
  }
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  max-width: 730px;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
}

.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}

.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.view-profile .comments {
  overflow-y: scroll;
  height: 480px;
}
/* label focus color */
input:focus + label {
  color: #ffa726 !important;
}

.comments::-webkit-scrollbar {
  width: 3px;
}
.comments::-webkit-scrollbar-track {
  background: #ddd;
}
.comments::-webkit-scrollbar-thumb {
  background: #ffa726;
}
/* label underline focus color */
input:focus {
  border-bottom: 1px solid #ffa726 !important;
  box-shadow: 0 1px 0 0 #ffa726 !important;
}

@media only screen and (max-width: 600px) {
  .view-profile #container {
    margin: 0 !important;
  }
}
</style>
