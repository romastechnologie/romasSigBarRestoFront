<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddDomaineActiviteModal"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un domaine
        </a>
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
            placeholder="Rechercher un domaineActivite"
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
              Code
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
              Libelle
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(domaineActivite, index) in domaineActivites" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ domaineActivite.code }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ domaineActivite.libelle }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              >
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                    <li class="dropdown-item d-flex align-items-center">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AddDomaineActiviteModal"
                        @click="moddifier(domaineActivite)"
                      >
                        <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Modifier
                      </a>
                    </li>
                    <li class="dropdown-item d-flex align-items-center">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);" @click="suppression(domaineActivite.id,domaineActivites,'domaines',`le domaine ${domaineActivite.libelle}`)"
                      >
                        <i
                          class="fa fa-trash-o lh-1 me-8 position-relative top-1" 
                        ></i>
                        Supprimer
                      </a>
                    </li>
                  </ul>
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
  <AddDomaineActiviteModal :item="selectedItem"   @close="recharger"/>
</template>
<script lang="ts">

import { defineComponent, onMounted, ref, watch, computed } from "vue";
import AddDomaineActiviteModal from "./AddDomaineActiviteModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, suppression, error } from "@/utils/utils";
import {DomaineActivite} from '@/models/DomaineActivite';
import axios from 'axios';
import  Swal  from "sweetalert2";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
    name: "ListeDomaineActivite",
    components: {
      AddDomaineActiviteModal,
      PaginationComponent
  },
  setup: () => {
    const modules = {
  
    };
    
    const domaineActivites = ref<Array<DomaineActivite>>([]);
    const domaineActivite = ref<DomaineActivite>();
    const addDomaineActiviteModalRef = ref<null | HTMLElement>(null);
    const selectedItem = ref(0);

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllDomaineActivite(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher(){
      getAllDomaineActivite(page.value, limit.value, searchTerm.value );
    }

    // END PAGINATE

    function getAllDomaineActivite(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`all/domaines?page=${page}&limit=${limi}&mot=${searchTerm}&`)
      .then(({ data }) => {
        domaineActivites.value = data.data.data;
        totalPages.value = data.data.totalPages;
        limit.value = data.data.limit;
        totalElements.value = data.data.totalElements;
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    } 

    onMounted(() => {
      getAllDomaineActivite();
    });

    function moddifier(EditDomaineActivite:DomaineActivite) {
      domaineActivite.value = EditDomaineActivite;
      selectedItem.value = EditDomaineActivite.id;
    }
    const recharger = () => {
      getAllDomaineActivite();
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }


    return { modules,
      checkPermission,
            selectedItem,
            domaineActivites,
            recharger,
            suppression, 
            moddifier, 
            page, 
            totalPages,
            limit,
            totalElements,
            getAllDomaineActivite,
            handlePaginate,
            searchTerm,
            rechercher, addDomaineActiviteModalRef
    };
  },
});
</script>
@/models/DomaineActivite