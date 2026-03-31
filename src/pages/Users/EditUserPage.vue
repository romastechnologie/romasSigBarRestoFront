<template>
    <EditUser />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditUser from "@/components/Users/EditUser.vue";
  
    export default defineComponent({
      name: "EditUserPage",
      components: {
        EditUser,
      },
    });
  </script>