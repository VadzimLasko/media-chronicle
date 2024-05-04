<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <mcv-article-profile :data="article" />

          <!-- This is not Author -->
          <span v-if="!isAuthor">
            <mcv-add-to-follow
              :is-followed="isFollowed"
              :profile-slug="article.author.username"
            />
            <mcv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
              message="Favorite Article"
            />
          </span>

          <!-- This is Author -->
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :style="{ 'margin-right': '1rem ' }"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i>
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <McvLoading v-if="isLoading" />
      <McvErrorMessage v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <McvTags :article="article" />
          <hr />
        </div>
      </div>
    </div>

    <!-- Comments -->
    <div v-if="article">
      <McvComments :is-author="isAuthor" :is-current-user="isCurrentUser" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvTags from "@/components/Tags.vue";
import McvArticleProfile from "@/components/ArticleProfile.vue";
import McvAddToFavorites from "@/components/AddToFavorites.vue";
import McvAddToFollow from "@/components/AddToFollow.vue";
import McvComments from "@/components/Comments.vue";
import { actionTypes as articleActionTypes } from "@/store/modules/article.js";
import { getterTypes as authGetterTypes } from "@/store/modules/auth.js";

export default {
  name: "McvArticleView",
  components: {
    McvLoading,
    McvErrorMessage,
    McvTags,
    McvArticleProfile,
    McvAddToFavorites,
    McvAddToFollow,
    McvComments,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.data,
      error: (state) => state.article.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
    isFollowed() {
      return this.article.author.following;
    },
    isCurrentUser() {
      return Boolean(this.currentUser && this.currentUser.length != 0);
    },
  },

  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$store.dispatch(articleActionTypes.getArticle, {
        slug: this.$route.params.slug,
      });
    },
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
};
</script>
