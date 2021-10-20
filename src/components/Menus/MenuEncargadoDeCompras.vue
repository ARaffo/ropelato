<template>
    <div>
         <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          v-bind="attrs"
          v-on="on"
        >
          Encargado de compras
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="ir(item.link)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
</template>

<script>
import router from "@/router";
export default {
    name: 'MenuEncargadoDeCompras',

    

    data() {
        return {
            items: [
        { title: 'Generar orden de compra por orden de pedido', link: "/generarOrdenDecompraPorOrenDePedido" },
        { title: 'Resolver conflictos en la recepción de artículo', link: "/conflictoRecepcionArticulo" },
        { title: 'Evaluación del proveedor respecto a la resolución de inconsistencia', link: "/evaluacionProveedorInconsitencias" },
        { title: 'Generar Orden de Compra por Orden de Pedido', link: "/generarOrdenDeCompraPorStockReducido" },
        
      ],
        };
    },

    mounted() {
        
    },

    methods: {
        ir(ruta) {
      router.push({ path: `${ruta}` });
    }
    },
};
</script>

<style lang="scss" scoped>

</style>