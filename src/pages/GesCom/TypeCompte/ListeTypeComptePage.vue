<template>
    <ListeTypeCompte/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTypeCompte from "@/components/GesCom/TypeCompte/ListeTypeCompte.vue";

    export default defineComponent({
      name: "ListeTypeComptePage",
      components: {
        
        ListeTypeCompte,
      },
    });
  </script>