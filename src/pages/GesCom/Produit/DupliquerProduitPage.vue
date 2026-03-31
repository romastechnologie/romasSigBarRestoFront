<template>
    <AddProduit />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
   import AddProduit from "@/components/GesCom/Produit/AddProduit.vue";
    export default defineComponent({
      name: "DupliquerProduitPage",
      components: {
        AddProduit,
      },
    });
  </script>