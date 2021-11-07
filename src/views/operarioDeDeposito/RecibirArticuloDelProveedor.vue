<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card width="300" v-if="!buscar">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Seleccionar proveedor</h3>
            </div>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              label="Id proveedor"
              v-model="proveedorId"
              outlined
              dense
            ></v-text-field>
            <v-autocomplete
              :items="[
                'Proveedor 1',
                'Proveedor 2',
                'Proveedor 3',
                'Proveedor 4',
              ]"
              label="Proveedores"
              outlined
              hide-details
              dense
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions class="justify-end mt-2">
            <v-btn color="primary" @click="buscar = true">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card width="300" v-if="!buscarRemito">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Buscar Remito</h3>
            </div>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              label="Id remito"
              v-model="remitoId"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-end mt-2">
            <v-btn color="primary" @click="buscar = true">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-card v-if="buscar" width="450">
      <v-card-title primary-title>
        <div>
          <h5 class="headline mb-0 font-size-1.2">
            Artículos recibidos
          </h5>
          <div>Proveedor 4</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col sm="8" md="8" lg="8" xs="8" cols="8">
            <v-text-field
              label="Id artículo"
              hide-details
              v-model="buscarId"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col  cols="2">
            <v-btn class="ml-6" height="40" dark  @click="dialog = true"  elevation="6">
              <v-icon >qr_code_scanner</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
              <v-data-table
            :headers="headers"
            :items="articulos"
            :items-per-page="5"
            class="elevation-1"
            hide-default-footer
            :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
          >
          </v-data-table>
          </v-col>
        
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="buscar = false">Cancelar</v-btn>
         <v-btn color="primary">Aceptar</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ articuloEscanear.articulo }}
        </v-card-title>
        <v-card-text class="pb-0">
          <v-text-field
            class="mt-4"
            label="Cantidad recibida"
            v-model="cantidadRcibida"
            outlined
            dense
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn


            @click="
              dialog = false;
            "
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"

            @click="
              dialog = false;
              addArticulo();
            "
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
  name: "RecibirArticuloDelProveedor",

  data() {
    return {
      proveedorId: null,
      buscar: false,
      buscarRemito: false,
      buscarId: null,
      dialog: false,
      remitoId: null,
      cantidadRcibida: 0,

      headers: [
        {
          text: "Id artículo ",
          align: "start",
          value: "id",
          width: 80,
        },
        { text: "Nombre", value: "articulo", width: 80 },
        { text: "CantidadRecibida", value: "cantidadRecibida", width: 50 },
      ],
      articulos: [
        {
          id: "l002",
          articulo: "Ladrillo ceramico 12 x 18 x 33",
          presentacion: "12 x 18 x 33",
          cantidad: "4000",
          precio: "$ 40.00",
          precioNum: 40,
          proveedor: "Proveedor 1",
          cantidadRecibida: 2500,
        },
        // {   id: 't001',
        //   articulo: "Tornillo",
        //   presentacion: "5 cm",
        //   cantidad: "9000",
        //   precio: "$ 7.00",
        //   precioNum: 7,
        //   proveedor: "Proveedor 2",
        //   cantidadRecibida: null
        // },
        // {
        //     id: 'e001',
        //   articulo: "Entrerrosca de bronce",
        //   presentacion: "3/8",
        //   cantidad: "1000",
        //   precio: "$ 80.00",
        //   precioNum: 80,
        //   proveedor: "Proveedor 1",
        //   cantidadRecibida: null
        // },
      ],
      articuloEscanear: {
        id: "t001",
        articulo: "Tornillo 5 cm",
        presentacion: "5 cm",
        cantidad: "9000",
        precio: "$ 7.00",
        precioNum: 7,
        proveedor: "Proveedor 2",
        cantidadRecibida: null,
      },
    };
  },

  mounted() {
    //qr_code_2
  },

  methods: {
    addArticulo() {
      this.articuloEscanear.cantidadRecibida = this.cantidadRcibida;
      this.articulos.push(this.articuloEscanear);
    },
  },
};
</script>

<style lang="scss" scoped></style>
