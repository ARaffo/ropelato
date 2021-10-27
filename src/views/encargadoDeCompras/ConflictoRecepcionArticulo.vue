<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title primary-title class="justify-end">
          <v-layout class="ml-1">
            <v-flex>
              <h3 class="headline mt-3">
                Resolver conflictos en la recepción de artículo
              </h3>
            </v-flex>
            <v-flex class="d-flex flex-row-reverse">
              <v-radio-group row v-model="radioButton">
                <v-radio
                  label="Faltante"
                  value="faltante"
                  @click="filtrar('faltante')"
                ></v-radio>
                <v-radio
                  label="Exceso"
                  value="exceso"
                  @click="filtrar('exceso')"
                ></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-data-table v-if="radioButton == 'exceso'"
            :headers="headersExceso"
            :items-per-page="5"
            :items="articulosFiltrados"
            class="elevation-1"
          >
          <template v-slot:[`item.resolver`]="{ item }">
              <v-checkbox  class="ml-3" v-model="item.resolver"></v-checkbox>
            </template>

            <template v-slot:[`item.fechaPactada`]="{ item }">
              <v-text-field
                    hide-details
                    v-model="item.fechaPActada"
                    outlined
                    dense
                  ></v-text-field>
            </template>

            <template v-slot:[`item.cantidadDevolver`]="{ item }">
              <v-text-field
                    hide-details
                    v-model="item.cantidadDevolver"
                    outlined
                    dense
                  ></v-text-field>
            </template>
          
          </v-data-table>
           <v-data-table v-if="radioButton == 'faltante'"
            :headers="headersFaltante"
            :items-per-page="5"
            :items="articulosFiltrados"
            class="elevation-1"
             :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
          >
          <template v-slot:[`item.resolver`]="{ item }">
              <v-checkbox  class="ml-3" v-model="item.resolver"></v-checkbox>
            </template>

            <template v-slot:[`item.ordenCompra`]="{ item }">
              <v-checkbox  class="ml-3" v-model="item.ordenCompra"></v-checkbox>
            </template>

            <template v-slot:[`item.fechaPactada`]="{ item }">
              <v-text-field
                    hide-details
                    v-model="item.fechaPActada"
                    outlined
                    dense
                  ></v-text-field>
            </template>
          
          </v-data-table >

           <v-data-table  v-if="radioButton == null"
            :headers="headers"
            :items-per-page="5"
            :items="articulosFiltrados"
            class="elevation-1"
             :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
          >
          <template v-slot:[`item.resolver`]="{ item }">
              <v-checkbox  class="ml-3" v-model="item.resolver"></v-checkbox>
            </template>

            <template v-slot:[`item.fechaPactada`]="{ item }">
              <v-text-field
                    hide-details
                    v-model="item.fechaPActada"
                    outlined
                    dense
                  ></v-text-field>
            </template>
          
          </v-data-table>
          
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn>Cancelar</v-btn>
          <v-btn v-if="radioButton == 'faltante'" @click="mensajeNota" color="primary">Resolver</v-btn>
          <v-btn v-if="radioButton == 'exceso'" @click="mensajeOrden" color="primary">Generar orden de compra</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "ConflictoRecepcionArticulo",

  data() {
    return {
      radioButton: null,
      headersExceso: [
        {
          text: "Artículo",
          align: "start",
          sortable: false,
          value: "articulo",
          width: 150
        },
        { text: "Orden de compra", value: "ordenPedido",width: 70 },
        { text: "Cantidad comprada", value: "cantidadComprada",width: 60 },
        { text: "Cantidad recibida", value: "cantidadRecibida", width: 60},
        { text: "Cantidad a devolver", value: "cantidadDevolver", width: 100},
        { text: "Proveedor", value: "proveedor",width: 100},
        { text: "Fecha", value: "fecha", width: 100},
       // { text: "Fecha Pactada", value: "fechaPactada" , width: 130 },
        { text: "Resolver", value: "resolver",width: 50 },
      ],

      headersFaltante: [
        {
          text: "Articulo",
          align: "start",
          sortable: false,
          value: "articulo",
          width: 150
        },
        { text: "Orden de compra", value: "ordenPedido",width: 70 },
        { text: "Cantidad comprada", value: "cantidadComprada",width: 60 },
        { text: "Cantidad recibida", value: "cantidadRecibida", width: 60},
        { text: "Proveedor", value: "proveedor",width: 100},
        { text: "Fecha", value: "fecha", width: 100},
        { text: "Fecha Pactada", value: "fechaPactada" , width: 130 },
        { text: "Solicitar Nota de credito", value: "resolver",width: 50 },
        { text: "Generar Orden de compra", value: "ordenCompra",width: 50 },
      ],

      headers: [
        {
          text: "Artículo",
          align: "start",
          sortable: false,
          value: "articulo",
          width: 120
        },
        { text: "Orden de compra", value: "ordenPedido",width: 80 },
        { text: "Cantidad comprada", value: "cantidadComprada",width: 60 },
        { text: "Cantidad recibida", value: "cantidadRecibida", width: 50},
        { text: "Proveedor", value: "proveedor",width: 70},
        { text: "Fecha", value: "fecha", width: 60},
        { text: "Resolver", value: "resolver",width: 50 },
      ],

      articulos: [
        {
          articulo: "Buje reduccion rosca",
          cantidadComprada: "2500",
          cantidadRecibida: "3000",
          cantidadDevolver: null,
          proveedor: "Proveedor 1",
          fechaPactada: null,
          ordenPedido: 'O023',
          ordenCompra: null,
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Hierro nervado 20 mm",
          cantidadComprada: "1000",
          cantidadRecibida: "1200",
          cantidadDevolver: null,
          proveedor: "Proveedor 1",
          fechaPactada: null,
          ordenPedido: 'O023',
          ordenCompra: null,
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Ladrillo ceramico 12 x 18 x 33",
          cantidadComprada: "700",
          cantidadRecibida: "750",
          cantidadDevolver: null,
          proveedor: "Proveedor 2",
          fechaPactada: null,
          ordenPedido: 'O025',
          ordenCompra: null,
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Ladrillo ceramico 18 x 18 x 33",
          cantidadComprada: "900",
          cantidadRecibida: "750",
          cantidadDevolver: null,
          proveedor: "Proveedor 2",
          fechaPactada: null,
          ordenPedido: 'O023',
          ordenCompra: null,
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Chapa sinusoidal 3.50 mm",
          cantidadComprada: "500",
          cantidadRecibida: "400",
          cantidadDevolver: null,
          proveedor: "Proveedor 3",
          fechaPactada: null,
          ordenPedido: 'O025',
          ordenCompra: null,
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
      ],

      articulosFiltrados: [
        {
          articulo: "Buje reduccion rosca",
          cantidadComprada: "2500",
          cantidadRecibida: "3000",
          cantidadDevolver: null,
          proveedor: "Proveedor 1",
          fechaPactada: null,
          ordenPedido: 'O023',
          ordenCompra: null,
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Hierro nervado 20 mm",
          cantidadComprada: "1000",
          cantidadRecibida: "1200",
          cantidadDevolver: null,
          ordenCompra: null,
          proveedor: "Proveedor 1",
          fechaPactada: null,
          ordenPedido: 'O023',
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Ladrillo ceramico 12 x 18 x 33",
          cantidadComprada: "700",
          cantidadRecibida: "750",
          cantidadDevolver: null,
          ordenCompra: null,
          proveedor: "Proveedor 2",
          fechaPactada: null,
          ordenPedido: 'O025',
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Ladrillo ceramico 18 x 18 x 33",
          cantidadComprada: "900",
          cantidadRecibida: "750",
          cantidadDevolver: null,
          ordenCompra: null,
          proveedor: "Proveedor 2",
          fechaPactada: null,
          ordenPedido: 'O023',
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
        },
        {
          articulo: "Chapa sinusoidal 3.50 mm",
          cantidadComprada: "500",
          cantidadRecibida: "400",
          cantidadDevolver: null,
          ordenCompra: null,
          proveedor: "Proveedor 3",
          fechaPactada: null,
          ordenPedido: 'O025',
          fecha: this.restarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
          resolver: false,
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

    filtrar(event) {
      this.articulosFiltrados = [];
      if (event == "faltante") {
        this.articulos.forEach((articulo) => {
          if (articulo.cantidadRecibida < articulo.cantidadComprada) {
            this.articulosFiltrados.push(articulo);
          }
        });
      } else {
        this.articulos.forEach((articulo) => {
          if (articulo.cantidadComprada < articulo.cantidadRecibida) {
            this.articulosFiltrados.push(articulo);
          }
        });
      }
    },

    mensajeOrden() {
      console.log('radio buton value',this.radioButton)

      if(this.radioButton == 'exceso'){
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Orden de compra generada",
        showConfirmButton: true,
      });
      } else {
         Swal.fire({
        position: "center",
        icon: "success",
        title: "Fecha pactada registrada correctamente",
        text: "Orden generada",
        showConfirmButton: true,
      });
      }   
    },

    mensajeNota(){
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota de credito solicitada a proveedor",
        showConfirmButton: true,
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
