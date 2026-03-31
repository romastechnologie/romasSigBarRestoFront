<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
         class="btn btn-primary"
          to="/champsLibreFamille/ajouter-champsLibreFamille"
        >
        <i class="fa fa-plus-circle"></i>
          Ajouter un champs affecté
        </router-link>
      
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un champ affecté"
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
        <table  class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>

              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-beginning pe-0"
              >
              Famille
              </th>

              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-beginning pe-0"
              >
              Champs descriptifs
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for ="(champsLibreFamille, index) in champsLibreFamilles" :key="index">
             
              <td class="shadow-none lh-1 fw-medium ">{{ champsLibreFamille?.libelleFamille }} </td>
              <td class="shadow-none lh-1 fw-medium" style="max-width: 500px; word-wrap: break-word; white-space: normal;">
                  <span class="badge badge-primary m-1" v-for="(champsLibre,index) in champsLibreFamille?.familleproduitchampslibres" :key="index">
                    {{ champsLibre.champslibre.nomChamp }} : {{ champsLibre.champslibre.libelleChamp }} 
                  </span>
                </td>
              <!--<td class="shadow-none lh-1 fw-medium ">{{ champsLibreFamille.champslibre?.nomChamp }}</td>-->
 
                <td class="shadow-none lh-1 fw-medium text-body-tertiary  pe-0">
                  <div class="dropdown">
                    <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>

                      <ul class="dropdown-menu">
                        <!--<li class="dropdown-item d-flex align-items-center">
                          <router-link
                            
                            :to="{ name: 'EditChampsLibreFamille',params: { id: champsLibreFamille.id } }"
                          >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Modifier
                          </router-link>
                        </li>-->
                        <li  class="dropdown-item d-flex align-items-center">
                          <a
                           
                            href="javascript:void(0);"
                            @click="suppression(champsLibreFamille.id, champsLibreFamilles, 'familleProduitChampsLibres', 'un champsLibre et Famille')"
                          >
                            <i
                              class="fa fa-trash-o lh-1 me-8 position-relative top-1"
                            ></i>
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
import { defineComponent, onMounted, ref} from "vue";
import ApiService from "@/services/ApiService";
import { FamilleProduitChampsLibres } from "@/models/FamilleProduitChampsLibres"; 
import {  suppression, error, } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeChampsLibreFamille",
  components: {
    PaginationComponent
  },
  setup(){
    onMounted(() => {
      getAllFamilleProduitChampsLibres();
    });

    const champsLibreFamilles = ref<Array<FamilleProduitChampsLibres>>([]);
    const champsLibreFamille = ref<FamilleProduitChampsLibres>();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllFamilleProduitChampsLibres(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllFamilleProduitChampsLibres(page.value, limit.value, searchTerm.value );
    }


    // END PAGINATE

    function getAllFamilleProduitChampsLibres(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/familleProduitChampsLibres?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          console.log('données envoyées',data);
          champsLibreFamilles.value = data.data.data;
          totalPages.value = data.data.data.totalPages;
          limit.value = data.data.data.limit;
          totalElements.value = data.data.data.totalElements;
          console.log('données reçues',champsLibreFamilles.value);
          return data.data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

const checkPermission = (name) => {
  return privileges.value.includes(name);
}

    return {
      checkPermission,
      suppression,
      champsLibreFamilles,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher
    };
  },
});
</script>