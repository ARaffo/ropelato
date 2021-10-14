<template>
    <div>
         <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          v-bind="attrs"
          v-on="on"
        >
          Cliente
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
    name: 'MenuCliente',

    data() {
        return {
            items: [
        { title: 'Venta web', link: "/ventaWeb" },
      ]
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