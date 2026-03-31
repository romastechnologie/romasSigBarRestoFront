<template>
    <AddMagasin />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import AddMagasin from "@/components/GesCom/Magasin/AddMagasin.vue";
  
    export default defineComponent({
      name: "AddMagasinPage",
      components: {
        AddMagasin,
      },
    });
  </script>