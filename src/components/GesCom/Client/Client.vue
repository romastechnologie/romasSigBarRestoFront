<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <!--<router-link
          class="btn btn-primary"
          to="/transactions/ajouter-transaction"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une transaction
        </router-link>-->
        <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button> -->
      </div>
      <div class="col-md-4" v-if="point_ventes.length > 1">
    <div class="form-group mb-15 mb-sm-20 mb-md-25">
      <label class="d-block text-black fw-semibold mb-10">
       Filtrer par Point de vente
      </label>
      <div class="d-flex align-items-center" style="width: 200px;">
        <Multiselect 
          v-model="point_vente" 
          :options="point_ventes"  
          :searchable="true" 
          track-by="label" 
          label="label" 
          placeholder="Sélectionner un point de vente" 
        />
      </div>
    </div>
  </div>
      <div class="d-flex align-items-center">
       <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher une transaction"
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
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                Référence
              </th>
              <th  scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"  >
                Motif
              </th>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                Type Opération
              </td>
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                Montant
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                compte
              </th>
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                Statut
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                Date transaction
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction.reference }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction.motif }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction.typeOperation }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ separateur(transaction.montant )}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction?.compte?.numero }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction.statut }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_Date(transaction.dateTransaction) }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
              >
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                    
                    <!--<li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'EditTransaction', params: { id: transaction.id } }" 
                          class="dropdown-item d-flex align-items-center"><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>Valider</router-link>
                    </li>-->
                   
                   <!-- <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('DeleteTransaction')">
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(transaction.id,transactions,'transactions',`la transaction ${transaction.id}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                         Annuler
                      </a>
                    </li>-->
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch} from "vue";
import Swal from "sweetalert2";
import { Transaction } from "@/models/Transaction";
import ApiService from "@/services/ApiService";
import { suppression, error,format_Date,separateur } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import Multiselect from "@vueform/multiselect";


export default defineComponent({
  name: "ListeTransaction",
  components: {
    PaginationComponent,
    Multiselect,
  },
  setup(){
    
    onMounted(async () => {
      if (JwtService.getPointDeVente()) {
        point_vente.value = await JwtService.getPointDeVenteId();
      }
      const pointVentes = await JwtService.getPointDeVentes();
      point_ventes.value = pointVentes ? pointVentes.map((point: any) => ({
        value: point.id,
        label: point.nomPointVente
      })) : [];
      getAllTransactions(point_vente.value);
    });

    const transactions = ref<Array<Transaction>>([]);   
    const transaction = ref<Transaction>();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    let point_vente = ref<string>("");
    let point_ventes = ref([]);


    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllTransactions(page_, limit_);
      } catch (error) {
        //
      }
    };

 watch(point_vente, () => {
      rechercher();
    });
    
     function rechercher(){
      getAllTransactions(point_vente.value,page.value, limit.value, searchTerm.value );
    }

    // END PAGINATE

    function getAllTransactions(point_vent,page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/transactions?page=${page}&limit=${limi}&mot=${searchTerm}&pointvente=${point_vent}&`)
        .then(({ data }) => {
          transactions.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(Edittransactions:Transaction) {
      transaction.value = Edittransactions;
    }

    const deleteTransaction = (id: number) => {
      ApiService.delete(`/transactions/${id}`)
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

      for(let i = 0; i < transactions.value.length; i++) {
        if (transactions.value[i].id === id) {
          transactions.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return { transactions,
      checkPermission,
     getAllTransactions,
     deleteTransaction,
     moddifier ,
     suppression,
     format_Date,
     page, 
    totalPages,
    limit,
    separateur,
    totalElements,
    handlePaginate,
    rechercher,
    searchTerm,
    point_ventes,
    point_vente
  };
  },
});
</script>