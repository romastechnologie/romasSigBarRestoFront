<template>
    <EditChampsLibreFamille />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EditChampsLibreFamille from "@/components/ChampsLibre/EditChampsLibreFamille.vue";
  
    export default defineComponent({
      name: "EditChampsLibreFamillePage",
      components: {
        EditChampsLibreFamille,
      },
    });
  </script>