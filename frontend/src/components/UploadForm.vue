<template>
  <form @submit.prevent="uploadImage" class="form">
    <div>
      <label>Title</label>
      <input type="text" v-model="title" />
    </div>

    <div>
      <label>Description</label>
      <textarea v-model="description"></textarea>
    </div>

    <div>
      <label>Thumbnail</label>
      <input type="file" @change="handleFile" class="file-upload"/>
    </div>
    <div>
      <label>Video</label>
      <input type="file" accept="video/*" @change="handleVideo" class="file-upload"/>
    </div>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button type="submit">Upload</button>
  </form>
</template>

<script>
import api from "../services/axios"
export default {
  data() {
    return {
      title: '',
      description: '',
      selectedFile: null,
      message: '',
      errorMessage: '',
      video:null
    }
  },

  methods: {
    handleFile(event) {
      this.selectedFile = event.target.files[0]
    },
    handleVideo(event){
      this.video=event.target.files[0];
    },
    async uploadImage() {
      this.message = ''
      this.errorMessage = ''

      const token = localStorage.getItem('token')

      if (!token) {
        this.errorMessage = 'Please login first.'
        this.$router.push('/login')
        return
      }

      if (!this.title || !this.description ) {
        this.errorMessage = 'Please fill all fields'
        return
      }
      if(!this.selectedFile && !this.video){
        this.errorMessage='Please upload at least an image or a video.'
        return
      }
      if(this.video){
        const maxSize=50*1024*1024
        if(this.video.size>maxSize){
          this.errorMessage='Video size must be less than 50MB'
          return
        }
      }
      if(this.video && !this.selectedFile){
        this.errorMessage='Please Upload a thumbnail for the Video in the image field'
        return
      }
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      if(this.selectedFile) formData.append('image', this.selectedFile)
      if(this.video) formData.append('video',this.video);
      try {
        const response=await api.post('/image',formData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )
        console.log(response.data)
        this.message = response.data.message
        this.title = ''
        this.description = ''
        this.selectedFile = null,
        this.video=null
      } catch (err) {
        this.errorMessage = err.response?.data?.message || err.message
      }
    }
  }
}
</script>
<style scoped>
label{
  display: block;
  width: 100%;
  font-weight: bold;
  margin-bottom: 0.5rem
  
}
input,textarea{
  display: block;
  width: 100%;
  padding: 0.15rem;
  height: 30px;
}
button{
  display: block;
  margin-top: 0.5rem;
  background-color: #222;
  color: white;
}

</style>