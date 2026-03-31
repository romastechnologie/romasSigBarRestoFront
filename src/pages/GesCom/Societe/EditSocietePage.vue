<template>
    <EditSociete />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditSociete from "@/components/GesCom/Societe/EditSociete.vue";
  
    export default defineComponent({
      name: "EditSocietePage",
      components: {
        
        EditSociete,
      },
    });
  </script>