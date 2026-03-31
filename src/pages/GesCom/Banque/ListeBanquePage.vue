<template>
    <ListeBanque/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeBanque from "@/components/GesCom/Banque/ListeBanque.vue";

    export default defineComponent({
      name: "ListeBanquePage",
      components: {
        
        ListeBanque,
      },
    });
  </script>