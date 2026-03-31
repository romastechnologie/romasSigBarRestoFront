<template>
    <ListeTypeTaxe/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTypeTaxe from "@/components/GesCom/TypeTaxe/ListeTypeTaxe.vue";

    export default defineComponent({
      name: "ListeTypeTaxePage",
      components: {
        
        ListeTypeTaxe,
      },
    });
  </script>