<template>
  <ListeMesClients />
</template>

<script lang="ts">

import ListeMesClients from "@/components/MesClients/ListeMesClients.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListeMesClientsPage",
  components: {

    ListeMesClients,
  },
});
</script>
