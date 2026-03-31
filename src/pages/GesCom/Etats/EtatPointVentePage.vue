<template>
    <EtatPointVente/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatPointVente from "@/components/GesCom/Etats/EtatPointVente.vue";

    export default defineComponent({
      name: "EtatPointVentePage",
      components: {
        EtatPointVente,
      },
    });
  </script>