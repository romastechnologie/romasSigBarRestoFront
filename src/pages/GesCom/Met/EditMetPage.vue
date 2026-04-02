<template>
    <EditMet />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditMet from "@/components/GesCom/Met/EditMet.vue";
  
    export default defineComponent({
      name: "EditMetPage",
      components: {
        
        EditMet,
      },
    });
  </script>