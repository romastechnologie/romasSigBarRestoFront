<template>
  <!-- <div></div> -->
    <ListeVente/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeVente from "@/components/GesCom/Vente/ListeVente.vue";

    export default defineComponent({
      name: "ListeVentePage",
      components: {
        ListeVente,
      },
    });
  </script>