<template>
    <EtatPointProduitLivraison/>
</template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatPointProduitLivraison from "@/components/GesCom/Etats/EtatPointProduitLivraison.vue";

    export default defineComponent({
      name: "EtatPointProduitLivraisonPage",
      components: {
        EtatPointProduitLivraison,
      },
    });
  </script>