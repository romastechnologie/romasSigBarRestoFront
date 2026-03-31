<template>
    <EditProfile />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditProfile from "@/components/Users/EditProfile.vue";
  
    export default defineComponent({
      name: "EditProfilePage",
      components: {
        EditProfile,
      },
    });
  </script>