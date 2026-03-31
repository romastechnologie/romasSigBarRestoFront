<template>
    <AddClient />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddClient from "@/components/GesCom/Client/AddClient.vue";
  
    export default defineComponent({
      name: "AddClientPage",
      components: {
        
        AddClient,
      },
    });
  </script>