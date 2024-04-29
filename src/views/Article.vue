<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <mcv-article-profile :article="article" />
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
      <McvErrorMessage v-if="isLoading" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <McvTags :article="article" />
          <hr />
          <!-- Footer -->
          <div class="article-actions">
            <div class="article-meta">
              <mcv-article-profile :article="article" />

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
      </div>
    </div>
    <!-- Comments -->
    <McvComments :is-author="isAuthor" />
    <!-- <McvCraeteComment /> -->
    <!-- To do 1) Человеческая дата 2) Коментарии 3) воозможность удалять коментарии -->
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div show-authed="true" style="display: none">
          <list-errors from="$ctrl.commentForm.errors" class="ng-isolate-scope"
            ><ul class="error-messages ng-hide" ng-show="$ctrl.errors">
              <!-- ngRepeat: (field, errors) in $ctrl.errors -->
            </ul>
          </list-errors>
          <form
            class="card comment-form ng-pristine ng-valid"
            ng-submit="$ctrl.addComment()"
          >
            <div class="card-block">
              <textarea
                class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="Write a comment..."
                rows="3"
                ng-model="$ctrl.commentForm.body"
              >
              </textarea>
            </div>
            <div class="card-footer">
              <img class="comment-author-img" />
              <button class="btn btn-sm btn-primary" type="submit">
                Post Comment
              </button>
            </div>
          </form>
        </div>

        <p show-authed="false" style="display: inherit">
          <a ui-sref="app.login" href="#/login">Sign in</a> or
          <a ui-sref="app.register" href="#/register">sign up</a> to add
          comments on this article.
        </p>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import { actionTypes as articleActionTypes } from "@/store/modules/article.js";
import { getterTypes as authGetterTypes } from "@/store/modules/auth.js";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvTags from "@/components/Tags.vue";
import McvArticleProfile from "@/components/ArticleProfile.vue";
import McvAddToFavorites from "@/components/AddToFavorites.vue";
import McvAddToFollow from "@/components/AddToFollow.vue";
import McvComments from "@/components/Comments.vue";
import McvCraeteComment from "@/components/CraeteComment.vue";
  name: "McvArticleView",
  components: {
    McvLoading,
    McvErrorMessage,
    McvTags,
    McvArticleProfile,
    McvAddToFavorites,
    McvAddToFollow,
    McvComments,
    McvCraeteComment,
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
  },
  mounted() {
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
          this.$route.push({ name: "globalFeed" });
        });
    },
  },
</script>
