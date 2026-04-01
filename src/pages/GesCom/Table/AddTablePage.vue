<template>
    <AddTableModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddTableModal from "@/components/GesCom/Table/AddTableModal.vue";
  
    export default defineComponent({
      name: "AddTablePage",
      components: {
        
        AddTableModal,
      },
    });
  </script>