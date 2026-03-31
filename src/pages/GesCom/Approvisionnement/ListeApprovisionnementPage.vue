<template>
    <ListeApprovisionnement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeApprovisionnement from "@/components/GesCom/Approvisionnement/ListeApprovisionnement.vue";

    export default defineComponent({
      name: "ListeApprovisionnementPage",
      components: {
        
        ListeApprovisionnement,
      },
    });
  </script>