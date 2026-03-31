<template>
    <AddConditionnementModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddConditionnementModal from "@/components/GesCom/Conditionnement/AddConditionnementModal.vue";
  
    export default defineComponent({
      name: "AddConditionnementPage",
      components: {
        
        AddConditionnementModal,
      },
    });
  </script>