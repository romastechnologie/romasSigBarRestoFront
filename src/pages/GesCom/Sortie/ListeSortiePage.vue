<template>
    <ListeSortie/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeSortie from "@/components/GesCom/Sortie/ListeSortie.vue";

    export default defineComponent({
      name: "ListeSortiePage",
      components: {
        
        ListeSortie,
      },
    });
  </script>