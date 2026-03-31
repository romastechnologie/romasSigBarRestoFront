<template>
    <AddReglement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddReglement from "@/components/GesCom/Reglement/AddReglement.vue";
  
    export default defineComponent({
      name: "AddReglementPage",
      components: {
        
        AddReglement,
      },
    });
  </script>