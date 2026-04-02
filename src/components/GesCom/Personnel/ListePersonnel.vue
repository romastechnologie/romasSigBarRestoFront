<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">

    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link class="btn btn-primary" to="/personnelles/ajouter-personnel">
          <i class="fa fa-plus-circle"></i>
          Ajouter un personnel
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
            placeholder="Rechercher un personnel" />
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
                Nom
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Prenom
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Sexe
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Civilite
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Mail
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Telephone
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0">
                ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(personnel, index) in personnels" :key="index">

              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ personnel.nom }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ personnel.prenom }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ personnel.sexe }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ personnel.civilite }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ personnel.email }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ personnel.telephone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block"
                  style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                  data-popper-placement="bottom-start">
                  <!-- <li class="dropdown-item d-flex align-items-center">
                     <router-link :to="{ name: 'EditPersonnellePage', params: { id: personnel.id } }" 
                          class="dropdown-item d-flex align-items-center"><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>Modifier</router-link>
                    </li>-->
                  <li class="dropdown-item d-flex align-items-center">
                    <router-link :to="{ name: 'ViewPersonnellePage', params: { id: personnel.id } }"
                      class="dropdown-item d-flex align-items-center">
                      <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                    </router-link>
                  </li>
                  <!--<li class="dropdown-item d-flex align-items-center">
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(personnel.id,personnels,'personnels',`le personnel ${personnel.id}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                         Supprimer
                      </a>
                    </li>-->
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title"> Voulez-vous affecter le personnel
                <span class="fw-bold">{{ selectedPersonnel?.nom }} {{ selectedPersonnel?.prenom }}</span>
                à un autre service ?
              </h6>
              <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body px-4">
              <Form ref="personnelsForm" @submit="addPersonnels" :validation-schema="personnelsSchema">
                <div class="row gy-2">

                  <div class="col-md-4-3">
                    <label class="d-block text-black mb-10">
                      Date d'affectation<span class="text-danger">*</span></label>
                    <Field v-model="dateDebut" name="DateDebut" class="form-control" type="date" />
                    <ErrorMessage name="DateDebut" class="text-danger" />
                  </div>


                  <div class="col-md-4-3">
                    <label class="d-block text-black mb-10">
                      Service <span class="text-danger">*</span>
                    </label>
                    <Field name="organisation_id" type="text" v-slot="{ field }">
                      <Multiselect v-model="field.value" v-bind="field" :options="serviceOptions"
                        :preserve-search="true" :multiple="false" :searchable="true"
                        placeholder="Sélectionner l'organisation" label="label" track-by="value" />
                    </Field>
                    <ErrorMessage name="organisation_id" class="text-danger" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Valider</button>
                  <button type="button" class="btn btn-danger" aria-label="Close">
                    Annuler
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { Personnel } from "@/models/Personnel";
import ApiService from "@/services/ApiService";
import { format_date, showModal, hideModal, suppression, error, success } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import * as Yup from 'yup';
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "ListePersonnel",
  components: {
    PaginationComponent,
    Form,
    ErrorMessage,
    Field,
    Multiselect,
  },
  setup() {

    onMounted(() => {
      getAllPersonnels();
      getAllServices();
    });
    const personnelsSchema = Yup.object().shape({
      organisation_id: Yup.string().required("service est obligatoire"),
      DateDebut: Yup.string().required("La date de début est obligatoire"),
    });
    const personnelsForm = ref(null);
    const serviceOptions = ref([]);
    const personnels = ref<Array<Personnel>>([]);
    const personnel = ref<Personnel>();
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const dateDebut = ref(new Date().toISOString().split('T')[0]);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllPersonnels(page_, limit_);
      } catch (error) {
        //
      }
    };
    const ajout = async () => {
      console.log("message")
    };

    const addPersonnels = async (values, { resetForm }) => {
      values["personnel_id"] = personnelii.value;
      //values["serviceId"] = personnelii.value;
      console.log("values", values);
      // ApiService.put("/orgapersonnel/" + values.id, values)
      ApiService.post("/orgapersonnel/", values)
        .then(({ data }) => {
          console.log('personnel', data);
          if (data.code === 201) {
            success(data.message);
            resetForm();
            getAllPersonnels();
            triggerButtonClick("close-modal");
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const getAllServices = async () => {
      try {
        const response = await ApiService.get(
          "/all/recupererToutesOrganisationSansFilsAvecParent"
        );
        console.log("rfrrf ===> ", response);
        const servicesData = response.data.data;
        console.log("465484635418416541 ===> ", servicesData);

        serviceOptions.value = servicesData.map((service) => ({
          value: service.id,
          label: service.nom,
        }));

        console.log("RYYYYY ==> ", serviceOptions);
      } catch (error) {
        console.log("RYYYYY5252 ==> ", error);

      }
    };
    const personnelii = ref();
    const selectedPersonnel = ref<{ nom: string; prenom: string } | null>(null);

    const openModal = (id: number) => {
      personnelii.value = id;
      const personnel = personnels.value.find((p) => p.id === id);
      if (personnel) {
        selectedPersonnel.value = { nom: personnel.nom, prenom: personnel.prenom };
      }
      console.log("Personnel sélectionné", selectedPersonnel.value);
    };

    function rechercher() {
      getAllPersonnels(page.value, limit.value, searchTerm.value);
    }
    function getAllPersonnels(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`all/personnels?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          console.log("dataaa", data.data.data);
          personnels.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }
    function moddifier(Editpersonnels: Personnel) {
      personnel.value = Editpersonnels;
    }
    const deletePersonnel = (id: number) => {
      ApiService.delete(`/personnels/${id}`)
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

      for (let i = 0; i < personnels.value.length; i++) {
        if (personnels.value[i].id === id) {
          personnels.value.splice(i, 1);
        }
      }
    };

    function triggerButtonClick(buttonId: string) {
      const button = document.getElementById(buttonId) as HTMLButtonElement;
      if (button) {
        button.click();
      } else {
        console.error(`Button with ID "${buttonId}" not found.`);
      }
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }
    return {
      personnels,
      checkPermission,
      getAllPersonnels,
      getAllServices,
      deletePersonnel,
      moddifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      triggerButtonClick,
      personnelsSchema,
      personnelsForm,
      addPersonnels,
      ajout,
      openModal,
      serviceOptions,
      selectedPersonnel,
      dateDebut


    };
  },
});
</script>