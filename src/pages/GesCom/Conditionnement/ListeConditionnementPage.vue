<template>
    <ListeConditionnement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeConditionnement from "@/components/GesCom/Conditionnement/ListeConditionnement.vue";

    export default defineComponent({
      name: "ListeConditionnementPage",
      components: {
        
        ListeConditionnement,
      },
    });
  </script>