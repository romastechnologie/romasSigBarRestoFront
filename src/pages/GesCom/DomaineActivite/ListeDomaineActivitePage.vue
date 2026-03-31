<template>
    <ListeDomaineActivite/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    
    import ListeDomaineActivite from "@/components/GesCom/DomaineActivite/ListeDomaineActivite.vue";

    export default defineComponent({
      name: "ListeDomaineActivitePage",
      components: {
        
        ListeDomaineActivite,
      },
    });
  </script>