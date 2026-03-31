<template>
    <ViewTransaction/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewTransaction from "@/components/GesCom/Transaction/ViewTransaction.vue";

    export default defineComponent({
      name: "ViewTransactionPage",
      components: {
        
        ViewTransaction,
      },
    });
  </script>