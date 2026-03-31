<template>
    <BreadCrumb PageTitle="Liste des Caisse" />
    <ListeCaisse />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
import BreadCrumbs from "@/layout/BreadCrumbs.vue";
import ListeCaisse from "@/components/GesCom/Caisse/ListeCaisse.vue";
  
  export default defineComponent({
    name: "ListeCaissePage",
    components: {
      BreadCrumbs,
      ListeCaisse,
    },
  });
  </script>