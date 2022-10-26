<script>

import NavigationBar from "./components/Layout/NavigationBar.vue";
import Footer from "./components/Layout/footer.vue"

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
    <Footer />
</template>

<style>
   
   .btn-secondary {
        background-color: #85bc54 !important;
   }

   .btn-warning {
        background-color: #FFD7D7 !important;
        border-color: lightgrey !important;
        color: grey !important;
   }

</style>
