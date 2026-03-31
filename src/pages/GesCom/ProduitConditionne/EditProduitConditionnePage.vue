<template>
    <EditProduitConditionne />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditProduitConditionne from "@/components/GesCom/ProduitConditionne/EditProduitConditionne.vue";
  
    export default defineComponent({
      name: "EditProduitConditionnePage",
      components: {
        
        EditProduitConditionne,
      },
    });
  </script>