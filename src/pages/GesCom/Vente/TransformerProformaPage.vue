<template>
  <div>
    <TransformerProforma title="Transformer une facture proforma en vente" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransformerProforma from "@/components/GesCom/Vente/TransformerProforma.vue";

export default defineComponent({
  name: "TransformerProformaPage",
  components: {
    TransformerProforma,
  },
});
</script>
