<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Liste des produits</h3>
    </div>
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center" v-if="checkPermission('AddProduit')">
        <router-link class="me-2 btn btn-primary" to="/produits/ajouter-produit">
          <i class="fa fa-plus-circle"></i> Ajouter un produit
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
            placeholder="Rechercher un produit" />
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
            <tr v-for="produit in produits" :key="produit.id">
              <td>
                <ModalImage v-if="produit" :libelle="produit.nomProd" :keyValue="produit.id"
                  :fileUrl="produit.imagePrincipal" />
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ produit.codeProduit }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ produit.refProd }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ produit.nomProd }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ produit.famille?.libelleFamille }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <div>
                  <span class="text-danger" v-if="produit.estPublier == 0"><i
                      class="fa fa-close lh-1 me-1 position-relative top-1"></i>Non publié</span>
                  <span class="text-success" v-if="produit.estPublier == 1"><i
                      class="fa fa-check lh-1 me-1 position-relative top-1"></i>Publié</span>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block">
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('ViewProduit')">
                    <router-link :to="{ name: 'ViewProduit', params: { id: produit.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('EditProduit')">
                    <router-link :to="{ name: 'EditProduit', params: { id: produit.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Modifier
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('EditProduit')">
                    <router-link :to="{ name: 'DupliquerProduit', params: { id: produit.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Dupliquer
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="produit?.estPublier == 1">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="depublier(produit.id)" v-if="checkPermission('DePublier')">
                      <i class="fa fa-close lh-1 me-8 position-relative top-1"></i>Dépublier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="produit?.estPublier == 0">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="publier(produit.id)" v-if="checkPermission('Publier')">
                      <i class="fa fa-check lh-1 me-2 position-relative top-1"></i>Publier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#AddDomaineModal"
                      @click="openAddDomaineModal(produit)">
                      <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i>
                      Ajouter un domaine
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <router-link  class="dropdown-item d-flex align-items-center`"
                    :to="`/prixproduits/ajout-prixproduits?definiPrixId=${produit.id}`"
                    >
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Définir un prix
                    </router-link>
                  </li>
                

                   <li class="dropdown-item d-flex align-items-center">
                    <router-link  class="dropdown-item d-flex align-items-center`"
                    :to="`/prixproduits/ajout-prix?definiPrixId=${produit.id}`"
                    >
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Définir un prix par catégorie
                    </router-link>
                  </li>

                  <li class="dropdown-item d-flex align-items-center">
                    <router-link
                      class="dropdown-item d-flex align-items-center"
                      :to="{ name: 'HistoriquePrixProduitPage', params: { id: produit.id } }"
                    >
                      <i class="flaticon-clock lh-1 me-8 position-relative top-1"></i>Historique des prix
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('DeleteProduit')">
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="suppression(produit.id, produits, 'produits', `le produit ${produit.id}`)">
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
  <AddDomaineModal :selectedProduit="selectedProduit" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { Produit } from "@/models/Produit";
import ApiService from "@/services/ApiService";
import { suppression, getUrlApiForProductFiles, error, success } from "@/utils/utils";
import PaginationComponent from "@/components/Utilities/Pagination.vue";
import JwtService from "@/services/JwtService";
import ModalImage from "./ModalImage.vue";
import AddDomaineModal from "./AddDomaineModal.vue";

export default defineComponent({
  name: "ListeProduit",
  components: {
    ModalImage,
    PaginationComponent,
    AddDomaineModal
  },
  setup() {
    onMounted(() => {
      getAllProduits();
    });

    const produits = ref<Array<Produit>>([]);
    const produit = ref<Produit>();

    const searchTerm = ref("");
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedProduit = ref<Produit | undefined>(undefined);
    const selectedProduitId = ref<number>();

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllProduits(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllProduits(page.value, limit.value, searchTerm.value);
    }

    function getAllProduits(page = 1, limi = 10, searchTerm = "") {
      return ApiService.get(`/all/produits?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          produits.value = data.data?.data;
          totalPages.value = data.data?.totalPages;
          limit.value = data.data?.limit;
          totalElements.value = data.data?.totalElements;
          console.log('Produits récupérés:', produits.value.map(p => ({ id: p.id, imagePrincipal: p.imagePrincipal })));
          return data.data?.data;
        })
        .catch(({ response }) => {
          error(response.message);
        });
    }

    function moddifier(Editproduits: Produit) {
      produit.value = Editproduits;
    }

    const deleteProduit = (id: number) => {
      ApiService.delete(`/produits/${id}`)
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

      for (let i = 0; i < produits.value.length; i++) {
        if (produits.value[i].id === id) {
          produits.value.splice(i, 1);
        }
      }
    };

    const publier = async (id: any) => {
      Swal.fire({
        text: "Vous êtes sur le point de publier un ou plusieurs produits. Etes-vous sûr ?",
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
            let url = id ? `/produits/publier/${id}` : `/produits/publier/`;
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
        text: "Vous êtes sur le point de dépublier un ou plusieurs produits. Etes-vous sûr ?",
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
            let url = id ? `/produits/depublier/${id}` : `/produits/depublier`;
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

    const openAddDomaineModal = (produit: Produit) => {
      selectedProduit.value = { ...produit };
      selectedProduitId.value = produit.id;
      console.log('product selected ', selectedProduit.value);
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());
    const checkPermission = (name) => privileges.value.includes(name);

    return {
      publier,
      depublier,
      produits,
      checkPermission,
      getAllProduits,
      deleteProduit,
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
      selectedProduitId,
      getUrlApiForProductFiles,
      selectedProduit
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