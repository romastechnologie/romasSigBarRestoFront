<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
  <div class="card-header">
    <h3 class="text-black fw-semibold">Liste des transactions par client</h3>
  </div>

  <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25">
    <div class="row g-3 align-items-end">
      <!-- Type Opération -->
      <div class="col-md-3">
        <div class="form-group">
          <label class="d-block text-black fw-semibold mb-10">Type Opération</label>
          <Multiselect 
            :searchable="true" 
            :options="lestypes"  
            v-model="_type"
            placeholder="Choisir" 
          />
        </div>
      </div>

      <!-- Créance -->
      <div class="col-md-3">
        <div class="form-group">
          <label class="d-block text-black fw-semibold mb-10">Créance</label>
          <Multiselect
            :options="creanceOptions" 
            :searchable="true"
            v-model="_creance"
            placeholder="Sélectionner la créance"
          />
        </div>
      </div>
  </div>
</div>

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                DATE
              </th>
              <th  scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"  >
                Reference
              </th>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                LIBELLE DE L'OPERATION
              </td>
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                DEBIT
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                CREDIT
              </th>
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                SOLDE
              </th>
              <th scope="col"  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0" >
                SOLDE AVEC Plafond
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_Date(transaction?.dateTransaction) }} 
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction?.reference }} 
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ transaction?.motif }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span v-if="transaction?.typeOperation == 'DEBIT'">
                  {{ separateur(transaction?.montant) }}</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span v-if="transaction?.typeOperation == 'CREDIT'">
                  {{ separateur(transaction?.montant) }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ separateur(transaction?.solde )}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ separateur(transaction?.solde )}}
              </td>
               <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ separateur(transaction?.solde )}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ separateur(transaction?.soldeSansPlafond )}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center" >
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
import { useRouter, useRoute } from 'vue-router';


export default defineComponent({
  name: "ClientsTransaction",
  components: {
    PaginationComponent,
    Multiselect,
  },
  setup(){
    
    onMounted(async () => {
      if(route.params.id) {
        await getAllTransactions(parseInt(route.params.id as string));
      };
    getAllCreances();
    });

    const transactions = ref<Array<Transaction>>([]);   
    const transaction = ref<Transaction>();
    const router = useRouter();
    const route = useRoute();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    
    const _type = ref('');

    const lestypes = ref([
      { value: "CREDIT", label: "CREDIT" },
      { value: "DEBIT", label: "DEBIT" }
    ]);

    const creanceOptions = ref([]);
    const creance = ref([]);
    const _creance = ref('');
    const creances = ref();

    

    let point_vente = ref<string>("");
    let point_ventes = ref([]);


    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllTransactions(parseInt(route.params.id as string),page_, limit_);
      } catch (error) {
        //
      }
    };

 watch(point_vente, () => {
      rechercher();
    });
   
     watch(_type, () => {
      rechercher();
    });

    watch(_creance, () => {
       rechercher();
     });
    

     function rechercher(){
      getAllTransactions(parseInt(route.params.id as string),page.value, limit.value, searchTerm.value, _type.value, _creance.value, );
    }

    // END PAGINATE

    function getAllTransactions(id?: number, page_ = 1, limit_ = 10, searchTerm_ = '',type="",_creance = '' ) {
      return ApiService.get(`/all/transactions/clients/${id}?&type=${type}&creance=${_creance}`)
        .then(({ data }) => {
          console.log(data.data,"data.data data.data");
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

   const getAllCreances = async () => {
      try {
        const response = await ApiService.get('/all/creances/client/'+route.params.id);
        const creancesData = response.data.data;
        creanceOptions.value = creancesData.map((cre: any) => ({
          value: cre.id,
          label: `${cre.refCrean} - ${
            cre.client.nomClient && cre.client.prenomClient
              ? `${cre.client.nomClient} ${cre.client.prenomClient}`
              : cre.client.raisonSociale || 'Client inconnu'
          } `,
          creance: cre,
        }));
        
      } catch (err) {
        error(err.message);
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
     _type,
     creanceOptions,
     lestypes,
      _creance,creances,
    creance,
    point_vente
  };
  },
});
</script>