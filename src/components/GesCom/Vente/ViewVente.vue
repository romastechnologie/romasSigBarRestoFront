<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <!-- Section des informations générales -->
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
            <router-link
              to="/ventes/liste-ventes"
              class="btn btn-primary transition border-0 lh-1 fw-medium"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour
            </router-link>
          </div>
                <div class="row mb-4">
                  <div class="col-md-3">
                    <p class="fw-bold mb-1">Date de commande :</p>
                    <p>{{ format_Date(vente?.dateCommande) }}</p>
                  </div>
                  <div class="col-md-4">
                    <p class="fw-bold mb-1">Type de commande :</p>
                    <p>{{ vente?.typeCommande || 'N/A' }}</p>
                  </div>
                  <div class="col-md-4">
                    <p class="fw-bold mb-1">Type de facture :</p>
                    <p>{{ vente?.typeFacture || 'N/A' }}</p>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-3">
                    <p class="fw-bold mb-1">Taux AIB :</p>
                    <p>{{ vente?.tauxAIB || 'N/A' }}</p>
                  </div>
                  <div class="col-md-4">
                    <p class="fw-bold mb-1">Montant reçu :</p>
                    <p>{{ vente?.montantReçu || 'N/A' }}</p>
                  </div>
                  <div class="col-md-4">
                    <p class="fw-bold mb-1">Client :</p>
                    <p>{{ vente?.client?.nomClient ? `${vente?.client?.nomClient} ${vente?.client?.prenomClient || ''}` : vente?.client?.raisonSociale || 'N/A' }}</p>
                  </div>
                </div>

            <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mt-25">
                <h4 class="position-relative text-black fw-bold mb-10">Produits vendus</h4>
                <table class="table">
                <thead>
                    <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>P.UNIT</th>
                    <th>P.HT</th>
                    <th>M.HT</th>
                    <th>ts</th>
                    <th>TR</th>
                    <th>VA</th>
                    <th>MR</th>
                    <th>M.HTAR</th>
                    <th>M.TVA</th>
                    <th>M.TTC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(produit, index) in vente?.proCondiCommandeClients" :key="index">
                    <td>{{ produit?.libelleProduit|| 'N/A' }}</td>
                    <td>{{ produit?.qtite || 'N/A' }}</td>
                    <td>{{ produit?.prixTtc || 'N/A' }}</td>
                    <td>{{ produit?.prixHt || 'N/A' }}</td>
                    <td>{{ produit?.montantHt || 'N/A' }}</td>
                    <td>{{ produit?.taxeSpecifique || 'N/A' }}</td>
                    <td>{{ produit?.typeRemise || 'N/A' }}</td>
                    <td>{{ produit?.valeurRemise || 'N/A' }}</td>
                    <td>{{ produit?.remise || 'N/A' }}</td>
                    <td>{{ produit?.montantHtApresRemise || 'N/A' }}</td>
                    <td>{{ produit?.montantTva || 'N/A' }}</td>
                    <td>{{ produit?.montantTtc || 'N/A' }}</td>
                    </tr>
                </tbody>
                </table>
            </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_Date } from "@/utils/utils";
import { useRoute } from "vue-router";
import { Vente } from "@/models/Vente";

export default defineComponent({
  name: "ViewVente",
  setup: () => {
    const route = useRoute();
    const vente = ref<Vente | null>(null);

    function getCommandeClient(id: string) {
      return ApiService.get(`/commandeClients/${id}`)
        .then(({ data }) => {
          console.log("donnee:", data);
          vente.value = data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    onMounted(() => {
      const id = route.params.id as string;
      getCommandeClient(id);
    });

    return {
      vente,
      getCommandeClient,
      format_Date,
    };
  },
});
</script>
<style scoped>
.table td {
  white-space: normal !important;  
  max-width: 200px;               
}
</style>
