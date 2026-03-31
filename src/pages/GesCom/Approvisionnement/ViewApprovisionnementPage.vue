<template>
    <ViewApprovisionnement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewApprovisionnement from "@/components/GesCom/Approvisionnement/ViewApprovisionnement.vue";

    export default defineComponent({
      name: "ViewApprovisionnementPage",
      components: {
        
        ViewApprovisionnement,
      },
    });
  </script>