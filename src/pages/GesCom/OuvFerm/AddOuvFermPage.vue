<template>
  <BreadCrumb PageTitle="Ouvrir une caisse" />
  <AddOuvFerm />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddOuvFerm from "@/components/GesCom/OuvFerm/AddOuvFerm.vue";
import BreadCrumbs from "@/layout/BreadCrumbs.vue";

export default defineComponent({
  name: "AddOuvFermPage",
  components: {
    BreadCrumbs,
    AddOuvFerm,
  },
});
</script>
