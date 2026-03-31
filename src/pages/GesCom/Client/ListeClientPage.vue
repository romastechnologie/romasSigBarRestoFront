<template>
    <ListeClient/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeClient from "@/components/GesCom/Client/ListeClient.vue";

    export default defineComponent({
      name: "ListeClientPage",
      components: {
        
        ListeClient,
      },
    });
  </script>