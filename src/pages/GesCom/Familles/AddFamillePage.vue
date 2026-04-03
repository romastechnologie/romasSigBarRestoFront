<template>
    <AddFamilleModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddFamilleModal from "@/components/GesCom/Famille/AddFamilleModal.vue";
  
    export default defineComponent({
      name: "AddFamillePage",
      components: {
        
        AddFamilleModal,
      },
    });
  </script>