<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <!-- <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddFactureModal"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une facture
        </a> -->
        <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button> -->
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
            placeholder="Rechercher une facture" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <!-- <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
        </button> -->
      </div>
    </div>
    <Form ref="etatForm" :validation-schema="etatFacture" style="width:100%;">
      <div class="row">

        <div class="col-md-4">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Date Début
            </label>
            <Field name="dateDebut" type="date" v-model="dateDebut" style="background-color: #fff;"
              class="form-control shadow-none fs-md-15 text-black" placeholder="Choisisser la date" />
            <ErrorMessage name="dateDebut" class="text-danger" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Date Fin
            </label>
            <Field name="dateFin" v-model="dateFin" type="date" style="background-color: #fff;"
              class="form-control shadow-none fs-md-15 text-black" placeholder="Choisisser la date" />
            <ErrorMessage name="dateFin" class="text-danger" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group mb-2 mb-sm-2 mb-md-2">
            <label class="d-block text-black fw-semibold">
              Type Facture <span class="text-danger">*</span>
            </label>
            <Field name="typeFacture" v-model="typeFacture" v-slot="{ field }">
            <Multiselect
              :options="typeFactureOptions"
              :searchable="true"
              v-model="typeFacture"
              placeholder="Sélectionner"
              value-prop="value"
              label="label"
            />
          </Field>
          </div>
          <ErrorMessage name="typeFacture" class="text-danger" />
        </div>

      </div>
    </Form>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Ref Facture
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Type de Facture
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date Transformation
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Client
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">
                Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(facture, index) in factures" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ facture.refFac }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span class="badge" :class="{
                  'bg-light  ': facture.typeFacture === 'Facture proforma',
                  'bg-success': facture.typeFacture === 'Facture de vente',
                  'bg-info': facture.typeFacture === 'Facture de vente à l\'exportation'
                }">
                  {{ facture.typeFacture }}
                </span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(facture.dateFac) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span v-if="facture.estTransformee && facture.dateTransformation">
                  {{ format_date(facture.dateTransformation) }}
                </span>
                <span v-else>-</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ facture?.commande?.client?.nomClient + ' ' + facture?.commande?.client?.prenomClient }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <div class="dropdown text-end">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">Actions</button>

                  <ul class="dropdown-menu">
                    <!-- <li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        data-bs-toggle="modal" data-bs-target="#AddFactureModal" @click="moddifier(facture)">
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </a>
                    </li>
                     -->
                     <!-- Normaliser : seulement pour les factures NON proforma et NON normalisées -->
                     <li v-if="facture.typeFacture !== 'Facture proforma' && !facture.estNormalisee">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="normaliser(facture)">
                        <i class="fa fa-check-circle me-2"></i>Normaliser
                      </a>
                    </li>
                    
                    <!-- Transformer en commande : seulement pour les proformas -->
                    <li v-if="facture.typeFacture === 'Facture proforma'">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="transformerEnCommande(facture)">
                        <i class="fa fa-exchange me-2"></i>Transformer en commande
                      </a>
                    </li>
                    
                    <li><a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="openImpressionModal(facture)" :class="{ 'disabled': isGeneratingPdf }">
                      <i v-if="!isGeneratingPdf" class="fa fa-print me-2"></i>
                      <i v-else class="fa fa-spinner fa-spin me-2"></i>
                      {{ isGeneratingPdf ? 'Génération...' : 'Imprimer' }}
                    </a></li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                        @click="suppression(facture.id, factures, 'factures', 'la facture')">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
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
    <div class="modal fade" :class="{ show: showModal }" style="display: block;" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content p-4">
          <div class="modal-header border-0">
            <h5 class="modal-title">Impression de la facture</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Choisissez le format de la facture :</p>
            <Multiselect :options="formatOptions" v-model="selectedFormat" placeholder="Choisir un format"
              no-results-text="Aucun format trouvé" />
          </div>
          <div class="modal-footer border-0">
            <button class="btn btn-secondary" @click="closeModal">Annuler</button>
            <button class="btn btn-primary" @click="confirmImpression">Imprimer</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>

  </div>


</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import { Facture } from "@/models/Facture";
import ApiService from "@/services/ApiService";
import { suppression, error, format_date, success } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import * as Yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Multiselect from "@vueform/multiselect/src/Multiselect";
import { useRouter } from "vue-router";


export default defineComponent({
  name: "ListeFacture",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    PaginationComponent,
  },
  setup() {

    const factures = ref<Array<Facture>>([]);
    const facture = ref<Facture>();
    
    // CORRECTION: Déclarer typeFacture comme acceptant string OU null
    const typeFacture = ref<string | null>(null);

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const etatForm = ref<any | null>({});

    const etatFacture = Yup.object().shape({
      typeFacture: Yup.string().notRequired(),
      dateFin: Yup.date().notRequired(),
      dateDebut: Yup.date().notRequired(),
    });
    
    const today = new Date();
    const dateDebut = ref(formatDate(today));
    const dateFin = ref(formatDate(today));

    const isGeneratingPdf = ref(false); 
    const router = useRouter();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedItem = ref(0);

    const showModal = ref(false);
    const selectedFacture = ref<Facture | null>(null);
    const selectedFormat = ref('A4');
    
    const formatOptions = [
      { value: "A4", label: "A4" },
      { value: "A5", label: "A5" },
      { value: "A6", label: "A6" },
      { value: "T1", label: "T1" },
      { value: "T2", label: "T2" },
    ];
    
    const typeFactureOptions = ref([
      { value: 'Facture de vente', label: 'Facture de vente' },
      { value: 'Facture de vente à l\'exportation', label: 'Facture de vente à l\'exportation' },
      { value: 'Facture proforma', label: 'Facture proforma' },
    ]);

    const openImpressionModal = (facture: Facture) => {
      selectedFacture.value = facture;
      selectedFormat.value = "A4";
      showModal.value = true;
    };

    const normaliser = async (facture: Facture) => {
      selectedFacture.value = facture;

      try {
        const response = await ApiService.post(`/factures/normaliser/${facture.id}`, {});
        if (response.data.code === 200 || response.data.code === 201) {
          success(response.data.message || "Facture normalisée avec succès");

          const index = factures.value.findIndex(f => f.id === facture.id);
          if (index !== -1) {
            factures.value[index].estNormalisee = true;
            factures.value[index].mecefCode = response.data.data?.mecefCode || null;
          }
        } else {
          error(response.data.message || "Erreur lors de la normalisation");
        }
      } catch (err: any) {
        console.error(err);
        error(err.response?.data?.message || "Erreur serveur lors de la normalisation");
      }
    };

    const transformerEnCommande = async (facture: Facture) => {
      try {
        console.log("Facture complète:", facture);
        console.log("ID facture:", facture.id);
        console.log("ID commande:", facture.commande?.id);
        
        if (facture.typeFacture !== 'Facture proforma') {
          error("Cette facture n'est pas une proforma");
          return;
        }

        router.push(`/ventes/transformer-proforma/${facture.commande?.id}`);
      } catch (err: any) {
        console.error(err);
        error("Erreur lors de la redirection");
      }
    };

    const closeModal = () => {
      showModal.value = false;
      selectedFacture.value = null;
    };

    const confirmImpression = () => {
      if (!selectedFormat.value) {
        error("Veuillez choisir un format avant d'imprimer");
        return;
      }
      if (selectedFacture.value) {
        imprimerFacture(selectedFacture.value.id, selectedFormat.value);
      }
      closeModal();
    };

    const imprimerFacture = async (factureId: number, format: string) => {
      const loadingHtml = `
        <html>
          <head><title>Génération facture...</title></head>
          <body style="font-family: Arial; text-align: center; padding: 50px; background: #f8f9fa;">
            <div style="max-width: 400px; margin: 0 auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="width: 50px; height: 50px; border: 4px solid #e3e3e3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
              <h3 style="color: #333; margin-bottom: 10px;">Génération en cours...</h3>
              <p style="color: #666; margin: 0;">Veuillez patienter quelques instants</p>
            </div>
            <style>
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
          </body>
        </html>
      `;

      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(loadingHtml);
        newWindow.document.close();
      }

      isGeneratingPdf.value = true;

      try {
        const response = await ApiService.get(`/commande/facture/${factureId}?format=${format}`, "", { 
          responseType: "blob",
          timeout: 60000 
        });

        console.log("Réponse PDF reçue:", response);
        
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Taille du blob:", blob.size, "bytes");
        
        if (blob.size === 0) {
          throw new Error("PDF vide reçu du serveur");
        }

        const urlBlob = window.URL.createObjectURL(blob);
        
        if (newWindow && !newWindow.closed) {
          newWindow.location.href = urlBlob;
          success("Facture générée et ouverte avec succès");
        } else {
          const link = document.createElement('a');
          link.href = urlBlob;
          link.download = `facture-${factureId}-${format}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          success("Facture téléchargée avec succès");
        }
        
        setTimeout(() => {
          window.URL.revokeObjectURL(urlBlob);
        }, 10000);

      } catch (err: any) {
        console.error("Erreur impression:", err);
        
        if (newWindow && !newWindow.closed) {
          newWindow.close();
        }
        
        if (err.message === 'Timeout') {
          error("La génération de la facture prend trop de temps. Réessayez.");
        } else if (err.code === 'ECONNABORTED') {
          error("Connexion interrompue. Vérifiez votre connexion internet.");
        } else {
          error(err.response?.data?.message || "Erreur lors de la génération de la facture");
        }
      } finally {
        isGeneratingPdf.value = false;
      }
    };

    const handlePaginate = ({ page_, limit_ }) => {
  try {
    page.value = page_;
    limit.value = limit_;
    getAllFactures(
      page_, 
      limit_, 
      searchTerm.value, 
      typeFacture.value || '', 
      dateDebut.value, 
      dateFin.value
    );
  } catch (error) {
    console.error('Erreur pagination:', error);
  }
};

    
   function rechercher() {
  console.log('Recherche avec:', {
    typeFacture: typeFacture.value,
    searchTerm: searchTerm.value,
    dateDebut: dateDebut.value,
    dateFin: dateFin.value
  });
  
  page.value = 1;
  
  getAllFactures(
    1,
    limit.value, 
    searchTerm.value, 
    typeFacture.value || '',
    dateDebut.value, 
    dateFin.value
  );
}
    watch([dateDebut, dateFin, typeFacture], () => {
  console.log('Watch déclenché - Filtres changés');
  
  page.value = 1;
  
  getAllFactures(
    1,
    limit.value, 
    searchTerm.value, 
    typeFacture.value || '',
    dateDebut.value, 
    dateFin.value
  );
});


    // END PAGINATE

    const recharger = () => {
      getAllFactures();
    };

    function getAllFactures(page = 1, limi = 10, searchTerm = '', typeFacture = "", dateDebut = '', dateFin = '') {
      console.log('getAllFactures appelé avec:', { page, limi, searchTerm, typeFacture, dateDebut, dateFin });
      
      return ApiService.get(`/all/factures?page=${page}&limit=${limi}&searchTerm=${searchTerm}&typeFacture=${typeFacture}&dateDebut=${dateDebut}&dateFin=${dateFin}`)
        .then(({ data }) => {
          factures.value = data.data.data;
          console.log("Factures récupérées:", factures.value);
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    function moddifier(EditFacture: Facture) {
      facture.value = EditFacture;
      selectedItem.value = EditFacture.id;
    }

    const deleteFacture = (id: number) => {
      ApiService.delete(`/factures/${id}`)
        .then(({ data }) => {
          Swal.fire({
            text: data.message,
            toast: true,
            icon: 'success',
            title: 'General Title',
            animation: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            heightAuto: false
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réssayer à nouveau!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });

      for (let i = 0; i < factures.value.length; i++) {
        if (factures.value[i].id === id) {
          factures.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    onMounted(() => {
      getAllFactures(page.value, limit.value, searchTerm.value, typeFacture.value || '', dateDebut.value, dateFin.value);
    });

    return {
      factures,
      checkPermission,
      getAllFactures,
      deleteFacture,
      moddifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      selectedItem,
      recharger,
      dateFin,
      dateDebut,
      etatFacture,
      etatForm,
      format_date,
      typeFacture,
      showModal,
      selectedFormat,
      formatOptions,
      openImpressionModal,
      closeModal,
      confirmImpression,
      normaliser,
      isGeneratingPdf,
      transformerEnCommande,
      typeFactureOptions
    };
  },
});
</script>