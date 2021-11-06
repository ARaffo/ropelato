<template>
  <v-container>
    <v-card  v-if="!seleccionar"> 
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Generar orden de carga</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              hide-details
              v-model="fecha"
              outlined
              label="Fecha de carga"
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-combobox
              dense
              outlined
              label="Vehículo de carga"
              :items="['Iveco Daily 70-170', 'Iveco Daily 55-170']"
              v-model="camionSelect"
              hide-details=""
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
             <v-data-table
          :headers="headers"
          :items-per-page="5"
          :items="lineaFactura"
          class="elevation-1"
          :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
      group-by="numeroFactura"
        >
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
              label="Vehículo de carga"
              :items="['Camión 1', 'Camión 2', 'Camión 3', 'Camión 4']"
              v-model="item.camion"
              hide-details=""
            ></v-combobox>
          </template>
          <template v-slot:[`item.seleccionar`]="{ item }">
            <v-checkbox v-model="item.seleccionar"></v-checkbox>
          </template>
        </v-data-table>
          </v-col>
        </v-row>
       
      </v-card-text>
      <v-card-actions class="justify-end mr-2">
        <v-btn>Cancelar</v-btn>
        <v-btn @click="seleccionar = true" color="primary">Aceptar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Generar orden de carga (envíos internos)</h3>
            </div>
        </v-card-title>
        <v-card-text>
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
              <v-text-field
              hide-details
              v-model="fecha2"
              outlined
              readonly
              label="Fecha"
              dense
            ></v-text-field>
            </v-col>
            <v-col>
               <v-combobox
              :items="['Iveco Daily 70-170', 'Iveco Daily 55-170']"
              hide-details
              v-model="camion2"
              outlined
              label="Vehículo de carga"
              dense
              readonly
            ></v-combobox>
             
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
          >
           <template v-slot:[`item.depositoOrigen`]="{ item }">
            <v-combobox
              dense
              outlined
              :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
              v-model="item.depositoOrigen"
              hide-details=""
            ></v-combobox>
           </template>

             <template v-slot:[`item.depositoDestino`]="{ item }">
            <v-combobox
              dense
              outlined
              :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
              v-model="item.depositoDestino"
              hide-details=""
            ></v-combobox>
              </template>
            </v-data-table>
          
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
      fullscreen
     
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         Generar orden de carga
        </v-card-title>

        <v-card-text>
         <v-data-table
        :headers="listadoOrdenesHeaders"
        :items="ordenesCargaDialog"
        :items-per-page="5"
        hide-default-footer
        group-by="direccion"
        class="elevation-1 mt-2"
         :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
  >
  <template v-slot:[`item.orden`]>
            <v-icon>
              reorder
            </v-icon>
           </template>
  </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
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
      camionSelect: null,
      fecha2: '15-12-2021',
        seleccionar: false,
        origen: null,
        destino: null,
        camion2: 'Iveco Daily 55-170',
        camion: null,
        oBuscar: null,
        articuloCantidad: null,
        articuloDestino: null,
        dialog: false,
        fecha: null,
      headers: [
        {
          text: "Línea de factura",
          align: "start",
          sortable: false,
          value: "idLinea",
          width: 50
         
        },
        { text: "Numero Factura", value: "numeroFactura", width: 50 },
        { text: "Id artículo", value: "idArticulo", width: 50 },
        { text: "Artículo", value: "nombre", width: 80 },
        { text: "Cantidad", value: "cantidad", width: 40},

        { text: "Depósito de origen", value: "depositoOrigen", width:60},
    
        { text: "", value: "seleccionar", width: 60},
      ],

       ordenDeCargaHeaders: [
          {
            text: 'Id artículo',
            align: 'start',
            value: 'idArticulo',
          },
          { text: 'Artículo', value: 'nombre' },
          { text: 'Cantidad a enviar', value: 'cantidad' },
          { text: 'Depósito de origen', value: 'depositoOrigen' },
          { text: 'Depósito de destino', value: 'depositoDestino' },

          //desposito origen, destino, camion, articulo, cantidad, direccion
        ],

          listadoOrdenesHeaders: [
            { text: '', value: 'orden',align: 'start', },
          {
            text: 'Número de factura',
            
            value: 'idOrden',
          },
          { text: 'Artículo', value: 'nombre' },
           { text: 'Cantidad a enviar', value: 'cantidad' },
          { text: 'Depósito de origen', value: 'depositoOrigen' },
          { text: 'Depósito de destino', value: 'depositoDestino' },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Vehículo de carga', value: 'camion' },
         
          { text: 'Dirección de envio', value: 'direccion' , width: 250},
          
        ],

      lineaFactura: [
        {
          idLinea: "l027",
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          fechaCarga: '15-12-2021',
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
          numeroFactura: '0004-00002285'
        },
        {
          idLinea: "l029",
          idArticulo: "pl001",
          nombre: "Plavicon sellador 25 gr",
          cantidad: 50,
          fechaCarga: '15-12-2021',
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
           numeroFactura: '0004-00002285'
        },
        {
          idLinea: "l034",
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          fechaCarga:'15-12-2021',
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
           numeroFactura: '0004-00002435'
        },
        {
          idLinea: "l035",
          idArticulo: "e001",
          nombre: "Entrerrosca de bronce 3/8",
          cantidad: 670,
          fechaCarga: '15-12-2021',
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
          numeroFactura: '0004-00002435'
           
        },
      ],

      oredenesDeCarga: [
         {
          idOrden: "f027",
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
          camion: 'Iveco Daily 55-170',
          depositoOrigen: null,
          depositoDestino: null
        },
        {
          idOrden: "OC029",
          idArticulo: "pl001",
          nombre: "Plavicon sellador 25 gr",
          cantidad: 50,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
          camion: 'Iveco Daily 55-170',
          depositoOrigen: null,
          depositoDestino: null
        },
        {
          idOrden: "OC029",
          idArticulo: "h001",
          nombre: "Hierro nervado",
          cantidad: 30,
          fechaCarga: null,
          depositoOrigen: null,
          camion: null,
          fecha: '15-12-2021',
          camion: 'Iveco Daily 70-170',
          depositoOrigen: null,
          depositoDestino: null
        },
      ],

      ordenesCargaDialog: [
         {
          idOrden: "0004-00002485",
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          fecha: '15-12-2021',
          depositoOrigen: "Depósito 1",
          camion: 'Iveco Daily 70-170',
          fecha: '15-12-2021',
          direccion: 'Jordana 862, Concepción del Uruguay, Entre Ríos',
          orden: null
        },
         {
          idOrden: "0004-00002485",
          idArticulo: "e001",
          nombre: "Entrerrosca de bronce 3/8",
          cantidad: 670,
          fecha:'15-12-2021',
          depositoOrigen: "Depósito 1",
          camion: 'Iveco Daily 70-170',
          fecha: '15-12-2021',
          direccion: 'Jordana 862, Concepción del Uruguay, Entre Ríos',
          orden: null
        },
        {
          idOrden: null,
          idArticulo: "t001",
          nombre: "Tornillo 5 cm",
          cantidad: 600,
          depositoOrigen: 'Depósito 1',
          fecha: '15-12-2021',
          camion: 'Iveco Daily 70-170',
          depositoDestino: 'Depósito 3',
          direccion: 'Cochabamba 462, Concepción del Uruguay, Entre Ríos',
          orden: null
        },
        {
          idOrden: null,
          idArticulo: "pl001",
          nombre: "Plavicon sellador 25 gr",
          cantidad: 50,
          depositoOrigen: 'Depósito 2',
          fecha: '15-12-2021',
          camion: 'Iveco Daily 70-170',
          depositoDestino: 'Depósito 3',
          direccion: 'Cochabamba 462, Concepción del Uruguay, Entre Ríos',
          orden: null
        },
        {
          idOrden: null,
          idArticulo: "h001",
          nombre: "Hierro nervado",
          cantidad: 30,
          depositoOrigen: 'Depósito 1',
          fecha: '15-12-2021',
          camion: 'Iveco Daily 70-170',
          depositoDestino: 'Depósito 3',
          direccion: 'Cochabamba 462, Concepción del Uruguay, Entre Ríos',
          orden: null
        }
      ]
    };
  },

  mounted() {
    
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
