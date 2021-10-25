import { createRouter, createWebHashHistory } from 'vue-router'
import App            from './App.vue'
import Departamentos  from './components/departamentos.vue'
import Municipios     from './components/municipios.vue'
import Asociaciones   from './components/asociaciones.vue'
import Resguardos     from './components/resguardos.vue'
import Registro       from './components/registro.vue'
import Ingresar       from './components/ingreso.vue'


const routes = [

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
    path: '/departamento',
    name: 'departamentos',
    component: Departamentos
  },
  {
    path: '/municipio',
    name: 'municipios',
    component: Municipios
  },
  {
    path: '/resguardo',
    name: 'resguardos',
    component: Resguardos
  },
  {
    path: '/asociacion',
    name: 'asociaciones',
    component: Asociaciones
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
