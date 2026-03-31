<template>
    <ListeGroupeTaxe/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeGroupeTaxe from "@/components/GesCom/GroupeTaxe/ListeGroupeTaxe.vue";

    export default defineComponent({
      name: "ListeGroupeTaxePage",
      components: {
        
        ListeGroupeTaxe,
      },
    });
  </script>