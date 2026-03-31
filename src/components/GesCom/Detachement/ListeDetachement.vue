<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/detachements/ajouter-detachement"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un détachement
        </router-link>
        <!-- <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddLivraisonModal"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une livraison
        </a> -->
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
            placeholder="Rechercher un détachement"
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
              motif
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Date de détachement
                
              </th>
              <!-- <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Livraison
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Livreur
                
              </th> -->
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detachement, index) in detachements" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ detachement?.motif }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_Date(detachement.dateDetachement)  }}
              </td>
              <!-- <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(livraison.createdAt)  }}
              </td> -->
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              >
              <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>

                  <ul class="dropdown-menu">
                    <!-- <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="editDetachement(detachement.id)"
                      >
                        <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Modifier
                      </a>
                    </li> -->
                     <li>
                        <router-link :to="{ name: 'ViewDetachement', params: { id: detachement.id } }" class="dropdown-item d-flex align-items-center">
                            <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                        </router-link>
                    </li>
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(detachement.id,detachements,'detachements',`le detachement ${detachement.motif}`)">
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
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
  <!-- <AddLivraisonModal @get-all-Livraisons="getAllLivraisons"
    :id="idLivraison"
    @openmodal="showModalEdite"
    @close="recharger" /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
// import AddLivraisonModal from "./AddLivraisonModal.vue";
import ApiService from "@/services/ApiService";
import { format_Date, showModal, suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import { Detachement } from "@/models/Detachement";

export default defineComponent({
  name: "ListeDetachement",
  components: {
    // AddLivraisonModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllDetachements();
    });

    const detachements = ref<Array<Detachement>>([]);
    const idDetachement = ref(0);
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
        getAllDetachements(page_, limit_);
      } catch (error) {
        //
      }
    };
    function rechercher(){
      getAllDetachements(page.value, limit.value, searchTerm.value );
    }
    // END PAGINATE
    

    const editDetachement = (id: number) => {
      selectedItem.value = id;
    };

    const recharger = () => {
      getAllDetachements();
    };
    function getAllDetachements(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`all/detachements?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          const donnees = data.data.data;
          console.log("donnees",donnees);
          detachements.value = donnees;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(EditDetachement:Detachement) {
      idDetachement.value = EditDetachement.id;
    }

    function showModalEdite(model){
      showModal(model);
      idDetachement.value=0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }

    return {suppression,
      checkPermission,
      detachements,
      format_Date,
      getAllDetachements,
      idDetachement,
      moddifier,
      showModalEdite,
      editDetachement,
      selectedItem ,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      recharger
     };
  },


});
</script>