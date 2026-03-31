<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/transactions/liste-transactions" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>{{ transaction?.dateTransaction }}</td>
                </tr>
                <tr>
                  <td>Reference</td>
                  <td>{{ transaction?.reference }}</td>
                </tr>
                <tr>
                  <td>Motif</td>
                  <td>{{ transaction?.motif }}</td>
                </tr>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  <td>Type Opération</td>
                <span v-if="transaction?.typeOperation == 'DEBIT'">
                  {{ separateur(transaction?.montant) }}</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span v-if="transaction?.typeOperation == 'CREDIT'">
                  {{ separateur(transaction?.montant) }}
                </span>
              </td>
                <tr>
                  <td>Type Opération</td>
                  <td>{{ transaction?.typeOperation }}</td>
                </tr>
                <tr>
                  <td>Solde</td>
                  <td>{{ transaction?.solde }}</td>
                </tr>
                <tr>
                  <td>Statut</td>
                  <td>{{ transaction?.statut }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Transaction } from "@/models/Transaction";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewTransaction",
  setup: () => {
    const route = useRoute();
    const transaction = ref<Transaction | null>(null);

    function getTransaction(id: string) {
      return ApiService.get("/transactions", id)
        .then(({ data }) => {
          transaction.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getTransaction(id);
    });

    return { 
      transaction,
      getTransaction,
      format_Date,
     };
  },
});
</script>
