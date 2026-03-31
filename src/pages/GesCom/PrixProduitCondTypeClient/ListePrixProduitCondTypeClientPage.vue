<template>
    <ListePrixProduitCondTypeClient/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListePrixProduitCondTypeClient from "@/components/GesCom/PrixProduitCondTypeClient/ListePrixProduitCondTypeClient.vue";

    export default defineComponent({
      name: "ListePrixProduitCondTypeClientPage",
      components: {
        ListePrixProduitCondTypeClient,
      },
    });
  </script>