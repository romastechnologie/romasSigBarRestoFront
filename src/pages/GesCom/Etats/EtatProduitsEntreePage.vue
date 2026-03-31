<template>
    <EtatProduitsEntree/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import EtatProduitsEntree from "@/components/GesCom/Etats/EtatsProduitsEntree.vue";

    export default defineComponent({
      name: "EtatProduitsEntreePage",
      components: {
        EtatProduitsEntree,
      },
    });
  </script>