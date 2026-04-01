<template>
    <ListeCategorieProduit/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeCategorieProduit from "@/components/GesCom/CategorieProduit/ListeCategorieProduit.vue";

    export default defineComponent({
      name: "ListeCategorieProduitPage",
      components: {
        
        ListeCategorieProduit,
      },
    });
  </script>