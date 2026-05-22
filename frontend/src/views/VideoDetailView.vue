<template>
  <section class="page">
    <div v-if="image">
      <video
        v-if="image.videoURL"
        :src="videoSrc"
        controls
        autoplay
        width="100%"
      ></video>

      <img
        v-else-if="image.imageURL"
        :src="imageSrc"
        width="100%"
      />

      <h2>{{ image.title }}</h2>
      <p>{{ image.description }}</p>
      <small>Status: {{ image.status }}</small>
    </div>

    <p v-else>Loading...</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: null
    }
  },

  computed: {
    videoSrc() {
      return `http://localhost:5000/${this.image.videoURL}`
    },
    imageSrc() {
      return `http://localhost:5000/${this.image.imageURL}`
    }
  },

  async mounted() {
    const id = this.$route.params.id
    const response = await fetch(`http://localhost:5000/api/image/${id}`)
    this.image = await response.json()
  }
}
</script>