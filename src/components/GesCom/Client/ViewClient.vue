<template>
  <div class="row">
    <!-- Colonne gauche : Informations du client -->
    <div class="col-md-6">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-header">
          <h3 class="card-title mb-0">Informations du client</h3>
          <router-link to="/clients/liste-clients" class="btn btn-primary transition border-0 lh-1 fw-medium"
            style="position: absolute; right: 10px; top: 10px;">
            <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
            <span class="position-relative">Retour</span>
          </router-link>
        </div>
         
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          
          <table class="table table-borderless">
            <tbody>
              <tr v-if="client?.statut">
                <td class="fw-medium">Statut :</td>
                <td>{{ client.statut == 1 ? 'Personne physique' : 'Personne morale' }}</td>
              </tr>
              <tr v-if="client?.nomClient">
                <td class="fw-medium">Nom :</td>
                <td>{{ client.nomClient }}</td>
              </tr>
              <tr v-if="client?.prenomClient">
                <td class="fw-medium">Prénom :</td>
                <td>{{ client.prenomClient }}</td>
              </tr>
               <tr v-if="client?.paysResidence">
                <td class="fw-medium">Pays de résidence :</td>
                <td>{{ client.paysResidence }}</td>
              </tr>
               <tr v-if="client?.quartier">
                <td class="fw-medium">Quartier :</td>
                <td>{{ client.quartier?.libelle }}</td>
              </tr>
               <tr v-if="client?.region">
                <td class="fw-medium">Region :</td>
                <td>{{ client.region }}</td>
              </tr>
               <tr v-if="client?.ville">
                <td class="fw-medium">Ville de résidence :</td>
                <td>{{ client.ville }}</td>
              </tr>
              <tr v-if="client?.adresseClient">
                <td class="fw-medium">Adresse :</td>
                <td>{{ client.adresseClient }}</td>
              </tr>
              <tr v-if="client?.emailClient">
                <td class="fw-medium">Email :</td>
                <td>{{ client.emailClient }}</td>
              </tr>
              <tr v-if="client?.telephone1">
                <td class="fw-medium">Téléphone 1 :</td>
                <td>{{ client.telephone1 }}</td>
              </tr>
              <tr v-if="client?.telephone2">
                <td class="fw-medium">Téléphone 2 :</td>
                <td>{{ client.telephone2 }}</td>
              </tr>
              <tr v-if="client?.dateNais">
                <td class="fw-medium">Date de naissance :</td>
                <td>{{ format_Date(client.dateNais) }}</td>
              </tr>
              <tr v-if="client?.piece?.libelle">
                <td class="fw-medium">Type de pièce :</td>
                <td>{{ client?.piece?.libelle }}</td>
              </tr>
              <tr v-if="client?.numeroPiece">
                <td class="fw-medium">Numéro de la pièce :</td>
                <td>{{ client.numeroPiece }}</td>
              </tr>
              <tr v-if="client?.dateExpiration">
                <td class="fw-medium">Date d'expiration :</td>
                <td>{{ client.dateExpiration }}</td>
              </tr>
              <tr v-if="client?.raisonSociale">
                <td class="fw-medium">Raison sociale :</td>
                <td>{{ client.raisonSociale }}</td>
              </tr>
              <tr v-if="client?.sigle">
                <td class="fw-medium">Sigle :</td>
                <td>{{ client.sigle }}</td>
              </tr>
              <tr v-if="client?.ifu">
                <td class="fw-medium">IFU :</td>
                <td>{{ client.ifu }}</td>
              </tr>
              <tr v-if="client?.dateCreation">
                <td class="fw-medium">Date de création :</td>
                <td>{{ format_Date(client.dateCreation) }}</td>
              </tr>
              <tr v-if="client?.personneAContacter">
                <td class="fw-medium">Nom et Prénom de la personne à contacter :</td>
                <td>{{ client.personneAContacter }}</td>
              </tr>
              <tr v-if="client?.telephonePersonneAContacter">
                <td class="fw-medium">Téléphone de la personne à contacter :</td>
                <td>{{ client.telephonePersonneAContacter }}</td>
              </tr>
              <tr v-if="client?.personneRepresentant">
                <td class="fw-medium">Nom et prénoms du représentant :</td>
                <td>{{ client.personneRepresentant }}</td>
              </tr>
              <tr v-if="client?.telephoneRepresentant">
                <td class="fw-medium">Téléphone du représentant :</td>
                <td>{{ client.telephoneRepresentant }}</td>
              </tr>
              
              <tr v-if="client?.rccm">
                <td class="fw-medium">Régistre de commerce :</td>
                <td>{{ client.rccm }}</td>
              </tr>
              <tr v-if="client?.gerant?.nomClient && client?.gerant?.prenomClient">
                <td class="fw-medium">Gérant :</td>
                <td>{{ client?.gerant?.nomClient }} {{ client?.gerant?.prenomClient }}</td>
              </tr>
              <tr v-if="client?.promoteur?.nomClient && client?.promoteur?.prenomClient">
  <td class="fw-medium">Promoteur :</td>
  <td>{{ client.promoteur.nomClient }} {{ client.promoteur.prenomClient }}</td>
</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

<!-- Colonne droite : Créances avec échéances -->
<div class="col-md-6">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-header">
          <h4 class="card-title mb-0">Détails des informations sur les Créances</h4>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Échéances</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(creance, index) in client?.creances" :key="index">
                  <td>{{ creance.id }}</td>
                  <td>{{ creance.montant }}</td>
                  <td>{{ format_Date(creance.date) }}</td>
                  <td>
                    <!-- Sous-tableau pour les échéances -->
                    <div v-if="creance.echeances?.length">
                      <table class="table table-sm table-borderless">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Montant</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(echeance, eIndex) in creance.echeances" :key="eIndex">
                            <td>{{ format_Date(echeance.date) }}</td>
                            <td>{{ echeance.montant }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <span v-else>Aucune échéance</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

   
    <!-- Nouvelle rangée : Comptes associés et Rapports des échéances -->
    <div class="col-md-6">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-header">
          <h4 class="card-title mb-0">Comptes associés</h4>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Type de compte</th>
                  <th>Intitulé</th>
                  <th>Solde actuel</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(compte, index) in client?.compteClients" :key="index">
                  <td>{{ getTypeCompteLabel(compte.typeCompte) }}</td>
                  <td>{{ compte.intituleCompte }}</td>
                  <td>{{ compte.soldeActuel }}</td>
                 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-header">
          <h4>Rapport des échéances
          <h5 style="float:right">
            <a class="btn btn-primary btn-sm mt-3" href="#" @click.prevent="openAddRapportModal">
              <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i> Ajouter un rapport
            </a>

      </h5>
          </h4>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Échéance (Date)</th>
                  <th>Montant</th>
                  <th>Rapport</th>
                  <th>Date du rapport</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(creance, cIndex) in client?.creances" :key="cIndex">
                  <tr v-for="(echeance, eIndex) in creance.echeances" :key="eIndex">
                    <td>{{ format_Date(echeance.date) }}</td>
                    <td>{{ echeance.montant }}</td>
                    <td>
                      <div v-if="echeance.rapports?.length">
                        <ul class="list-unstyled">
                          <li v-for="(rapport, rIndex) in echeance.rapports" :key="rIndex">
                            {{ rapport.description }}
                          </li>
                        </ul>
                      </div>
                      <span v-else>Aucun rapport</span>
                    </td>
                    <td>
                      <div v-if="echeance.rapports?.length">
                        <ul class="list-unstyled">
                          <li v-for="(rapport, rIndex) in echeance.rapports" :key="rIndex">
                            {{ format_Date(rapport.dateRelance) }}
                          </li>
                        </ul>
                      </div>
                      <span v-else>-</span>
                    </td>
                   
                  </tr>
                </template>
                <tr v-if="!hasRapports">
                  <td colspan="4" class="text-center">Aucun rapport disponible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <AddRapportModal 
    v-if="showModal"
    :selectedClient="selectedClient" 
    @close="closeModal" 
  />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Client } from "@/models/Client";
import { error, format_Date } from "@/utils/utils";
import { useRoute } from "vue-router";
import AddRapportModal from "./AddRapportModal.vue";

export default defineComponent({
  name: "ViewClient",
  components: {
    AddRapportModal,
  },
  setup() {
    const route = useRoute();
    const client = ref<Client | null>(null);
    const selectedClient = ref<any>(null);
    const showModal = ref(false); // Ajouter une variable pour contrôler le modal

    async function getClient(id: string) {
      try {
        const { data } = await ApiService.get(`/clients/${id}`);
        client.value = data.data || null;
        if (!data.data) {
          throw new Error("Aucune donnée client reçue pour l'ID : " + id);
        }
      } catch (err: any) {
        error(err.response?.data?.message || err.message || "Erreur lors de la récupération du client");
      }
    }

    const hasRapports = computed(() => {
      return client.value?.creances?.some(creance =>
        creance.echeances?.some(echeance => echeance.rapports?.length > 0)
      ) || false;
    });

    const openAddRapportModal = () => {
      selectedClient.value = { ...client.value }; // Passer le client complet
      showModal.value = true; // Afficher le modal
    };

    const closeModal = () => {
      showModal.value = false; // Fermer le modal
      reloadClientData(); // Recharger les données
    };

     // Mapping des types de compte
     const typeCompteLabels: { [key: string]: string } = {
      '1': 'Compte Comptant',
      '2': 'Compte Créance',
      '3': 'Compte Dépot-Vente',
    };

    // Fonction pour obtenir le label du type de compte
    const getTypeCompteLabel = (typeCompte: string) => {
      return typeCompteLabels[typeCompte] || 'Type inconnu';
    };

    const reloadClientData = () => {
      const id = route.params.id as string;
      if (id) getClient(id);
    };

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getClient(id);
      } else {
        error("ID du client non fourni dans les paramètres de la route");
      }
    });

    return { 
      client,
      format_Date,
      hasRapports,
      openAddRapportModal,
      reloadClientData,
      selectedClient,
      showModal,getTypeCompteLabel,
      closeModal
    };
  },
});
</script>

<!-- <script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Client } from "@/models/Client";
import { error, format_Date } from "@/utils/utils";
import { useRoute } from "vue-router";
import AddRapportModal from "./AddRapportModal.vue";

export default defineComponent({
  name: "ViewClient",
components: {
  AddRapportModal,
 },
  setup() {
    const route = useRoute();
    const client = ref<Client | null>(null);
    const selectedClient = ref<any>(null); 

    async function getClient(id: string) {
      try {
        const { data } = await ApiService.get(`/clients/${id}`);
        client.value = data.data || null;
        if (!data.data) {
          throw new Error("Aucune donnée client reçue pour l'ID : " + id);
        }
      } catch (err: any) {
        error(err.response?.data?.message || err.message || "Erreur lors de la récupération du client");
      }
    }


    const hasRapports = computed(() => {
      return client.value?.creances?.some(creance =>
        creance.echeances?.some(echeance => echeance.rapports?.length > 0)
      ) || false;
    });
    
    const openAddRapportModal = (echeance: any) => {
      selectedClient.value = { ...echeance };
    };

    const reloadClientData = () => {
      const id = route.params.id as string;
      if (id) getClient(id);
    };

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getClient(id);
      } else {
        error("ID du client non fourni dans les paramètres de la route");
      }
    });

    return { 
      client,
      format_Date,
      hasRapports,
      openAddRapportModal,
      reloadClientData,
      selectedClient,



    };
  },
});
</script> -->

<style scoped>
.card-header {
  position: relative;
}
.table-borderless td {
  padding: 5px 0;
}
.table-responsive {
  max-height: 300px; /* Limite la hauteur des tables pour éviter un défilement excessif */
  overflow-y: auto;
}
</style>