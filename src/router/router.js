import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/login.vue'
import Cookies from 'js-cookie'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      /*component: NotFound */
    },
    {
      name: 'Login',
      path: '/',
      component: Login
    },
    {
        name: 'Register',
        path: '/login/register',
        component: () => import('../view/register.vue')
      },
      {
        name: 'Admin_main',
        path: '/admin_main',
        component: () => import('../view/admin_main.vue'),
        // meta: { requiresAuth: true }
      },
      {
        name: 'User_main',
        path: '/user_main',
        component: () => import('../view/user_main.vue'),
        // meta: { requiresAuth: true }
      }, 
      {
        name: 'User_wating',
        path: '/user_waiting',
        component: () => import('../view/user_wating.vue'),
        // meta: { requiresAuth: true }
      }, 
    
  ]
});

 router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!token) {
      alert("No esta registrado por favor registrese")
      next({ name: 'Login' });
    } else {
    
      next();
    }
  } else {
    next();
  }
}); 


export default router