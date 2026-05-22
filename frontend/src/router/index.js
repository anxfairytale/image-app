import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UploadView from '../views/UploadView.vue'
import AdminView from '../views/AdminView.vue'
function getUserRole(){
    const token=localStorage.getItem('token')
    if(!token) return null
    try{
        const payload= JSON.parse(atob(token.split('.')[1]))
        return payload.role
    }catch(err){
        return null
    }
}
const routes = [
  { path: '/', redirect:'/login' },
  { path: '/login', component: LoginView },
  { path: '/home',component:HomeView, meta:{requiresAuth:true}},
  { path: '/upload', component: UploadView, meta:{requiresAuth:true,role:'user'}},
  { path: '/admin', component: AdminView ,meta:{requiresAuth:true, role:'admin'}},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
    const token=localStorage.getItem('token')
    const role=getUserRole()
    if(to.meta.requiresAuth && !token){
        return next('/login')
    }
    if(to.meta.role && to.meta.role!==role){
        if(role==='admin'){
            return next('/admin')
        }
        if(role==='user'){
            return next('/home')
        }
        return next('/login')
    }
    next()
})
export default router