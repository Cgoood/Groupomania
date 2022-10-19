<script>

import NavigationBar from "./components/Layout/NavigationBar.vue";


export default {
    name:"App",
    components:{
        
        NavigationBar,
        
    }
}
</script>

<template>
    <NavigationBar />
    <router-view></router-view>
</template>

<style>
   /* @import 'assets/custom-vars.scss';  */


   .btn-secondary {
        background-color: #85bc54 !important;
   }

   .btn-warning {
        background-color: #FFD7D7 !important;
        border-color: lightgrey !important;
        color: grey !important;
        
   }

</style>
