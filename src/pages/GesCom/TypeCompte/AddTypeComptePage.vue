<template>
    <AddTypeCompteModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTypeCompteModal from "@/components/GesCom/TypeCompte/AddTypeCompteModal.vue";
  
    export default defineComponent({
      name: "AddTypeComptePage",
      components: {
        
        AddTypeCompteModal,
      },
    });
  </script>