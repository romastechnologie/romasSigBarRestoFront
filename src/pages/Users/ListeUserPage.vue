<template>
  <ListeUser />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListeUser from "@/components/Users/ListeUser.vue";

export default defineComponent({
  name: "ListeUserPage",
  components: {
    ListeUser,
  },
});
</script>