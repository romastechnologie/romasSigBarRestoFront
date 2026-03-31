<template>
    <AddModeleSignataire />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddModeleSignataire from "@/components/GesCom/ModeleSignataire/AddModeleSignataire.vue";
  
    export default defineComponent({
      name: "AddModeleSignatairePage",
      components: {
        
        AddModeleSignataire,
      },
    });
  </script>