<template>
  <ConfirmerPaiement />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfirmerPaiement from "@/components/GesCom/OuvFerm/ConfirmerPaiement.vue";
import BreadCrumbs from "@/layout/BreadCrumbs.vue";

export default defineComponent({
  name: "ConfirmerPaiementPage",
  components: {
    BreadCrumbs,
    ConfirmerPaiement,
  },
});
</script>
