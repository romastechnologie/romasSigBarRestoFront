<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/contrats/ajouter-contrat"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un contrat
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            name="mot"
            class="form-control shadow-none text-black"
            placeholder="Rechercher"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
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
                Date Début
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date fin
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Salaire
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Employé
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nbre d'Heures par semaine
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                STATUT
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date de création
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contrat, index) in contrats" :key="index">
              <td class="shadow-none lh-1 fw-medium ">{{ format_Date(contrat?.datePriseFonction) }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ format_Date(contrat.dateFin) }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ contrat.salaireBase }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ contrat?.personnel?.nom ?? 'N/A' }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ contrat.nobreheuresTravail }} </td>
              <td class="shadow-none lh-1 fw-medium">
                  <span :class="contrat.estResilie ? 'badge bg-danger text-white' : 'badge bg-success text-white'">
                    {{ contrat.estResilie ? 'Resilier' : 'Actif' }}
                  </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ format_Date(contrat.createdAat) }}</td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
              >
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu">
                    <li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'ViewContrat', params: { id: contrat.id } }"
                        class="dropdown-item d-flex align-items-center">
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        <!-- <p><strong></strong></p> -->
                        Détails
                      </router-link>
                    </li>

                     <li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'AddApercuContratPage', params: { id: contrat.id } }"
                        class="dropdown-item d-flex align-items-center">
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Aperçu
                      </router-link>
                    </li>

                      <li v-if="!contrat.estResilie" class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);" data-bs-target="#create-task" data-bs-toggle="modal" @click="openModal(contrat.id)">
                      <i class="fa fa-ban lh-1 me-8 position-relative top-1"></i>
                      Résilier 
                    </a>
                  </li>

                    <!-- <li>
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(contrat.id, contrats, 'contrats', `Contrat ${contrat.id}`)">
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li> -->
                 <!--   <li>
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="resilierContrat(contrat.id)">
                        <i class="flaticon-close lh-1 me-8 position-relative top-1"></i>
                        Résilier ce contrat
                      </a>
                    </li>-->
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

           <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Voulez-vous résilier ce contrat?</h6>
        <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <Form
          ref="contratsForm"
          @submit="addContrats"
          :contrat-schema="contratsSchema"
        >
          <div class="row gy-2">
            <div class="col-md-4-3">
              <label class="d-block fw-semibold mb-10">
                Motif<span class="text-danger"></span>
              </label>
              <Field
                name="motif"
                as="textarea"
                placeholder="Entrer le motif"
                class="form-control shadow-none rounded-0 text-black"
              />
              <ErrorMessage name="motif" class="text-danger" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Résilier le contrat</button>
           <button
    type="button"
    class="btn btn-danger"
    data-bs-dismiss="modal"
    aria-label="Close"
  >
    Annuler
  </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</div>

      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { Contrat } from "@/models/Contrat";
import ApiService from "@/services/ApiService";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { suppression, error, format_Date,success,showModal, hideModal,   } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import * as Yup from 'yup';
import { useRouter } from "vue-router";



export default defineComponent({
  name: "ListeContrat",
  components: {
    PaginationComponent,
        Form,
        Field,
        ErrorMessage
  },
  setup() {
    onMounted(() => {
      getAllContrats();
    });
    const contrats = ref<Array<Contrat>>([]);
    const contrat = ref<Contrat>();
    const router = useRouter();  
    // BEGIN PAGINATE
     const contratsSchema = Yup.object().shape({
      motif: Yup.string().required("Le motif est obligatoire"),
    });
    const contratsForm = ref(null);

    const contratii = ref();
    const openModal = (id: number) => {
      contratii.value = id;
    };

    function triggerButtonClick(buttonId: string) {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    button.click(); // Simule un clic
  } else {
    console.error(`Button with ID "${buttonId}" not found.`);
  }
}

  const addContrats  = async (values, { resetForm }) => {
  values["id"] = contratii.value;
  values["estResilie"] = 1;
  console.log ("donnée contrat", values)
  ApiService.put("/contrats/" + values.id, values)
    .then(({ data }) => {
      if (data.code === 200) {
          success(data.message);
        contratsForm.value?.resetForm();
        resetForm(); 
        getAllContrats();
        triggerButtonClick("close-modal");
        router.push({ name: "ListeContrat" }); 
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};


const rejectContrats = async () => {
  const isValid = await contratsForm.value?.validate();
  if (!isValid) return; 

  const values = {
    demandeId: contratii.value?.demande?.id,
    statut: 'Rejeté',
    motif: contratsForm.value?.values?.motif,
   // etapevalidation: contratii.value?.etapevalidation?.id,
  };
  Swal.fire({
    title: 'Veuillez patienter...',
    text: 'Rejet en cours...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  ApiService.post("/validations/", values)
    .then(({ data }) => {
      Swal.close(); 
      if (data.code === 201) {
        success(data.message);
        contratsForm.value?.resetForm();
        getAllContrats();
        triggerButtonClick("close-modal");
      }
    })
    .catch(({ response }) => {
      Swal.close(); 
      error(response.data.message);
    });
};

    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllContrats(page_, limit_);
      } catch (error) {
      }
    };
    function rechercher() {
      getAllContrats(page.value, limit.value, searchTerm.value);
    }
    function getAllContrats(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/contrats?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          contrats.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }
    function moddifier(Editcontrats: Contrat) {
      contrat.value = Editcontrats;
    }
    const deleteContrat = (id: number) => {
      ApiService.delete(`/contrats/${id}`)
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

      for (let i = 0; i < contrats.value.length; i++) {
        if (contrats.value[i].id === id) {
          contrats.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    };

    return {
      contrats,
      checkPermission,
      getAllContrats,
      deleteContrat,
      moddifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
     format_Date,
     openModal,
    contratsForm,
    addContrats,
    contratsSchema,
    rejectContrats,
   //   resilierContrat
    };
  },
});
</script>