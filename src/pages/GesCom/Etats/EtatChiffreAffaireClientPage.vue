<template>
    <EtatChiffreAffaireClient/>
</template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatChiffreAffaireClient from "@/components/GesCom/Etats/EtatChiffreAffaireClient.vue";

    export default defineComponent({
      name: "EtatChiffreAffaireClientPage",
      components: {
        EtatChiffreAffaireClient,
      },
    });
  </script>