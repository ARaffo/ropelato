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
  },
  {
    path: '/conflictoRecepcionArticulo',
    name: 'Resolver conflictos en la recepción de artículo',
    component: () => import('../views/encargadoDeCompras/ConflictoRecepcionArticulo.vue')
  },
  {
    path: '/evaluacionProveedorInconsitencias',
    name: 'Evaluación del proveedor respecto a la resolución de inconsistencia',
    component: () => import('../views/encargadoDeCompras/EvaluacionProveedorInconsitencias.vue')
  },
  {
    path: '/generarOrdenDeCompraPorStockReducido',
    name: 'Generar Orden de Compra por Orden de Pedido',
    component: () => import('../views/encargadoDeCompras/GenerarOrdenDeCompraPorStockReducido.vue')
  },
  {
    path: '/entregaArticuloClienteEnDeposito',
    name: 'Entrega de artículo al cliente en depósito',
    component: () => import('../views/operarioDeDeposito/EntregaArticuloClienteEnDeposito')
  },
  {
    path: '/salidaArticulosDepositoOrdenDeCarga',
    name: 'Salida de artículo del depósito por orden de carga',
    component: () => import('../views/operarioDeDeposito/SalidaArticulosDepositoOrdenDeCarga')
  },
  {
    path: '/gestionarDevolucion',
    name: 'Gestionar devolución',
    component: () => import('../views/operarioDeDeposito/GestionarDevolucion')
  },
  {
    path: '/recibirArticuloDelProveedor',
    name: 'Recibir artículo del proveedor',
    component: () => import('../views/operarioDeDeposito/RecibirArticuloDelProveedor')
  },
  {
    path: '/ordenarArticulosDeposito',
    name: 'Ordenar artículos en depósito',
    component: () => import('../views/operarioDeDeposito/OrdenarArticulosDeposito')
  },
  {
    path: '/controlDeInventario',
    name: 'Control de inventario',
    component: () => import('../views/operarioDeDeposito/ControlDeInventario')
  },
  {
    path: '/generarOrdenCargaCamiones',
    name: 'Generar ordenes de carga a camiones',
    component: () => import('../views/encargadoDeLogistica/GenerarOrdenCargaCamiones')
  },
]

const router = new VueRouter({
  routes
})

export default router
