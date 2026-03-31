<template>
    <AddChampsLibre />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddChampsLibre from "@/components/ChampsLibre/AddChampsLibre.vue";
  
    export default defineComponent({
      name: "AddChampsLibrePage",
      components: {
        AddChampsLibre,
      },
    });
  </script>