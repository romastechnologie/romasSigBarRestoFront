<template>
    <ListeModeReglement />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ListeModeReglement from "@/components/GesCom/ModeReglement/ListeModeReglement.vue";
  
  export default defineComponent({
    name: "ListeModeReglementPage",
    components: {
      ListeModeReglement
    }
  });
  </script>