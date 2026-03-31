<template>
    <ListePersonnel/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListePersonnel from "@/components/GesCom/Personnel/ListePersonnel.vue";

    export default defineComponent({
      name: "ListePersonnelPage",
      components: {
        
        ListePersonnel,
      },
    });
  </script>