<template>
    <AddPersonnel />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import AddPersonnel from "@/components/GesCom/Personnel/AddPersonnel.vue";
  
    export default defineComponent({
      name: "AddPersonnellePage",
      components: {
        
        AddPersonnel,
      },
    });
  </script>