<template>
    <ViewVente/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewVente from "@/components/GesCom/Vente/ViewVente.vue";

    export default defineComponent({
      name: "ViewVentePage",
      components: {
        
        ViewVente,
      },
    });
  </script>