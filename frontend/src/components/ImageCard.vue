<template>
  <div>
      <base-dialog v-if="showDialog"
      @confirm="deleteImage"
      @cancel="showDialog=false"></base-dialog>
    <div class="card">
      <img v-if="image.imageURL" :src="imageSrc" @click="goToVideoPage" />
      <h3>{{ image.title }}</h3>
      <p>{{ image.description }}</p>
      <small v-if="role === 'admin'">Status: {{ image.status }}</small>
      <button v-if="role === 'admin'" @click="showDialog=true">Delete</button>
    </div>
    </div>
</template>

<script>
import api,{BASE_URL} from "../services/axios.js";
import BaseDialog from "./BaseDialog.vue";
export default {
  components: { BaseDialog },
  props: ["image", "role"],
  emits: ["image-deleted"],
  data(){
    return{
      showDialog:false
    }
  },
  computed: {
    imageSrc() {
      return `${BASE_URL}/${this.image.imageURL}`;
    },
    videoSrc() {
      return `${BASE_URL}/${this.image.videoURL}`;
    },
  },
  methods: {
    goToVideoPage() {
      this.$router.push(`/video/${this.image.id}`);
    },
    async deleteImage() {
      try {
        const response = await api.delete(
          `/image/${this.image.id}`
        );
        console.log(response.data);
        this.$emit("image-deleted", this.image.id);
      } catch (err) {
        console.log(err);
      }
    },
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