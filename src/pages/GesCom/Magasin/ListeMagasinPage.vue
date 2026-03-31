<template>
    <ListeMagasin/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeMagasin from "@/components/GesCom/Magasin/ListeMagasin.vue";

    export default defineComponent({
      name: "ListeMagasinPage",
      components: {
        
        ListeMagasin,
      },
    });
  </script>