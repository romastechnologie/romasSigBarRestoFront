<template>
    <EditTransaction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditTransaction from "@/components/GesCom/Transaction/EditTransaction.vue";
  
    export default defineComponent({
      name: "EditTransactionPage",
      components: {
        
        EditTransaction,
      },
    });
  </script>