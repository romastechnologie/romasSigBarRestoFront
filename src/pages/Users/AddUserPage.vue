<template>
  <AddUser />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddUser from "@/components/Users/AddUser.vue";

export default defineComponent({
  name: "AddUserPage",
  components: {
    AddUser,
  },
});
</script>