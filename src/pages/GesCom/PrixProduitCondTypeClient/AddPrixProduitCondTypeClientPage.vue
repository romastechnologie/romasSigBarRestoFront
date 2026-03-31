<template>
    <AddPrixProduitCondTypeClient/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddPrixProduitCondTypeClient from "@/components/GesCom/PrixProduitCondTypeClient/AddPrixProduitCondTypeClient.vue";
  
    export default defineComponent({
      name: "AddPrixProduitCondTypeClientPage",
      components: {
        AddPrixProduitCondTypeClient,
      },
    });
  </script>