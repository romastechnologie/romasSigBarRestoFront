<template>
    <ListeFamille/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeFamille from "@/components/GesCom/Famille/ListeFamille.vue";

    export default defineComponent({
      name: "ListeFamillePage",
      components: {
        
        ListeFamille,
      },
    });
  </script>