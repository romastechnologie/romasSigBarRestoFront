<template>
    <EtatPointCommande/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatPointCommande from "@/components/GesCom/Etats/EtatPointCommande.vue";

    export default defineComponent({
      name: "EtatPointCommandePage",
      components: {
        EtatPointCommande,
      },
    });
  </script>