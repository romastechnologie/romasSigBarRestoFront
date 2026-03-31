<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link class="btn btn-primary" to="/ventes/ajouter-vente">
          <i class="fa fa-plus-circle"></i>
          Ajouter une vente
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
            placeholder="Rechercher une vente" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
    </div>

    <!-- ====== TABLEAU DES VENTES ====== -->
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>

              <th>Date</th>
              <th>Client</th>
              <th>Type Commande</th>
              <th>Type Facture</th>
              <!-- <th>Statut Paiement</th> -->
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vente, index) in ventes" :key="index">
              <!-- <td>
                <strong>{{ vente?.refFacture || vente?.id }}</strong>
              </td> -->
              <td>
                {{ formatDate(vente?.dateCommande) }}
              </td>
              <td>
                {{ getClientName(vente?.client) }}
              </td>
              <td>
                <span class="badge" :class="{
                  'bg-primary': vente.typeCommande === 'Au comptoir',
                  'bg-warning': vente.typeCommande === 'Sur commande'
                }">
                  {{ vente?.typeCommande }}
                </span>
              </td>
              <td>
                <span class="badge" :class="{
                  'bg-light text-dark': vente.typeFacture === 'Facture de vente',
                  'bg-success': vente.typeFacture === 'Facture de vente à l\'exportation',
                  'bg-info': vente.typeFacture === 'Facture proforma'
                }">
                  {{ vente?.typeFacture }}
                </span>
              </td>
              <!-- <td>
                <span class="badge" :class="{
                  'bg-success': vente?.reglements.statutPaiement === 'Payée',
                  'bg-warning': vente?.reglements.statutPaiement === 'Partiel',
                  'bg-danger': vente?.reglements.statutPaiement === 'En attente'
                }">
                  {{ vente?.statutPaiement || 'En attente' }}
                </span>
              </td> -->

              <td>
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Actions
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="imprimerBon(vente.id)">
                        <i class="fa fa-solid fa-print lh-1 me-8 position-relative top-1"></i>Imprimer Bon de Commande
                      </a>
                    </li>
                    <li>
                      <router-link :to="{ name: 'ViewVente', params: { id: vente.id } }"
                        class="dropdown-item d-flex align-items-center">
                        <i class="flaticon-eye me-2"></i>Détails
                      </router-link>
                    </li>

                    <li v-if="vente.statut !== 'Annulée'">
                      <a class="dropdown-item d-flex align-items-center text-danger" href="javascript:void(0);"
                        @click="annulerVente(vente)">
                        <i class="fa fa-ban me-2"></i>Annuler la Vente
                      </a>
                    </li>

                    <li v-if="vente.statut !== 'Annulée'">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="suppression(vente.id, ventes, 'ventes', `la vente ${vente.id}`)">
                        <i class="fa fa-trash-o me-2"></i>Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-area d-md-flex mt-15 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/services/ApiService";
import PaginationComponent from "@/components/Utilities/Pagination.vue";
import { error, success, suppression, monSwal } from "@/utils/utils";
import { Vente } from "@/models/Vente";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import Swal from "sweetalert2";

export default defineComponent({
  name: "ListeVente",
  components: {
    PaginationComponent,
    Multiselect
  },

  setup() {
    const ventes = ref<Array<Vente>>([]);
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const searchTerm = ref('');

    const getAllVentes = async (page_ = 1, limit_ = 10, search = "") => {
      const { data } = await ApiService.get(`/all/commandeClients?page=${page_}&limit=${limit_}&mot=${search}`);
      ventes.value = data.data.data;
      console.log("valll", ventes.value);
      totalPages.value = data.data.totalPages;
      totalElements.value = data.data.totalElements;
      limit.value = data.data.limit;
    };

    const handlePaginate = ({ page_, limit_ }) => {
      page.value = page_;
      getAllVentes(page_, limit_);
    };

    const rechercher = () => getAllVentes(page.value, limit.value, searchTerm.value);

    const imprimerBon = async (bonId: number) => {
      const loadingHtml = `
    <html>
      <head><title>Génération bon de commande...</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f8f9fa;">
        <div style="max-width: 400px; margin: 0 auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="width: 50px; height: 50px; border: 4px solid #e3e3e3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
          <h3 style="color: #333;">Génération du bon de commande...</h3>
          <p style="color: #666;">Veuillez patienter</p>
        </div>
        <style>
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
        </style>
      </body>
    </html>
  `;

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(loadingHtml);
        newWindow.document.close();
      }

      try {
        const response = await ApiService.get(`/bon/${bonId}`, "", {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const urlBlob = window.URL.createObjectURL(blob);

        if (newWindow && !newWindow.closed) {
          newWindow.location.href = urlBlob;
        }

        setTimeout(() => window.URL.revokeObjectURL(urlBlob), 5000);

      } catch (err: any) {
        console.error("Erreur :", err);

        if (newWindow && !newWindow.closed) {
          newWindow.close();
        }

        error("Erreur lors de l'ouverture du bon");
      }
    };


    const annulerVente = async (vente: Vente) => {
      const confirmation = await monSwal(
        "Êtes-vous sûr de vouloir annuler cette vente ? Cette action est irréversible.",
        "Oui, annuler",
        "btn btn-danger",
        "Non, conserver",
        "L'annulation a été annulée"
      );

      if (confirmation) {
        ApiService.put(`/factures/${vente.id}/annuler`, {})
          .then((response) => {
            success(response.data?.message || "La vente a été annulée avec succès. Une facture d'avoir a été générée.");
            getAllVentes(page.value, limit.value, searchTerm.value);
          })
          .catch((err) => {
            const errorMessage = err.response?.data?.message || "Une erreur est survenue lors de l'annulation de la vente";
            error(errorMessage);
          });
      }
    };

    // Fonctions utilitaires
    const formatDate = (date: string) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('fr-FR');
    };

    const formatMontant = (montant: number) => {
      if (!montant && montant !== 0) return '-';
      return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
    };

    const getClientName = (client: any) => {
      if (!client) return '-';
      if (client.nomClient) {
        return `${client.nomClient} ${client.prenomClient || ''}`.trim();
      }
      return client.raisonSociale || '-';
    };

    const getReliquat = (vente: any) => {
      const ttc = vente?.montantTTC || 0;
      const recu = vente?.montantReçu || 0;
      return ttc - recu;
    };

    onMounted(() => getAllVentes());

    return {
      ventes,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      annulerVente,
      suppression,
      formatDate,
      formatMontant,
      getClientName,
      getReliquat,
      imprimerBon
    };
  },
});
</script>