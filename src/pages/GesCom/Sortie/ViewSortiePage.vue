<template>
    <ViewSortie/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewSortie from "@/components/GesCom/Sortie/ViewSortie.vue";

    export default defineComponent({
      name: "ViewsortiePage",
      components: {
        
        ViewSortie,
      },
    });
  </script>