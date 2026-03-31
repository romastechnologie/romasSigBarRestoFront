<template>
    <ViewOuvFerm />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
import ViewOuvFerm from "@/components/GesCom/OuvFerm/ViewOuvFerm.vue";
import BreadCrumbs from "@/layout/BreadCrumbs.vue";

  
  export default defineComponent({
    name: "ViewOuvFermPage",
    components: {
      BreadCrumbs,
      ViewOuvFerm,
    },
  });
  </script>