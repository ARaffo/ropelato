<template>
    <div>
        <v-container>
             <v-row>
            <v-col>
                <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Ingrese el numero de factura</h3>
                </div>
            </v-card-title>
            <v-card-text class="pb-0">
                <v-text-field
                label="Numero factura"
                v-model="numeroFactura"
                outlined
                dense
                v-on:keyup.enter="findFactura(numeroFactura)"
          ></v-text-field>
            <v-text-field v-if="clienteNombre"
                label="Cliente nombre"
                v-model="clienteNombre"
                outlined
                dense
                readonly
          ></v-text-field>
          <v-text-field v-if="clienteApellido"
                label="Cliente apellido"
                v-model="clienteApellido"
                outlined
                dense
                readonly
          ></v-text-field>
          <v-text-field v-if="clienteDni"
                label="Cliente dni"
                v-model="clienteDni"
                outlined
                dense
                readonly
          ></v-text-field>
           <v-text-field v-if="clienteDni"
                label="Fecha retiro"
                v-model="fechaRetiro"
                outlined
                dense
          ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn  color="primary">Buscar</v-btn>
                <v-btn  color="primary">text</v-btn>
            </v-card-actions>
        </v-card>
            </v-col>
            <v-col>
                <v-card v-if="lineasFactura.length != 0">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Articulos</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div v-for="item in lineasFactura" :key="item.id">
                            <v-row>
                                <v-col >
                                    <v-text-field
                                            label="Articulo"
                                            v-model="item.articulo"
                                            outlined
                                            dense
                                            readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col >
                                     <v-text-field
                                            label="Cantidad"
                                            v-model="item.cantidad"
                                            outlined
                                            dense
                                            readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col >
                                    <v-text-field
                                            label="Precio"
                                            v-model="item.precio"
                                            outlined
                                            dense
                                            readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                            label="Cantidad a retirar"
                                            v-model="item.cantidadARetirar"
                                            outlined
                                            dense
                                            readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-combobox v-if="clienteDni"
                                            v-model="modoRetiro"
                                            :items="['Envio a domicilio','deposito']"
                                            label="Modo Retiro"
                                            outlined
                                            dense
                                    ></v-combobox>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
       
    </div> 
</template>

<script>
export default {
    name: 'EntregaVentaFuturo',

    data() {
        return {
            facturas : [
                {
                    id: 'f001',
                    fecha: '09/10/2021',
                    direccionENvio: null,
                    nombreCliente: 'Juan',
                    apellidoCliente: ' Perez',
                    dniCliente: '45761298',
                    lineaFactura: [
                        {
                            id: 'l001',
                            articulo: 'Tornillo',
                            cantidad: '20',
                            precio: '11',
                            cantidadARetirar: null
                        },
                        {
                            id: 'l002',
                            articulo: 'Pastina negra',
                            cantidad: '56',
                            precio: '201',
                            cantidadARetirar: null
                        },
                        {
                            id: 'l002',
                            articulo: 'Bañera',
                            cantidad: '2',
                            precio: '19000',
                            cantidadARetirar: null
                        }
                    ]
                },
            ],

            numeroFactura: null,
            clienteNombre: null,
            clienteApellido: null,
            clienteDni: null,
            fechaRetiro: null,
            modoRetiro: null,

            lineasFactura: []


            
        };
    },

    created(){
        console.log('facturas',this.facturas)
    },

    mounted() {
       
    },

    methods: {
         findFactura(numero){

            let factura = this.facturas.find(
                factura => factura.id == numero
            )

            console.log('encontrada',factura)

            if(factura != undefined){
                this.clienteNombre = factura.nombreCliente
                this.clienteApellido = factura.apellidoCliente
                this.clienteDni = factura.dniCliente
                this.lineasFactura = factura.lineaFactura
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>