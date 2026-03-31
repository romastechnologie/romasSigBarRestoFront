<template>
    <ListePermission />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import ListePermission from "@/components/Permission/ListePermission.vue";

  
    export default defineComponent({
      name: "ListePermissionPage",
      components: {
        ListePermission,
      },
    });
  </script>