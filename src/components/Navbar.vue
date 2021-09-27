<template>
    <div id="Navbar">
         <v-app-bar color="black" fixed app>
            <v-toolbar-title class="white--text">Menu</v-toolbar-title>
            <v-spacer></v-spacer>
            <div>
                <v-row>
                    <v-col class="pr-0">
                        <MenuEncargadoDeLogistica/>
                    </v-col>
                    <v-col class="pr-0">
                        <MenuOperarioDeDeposito/>
                    </v-col>
                    <v-col class="pr-0">
                        <MenuEncargadoDeCompras/>
                    </v-col>
                    <v-col>
                        <MenuVendedor/>
                    </v-col>
                </v-row>               
            </div>
        </v-app-bar>    
    </div>
</template>

<script>
import MenuVendedor from './menus/MenuVendedor'
import MenuEncargadoDeCompras from './menus/MenuEncargadoDeCompras'
import MenuOperarioDeDeposito from './menus/MenuOperarioDeDeposito'
import MenuEncargadoDeLogistica from './menus/MenuEncargadoDeLogistica'
export default {
    name: 'Navbar',

    components: { 
        MenuVendedor,
        MenuEncargadoDeCompras,
        MenuOperarioDeDeposito,
        MenuEncargadoDeLogistica
         },

    //directives: { DirectiveName },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>