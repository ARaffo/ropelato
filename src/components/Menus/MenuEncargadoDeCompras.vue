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
        { title: 'Generar Orden De compra Por Oren De Pedido', link: "/generarOrdenDecompraPorOrenDePedido" },
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