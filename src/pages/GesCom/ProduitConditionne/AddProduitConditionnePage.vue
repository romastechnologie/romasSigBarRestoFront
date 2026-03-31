<template>
    <AddProduitConditionne />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddProduitConditionne from "@/components/GesCom/ProduitConditionne/AddProduitConditionne.vue";
  
    export default defineComponent({
      name: "AddProduitConditionnePage",
      components: {
        
        AddProduitConditionne,
      },
    });
  </script>