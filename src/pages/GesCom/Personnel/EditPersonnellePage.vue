<template>
    <EditPersonnel/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import EditPersonnel from "@/components/GesCom/Personnel/EditPersonnel.vue";

    export default defineComponent({
      name: "EditPersonnellePage",
      components: {        
        EditPersonnel,
      },
    });
  </script>

