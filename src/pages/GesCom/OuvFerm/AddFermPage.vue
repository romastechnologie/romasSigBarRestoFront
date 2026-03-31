<template>
  <BreadCrumb PageTitle="Faire une Fermeture" />
  <AddFerm />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumbs from "@/layout/BreadCrumbs.vue";
import AddFerm from "@/components/GesCom/OuvFerm/AddFerm.vue";

export default defineComponent({
  name: "AddFermPage",
  components: {
    BreadCrumbs,
    AddFerm,
  },
});
</script>
