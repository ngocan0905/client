<template>
  <ClientLayout>
    <div class="w-1/2 my-10">
      <div class="flex" v-if="blogs" v-for="blog in blogs" :key="blog">
        <BlogPost :data="blog" />
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ClientLayout from "../layouts/ClientLayout.vue";
import { useBlogStore } from "../stores/blogStore.js";
import BlogPost from "../components/BlogPost.vue";
const blogStore = useBlogStore();
const blogs = ref([]);
onMounted(async () => {
  const data = await blogStore.getBlogs();
  blogs.value = data;
});
</script>
