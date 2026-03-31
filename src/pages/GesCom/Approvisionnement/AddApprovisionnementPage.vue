<template>
    <AddApprovisionnement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddApprovisionnement from "@/components/GesCom/Approvisionnement/AddApprovisionnement.vue";
  
    export default defineComponent({
      name: "AddApprovisionnementPage",
      components: {
        
        AddApprovisionnement,
      },
    });
  </script>