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
                        hide-details
                        dense
                        readonly
                        class="pb-0"
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
              label="Fecha de retiro"
              v-model="fecha"
              outlined
              hide-details
              dense
              filled
              class="pb-0"
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
            <v-select
                        :items="['Entre Ríos']"
                        label="Provincia"
                        v-model="dirProvincia"
                        readonly
                        hide-details
                        outlined
                        dense
                        filled
                        class="pt-0"
                      ></v-select>
                 
              
              </v-col>
             </v-row>
             <v-row>
               <v-col cols="4">
                  <v-select
                      :items="['Concepción del Uruguay']"
                      label="Ciudad"
                      v-model="dirCiudad"
                      outlined
                      dense
                      filled
                      hide-details
                      readonly
                      class="pt-0"
                    ></v-select>
               </v-col>
               <v-col cols="4">
                  <v-text-field
                      :items="['Rocamora']"
                      label="Calle"
                      v-model="dirDireccion"
                      outlined
                      filled
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
               </v-col>
                <v-col cols="2">
                        <v-text-field
                        dense
                        outlined
                        filled
                        v-model="numero"
                        readonly
                        label="Número"
                      >
                      </v-text-field>
                      </v-col>
                       <v-col cols="2">
                        <v-text-field
                        dense
                        outlined
                        filled
                        v-model="departamento"
                        readonly
                        label="Piso/Depto"
                      >
                      </v-text-field>
                      </v-col>
             </v-row>
            <!-- <v-row class="mt-3">
                     
                    </v-row> -->
           
           
           
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
            <v-data-table
            :headers="headers"
            :items="facturas[0].lineaFactura"
            :items-per-page="5"
            class="elevation-1"
               :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
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
                    label="Modo de retiro"
                    outlined
                    hide-details
                    dense
                  ></v-combobox>
            </template>
          </v-data-table>
          </v-card-text>
          <v-card-actions class="justify-end">
            
             <v-btn>
              Cancelar
            </v-btn>
            <v-btn color="primary">
              Aceptar
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
       dirEnvio : ['Rocamora 789','Entre Ríos','Concepción del Uruguay'],
      dirProvincia: 'Entre Ríos',
      dirCiudad: 'Concepción del Uruguay',
      dirDireccion: 'Rocamora',
      numero: 567,
      piso: null,
      fecha:'10-12-2021',
      departamento: '2-B',
      calle: null,
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
          { text: 'Fecha de reposición', value: 'fechaEntrega',width: 100  },
          { text: 'Cantidad a retirar', value: 'cantidadRetirar', width: 90  },
          { text: 'Modo de retiro', value: 'modoRetiro',width: 100  },
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
