<template>
    <EditSortie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import EditSortie from "@/components/GesCom/Sortie/EditSortie.vue";
  
    export default defineComponent({
      name: "EditSortiePage",
      components: {
        
        EditSortie,
      },
    });
  </script>