<template>
    <ListeModeleSignataire/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeModeleSignataire from "@/components/GesCom/ModeleSignataire/ListeModeleSignataire.vue";

    export default defineComponent({
      name: "ListeModeleSignatairePage",
      components: {
        
        ListeModeleSignataire,
      },
    });
  </script>