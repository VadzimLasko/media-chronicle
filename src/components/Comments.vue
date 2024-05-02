<template>
  <!-- Show this if this is not the current user -->
  <div v-if="!isCurrentUser" class="article-actions">
    <div class="article-meta">
      <p show-authed="false" style="display: inherit">
        <router-link :to="{ name: 'login' }"> Sign in </router-link>
        or
        <router-link :to="{ name: 'register' }"> sign up </router-link>to add
        comments on this article.
      </p>
    </div>
  </div>

  <!-- This is comment add form -->
  <div v-if="isCurrentUser" class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="addComment">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Write comment"
                  v-model="textComment"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-primary"
                >
                  Publish Comment
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
  <h3 class="comments__h3">Comments</h3>
  <McvLoading v-if="isLoading" />
  <McvErrorMessage v-if="error" />

  <!-- If there are no comments -->
  <div v-if="emptyCommets" class="comments__empty">No comments yet</div>

  <!-- Comments are displayed here -->
  <div v-if="reversedComments" class="comments__full">
    <div
      class="article-preview comment__area"
      v-for="(comment, index) in reversedComments"
      :key="index"
    >
      <div class="article-meta"><mcv-article-profile :data="comment" /></div>

      <div class="pull-xs-right">
        <button
          v-if="isAuthor"
          class="comment__btn-del"
          @click="deleteComment(comment.id)"
        >
          X
        </button>
      </div>
      <div class="preview-link">
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/comments.js";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvArticleProfile from "@/components/ArticleProfile.vue";
export default {
  name: "McvComments",
  props: {
    isAuthor: {
      type: Boolean,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    McvLoading,
    McvErrorMessage,
    McvArticleProfile,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.comments.isLoading,
      comments: (state) => state.comments.data,
      error: (state) => state.comments.error,
    }),
    emptyCommets() {
      return this.comments && this.comments.length === 0;
    },
    reversedComments() {
      if (this.comments) {
        return Object.values(this.comments).reverse();
      }
    },
    slug() {
      return this.$route.params.slug;
    },
  },
  data() {
    return {
      commentCount: 1,
      textComment: "",
    };
  },
  watch: {
    commentCount: "getComments",
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$store.dispatch(actionTypes.getComments, {
        slug: this.slug,
      });
      setTimeout(() => console.log("this.comments", this.comments), 2000);
    },
    deleteComment(idComment) {
      this.$store.dispatch(actionTypes.deleteComment, {
        slug: this.slug,
        idComment,
      });
      this.commentCount -= 1;
    },
    addComment() {
      this.$store.dispatch(actionTypes.createComment, {
        slug: this.$route.params.slug,
        commentInput: this.textComment,
      });
      this.commentCount += 1;
      this.textComment = "";
    },
  },
};
</script>

<style scoped>
.comment__area {
  width: 600px;
  padding: 25px;
  min-height: 130px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  margin-bottom: 1rem;
  position: relative;
}
.comment__btn-del {
  background-color: #e1b514;
  position: relative;
  top: -50px;
  right: 5px;
  border-radius: 40%;
  border-style: none;
  width: 25px;
  height: 25px;
}
.comments__empty {
  margin: 2rem auto;
  width: 600px;
  text-align: center;
}
.comments__full {
  margin: 2rem auto;
  width: 600px;
}
.comments__h3 {
  margin: 2rem auto;
  width: 500px;
  text-align: center;
}
</style>

<!-- "comment": {
  "id": 8158,
  "createdAt": "2024-04-30T08:51:35.929Z",
  "updatedAt": "2024-04-30T08:51:35.929Z",
  "body": "c hnmbhnm hg dtyhdygj dtyj t",
  "author": {
      "username": "m123y-user-name123233333",
      "bio": "12213",
      "image": "https://api.realworld.io/images/smiley-cyrus.jpeg",
      "following": false
  }
} -->

<!-- <div v-if="!emptyCommets">
  <div
    class="article-preview"
    v-for="(comment, index) in comments"
    :key="index"
  >
    {{ comment }}
    <button @click="deleteComment(comment.id)"></button>
  </div>
</div> -->
