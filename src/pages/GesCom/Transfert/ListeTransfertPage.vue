<template>
    <ListeTransfert/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTransfert from "@/components/GesCom/Transfert/ListeTransfert.vue";

    export default defineComponent({
      name: "ListeTransfertPage",
      components: {
        
        ListeTransfert,
      },
    });
  </script>