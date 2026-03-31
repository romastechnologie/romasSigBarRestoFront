<template>
    <AddTypeTaxeModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTypeTaxeModal from "@/components/GesCom/TypeTaxe/AddTypeTaxeModal.vue";
  
    export default defineComponent({
      name: "AddTypeTaxePage",
      components: {
        
        AddTypeTaxeModal,
      },
    });
  </script>