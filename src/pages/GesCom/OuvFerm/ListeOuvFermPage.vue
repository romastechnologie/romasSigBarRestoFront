<template>
    <BreadCrumb PageTitle="Liste des caisses ouvertes et fermées" />
    <ListeOuvFerm />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
import ListeOuvFerm from "@/components/GesCom/OuvFerm/ListeOuvFerm.vue";
import BreadCrumbs from "@/layout/BreadCrumbs.vue";

  
  export default defineComponent({
    name: "ListeOuvFermPage",
    components: {
      BreadCrumbs,
      ListeOuvFerm,
    },
  });
  </script>