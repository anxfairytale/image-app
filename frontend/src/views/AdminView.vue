<template>
  <section class="page">
    <h1>Pending Images</h1>

    <div class="grid">
      <div v-for="image in images" :key="image.id" class="card">
        <img v-if="image.imageURL" :src="`http://localhost:5000/${image.imageURL}`" />
        <video v-if="image.videoURL" controls width="100%" :src="`http://localhost:5000/${image.videoURL}`"></video>
        <h3>{{ image.title }}</h3>
        <p>{{ image.description }}</p>

        <button @click="approveImage(image.id)">Approve</button>
        <button @click="rejectImage(image.id)">Reject</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: []
    }
  },

  methods: {
    async getPendingImages() {
      const response = await fetch('http://localhost:5000/api/image/pending')
      this.images = await response.json()
    },

    async approveImage(id) {
      await fetch(`http://localhost:5000/api/image/${id}/approve`, {
        method: 'PATCH'
      })

      this.getPendingImages()
    },

    async rejectImage(id) {
      await fetch(`http://localhost:5000/api/image/${id}/reject`, {
        method: 'PATCH'
      })

      this.getPendingImages()
    }
  },

  mounted() {
    this.getPendingImages()
  }
}
</script>