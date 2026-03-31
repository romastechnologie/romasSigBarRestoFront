<template>
    <EtatProduitsDisponibles/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EtatProduitsDisponibles from "@/components/GesCom/Etats/EtatProduitsDisponibles.vue";

    export default defineComponent({
      name: "EtatProduitsDisponiblesPage",
      components: {
        EtatProduitsDisponibles,
      },
    });
  </script>