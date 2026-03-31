<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
  
      <!-- Bouton Ajouter un magasin -->
  <div class="d-flex align-items-center" v-if="checkPermission('AddMagasin')">
    <!-- <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#AddMagasinModal">
      <i class="fa fa-plus-circle"></i>
      Ajouter un magasin 
    </a> -->
    <router-link class="btn btn-primary ms-3" :to="{ name: 'AddMagasin' }">
      <i class="fa fa-plus-circle"></i>
      Ajouter un magasin
    </router-link>
  </div>

  <!-- Champ Multiselect avec label "Filtrer par Point de vente" -->
  <div class="d-flex flex-column" v-if="point_ventes.length > 1">
    <label class="d-block text-black fw-semibold mb-10">Filtrer par Point de vente</label>
    <div style="width: 200px;">
      <Multiselect 
        v-if="point_ventes.length > 1" 
        v-model="point_vente" 
        :options="point_ventes" 
        :searchable="true" 
        track-by="label" 
        label="label" 
        placeholder="Sélectionner un point de vente" 
      />
    </div>
  </div>

  <!-- Champ de recherche avec bouton -->
  <div class="d-flex align-items-center">
    <form class="search-bg svg-color pt-3 d-flex align-items-center" @submit.prevent="rechercher">
      <input 
        type="text" 
        v-model="searchTerm" 
        @keyup="rechercher" 
        class="form-control shadow-none text-black mx-2 flex-grow-1" 
        placeholder="Rechercher un magasin" 
      />
      <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
        <i class="flaticon-search-interface-symbol"></i>
      </button>
    </form>
  </div>
</div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Code
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Nom Mag.
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Magasinier
              </th>
               <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Sections 
              </th>
              <th scope="col" style="max-width: 300px; word-wrap: break-word; white-space: normal;" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Adresse
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(magasin, index) in magasins" :key="index">
              <!-- Vos colonnes existantes -->
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin.code }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin.nomMagasin }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin?.user?.nom }} {{ magasin?.user?.prenom }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis" >
                <span class="badge badge-primary me-1" v-for="(secteur, index) in magasin.sections" :key="index">{{ secteur.code }} </span>
              </td>
               <td class="shadow-none lh-1 fw-medium text-black-emphasis" style="max-width: 300px; word-wrap: break-word; white-space: normal;">
                {{ magasin.adresse }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="voirDetails(magasin)"
                        data-bs-toggle="modal" 
                        data-bs-target="#detailsMagasinModal">
                        <i class="fa fa-eye lh-1 me-8 position-relative top-1"></i> Voir détails
                      </a>
                    </li>
                    <li v-if="checkPermission('EditMagasin')">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="navigateToEdit(magasin.id)">
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i> Modifier
                      </a>
                    </li>
                    <!--<li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="accept(magasin)">
                        <i class="fa fa-file lh-1 me-8 position-relative top-1"></i> Générer une fiche
                      </a>
                    </li>-->
                    <li v-if="checkPermission('DeleteMagasin')">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="suppression(magasin.id, magasins, 'magasins', `le magasin ${magasin.nomMagasin}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i> Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
  <AddMagasinModal :item="selectedItem" @close="recharger" />

  <!-- Modal pour les détails du magasin -->
  <div class="modal fade" id="detailsMagasinModal" tabindex="-1" aria-labelledby="detailsMagasinModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="detailsMagasinModalLabel">Détails du Magasin</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="magasinSelectionne">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <strong>Code:</strong>
                <p class="text-muted">{{ magasinSelectionne.code }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <strong>Nom du Magasin:</strong>
                <p class="text-muted">{{ magasinSelectionne.nomMagasin }}</p>
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <strong>Magasinier:</strong>
                <p class="text-muted">{{ magasinSelectionne.user?.nom }} {{ magasinSelectionne.user?.prenom }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <strong>Magasin Principal:</strong>
                <p class="text-muted">
                  <span class="badge" :class="magasinSelectionne.estPrincipal ? 'bg-success' : 'bg-secondary'">
                    {{ magasinSelectionne.estPrincipal ? 'Oui' : 'Non' }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <strong>Adresse:</strong>
                <p class="text-muted">{{ magasinSelectionne.adresse || 'Non renseignée' }}</p>
              </div>
            </div>
          </div>

          <div class="row" v-if="magasinSelectionne.sections && magasinSelectionne.sections.length > 0">
            <div class="col-12">
              <div class="mb-3">
                <strong>Sections:</strong>
                <div class="mt-2">
                  <div 
                    class="card border-0 shadow-sm mb-2" 
                    v-for="(section, index) in magasinSelectionne.sections" 
                    :key="index"
                  >
                    <div class="card-body p-3">
                      <div class="d-flex align-items-center mb-2">
                        <span class="badge bg-primary me-2">{{ section.code }}</span>
                        <h6 class="mb-0 fw-semibold">{{ section.nomMagasin }}</h6>
                      </div>
                      <div class="text-muted small">
                        <i class="fa fa-map-marker me-1"></i>
                        {{ section.adresse || 'Adresse non renseignée' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="magasinSelectionne.photo">
            <div class="col-12">
              <div class="mb-3">
                <strong>Photo:</strong>
                <div class="mt-2">
                  <img 
                    :src="magasinSelectionne.photo" 
                    alt="Photo du magasin" 
                    class="img-thumbnail" 
                    style="max-width: 200px; max-height: 200px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="navigateToEdit(magasinSelectionne.id)"
            v-if="checkPermission('EditMagasin')"
            data-bs-dismiss="modal"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import { Magasin } from "@/models/Magasin";
import ApiService from "@/services/ApiService";
import { suppression, success, error, optionPointVente } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import AddMagasinModal from "./AddMagasinModal.vue";
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'


export default defineComponent({
  name: "ListeMagasin",
  components: {
    PaginationComponent,
    AddMagasinModal,
    Multiselect
  },
  setup() {
    const router = useRouter();
    const magasins = ref<Array<Magasin>>([]);
    const magasin = ref<Magasin>();
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedItem = ref(0);
    const magasinSelectionne = ref<Magasin | null>(null);

    let point_vente = ref<string>("");
    let point_ventes = ref([]);

    onMounted(async () => {
      
      if (JwtService.getPointDeVente()) {
        point_vente.value = await JwtService.getPointDeVenteId();
      }
      const pointVentes = await JwtService.getPointDeVentes();
      point_ventes.value = pointVentes ? pointVentes.map((point: any) => ({
        value: point.id,
        label: point.nomPointVente
      })) : [];
      getAllMagasins(point_vente.value);
    });

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllMagasins(point_vente.value,page_, limit_);
      } catch (error) {
        //
      }
    };

    watch(point_vente, () => {
      rechercher();
    });

    function rechercher() {
      getAllMagasins(point_vente.value, page.value, limit.value, searchTerm.value);
    }

    const recharger = () => {
      getAllMagasins(point_vente.value);
    };

    function getAllMagasins(point_vent, page = 1, limi = 10, searchTerm = '') {
      console.log(point_vent, "point_vent")
      return ApiService.get(`/all/magasins?page=${page}&limit=${limi}&mot=${searchTerm}&pointvente=${point_vent}&`)
        .then(({ data }) => {
          magasins.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    function moddifier(EditMagasin: Magasin) {
      magasin.value = EditMagasin;
      selectedItem.value = EditMagasin.id;
    }

    const navigateToEdit = (id: number) => {
      router.push({ name: 'EditMagasin', params: { id: id } });
    };

    const deleteMagasin = (id: number) => {
      ApiService.delete(`/magasins/${id}`)
        .then(({ data }) => {
          Swal.fire({
            text: data.message,
            toast: true,
            icon: 'success',
            title: 'General Title',
            animation: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            heightAuto: false
          });
          magasins.value = magasins.value.filter(m => m.id !== id);
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réessayer à nouveau!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    };

    const accept = async (magasin: Magasin) => {
      const result = await Swal.fire({
        text: `Vous êtes sur le point de générer une fiche pour le magasin ${magasin?.nomMagasin}`,
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Accepter",
        cancelButtonText: `Annuler`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });

      if (result.isConfirmed) {
        try {
          const response = await ApiService.post(`/magasins/${magasin.id}/fiches-produit`, {});
          success(response.data.message);
          recharger(); // Recharge la liste pour refléter les nouvelles fiches
        } catch (errorr) {
          error(errorr.response?.data?.message || "Une erreur est survenue lors de la génération des fiches");
        }
      }
    };

    const voirDetails = (magasin: Magasin) => {
      magasinSelectionne.value = magasin;
      // Le modal s'ouvrira automatiquement grâce aux attributs data-bs-toggle et data-bs-target
    };

    return {
      magasins,
      checkPermission,
      getAllMagasins,
      deleteMagasin,
      moddifier,
      navigateToEdit,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      accept,
      selectedItem,
      recharger,
      optionPointVente,
      point_ventes,
      point_vente,
      magasinSelectionne,
      voirDetails
    };
  },
});
</script>