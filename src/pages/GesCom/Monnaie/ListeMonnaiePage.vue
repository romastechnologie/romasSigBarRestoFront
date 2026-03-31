<template>
    <BreadCrumb PageTitle="Liste des Monnaie" />
    <ListeMonnaie />
  </template>
  
  <script lang="ts">
  import ListeMonnaie from "@/components/GesCom/Monnaie/ListeMonnaie.vue";
import BreadCrumbs from "@/layout/BreadCrumbs.vue";
import { defineComponent } from "vue";
  
  
  export default defineComponent({
    name: "ListeMonnaiePage",
    components: {
      BreadCrumbs,
      ListeMonnaie,
    },
  });
  </script>