<template>
  <v-container>
    <v-card width="400" v-if="!ocultarBuscar">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Ingrese el número de factura</h3>
        </div>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-text-field
          hide-details
          label="Número de factura"
          v-model="numeroFactura"
          outlined
          dense
          :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-end mt-1">
        <v-btn @click="ocultarBuscar = true" color="primary">Buscar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Artículos de factura 0004-00002485</h3>
        </div>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-data-table
          :headers="headers"
          :items="facturas[0].lineaFactura"
          :items-per-page="5"
          class="elevation-1"
          :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
        >
         <template  v-slot:[`item.devolver`]="{ item }">
              <v-checkbox class="ml-4" v-model="item.devolver"></v-checkbox>
            </template>

            <template
              v-slot:footer
            >
              <div class="ml-3 mt-2">
               Total: ${{total}}.00
              </div>
            </template>

        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="ocultarBuscar = false">Cancelar</v-btn>
        <v-btn @click="agregarArticulosADevolver(); dialog = true"  color="primary">Siguiente</v-btn>
        
      </v-card-actions>
    </v-card>


     <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Artículos a devolver
        </v-card-title>

        <v-card-text class="mt-3">
         <v-data-table
            :headers="headersArticulosADevolver"
            :items="articulosADevolver"
            :items-per-page="5"
            class="elevation-1"
             :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
        >
         <template v-slot:[`item.cantidadDevolver`]="{ item }">
              <v-text-field
                    hide-details
                    v-model="item.cantidadDevolver"
                    outlined
                    dense
                  ></v-text-field>
            </template>
        </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         
            <v-btn @click="dialog = false; articulosADevolver = []"> 
              Cancelar
          </v-btn>
           <v-btn
            color="primary"

            @click="dialog = false"
          >
            Generar Nota de Credito
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: "GestionarDevolucion",

  data() {
    return {
      dialog: false,
      ocultarBuscar: false,
      numeroFactura: null,
      headers: [
        {
          text: "Id artículo",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Artículo", value: "articulo" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Precio", value: "precio" },
        { text: "A devolver", value: "devolver"},
      ],
       headersArticulosADevolver: [
        {
          text: "Id artículo",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Artículo", value: "articulo" },
        { text: "Cantidad a devolver", value: "cantidadDevolver" },
      ],
      facturas: [
        {
          id: "0004-00002485",
          fecha: "09/10/2021",
          direccionENvio: null,
          nombreCliente: "Juan",
          apellidoCliente: " Perez",
          dniCliente: "45761298",
          lineaFactura: [
            {
              id: "l001",
              articulo: "Tornillo 5 cm",
              cantidad: "20",
              precio: "$ 11.00",
              precioNum: 11,
              cantidadARetirar: null,
              cantidadDeposito: 500,
              fechaEntrega: "25-10-2021",
              modoRetiro: null,
              devolver: false,
              cantidadDevolver: null
            },
            {
              id: "l002",
              articulo: "Pastina negra 1 Kg",
              cantidad: "56",
              precioNum: 56,
              precio: "$ 201.00",
              fechaEntrega: "20-10-2021",
              cantidadDeposito: 1450,
              cantidadARetirar: null,
              modoRetiro: null,
              devolver: false,
              cantidadDevolver: null
            },
          ],
        },
      ],

      articulosADevolver: []
    };
  },

  mounted() {},

  methods: {
      agregarArticulosADevolver(){
          this.facturas[0].lineaFactura.forEach(articulo => {
              if(articulo.devolver == true){
                  this.articulosADevolver.push(articulo)
              }
          });
      }
  },
  computed: {
      total : function() {
      let total = 0

      if( this.facturas[0].lineaFactura.length != 0) {
        this.facturas[0].lineaFactura.forEach(articulo => {
        total  += articulo.cantidad * articulo.precioNum
      });
      }
      return total
    }

  }
};
</script>

<style lang="scss" scoped></style>
