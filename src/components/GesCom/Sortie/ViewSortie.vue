<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>

            <router-link
              to="/sorties/liste-sorties"
              class="btn btn-primary transition border-0 lh-1 fw-medium"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour
            </router-link>
          </div>

                <div class="row mb-4">
                  <div class="col-md-3">
                    <p class="fw-bold mb-1">Montant Total :</p>
                    <p>{{ sortie?.montantTotal || 'N/A' }}</p>
                  </div>
                  <div class="col-md-3">
                    <p class="fw-bold mb-1">Motif :</p>
                    <p>{{sortie?.motifSortie ||  'N/A' }}</p>
                  </div>
                  <div class="col-md-3">
                    <p class="fw-bold mb-1">Récupérant :</p>
                    <p>{{ sortie?.recuperant || 'N/A' }}</p>
                  </div>
                  <div class="col-md-3">
                    <p class="fw-bold mb-1">Bénéficiaire :</p>
                    <p>{{  sortie?.beneficiaire ||  'N/A' }}</p>
                  </div>
                </div>

          <div class="card-head box-shadow bg-white p-15 p-sm-20 p-md-25 mt-25">
            <table class="table">
              <thead>
                <tr>
                  <!-- <th>Magasin</th> -->
                  <th class="bg-primary">Produit Conditionné</th>
                  <th class="bg-primary">Qté sortie</th>
                  <th class="bg-primary">Prix Unitaire</th>
                  <th class="bg-primary">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ligne, index) in sortie?.sortiprocondis" :key="index">
                  <!-- <td>{{ ligne.magprocondi?.magasin?.nomMagasin ?? 'N/A' }}</td> -->
                  <td>{{ ligne?.magprocondi?.produitcondi?.nomProCond ?? 'N/A' }}</td>
                  <td>{{ ligne.qtite ?? 'N/A' }}</td>
                  <td>{{ ligne.prixProd !== null ? ligne.prixProd.toFixed(2) : 'N/A' }}</td>
                  <td>
                    {{
                      ligne.prixProd !== null
                        ? (ligne.qtite * ligne.prixProd).toFixed(2)
                        : 'N/A'
                    }}
                  </td>
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
  name: "ViewSortie",
  setup: () => {
    const route = useRoute();
    const sortie = ref<Transfert | null>(null);

    function getsortie(id: string) {
      return ApiService.get(`/sorties/${id}`)
        .then(({ data }) => {
          console.log("donnee:", data);
          sortie.value = data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

  

    onMounted(() => {
      const id = route.params.id as string;
      getsortie(id);
    });

    return {
     sortie,
      getsortie,
      format_Date,
    };
  },
});
</script>