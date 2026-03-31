<template>
    <ListeProduitConditionne/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeProduitConditionne from "@/components/GesCom/ProduitConditionne/ListeProduitConditionne.vue";

    export default defineComponent({
      name: "ListeProduitConditionnePage",
      components: {
        
        ListeProduitConditionne,
      },
    });
  </script>