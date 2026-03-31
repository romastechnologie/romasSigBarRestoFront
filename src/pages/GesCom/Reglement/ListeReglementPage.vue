<template>
    <ListeReglement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeReglement from "@/components/GesCom/Reglement/ListeReglement.vue";

    export default defineComponent({
      name: "ListeReglementPage",
      components: {
        
        ListeReglement,
      },
    });
  </script>