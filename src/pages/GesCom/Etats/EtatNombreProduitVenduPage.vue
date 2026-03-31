<template>
    <EtatNombreProduitVendu/>
</template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatNombreProduitVendu from "@/components/GesCom/Etats/EtatNombreProduitVendu.vue";

    export default defineComponent({
      name: "EtatNombreProduitVenduPage",
      components: {
        EtatNombreProduitVendu,
      },
    });
  </script>