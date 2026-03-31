<template>
    <EditUserPassModal />
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
  
    import EditUserPassModal from "@/components/Users/EditUserPassModal.vue";
  
    export default defineComponent({
      name: "EditUserPassPage",
      components: {
        EditUserPassModal,
      },
    });
  </script>