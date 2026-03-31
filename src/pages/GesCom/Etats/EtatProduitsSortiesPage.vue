<template>
    <EtatProduitsSorties/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatProduitsSorties from "@/components/GesCom/Etats/EtatProduitsSorties.vue";

    export default defineComponent({
      name: "EtatProduitsEntreePage",
      components: {
        EtatProduitsSorties,
      },
    });
  </script>