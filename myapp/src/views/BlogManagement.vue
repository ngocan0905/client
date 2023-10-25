<template>
  <AdminLayout>
    <div>
      <div class="grid grid-cols-12 my-4">
        <div
          class="col-span-3 border-2 border-gray-800 text-lg font-semibold mx-4 px-4 py-2 rounded text-center"
        >
          Blog Total : {{ listBlog.length }}
        </div>
      </div>
      <div
        v-for="cate in listBlog"
        :key="cate._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListBlogPost :data="cate" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListBlogPost from "../components/ListBlogPost.vue";
import { useBlogStore } from "../stores/blogStore";
const blogStore = useBlogStore();
const listBlog = ref([]);
onMounted(async () => {
  listBlog.value = await blogStore.getBlogs();
});
</script>
