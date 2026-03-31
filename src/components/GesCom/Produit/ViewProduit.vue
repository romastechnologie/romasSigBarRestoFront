<template>
  <div class="card border-0 rounded-0">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div class="card-header">
        <h3 class="text-black fw-semibold">Détails d'un produit</h3>

        <router-link to="/produits/liste-produits" class="btn btn-primary transition border-0 lh-1 fw-medium"
          style="position: absolute; right: 10px; top: 10px;">
          <i class="flaticon-left-arrow lh-1 me-1"></i>
          Retour
        </router-link>
      </div>
      <div class="card-head box-shadow bg-white d-flex align-items-center justify-content-between"></div>
      <div class="row">
        <!-- Bloc des informations générales -->
        <div class="col-md-8 col-xxl-8 col-sm-12 p-0">
          <h4 class="text-black fw-bold mb-10">Informations générales</h4>
          <table class="table">
            <tbody>
              <tr>
                <td>Code Produit</td>
                <td>{{ produit?.codeProduit }} </td>
              </tr>
              <tr>
                <td>Référence</td>
                <td>{{ produit?.refProd }} </td>
              </tr>
              <tr>
                <td>Famille</td>
                <td>{{ produit?.famille?.libelleFamille }}</td>
              </tr>
              <tr>
                <td>Nom</td>
                <td>{{ produit?.nomProd }}</td>
              </tr>
              <tr>
                <td>Nom Standar</td>
                <td>{{ produit?.nomStandar }}</td>
              </tr>
              <tr>
                <td>Nom Marché</td>
                <td>{{ produit?.nomMarche }}</td>
              </tr>
              <tr>
                <td>Marque :</td>
                <td>{{ produit?.marqProd?.libelle }} </td>
              </tr>
              <tr v-if="produit?.estModeCarreau">
                <td>Est mode Carreau :</td>
                <td>{{ produit?.estModeCarreau }}</td>
              </tr>
              <tr v-if="produit?.pieceParCarton">
                <td>Pièce par carton :</td>
                <td>{{ produit?.pieceParCarton }}</td>
              </tr>
              <tr v-if="produit?.pieceParMetreCarre">
                <td>Pièce par mètre carré :</td>
                <td>{{ produit?.pieceParMetreCarre }}</td>
              </tr>
              <tr v-if="produit?.metreCarreParCarton">
                <td>Mètre carré par carton :</td>
                <td>{{ produit?.metreCarreParCarton }}</td>
              </tr>
              <tr v-if="produit?.surfaceParPiece">
                <td>Surface par pièce:</td>
                <td>{{ produit?.surfaceParPiece }}</td>
              </tr>
              <tr v-if="produit?.couleur">
                <td>Couleur:</td>
                <td>{{ produit?.couleur }}</td>
              </tr>
              <tr v-if="produit?.paysProduction">
                <td>Pays d'origine:</td>
                <td>{{ produit?.paysProduction }}</td>
              </tr>
              <tr v-if="produit?.uniteGestion">
                <td>Unité de gestion:</td>
                <td>{{ produit?.uniteGestion?.libelle }}</td>
              </tr>
              <tr v-if="produit?.uniteStock">
                <td>Unité de Stock:</td>
                <td>{{ produit?.uniteStock?.libelle }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="produit?.descProd" class="mb-4">
            <h5 class="text-black fw-bold mt-4">Description du produit</h5>
            <p>{{ produit?.descProd }}</p>
          </div>
           <!-- Tableau des Domaines -->
           <div class="card mb-25 border-0 rounded-0">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
              <div class="card-title">
                <h4 class="mb-0 h2">Domaines de produit
                  <span style="float:right">
                    <a class="btn btn-primary btn-sm mt-3" href="#" data-bs-toggle="modal" data-bs-target="#AddDomaineModal"
                      @click="openAddDomaineModal(produit)">
                      <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i> Ajouter un domaine
                    </a>
                  </span>
                </h4>
              </div>
              <div class="card-body pt-0">
                <div class="row">
                  <div class="col-4" v-for="(domaineproduit, index) in produit?.domaineproduits" :key="index">
                    <div class="d-flex align-items-center py-2">
                      <div class="flex-grow-1">
                        <span class="bullet bg-primary me-3"></span>
                        <span class="shadow-none lh-1 fw-medium text-black-emphasis">
                          {{ domaineproduit.domaineActivite?.libelle }}
                        </span>
                      </div>
                      <div v-if="index !== 0" class="ms-3">
                        <span class="btn f-w-500 background-light-danger font-danger p-0">
                          <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                            @click="suppDomaineActivite(domaineproduit.id)">
                            <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
                          </a>
                         
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Tableau des conditionnements -->
          <div class="row">
            <div class="col">
              <h5 class="text-black fw-bold mt-4">Conditionnements du produit</h5>
            </div>
            <div class="col">
              <router-link :to="{ name: 'AddProduitConditionnement', params: { id: produit?.id } }"
                class="btn btn-primary mt-3 text-center">
                <i class="fa fa-plus-circle lh-2 me-8 position-relative top-1"></i> Compléter un conditionnement
              </router-link>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Conditionnement</th>
                <th>Qté Condit.</th>
                <th>UM</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produitconditionnement, index) in produit?.produitconditionnements" :key="index">
                <td>{{ produitconditionnement.conditionnement?.libelle }}</td>
                <td>{{ produitconditionnement.qteCond }}</td>
                <td>{{ produitconditionnement.conditionnement2?.libelle }}</td>
                <td>
                  <div v-if="index !== 0"> <!-- Ajout de la condition ici -->
                    <span class="">
                      <a class="bullet me-3 btn f-w-500 background-light-danger font-danger" href="javascript:void(0);"
                        @click="suppression(produitconditionnement.id, produit?.produitconditionnements, 'produitconditionnement', `le conditionnement ${produitconditionnement.conditionnement.libelle}`)">
                        <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <div class="col-md-4 col-xxl-4 col-sm-12 p-0">
          <h5 class="text-black fw-bold mb-10">Image du Produit</h5>

          <hr> <!-- Petit trait séparateur -->
          <img v-if="produit?.imagePrincipal" :src="getUrlApiForProductFiles(produit?.imagePrincipal)"
            class="d-block w-100" alt="Photo">
          <hr>
          <div v-if="medias.length > 0" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item" :class="index == 0 ? 'active' : ''" v-for="(media, index) in medias"
                :key="index">
                <img :src="getUrlApiForProductFiles(media.nomMedia)" class="d-block w-100" alt="Photo">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Précédent</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Suivant</span>
            </button>
          </div>
          <div v-else>
            <img :src="getUrlApiForProductFiles(null)" class="d-block w-100" alt="Photo">
          </div>
        </div>
        <div class="accordion dark-accordion my-5" id="simpleaccordion" v-if="produit?.produitchampslibres.length > 0">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button bg-light-primary font-primary" type="button" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">Champs descriptifs<i
                  class="vue-feather vue-feather--chevron-down svg-color" data-name="chevron-down" data-tags="expand"
                  data-type="chevron-down">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-chevron-down vue-feather__content">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg></i>
              </button>
            </h2>
            <div class="accordion-collapse" id="collapseOne" aria-labelledby="headingOne"
              data-bs-parent="#simpleaccordion">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-md-3" v-for="(champs, index) in produit?.produitchampslibres" :key="index">
                    <span class="text-black fw-bold">{{ champs.champslibre.libelleChamp }}</span>: <span>{{
                      champs.valeur }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bloc des images du produit avec un slider -->
 
  <AddDomaineModal :selectedProduit="selectedProduit" @close="reloadUserData" @getAllProduits="reloadUserData" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Produit } from "@/models/Produit";
import { error, getUrlApiForProductFiles, suppression, format_date, success } from "@/utils/utils";
import { useRoute } from "vue-router";
import AddDomaineModal from "./AddDomaineModal.vue";

export default defineComponent({
  name: "ViewProduit",
  components: {
    AddDomaineModal,

  },
  setup() {
    const route = useRoute();
    const produit = ref<Produit | null>(null);
    const medias = ref([]);

    async function getProduit(id: string) {
      try {
        const { data } = await ApiService.get(`/produits/${id}`);
        console.log(data);
        if (data && data.data) {
          produit.value = data.data;
          medias.value = data.data.medias; // Récupération des médias du produit
        } else {
          throw new Error("Données du produit non trouvées.");
        }
      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération du produit.");
      }
    }
    const selectedProduit = ref<Produit | undefined>(undefined);
    const selectedProduitId = ref<number>();

    const suppDomaineActivite = async (id: any) => {
      ApiService.delete("/domaines/produits/" + id)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            getProduit(route.params.id as string);
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const openAddDomaineModal = (produit: Produit) => {
      selectedProduit.value = { ...produit };
      selectedProduitId.value = produit.id;
      console.log('product selected ', selectedProduit.value);
    };

    const reloadUserData = () => {
      getProduit(route.params.id as string);
    };

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getProduit(id);
      } else {
        error("ID du produit non spécifié.");
      }
    });

    return {
      produit,
      medias, suppression, suppDomaineActivite, reloadUserData,
      getUrlApiForProductFiles, openAddDomaineModal,
      selectedProduitId, selectedProduit

    };
  },
});
</script>

<style scoped>
.card {
  border: none;
  /* Retire la bordure */
  margin: 0;
  /* Enlève toutes les marges */
}

.card-body {
  padding: 15px;
  /* Ajustez le padding pour vos besoins */
}

/* Enlève la marge entre les colonnes */
.row {
  margin: 0;
  /* Retire l'espacement de la rangée */
}

/* Ajout d'un petit espacement seulement avec un trait séparateur */
.table {
  border-collapse: collapse;
}

.table td {
  padding: 8px;
}

.carousel-inner img {
  max-height: 400px;
  object-fit: cover;
}
</style>
