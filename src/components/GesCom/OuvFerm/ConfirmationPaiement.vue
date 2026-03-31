<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <h5 class="text-black fw-semibold mb-0">Confirmation des paiements</h5>
      </div>
      <router-link to="/OuverturesFermetures" class="btn btn-primary">Retour à la liste</router-link>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date Règlement
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Client
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Montant Payé
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Mode de règlement
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Statut
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reglement, index) in reglements" :key="index">
              <td class="shadow-none lh-1 fw-medium">{{ format_date(reglement.date) }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span v-if="reglement?.creance?.client">
                  {{ reglement?.creance?.client?.nomClient && reglement?.creance?.client?.prenomClient ?
                    `${reglement?.creance?.client?.nomClient} ${reglement?.creance?.client?.prenomClient}`
                    : reglement?.creance?.client?.raisonSociale }}
                </span>
                <span v-else-if="reglement?.commandeClient?.client">
                  {{ reglement?.commandeClient?.client?.nomClient && reglement?.commandeClient?.client?.prenomClient ?
                    `${reglement?.commandeClient?.client?.nomClient} ${reglement?.commandeClient?.client?.prenomClient}`
                    : reglement?.commandeClient?.client?.raisonSociale }}
                </span>
                <span v-else>Non défini</span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ separateur(reglement.montantPaye) }} FCFA</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ reglement?.modeReglement?.libelle }}</td>
              <td class="shadow-none lh-1 fw-medium">
                <span class="badge bg-warning">En attente de confirmation</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <button
                  @click="confirmerPaiement(reglement.id)"
                  class="btn btn-success btn-sm"
                >
                  <i class="flaticon-checkmark lh-1 me-8 position-relative top-1"></i>Confirmer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="reglements.length === 0" class="text-center text-muted py-4">
        Aucun règlement en attente de confirmation
      </div>

      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Affichage de <span class="fw-bold">{{ reglements.length }}</span> sur
          <span class="fw-bold">{{ totalElements }}</span> résultats
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { error, success, format_date, separateur, monSwal } from "@/utils/utils";
import { Reglement } from "@/models/Reglement";

export default defineComponent({
  name: "ConfirmerPaiement",
  setup() {
    const reglements = ref<Reglement[]>([]);
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const totalElements = ref<number>(0);
    const limit = ref<number>(10);


  const getReglementsEnAttente = (page = 1, limi = 10) => {
    ApiService.get(`/reglements/en-attente?page=${page}&limit=${limi}`)
      .then(({ data }) => {
        console.log("jerecupere",data);
        reglements.value = data.data.data || [];
        totalPages.value = data.data.totalPages || 1;
        totalElements.value = data.data.totalElements || reglements.value.length;
        limit.value = data.data.limit || limi;
        currentPage.value = page;
      })
      .catch(({ response }) => {
        error(response?.data?.message || "Erreur lors de la récupération des règlements");
      });
  };

    const confirmerPaiement = async (reglementId: number) => {
      const confirmed = await monSwal(
        
        "Êtes-vous sûr que ce paiement a bien été effectué ?",
        "Oui, confirmer",
        "btn btn-primary",
        "Annuler",
        "La confirmation a été annulée"
      );

      if (!confirmed) return;

      ApiService.put(`/reglements/${reglementId}/confirmer`, {})
        .then(({ data }) => {
          console.log("miseeeee",data);
          success(data.message || "Paiement confirmé avec succès");
          getReglementsEnAttente(currentPage.value, limit.value);
        })
        .catch(({ response }) => {
          error(response?.data?.message || "Erreur lors de la confirmation du paiement");
        });
    };

    

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        getReglementsEnAttente(page, limit.value);
      }
    };

    onMounted(() => {
      getReglementsEnAttente();
    });

    return {
      reglements,
      currentPage,
      totalPages,
      totalElements,
      limit,
      format_date,
      separateur,
      confirmerPaiement,
      changePage,
    };
  },
});
</script>

<style scoped>
.card {
  margin-bottom: 25px;
}
.card-head {
  padding: 15px 20px;
}
.text-muted {
  color: #6c757d;
}
</style>
