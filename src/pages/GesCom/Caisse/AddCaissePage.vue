<template>
    <AddCaisse />
  </template>
  
  <script lang="ts">
    import AddCaisseModal from "@/components/GesCom/Caisse/AddCaisseModal.vue";
import { defineComponent } from "vue";
  
    
  
    export default defineComponent({
      name: "AddCaissePage",
      components: {
        
        AddCaisseModal,
      },
    });
  </script>