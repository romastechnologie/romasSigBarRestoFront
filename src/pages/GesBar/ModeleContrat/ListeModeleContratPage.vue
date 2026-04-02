<template>
    <ListeModeleContrat />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ListeModeleContrat from "@/components/GesBar/ModeleContrat/ListeModeleContrat.vue";
    export default defineComponent({
      name: "ListeModeleContratPage",
      components: {
        ListeModeleContrat,
      },
    });
  </script>