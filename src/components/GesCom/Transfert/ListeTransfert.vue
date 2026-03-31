<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/transferts/ajouter-transfertPointDeVente"
        >
          <i class="fa fa-plus-circle"></i>
          Faire un transfert
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
            placeholder="Rechercher un transfert"
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
                Montant
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Motif
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Magasin du point de vente source
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Magasin du point de vente cible
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transfert, index) in transferts" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transfert.montantTotal }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transfert.motif }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(transfert.date) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transfert.magasin1.nomMagasin }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transfert.magasin2.nomMagasin }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
              >
              <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link :to="{ name: 'ViewTransfert', params: { id: transfert.id } }" class="dropdown-item d-flex align-items-center">
                        <i class="fa fa-solid fa-eye lh-1 me-8 position-relative top-1"></i>Détails
                      </router-link>
                    </li>
                    <li>
                    <router-link class="dropdown-item d-flex align-items-center"
                      :to="{ name: 'AddApprovisionnement', query: { id: transfert.id } }">
                      <i class="flaticon-cart lh-1 me-8 position-relative top-1"></i>
                     Approvisionner
                    </router-link>
                  </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="imprimerTransfert(transfert.id)">
                        <i class="fa fa-solid fa-print lh-1 me-8 position-relative top-1"></i>Imprimer
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(transfert.id, transferts, 'transferts', `l\'transfert ${transfert.id}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>Supprimer
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
import Swal from "sweetalert2";
import { Transfert } from "@/models/Transfert";
import ApiService from "@/services/ApiService";
import {format_date,suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeTransfert",
  components: {
    PaginationComponent
  },
  setup(){
    
    onMounted(() => {
      getAllTransferts();
    });

    const transferts = ref<Array<Transfert>>([]);   
    const transfert = ref<Transfert>();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllTransferts(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllTransferts(page.value, limit.value, searchTerm.value );
    }

    // END PAGINATE

    function getAllTransferts(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/transferts?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          transferts.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(Edittransferts:Transfert) {
      transfert.value = Edittransferts;
    }

    const deleteTransfert = (id: number) => {
      ApiService.delete(`/transferts/${id}`)
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
          confirmButtonText: "Réssayer à nouveau!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      });

      // for(let i = 0; i < transferts.value.length; i++) {
      //   if (transferts.value[i].id === id) {
      //     transferts.value.splice(i, 1);
      //   }
      // }
    };

    const imprimerTransfert = async (transfertId: number) => {
      const loadingHtml = `
    <html>
      <head><title>Génération du bordereau de Transfert..</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f8f9fa;">
        <div style="max-width: 400px; margin: 0 auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="width: 50px; height: 50px; border: 4px solid #e3e3e3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
          <h3 style="color: #333;">Génération du bordereau de Transfert...</h3>
          <p style="color: #666;">Veuillez patienter</p>
        </div>
        <style>
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
        </style>
      </body>
    </html>
  `;

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(loadingHtml);
        newWindow.document.close();
      }

      try {
        const response = await ApiService.get(`/transfert/${transfertId}`, "", {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const urlBlob = window.URL.createObjectURL(blob);

        if (newWindow && !newWindow.closed) {
          newWindow.location.href = urlBlob;
        }

        setTimeout(() => window.URL.revokeObjectURL(urlBlob), 5000);

      } catch (err: any) {
        console.error("Erreur :", err);

        if (newWindow && !newWindow.closed) {
          newWindow.close();
        }

        error("Erreur lors de l'ouverture du bordereau de transfert");
      }
    };


    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return { transferts,
      checkPermission,
     getAllTransferts,
     deleteTransfert,
     moddifier ,
     suppression,
     format_date,
     page, 
    totalPages,
    limit,
    totalElements,
    handlePaginate,
    rechercher,
    searchTerm,
    imprimerTransfert
  };
  },
});
</script>