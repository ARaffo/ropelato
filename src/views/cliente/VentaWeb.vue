<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Datos de la compra</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-data-table
              :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
                :headers="headers"
                :items="articulos"
                :items-per-page="5"
                class="elevation-1"
              >
                <template
              v-slot:footer
            >
              <div class=" ml-3 mt-4">
               Total: ${{total}}.00
              </div>
            </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Datos del cliente</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Nombre"
                    v-model="clienteNombre"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                     <v-col cols="4">
                  <v-text-field
                    label="Apellido"
                    v-model="clienteApellido"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                    label="Documento"
                    v-model="clienteDni"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                 <v-col cols="4">
                  <v-text-field
                    label="Teléfono"
                    v-model="clienteTelefono"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                    label="Correo"
                    v-model="clienteCorreo"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                    
                    label="Dirección de envío"
                    hide-details
                    v-model="direccionEnvio"
                    outlined
                    dense
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn @click="finalizar"  color="primary">Confirmar envío</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "RopelatoVentaweb",

  data() {
    return {
      randomNum: Math.floor(Math.random() * (10 - 1) + 1),
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Presentación", value: "presentacion" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Precio", value: "precio" },
        { text: "Modo de retiro", value: "modoRetiro" },
        { text: "Fecha de entrega", value: "fechaEntrega" },
        ,
      ],

      articulos: [
        {
          nombre: "Pastina negra",
          presentacion: "1 Kg",
          cantidad: "10",
          precio: "$ 201",
          precioNum: 201,
          modoRetiro: "Envío  a domicilio",
          fechaEntrega: new Date().toISOString().substr(0, 10),

        },
        {
          nombre: "Bañera",
          presentacion: "3/8",
          cantidad: "1",
          precio: "$ 19000",
          precioNum: 19000,
          modoRetiro: "Envío  a domicilio",
          fechaEntrega: new Date().toISOString()
            .substr(0, 10),
        },
        {
          nombre: "Hierro nervado",
          presentacion: "20 mm",
          cantidad: "4",
          precio: "$ 5280",
          precioNum: 5280,
          modoRetiro: "Envío  a domicilio",
          fechaEntrega: new Date().toISOString()
            .substr(0, 10),
        },
      ],

      clienteNombre: "Roberto",
      clienteApellido: "Carlos",
      clienteDni: " 23457612",
      clienteTelefono: " 3442 568734",
      clienteCorreo: "correo@gmail.com",
      direccionEnvio: null,

    };
  },

  mounted() {},

  methods: {
    sumarDiasFecha(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },

    getFecha(){
      return this.sumarDiasFecha(
            new Date(),
            this.randomNum
          )
            .toISOString()
            .substr(0, 10)
    },

    finalizar(){
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada con exito',
        showConfirmButton: true,
        })
    }
  },

  computed: {
      total : function() {
      let total = 0

      if( this.articulos.length != 0) {
        this.articulos.forEach(articulo => {
        total  += articulo.cantidad * articulo.precioNum
      });
      }
      return total
    }
  }
};
</script>

<style lang="scss" scoped></style>
