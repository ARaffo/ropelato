<template>
  <div>
    <!-- <v-btn color="warning" @click="agregarArticulo">Save articulo</v-btn> -->
    <!-- <v-btn @click="ver"> articulos lo</v-btn> -->

    <v-stepper v-model="e1" height="870">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Artículos
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Clientes
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Envío  a domicilio
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="formArticulos" v-model="valid" lazy-validation>
            <v-row class="mt-1">
              <v-col cols="2">
                <v-text-field
                  v-model="entradaIdArticulos"
                  dense
                  outlined
                  label="Id artículo"
                  v-on:keyup.enter="findArticuloById(entradaIdArticulos)"
                  findArticuloById
                  :rules="idArticuloRule"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  v-model="entradaNombreArticulo"
                  :items="nombresArticulos"
                  hide-details
                  dense
                  outlined
                  label="Nombre"
                  @change="finArticuloByNombre(entradaNombreArticulo)"
                  :rules="nombreArticuloRule"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="entradaCantidad"
                  dense
                  outlined
                  label="Cantidad"
                  :rules="cantidadArticuloRule"
                >
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  :items="modoRetiroArticulo"
                  v-model="entradaModoRetiro"
                  hide-details
                  label="Modo de retiro"
                  dense
                  outlined
                  :rules="modoRetiroArticuloRule"
                >
                </v-select>
              </v-col>
              <v-col cols="2">
                <v-btn @click="validarArticulos">
                  Agregar Articulo
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

          <v-data-table
            fixed-header
            height="300"
            :headers="headers"
            :items="articulosSeleccionados"
            :items-per-page="5"
            class="elevation-1"
            :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
          >
            <template v-slot:[`item.eliminar`]="{ item }">
              <v-icon
                class="ml-4"
                :disabled="!item.agregado"
                small
                @click="deleteItem(item)"
              >
                delete
              </v-icon>
            </template>

            <template v-slot:[`item.ventaFuturo`]="{ item }">
              <v-checkbox v-model="item.ventaFuturo"></v-checkbox>
            </template>

            <template
              v-slot:footer
            >
              <div class="ml-3">
               Total: ${{total}}.00
              </div>
            </template>
          </v-data-table>

          <!-- <v-btn @click="agregarArticulo">
            guardar articulos
          </v-btn> -->
          <v-row>
            <v-col class="text-right">
              <!-- <v-btn @click="pruebarda">
                pruebarda
              </v-btn> -->
              
              <!-- :disabled="articulosSeleccionados.length < 1" -->
              <v-btn text class="mt-5">
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                @click="
                  e1 = 2;
                  addArticulosConEnvioDomicilio();
                "
                class="mt-5"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  outlined
                  filled
                  v-model="cuil"
                  label="CUIL/CUIT/DNI"
                  required
                  class="mt-3 ml-7 mr-6"
                  v-on:keyup.enter="findCliente(cuil)"
                >
                </v-text-field>

                <v-row class="ml-4 mr-4">
                  <v-col class="pb-0">
                    <v-text-field
                      outlined
                      v-model="nombre"
                      label="Nombre"
                      required
                      :rules="nombreRule"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <v-text-field
                      outlined
                      v-model="apellido"
                      label="Apellido"
                      required
                      :rules="apellidoRule"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <v-text-field
                      outlined
                      v-model="documento"
                      label="Documento"
                      required
                      :rules="documentoRule"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ml-4 mr-4">
                  <v-col class="pb-0">
                    <v-text-field
                      outlined
                      v-model="telefono"
                      label="Teléfono"
                      required
                      :rules="telefonoRule"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <v-text-field
                      outlined
                      v-model="correo"
                      label="Correo"
                      required
                      :rules="correoRule"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <v-text-field
                      outlined
                      v-model="direccion"
                      label="Dirección"
                      required
                      :rules="direccionRule"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="ml-4 mr-4">
                  <v-col class="pb-0">
                    <v-select
                      :items="provincias"
                      v-model="provincia"
                      item-text="nombre"
                      label="Provincia"
                      outlined
                      item-value="id"
                      @change="cargarDepartamentos"
                      :readonly="soloLectura"
                      :rules="provinciaRule"
                    ></v-select>
                  </v-col>
                  <v-col class="pb-0">
                    <v-select
                      :items="departamentos"
                      v-model="departamento"
                      item-text="nombre"
                      label="Departamento"
                      outlined
                      item-value="id"
                      @change="cargarCiudades"
                      :readonly="soloLectura"
                      :rules="departamentoRule"
                    ></v-select>
                  </v-col>
                  <v-col class="pb-0">
                    <v-select
                      :items="ciudades"
                      v-model="ciudad"
                      item-text="nombre"
                      label="Ciudad"
                      outlined
                      item-value="id"
                      :readonly="soloLectura"
                      :rules="ciudadRule"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <v-row v-if="modoAgregarCliente">
            <v-col>
             
              <v-btn
                text
                @click="
                  e1 = 1;
                  modoAgregarCliente = false;
                "
                class="mt-5"
              >
                Cancel
              </v-btn>
               <v-btn
                :disabled="!valid"
                color="primary"
                @click="validarYGuardarCliente"
                class="mt-5"
              >
                Guardar
              </v-btn>

            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="text-right">
             
              <!-- @click="validarCliente" -->
              <v-btn
                text
                @click="
                  e1 = 1;
                  envioDomicilioArticulos = [];
                "
                class="mt-5"
              >
                Cancelar
              </v-btn>
               <v-btn
                :disabled="!valid"
                color="primary"
                @click="e1 = 3"
                class="mt-5"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" height="570px">
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-card>
                    <v-card-title>
                      Datos del cliente
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                        dense
                        outlined
                        v-model="nombre"
                        readonly
                        label="Nombre"
                      >
                      </v-text-field>
                      <v-text-field
                        dense
                        outlined
                        v-model="apellido"
                        readonly
                        label="Apellido"
                      >
                      </v-text-field>
                      <v-text-field
                        dense
                        outlined
                        v-model="documento"
                        readonly
                        label="Documento"
                      >
                      </v-text-field>
                      <v-select
                        :items="dirEnvio "
                        label="Provincia"
                        v-model="dirProvincia"
                        readonly
                        hide-details
                        outlined
                        dense
                      ></v-select>
                      <v-select
                      class="mt-6"
                      :items="dirEnvio "
                      label="Ciudad"
                      v-model="dirCiudad"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-select>
                    <v-text-field
                    class="mt-6"
                      :items="['Rocamora']"
                      label="Calle"
                      v-model="calle"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                    <v-row class="mt-4">
                      <v-col>
                        <v-text-field
                        dense
                        outlined
                        v-model="numero"
                        readonly
                        label="Número"
                      >
                      </v-text-field>
                      </v-col>
                       <v-col>
                        <v-text-field
                        dense
                        outlined
                        v-model="piso"
                        readonly
                        label="Piso"
                      >
                      </v-text-field>
                      </v-col>
                       <v-col>
                        <v-text-field
                        dense
                        outlined
                        v-model="departamento"
                        readonly
                        label="Departamento"
                      >
                      </v-text-field>
                      </v-col>
                    </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-title>
                      Envío  a domicilio
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="articulosDomicilioHeaders"
                        :items-per-page="5"
                        :items="envioDomicilioArticulos"
                        class="elevation-1"
                        :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
                      >
                        </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-row>
            <v-col class="text-right">
              <v-btn text @click="e1 = 2">
                Cancelar
              </v-btn>
               <v-btn color="primary" @click="finalizar">
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Ventas",

  data() {
    return {
      e1: 1,
      articulosDomicilioHeaders: [
        { text: "Nombre", value: "nombre", width: 110 },
        { text: "Cantidad", value: "cantidad", width: 50 },
        //{ text: "Precio", value: "precio", width: 100 },
        { text: "Fecha de entrega", value: "fechaEntrega", width: 100 },
       // { text: "Venta Futuro", value: "ventaFuturo", width: 70 },
      ],

      headers: [
        {
          text: "Id artículo",
          align: "start",
          sortable: false,
          value: "idArticulo",
          width: 80,
        },
        { text: "Nombre", value: "nombre", width: 110 },
        { text: "Cantidad", value: "cantidad", width: 50 },
        { text: "Precio", value: "precio", width: 100 },
        { text: "Modo de retiro", value: "modoDeRetiroSeleccionado", width: 110 },
        {
          text: "Cantidad disponible",
          value: "cantidadDisponible",
          width: 110,
        },
        { text: "Fecha de entrega", value: "fechaEntrega", width: 100 },
        { text: "Venta futuro", value: "ventaFuturo", width: 80 },
        { text: "Eliminar", value: "eliminar", sorteable: false, width: 100 },
      ],

      ///usuario
      dirEnvio : ['Rocamora 789','Entre Ríos','Concepción del Uruguay'],
      dirProvincia: 'Entre Ríos',
      dirCiudad: 'Concepción del Uruguay',
      calle: 'Rocamora',
      valor: null,
      nombre: null,
      apellido: null,
      documento: null,
      telefono: null,
      correo: null,
      direccion: null,
      ciudad: null,
      provincia: null,
      departamento: null,
      cuil: null,
      soloLectura: false,
      modoAgregarCliente: false,
      valid: true,
      numero:  789,
      departamento: 2,
      piso: 1,

      /////////////////////articulo
      formaDePResentacion: null,
      articulosLocal: [],
      localizacion: null,
      articulosSeleccionados: [],
      nombresArticulos: [],
      modoDeRetiroSeleccionado: null,
      validarticulos: true,
      entradaIdArticulos: null,
      entradaNombreArticulo: null,
      entradaModoRetiro: null,
      entradaCantidad: null,
      modoRetiroArticulo: [],
      direccionEnvio: 'Rocamora 789, Concepción del Uruguay, Entre Ríos',

      envioDomicilioArticulos: [],

      clientesLocal: [],
      cuilRule: [
        (v) => !!v || "Debe ingresar un cuil",
        (v) => /^[0-9]*$/.test(v) || "Solo se pueden ingresar números",
      ],
      nombreRule: [(v) => !!v || "Debe ingresar el nombre"],
      apellidoRule: [(v) => !!v || "Debe ingresar el apellido"],
      documentoRule: [(v) => !!v || "Debe ingresar el documento"],
      telefonoRule: [(v) => !!v || "Debe ingresar el telefono"],
      correoRule: [(v) => !!v || "Debe ingresar el correo"],
      direccionRule: [(v) => !!v || "Debe ingresar el correo"],
      provinciaRule: [(v) => !!v || "Debe ingresar el correo"],
      departamentoRule: [(v) => !!v || "Debe ingresar el correo"],
      ciudadRule: [(v) => !!v || "Debe ingresar el correo"],

      idArticuloRule: [(v) => !!v || "Debe ingresar el id del articulo"],
      nombreArticuloRule: [
        (v) => !!v || "Debe ingresar el nombre del articulo",
      ],
      cantidadArticuloRule: [
        (v) => !!v || "Debe ingresar el la cantidad a comprar del articulo",
      ],
      modoRetiroArticuloRule: [
        (v) => !!v || "Debe ingresar el modo de retiro del articulo",
      ],

      articulosHarcode: [
        {
          idArticulo: "t001",
          nombre: "Tornillo  5 cm",
          cantidadDisponible: 3500,
          precio: "$ 11.00",
          precioNum:11,
          bajoDemanda: false,
          localizacion: ["Local", "Domicilio"],
        },
        {
          idArticulo: "t002",
          nombre: "Tornillo 8 cm",
          cantidadDisponible: 3200,
          precio: "$ 2.00",
          precioNum:2,
          bajoDemanda: false,
          localizacion: ["Local", "Domicilio"],
        },
        {
          idArticulo: "p001",
          nombre: "Pastina negra 1 Kg",
          cantidadDisponible: 30,
          precio: "$ 201.00",
          precioNum: 201,
          bajoDemanda: false,
          localizacion: ["Deposito 1", "Domicilio"],
        },
        {
          idArticulo: "b001",
          nombre: "Buje reducción rosca",
          cantidadDisponible: 300,
          precio: "$ 51.00",
          precioNum: 51,
          bajoDemanda: false,
          localizacion: ["Local", "Domicilio"],
        },
        {
          idArticulo: "e001",
          nombre: "Entrerrosca de bronce 3/8",
          cantidadDisponible: 300,
          precio: "$ 106.00",
          precioNum: 106,
          bajoDemanda: false,
          localizacion: ["Local", "Domicilio"],
        },
        {
          idArticulo: "ba001",
          nombre: "Bañera",
          cantidadDisponible: 0,
          precio: "$ 19000.00",
          precioNum: 19000,
          bajoDemanda: true,
          localizacion: ["Local", "Domicilio"],
        },
        {
          idArticulo: "pl001",
          nombre: "Plavicon sellador 25 gr",
          cantidadDisponible: 250,
          precio: "$ 18000.00",
          precioNum: 18000,
          bajoDemanda: false,
          localizacion: ["Deposito 2", "Domicilio"],
        },
        {
          idArticulo: "h001",
          nombre: "Hierro nervado 20 mm",
          cantidadDisponible: 450,
          precio: "$ 5280.00",
          precioNum: 5280,
          bajoDemanda: false,
          localizacion: ["Deposito 1", "Domicilio"],
        },
        {
          idArticulo: "c001",
          nombre: "Chapa sinusoidal 3.50 mm",
          cantidadDisponible: 1500,
          precio: "$ 5548.00",
          precioNum: 5548,
          bajoDemanda: false,
          localizacion: ["Deposito", "Domicilio"],
        },
        {
          idArticulo: "l001",
          nombre: "Ladrillo ceramico 12 x 18 x 33",
          cantidadDisponible: 3500,
          precio: "$ 59.00",
          precioNum: 59,
          bajoDemanda: false,
          localizacion: ["Deposito 2", "Domicilio"],
        },
        {
          idArticulo: "l002",
          nombre: "Ladrillo ceramico 18 x 18 x 33",
          cantidadDisponible: 4500,
          precio: "$ 90.00",
          precioNum: 90,
          bajoDemanda: false,
          localizacion: ["Deposito 2", "Domicilio"],
        },
      ],

      clientes: [
        {
          cuil: 2013456788,
          nombre: "Juan",
          apellido: "Carlos",
          documento: 13456784,
          telefono: "3447 678754",
          correo: "correo@gmail.com",
          direccion: "Rocamora 789",
          provincia: "30",
          departamento: "30098",
          ciudad: "30098040000",
        },
      ],
    };
  },

  mounted() {},

  created() {
    // this.fetchArticulos().then(() => {
    //   this.chargueNamesArticulos(this.articulos);
    // });
    this.chargueNamesArticulos(this.articulosHarcode);
    this.fetchProvincias();
    this.fetchDepartamentos("30");
    this.fetchCiudades("30098");
    this.fetchClientes();

    this.provincia = "30";
    this.departamento = "30098";
  },

  methods: {
    ...mapActions([
      "addArticulo",
      //"fetchArticulos",
      "fetchProvincias",
      "fetchDepartamentos",
      "fetchCiudades",
      "addCliente",
     // "fetchClientes",
    ]),

    // agregarArticulo(){
    //   this.articulosHarcode.forEach(articulo => {
    //     this.addArticulo({
    //         idArticulo: articulo.idArticulo,
    //         formaDePResentacion: articulo.formaDePResentacion,
    //         nombre : articulo.nombre,
    //         cantidadDisponible: articulo.cantidadDisponible,
    //         precio: articulo.precio,
    //         bajoDemanda : articulo.bajoDemanda,
    //         localizacion : articulo.localizacion,
    //   })
    //   });

    // },

    validarCliente() {
      if (this.$refs.form.validate()) {
        this.e1 = 3;
      }
    },

    validarYGuardarCliente() {
      if (this.$refs.form.validate()) {
        this.guardarCliente();
        this.e1 = 3;
      }
    },

    // ver() {
    //   console.log(this.articulos[0].localizacion);
    //   console.log(this.articulos);
    //   console.log(
    //     "prueba 1",
    //     JSON.parse(JSON.stringify(this.articulos[0].localizacion))
    //   );
    //   console.log("prueba", JSON.stringify(this.articulos[0].localizacion));
    //   console.log(typeof this.articulos[0].localizacion);
    //   console.log(this.articulos[0].localizacion.lenght);
    //   this.articulos[0].localizacion.forEach((element) => {
    //     console.log(element);
    //   });
    // },

    cargarDepartamentos() {
      this.fetchDepartamentos(this.provincia);
    },

    cargarCiudades() {
      this.fetchCiudades(this.departamento);
      console.log(this.provincia, this.departamento, this.ciudad);
    },

    findCliente(cuil) {
      const cliente = this.clientes.find((cliente) => cliente.cuil == cuil);
      console.log("cliente", cliente);
      if (cliente !== undefined) {
        this.nombre = cliente.nombre;
        this.apellido = cliente.apellido;
        this.documento = cliente.documento;
        this.correo = cliente.correo;
        this.direccion = cliente.direccion;
        this.provincia = cliente.provincia;
        this.telefono = cliente.telefono;
        this.departamento = cliente.departamento;
        this.ciudad = cliente.ciudad;
        this.soloLectura = true;
        //this.direccionEnvio = this.direccion;

        console.log("ciudad", this.ciudad);
      } else {
        Swal.fire({
          title: "Cliente no registrado",
          text: "Desea Agregarlo",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Agregar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.modoAgregarCliente = true;
          }
        });
      }
    },

    guardarCliente() {
      this.addCliente({
        cuil: this.cuil,
        nombre: this.nombre,
        apellido: this.apellido,
        documento: this.documento,
        telefono: this.telefono,
        correo: this.correo,
        direccion: this.direccion,
        provincia: this.provincia,
        departamento: this.departamento,
        ciudad: this.ciudad,
      });
    },

    // saveCliente() {
    //   this.addCliente({
    //     cuil: 2013456788,
    //     nombre: "Juan",
    //     apellido: "Carlos",
    //     documento: 1345678,
    //     telefono: "3447 678754",
    //     correo: "algo@gmail.com",
    //     direccion: "calle false 123",
    //     provincia: "30",
    //     departamento: "30098",
    //     ciudad: "30091020000",
    //   });
    // },

    findArticuloById(idArticulo) {
      let articulo = this.articulosHarcode.find(
        (element) => element.idArticulo == idArticulo
      );

      if (articulo != undefined) {
        this.modoRetiroArticulo = articulo.localizacion;
        this.entradaNombreArticulo = articulo.nombre;
      }
    },

    finArticuloByNombre(nombreArticulo) {
      let articulo = this.articulosHarcode.find(
        (element) => element.nombre == nombreArticulo
      );

      if (articulo != undefined) {
        this.modoRetiroArticulo = articulo.localizacion;
        this.entradaIdArticulos = articulo.idArticulo;
      }
    },

    deleteItem(item) {
      this.articulosSeleccionados.splice(
        this.articulosSeleccionados.indexOf(item),
        1
      );
    },

    chargueNamesArticulos(articulos) {
      articulos.forEach((articulo) => {
        this.nombresArticulos.push(articulo.nombre);
      });
      console.log(this.nombresArticulos);
    },

    sumarDiasFecha(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },

    validarArticulos() {
      if (this.$refs.formArticulos.validate()) {
        //this.e1 = 2;

        let randomNumFecha = Math.floor(Math.random() * (10 - 1) + 1);

        let articulo = this.articulosHarcode.find(
          (element) => element.idArticulo == this.entradaIdArticulos
        );

        articulo["modoDeRetiroSeleccionado"] = this.entradaModoRetiro;
        articulo["cantidad"] = this.entradaCantidad;
        articulo["agregado"] = true;
        articulo["ventaFuturo"] = false;

        articulo.fechaEntrega = this.sumarDiasFecha(new Date(), randomNumFecha)
          .toISOString()
          .substr(0, 10);

        console.log("articulo ver", articulo);

        this.agregarArticulo(articulo);

        console.log("ver", this.articulosSeleccionados);
      } else {
        Swal.fire("Faltan datos obligatorios, cantidad o modo de retiro ");
      }
    },

    agregarArticulo(articulo) {
      this.articulosSeleccionados.push(articulo);

      this.$refs.formArticulos.reset();
    },

    addArticulosConEnvioDomicilio() {
      this.articulosSeleccionados.forEach((articulo) => {
        if (articulo.modoDeRetiroSeleccionado == "Domicilio") {
          this.envioDomicilioArticulos.push(articulo);
        }
      });
    },

    pruebarda() {
      this.articulosSeleccionados.pop();
      console.log("ahora", this.articulosSeleccionados);
    },

    finalizar() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Venta finalizada",
        showConfirmButton: true,
      });
    },

    //calcular()
  },
  computed: {
    ...mapGetters({
      //articulos: "getArticulos",
      provincias: "getProvincias",
      departamentos: "getDepartamentos",
      ciudades: "getCiudades",
      //clientes: "getClientes",
    }),

    total : function() {
      let total = 0

      if( this.articulosSeleccionados.length != 0) {
        this.articulosSeleccionados.forEach(articulo => {
        total  += articulo.cantidad * articulo.precioNum
      });
      }
      return total
    }

  },
};
</script>

<style lang="scss" scoped></style>
