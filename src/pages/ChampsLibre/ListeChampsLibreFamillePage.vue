<template>
  <ListeChampsLibreFamille/>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  

import ListeChampsLibreFamille from "@/components/ChampsLibre/ListeChampsLibreFamille.vue";

  export default defineComponent({
    name: "ListeChampsLibreFamillePage",
    components: {
      
      ListeChampsLibreFamille,
    },
  });
</script>


