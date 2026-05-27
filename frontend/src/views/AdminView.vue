<template>
  <section class="page">
    <h1>Pending Approval</h1>

    <div class="grid">
      <div v-for="image in images" :key="image.id" class="card">
        <img v-if="image.imageURL" :src="`${BASE_URL}/${image.imageURL}`" />
        <video
          v-if="image.videoURL"
          controls
          width="100%"
          :src="`${BASE_URL}/${image.videoURL}`"
        ></video>
        <h3>{{ image.title }}</h3>
        <p>{{ image.description }}</p>

        <button @click="approveImage(image.id)">Approve</button>
        <button @click="rejectImage(image.id)">Reject</button>
      </div>
    </div>
  </section>
</template>

<script>
import api, { BASE_URL } from "../services/axios";
export default {
  data() {
    return {
      images: [],
      BASE_URL,
    };
  },

  methods: {
    async getPendingImages() {
      const response = await api.get("/image/pending");
      this.images = response.data;
    },
    async approveImage(id) {
      await fetch(`http://localhost:5000/api/image/${id}/approve`, {
        method: "PATCH",
      });
      this.getPendingImages();
    },

    async rejectImage(id) { 
      await fetch(`http://localhost:5000/api/image/${id}/reject`,
       { method: 'PATCH' }) 
    this.getPendingImages() } 
  
  },

  mounted() {
    this.getPendingImages();
  },
};
</script>

<style scoped>
button {
  display: block;
  margin-top: 0.5rem;
  background-color: #222;
  color: white;
}
</style>