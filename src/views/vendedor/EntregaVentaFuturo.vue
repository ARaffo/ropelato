<template>
    <div>
        <v-container>
             <v-row>
            <v-col cols="4">
                <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{titulo}}</h3>
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
                label="Nombre"
                v-model="clienteNombre"
                outlined
                dense
                readonly
          ></v-text-field>
          <v-text-field v-if="clienteApellido"
                label="Apellido"
                v-model="clienteApellido"
                outlined
                dense
                readonly
          ></v-text-field>
          <v-text-field v-if="clienteDni"
                label="DNI"
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
           <v-text-field v-if="clienteDni"
                label="Dirección Envio"
                v-model="direccion"
                outlined
                dense
          ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn @click="findFactura(numeroFactura)" color="primary">Buscar</v-btn>
            </v-card-actions>
        </v-card>
            </v-col>
            <v-col>
                <v-card v-if="lineasFactura.length != 0">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Artículos</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div v-for="item in lineasFactura" :key="item.id">
                            <v-row>
                                <v-col >
                                    <v-text-field
                                            label="Artículo"
                                            v-model="item.articulo"
                                            outlined
                                            dense
                                            readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                     <v-text-field
                                            label="Cantidad"
                                            v-model="item.cantidad"
                                            outlined
                                            dense
                                            readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
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
                                            :items="['Envio a domicilio','Deposito']"
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
            titulo: 'Ingrese el numero de factura',
            facturas : [
                {
                    id: '0004-00002485',
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
                            precio: '$ 11.00',
                            cantidadARetirar: null
                        },
                        {
                            id: 'l002',
                            articulo: 'Pastina negra',
                            cantidad: '56',
                            precio: '$ 201.00',
                            cantidadARetirar: null
                        },
                        {
                            id: 'l002',
                            articulo: 'Bañera',
                            cantidad: '2',
                            precio: '$ 19000.00',
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
            direccion: null,

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
                this.titulo = 'Factura'
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