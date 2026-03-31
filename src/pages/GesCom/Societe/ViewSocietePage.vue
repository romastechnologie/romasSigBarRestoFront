<template>
    <ViewSociete/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewSociete from "@/components/GesCom/Societe/ViewSociete.vue";

    export default defineComponent({
      name: "ViewSocietePage",
      components: {
        
        ViewSociete,
      },
    });
  </script>