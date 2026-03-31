<template>
    <AddPointVente />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddPointVente from "@/components/GesCom/PointVente/AddPointVente.vue";
  
    export default defineComponent({
      name: "AddPointVentePage",
      components: {
        
        AddPointVente,
      },
    });
  </script>