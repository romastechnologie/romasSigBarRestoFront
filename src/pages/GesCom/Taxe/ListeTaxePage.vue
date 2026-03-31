<template>
    <ListeTaxe/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTaxe from "@/components/GesCom/Taxe/ListeTaxe.vue";

    export default defineComponent({
      name: "ListeTaxePage",
      components: {
        
        ListeTaxe,
      },
    });
  </script>