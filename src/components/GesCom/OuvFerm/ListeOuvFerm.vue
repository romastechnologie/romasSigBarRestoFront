<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/ajouter-ouvfer"
        >
          <i class="fa fa-plus-circle"></i>
          Ouverture de caisse
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher caisse"
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
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Caisse</th>
              <th scope="col">Fond de roulement</th>
              <th scope="col">Solde</th>
              <th scope="col">Statut</th>
          
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ouvFer) in ouvFers" :key="ouvFer.id">
              <th>{{ ouvFer.caisse?.nom ?? 'N/A' }}</th>
              <th>{{ separateur(ouvFer.fondsRoulement) }}</th>
              <th>{{ separateur(ouvFer.solde) }}</th>
              <th>
                <span
                  :class="[
                    'badge fs-15',
                    ouvFer.status === 'Fermé' || ouvFer.status === 'FERMER' ? 'bg-danger' : 'bg-success'
                  ]"
                >
                  {{ ouvFer.status || 'Ouvert' }}
                </span>
              </th>
              
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">

                 <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>

                  <ul class="dropdown-menu">
                    
                     <li v-if="ouvFer.status === 'OUVERTE'">
                        <router-link 
                          :to="`/ajouter-fer/${ouvFer.id}`" 
                          class="dropdown-item d-flex align-items-center">
                          <i class="flaticon-lock lh-1 me-8 position-relative top-1"></i> Fermer la caisse
                        </router-link>
                      </li>
                      <li v-else>
                        <router-link 
                          to="/ajouter-ouvfer" 
                          class="dropdown-item d-flex align-items-center">
                          <i class="flaticon-lock lh-1 me-8 position-relative top-1"></i> Ouvrir la caisse
                        </router-link>
                      </li>
                     <li>
                        <router-link :to="{ name: 'ViewOuvFermPage', params: { id: ouvFer.id} }" class="dropdown-item d-flex align-items-center">
                            <i class="fa flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                        </router-link>
                    </li>
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);"  @click="suppression(ouvFer.id, ouvFers, 'ouvFers', `l'ouverture ${ouvFer.id}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                         Supprimer
                      </a>
                    </li>
                 
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="voirConfirmation()"
                      >
                       <i class="flaticon-refresh lh-1 me-2"></i>Voir les reglements 
                      </a>
                    </li>
                    <li v-if="ouvFer.ecart !== 0 && !ouvFer.isRegularized">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="handleRegularisation(ouvFer)"
                      >
                       <i class="flaticon-refresh lh-1 me-2"></i>Régulariser
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
        <p class="mb-0 text-paragraph">
          Affichage de <span class="fw-bold">{{ ouvFers.length }}</span> sur
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { suppression, error, success, separateur } from "@/utils/utils";
import JwtService from "@/services/JwtService";
import { OuvFerm } from "@/models/OuvFerm";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ListeOuvFer",
  setup() {
    const ouvFers = ref<OuvFerm[]>([]);
    const searchTerm = ref<string>("");
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const totalElements = ref<number>(0);
    const limit = ref<number>(10);
    const sortField = ref<string>("createdAt");
    const router = useRouter()

    onMounted(() => {
      getAllOuvfers();
    });

    function rechercher() {
      currentPage.value = 1;
      getAllOuvfers(currentPage.value, limit.value, searchTerm.value);
    }

    function getAllOuvfers(page = 1, limi = 10, search = "") {
  return ApiService.get(`/all/ouvFer?page=${page}&limit=${limi}&mot=${encodeURIComponent(search)}&sort=createdAt,desc`)
    .then(({ data }) => {
      ouvFers.value = data.data.data || [];
      totalPages.value = data.data.totalPages || 1;
      totalElements.value = data.data.totalElements || ouvFers.value.length;
      limit.value = data.data.limit || limi;
      currentPage.value = page;
    })
    .catch(({ response }) => {
      error(response?.data?.message || "Erreur lors de la récupération des ouvertures/fermetures");
    });
}

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        getAllOuvfers(page, limit.value, searchTerm.value);
      }
    };

    const deleteOuvFer = (id: number) => {
      ApiService.delete(`/ouvFer/${id}`)
        .then(({ data }) => {
          Swal.fire({
            text: data.message,
            toast: true,
            icon: "success",
            position: "top-right",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
          });
          ouvFers.value = ouvFers.value.filter((item) => item.id !== id);
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response?.data?.message || "Erreur lors de la suppression",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réessayer",
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger",
            },
          });
        });
    };

    const handleRegularisation = async (ouvFer: OuvFerm) => {
      const caisseId = ouvFer.caisse?.id;
      if (!caisseId) {
        error("Erreur : ID de la caisse non disponible");
        return;
      }

      const confirmation = await Swal.fire({
        icon: "question",
        title: "Confirmer la régularisation",
        text: `Voulez-vous régulariser l'écart de ${ouvFer.ecart} FCFA pour la caisse ${ouvFer.caisse?.nom}?`,
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Annuler",
      });

      if (!confirmation.isConfirmed) return;

      try {
      const response = await ApiService.get(`/ouvfers/monnaie-caisse-fermee?ouvFerId=${ouvFer.id}`);      
        const billetageList = response.data.data.map((item: any) => ({
          monnaie: item.monnaieId,
          libelle: item.libelle,
          qteBillet: item.quantite,
          montant: item.quantite * item.valeur,
          valueAct: item.valeur,
        }));

        const payload = {
          caisseId,
          soldePhysique: ouvFer.solde,
          billetageList,
          rapportFile: null,
        };

        await ApiService.post("/ouvfers/regulariser", payload
        );

        ouvFer.isRegularized = true;
        ouvFer.ecart = 0;
        success("Régularisation effectuée avec succès");
      } catch (err: any) {
        error(err.response?.data?.message || "Erreur lors de la régularisation");
      }
    };

    const voirConfirmation = async() => {
      router.push({name: 'ConfirmationPaiementPage'})
    }

    const privileges = ref<string[]>(JwtService.getPrivilege());

    const checkPermission = (name: string): boolean => {
      return privileges.value.includes(name);
    };

    return {
      ouvFers,
      checkPermission,
      getAllOuvfers,
      deleteOuvFer,
      suppression,
      totalPages,
      limit,
      totalElements,
      changePage,
      rechercher,
      searchTerm,
      separateur,
      handleRegularisation,
      currentPage,
      voirConfirmation
    };
  },
});
</script>