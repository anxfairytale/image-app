<template>
  <div>
     <nav v-if="isLoggedIn">
    <router-link to="/home">Home</router-link>
    <router-link to="/upload" v-if="role==='user'">Upload</router-link>
    <router-link to="/admin" v-if="role==='admin'">Admin</router-link>
    <button @click="logout">Logout</button>
  </nav>

  <router-view @login-success="checkLogin" />
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      role:null
    }
  },

  methods: {
    getRoleFromToken(){
      const token=localStorage.getItem('token')
      if(!token) return null
      try{
        const payload=JSON.parse(atob(token.split('.')[1]))
        return payload.role
      }catch(err){ return null}
    },
    checkLogin() {
      this.isLoggedIn = !!localStorage.getItem('token')
      this.role=this.getRoleFromToken()
    },

    logout() {
      localStorage.removeItem('token')
      this.isLoggedIn = false
      this.role=null
      this.$router.push('/login')
    }
  },

  mounted() {
    this.checkLogin()
  }
}
</script>
