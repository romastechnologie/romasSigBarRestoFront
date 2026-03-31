<template>
        <TableauBord />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TableauBord from "@/components/dashboards/TableauBord.vue";

export default defineComponent({
  name: "TableauBordPage",
  components: {
    TableauBord
  },
});
</script>