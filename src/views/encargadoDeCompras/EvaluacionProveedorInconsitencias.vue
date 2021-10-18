<template>
  <v-container>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Evaluación Proveedor</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="inconsistencias"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.resolver`]="{ item }">
            <v-checkbox class="ml-3" v-model="item.resolver"></v-checkbox>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn>Cancelar</v-btn>
        <v-btn class="mr-2" color="primary" @click="dialog = true"
          >Calificar</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="630">
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
                   <v-radio-group v-else v-model="item.radioGroup">
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
          <v-btn color="primary" @click="dialog = false">
            Guardar Respuestas
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "EvaluacionProveedorInconsitencias",

  data() {
    return {
      headers: [
        {
          text: "Inconsistencia id",
          align: "start",
          sortable: false,
          value: "inconsistenciaId",
        },
        { text: "Artículo", value: "articulo" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Fecha pactada con proveedor", value: "fechaPactada" },
        { text: "Fecha resolución", value: "fechaResolucion" },
        { text: "Resolver", value: "resolver" },
      ],

      inconsistencias: [
        {
          inconsistenciaId: "I050",
          articulo: "Pastina negra 1 Kg",
          cantidad: 50,
          fechaPactada: "13/08/2021",
          fechaResolucion: "19/08/2021",
          resolver: null,
        },
        {
          inconsistenciaId: "I052",
          articulo: "Chapa sinusoidal 3.50 mm",
          cantidad: 45,
          fechaPactada: "14/09/2021",
          fechaResolucion: "30/09/2021",
          resolver: null,
        },
        {
          inconsistenciaId: "I056",
          articulo: "Hierro nervado 20 mm",
          cantidad: 6,
          fechaPactada: "01/10/2021",
          fechaResolucion: "13/10/2021",
          resolver: null,
        },
        {
          inconsistenciaId: "I057",
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
          items: [
            { title: "Breakfast & brunch" },
          
          ],
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
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
