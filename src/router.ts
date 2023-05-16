import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/login',
      component: Login,
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/login',
    // },
    {
      path: '/dokter/:id',
      component: () => import('./views/Dokter/index.vue'),
    }
  ],
})
