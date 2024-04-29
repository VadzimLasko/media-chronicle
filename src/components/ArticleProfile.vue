<template>
  <span>
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
      >
        {{ article.author.username }}
      </router-link>

      <span class="date">{{ article.createdAt }}</span>
    </div>
  </span>
</template>

<script>
export default {
  name: "McvArticleProfile",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>
