<template>
    <AddFonction />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import AddFonction from "@/components/GesCom/Fonction/AddFonction.vue";
  
  export default defineComponent({
    name: "AddFonctionPage",
    components: {
      AddFonction
    }
  });
  </script>