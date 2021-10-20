<template>
    <v-container>
        <v-card v-if="!generada">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Generar Orden de Compra para Artículos con Stock Reducido</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items=" articulos"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn color="primary" @click="generada = true">Aceptar</v-btn>
                <v-btn  >Cancelar</v-btn>
            </v-card-actions>
        </v-card>


        <v-card v-else width="750">
              <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Orden de compra generada</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headersOrdenCompra"
                    :items=" articulos"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'GenerarOrdenDeCompraPorStockReducido',

    data() {
        return {
            generada: false,
            headers: [
          {
            text: 'Id artículo',
            align: 'start',
            sortable: false,
            value: 'idArticulo',
          },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Cantidad disponible', value: 'cantidadDisponible' },
          { text: 'Stock minimo', value: 'stockMinimo' },
          { text: 'Stock recomendado', value: 'stockRecomendado' },
          { text: 'Proveedor', value: 'proveedor' },
        ],
        headersOrdenCompra: [
          { text: 'Nombre', value: 'nombre' ,width: 80},
          { text: 'Cantidad comprada', value: 'stockRecomendado', width: 80},
          { text: 'Proveedor', value: 'proveedor',width: 80 },
          { text: 'Fecha ', value: 'fechaActual', width: 80},  
        ],
        //se  ordena sobre el campo proveedor
        //mostrar directamente articulos de un provedoor a pedir o pantalla anterior que seleccionas proveedor y dsp esta
        articulos: [
            {
                idArticulo: 't001',
                nombre: 'Tornillo 5 cm',
                cantidadDisponible: 2000,
                stockMinimo: 1500,
                stockRecomendado: 4000,
                proveedor:'Proveedor 1',
                fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
            {
                idArticulo: 'pl001',
                nombre:'Plavicon sellador 25 gr',
                cantidadDisponible: 200,
                stockMinimo: 2500,
                stockRecomendado: 3000,
                proveedor:'Proveedor 3',
                 fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
              {
                idArticulo: 't002',
                nombre: 'Tornillo 8 cm',
                cantidadDisponible: 2000,
                stockMinimo: 3000,
                stockRecomendado: 6000,
                proveedor:'Proveedor 1',
                 fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
             {
                idArticulo: 'e001',
                nombre:'Entrerrosca de bronce 3/8',
                cantidadDisponible: 1200,
                stockMinimo: 1500,
                stockRecomendado: 2500,
                proveedor:'Proveedor 2',
                 fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
             {
                idArticulo: 'h001',
                nombre:'Hierro nervado',
                cantidadDisponible: 1560,
                stockMinimo: 1600,
                stockRecomendado: 2000,
                proveedor:'Proveedor 1',
                 fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
              {
                idArticulo: 'p001',
                nombre: 'Pastina negra 1 Kg',
                cantidadDisponible: 500,
                stockMinimo: 600,
                stockRecomendado: 1000,
                proveedor:'Proveedor 1',
                 fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
              {
                idArticulo: 'b001',
                nombre:'Buje reduccion rosca',
                cantidadDisponible: 400,
                stockMinimo: 600,
                stockRecomendado: 1500,
                proveedor:'Proveedor 1',
                 fechaActual: new Date().toISOString()
            .substr(0, 10),
            },
            
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