<template>
  <v-container>
    <v-card  v-if="!seleccionar"> 
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Lineas de factura</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items-per-page="5"
          :items="lineaFactura"
          class="elevation-1"
          :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
        >
          <template v-slot:[`item.fechaCarga`]="{ item }">
            <v-text-field
              hide-details
              v-model="item.fechaCarga"
              outlined
              dense
            ></v-text-field>
          </template>
          <template v-slot:[`item.depositoOrigen`]="{ item }">
            <v-combobox
              dense
              outlined
              :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
              v-model="item.depositoOrigen"
              hide-details=""
            ></v-combobox>
          </template>
          <template v-slot:[`item.camion`]="{ item }">
            <v-combobox
              dense
              outlined
              :items="['Camión 2', 'Camión 2', 'Camión 3', 'Camión 4']"
              v-model="item.camion"
              hide-details=""
            ></v-combobox>
          </template>
          <template v-slot:[`item.seleccionar`]="{ item }">
            <v-checkbox v-model="item.seleccionar"></v-checkbox>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end mr-2">
        <v-btn>Cancelar</v-btn>
        <v-btn @click="seleccionar = true" color="primary">Aceptar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Orden de carga</h3>
            </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
               <v-select
            :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
              label="Origen"
              v-model="origen"
              outlined
              hide-details
              dense
            ></v-select>
            </v-col>
             <v-col>
               <v-select
            :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
              label="Destino"
              v-model="destino"
              outlined
              hide-details
              dense
            ></v-select>
            </v-col>
             <v-col>
              <v-select
            :items="['Camión 1', 'Camión2', 'Camión 3', 'Camión 4', 'Camión 5']"
              label="Camión"
              v-model="camion"
              outlined
              hide-details
              dense
            ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
               <v-text-field
              hide-details
              v-model="articuloBuscar"
              outlined
              label="Id/Nombre artículo"
              dense
            ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              hide-details
              v-model="articuloCantidad"
              outlined
              label="Cantidad"
              dense
            ></v-text-field>
            </v-col>
            <v-col>
              <v-select
            :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
              label="Destino"
              v-model="articuloDestino"
              outlined
              hide-details
              dense
            ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
               <v-data-table
               :items="oredenesDeCarga"
            :headers="ordenDeCargaHeaders"
            :items-per-page="5"
            class="elevation-1"
            :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
          ></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end mr-2">
            <v-btn @click="seleccionar = false">Cancelar</v-btn>
            <v-btn @click="dialog = true" color="primary">Aceptar</v-btn>
        </v-card-actions>
    </v-card>


    <v-dialog
      v-model="dialog"
      width="450"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ordenes de carga
        </v-card-title>

        <v-card-text>
         <v-data-table
        :headers="listadoOrdenesHeaders"
        :items="oredenesDeCarga"
        :items-per-page="5"
        class="elevation-1 mt-2"
         :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
  ></v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "GenerarOrdenCargaCamiones",

  data() {
    return {
        seleccionar: false,
        origen: null,
        destino: null,
        camion: null,
        articuloBuscar: null,
        articuloCantidad: null,
        articuloDestino: null,
        dialog: false,
      headers: [
        {
          text: "Id línea",
          align: "start",
          sortable: false,
          value: "idLinea",
          width: 50
         
        },
        { text: "Id artículo", value: "idArticulo", width: 50 },
        { text: "Nombre articulo", value: "nombre", width: 80 },
        { text: "Cantidad", value: "cantidad", width: 40},

        { text: "Fecha de carga", value: "fechaCarga", width: 70 },
        { text: "Deposito de origen", value: "depositoOrigen", width:60},
        { text: "Camión", value: "camion", width: 70 },
        { text: "Seleccionar", value: "seleccionar", width: 60},
      ],

       ordenDeCargaHeaders: [
          {
            text: 'Id artículo',
            align: 'start',
            value: 'idArticulo',
          },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Cantidad a enviar', value: 'cantidad' },
        ],

          listadoOrdenesHeaders: [
          {
            text: 'Id orden de carga',
            align: 'start',
            value: 'idOrden',
          },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Camion', value: 'camion' },
        ],

      lineaFactura: [
        {
          idLinea: "l027",
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021'
        },
        {
          idLinea: "l029",
          idArticulo: "pl001",
          nombre: "Plavicon sellador 25 gr",
          cantidad: 50,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021'
        },
        {
          idLinea: "l034",
          idArticulo: "t002",
          nombre: "Tornillo 8 cm",
          cantidad: 670,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021'
        },
        {
          idLinea: "l035",
          idArticulo: "e001",
          nombre: "Entrerrosca de bronce 3/8",
          cantidad: 35,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021'
        },
      ],

      oredenesDeCarga: [
         {
          idOrden: "OC027",
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021',
          camion: 'Camión 1'
        },
        {
          idOrden: "OC029",
          idArticulo: "pl001",
          nombre: "Hierro nervado",
          cantidad: 50,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021',
          camion: 'Camión 1'
        },
        {
          idOrden: "OC029",
          idArticulo: "h001",
          nombre: "Hierro nervado",
          cantidad: 30,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '05-10-2021',
          camion: 'Camión 2'
        },
      ]
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
