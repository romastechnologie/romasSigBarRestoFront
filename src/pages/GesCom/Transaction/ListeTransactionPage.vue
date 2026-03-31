<template>
    <ListeTransaction/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTransaction from "@/components/GesCom/Transaction/ListeTransaction.vue";

    export default defineComponent({
      name: "ListeTransactionPage",
      components: {
        
        ListeTransaction,
      },
    });
  </script>