<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Détails de l'approvisionnement</h4>
            <router-link to="/approvisionnements/liste-approvisionnements"
              class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative">Retour</span>
            </router-link>
          </div>

          <!-- Section Informations générales -->
          <div class="card mb-4 border-0 rounded-0">
            <div class="card-body p-3 p-sm-4 p-md-5 letter-spacing">
              <h5 class="text-black fw-bold mb-3">Informations générales</h5>
              <div class="row">
                <div class="col-md-3">
                  <label class="d-block text-black fw-semibold">Date</label>
                  <p class="fw-bold fs-0 text-success">
                    {{ format_Date(approvisionnement?.dateAppro) }}
                  </p>
                </div>
                <div class="col-md-3">
                  <label class="d-block text-black fw-semibold">Nom du Fournisseur</label>
                  <p>{{ approvisionnement?.fournisseur?.nomFournisseur || 'N/A' }}</p>
                </div>
                <div class="col-md-3">
                  <label class="d-block text-black fw-semibold">Référence</label>
                  <p>{{ approvisionnement?.refApproGen || 'N/A' }}</p>
                </div>
                <div class="col-md-3">
                  <label class="d-block text-black fw-semibold">Montant total</label>
                  <p class="fw-bold fs-0 text-success formatted-amount">
                    {{ format_Montant(approvisionnement?.montantTotal) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Produits et magasins -->
          <div class="card mb-4 border-0 rounded-0">
            <div class="card-body p-3 p-sm-4 p-md-5 letter-spacing">
              <h5 class="text-black fw-bold mb-3">Produits et magasins</h5>

              <div class="row fw-bold border-bottom mb-2 pb-2 text-center">
                <div class="col-md-4 text-start">Nom produit</div>
                <div class="col-md-2">Quantité</div>
                <div class="col-md-2">Prix</div>
                <div class="col-md-2">Montant</div>
                <div class="col-md-2"></div>
              </div>

              <!-- Vérifiez si des produits existent -->
              <div v-if="!approvisionnement?.apropocondis || approvisionnement.apropocondis.length === 0"
                class="text-center py-4">
                <p class="text-muted">Aucun produit dans cet approvisionnement</p>
              </div>

              <div v-else class="accordion dark-accordion" id="produits">
                <div class="accordion-item accordion-wrapper" v-for="(produit, index) in approvisionnement.apropocondis"
                  :key="index">
                  <h2 class="accordion-header" :id="`produit${index}`">
                    <button
                      class="accordion-button bg-light font-primary d-flex row w-100 m-0 text-center align-items-center justify-content-between collapsed"
                      type="button" data-bs-toggle="collapse" :data-bs-target="`#collapseProduit${index}`"
                      aria-expanded="false" :aria-controls="`collapseProduit${index}`">
                      <div class="col-md-4 text-start">
                        {{ getProduitNom(produit) }}
                      </div>
                      <div class="col-md-2">{{ produit?.qtite || 0 }}</div>
                      <div class="col-md-2">{{ format_Montant(produit?.prixRevient) }}</div>
                      <div class="col-md-2 fw-bold">{{ format_Montant(produit?.montant) }}</div>
                      <div class="col-md-2 d-flex justify-content-center align-items-center">
                        <i class="ms-2 vue-feather vue-feather--chevron-down svg-color">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </i>
                      </div>
                    </button>
                  </h2>

                  <div :id="`collapseProduit${index}`" class="accordion-collapse collapse"
                    :aria-labelledby="`produit${index}`" data-bs-parent="#produits">
                    <div class="accordion-body">
                      <table class="table mt-3">
                        <thead>
                          <tr>
                            <th class="col-2">Magasin</th>
                            <th>Quantité</th>
                            <th>Prix de revient</th>
                            <th>Montant</th>
                             <th>Total produit</th>
                          </tr>
                        </thead>
                        <tbody v-if="produit.aprocondimagasins && produit.aprocondimagasins.length > 0">
                          <tr v-for="(magasin, magIndex) in produit.aprocondimagasins" :key="magIndex">
                            <td><span class="badge bg-info">{{ magasin.magasin?.nomMagasin || 'N/A' }}</span></td>
                            <td><span class="badge bg-secondary">{{ magasin.qteCondAppro || 0 }}</span></td>
                            <td class="fw-medium">{{ format_Montant(magasin.prixRevient) }}</td>
                            <td class="fw-bold">{{ format_Montant(magasin.montantCond) }}</td>
                             <td v-if="magIndex === 0" 
                              :rowspan="produit.aprocondimagasins.length"
                              class="fw-bold text-primary align-middle text-center">
                              {{ format_Montant(produit?.montant) }}
                          </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="4" class="text-center text-muted">Aucune distribution en magasin</td>
                          </tr>
                        </tbody>
                        <!-- <tfoot class="table-light">
                          <tr>
                            <td colspan="3" class="text-end fw-bold">Total produit :</td>
                            <td class="text-end fw-bold fs-6 text-primary">{{ format_Montant(produit?.montant) }}</td>
                          </tr>
                        </tfoot> -->
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ligne de total général -->
              <!-- <div class="row mt-4 pt-3 border-top">
                <div class="col-md-10 text-end">
                  <h5 class="fw-bold">Total général :</h5>
                </div>
                <div class="col-md-2">
                  <h4 class="fw-bold text-primary">{{ format_Montant(approvisionnement?.montantTotal) }}</h4>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { Approvisionnement } from "@/models/Approvisionnement";
import { error } from "@/utils/utils";

export default defineComponent({
  name: "ViewApprovisionnement",

  setup() {
    const route = useRoute();
    const approvisionnement = ref<Approvisionnement | null>(null);
    const loading = ref(true);

    // Fonction pour formater la date
    const format_Date = (dateString: string | Date) => {
      if (!dateString) return 'Non spécifiée';

      try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) return 'Date invalide';

        return date.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.error("Erreur de formatage de date:", error);
        return 'Erreur de format';
      }
    };

    const format_Montant = (montant: number | string | null | undefined) => {
      if (montant === null || montant === undefined || montant === '') {
        return '0 FCFA';
      }

      try {
        const montantNumber = typeof montant === 'string'
          ? parseFloat(montant.toString().replace(',', '.').replace(/\s/g, ''))
          : Number(montant);

        if (isNaN(montantNumber)) {
          return '0 FCFA';
        }

        const formatted = montantNumber.toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        return `${formatted} FCFA`;

      } catch (error) {
        console.error("Erreur de formatage de montant:", error);
        return '0 FCFA';
      }
    };

    const getProduitNom = (produit: any) => {
      if (!produit) return `Produit`;

      const nom = produit.produitcondi?.nomProCond || '';
      const conditionnement = produit.produitcondi?.conditionnement?.libelle || '';

      if (nom && conditionnement) {
        return `${nom} - ${conditionnement}`;
      } else if (nom) {
        return nom;
      } else if (conditionnement) {
        return conditionnement;
      }

      return `Produit`;
    };

    // Fonction pour récupérer l'approvisionnement
    async function getApprovisionnement(id: string) {
      loading.value = true;
      try {
        const response = await ApiService.get(`/approvisionnements/${id}`);
        console.log("Données reçues:", response.data);
        approvisionnement.value = response.data.data;
      } catch (err: any) {
        const message = err.response?.data?.message || "Erreur lors du chargement";
        error(message);
        console.error("Erreur API:", err);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getApprovisionnement(id);
      } else {
        error("ID d'approvisionnement manquant");
      }
    });

    return {
      approvisionnement,
      loading,
      getApprovisionnement,
      format_Date,
      format_Montant,
      getProduitNom
    };
  },
});
</script>

<style scoped>
.table th,
.table td {
  padding: 0.75rem;
  vertical-align: middle;
}

.accordion-button {
  padding: 1rem;
}

.accordion-body {
  padding: 1.5rem;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
}

.formatted-amount {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
}
</style>