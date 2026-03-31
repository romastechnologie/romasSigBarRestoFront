<template>
    <AddRole />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddRole from "@/components/Role/AddRole.vue";
  
    export default defineComponent({
      name: "AddRolePage",
      components: {
        AddRole,
      },
    });
  </script>