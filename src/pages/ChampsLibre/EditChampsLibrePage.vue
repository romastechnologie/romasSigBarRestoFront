<template>

        <EditChampsLibre/>
  </template>
  
  <script lang="ts">
    import EditChampsLibre from "@/components/ChampsLibre/EditChampsLibre.vue";
import { defineComponent } from "vue";
  
    export default defineComponent({
      name: "EditChampsLibrePage",
      components: {
       EditChampsLibre,
      },
  
    });
  </script>