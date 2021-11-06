<template>
  <v-container>
    <v-card v-if="!proveedorSelected" class="mx-auto" max-width="300" tile>
      <v-card-title>
        Proveedores a evaluar
      </v-card-title>
      <!-- <v-sheet elevation="2"> -->
      <v-card-text class="pb-0">
        <v-list dense>
          <v-list-item-group
            active-class="pink--text"
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in proveedores"
              :key="i"
              @click="proveedorSelected = item.text"
            >
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title class="mt-2" v-text="item.text"></v-list-item-title>
                  </v-col>
                  <v-col class="text-right">
                    <v-chip > {{item.num}} </v-chip>
                  </v-col>
                </v-row>
                
                
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <!-- </v-sheet> -->

      <v-card-actions class="justify-end">
        <v-btn color="primary">Evaluar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="proveedorSelected">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Evaluación {{ proveedorSelected }}</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="inconsistencias"
          :items-per-page="5"
          class="elevation-1"
           :footer-props="{
           'items-per-page-text':'Filas por página',
           'pageText': '{0}-{1} de {2}'
      }"
        >
          <template v-slot:[`item.resolver`]="{ item }">
            <v-checkbox class="ml-3" v-model="item.resolver"></v-checkbox>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="proveedorSelected = null">Cancelar</v-btn>
        <v-btn class="mr-2" color="primary" @click="dialog = true"
          >Calificar</v-btn
        >
      </v-card-actions>
    </v-card>

    <!-- <v-dialog v-model="dialog" width="630">
      <v-card class="mx-auto">
        <v-card-title class="text-h5 grey lighten-2">
          Preguntas
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-group
              v-for="item in items"
              :key="item.title"
              v-model="item.active"
              :prepend-icon="item.action"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="child in item.items" :key="child.title">
                <v-list-item-content>
                     <v-radio-group v-if="item.title == '¿Se resolvió satisfactoriamente?'" v-model="item.radioGroup">
                    <v-radio
                        label="Si"
                        value="si"
                    ></v-radio>
                    <v-radio
                        label="No"
                        value="no"
                    ></v-radio>
                    </v-radio-group>
                   <v-radio-group   v-else v-model="item.radioGroup">
                    <v-radio
                        v-for="n in 5"
                        :key="n"
                        :label="`${n}`"
                        :value="n"
                    ></v-radio>
                    </v-radio-group>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false; finalizar()">
            Guardar Respuestas
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-dialog v-model="dialog" width="600" class="mx-auto">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          ¿Cuanta predisposición tuvo el proveedor para resolver el problema?
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card  class="mb-12" height="30px" width="480">
            <v-radio-group row v-model="radioGroup1">
              <v-row>
                <v-col class="ml-2">
                <v-radio label="1" value="1"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="2" value="2"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="3" value="3"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="4" value="4"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="5" value="5"></v-radio>
                </v-col>
              </v-row>
             
              
              
              
              
            </v-radio-group>
          </v-card>
          <v-row>
            <v-col class="text-right">
              <v-btn @click="dialog = false" class="mr-1">
                Cancelar
              </v-btn>
               <v-btn color="primary" @click="e6 = 2" >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          ¿Cómo fueron las soluciones propuestas?
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card class="mb-12" height="30px" width="480">
             <v-radio-group row v-model="radioGroup2">
              <v-row>
                <v-col class="ml-2">
                <v-radio label="1" value="1"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="2" value="2"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="3" value="3"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="4" value="4"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="5" value="5"></v-radio>
                </v-col>
              </v-row>
              </v-radio-group>
          </v-card>
          <v-row>
            <v-col class="text-right">
              <v-btn @click="e6 = 1" class="mr-1">
                Cancelar
              </v-btn>
               <v-btn color="primary" @click="e6 = 3" >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          ¿Qué tan rápida fue la solución?
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card  class="mb-12" height="30px" width="480">
             <v-radio-group row v-model="radioGroup3">
              <v-row>
                <v-col class="ml-2">
                <v-radio label="1" value="1"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="2" value="2"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="3" value="3"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="4" value="4"></v-radio>
                </v-col>
                 <v-col>
                  <v-radio label="5" value="5"></v-radio>
                </v-col>
              </v-row>
              </v-radio-group>
          </v-card>
          <v-row>
            <v-col class="text-right">
              <v-btn @click="e6 = 2" class="mr-1">
                Cancelar
              </v-btn>
              <v-btn color="primary" @click="e6 = 4" >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-step step="4">
          ¿Se resolvió satisfactoriamente?
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-card  class="mb-12" height="60px" width="480">
             <v-radio-group  v-model="radioGroup4">

                <v-radio label="Si" value="si"></v-radio>
      
                  <v-radio label="No" value="no"></v-radio>
    
              </v-radio-group>
          </v-card>
          <v-row>
            <v-col class="text-right">
              <v-btn @click="e6 = 3" class="mr-1">
                Cancelar
              </v-btn>
                 <v-btn color="primary" @click="dialog = false;finalizar()" >
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "EvaluacionProveedorInconsitencias",

  data() {
    return {
      e6: 1,
      radioGroup1: null,
      radioGroup2: null,
      radioGroup3: null,
      radioGroup1: null,
      proveedorSelected: null,
      headers: [
        {
          text: "Inconsistencia",
          align: "start",
          sortable: false,
          value: "inconsistenciaId",
        },
        { text: "Artículo", value: "articulo" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Fecha pactada con proveedor", value: "fechaPactada" },
        { text: "Fecha de resolución", value: "fechaResolucion" },
        { text: "Evaluar", value: "resolver" },
      ],

      inconsistencias: [
        {
          inconsistenciaId: "I0050",
          articulo: "Pastina negra 1 Kg",
          cantidad: 50,
          fechaPactada: "13/08/2021",
          fechaResolucion: "19/08/2021",
          resolver: null,
        },
        {
          inconsistenciaId: "I0052",
          articulo: "Chapa sinusoidal 3.50 mm",
          cantidad: 45,
          fechaPactada: "14/09/2021",
          fechaResolucion: "30/09/2021",
          resolver: null,
        },
        {
          inconsistenciaId: "I0056",
          articulo: "Hierro nervado 20 mm",
          cantidad: 6,
          fechaPactada: "01/10/2021",
          fechaResolucion: "13/10/2021",
          resolver: null,
        },
        {
          inconsistenciaId: "I0057",
          articulo: "Tornillo 8 cm",
          cantidad: 200,
          fechaPactada: "02/10/2021",
          fechaResolucion: "14/10/2021",
          resolver: null,
        },
      ],
      dialog: false,

      items: [
        {
          items: [{ title: "List Item" }],
          title:
            "¿Cuanta predisposición tuvo el proveedor para resolver el problema?",
          radioGroup: null,
        },
        {
          items: [{ title: "Breakfast & brunch" }],
          radioGroup: null,
          title: "¿Cómo fueron las soluciones propuestas?",
        },
        {
          items: [{ title: "List Item" }],
          title: "¿Qué tan rápida fue la solución?",
          radioGroup: null,
        },
        {
          items: [{ title: "List Item" }],
          title: "¿Se resolvió satisfactoriamente?",
          radioGroup: null,
        },
      ],

      selectedItem: null,
      proveedores: [
        { text: "Proveedor 1" , num: '4' },
        { text: "Proveedor 2",num: '7' },
        { text: "Proveedor 3",num: '9' },
        { text: "Proveedor 4" ,num: '2'},
      ],
    };
  },

  mounted() {},

  methods: {
    finalizar() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Evaluación registrada con exito",
        showConfirmButton: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
