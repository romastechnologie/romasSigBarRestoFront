<template>
    <ViewDetachement/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
import ViewDetachement from "@/components/GesCom/Detachement/ViewDetachement.vue";

    export default defineComponent({
      name: "ViewDetachementPage",
      components: {
        
        ViewDetachement,
      },
    });
  </script>