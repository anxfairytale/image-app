<template>
  <section class="page">
    <h1>Approved Images</h1>

    <div class="grid">
      <ImageCard
        v-for="image in images"
        :key="image.id"
        :image="image" :role="role" @image-deleted="removeImage"
      />
    </div>
  </section>
</template>

<script>
import ImageCard from '../components/ImageCard.vue'

export default {
  components: {
    ImageCard
  },
  created(){
    const token=localStorage.getItem('token');
    if(token){
      const payload=JSON.parse(atob(token.split(".")[1]))
      this.role=payload.role;
    }
  },
  data() {
    return {
      images: [],
      role:null
    }
  },
  methods:{
    removeImage(id){
      this.images=this.images.filter(image=>image.id!==id);
    }
  },
  async mounted() {
    const response = await fetch('http://localhost:5000/api/image/approved')
    this.images = await response.json()
  }
}
</script>