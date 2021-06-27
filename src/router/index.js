import Vue from 'vue'
import VueRouter from 'vue-router'
import Operaciones from '@/views/operaciones'
import addOperacion from '@/views/operaciones/components/addOperation'
import Graficos from '@/views/graficos'
import Patrimonio from '@/views/patrimonio'
import login from '@/views/login'
import register from '@/views/register'
import forgotPass from '@/views/forgot-pass'
import contacto from '@/views/contacto'
import perfil from '@/views/perfil'
import guias from '@/views/guias'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Operaciones',
    component: Operaciones,
    meta: {
      auth: true
    },
  },
  {
    path: '/add-operation',
    name: 'Añadir Operacion',
    component: addOperacion,
    meta: {
      auth: true
    },
  },
  {
    path: '/charts',
    name: 'Graficos',
    component: Graficos,
    meta: {
      auth: true
    },
  },
  {
    path: '/patrimony',
    name: 'Patrimonio',
    component: Patrimonio,
    meta: {
      auth: true
    },
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: perfil,
    meta: {
      auth: true
    },
  },
  {
    path: '/guides',
    name: 'Guias',
    component: guias,
    meta: {
      auth: true
    },
  },
  {
    path: '/contact',
    name: 'Contacto',
    component: contacto
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/register',
    name: 'Register',
    component: register
  },
  {
    path: '/forgot-pass',
    name: 'ForgotPass',
    component: forgotPass
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login')
    return
  }
  next()
})

export default router
