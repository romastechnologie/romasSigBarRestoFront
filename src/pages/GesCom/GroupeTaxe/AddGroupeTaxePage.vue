<template>
    <AddGroupeTaxeModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddGroupeTaxeModal from "@/components/GesCom/GroupeTaxe/AddGroupeTaxeModal.vue";
  
    export default defineComponent({
      name: "AddGroupeTaxePage",
      components: {
        
        AddGroupeTaxeModal,
      },
    });
  </script>