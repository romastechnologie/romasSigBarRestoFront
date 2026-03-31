<template>
    <EditProduit />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditProduit from "@/components/GesCom/Produit/EditProduit.vue";
  
    export default defineComponent({
      name: "EditProduitPage",
      components: {
        
        EditProduit,
      },
    });
  </script>