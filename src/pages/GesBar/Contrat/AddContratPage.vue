<template>
    <AddContrat />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";

    import AddContrat from "@/components/GesBar/Contrat/AddContrat.vue";

  
    export default defineComponent({
      name: "AddContratPage",
      components: {
        AddContrat,
      },
    });
  </script>