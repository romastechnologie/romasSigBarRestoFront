<template>
    <ViewProduit/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewProduit from "@/components/GesCom/Produit/ViewProduit.vue";

    export default defineComponent({
      name: "ViewProduitPage",
      components: {
        
        ViewProduit,
      },
    });
  </script>