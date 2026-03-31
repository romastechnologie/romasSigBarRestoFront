<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Liste des règlements</h3>
    </div>
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center" v-if="checkPermission('AddReglement')">
        <router-link class="btn btn-primary" to="/reglements/ajouter-reglement">
          <i class="fa fa-plus-circle"></i>
          Ajouter un règlement
        </router-link>

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
          <input type="text" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
            placeholder="Rechercher un règlement" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date Règlement
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Client
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Montant Payé
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Reste à Payer
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Statut Reglement
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Mode de règlement
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reglement, index) in reglements" :key="index">
              <td class="shadow-none lh-1 fw-medium ">{{ format_date(reglement.date) }} </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                 <span v-if="reglement?.creance?.client">
                  {{ reglement?.creance?.client?.nomClient && reglement?.creance?.client?.prenomClient ?
                    `${reglement?.creance?.client?.nomClient} ${reglement?.creance?.client?.prenomClient}`
                    : reglement?.creance?.client?.raisonSociale }}
                </span>

                <span v-else-if="reglement?.commandeClient?.client">
                  {{ reglement?.commandeClient?.client?.nomClient && reglement?.commandeClient?.client?.prenomClient ?
                    `${reglement?.commandeClient?.client?.nomClient} ${reglement?.commandeClient?.client?.prenomClient}`
                    : reglement?.commandeClient?.client?.raisonSociale }}
                </span>

                <span v-else>Non défini</span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ separateur(reglement.montantPaye) }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ separateur(reglement.reste_a_payer) }} </td>
              <td class="shadow-none lh-1 fw-medium ">
                
               <span class="badge" :class="{
                'bg-success':   reglement.statutPaiement === 'paye',
                'bg-warning':   reglement.statutPaiement === 'en_attente',
                'bg-secondary': reglement.statutPaiement === 'partiel'
              }">
                <!-- Affichage lisible pour l'utilisateur -->
                {{ 
                  reglement.statutPaiement === 'paye'       ? 'Payé' :
                  reglement.statutPaiement === 'en_attente' ? 'En attente' :
                  reglement.statutPaiement === 'partiel'    ? 'Partiel' :
                  'Non défini'
                }}
              </span>
              
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ reglement?.modeReglement.libelle }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import ApiService from "@/services/ApiService";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { Reglement } from "@/models/Reglement";
import { format_date, showModal, hideModal, suppression, error, success,separateur } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import Swal from "sweetalert2";
import { useRoute, useRouter } from 'vue-router';
import * as Yup from 'yup';
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "ListeReglement",
  components: {
    PaginationComponent,
    Form,
    Multiselect,
    Field,
    ErrorMessage
  },
  setup() {
    onMounted(async () => {
      if (JwtService.getPointDeVente()) {
        point_vente.value = await JwtService.getPointDeVenteId();
      }
      const pointVentes = await JwtService.getPointDeVentes();
      point_ventes.value = pointVentes ? pointVentes.map((point: any) => ({
        value: point.id,
        label: point.nomPointVente
      })) : [];
      getAllReglements(point_vente.value);
    });

    const reglementsSchema = Yup.object().shape({
      observation: Yup.string().required("L'observation est obligatoire"),
    });
    const reglementsForm = ref(null);
    const reglements = ref<Array<Reglement>>([]);
    const selectedItem = ref(0);
    const reglement = ref<Reglement>();
    const router = useRouter();
    const route = useRoute();
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
        getAllReglements(page_, limit_);
      } catch (error) {
        //
      }
    };
    const reglementii = ref();
    const openModal = (id: number) => {
      reglementii.value = id;
    };

    watch(point_vente, () => {
      rechercher();
    });
    
    function rechercher() {
      getAllReglements(point_vente.value,page.value, limit.value, searchTerm.value);
    }
    // END PAGINATE
    function getAllReglements(point_vent,page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/reglements?page=${page}&limit=${limi}&mot=${searchTerm}&cat=4&pointvente=${point_vent}&`)
        .then(({ data }) => {
          reglements.value = data.data.data;
          console.log(data.data.data, "dona")
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    function triggerButtonClick(buttonId: string) {
      const button = document.getElementById(buttonId) as HTMLButtonElement;
      if (button) {
        button.click(); // Simule un clic
      } else {
        console.error(`Button with ID "${buttonId}" not found.`);
      }
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }
    return {
      reglement,
      openModal,
      reglementsForm,
      checkPermission,
      suppression,
      format_date,
      reglements,
      page,
      totalPages,
      limit,
      selectedItem,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      separateur,
      reglementsSchema,
      point_ventes,
      point_vente
      //getEtatBadge,
    };
  },
});
</script>