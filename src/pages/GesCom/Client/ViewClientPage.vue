<template>
    <ViewClient/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewClient from "@/components/GesCom/Client/ViewClient.vue";

    export default defineComponent({
      name: "ViewClientPage",
      components: {
        
        ViewClient,
      },
    });
  </script>