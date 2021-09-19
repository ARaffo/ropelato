<template>
  <v-app>
   
     <Navbar/>  
    <v-main style="background: #159957;  background: -webkit-linear-gradient(to top, #155799, #159957); background: linear-gradient(to top, #155799, #159957);"> 
          <router-view :key="$route.path"/>
    </v-main> 
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue"
export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
};
</script>
