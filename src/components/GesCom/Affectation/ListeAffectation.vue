<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <form class="search-box position-relative" @submit.prevent="searchAffectations">
        <input
          type="text"
          v-model="searchTerm"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Rechercher une affectation"
        />
        <button
          type="submit"
          class="bg-transparent text-primary transition p-0 border-0"
        >
          <i class="flaticon-search-interface-symbol"></i>
        </button>
      </form>
      <div class="d-sm-flex align-items-center">
        <a
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0 text-decoration-none"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AffectationCaisseModal"
          @click="resetAffectationForm"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Affecter une caisse
        </a>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="affectations.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                #
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Utilisateur
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Caisse
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date d'affectation
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="affectation in affectations" :key="affectation.id">
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ affectation.id }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ affectation.user ? `${affectation.user.nom} ${affectation.user.prenom}` : 'Utilisateur non trouvé' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ affectation.caisse ? `${affectation.caisse.nom}` : 'Caisse non trouvée' }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ formatDate(affectation.createdAt) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="dropdown">
                  <span
                    class="badge text-white bg-primary fs-15 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                    <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AffectationCaisseModal"
                        @click="modification(affectation)"
                      >
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(affectation.id, affectations, 'affectations', 'cette affectation')"
                      >
                        <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center text-muted">
          Aucune affectation trouvée
        </div>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Affichage de <span class="fw-bold">{{ affectations.length }}</span> sur
          <span class="fw-bold">{{ totalElements }}</span> résultats
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <AffectationCaisseModal :selectedUser="selectedUser" :selectedAffectation="selectedAffectation" @affectee="recharger" @openmodal="handleOpenModal" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { error, suppression } from '@/utils/utils';
import ApiService from '@/services/ApiService';
import AffectationCaisseModal from './AffectationCaisseModal.vue';
import { User } from '@/models/users';
import { Affectationn } from '@/models/Affectationn';

export default defineComponent({
  name: 'ListeAffectation',
  components: {
    AffectationCaisseModal,
  },
  setup() {
    const affectations = ref<Array<Affectationn>>([]);
    const selectedUser = ref<User | null>(null);
    const selectedAffectation = ref<Affectationn | null>(null);
    const searchTerm = ref<string>('');
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const totalElements = ref<number>(0);
    const limit = ref<number>(10);

    const resetAffectationForm = () => {
      selectedUser.value = null;
      selectedAffectation.value = null;
    };

    const modification = (affectation: Affectationn) => {
      console.log('Affectation sélectionnée pour modification :', affectation);
      selectedAffectation.value = { ...affectation }; // Crée une copie pour éviter les mutations directes
      selectedUser.value = affectation.user || null; // Préremplir l'utilisateur
    };

    const recharger = () => {
      console.log('Rechargement des affectations, page:', currentPage.value, 'searchTerm:', searchTerm.value); // Débogage
      getAllAffectations();
    };

    const handleOpenModal = (modalRef: HTMLElement | null) => {
      if (modalRef) {
        const modal = new (window as any).bootstrap.Modal(modalRef);
        modal.show();
      }
    };

    function getAllAffectations(page = 1, limi = 10, searchTerm = '') {
      const timestamp = new Date().getTime(); // Anti-cache
      return ApiService.get(`/all/affectations?page=${page}&limit=${limi}&mot=${searchTerm}&t=${timestamp}`)
        .then(({ data }) => {
          console.log('Ré targeted="_blank">ponse API affectations:', JSON.stringify(data.data, null, 2)); // Débogage
          console.log('Affectations assignées:', data.data.data.map((a: Affectationn) => ({
            id: a.id,
            user: a.user ? `${a.user.nom} ${a.user.prenom}` : 'Utilisateur non trouvé',
            caisse: a.caisse ? a.caisse.nom : 'Caisse non trouvée'
          }))); // Débogage
          affectations.value = data.data.data || [];
          totalPages.value = data.data.totalPages || 1;
          totalElements.value = data.data.totalElements || affectations.value.length;
          limit.value = data.data.limit || limi;
          currentPage.value = page;
          return data.data;
        })
        .catch(({ response }) => {
          console.error('Erreur API affectations:', response?.data, response?.status); // Débogage
          error(response?.data?.message || 'Erreur lors de la récupération des affectations');
        });
    }

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('fr-FR');
    };

    const searchAffectations = () => {
      getAllAffectations(1, limit.value, searchTerm.value);
    };

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        getAllAffectations(page, limit.value, searchTerm.value);
        
//  Passing selectedAffectation to AffectationCaisseModal
      }
    };

    onMounted(() => {
      getAllAffectations();
    });

    return {
      affectations,
      selectedUser,
      selectedAffectation,
      searchTerm,
      currentPage,
      totalPages,
      totalElements,
      limit,
      getAllAffectations,
      recharger,
      searchAffectations,
      changePage,
      resetAffectationForm,
      modification,
      handleOpenModal,
      formatDate,
      suppression,
    };
  },
});
</script>