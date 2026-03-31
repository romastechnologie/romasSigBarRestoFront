<template>
  <HistoriquePrixProduit />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoriquePrixProduit from "@/components/GesCom/Produit/HistoriquePrixProduit.vue";

export default defineComponent({
  name: "HistoriquePrixProduitPage",
  components: {
    HistoriquePrixProduit,
  },
});
</script>