<template>
  <div class="page">
    <div v-if="v">
      <!-- {{ videoSrc }} -->
      <video controls class="video-player" width="100%">
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <h2>{{ video.title }}</h2>
      <p>{{ video.description }}</p>
    </div>
    <p v-else>This video does not exist</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      video:null,
      URL:'',
      v:false
    };
  },
  computed: {
    videoSrc() {
      return `http://localhost:5000${this.URL}`;
    },
  },
  async mounted(){
    const id=this.$route.params.id;
    try{
      const response=await axios.get(`http://localhost:5000/api/image/${id}`);
      const {videoURL}=response.data
      console.log(response.data)
      console.log(response);
      this.URL = `\\${videoURL}`
      
      this.v=true;
      this.video=response.data

    }catch(err){
      console.log(err);
    }
  }
};
</script>
<style scoped>
.page{
  padding:30px;
  max-width:900px;
  margin:auto;
}
.video-player{
  width:100%;
  max-height: 500px;
  background:black;
  border-radius:12px;
}
h2 {
  margin-top: 20px;
}
</style>