<template>
  <div>
    <!-- <v-btn color="warning" @click="agregarArticulo">Save articulo</v-btn> -->
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
          Name of step 3
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-data-table
            fixed-header
            height="345"
            :headers="headers"
            :items="articulos"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.idArticulo`]="{ item }">
              <v-text-field outlined v-model="item.idArticulo"> </v-text-field>
            </template>

            <template v-slot:[`item.cantidad`]="{ item }">
              <v-text-field class="mt-1" outlined v-model="item.cantidad">
              </v-text-field>
            </template>
          </v-data-table>

          <v-btn color="primary" @click="e1 = 2" class="mt-4">
            Continue
          </v-btn>

          <v-btn text class="mt-4">
            Cancel
          </v-btn>

          <!-- <v-btn @click="saveCliente">
            add one vlient
          </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mt-1">
            <v-card-title>

            </v-card-title>
            <v-card-text>
               <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              outlined
              filled
              v-model="cuil"
              label="Cuil"
              required
              class="mt-3 ml-7 mr-6"
              v-on:keyup.enter="findCliente(cuil)"
            >
            </v-text-field>

            <v-row class="ml-4 mr-4">
              <v-col class="pb-0">
                <v-text-field outlined v-model="nombre" label="Nombre" required>
                </v-text-field>
              </v-col>
              <v-col class="pb-0">
                <v-text-field
                  outlined
                  v-model="apellido"
                  label="Apellido"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col class="pb-0">
                <v-text-field
                  outlined
                  v-model="documento"
                  label="Documento"
                  required
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
                >
                </v-text-field>
              </v-col>
              <v-col class="pb-0">
                <v-text-field outlined v-model="correo" label="Correo" required>
                </v-text-field>
              </v-col>
              <v-col class="pb-0">
                <v-text-field
                  outlined
                  v-model="direccion"
                  label="Direccion"
                  required
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
                  :readonly ="soloLectura"
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
                  :readonly ="soloLectura"
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
                  :readonly ="soloLectura"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
            </v-card-text>
          </v-card>
         
          <v-btn color="primary" @click="e1 = 3" class="mt-9">
            Continue
          </v-btn>

          <v-btn text @click="e1 = 1" class="mt-9">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"> </v-card>

          <v-btn color="primary" @click="e1 = 1">
            Continue
          </v-btn>

          <v-btn text @click="e1 = 2">
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Ventas",

  data() {
    return {
      e1: 1,
      articulosLocal: [],
      headers: [
        {
          text: "Id Articulo",
          align: "start",
          sortable: false,
          value: "idArticulo",
        },
        { text: "Nombre", value: "nombre" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Modo Retiro", value: "retiro" },
        { text: "Cantidad Disponible", value: "cantidadDisponible" },
        { text: "Fecha entrega", value: "fechaEntrega" },
        { text: "Cantidad no disponible", value: "stockMinimo" },
      ],

      ///usuario
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

      clientesLocal: []
     


      // articulos: [
      //   {
      //     idArticulo: 1111,
      //     formaDePResentacion: "",
      //     nombre: "Tornillo",
      //     stockMinimo: 355,
      //     srockRecomendado: 500,
      //     stockMAximo: 450,
      //     precio: "$ 11",
      //     bajoDemanda: false,
      //     localizacion: "local",
      //   },
      //   {
      //     idArticulo: 2222,
      //     formaDePResentacion: "",
      //     nombre: "Bañera",
      //     stockMinimo: 0,
      //     srockRecomendado: 0,
      //     stockMAximo: 0,
      //     precio: "$ 19000",
      //     bajoDemanda: true,
      //     localizacion: "local",
      //   },
      //   {
      //     idArticulo: 3333,
      //     formaDePResentacion: "",
      //     nombre: "Baldozas azules",
      //     stockMinimo: 200,
      //     srockRecomendado: 300,
      //     stockMAximo: 350,
      //     precio: "$ 200",
      //     bajoDemanda: false,
      //     localizacion: "local",
      //   },
      //   {
      //     idArticulo: 4444,
      //     formaDePResentacion: "",
      //     nombre: "Tornillo para madera",
      //     stockMinimo: 355,
      //     srockRecomendado: 500,
      //     stockMAximo: 450,
      //     precio: "$ 14",
      //     bajoDemanda: false,
      //     localizacion: "local",
      //   },
      // ],
    };
  },

  mounted() {},

  created() {
    this.fetchArticulos().then(
      (this.articulosLocal = this.articulos),
      console.log(this.articulos)
    );
    this.fetchProvincias();
    this.fetchDepartamentos('30');
    this.fetchCiudades('30098')
    this.fetchClientes()



    this.provincia = '30'
    this.departamento = '30098'
  

  },

  methods: {
    ...mapActions(["addArticulo", "fetchArticulos",
     "fetchProvincias","fetchDepartamentos","fetchCiudades"
     ,"addCliente","fetchClientes"]),

    // agregarArticulo(){
    //   this.articulos.forEach(articulo => {
    //     this.addArticulo({
    //         idArticulo: articulo.idArticulo,
    //         formaDePResentacion: articulo.formaDePResentacion,
    //         nombre : articulo.nombre,
    //         stockMinimo : articulo.stockMinimo,
    //         srockRecomendado: articulo.srockRecomendado,
    //         stockMAximo: articulo.stockMAximo,
    //         precio: articulo.precio,
    //         bajoDemanda : articulo.bajoDemanda,
    //         localizacion : articulo.localizacion,
    //   })
    //   });

    // }

    cargarDepartamentos() {
      this.fetchDepartamentos(this.provincia)
    },

    cargarCiudades() {
      this.fetchCiudades(this.departamento)
      console.log(this.provincia,this.departamento,this.ciudad)
    },

    findCliente(cuil){
      const cliente = this.clientes.find(cliente => cliente.cuil == cuil)
      console.log('cliente',cliente)
      if(cliente !== undefined){   
        this.nombre = cliente.nombre
        this.apellido = cliente.apellido
        this.documento = cliente.documento
        this.correo = cliente.correo
        this.direccion = cliente.direccion
        this.provincia = cliente.provincia
        this.telefono = cliente.telefono
        this.departamento = cliente.departamento
        this.ciudad = cliente.ciudad
        this.soloLectura = true
      } else {
                Swal.fire({
          title: 'Cliente no registrado',
          text: "Desea Agregarlo",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Agregar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }
    },

    saveCliente(){
      this.addCliente({
        cuil: 2013456788,
        nombre: 'Juan',
        apellido: 'Carlos',
        documento: 1345678,
        telefono: '3447 678754',
        correo: 'algo@gmail.com',
        direccion: 'calle false 123',
        provincia: '30',
        departamento: '30098',
        ciudad:  '30091020000'
      })
    }

  },
  computed: {
    ...mapGetters({
      articulos: "getArticulos",
      provincias: "getProvincias",
      departamentos: "getDepartamentos",
      ciudades: "getCiudades",
      clientes: "getClientes"
    }),
  },
};
</script>

<style lang="scss" scoped></style>
