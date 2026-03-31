<template>
    <EditRole />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditRole from "@/components/Role/EditRole.vue";
  
    export default defineComponent({
      name: "EditRolePage",
      components: {
        EditRole,
      },
    });
  </script>