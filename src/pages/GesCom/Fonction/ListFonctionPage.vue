<template>
    <ListFonction />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ListFonction from "@/components/GesCom/Fonction/ListFonction.vue";
  
  export default defineComponent({
    name: "ListFonctionPage",
    components: {
      ListFonction
    }
  });
  </script>