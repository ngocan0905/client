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
        v-for="blog in listBlog"
        :key="blog._id"
        class="py-2 px-4 border-b grid grid-cols-12 text-lg"
      >
        <ListBlogPost :data="blog" @deleteBlog="deleteBlog" />
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import ListBlogPost from "../components/ListBlogPost.vue";
import { useBlogStore } from "../stores/blogStore";
import { useGeneralStore } from "../stores/generalStore";
const blogStore = useBlogStore();
const generalStore = useGeneralStore();
const listBlog = ref([]);
onMounted(async () => {
  listBlog.value = await blogStore.getBlogs();
});
const deleteBlog = async (blogId) => {
  try {
    generalStore.isLoading = true;
    const deleted = await blogStore.deleteBlog(blogId);
    if (deleted) {
      const updatedBlog = listBlog.value.filter((blog) => blog._id !== blogId);
      listBlog.value = updatedBlog;
      generalStore.isLoading = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
