<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center" style="width:100%;">
        <Form style="width:100%;" class="search-bg svg-color pt-3">
          <div class="row">
            <!-- Tu pourras ajouter des filtres/recherche ici -->
          </div>
        </Form>
      </div>
    </div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th>Code</th>
              <th>Nom produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(produit, index) in produits" :key="produit.id || index">
              <td>{{ produit.refProd }}</td>
              <td>{{ produit.nomProd }}</td>
              <td class="d-flex align-items-center">
                {{ produit.qtitePhysique }}
                <i class=" fa fa-solid fa-eye ms-3 cursor-pointer text-primary" title="Voir les détails"
                  @click="showDetails(produit)" data-bs-toggle="modal" data-bs-target="#stockDetailsModal">
                </i>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal fade" id="stockDetailsModal" tabindex="-1" aria-labelledby="stockDetailsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ selectedProduit?.nomProd || 'Détails du produit' }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div v-if="selectedProduit">
                <h6>Conditionnements</h6>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th class="bg-primary">Code</th>
                      <th class="bg-primary" >Libellé</th>
                      <th class="bg-primary">Quantité stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cond in selectedProduit.produitconditionnements" :key="cond.id">
                      <td>{{ cond.conditionnement?.code }}</td>
                      <td>{{ cond.conditionnement?.libelle }}</td>
                      <td>{{ cond.qteStockCondLogique || 0 }}</td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-3">Quantité par magasin</h6>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th class="bg-primary">Magasin</th>
                      <th class="bg-primary">Quantité</th>
                      <th class="bg-primary">Conditionnement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="stock in magasinStocks" :key="stock.id">
                      <td>{{ stock.magasin?.nomMagasin || 'Non spécifié' }}</td>
                      <td>{{ stock.qtite }}</td>
                      <td>{{ stock.conditionnement?.libelle || 'N/A' }}</td>
                    </tr>
                  </tbody>


                </table>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { Depense } from "@/models/Depense";
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "EtatProduitsDisponibles",
  components: {
    PaginationComponent,
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    onMounted(() => {
      getAllProduits();
    });

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const debut = ref(formatDate(new Date()));
    const fin = ref(formatDate(new Date()));

    const produits = ref<Array<any>>([]);
    const recherche = ref("");
    const selectedProduit = ref<any>(null);
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllProduits(page_, limit_);
      } catch (error) {
        //
      }
    };

    const magasinStocks = computed(() => {
      if (!selectedProduit.value) return [];
      return selectedProduit.value.produitconditionnements.flatMap(cond => 
        cond.procondimags.map(stock => ({
          ...stock,
          conditionnement: cond.conditionnement
        }))
      );
    });

    function rechercher() {
      getAllProduits(page.value, limit.value, searchTerm.value);
    }

    function getAllProduits(page = 1, limi = 10, searchTerm = '') {
      ApiService.get(`/etatProduitDisponible?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          produits.value = data.data.retour.entities;
          console.log("data ====> ", produits.value);
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    const showDetails = (produit: any) => {
      selectedProduit.value = produit;
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return {
      produits,
      checkPermission,
      getAllProduits,
      page,
      totalPages,
      limit,
      debut,
      fin,
      totalElements,
      handlePaginate,
      rechercher,
      recherche,
      searchTerm,
      selectedProduit,
      showDetails,
      magasinStocks
    };
  },
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>