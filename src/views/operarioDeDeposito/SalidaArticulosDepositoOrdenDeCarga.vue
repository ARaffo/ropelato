<template>
  <v-container>
    <v-card width="800" v-if="!pantallaArticulos">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Órdenes de carga</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-data-table
          @click:row="
            pantallaArticulos = true;
            camion = $event.camion;
          "
          :headers="headers"
          :items="ordensDeCarga"
          :items-per-page="5"
          class="elevation-1"
          :footer-props="{
            'items-per-page-text': 'Filas por página',
            pageText: '{0}-{1} de {2}',
          }"
        >
          <template v-slot:[`item.seleccionar`]="{ item }">

             <v-radio-group
              v-model="seleccionar"
              mandatory
            >
              <v-radio
                :value="item.seleccionar"
              ></v-radio>
            </v-radio-group>
            </template
        ></v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end">
         <v-btn>Cancelar</v-btn>
        <v-btn color="primary">Continuar</v-btn>
       
      </v-card-actions>
    </v-card>

    <v-card  v-else>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Artículos en vehículo</h3>
        </div>
      </v-card-title>

      <v-card-text class="pb-0">
        <v-row>
          <v-col>
            <v-card elevation="2">
                <v-card-title>
                   <div>Datos del vehículo</div>
                </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      hide-details
                      v-model="camion"
                      outlined
                      label="Vehículo"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                     <v-combobox
                    v-model="patente"
                    :items="['NVN 285', 'NVZ 087']"
                    label="Patente"
                    outlined
                    dense
                  ></v-combobox>
                  </v-col>
                  <v-col>
                    <v-text-field
                      hide-details
                      v-model="pesoCamion"
                      outlined
                      label="Peso máximo"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                       <v-text-field
                      hide-details
                      v-model="tipo"
                      outlined
                      label="Tipo"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headersArticulos"
              :items="articulos"
              :items-per-page="5"
              class="elevation-1"
              :footer-props="{
                'items-per-page-text': 'Filas por página',
                pageText: '{0}-{1} de {2}',
              }"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        
        <v-btn flat @click="pantallaArticulos = false">Cancelar</v-btn>
        <v-btn flat color="primary">Generar Remito</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SalidaArticulosDepositoOrdenDeCarga",

  data() {
    return {
      camion: null,
      seleccionar: null,
      pantallaArticulos: false,
      camionNombre: "Iveco Daily 70-170 ",
      pesoCamion: "3.500 kg",
      patente: null,
      modelo: 'Iveco Daily 70-170 ',
      tipo: 'De carga',
      headers: [
        {
          text: "Orden de carga",
          align: "start",
          sortable: false,
          value: "idOrden",
          
        },
        { text: "Vehículo de carga", value: "camion" },
        { text: "Fecha", value: "fecha" },

        { text: "Seleccionar", value: "seleccionar" },
      ],

      headersArticulos: [
        {
          text: "Id artículo",
          align: "start",
          sortable: false,
          value: "idArticulo",
        },
        { text: "Nombre", value: "nombre" },
        { text: "Cantidad", value: "cantidad" },
        
        // { text: "Transito interno", value: "interno" },
      ],

      ordensDeCarga: [
        {
          idOrden: "O00189",
          camion: "Iveco Daily 70-170",
          fecha: new Date().toISOString().substr(0, 10),
          depositoOrigen: "Deposito 1",
          seleccionar: false,
          patente: "NVN 285",
          modelo: 'Iveco',
        },
        {
          idOrden: "O00190",
          camion: "Iveco Daily 70-170 ",
          fecha: new Date().toISOString().substr(0, 10),
          depositoOrigen: "Deposito 2",
          seleccionar: false,
          patente: "NVN 285",
          modelo: 'Iveco',
        },
        {
          idOrden: "O00191",
          camion: "Iveco Daily 55-170 ",
          fecha: new Date().toISOString().substr(0, 10),
          depositoOrigen: "Deposito 1",
          seleccionar: false,
           patente: "NVZ 087",
          modelo: 'Iveco',
        },
        {
          idOrden: "O00192",
          camion: "Iveco Daily 55-170 ",
          fecha: new Date().toISOString().substr(0, 10),
          depositoOrigen: "Deposito 2",
          seleccionar: false,
           patente: "NVZ 087",
          modelo: 'Iveco',
        },
      ],

      articulos: [
        {
          idArticulo: "p001",
          nombre: "Pastina negra 1 Kg",
          interno: "Si",
          cantidad: "30",
          enCamion: "No",
          camion: "Camión 1",
        },
        {
          idArticulo: "b001",
          nombre: "Buje reducción rosca",
          interno: "No",
          cantidad: "25",
          enCamion: "Si",
        },
        {
          idArticulo: "pl001",
          nombre: "Plavicon sellador 25 gr",
          cantidad: "12",
          interno: "No",
          enCamion: "Si",
        },
        {
          idArticulo: "ba001",
          nombre: "Bañera",
          interno: "No",
          cantidad: "1",
          enCamion: "No",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    mostrar(row) {
      console.log("valor", row.camion);
    },
  },
};
</script>

<style lang="scss" scoped></style>
