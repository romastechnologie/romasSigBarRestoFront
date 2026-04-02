<template>
  <AddModeleContrat />
</template>
<script lang="ts">
  import { defineComponent } from "vue";
import AddModeleContrat from "@/components/GesBar/ModeleContrat/AddModeleContrat.vue";
  export default defineComponent({
    name: "AddModeleContratPage",
    components: {
      AddModeleContrat,
    },
  });
</script>