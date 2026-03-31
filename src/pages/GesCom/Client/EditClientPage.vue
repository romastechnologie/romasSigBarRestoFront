<template>
    <EditClient />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditClient from "@/components/GesCom/Client/EditClient.vue";
  
    export default defineComponent({
      name: "EditClientPage",
      components: {
        
        EditClient,
      },
    });
  </script>