<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <h5 class="text-black fw-semibold mb-0">Détails de l'ouverture à la fermeture</h5>
      </div>
      <router-link to="/OuverturesFermetures" class="btn btn-primary">Retour à la liste</router-link>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div v-if="selectedOuvFer" class="row">
        <div class="col-md-6">
          <h6 class="fw-bold mb-15">Informations d'ouverture</h6>
          <div class="mb-10">
            <strong class="text-black">Caisse :</strong>
            <span class="ms-2">{{ selectedOuvFer.caisse?.nom || 'N/A' }}</span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Date d'ouverture :</strong>
            <span class="ms-2">{{ format_date(selectedOuvFer.dateOuverture) }}</span>
          </div>
          <div class="mb-10">
            <strong class="text-black"> Fonds de caisse initial :</strong>
            <span class="ms-2">{{ selectedOuvFer.fondsRoulement }} FCFA</span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Personnes présentes lors de l'ouverture:</strong>
            <div class="mb-10">
              <template v-for="(billetage, index) in selectedOuvFer?.personneOuverture" :key="index">
                <div class="container m-1">
                  <div class="row">
                    <div class="col-md-4">
                      {{ billetage?.user?.nom }} {{ billetage?.user?.prenom }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="mb-10">
            <strong class="text-black">Observation :</strong>
            <span class="ms-2">{{ selectedOuvFer.observations || 'Aucune' }}</span>
          </div>

        </div>
        <div class="col-md-6">
          <h6 class="fw-bold mb-15">Informations de fermeture</h6>
          <div class="mb-10">
            <strong class="text-black">Date de fermeture :</strong>
            <span class="ms-2">{{ format_date(selectedOuvFer.dateFin) || 'Non fermée' }}</span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Solde physique :</strong>
            <span class="ms-2">{{ selectedOuvFer.solde || 0 }} FCFA</span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Solde théorique :</strong>
            <span class="ms-2">{{ selectedOuvFer.stockTheorique || 0 }} FCFA</span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Écart :</strong>
            <span class="ms-2" :class="{ 'text-danger': selectedOuvFer.ecart < 0 }">
              {{ selectedOuvFer.ecart || 0 }} FCFA
            </span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Personnes présentes Fermeture:</strong>
            <!-- <span class="ms-2">{{ selectedOuvFer.personneOuverture?.map(u => u.nom).join(', ') || 'Aucune' }}</span> -->

            <template v-for="(billetage, index) in selectedOuvFer?.personneFermeture" :key="index">
              <div class="container m-1">
                <div class="row">
                  <div class="col-md-4">
                    {{ billetage?.user?.nom }} {{ billetage?.user?.prenom }}
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="mb-10">
            <strong class="text-black">Observations :</strong>
            <span class="ms-2">{{ selectedOuvFer.observationsFin || '-' }}</span>
          </div>
          <div class="mb-10">
            <strong class="text-black">Reliquat à retourner :</strong>
            <span class="ms-2">{{ selectedOuvFer?.reliquatTotalRetourner || '0' }}</span>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-danger fs-md-12">
        Chargement des détails en cours...
      </div>
      <div class="row">
        <div class="col-md-12" v-if="selectedOuvFer?.billetageOuvertures?.length > 0">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <!-- Monnaie -->
                <th rowspan="2" class="text-center align-middle" style="background-color: #f8f9fa;">
                  Monnaie
                </th>
                <!-- Billetage Ouverture -->
                <th colspan="2" class="text-center" style="background-color: #28a745; color: white;">
                  Billetage Ouverture — Total : {{ sommes(selectedOuvFer?.billetageOuvertures) }} FCFA
                </th>
                <!-- Billetage Fermeture -->
                <th colspan="2" class="text-center" style="background-color: #0a59a4; color: white;">
                  Billetage Fermeture — Total : {{ sommes(selectedOuvFer?.billetageFermetures) }} FCFA
                </th>
                <!-- Écart -->
                <th colspan="2" class="text-center" style="background-color: #dc3545; color: white;">
                  Écart — Total : {{ sommes(selectedOuvFer?.billetageEcarts) }} FCFA
                </th>
              </tr>
              <tr>
                <th class="text-center">Quantité</th>
                <th class="text-center">Montant</th>
                <th class="text-center">Quantité</th>
                <th class="text-center">Montant</th>
                <th class="text-center">Quantité</th>
                <th class="text-center">Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(billetage, index) in selectedOuvFer?.billetageOuvertures" :key="index">
                <!--  Monnaie (colonne fixe) -->
                <td class="fw-semibold text-center">{{ billetage.libelle }}</td>

                <!--  Ouverture -->
                <td class="text-center">{{ billetage.qteBillet }}</td>
                <td class="text-center">{{ separateur(billetage.montant) }}</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { error, format_date, separateur } from "@/utils/utils";
import { Caisse } from "@/models/Caisse";
import { DetailedOuvFerm } from "@/models/DetailedOuvFer";


export default defineComponent({
  name: "ViewOuvFerm",
  setup() {
    const route = useRoute();
    const selectedOuvFer = ref<DetailedOuvFerm | null>(null);


    const getOuvFerDetails = () => {
      const ouvFerId = route.params.id as string;
      if (!ouvFerId) {
        Swal.fire({
          text: "ID d'ouverture/fermeture manquant.",
          toast: true,
          icon: "error",
          position: "top-right",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          heightAuto: false,
        });
        return;
      }

      ApiService.get(`/ouvfers/details/${ouvFerId}`)
        .then(({ data }) => {
          selectedOuvFer.value = data.data || null;
          console.log("val", selectedOuvFer);
          if (!selectedOuvFer.value) {
            Swal.fire({
              text: "Aucune ouverture/fermeture trouvée pour cet ID.",
              toast: true,
              icon: "info",
              position: "top-right",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              heightAuto: false,
            });
          }
        })
        .catch(({ response }) => {
          selectedOuvFer.value = null;
          error(response?.data?.message || "Erreur lors de la récupération des détails.");
        });
    };

    onMounted(() => {
      getOuvFerDetails();
    });

    return {
      selectedOuvFer,
      format_date, separateur
    };
  },
});
</script>
<style scoped>
.card {
  margin-bottom: 25px;
}

.card-head {
  padding: 15px 20px;
}

.mb-15 {
  margin-bottom: 15px;
}

.mb-10 {
  margin-bottom: 10px;
}

.text-danger {
  color: #dc3545;
}

.text-black {
  color: #212529;
}

.text-muted {
  color: #6c757d;
}
</style>