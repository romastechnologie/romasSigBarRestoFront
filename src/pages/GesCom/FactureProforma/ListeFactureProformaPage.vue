<template>
    <ListeFactureProforma/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeFactureProforma from "@/components/GesCom/FactureProforma/ListeFactureProforma.vue";

    export default defineComponent({
      name: "ListeFactureProformaPage",
      components: {
        
        ListeFactureProforma,
      },
    });
  </script>