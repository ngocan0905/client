<template>
  <ClientLayout>
    <div class="min-h-screen flex justify-center">
      <div class="mt-24" v-for="blog in blogs" :key="blog">
        <BlogPost :blog="blog" />
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
  blogs.value = await blogStore.getAllBlogs();
});
</script>
