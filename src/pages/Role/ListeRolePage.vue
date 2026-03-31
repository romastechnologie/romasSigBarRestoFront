<template>
    <ListeRole/>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListeRole from "@/components/Role/ListeRole.vue";

    export default defineComponent({
      name: "ListeRolePage",
      components: {
        ListeRole,
      },
    });
  </script>