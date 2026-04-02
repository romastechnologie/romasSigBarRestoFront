<template>
    <AddMet />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddMet from "@/components/GesCom/Met/AddMet.vue";
  
    export default defineComponent({
      name: "AddMetPage",
      components: {
        
        AddMet,
      },
    });
  </script>