<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <!-- Section des informations générales -->
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
            
            <router-link
              to="/transferts/liste-transfertMag"
              class="btn btn-primary transition border-0 lh-1 fw-medium"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour
            </router-link>
          </div>
          <h3 class="text-center fw-bold">Transfert Magasin</h3><br>

               <div class="row mb-6">
            <div class="col-md-3">
                <p class="fw-bold mb-1">Magasin A :</p>
                <p>{{ transfert?.magasin1?.nomMagasin || 'N/A' }}</p>
            </div>
            <div class="col-md-3">
                <p class="fw-bold mb-1">Magasin B :</p>
                <p>{{ transfert?.magasin2?.nomMagasin || 'N/A' }}</p>
            </div>
            <div class="col-md-4">
                <p class="fw-bold mb-1">Motif :</p>
                <p class="text-wrap">{{ transfert?.motif || 'N/A' }}</p>
            </div>
            <!-- <div class="col-md-2">
                <p class="fw-bold mb-1">Montant Total :</p>
                <p>{{ transfert?.montantTotal || 'N/A' }}</p>
            </div> -->
            </div>


          <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mt-25">
            <!-- <h4 class="position-relative text-black fw-bold mb-10">Historique des affectations</h4> -->
            <table class="table">
              <thead class="">
                <tr>
                  <th class="bg-primary">ProduitsCondtionnés</th>
                  <th class="bg-primary" >Qté transférées</th>
                  <!-- <th class="bg-primary">PrixUnitaire</th> -->
                  
                </tr>
              </thead>
             <tbody>
              <tr v-for="(transfert ,index) in transfert?.transfertprocondis" :key="index">
                <td>{{ transfert?.produitcondi?.nomProCond || 'N/A' }}</td>
                <td>{{transfert?.qtite || 'N/A' }}</td>
                <!-- <td>{{ transfert?.prixUnitaire || 'N/A' }}</td> -->
                
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
import { DemandePrix } from "@/models/DemandePrix";
import { Transfert } from "@/models/Transfert";

export default defineComponent({
  name: "ViewTransfertMagasin",
  setup: () => {
    const route = useRoute();
    const transfert = ref<Transfert | null>(null);

    function getTransfert(id: string) {
      return ApiService.get(`/transferts/${id}`)
        .then(({ data }) => {
          console.log("donnee:", data);
          transfert.value = data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

  

    onMounted(() => {
      const id = route.params.id as string;
      getTransfert(id);
    });

    return {
     transfert,
      getTransfert,
      format_Date,
    };
  },
});
</script>