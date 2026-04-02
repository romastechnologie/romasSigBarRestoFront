<template>
    <ViewMet/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewMet from "@/components/GesCom/Met/ViewMet.vue";

    export default defineComponent({
      name: "ViewMetPage",
      components: {
        
        ViewMet,
      },
    });
  </script>