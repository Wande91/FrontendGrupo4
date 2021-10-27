import { createRouter, createWebHashHistory } from 'vue-router'
import App            from './App.vue'

import Departamentos  from './components/departamentos.vue'
import DepVistas      from './components/depVista.vue'

import Municipios     from './components/municipios.vue'
import munVistas      from './components/munVista.vue'

import Asociaciones   from './components/asociaciones.vue'
import asoVistas      from './components/asoVista.vue'

import Resguardos     from './components/resguardos.vue'
import resVistas      from './components/resVista.vue'

import Registro       from './components/registro.vue'
import Ingresar       from './components/ingreso.vue'
import Perfil         from './components/usuario.vue'


const routes = [

  {
    path: '/',
    name: 'app',
    component: App,
    redirect: 'ingresar'
  },
  {
    path: '/ingresar',
    name: 'ingresar',
    component: Ingresar
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil
  },
  {
    path: '/departamento',
    name: 'departamentos',
    component: Departamentos
  },
  {
    path: '/depvista',
    name: 'depVista',
    component: DepVistas
  },
  {
    path: '/municipio',
    name: 'municipios',
    component: Municipios
  },
  {
    path: '/munvista',
    name: 'munVista',
    component: munVistas
  },
  {
    path: '/resguardo',
    name: 'resguardos',
    component: Resguardos
  },
  {
    path: '/resvista',
    name: 'resVista',
    component: resVistas
  },
  {
    path: '/asociacion',
    name: 'asociaciones',
    component: Asociaciones
  },
  {
    path: '/asovista',
    name: 'asoVista',
    component: asoVistas
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
