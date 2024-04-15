<template>
  <div>
    <McvLoading v-if="isLoading" />
    <McvErrorMessage v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <McvTags :article="article" />
        </router-link>
      </div>
      <McvPagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { actionTypes } from "@/store/modules/feed.js";
  import McvPagination from "@/components/Pagination.vue";
  import { limit } from "@/helpers/vars.js";
  import McvLoading from "@/components/Loading.vue";
  import McvErrorMessage from "@/components/ErrorMessage.vue";
  import McvTags from "@/components/Tags.vue";
  import queryString from "query-string";
  export default {
    name: "McvFeed",
    props: {
      apiUrl: {
        type: String,
        required: true,
      },
    },
    components: { McvPagination, McvLoading, McvErrorMessage, McvTags },
    data() {
      return {
        limit,
      };
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.feed.isLoading,
        feed: (state) => state.feed.data, //здеь feed это дейта, немного переименовали для для удобства понимания в компоненте
        error: (state) => state.feed.error,
      }),
      currentPage() {
        return +this.$route.query.page || "1";
      },
      baseUrl() {
        return this.$route.path;
      },
      offset() {
        return (this.currentPage - 1) * this.limit;
      },
    },
    watch: {
      apiUrl: "fetchFeed", // Следим за изменением apiUrl и вызываем fetchFeed
      currentPage: "fetchFeed",
    },
    mounted() {
      this.fetchFeed();
    },
    methods: {
      fetchFeed() {
        const parsedUrl = queryString.parseUrl(this.apiUrl);
        // разложили текущий url
        const stringifiedParams = queryString.stringify({
          // добавили новые qury параметры
          limit: this.limit,
          offset: this.offset,
          ...parsedUrl.query,
        });
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`; // собрали нужную строку адреса с qury параметрами
        this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
      },
    },
  };
</script>
