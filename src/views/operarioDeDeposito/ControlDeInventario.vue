<template>
    <v-container>
        <v-card width="400" v-if="!buscar">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Depósitos</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-combobox
                dense
                outlined
                :items="['Depósito 1', 'Depósito 2', 'Depósito 3']"
                v-model="deposito"
                hide-details=""
                ></v-combobox>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn>Cancelar</v-btn>
                <v-btn @click="buscar = true" color="primary">Aceptar</v-btn>
                
            </v-card-actions>
        </v-card>

        <v-card width="850" v-else>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Artículos en Depósito 1</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items-per-page="5"
                :items="articulos"
                class="elevation-1"
                  :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
            >
            <template  v-slot:[`item.cantidadRelevada`]="{ item }">
                   <v-text-field
                        v-model="item.cantidadrelevada"
                        outlined         
                        dense
                        hide-details
                        ></v-text-field>

            </template>
            </v-data-table>
            </v-card-text>
            <v-card-actions class="justify-end">
                 <v-btn @click="buscar = false">Cancelar</v-btn>
                <v-btn @click="dialog = true" color="primary">Aceptar</v-btn>
             
            </v-card-actions>
        </v-card>


        <v-dialog
      v-model="dialog"
      width="500"
    >


      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         Observación tornillo 5 cm
        </v-card-title>

        <v-card-text  class="pb-0">
        <v-textarea
        class="mt-2"
          solo
          name="input-7-4"
        ></v-textarea>
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
    name: 'ControlDeInventario',

    data() {
        return {
            buscar: false,
            deposito: null,
            dialog: false,
             headers: [
          {
            text: 'Id artículo',
            align: 'start',
            value: 'idArticulo',
            width: 80
          },
          { text: 'Nombre', value: 'nombre' ,width: 60},
          { text: 'Cantidad esperada', value: 'cantidadDisponible',width: 70 },
          { text: 'Estantería', value: 'estanteria',width: 60 },
          { text: 'Nivel', value: 'nivel',width: 60 },
          { text: 'Columna', value: 'columna' ,width: 60},
          { text: 'Cantidad relevada', value: 'cantidadRelevada' ,width: 70},
        ],

         articulos: [
            {
                idArticulo: 't001',
                nombre: 'Tornillo 5 cm',
                cantidadDisponible: 1500 ,
                stockMinimo: 2000 ,
                stockRecomendado: 4000,
                stockAComprar: 2500,
                proveedor:'Proveedor 1',
                estanteria: '4',
                nivel: '1',
                columna: '7',
                cantidadRelevada: null
            },
            {
                idArticulo: 'pl001',
                nombre:'Plavicon sellador 25 gr',
                cantidadDisponible: 2000,
                stockMinimo: 2500,
                stockRecomendado: 3000,
                stockAComprar: 1000,
                proveedor:'Proveedor 3',
                  estanteria: '1',
                nivel: '1',
                columna: '2',
                cantidadRelevada: null
            },
              {
                idArticulo: 't002',
                nombre: 'Tornillo 8 cm',
                cantidadDisponible: 2000,
                stockMinimo: 3000,
                stockRecomendado: 6000,
                stockAComprar: 4000,
                proveedor:'Proveedor 1',
                  estanteria: '2',
                nivel: '1',
                columna:'7',
               cantidadRelevada: null
            },
             {
                idArticulo: 'e001',
                nombre:'Entrerrosca de bronce 3/8',
                cantidadDisponible: 1200,
                stockMinimo: 1500,
                stockRecomendado: 2500,
                stockAComprar: 1300,
                proveedor:'Proveedor 2',
                  estanteria: '12',
                nivel: '3',
                columna: '14',
               cantidadRelevada: null
            },
             {
                idArticulo: 'h001',
                nombre:'Hierro nervado',
                cantidadDisponible: 1560,
                stockMinimo: 1600,
                stockRecomendado: 2000,
                stockAComprar: 440,
                proveedor:'Proveedor 1',
                  estanteria: '13',
                nivel: '2',
                columna: '20',
                cantidadRelevada: null
            },
        ],
        
        articulosConDicrepancias: [

        ]

        };
    },

    mounted() {
        
    },

    methods: {
        addArticuloConDicrepancias(){
            this.articulos.forEach(articulo => {
                if(articulo.cantidadDisponible != articulo.cantidadRelevada ){
                    this.articulosConDicrepancias.push(articulo)
                }        
            });
        }
    },
};
</script>

<style lang="scss" scoped>

</style>