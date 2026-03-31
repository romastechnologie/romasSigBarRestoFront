<template>
    <AddBanqueModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddBanqueModal from "@/components/GesCom/Banque/AddBanqueModal.vue";
  
    export default defineComponent({
      name: "AddBanquePage",
      components: {
        
        AddBanqueModal,
      },
    });
  </script>