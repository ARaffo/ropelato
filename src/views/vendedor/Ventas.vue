<template>
  <div>
    <!-- <v-btn color="warning" @click="agregarArticulo">Save articulo</v-btn> -->
    <!-- <v-btn @click="ver"> articulos lo</v-btn> -->

    <v-stepper v-model="e1" height="595">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Articulos
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Clientes
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Envio a domicilio
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
                  label="Id Articulo"
                  v-on:keyup.enter="findArticuloById(entradaIdArticulos)"
                  findArticuloById
                  :rules="idArticuloRule"
                >
                </v-text-field>
              </v-col>
              <v-col cols="2">
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
          </v-data-table>

          <!-- <v-btn @click="agregarArticulo">
            guardar articulos
          </v-btn> -->
          <v-row>
            <v-col class="text-right">
              <!-- <v-btn @click="pruebarda">
                pruebarda
              </v-btn> -->
              <v-btn color="primary" @click="e1 = 2; addArticulosConEnvioDomicilio()" class="mt-5">
                Continue
              </v-btn>
              <!-- :disabled="articulosSeleccionados.length < 1" -->
              <v-btn text class="mt-5">
                Cancel
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
                  label="CUIL"
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
                      label="Telefono"
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
                      label="Direccion"
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
                :disabled="!valid"
                color="primary"
                @click="validarYGuardarCliente"
                class="mt-5"
              >
                Guardar
              </v-btn>

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
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="text-right">
              <v-btn
                :disabled="!valid"
                color="primary"
                @click="e1 = 3"
                class="mt-5"
              >
                Continue
              </v-btn>
              <!-- @click="validarCliente" -->
              <v-btn text @click="e1 = 1 ; envioDomicilioArticulos = []" class="mt-5">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" height="400px">
            <v-card-text>
              <v-row>
                <v-col>
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
                      <v-text-field
                      dense
                      outlined
                      v-model="direccionEnvio"
                      label="Direccion de envio"
                      >

                      </v-text-field>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-list dense elevation="3">
                <v-subheader>Articulos con envio a domicilio</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(item, i) in envioDomicilioArticulos"
                    :key="i"
                  > 
                    <v-list-item-content
                     
                    >
                      <v-list-item-title
                        v-text="item"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
                </v-col>
              </v-row>
              
            </v-card-text>
          </v-card>

          <v-row>
            <v-col class="text-right">
              <v-btn color="primary" @click="e1 = 1">
                Continue
              </v-btn>

              <v-btn text @click="e1 = 2">
                Cancel
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
      headers: [
        {
          text: "Id Articulo",
          align: "start",
          sortable: false,
          value: "idArticulo",
          width: 80,
        },
        { text: "Nombre", value: "nombre", width: 70 },
        { text: "Presentacion", value: "formaDePResentacion", width: 50 },
        { text: "Cantidad", value: "cantidad", width: 110 },
        { text: "Modo Retiro", value: "modoDeRetiroSeleccionado", width: 110 },
        {
          text: "Cantidad Disponible",
          value: "cantidadDisponible",
          width: 110,
        },
        { text: "Fecha entrega", value: "fechaEntrega", width: 110 },
        { text: "Venta Futuro", value: "ventaFuturo", width: 50 },
        { text: "Eliminar", value: "eliminar", sorteable: false, width: 110 },
      ],

      ///usuario
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
      direccionEnvio: null,

      envioDomicilioArticulos: [],

      clientesLocal: [],
      cuilRule: [
        (v) => !!v || "Debe ingresar un cuil",
        (v) => /^[0-9]*$/.test(v) || "Solo se pueden ingresar numeros",
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

      // articulosHarcode: [
      //   {
      //     idArticulo: "t001",
      //     formaDePResentacion: "5 cm",
      //     nombre: "Tornillo",
      //     cantidadDisponible: 3500,
      //     precio: "$ 11",
      //     bajoDemanda: false,
      //     localizacion: {0:'local',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "t002",
      //     formaDePResentacion: "8 cm",
      //     nombre: "Tornillo",
      //     cantidadDisponible: 3200,
      //     precio: "$ 13",
      //     bajoDemanda: false,
      //     localizacion: {0:'local',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "p001",
      //     formaDePResentacion: "1 Kg",
      //     nombre: "Pastina negra",
      //     cantidadDisponible: 30,
      //     precio: "$ 201",
      //     bajoDemanda: false,
      //     localizacion: {0:'deposito 1',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "b001",
      //     formaDePResentacion: "",
      //     nombre: "Buje reduccion rosca",
      //     cantidadDisponible: 300,
      //     precio: "$ 51",
      //     bajoDemanda: false,
      //     localizacion: {0:'local',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "e001",
      //     formaDePResentacion: "3/8",
      //     nombre: "Entrerrosca de bronce",
      //     cantidadDisponible: 300,
      //     precio: "$ 106",
      //     bajoDemanda: false,
      //     localizacion: {0:'local',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "ba001",
      //     formaDePResentacion: "3/8",
      //     nombre: "Bañera",
      //     cantidadDisponible: 0,
      //     precio: "$ 19000",
      //     bajoDemanda: true,
      //     localizacion: {0:'local',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "pl001",
      //     formaDePResentacion: "25 gr",
      //     nombre: "Plavicon sellador",
      //     cantidadDisponible: 250,
      //     precio: "$ 18000",
      //     bajoDemanda: false,
      //     localizacion: {0:'deposito 2',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "h001",
      //     formaDePResentacion: "20 mm",
      //     nombre: "Hierro nervado",
      //     cantidadDisponible: 450,
      //     precio: "$ 5280",
      //     bajoDemanda: false,
      //     localizacion: {0:'deposito 1',1:'domicilio'},
      //   },
      //    {
      //     idArticulo: "c001",
      //     formaDePResentacion: "3.50 mm",
      //     nombre: "Chapa sinusoidal",
      //     cantidadDisponible: 1500,
      //     precio: "$ 5548",
      //     bajoDemanda: false,
      //     localizacion: {0:'deposito',1:'domicilio'},
      //   },
      //     {
      //     idArticulo: "l001",
      //     formaDePResentacion: "12 x 18 x 33",
      //     nombre: "Ladrillo ceramico",
      //     cantidadDisponible: 3500,
      //     precio: "$ 59",
      //     bajoDemanda: false,
      //     localizacion: {0:'deposito 2',1:'domicilio'},
      //   },
      //   {
      //     idArticulo: "l002",
      //     formaDePResentacion: "18 x 18 x 33",
      //     nombre: "Ladrillo ceramico",
      //     cantidadDisponible: 4500,
      //     precio: "$ 90",
      //     bajoDemanda: false,
      //     localizacion: {0:'deposito 2', 1:'domicilio'},
      //   },
      // ],
    };
  },

  mounted() {},

  created() {
    this.fetchArticulos().then(() => {
      this.chargueNamesArticulos(this.articulos);
    });
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
      "fetchArticulos",
      "fetchProvincias",
      "fetchDepartamentos",
      "fetchCiudades",
      "addCliente",
      "fetchClientes",
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
        console.log("holas");
        this.e1 = 3;
      }
    },

    validarYGuardarCliente() {
      if (this.$refs.form.validate()) {
        this.guardarCliente();
        this.e1 = 3;
      }
    },

    ver() {
      console.log(this.articulos[0].localizacion);
      console.log(this.articulos);
      console.log(
        "prueba 1",
        JSON.parse(JSON.stringify(this.articulos[0].localizacion))
      );
      console.log("prueba", JSON.stringify(this.articulos[0].localizacion));
      console.log(typeof this.articulos[0].localizacion);
      console.log(this.articulos[0].localizacion.lenght);
      this.articulos[0].localizacion.forEach((element) => {
        console.log(element);
      });
    },

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


        this.direccionEnvio = this.direccion
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
      let articulo = this.articulos.find(
        (element) => element.idArticulo == idArticulo
      );

      if (articulo != undefined) {
        // var randomNumFecha = Math.floor(Math.random() * (10 - 1) + 1);

        this.modoRetiroArticulo = articulo.localizacion;
        this.entradaNombreArticulo = articulo.nombre;

        // articulo["modoDeRetiroSeleccionado"] = null;
        // articulo["cantidad"] = null;
        // articulo["agregado"] = true;
        // articulo["ventaFuturo"] = false;

        // articulo.fechaEntrega = this.sumarDiasFecha(new Date(), randomNumFecha)
        //   .toISOString()
        //   .substr(0, 10);

        // this.articulosSeleccionados.push(articulo);
      }
    },

    finArticuloByNombre(nombreArticulo) {
      let articulo = this.articulos.find(
        (element) => element.nombre == nombreArticulo
      );

      if (articulo != undefined) {
        //var randomNumFecha = Math.floor(Math.random() * (10 - 1) + 1);

        this.modoRetiroArticulo = articulo.localizacion;
        this.entradaIdArticulos = articulo.idArticulo;

        //console.log("random fecha", randomNumFecha);

        // articulo["modoDeRetiroSeleccionado"] = null;
        // articulo["cantidad"] = null;
        // articulo["agregado"] = true;
        // articulo["ventaFuturo"] = false;

        // articulo.fechaEntrega = this.sumarDiasFecha(new Date(), randomNumFecha)
        //   .toISOString()
        //   .substr(0, 10);

        // this.articulosSeleccionados.pop();
        // this.articulosSeleccionados.push(articulo);

        // this.articulosSeleccionados.push({
        //   idArticulo: null,
        //   formaDePResentacion: null,
        //   nombre: null,
        //   cantidadDisponible: null,
        //   precio: null,
        //   bajoDemanda: false,
        //   modoDeRetiroSeleccionado: null,
        //   localizacion: [],
        //   agregado: false,
        //   ventaFuturo: false,
        // });
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

        let articulo = this.articulos.find(
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
      // this.entradaIdArticulos = null,
      // this.entradaNombreArticulo = null,
      // this.entradaModoRetiro = null,
      // this.entradaCantidad = null,
      // this.modoRetiroArticulo = []
    },

    addArticulosConEnvioDomicilio(){
      
      this.articulosSeleccionados.forEach(articulo => {
        if(articulo.modoDeRetiroSeleccionado == 'domicilio'){
          this.envioDomicilioArticulos.push(articulo.nombre)
        }
      });
    },

    pruebarda() {
      this.articulosSeleccionados.pop();
      console.log("ahora", this.articulosSeleccionados);
    },
  },
  computed: {
    ...mapGetters({
      articulos: "getArticulos",
      provincias: "getProvincias",
      departamentos: "getDepartamentos",
      ciudades: "getCiudades",
      clientes: "getClientes",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
