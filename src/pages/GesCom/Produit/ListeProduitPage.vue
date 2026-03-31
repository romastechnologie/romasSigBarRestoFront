<template>
    <ListeProduit/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeProduit from "@/components/GesCom/Produit/ListeProduit.vue";

    export default defineComponent({
      name: "ListeProduitPage",
      components: {
        
        ListeProduit,
      },
    });
  </script>