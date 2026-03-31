<template>
    <AddTransfertMag />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import AddTransfertMag from "@/components/GesCom/Transfert/AddTransfertMag.vue";
  
    export default defineComponent({
      name: "AddTransfertMagPage",
      components: {
        
        AddTransfertMag,
      },
    });
  </script>