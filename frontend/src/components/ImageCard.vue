<template>
  <div class="card">
    <img v-if="image.imageURL" :src="imageSrc" @click="goToVideoPage"/>
    <h3>{{ image.title }}</h3>
    <p>{{ image.description }}</p>
    <small v-if="role==='admin'">Status: {{ image.status }}</small>
    <button v-if="role==='admin'" @click="deleteImage">Delete</button>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['image','role'],
  emits:["image-deleted"],
  computed: {
    imageSrc() {
      return `http://localhost:5000/${this.image.imageURL}`
    },
    videoSrc(){
      return `http://localhost:5000/${this.image.videoURL}`
    }
  },
  methods:{
    goToVideoPage(){
      this.$router.push(`/video/${this.image.id}`)
    },
    async deleteImage(){
      try{
        const response=await axios.delete(`http://localhost:5000/api/image/${this.image.id}`)
        console.log(response.data);
        this.$emit("image-deleted",this.image.id);
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>