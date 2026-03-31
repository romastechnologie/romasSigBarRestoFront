<template>
    <ClientsTransaction/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ClientsTransaction from "@/components/GesCom/Client/ClientsTransaction.vue";
    export default defineComponent({
      name: "ClientsTransactionPage",
      components: {
        ClientsTransaction,
      },
    });
  </script>