<template>
    <ListeTransfertMagasin/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ListeTransfertMagasin from "@/components/GesCom/Transfert/ListeTransfertMagasin.vue";

    export default defineComponent({
      name: "ListeTransfertMagasinPage",
      components: {
        
        ListeTransfertMagasin,
      },
    });
  </script>