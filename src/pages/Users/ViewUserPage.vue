<template>
  <ViewUser />
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import ViewUser from "@/components/Users/ViewUser.vue";

  export default defineComponent({
    name: "ViewUserPage",
    components: {
      ViewUser,
    },
  });
</script>