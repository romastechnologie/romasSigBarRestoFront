<template>
    <ViewTransfert/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ViewTransfert from "@/components/GesCom/Transfert/ViewTransfert.vue";

    export default defineComponent({
      name: "ViewTransfertPage",
      components: {
        
        ViewTransfert,
      },
    });
  </script>