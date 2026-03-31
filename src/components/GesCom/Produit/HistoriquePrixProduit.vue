<template>
  <div class="card border-0 rounded-0">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div class="card-header">
        <h3 class="text-black fw-semibold">Historique des prix du produit</h3>
        <router-link :to="{ name: 'ListeProduit' }" class="btn btn-primary transition border-0 lh-1 fw-medium"
          style="position: absolute; right: 10px; top: 10px;">
          <i class="flaticon-left-arrow lh-1 me-1"></i>
          Retour
        </router-link>
      </div>
      <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mt-25">
            <!-- <h4 class="position-relative text-black fw-bold mb-10">Historique des prix</h4> -->
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="produitFilter" class="form-label">Produit</label>
                    <Multiselect 
                      v-model="selectedProduit" 
                      :options="[{ value: produit?.id, label: produit?.nomProd || 'N/A' }]"
                      :searchable="false"
                      :disabled="true"
                      track-by="value"
                      label="label"
                      placeholder="Produit"
                    />
                </div>
                <div class="col-md-4">
                    <label for="conditionnementFilter" class="form-label">Conditionnement</label>
                    <Multiselect 
                      v-model="selectedConditionnement" 
                      :options="conditionnementOptions"
                      :searchable="true"
                      track-by="value"
                      label="label"
                      placeholder="Tous les conditionnements"
                      @select="filterPrixHistorique"
                    />
                </div>
                <div class="col-md-4">
                    <label for="categorieClientFilter" class="form-label">Catégorie Client</label>
                    <Multiselect 
                      v-model="selectedCategorieClient" 
                      :options="categorieClientOptions"
                      :searchable="true"
                      track-by="value"
                      label="label"
                      placeholder="Toutes les catégories"
                      @select="filterPrixHistorique"
                    />
                </div>
                </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Date de définition</th>
                  <th>Conditionnement</th>
                  <th>Catégorie Client</th>
                  <th>Prix</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
               <tr v-for="(prix, index) in filteredPrixHistorique" :key="index">
                    <td>{{ format_Date(prix.createdAt) || 'N/A' }}</td>
                    <td>{{ prix.produitConditionnement?.conditionnement?.libelle || 'N/A' }}</td>
                    <td>{{ prix.categorieClient?.libelle || 'N/A' }}</td>
                    <td>{{ prix.prix || 'N/A' }}</td>
                    <td>
                      <span 
                        class="badge" 
                        :class="prix.statut === true ? 'bg-success' : 'bg-danger'"
                      >
                        {{ prix.statut === true ? 'Actif' : 'Inactif' }}
                      </span>
                    </td>
                    </tr>

                <!-- <tr v-if="!prixHistorique || prixHistorique.length === 0">
                  <td colspan="5" class="text-center">Aucun historique de prix trouvé.</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <PaginationComponent
          :page="page"
          :totalPages="totalPages"
          :totalElements="totalElements"
          :limit="limit"
          @paginate="handlePaginate"
        />
      </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import ApiService from "@/services/ApiService";
import { Produit } from "@/models/Produit";
import { error, format_date } from "@/utils/utils";
import { useRoute } from "vue-router";
import Multiselect from '@vueform/multiselect';
import PaginationComponent from '@/components/Utilities/Pagination.vue';


export default defineComponent({
  name: "HistoriquePrixProduit",
   components: {
    Multiselect,
    PaginationComponent
  },
  setup() {
    const route = useRoute();
    const produit = ref<Produit | null>(null);
    const prixList = ref<any[]>([]);  // Liste des prix paginés
    const selectedConditionnement = ref<string>("");
    const selectedCategorieClient = ref<string>("");
    const selectedProduit = ref<string>("");


      const page = ref(1);
          const totalPages = ref(0);
          const limit = ref(10);
          const totalElements = ref(0);
      
          const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
            try {
              page.value = page_;
              limit.value = limit_;
              const id = route.params.id as string;
              if (id) {
                getProduit(id, page_, limit_);
              }
            } catch (err) {
              error('Erreur lors de la pagination');
            }
          };

    // Options pour les multiselect - extraire des prix
    const conditionnementOptions = computed(() => {
      if (!prixList.value || prixList.value.length === 0) return [{ value: "", label: "Tous les conditionnements" }];
      
      // Extraire les conditionnements uniques
      const uniqueConditionnements = new Map();
      prixList.value.forEach(prix => {
        const cond = prix.produitConditionnement?.conditionnement;
        if (cond && !uniqueConditionnements.has(cond.id)) {
          uniqueConditionnements.set(cond.id, cond);
        }
      });
      
      return [
        { value: "", label: "Tous les conditionnements" },
        ...Array.from(uniqueConditionnements.values()).map(cond => ({
          value: cond.id?.toString() || "",
          label: cond.libelle || "N/A"
        }))
      ];
    });

    // const categorieClientOptions = computed(() => {
    //   return [
    //     { value: "", label: "Toutes les catégories" },
    //     ...categoriesClient.value.map(cat => ({
    //       value: cat.id.toString(),
    //       label: cat.libelle
    //     }))
    //   ];
    // });

    async function getProduit(id: string, pageNum = 1, limi = 10) {
      try {
        const { data } = await ApiService.get(`/produitsAvecMag/${id}?page=${pageNum}&limit=${limi}`);
        console.log("Données reçues :", JSON.stringify(data, null, 2));
        
        if (data && data.data) {
          produit.value = data.data.produit;
          prixList.value = data.data.prix || [];
          selectedProduit.value = data.data.produit.id;
          
          totalPages.value = data.data.totalPages || 1;
          limit.value = data.data.limit || 10;
          totalElements.value = data.data.totalElements || 0;
          page.value = data.data.currentPage || pageNum;
          
          console.log("Produit:", produit.value.nomProd);
          console.log("Prix paginés:", prixList.value.length);
          console.log("Total prix:", totalElements.value);
        } else {
          throw new Error("Données non trouvées.");
        }
      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération des données.");
      }
    }

    // async function getAllCategorieClient() {
    //   try {
    //     const { data } = await ApiService.get(`/all/categorieclient`);
    //     console.log("Catégories client reçues :", data.data.data);
    //     if (data && data.data) {
    //       categoriesClient.value = Array.isArray(data.data.data) ? data.data.data : [data.data.data];
    //     } else {
    //       throw new Error("Données des catégories client non trouvées.");
    //     }
    //   } catch (err) {
    //     error(err instanceof Error ? err.message : "Erreur lors de la récupération des catégories client.");
    //   }
    // }

    const filteredPrixHistorique = computed(() => {
      if (!prixList.value || prixList.value.length === 0) {
        return [];
      }
      
      return prixList.value.filter(prix => {
        const matchesConditionnement = selectedConditionnement.value
          ? prix.produitConditionnement?.conditionnement?.id === parseInt(selectedConditionnement.value)
          : true;
        const matchesCategorieClient = selectedCategorieClient.value
          ? prix.categorieClient?.id === parseInt(selectedCategorieClient.value)
          : true;
        return matchesConditionnement && matchesCategorieClient;
      });
    });

    function filterPrixHistorique() {
      console.log("Filtres appliqués :", {
        conditionnementId: selectedConditionnement.value,
        categorieClientId: selectedCategorieClient.value,
      });
    }

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getProduit(id);
        // getAllCategorieClient().then(() => {
        // });
      } else {
        error("ID du produit non spécifié.");
      }
    });

    return {
      produit,
      prixList,
      selectedConditionnement,
      selectedCategorieClient,
      selectedProduit,
      conditionnementOptions,
      // categorieClientOptions,
      filteredPrixHistorique,
      filterPrixHistorique,
      format_Date: format_date,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
    };
  },
});
</script>

<style scoped>
@import '@vueform/multiselect/themes/default.css';

.card {
  border: none;
  margin: 0;
}
.card-body {
  padding: 15px;
}
.row {
  margin: 0;
}
.table {
  border-collapse: collapse;
}
.table td, .table th {
  padding: 8px;
}
</style>