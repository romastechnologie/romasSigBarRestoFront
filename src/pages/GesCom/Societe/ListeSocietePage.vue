<template>
    <ListeSociete/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeSociete from "@/components/GesCom/Societe/ListeSociete.vue";

    export default defineComponent({
      name: "ListeSocietePage",
      components: {
        
        ListeSociete,
      },
    });
  </script>