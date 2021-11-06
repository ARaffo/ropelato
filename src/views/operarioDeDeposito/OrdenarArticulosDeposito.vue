<template>
    <v-container>
        <v-card width="400" v-if="!buscar">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Depositos</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-combobox
                dense
                outlined
                :items="['Depósito  1', 'Depósito  2', 'Depósito  3']"
                v-model="deposito"
                hide-details=""
                ></v-combobox>
            </v-card-text>
            <v-card-actions class="justify-end">
                
                <v-btn>Cancelar</v-btn>
                <v-btn @click="buscar = true" color="primary">Aceptar</v-btn>
            </v-card-actions>
        </v-card>

        <v-card width="300" v-else>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Buscar Artículos</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="8" class="pb-0">
                        <v-text-field
                        label="Id artículo o Nombre"
                        v-model="buscarArticulo"
                        outlined
              
                        dense
                        ></v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                        
                         <v-btn @click="dialog = true" class="ml-4"  icon>
                          <v-icon size="60">qr_code_scanner</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                 
            </v-card-text>
            <v-card-actions class="justify-end pt-0">
               
                <v-btn  @click="buscar = false">Cancelar</v-btn>
                 <v-btn @click="dialog = true"  color="primary">Buscar</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
      v-model="dialog"
      width="700"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Buje reducción rosca ubicacion
        </v-card-title>

        <v-card-text>
             <v-data-table
                :headers="headers"
                :items-per-page="5"
                :items="articulos"
                class="elevation-1 mt-2"
                   :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
            >
              <template  v-slot:[`item.estanteria`]="{ item }">
                   <v-text-field
                        v-model="item.estanteria"
                        outlined         
                        dense
                        hide-details
                        ></v-text-field>

            </template>

            <template  v-slot:[`item.nivel`]="{ item }">
                   <v-text-field
                        v-model="item.nivel"
                        outlined         
                        dense
                        hide-details
                        ></v-text-field>

            </template>

            <template  v-slot:[`item.columna`]="{ item }">
                   <v-text-field
                        v-model="item.columna"
                        outlined         
                        dense
                        hide-details
                        ></v-text-field>

            </template>
            
            </v-data-table>
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
    name: 'OrdenarArticulosDeposito',

    data() {
        return {
            deposito: null,
            buscar: false,
            buscarArticulo: null,
            dialog: false,

            headers: [
          {
            text: 'Id Artículo',
            align: 'start',
            value: 'idArticulo',
            width: 80,
          },
          { text: 'Artículo', value: 'nombre',width: 60 },
          { text: 'Cantidad', value: 'cantidadDisponible',width: 70 },
          { text: 'Estanteria', value: 'estanteria',width: 60 },
          { text: 'Nivel', value: 'nivel',width: 60 },
          { text: 'Columna', value: 'columna',width: 60 },
        ],

        articulos : [
            {
                idArticulo: 'b001',
                nombre:'Buje reduccion rosca',
                cantidadDisponible: 400,
                estanteria: null,
                nivel:null,
                columna:null,
                stockMinimo: 600,
                stockRecomendado: 1500,
                stockAComprar: 1100,
                proveedor:'Proveedor 1',}
        ]
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>