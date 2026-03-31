<template>
    <AddTransaction />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTransaction from "@/components/GesCom/Transaction/AddTransaction.vue";
  
    export default defineComponent({
      name: "AddTransactionPage",
      components: {
        
        AddTransaction,
      },
    });
  </script>