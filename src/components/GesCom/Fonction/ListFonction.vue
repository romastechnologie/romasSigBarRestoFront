<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center" v-if="checkPermission('AddModeReglement')">
        <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddFonction"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une fonction
        </a>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un Mode de Règlement"
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
            <th
              scope="col"
              class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              Libellé
            </th>
            <th
              scope="col"
              class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              Description
            </th>
            <th
              scope="col"
              class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
            >
              ACTIONS
            </th>
          </thead>
          <tbody>
            <tr v-for="(fonction, index) in fonctions" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ fonction.libelle }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ fonction.description || '-' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu">
                    <li v-if="checkPermission('EditFonction')">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AddFonction"
                        @click="modifier(fonction)"
                      >
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </a>
                    </li>
                    <li v-if="checkPermission('DeleteFonction')">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(fonction.id, fonctions, 'fonction', 'la fonction')"
                      >
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>
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
    <AddFonctionPage :item="selectedItem" @close="recharger" />
  </div>
  </template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import AddFonctionPage from "@/pages/GesCom/Fonction/AddFonctionPage.vue";
import { Fonction } from "@/models/Fonction";


export default defineComponent({
  name: "ListFonctionPage",
  components: {
    PaginationComponent,
    AddFonctionPage
  },
  setup() {
    onMounted(() => {
      getAllFonction();
    });

    const fonctions = ref<Array<Fonction>>([]);
    const fonction = ref<Fonction>();

    
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedItem = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllFonction(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllFonction(page.value, limit.value, searchTerm.value);
    }


    const recharger = () => {
      getAllFonction();
    };

    function getAllFonction(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/fonctions?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
            console.log("datttttttaaa",data);
          fonctions.value = data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }



                

    function modifier(editFonction: Fonction) {
      fonction.value = editFonction;
      selectedItem.value = editFonction.id;
    }

    const deleteFonction = (id: number) => {
      ApiService.delete(`/fonction/${id}`)
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

      for (let i = 0; i < fonctions.value.length; i++) {
        if (fonctions.value[i].id === id) {
          fonctions.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name: string) => {
      return privileges.value.includes(name);
    };

    return {
      fonctions,
      checkPermission,
      getAllFonction,
      deleteFonction,
      modifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      selectedItem,
      recharger
    };
  },
});
</script> 