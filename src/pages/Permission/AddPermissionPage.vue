<template>
    <AddPermissionModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import AddPermissionModal from "@/components/Permission/AddPermissionModal.vue";
  
    export default defineComponent({
      name: "AddPermissionPage",
      components: {
        AddPermissionModal,
      },
    });
  </script>