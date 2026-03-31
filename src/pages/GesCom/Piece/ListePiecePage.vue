<template>
    <ListePiece />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ListePiece from "@/components/GesCom/Piece/ListePiece.vue";
  
  export default defineComponent({
    name: "ListePiecePage",
    components: {
      ListePiece
    }
  });
  </script>