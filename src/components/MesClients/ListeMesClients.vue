<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Mes clients affectés</h3>
    </div>

    <!-- Barre actions -->
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div></div>

      <!-- Recherche -->
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un client"
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

    <!-- Tableau -->
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th>Numéro client</th>
              <th>Nom / Raison sociale</th>
              <th>IFU</th>
              <th>Téléphone</th>
              <th>Statut</th>
			  <th class="text-uppercase fw-medium fs-13 pt-0 text pe-0">
  ACTIONS
</th>

            </tr>
          </thead>

          <tbody>
            <tr v-if="clients.length === 0">
              <td colspan="5" class="text-center text-muted">
                Aucun client affecté
              </td>
            </tr>

            <tr v-for="client in clients" :key="client.id">
              <td class="fw-medium">
                {{ client.numeroClient }}
              </td>

              <td class="fw-medium">
                {{
                  client.nomClient && client.prenomClient
                    ? `${client.nomClient} ${client.prenomClient}`
                    : client.raisonSociale
                }}
              </td>

              <td>{{ client.ifu }}</td>
              <td>{{ client.telephone1 }}</td>
              <td>
                {{ client.statut == 1 ? 'Personne physique' : 'Personne morale' }}
              </td>
			  <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown">
    Actions
  </button>

  <ul class="dropdown-menu dropdown-block">
    <li v-if="checkPermission('EditClient')">
      <router-link
        :to="{ name: 'EditClient', params: { id: client.id } }"
        class="dropdown-item"
      >
        <i class="flaticon-pen me-8"></i>
        Modifier
      </router-link>
    </li>

    <li v-if="checkPermission('ViewClient')">
      <router-link
        :to="{ name: 'ViewClient', params: { id: client.id } }"
        class="dropdown-item"
      >
        <i class="flaticon-eye me-8"></i>
        Détails
      </router-link>
    </li>

    <li>
      <router-link
        :to="{ name: 'ClientsTransaction', params: { id: client.id } }"
        class="dropdown-item"
      >
        <i class="flaticon-list me-8"></i>
        Transactions
      </router-link>
    </li>
  </ul>
</td>
            </tr>
			

			
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <PaginationComponent
        class="mt-20"
        :page="page"
        :totalPages="totalPages"
        :totalElements="totalElements"
        :limit="limit"
        @paginate="handlePaginate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import PaginationComponent from "@/components/Utilities/Pagination.vue";
import { error } from "@/utils/utils";
import { Client } from "@/models/Client";
import JwtService from "@/services/JwtService";


export default defineComponent({
  name: "ListeClientAffectes",
  components: { PaginationComponent },

  setup() {
    const clients = ref<Client[]>([]);

    // Pagination & recherche
    const page = ref(1);
    const limit = ref(10);
    const totalPages = ref(0);
    const totalElements = ref(0);
    const searchTerm = ref("");

    onMounted(() => {
      chargerClients();
    });

    // Chargement des clients affectés (USER CONNECTÉ)
    const chargerClients = async (
      page_ = page.value,
      limit_ = limit.value,
      mot = searchTerm.value
    ) => {
      try {
        const { data } = await ApiService.get(
  `/mesclients?page=${page_}&limit=${limit_}&mot=${mot}`
);


        // IMPORTANT : on extrait uniquement le client
        clients.value = data.data.data.map((a: any) => a.client);

        totalPages.value = data.data.totalPages;
        totalElements.value = data.data.totalElements;
      } catch {
        error("Erreur lors du chargement des clients affectés");
      }
    };
/* const { data } = await ApiService.get(
  `/mesclients?page=${page_}&limit=${limit_}&mot=${mot}`
); */

    // Pagination
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
	
	 const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return {
      clients,
      page,
      limit,
      totalPages,
	  checkPermission,
      totalElements,
      searchTerm,
      rechercher,
      handlePaginate,
    };
  },
});
</script>
