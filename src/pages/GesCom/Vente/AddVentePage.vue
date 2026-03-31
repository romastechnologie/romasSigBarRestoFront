<template>
  <!-- <div></div> -->
    <AddVente />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddVente from "@/components/GesCom/Vente/AddVente.vue";
  
    export default defineComponent({
      name: "AddVentePage",
      components: {
        AddVente,
      },
    });
  </script>