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
      <label>Image</label>
      <input type="file" @change="handleFile" />
    </div>
    <div>
      <label>Video</label>
      <input type="file" accept="video/*" @change="handleVideo"/>
  
    </div>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button type="submit">Upload</button>
  </form>
</template>

<script>
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
        this.errorMessage='Please upload at leasr an image or a video.'
        return
      }
      if(this.video){
        const maxSize=50*1024*1024
        if(this.video.size>maxSize){
          this.errorMessage='Video size must be less than 50MB'
          return
        }
      }
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      if(this.selectedFile) formData.append('image', this.selectedFile)
      if(this.video) formData.append('video',this.video);
      try {
        const response = await fetch('http://localhost:5000/api/image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Upload failed')
        }

        this.message = data.message
        this.title = ''
        this.description = ''
        this.selectedFile = null,
        this.video=null
      } catch (err) {
        this.errorMessage = err.message
      }
    }
  }
}
</script>