<template>
    <ListeMet/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeMet from "@/components/GesCom/Met/ListeMet.vue";

    export default defineComponent({
      name: "ListeMetPage",
      components: {
        
        ListeMet,
      },
    });
  </script>