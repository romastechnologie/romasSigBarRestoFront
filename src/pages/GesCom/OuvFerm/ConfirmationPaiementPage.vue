<template>
  <BreadCrumb PageTitle="Confirmer les règlements ayant pour type virement bancaire ou chèque" />
  <ConfirmationPaiement />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumbs from "@/layout/BreadCrumbs.vue";
import ConfirmationPaiement from "@/components/GesCom/OuvFerm/ConfirmationPaiement.vue";

export default defineComponent({
  name: "ConfirmationPaiementPage",
  components: {
    BreadCrumbs,
    ConfirmationPaiement,
  },
});
</script>
