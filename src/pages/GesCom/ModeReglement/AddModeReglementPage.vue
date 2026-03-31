<template>
    <AddModeReglementModal />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import AddModeReglementModal from "@/components/GesCom/ModeReglement/AddModeReglementModal.vue";
  
  export default defineComponent({
    name: "AddModeReglementPage",
    components: {
      AddModeReglementModal
    }
  });
  </script>