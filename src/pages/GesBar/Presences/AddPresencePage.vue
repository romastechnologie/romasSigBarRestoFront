<template>
  <AddPresence />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddPresence from "@/components/GesBar/Presences/AddPresence.vue";

export default defineComponent({
  name: "AddPresencePage",
  components: {
    AddPresence,
  },
});
</script>