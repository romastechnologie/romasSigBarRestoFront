<template>
    <ListeFacture/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeFacture from "@/components/GesCom/Facture/ListeFacture.vue";

    export default defineComponent({
      name: "ListeFacturePage",
      components: {
        ListeFacture,
      },
    });
  </script>