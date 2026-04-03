<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
              <!-- <router-link
        class="btn btn-primary"
        to="/prixproduits/ajout-prixproduits"

      >
        <i class="fa fa-plus-circle"></i>
        Ajouter un prix produit conditionnement
      </router-link> -->

      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un prix produit conditionnement"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
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
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                ID
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date de définition
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Statut
              </th>
              
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Catégorie Client
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Produit Conditionnement
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date de création
              </th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prix, index) in prixProduitCondTypeClients" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ prix.id }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_Date(prix.dateDefinition) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ prix.statut ? 'Actif' : 'Inactif' }}
              </td>
              <!-- <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ prix.dateFinDefinition ? format_Date(prix.dateFinDefinition) : '-' }}
              </td> -->
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ prix.categorieClient?.libelle || '-' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ prix.produitConditionnement?.nomProCond || 'Produit ' + prix.produitConditionnement?.id || '-' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_Date(prix.createdAt) }}
              </td>
              <!-- <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Actions
                </button>
                <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center">
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      data-bs-toggle="modal"
                      data-bs-target="#AddPrixProduitCondTypeClientModal"
                      @click="moddifier(prix)"
                    >
                      <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                      Modifier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      @click="suppression(prix.id, prixProduitCondTypeClients, 'prixProduitCondTypeClients', `le prix produit conditionnement ${prix.id}`)"
                    >
                      <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>
                      Supprimer
                    </a>
                  </li>
                </ul>
              </td> -->
            </tr>
          </tbody>
        </table>
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
  </div>
  <!-- <AddPrixProduitCondTypeClient :item="selectedItem" @close="recharger" /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { PrixProduitCondTypeClient } from '@/models/PrixProduitCondTypeClient';
import ApiService from '@/services/ApiService';
import { suppression, error, format_Date } from '@/utils/utils';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from '@/services/JwtService';
import AddPrixProduitCondTypeClient from './AddPrixProduitCondTypeClient.vue';

export default defineComponent({
  name: 'ListePrixProduitCondTypeClient',
  components: {
    PaginationComponent,
    AddPrixProduitCondTypeClient,
  },
  setup() {
    onMounted(() => {
      getAllPrixProduitCondTypeClients();
    });

    const prixProduitCondTypeClients = ref<Array<PrixProduitCondTypeClient>>([]);
    const prixProduitCondTypeClient = ref<PrixProduitCondTypeClient>();
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedItem = ref(0);

    const handlePaginate = ({ page_, limit_ }: { page_: number; limit_: number }) => {
      try {
        page.value = page_;
        getAllPrixProduitCondTypeClients(page_, limit_);
      } catch (err) {
        error('Erreur lors de la pagination');
      }
    };

    function rechercher() {
      getAllPrixProduitCondTypeClients(page.value, limit.value, searchTerm.value);
    }

    const recharger = () => {
      getAllPrixProduitCondTypeClients();
    };

    function getAllPrixProduitCondTypeClients(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/prixProduitCondTypeClients?page=${page}&limit=${limi}&mot=${searchTerm}`)
        .then(({ data }) => {
          prixProduitCondTypeClients.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    function moddifier(editPrixProduitCondTypeClient: PrixProduitCondTypeClient) {
      prixProduitCondTypeClient.value = editPrixProduitCondTypeClient;
      selectedItem.value = editPrixProduitCondTypeClient.id;
    }

    const deletePrixProduitCondTypeClient = (id: number) => {
      ApiService.delete(`/prixProduitCondTypeClients/${id}`)
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
            heightAuto: false,
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response.data.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Réessayer à nouveau!',
            heightAuto: false,
            customClass: {
              confirmButton: 'btn fw-semobold btn-light-danger',
            },
          });
        });

      for (let i = 0; i < prixProduitCondTypeClients.value.length; i++) {
        if (prixProduitCondTypeClients.value[i].id === id) {
          prixProduitCondTypeClients.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name: string) => {
      return privileges.value.includes(name);
    };

    return {
      prixProduitCondTypeClients,
      checkPermission,
      getAllPrixProduitCondTypeClients,
      deletePrixProduitCondTypeClient,
      moddifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      selectedItem,
      recharger,
      format_Date,
    };
  },
});
</script>