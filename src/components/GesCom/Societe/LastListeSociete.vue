<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
            id="addCompanyButton"
            v-if="!buttonHidden" 
            class="btn btn-primary"
            to="/societes/ajouter-societe"
            @click="handleAddCompanyClick"
          >
            <i class="fa fa-plus-circle"></i>
            Ajouter une société
          </router-link>
          <!-- <button
            class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
            type="button"
          >
            Exporter
            <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
          </button> -->
        </div>
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher une société"
            />
            <button
              type="submit"
              class="bg-transparent text-primary transition p-0 border-0"
            >
              <i class="flaticon-search-interface-symbol"></i>
            </button>
          </form>
          <!-- <button
            class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
            type="button"
          >
            <i class="flaticon-dots"></i>
          </button> -->
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
                  Nom
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Sigle
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
                  Ifu
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Rccm
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Adresse
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Raison sociale
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(societe, index) in societes" :key="index">
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.denomination }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.sigle }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.statut }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.ifu }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.rccm }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.adresse }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.raisonSocial }}
                </td>
                <td
                  class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
                >
                <div class="dropdown">
                    <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions
                        <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                    </span>
                    <ul class="dropdown-menu">
                      <li >
                        <router-link :to="{ name: 'EditSocietePage', params: { id: societe.id } }" 
                            class="dropdown-item d-flex align-items-center"><i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>Modifier</router-link>
                      </li>
                      <li>
                          <router-link :to="{ name: 'ViewSocietePage', params: { id: societe.id } }" class="dropdown-item d-flex align-items-center">
                              <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                          </router-link>
                      </li>
                      <li >
                        <a
                          class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(societe.id,societes,'societes',`la société ${societe.id}`)">
                          <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                           Supprimer
                        </a>
                      </li>
                    </ul>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
        >
          <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import Swal from "sweetalert2";
  import { Societe } from "@/models/Societe";
  import ApiService from "@/services/ApiService";
  import { suppression, error } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeSociete",
    components: {
      PaginationComponent
    },
    setup() {
      const buttonHidden = ref(false); // État pour cacher le bouton
  
      onMounted(() => {
        getAllSocietes();
      });
  
      const societes = ref<Array<Societe>>([]);
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handleAddCompanyClick = () => {
        // Logique d'enregistrement de la société (simulée ici)
        console.log('Société enregistrée');
        buttonHidden.value = true; // Cacher le bouton après clic
      };
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllSocietes(page_, limit_);
        } catch (error) {
          //
        }
      };
  
      function rechercher() {
        getAllSocietes(page.value, limit.value, searchTerm.value);
      }
  
      function getAllSocietes(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`all/societes?page=${page}&limit=${limi}&mot=${searchTerm}`)
          .then(({ data }) => {
            societes.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      }
  
      return {
        societes,
        buttonHidden,
        getAllSocietes,
        handleAddCompanyClick,
        handlePaginate,
        rechercher,
        searchTerm,
        page,
        totalPages,
        limit,
        totalElements,
      };
    },
  });
  </script>
  