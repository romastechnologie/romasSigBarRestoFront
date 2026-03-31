<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a
          class="btn btn-success me-2 mb-2 mb-lg-0"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddCaisseModal"
          @click="resetSelectedItem"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une Caisse
        </a>

        <a
          class="btn btn-primary mb-2 mb-lg-0"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AffectationCaisseModal"
          @click="resetAffectationForm"
        >
          <i class="flaticon-shield"></i>
          Affecter une Caisse
        </a>
      </div>
      <div class="d-flex align-items-center">
       <form class="search-bg svg-color pt-3" @submit.prevent="searchCaisses">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="searchCaisses"
            class="form-control shadow-none text-black"
            placeholder="Rechercher une caisse"
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
        <table v-if="caisses.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th>Code</th>
              <th>Nom</th>
              <th>Utilisateurs affectés</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(caisse, index) in caisses" :key="index">
              <td>{{ caisse.code || 'N/A' }}</td>
              <td>{{ caisse.nom || 'N/A' }}</td>
              <td>{{ getUsersForCaisse(caisse.id) || 'Aucun utilisateur affecté' }}</td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Actions
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AddCaisseModal"
                        @click="modification(caisse)"
                      >
                        <i class="flaticon-pen me-2"></i>Modifier
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center text-danger" 
                        href="javascript:void(0);" 
                        @click="suppression(caisse.id, caisses, 'caisse', `la caisse ${caisse.nom}`)">
                        <i class="fa fa-trash-o me-2"></i>Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center text-muted">
          Aucune caisse trouvée
        </div>
      </div>
      <div class="pagination-area d-md-flex mt-15 justify-content-between align-items-center">
        <PaginationComponent 
          :page="currentPage" 
          :totalPages="totalPages" 
          :totalElements="totalElements" 
          :limit="limit"
          @paginate="handlePaginate" 
        />
      </div>
    </div>
  </div>
  
  <AddCaisseModal :item="selectedItem" @close="recharger" @openmodal="handleOpenModal" />
  <AffectationCaisseModal :selectedUser="selectedUser" @affectee="recharger" @openmodal="handleOpenModal" />

</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';
import AddCaisseModal from './AddCaisseModal.vue';
import AffectationCaisseModal from '../Affectation/AffectationCaisseModal.vue';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import { User } from '@/models/users';
import { Caisse } from '@/models/Caisse';
import { error, suppression } from '@/utils/utils';
import { Affectationn } from '@/models/Affectationn';


export default defineComponent({
  name: 'ListeCaisse',
  components: {
    AddCaisseModal,
    AffectationCaisseModal,
    PaginationComponent,
  },
  setup() {
    const caisses = ref<Array<Caisse>>([]);
    const users = ref<Array<User>>([]);
    const affectations = ref<Array<Affectationn>>([]);
    const selectedItem = ref<string>('');
    const selectedUser = ref<User | null>(null);
    const searchTerm = ref<string>('');
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const totalElements = ref<number>(0);
    const limit = ref<number>(10);

    const modification = (item: Caisse) => {
      selectedItem.value = item.id.toString();
    };

    const resetSelectedItem = () => {
      selectedItem.value = '';
    };

    const resetAffectationForm = () => {
      selectedUser.value = null;
    };

    const recharger = () => {
      console.log('Rechargement des caisses et affectations, page:', currentPage.value, 'searchTerm:', searchTerm.value);
      getAllCaisse();
      getAllAffectations();
    };

    const handleOpenModal = (modalRef: HTMLElement | null) => {
      if (modalRef) {
        const modal = new (window as any).bootstrap.Modal(modalRef);
        modal.show();
      }
    };

    function getAllCaisse(page = 1, limi = 10, searchTerm = '') {
      const timestamp = new Date().getTime();
      ApiService.get(`/all/caisses?page=${page}&limit=${limi}&mot=${searchTerm}&t=${timestamp}`)
        .then(({ data }) => {
          caisses.value = data.data.data || [];
          totalPages.value = data.data.totalPages || 1;
          totalElements.value = data.data.totalElements || caisses.value.length;
          limit.value = data.data.limit || limi;
          currentPage.value = page;
        })
        .catch(({ response }) => {
          console.error('Erreur API caisses:', response?.data, response?.status);
          error(response?.data?.message);
        });
    }
    
    function getAllAffectations(page = 1, limi = 1000, searchTerm = '') {
      const timestamp = new Date().getTime();
      return ApiService.get(`/all/affectations?page=${page}&limit=${limi}&mot=${searchTerm}&t=${timestamp}`)
        .then(({ data }) => {
          console.log('Réponse API affectations:', data);
          affectations.value = data.data.data || [];
          return data.data;
        })
        .catch(({ response }) => {
          console.error('Erreur API affectations:', response?.data, response?.status);
          error(response?.data?.message || 'Erreur lors de la récupération des affectations');
        });
    }

    

    function getAllUsers() {
      ApiService.get('/users')
        .then(({ data }) => {
          console.log('Réponse API utilisateurs:', JSON.stringify(data.data, null, 2));
          users.value = data.data || [];
        })
        .catch(({ response }) => {
          console.error('Erreur API utilisateurs:', response?.data, response?.status);
          error(response?.data?.message || 'Erreur lors de la récupération des utilisateurs');
        });
    }

    const getUsersForCaisse = (caisseId: number) => {
      const relatedAffectations = affectations.value.filter(
        (affectation) => affectation.caisse && +affectation.caisse.id === caisseId
      );
      if (relatedAffectations.length === 0) {
        return null;
      }
      return relatedAffectations
        .map((affectation) =>
          affectation.user ? `${affectation.user.nom} ${affectation.user.prenom}` : 'Utilisateur non trouvé'
        )
        .join(', ');
    };
    
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('fr-FR');
    };

    const searchCaisses = () => {
      getAllCaisse(1, limit.value, searchTerm.value);
      getAllAffectations(1, 1000, searchTerm.value); 
    };

    const handlePaginate = ({ page_, limit_ }) => {
      currentPage.value = page_;
      limit.value = limit_;
      getAllCaisse(page_, limit_, searchTerm.value);
      getAllAffectations(1, 1000, searchTerm.value);
    };

    onMounted(() => {
      getAllCaisse();
      getAllUsers();
      getAllAffectations();
    });

    return {
      caisses,
      users,
      affectations,
      selectedItem,
      selectedUser,
      searchTerm,
      getAllCaisse,
      getAllUsers,
      getAllAffectations,
      formatDate,
      suppression,
      modification,
      recharger,
      resetSelectedItem,
      resetAffectationForm,
      searchCaisses,
      handlePaginate,
      handleOpenModal,
      getUsersForCaisse,
      currentPage,
      totalPages,
      totalElements,
      limit,
    };
  },
});
</script>