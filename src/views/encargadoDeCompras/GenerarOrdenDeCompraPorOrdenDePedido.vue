<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Órdenes de Pedido</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="ordenesPedido"
            :items-per-page="5"
            class="elevation-1"
            :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
          >
            <template v-slot:footer>
              <div class=" ml-3 mt-4">Total: ${{ total }}.00</div>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="finalizar" color="primary"
            >Generar orden de compra</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "GenerarOrdenDecompraPorOrenDePedido",

  data() {
    return {
      headers: [
        {
          text: "Artículo",
          align: "start",
          sortable: false,
          value: "articulo",
        },
        { text: "Presentación", value: "presentacion" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Precio", value: "precio" },
        { text: "Proveedor", value: "proveedor" },
        { text: "Fecha de creación", value: "fechaCreacion" },
      ],

      ordenesPedido: [
        {
          articulo: "Ladrillo ceramico",
          presentacion: "12 x 18 x 33",
          cantidad: "4000",
          precio: "$ 40.00",
          precioNum: 40,
          proveedor: "Proveedor 1",
          fechaCreacion: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
        },
        {
          articulo: "Tornillo",
          presentacion: "5 cm",
          cantidad: "9000",
          precio: "$ 7.00",
          precioNum: 7,
          proveedor: "Proveedor 2",
          fechaCreacion: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
        },
        {
          articulo: "Entrerrosca de bronce",
          presentacion: "3/8",
          cantidad: "1000",
          precio: "$ 80.00",
          precioNum: 80,
          proveedor: "Proveedor 1",
          fechaCreacion: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
        },
      ],
    };
  },

  mounted() {},

  methods: {
    restarDiasFecha(fecha, dias) {
      fecha.setDate(fecha.getDate() - dias);
      return fecha;
    },

    finalizar() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden de compra generada",
        showConfirmButton: true,
      });
    },
  },

  computed: {
       total : function() {
      let total = 0

      if( this. ordenesPedido.length != 0) {
        this. ordenesPedido.forEach(articulo => {
        total  += articulo.cantidad * articulo.precioNum
      });
      }
      return total
    }
  }
};
</script>

<style lang="scss" scoped></style>
