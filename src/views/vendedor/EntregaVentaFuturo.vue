<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
           
           <v-card v-if="this.clienteNombre == null" width="400">
               <v-card-title primary-title>
                   <div>
                       <h3 class="headline mb-0">Ingrese el número de factura</h3>
                   </div>
               </v-card-title>
               <v-card-text class="pb-0">
                     <v-text-field
                        label="Número de factura"
                        v-model="numeroFactura"
                        outlined
                        dense
                        v-on:keyup.enter="findFactura(numeroFactura)"
                        ></v-text-field>
               </v-card-text>
               <v-card-actions class="justify-end ">
                   <v-btn @click="findFactura(numeroFactura)"  color="primary">Buscar</v-btn>
               </v-card-actions>
           </v-card>


            <v-card v-else >
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ titulo }}</h3>
            </div>
          </v-card-title>        
          <v-card-text class="pb-0">
              <v-row>
                <v-col>
                     <v-text-field
                        label="Número de factura"
                        v-model="numeroFactura"
                        outlined
                        dense
                        v-on:keyup.enter="findFactura(numeroFactura)"
                        ></v-text-field>
                         
                        <v-text-field
                        v-if="clienteDni"
                        label="DNI"
                        v-model="clienteDni"
                        outlined
                        dense
                        readonly
                        ></v-text-field>
                </v-col>
                    <v-col>
                        
                    <v-text-field
                    v-if="clienteNombre"
                    label="Nombre"
                    v-model="clienteNombre"
                    outlined
                    dense
                    readonly
                    ></v-text-field>
                     <v-text-field
              v-if="clienteDni"
              label="Fecha retiro"
              v-model="fechaRetiro"
              outlined
              dense
            ></v-text-field>
                    </v-col>
              <v-col>
                  <v-text-field
              v-if="clienteApellido"
              label="Apellido"
              v-model="clienteApellido"
              outlined
              dense
              readonly
            ></v-text-field>
             <v-text-field
              v-if="clienteDni"
              label="Dirección Envio"
              v-model="direccion"
              outlined
              dense
            ></v-text-field>
              </v-col>
          </v-row>
           
           
           
           
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              v-if="this.numeroFactura == null"
              @click="findFactura(numeroFactura)"
              color="primary"
              >Buscar</v-btn
            >
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
    
        <v-card class="mt-2" v-if="lineasFactura.length != 0">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Artículos</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <!-- <div v-for="item in lineasFactura" :key="item.id">
              <v-row>
                <v-col>
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
                <v-col>
                  <v-text-field
                    label="Cantidad disponible"
                    v-model="item.cantidadDeposito"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Fecha reposición"
                    v-model="item.fechaEntrega"
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
                  <v-combobox
                    v-if="clienteDni"
                    v-model="item.modoRetiro"
                    :items="['Envio a domicilio', 'Deposito']"
                    label="Modo Retiro"
                    outlined
                    dense
                  ></v-combobox>
                </v-col>
              </v-row>
            </div> -->
            <v-data-table
            :headers="headers"
            :items="facturas[0].lineaFactura"
            :items-per-page="5"
            class="elevation-1"
          >
           <template v-slot:[`item.cantidadRetirar`]="{ item }">
              <v-text-field
                    hide-details
                    v-model="item.cantidadRetirar"
                    outlined
                    dense
                  ></v-text-field>
            </template>
             <template v-slot:[`item.modoRetiro`]="{ item }">
              <v-combobox
                    v-if="clienteDni"
                    v-model="item.modoRetiro"
                    :items="['Envio a domicilio', 'Deposito']"
                    label="Modo Retiro"
                    outlined
                    hide-details
                    dense
                  ></v-combobox>
            </template>
          </v-data-table>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary">
              Aceptar
            </v-btn>
             <v-btn>
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      
    </v-container>
  </div>
</template>

<script>
export default {
  name: "EntregaVentaFuturo",

  data() {
    return {
       headers: [
          {
            text: 'Artículo',
            align: 'start',
            sortable: false,
            value: 'articulo',
            width: 70 
          },
          { text: 'Cantidad', value: 'cantidad',width: 70 },
          { text: 'Cantidad disponible', value: 'cantidadDeposito', width: 70 },
          { text: 'Fecha reposición', value: 'fechaEntrega',width: 100  },
          { text: 'Cantidad a retirar', value: 'cantidadRetirar', width: 90  },
          { text: 'Mode Retiro', value: 'modoRetiro',width: 100  },
        ],
      titulo: "Ingrese el número de factura",
      facturas: [
        {
          id: "0004-00002485",
          fecha: "09/10/2021",
          direccionENvio: null,
          nombreCliente: "Juan",
          apellidoCliente: " Perez",
          dniCliente: "45761298",
          lineaFactura: [
            {
              id: "l001",
              articulo: "Tornillo",
              cantidad: "20",
              precio: "$ 11.00",
              cantidadARetirar: null,
              cantidadDeposito: 500,
              fechaEntrega: "25-10-2021",
              modoRetiro: null,
            },
            {
              id: "l002",
              articulo: "Pastina negra",
              cantidad: "56",
              precio: "$ 201.00",
              fechaEntrega: "20-10-2021",
              cantidadDeposito: 1450,
              cantidadARetirar: null,
              modoRetiro: null,
            },
            {
              id: "l003",
              articulo: "Bañera",
              cantidad: "2",
              precio: "$ 19000.00",
              fechaEntrega: "31-10-2021",
              cantidadDeposito: 0,
              cantidadARetirar: null,
              modoRetiro: null,
            },
          ],
        },
      ],

      numeroFactura: null,
      clienteNombre: null,
      clienteApellido: null,
      clienteDni: null,
      fechaRetiro: null,
      modoRetiro: null,
      direccion: null,

      lineasFactura: [],
    };
  },

  created() {
    console.log("facturas", this.facturas);
  },

  mounted() {},

  methods: {
    findFactura(numero) {
      let factura = this.facturas.find((factura) => factura.id == numero);

      console.log("encontrada", factura);

      if (factura != undefined) {
        this.titulo = "Factura";
        this.clienteNombre = factura.nombreCliente;
        this.clienteApellido = factura.apellidoCliente;
        this.clienteDni = factura.dniCliente;
        this.lineasFactura = factura.lineaFactura;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
