<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link to="/presences/ajouter-presence" class="btn btn-primary">
          <i class="fa fa-plus-circle"></i>
          Faire la présence
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher"
            class="form-control shadow-none text-black" placeholder="Rechercher une présence" />
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
                Date
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Personnel
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Heure d'arrivée
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Heure reglémentaire
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Statut Justifié
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0">Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="presence in filterPresence" :key="presence.id">
              <td> {{ presence.date ? format_Date(presence.date) : "" }} </td>
              <td> {{ presence.personnel ? presence.personnel.nom + " " + presence.personnel.prenom : "null" }} </td>
              <td> {{ presence.heureArrivee }} </td>
              <td> {{ presence.heureDepart }} </td>
             
              <td  class="text-center"> 
                <span v-if="presence.statut === 'present'" class="badge badge-success">Présent</span> 
                <span v-else-if="presence.statut === 'absent'" class="badge badge-danger">Absent</span>
                <span v-if="presence.statutJustifie === 'Oui'"
                class="badge badge-success">Oui</span>
                <span v-else-if="presence.statutJustifie === 'Non'"
                class="badge badge-danger">Non</span>
                <span v-else-if="presence.statutJustifie === 'En congé'" 
                  class="badge badge-primary">En congé</span>
                  <span v-else
                  class="badge badge-primary">Aucun motif</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false" v-if="presence.statut != 'Refusée'">Actions</button>
                <ul class="dropdown-menu dropdown-block"
                  style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                  data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center" v-if="presence.statut != 'Refusée'">
                    <router-link :to="`/presences/edit-presence/${presence.id}`" class="text-decoration-none">
                      <i class="fa fa-pencil lh-2 me-8 p-1 position-relative top-1"></i>
                      Modifié
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="presence.statut != 'Refusée'">
                    <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(presence.id,filterPresence,'presences',`la présence n° ${presence.id}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                         Supprimer
                      </a>
                  </li>
                </ul>
              </td>
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

<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, onMounted, ref, defineComponent, defineProps } from 'vue'
import { format_date,format_Date, suppression, error, success, } from "@/utils/utils";
import Swal from 'sweetalert2';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import ApiService from '@/services/ApiService';
import { useRouter } from "vue-router";


// BEGIN PAGINATE
const searchTerm = ref('');
const page = ref(1);
const totalPages = ref(0);
const limit = ref(10);
const totalElements = ref(0);

const handlePaginate = ({ page_, limit_ }: { page_: number, limit_: number }) => {
  try {
    page.value = page_;
    getAllPresences(page_, limit_);
  } catch (error) {
    //
  }
};

function rechercher() {
  getAllPresences(page.value, limit.value, searchTerm.value );
}

// END PAGINATE

const router = useRouter()

const presence = ref([] as any[]);

let filterPresence = ref(presence);

const defaultDate = new Date().toISOString().slice(0, 10);

function showTodayPresence() {
  const presenceOnSelectedDate = presence.value.filter(entry => {
    const entryDate = new Date(entry.date);
    const selectedDate = new Date(defaultDate);
    // Comparaison en ignorant les heures
    return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  });

  filterPresence.value = presenceOnSelectedDate;
}

function sortPresenceWithDate(choosedDate: any) {
  const presenceOnSelectedDate = presence.value.filter(entry => {
    const entryDate = new Date(entry.date);
    const selectedDate = new Date(choosedDate.value);
    // Comparaison en ignorant les heures
    return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  });

  filterPresence.value = presenceOnSelectedDate;
}

function sortPresenceWithSearch(searchPresence: any) {
  if ((searchPresence.value as string).trim() === "") {
    filterPresence.value = presence.value
  } else {
    filterPresence.value = presence.value.filter(presence => (presence.personnel.nom.toLowerCase()).startsWith((searchPresence.value as string).trim().toLowerCase()))
  }
}

// ------------------------------------------------ GETS ------------------------------------------------

function getAllPresences(page = 1, limi = 10, searchTerm = '') {
       return ApiService.get(`/presences?page=${page}&limit=${limi}&mot=${searchTerm}&`)
      //return ApiService.get('/typeConges')
        .then(({ data }) => {
          console.log("presence",data);
          presence.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    

// ------------------------------------------------- DELETE --------------------------------------------

function deletePresence(id: number) {

  Swal.fire({
    title: "Voulez-vous vraiment supprimer cette présence?",
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: "Annuler"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.delete(`/presences/${id}`);
        getAllPresences()
        Swal.fire("Présence supprimé avec succès!", "", "success");
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la recupération des présences:', error);
        throw error;
      }
    }
  });
}

onMounted(() => {
  getAllPresences()
})

</script>

<style>
td,
th {
  border: 1px solid gray;
}
</style>