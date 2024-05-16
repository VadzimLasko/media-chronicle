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
          <form @submit.prevent="handleAddComment">
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
                  class="btn btn-lg pull-xs-right btn-primary colored"
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
  <div v-if="isEmptyComments" class="comments__empty">No comments yet</div>

  <!-- Comments are displayed here -->
  <div v-if="orderedComments" class="comments__full">
    <div
      class="article-preview comment__area"
      v-for="(comment, index) in orderedComments"
      :key="index"
    >
      <div class="article-meta"><mcv-article-profile :data="comment" /></div>

      <div class="pull-xs-right">
        <button
          v-if="isAuthor"
          class="comment__btn-del"
          @click="handleDeleteComment(comment.id)"
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
import { mapState, mapActions } from "vuex";
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
    isEmptyComments() {
      return this.comments && this.comments.length === 0;
    },
    orderedComments() {
      return this.comments
        ? [...this.comments].sort((a, b) => b.id - a.id)
        : [];
    },
    slug() {
      return this.$route.params.slug;
    },
  },
  data() {
    return {
      textComment: "",
    };
  },
  methods: {
    ...mapActions({
      fetchComments: actionTypes.getComments,
      removeComment: actionTypes.deleteComment,
      submitComment: actionTypes.createComment,
    }),
    handleDeleteComment(idComment) {
      this.removeComment({ slug: this.slug, idComment }).then((result) => {
        if (result) {
          this.fetchComments({ slug: this.slug });
        }
      });
    },
    handleAddComment() {
      this.submitComment({
        slug: this.slug,
        commentInput: this.textComment,
      }).then((comment) => {
        if (comment) {
          this.textComment = "";
          this.fetchComments({ slug: this.slug });
        }
      });
    },
  },
  created() {
    this.fetchComments({ slug: this.slug });
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
.colored {
  background-color: #b22cff !important;
  border-color: #b22cff !important;
}
.colored:focus {
  outline: none;
}
.colored:active {
  background-color: #9711d1 !important;
  border-color: #9711d1 !important;
}
</style>
