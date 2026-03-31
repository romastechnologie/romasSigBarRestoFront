<template>
    <AddDetachement />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import AddDetachement from "@/components/GesCom/Detachement/AddDetachement.vue";
  
    export default defineComponent({
      name: "AddDetachementPage",
      components: {
        
        AddDetachement,
      },
    });
  </script>