<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Liste des mets</h3>
    </div>
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link class="me-2 btn btn-primary" to="/mets/ajouter-met">
          <i class="fa fa-plus-circle"></i> Ajouter un met
        </router-link>
        <button class="me-2 btn btn-danger" v-if="checkPermission('DePublier')" @click="depublier('')">
          <i class="fa fa-close lh-1 me-2 position-relative top-1"></i>Tout dépublier
        </button>
        <button class="me-2 btn btn-success" v-if="checkPermission('Publier')" @click="publier('')">
          <i class="fa fa-check lh-1 me-2 position-relative top-1"></i>Tout publier
        </button>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
            placeholder="Rechercher un met" />
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Image</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Code</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Référence</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Nom</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Famille</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Etat</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"> ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="met in mets" :key="met.id">
              <td>
                <ModalImage v-if="met" :libelle="met.nomProd" :keyValue="met.id"
                  :fileUrl="met.imagePrincipal" />
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ met.codeMet }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ met.refProd }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ met.nomProd }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ met.famille?.libelleFamille }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <div>
                  <span class="text-danger" v-if="met.estPublier == 0"><i
                      class="fa fa-close lh-1 me-1 position-relative top-1"></i>Non publié</span>
                  <span class="text-success" v-if="met.estPublier == 1"><i
                      class="fa fa-check lh-1 me-1 position-relative top-1"></i>Publié</span>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block">
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('ViewMet')">
                    <router-link :to="{ name: 'ViewMet', params: { id: met.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('EditMet')">
                    <router-link :to="{ name: 'EditMet', params: { id: met.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Modifier
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('EditMet')">
                    <router-link :to="{ name: 'DupliquerMet', params: { id: met.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Dupliquer
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="met?.estPublier == 1">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="depublier(met.id)" v-if="checkPermission('DePublier')">
                      <i class="fa fa-close lh-1 me-8 position-relative top-1"></i>Dépublier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="met?.estPublier == 0">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="publier(met.id)" v-if="checkPermission('Publier')">
                      <i class="fa fa-check lh-1 me-2 position-relative top-1"></i>Publier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#AddDomaineModal"
                      @click="openAddDomaineModal(met)">
                      <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i>
                      Ajouter un domaine
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <router-link  class="dropdown-item d-flex align-items-center`"
                    :to="`/prixmets/ajout-prixmets?definiPrixId=${met.id}`"
                    >
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Définir un prix
                    </router-link>
                  </li>
                

                   <li class="dropdown-item d-flex align-items-center">
                    <router-link  class="dropdown-item d-flex align-items-center`"
                    :to="`/prixmets/ajout-prix?definiPrixId=${met.id}`"
                    >
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Définir un prix par catégorie
                    </router-link>
                  </li>

                  <li class="dropdown-item d-flex align-items-center">
                    <router-link
                      class="dropdown-item d-flex align-items-center"
                      :to="{ name: 'HistoriquePrixMetPage', params: { id: met.id } }"
                    >
                      <i class="flaticon-clock lh-1 me-8 position-relative top-1"></i>Historique des prix
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('DeleteMet')">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="suppression(met.id, mets, 'mets', `le met ${met.id}`)">
                      <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>Supprimer
                    </a>
                  </li>
                </ul>
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
  //<AddDomaineModal :selectedMet="selectedMet" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { Met } from "@/models/Met";
import ApiService from "@/services/ApiService";
import { suppression, getUrlApiForProductFiles, error, success } from "@/utils/utils";
import PaginationComponent from "@/components/Utilities/Pagination.vue";
import JwtService from "@/services/JwtService";
import ModalImage from "./ModalImage.vue";
//import AddDomaineModal from "./AddDomaineModal.vue";

export default defineComponent({
  name: "ListeMet",
  components: {
    ModalImage,
    PaginationComponent,
   // AddDomaineModal
  },
  setup() {
    onMounted(() => {
      getAllMets();
    });

    const mets = ref<Array<Met>>([]);
    const met = ref<Met>();

    const searchTerm = ref("");
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedMet = ref<Met | undefined>(undefined);
    const selectedMetId = ref<number>();

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllMets(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllMets(page.value, limit.value, searchTerm.value);
    }

    function getAllMets(page = 1, limi = 10, searchTerm = "") {
      return ApiService.get(`/all/mets?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          mets.value = data.data?.data;
          totalPages.value = data.data?.totalPages;
          limit.value = data.data?.limit;
          totalElements.value = data.data?.totalElements;
          console.log('Mets récupérés:', mets.value.map(p => ({ id: p.id, imagePrincipal: p.imagePrincipal })));
          return data.data?.data;
        })
        .catch(({ response }) => {
          error(response.message);
        });
    }

    function moddifier(Editmets: Met) {
      met.value = Editmets;
    }

    const deleteMet = (id: number) => {
      ApiService.delete(`/mets/${id}`)
        .then(({ data }) => {
          Swal.fire({
            text: data.message,
            toast: true,
            icon: "success",
            title: "General Title",
            animation: false,
            position: "top-right",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            heightAuto: false,
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réessayer à nouveau!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger",
            },
          });
        });

      for (let i = 0; i < mets.value.length; i++) {
        if (mets.value[i].id === id) {
          mets.value.splice(i, 1);
        }
      }
    };

    const publier = async (id: any) => {
      Swal.fire({
        text: "Vous êtes sur le point de publier un ou plusieurs mets. Etes-vous sûr ?",
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Publier",
        cancelButtonText: `Annuler`,
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger",
        },
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            let url = id ? `/mets/publier/${id}` : `/mets/publier/`;
            const response = await ApiService.put(url, {});
            if (response.data.code == 200) {
              success(response.data.message);
              rechercher();
            }
          } else {
            error("Vous avez annulé la publication");
          }
        } catch (response) {
          error(response.message);
        }
      });
    };

    const depublier = async (id: any) => {
      Swal.fire({
        text: "Vous êtes sur le point de dépublier un ou plusieurs mets. Etes-vous sûr ?",
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Dépublier",
        cancelButtonText: `Annuler`,
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger",
        },
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            let url = id ? `/mets/depublier/${id}` : `/mets/depublier`;
            const response = await ApiService.put(url, {});
            if (response.data.code == 200) {
              success(response.data.message);
              rechercher();
            }
          } else {
            error("Vous avez annulé la soumission");
          }
        } catch (response) {
          error(response.message);
        }
      });
    };

    const openAddDomaineModal = (met: Met) => {
      selectedMet.value = { ...met };
      selectedMetId.value = met.id;
      console.log('product selected ', selectedMet.value);
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());
    const checkPermission = (name) => privileges.value.includes(name);

    return {
      publier,
      depublier,
      mets,
      checkPermission,
      getAllMets,
      deleteMet,
      moddifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      openAddDomaineModal,
      rechercher,
      searchTerm,
      selectedMetId,
      getUrlApiForProductFiles,
      selectedMet
    };
  },
});
</script>

<style scoped>
.light-product-box {
  min-width: 100px;
}

.modal-body img {
  max-height: 70vh;
  object-fit: contain;
}
</style>