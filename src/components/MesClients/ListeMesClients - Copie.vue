<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Mes clients affectés</h3>
    </div>

    <!-- Recherche -->
    <div class="card-head bg-white d-flex justify-content-end p-15 p-sm-20 p-md-25">
      <form class="search-bg svg-color" @submit.prevent="rechercher">
        <input type="text" v-model="searchTerm" class="form-control shadow-none text-black"
          placeholder="Rechercher un client" />
      </form>
    </div>

    <!-- Tableau -->
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table align-middle text-nowrap">
          <thead>
            <tr>
              <th>Numéro client</th>
              <th>Client</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr v-if="clientAffecters.length === 0">
              <td colspan="4" class="text-center text-muted">
                Aucun client affecté
              </td>
            </tr>

            <tr v-for="affecter in clientAffecters" :key="affecter.id">
              <td class="fw-medium">
                {{ affecter.client?.numeroClient }}
              </td>

              <td class="fw-medium">
                {{
                  affecter.client?.nomClient && affecter.client?.prenomClient
                    ? `${affecter.client.nomClient} ${affecter.client.prenomClient}`
                    : affecter.client?.raisonSociale
                }}
              </td>


              <td>
                <button class="btn btn-sm btn-danger" @click="supprimer(affecter.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <PaginationComponent class="mt-20" :page="page" :totalPages="totalPages" :totalElements="totalElements"
        :limit="limit" @paginate="handlePaginate" />
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ApiService from '@/services/ApiService';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import { success, error } from '@/utils/utils';

export default defineComponent({
  name: 'MesClientsAffectes',
  components: { PaginationComponent },

  setup() {
    const clientAffecters = ref<any[]>([]);

    // Pagination & recherche
    const page = ref(1);
    const limit = ref(10);
    const totalPages = ref(0);
    const totalElements = ref(0);
    const searchTerm = ref('');

    onMounted(() => {
      chargerClients();
    });

    //Chargement des clients affectés (USER CONNECTÉ)
    const chargerClients = async (
      page_ = page.value,
      limit_ = limit.value,
      mot = searchTerm.value
    ) => {
      try {
        const { data } = await ApiService.get(
          `/mesclients?page=${page_}&limit=${limit_}&searchTerm=${mot}`
        );

        clientAffecters.value = data.data.data;
        totalPages.value = data.data.totalPages;
        totalElements.value = data.data.totalElements;
      } catch (e) {
        error("Erreur lors du chargement des clients");
      }
    };

    //  Pagination
    const handlePaginate = ({ page_, limit_ }: any) => {
      page.value = page_;
      limit.value = limit_;
      chargerClients(page_, limit_);
    };


    
    // Recherche
    const rechercher = () => {
      page.value = 1;
      chargerClients();
    };

    // Suppression
    const supprimer = async (id: number) => {
      try {
        const { data } = await ApiService.delete(`/clientAffecter/${id}`);
        if (data.code === 200) {
          success(data.message);
          chargerClients();
        }
      } catch {
        error("Impossible de supprimer l'affectation");
      }
    };

    // Format date
    const formatDate = (date: string) =>
      new Date(date).toLocaleDateString();

    return {
      clientAffecters,
      page,
      limit,
      totalPages,
      totalElements,
      searchTerm,
      rechercher,
      handlePaginate,
      supprimer,
      formatDate,
    };
  },
});
</script>
