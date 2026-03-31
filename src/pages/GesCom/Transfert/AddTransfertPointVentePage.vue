<template>
    <AddTransfertPointVente />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import AddTransfertPointVente from "@/components/GesCom/Transfert/AddTransfertPointVente.vue";
  
    export default defineComponent({
      name: "AddTransfertPointVentePage",
      components: {
        
        AddTransfertPointVente,
      },
    });
  </script>