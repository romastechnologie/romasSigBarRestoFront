<template>
    <EtatProduitRupture/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatProduitRupture from "@/components/GesCom/Etats/EtatProduitRupture.vue";

    export default defineComponent({
      name: "EtatProduitsRupturePage",
      components: {
        EtatProduitRupture,
      },
    });
  </script>