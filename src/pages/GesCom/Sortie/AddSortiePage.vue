<template>
    <AddSortie />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddSortie from "@/components/GesCom/Sortie/AddSortie.vue";
  
    export default defineComponent({
      name: "AddSortiePage",
      components: {
        
        AddSortie,
      },
    });
  </script>