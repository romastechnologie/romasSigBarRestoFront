<template>
    <EditUserAgenceModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditUserAgenceModal from "@/components/Users/EditUserAgenceModal.vue";
  
    export default defineComponent({
      name: "EditUserPage",
      components: {
        EditUserAgenceModal,
      },
    });
  </script>