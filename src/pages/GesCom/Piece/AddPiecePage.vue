<template>
    <AddPieceModal />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import AddPieceModal from "@/components/GesCom/Piece/AddPieceModal.vue";
  
  export default defineComponent({
    name: "AddPiecePage",
    components: {
      AddPieceModal
    }
  });
  </script>