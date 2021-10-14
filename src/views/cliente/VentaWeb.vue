<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Venta Web</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="articulos"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Datos de la factura</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    label="Cliente nombre"
                    v-model="clienteNombre"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                     <v-col cols="4">
                  <v-text-field
                    label="Cliente apellido"
                    v-model="clienteApellido"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                    label="Cliente documento"
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
                    label="Cliente telefono"
                    v-model="clienteTelefono"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                    label="Cliente correo"
                    v-model="clienteCorreo"
                    hide-details
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                 <v-col cols="4">
                  <v-text-field
                    label="Direccion envio"
                    hide-details
                    v-model="direccionEnvio"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn flat color="primary">Generar Factura</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RopelatoVentaweb",

  data() {
    return {
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Presentacion", value: "presentacion" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Precio", value: "precio" },
        { text: "Modo Retiro", value: "modoRetiro" },
        { text: "Fecha Entrega", value: "fechaEntrega" },
        ,
      ],

      articulos: [
        {
          nombre: "Pastina negra",
          presentacion: "1 Kg",
          cantidad: "10",
          precio: "$ 201",
          modoRetiro: "Envio a domicilio",
          fechaEntrega: this.sumarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
        },
        {
          nombre: "Bañera",
          presentacion: "3/8",
          cantidad: "1",
          precio: "$ 19000",
          modoRetiro: "Envio a domicilio",
          fechaEntrega: this.sumarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
        },
        {
          nombre: "Hierro nervado",
          presentacion: "20 mm",
          cantidad: "4",
          precio: "$ 5280",
          modoRetiro: "Envio a domicilio",
          fechaEntrega: this.sumarDiasFecha(
            new Date(),
            Math.floor(Math.random() * (10 - 1) + 1)
          )
            .toISOString()
            .substr(0, 10),
        },
      ],

      clienteNombre: "Roberto",
      clienteApellido: "Carlos",
      clienteDni: " 23457612",
      clienteTelefono: "568734",
      clienteCorreo: "correo@gmail.com",
      direccionEnvio: null

    };
  },

  mounted() {},

  methods: {
    sumarDiasFecha(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
  },
};
</script>

<style lang="scss" scoped></style>
