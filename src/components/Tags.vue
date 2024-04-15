<template>
  <ul class="tag-list" v-if="article.tagList">
    <li
      v-for="tag in article.tagList"
      :key="tag"
      class="tag-default tag-pill tag-outline"
    >
      <router-link :to="{ name: 'article', params: { slug: article.slug } }">
        {{ tag }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "McvTags",
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
  };
</script>
