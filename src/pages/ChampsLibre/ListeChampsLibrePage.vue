<template>
    <ListeChampsLibre/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListeChampsLibre from "@/components/ChampsLibre/ListeChampsLibre.vue";

    export default defineComponent({
      name: "ListeChampsLibrePage",
      components: {
        ListeChampsLibre,
      },
    });
  </script>