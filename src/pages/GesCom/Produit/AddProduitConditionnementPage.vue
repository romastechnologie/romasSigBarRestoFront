<template>
    <AddProduitConditionnement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    
import AddProduitConditionnement from "@/components/GesCom/Produit/AddProduitConditionnement.vue";

  
    export default defineComponent({
      name: "AddProduitConditionnementPage",
      components: {
        
        AddProduitConditionnement,
      },
    });
  </script>