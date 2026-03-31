<template>
    <AddDomaineActiviteModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddDomaineActiviteModal from "@/components/GesCom/DomaineActivite/AddDomaineActiviteModal.vue";
  
    export default defineComponent({
      name: "AddDomaineActivitePage",
      components: {
        
        AddDomaineActiviteModal,
      },
    });
  </script>