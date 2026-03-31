<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <!-- Section des informations générales -->
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
            
            <router-link
              to="/detachements/liste-detachements"
              class="btn btn-primary transition border-0 lh-1 fw-medium"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour
            </router-link>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <td>Date de demande</td>
                <td>{{ format_Date(detachement?.dateDetachement) }}</td>
              </tr>
             
              <!-- <tr>
                <td>Magasin</td>
                <td>{{ detachement?.magasin?.nomMagasin}}</td>
              </tr> -->
             
             
              <!-- <tr v-if="client?.telephone1">
                <td>Téléphone 1</td>
                <td>{{ client?.telephone1 }}</td>
              </tr>
              <tr v-if="client?.telephone2">
                <td>Téléphone 2</td>
                <td>{{ client?.telephone2 }}</td>
              </tr> -->
              <!-- <tr>
                <td>Date de naissance</td>
                <td>{{ client?.dateNais }}</td>
              </tr>
              <tr>
                <td>Raison sociale</td>
                <td>{{ client?.raisonSociale }}</td>
              </tr>
              <tr>
                <td>Ifu</td>
                <td>{{ client?.ifu }}</td>
              </tr>
              <tr>
                <td>Dénomination</td>
                <td>{{ client?.denomination }}</td>
              </tr>
              <tr>
                <td>Date création</td>
                <td>{{ client?.dateCreation }}</td>
              </tr> -->
            </tbody>
          </table>

          <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mt-25">
        <h4 class="position-relative text-black fw-bold mb-10">Point du détachement</h4>
        <table class="table">
          <thead>
            <tr>
              <th class="bg-primary">Produit Conditonné Source </th>
              <th class="bg-primary">Produit Conditonné Cible </th>
              <th class="bg-primary">Quantité Source</th>
              <th class="bg-primary">Quantité Cible</th>
              <th class="bg-primary">Magasin</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ligne, index) in detachement?.lignesDetachement" :key="index">
              <td>{{ ligne?.nomProduitSource || 'N/A' }}</td>
              <td>{{ligne?.nomProduitCible|| 'N/A' }}</td>
              <td>{{ ligne?.qtiteSource || ligne?.qtite || 'N/A' }}</td>
              <td>{{ ligne?.qtiteCible || 'N/A' }}</td>
              <td>{{ detachement?.magasin?.nomMagasin || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Client } from "@/models/Client";
import { error, format_Date } from "@/utils/utils";
import { useRoute } from "vue-router";
import { Detachement } from "@/models/Detachement";

export default defineComponent({
  name: "ViewDetachement",
  setup: () => {
    const route = useRoute();
    const detachement = ref<Detachement | null>(null);

    function getDetachement(id: string) {
      return ApiService.get(`/detachements/${id}`)
        .then(({ data }) => {
          console.log("donnee:", data);
          detachement.value = data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }


    onMounted(() => {
      const id = route.params.id as string;
      getDetachement(id);
    });

    return {
     detachement,
      getDetachement,
      format_Date,
    };
  },
});
</script>