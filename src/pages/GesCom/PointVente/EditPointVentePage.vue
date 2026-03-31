<template>
    <EditPointVente />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditPointVente from "@/components/GesCom/PointVente/EditPointVente.vue";
  
    export default defineComponent({
      name: "EditPointVentePage",
      components: {
        
        EditPointVente,
      },
    });
  </script>