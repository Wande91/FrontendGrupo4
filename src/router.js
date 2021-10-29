import { createRouter, createWebHashHistory } from 'vue-router'
import App            from './App.vue'

import Departamentos  from './components/departamentos.vue'
import DepVistas      from './components/depVista.vue'
import crearDepto     from './components/crearDepto.vue'

import Municipios     from './components/municipios.vue'
import munVistas      from './components/munVista.vue'
import crearMuni     from './components/crearMuni.vue'

import Asociaciones   from './components/asociaciones.vue'
import asoVistas      from './components/asoVista.vue'
import crearAso     from './components/crearAso.vue'

import Resguardos     from './components/resguardos.vue'
import resVistas      from './components/resVista.vue'
import crearRes     from './components/crearRes.vue'

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
    path: '/depvista/:id',
    name: 'depVista',
    component: DepVistas
  },
  {
    path: '/creardepto',
    name: 'crearDepto',
    component: crearDepto
  },
  {
    path: '/municipio',
    name: 'municipios',
    component: Municipios
  },
  {
    path: '/munvista/:id',
    name: 'munVista',
    component: munVistas
  },
  {
    path: '/crearmun',
    name: 'crearMun',
    component: crearMuni
  },
  {
    path: '/asociacion',
    name: 'asociaciones',
    component: Asociaciones
  },
  {
    path: '/asovista/:id',
    name: 'asoVista',
    component: asoVistas
  },
  {
    path: '/crearaso',
    name: 'crearAso',
    component: crearAso
  },
  {
    path: '/resguardo',
    name: 'resguardos',
    component: Resguardos
  },
  {
    path: '/resvista/:id',
    name: 'resVista',
    component: resVistas
  },
  {
    path: '/crearres',
    name: 'crearRes',
    component: crearRes
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
