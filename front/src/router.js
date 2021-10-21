import { createRouter, createWebHashHistory } from 'vue-router'
import App                                    from './App.vue'

import Login                                  from './components/Login.vue'
import Registrar                              from './components/Registrar.vue'
import DepGe                                  from './components/DepGe.vue'
import DepVista                               from './components/DepVista.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App 
  },

  {
    path: '/user/login',
    name: "login",
    component: Login
  },

  {
    path: '/registro',
    name: "registrar",
    component: Registrar
  },

  {
    path: '/Departamento',
    name: "depge",
    component: DepGe

  },

  {
    path: '/Departamento/Ver',
    name: "depvista",
    component: DepVista
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
