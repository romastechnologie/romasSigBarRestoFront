<template>
    <ListeTable/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeTable from "@/components/GesCom/Table/ListeTable.vue";

    export default defineComponent({
      name: "ListeTablePage",
      components: {
        
        ListeTable,
      },
    });
  </script>