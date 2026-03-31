<template>
  <AddChampsLibreFamille />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import AddChampsLibreFamille from "@/components/ChampsLibre/AddChampsLibreFamille.vue";

  export default defineComponent({
    name: "AddChampsLibreFamillePage",
    components: {
      AddChampsLibreFamille,
    },
  });
</script>