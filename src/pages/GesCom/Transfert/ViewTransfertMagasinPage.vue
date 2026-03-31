<template>
    <ViewTransfertMagasin/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewTransfertMagasin from "@/components/GesCom/Transfert/ViewTransfertMagasin.vue";

    export default defineComponent({
      name: "ViewTransfertMagasinPage",
      components: {
        
        ViewTransfertMagasin,
      },
    });
  </script>