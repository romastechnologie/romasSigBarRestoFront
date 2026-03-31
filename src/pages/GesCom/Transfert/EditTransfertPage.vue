<template>
    <EditTransfert />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditTransfert from "@/components/GesCom/Transfert/EditTransfert.vue";
  
    export default defineComponent({
      name: "EditTransfertPage",
      components: {
        
        EditTransfert,
      },
    });
  </script>