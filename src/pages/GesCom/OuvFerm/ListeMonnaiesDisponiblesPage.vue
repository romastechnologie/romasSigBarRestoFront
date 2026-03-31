<template>
    <BreadCrumb PageTitle="Quantités de monnaies disponibles dans la caisse" />
    <ListeMonnaiesDisponibles />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
import ListeMonnaiesDisponibles from "@/components/GesCom/OuvFerm/ListeMonnaiesDisponibles.vue";
import BreadCrumbs from "@/layout/BreadCrumbs.vue";

  
  export default defineComponent({
    name: "ListeMonnaiesDisponiblesPage",
    components: {
      BreadCrumbs,
      ListeMonnaiesDisponibles,
    },
  });
  </script>