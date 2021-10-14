import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import('../views/vendedor/Ventas.vue')
  },
  {
    path: '/entregaVentaFuturo',
    name: 'Entrega Venta Futuro',
    component: () => import('../views/vendedor/EntregaVentaFuturo.vue')
  },
  {
    path: '/ventaWeb',
    name: 'Venta web',
    component: () => import('../views/cliente/VentaWeb.vue')
  },
  {
    path: '/generarOrdenDecompraPorOrenDePedido',
    name: 'Generar Orden De compra Por Oren De Pedido',
    component: () => import('../views/encargadoDeCompras/GenerarOrdenDeCompraPorOrdenDePedido.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
