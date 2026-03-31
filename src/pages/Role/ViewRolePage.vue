<template>
    <ViewRole />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ViewRole from "@/components/Role/ViewRole.vue";
  
    export default defineComponent({
      name: "ViewRolePage",
      components: {
        ViewRole,
      },
    });
  </script>