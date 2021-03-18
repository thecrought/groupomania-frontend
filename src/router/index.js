import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/CreatePost.vue'
import NewFeeds from '../views/NewFeeds.vue'
import EditPost from '../views/EditPost.vue'
import SinglePost from '../views/SinglePost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/newfeeds',
    name: 'NewFeeds',
    component: NewFeeds
  },
  {
    path: '/editpost/:id',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/singlepost/:id',
    name: 'SinglePost',
    component: SinglePost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
