<template>
    <AddCategorieProduitModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddCategorieProduitModal from "@/components/GesCom/CategorieProduit/AddCategorieProduitModal.vue";
  
    export default defineComponent({
      name: "AddCategorieProduitPage",
      components: {
        
        AddCategorieProduitModal,
      },
    });
  </script>