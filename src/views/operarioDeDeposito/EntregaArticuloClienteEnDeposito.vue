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
          label="Número de factura"
          v-model="numeroFactura"
          outlined
          dense
          v-on:keyup.enter="findFactura(numeroFactura)"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-end ">
        <v-btn @click="ocultarBuscar = true" color="primary">Buscar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-2" v-else width="600">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            Entrega de artículo al cliente en depósito
          </h3>
        </div>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-data-table
          :headers="headers"
          :items="facturas[0].lineaFactura"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="dialogRemito  = true">
          Aceptar
        </v-btn>
        <v-btn>
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="dialogRemito "
      width="600"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Generar Remito venta
        </v-card-title>

        <v-card-text class="mt-2">
            <v-data-table
          :headers="headers"
          :items="facturas[0].lineaFactura"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>



        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogRemito = false">
              Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="dialogFirma  = true; dialogRemito = false"
          >
            Generar Remito
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogFirma"
      width="300"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Firma digital
        </v-card-title>

        <v-card-text class="mt-2 pb-0">
         <v-textarea
          solo
          name="input-7-4"
          label="Firme aqui"
        ></v-textarea>


        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogFirma = false">
              Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="dialogFirma  = false"
          >
            GUardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
export default {
  name: "EntregaArticuloClienteEnDeposito",

  data() {
    return {
      dialogRemito : false,
      dialogFirma: false,
      numeroFactura: null,
      ocultarBuscar: false,
      headers: [
        {
          text: "Artículo",
          align: "start",
          sortable: false,
          value: "articulo",
          width: 70,
        },
        { text: "Cantidad a entregar", value: "cantidad", width: 70 },
        { text: "Cantidad disponible", value: "cantidadDeposito", width: 70 },
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
              articulo: "Tornillo",
              cantidad: "20",
              precio: "$ 11.00",
              cantidadARetirar: null,
              cantidadDeposito: 500,
              fechaEntrega: "25-10-2021",
              modoRetiro: null,
            },
            {
              id: "l002",
              articulo: "Pastina negra",
              cantidad: "56",
              precio: "$ 201.00",
              fechaEntrega: "20-10-2021",
              cantidadDeposito: 1450,
              cantidadARetirar: null,
              modoRetiro: null,
            },
          ],
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
