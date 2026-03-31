<template>
    <ListeDetachement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ListeDetachement from "@/components/GesCom/Detachement/ListeDetachement.vue";

    export default defineComponent({
      name: "ListeDetachementPage",
      components: {
        
        ListeDetachement,
      },
    });
  </script>