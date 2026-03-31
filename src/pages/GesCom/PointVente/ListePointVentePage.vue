<template>
    <ListePointVente/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListePointVente from "@/components/GesCom/PointVente/ListePointVente.vue";

    export default defineComponent({
      name: "ListePointVentePage",
      components: {
        
        ListePointVente,
      },
    });
  </script>