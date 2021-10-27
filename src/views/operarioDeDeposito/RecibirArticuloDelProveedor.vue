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
                         <v-select
          :items="['Proveedor 1','Proveedor 2', 'Proveedor 3', 'Proveedor 4']"
          label="Proveedores"
          outlined
          hide-details
          dense
        ></v-select>
            </v-card-text>
            <v-card-actions class="justify-end mt-2">
                <v-btn  color="primary" @click="buscar = true">Aceptar</v-btn>
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
                <v-btn  color="primary" @click="buscar = true">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
       


        <v-card v-if="buscar" width="400">
            <v-card-title primary-title>
                <div>
                    <h5 class="headline mb-0 font-size-1.2">Artículo recibidos de proveedor 1</h5>
                </div>
            </v-card-title>
            <v-card-text >
                <v-row>
                    <v-col sm="12" md="8" lg="8" xs="12" cols="12">
                        <v-text-field
            
                    label="Id artículo"
                    hide-details
                    v-model="buscarId"
                    outlined
                    dense
                  ></v-text-field>
                    </v-col>
                    <v-col class="ml-8">
                        <v-btn @click="dialog = true"  icon>
                          <v-icon size="60">qr_code_scanner</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
              
                <v-row>
                        <v-data-table
                :headers="headers"
                :items="articulos"
                :items-per-page="5"
                class="elevation-1"
            >
            </v-data-table>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn  color="primary">Aceptar</v-btn>
                <v-btn  @click=" buscar = false">Cancelar</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{articuloEscanear.articulo}}
        </v-card-title>
        <v-card-text class="pb-0">
           <v-text-field class="mt-2"
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
            color="primary"
            text
            @click="dialog = false ;addArticulo()"
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
    name: 'RecibirArticuloDelProveedor',

    data() {
        return {
            proveedorId: null,
            buscar:false,
            buscarRemito: false,
            buscarId: null,
            dialog: false,
            remitoId: null,
            cantidadRcibida: 0,

             headers: [
          {
            text: 'Id artículo ',
            align: 'start',
            value: 'id',
            width: 80
          },
          { text: 'Nombre', value: 'articulo',width: 80 },
          { text: 'CantidadRecibida', value: 'cantidadRecibida',width: 50 },
        ],
        articulos : [
             {
                 id: 'l002',
          articulo: "Ladrillo ceramico 12 x 18 x 33",
          presentacion: "12 x 18 x 33",
          cantidad: "4000",
          precio: "$ 40.00",
          precioNum: 40,
          proveedor: "Proveedor 1",
          cantidadRecibida: 2500
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
          articuloEscanear : {   id: 't001',
          articulo: "Tornillo 5 cm",
          presentacion: "5 cm",
          cantidad: "9000",
          precio: "$ 7.00",
          precioNum: 7,
          proveedor: "Proveedor 2",
          cantidadRecibida: null
        },
        };
    },

    mounted() {
        //qr_code_2
    },

    methods: {
        addArticulo(){
            this.articuloEscanear.cantidadRecibida = this.cantidadRcibida
            this.articulos.push(this.articuloEscanear)
        }
    },
};
</script>

<style lang="scss" scoped>

</style>

