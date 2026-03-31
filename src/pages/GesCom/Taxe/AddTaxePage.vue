<template>
    <AddTaxeModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTaxeModal from "@/components/GesCom/Taxe/AddTaxeModal.vue";
  
    export default defineComponent({
      name: "AddTaxePage",
      components: {
        
        AddTaxeModal,
      },
    });
  </script>