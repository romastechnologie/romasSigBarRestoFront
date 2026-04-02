<template>
  <div class="card">
    <div class="card-header">
                <h5 class="">Detail du personnel</h5>
                <!----><!----><!---->
                <div class="w-100 d-flex justify-content-end">
                <router-link
              to="/personnelles/liste-personnel"
              class="btn btn-primary transition border-0 lh-1 justify-content-end"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              Retour
            </router-link>
              </div>
            </div>

    <div class="row product-page-main">
      <div class="col-sm-12">
        <div class="profile-section mb-4 p-3 border rounded">
          <div class="d-flex align-items-start justify-content-between">
            <div class="d-flex align-items-center">
              <img
                v-if="personnel?.photoEmploye"
                :src="getUrlApiForFiles(personnel.photoEmploye, 'Personnel')"
                alt="Profile"
                class="img-thumbnail"
                style="width: 120px; height: 120px"
              />
              <div class="ms-3">
                <div class="row">
                  <div
                    class="card-head box-shadow bg-white d-lg-flex align-items-center p-15 p-sm-20 p-md-25"
                  >
                    <div class="w-100 d-flex justify-content-end">
                      <router-link
                        v-if="personnel && personnel.id"
                        :to="{
                          name: 'EditPersonnellePage2',
                          params: { id: personnel.id },
                        }"
                        class="btn btn-primary transition border-0 lh-1 fw-medium"
                      >
                        <i
                          class="fas fa-arrow-left lh-1 me-1 position-relative top-2"
                        ></i>
                        Modifier
                      </router-link>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <strong>Nom:</strong>
                      {{ personnel?.nom || "Nom inconnu" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Prénom:</strong>
                      {{ personnel?.prenom || "Prénom inconnu" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Situation Matrimoniale:</strong>
                      {{ personnel?.situationMatrimoniale || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Civilité:</strong>
                      {{ personnel?.civilite || "Non renseigné" }}
                    </p>
                  </div>
                <!-- <div class="col-md-6">
                    <p>
                      <strong>Date de Naissance:</strong>
                      {{
                        personnel?.birthdate
                          ?.split("T")[0]
                          ?.split("-")
                          .reverse()
                          .join("-") || "Non renseigné"
                      }}
                    </p>
                  </div>--> 
                 <!--<div class="col-md-6">
                    <p>
                      <strong>Date d'Embauche:</strong>
                      {{
                        personnel?.dateEmbauche
                          ?.split("T")[0]
                          ?.split("-")
                          .reverse()
                          .join("-") || "Non renseigné"
                      }}
                    </p>
                  </div>--> 
                  <!--<div class="col-md-6">
                    <p>
                      <strong>Numéro Sécu Sociale:</strong>
                      {{ personnel?.numeroSecuriteSociale || "Non renseigné" }}
                    </p>
                  </div>-->
                  <div class="col-md-6">
                    <p>
                      <strong>Nationalité:</strong>
                      {{ personnel?.nationalite || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Religion:</strong>
                      {{ personnel?.religion?.libelle || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Ethnie:</strong>
                      {{ personnel?.ethnie?.libelle || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Date de naissance:</strong>
                      {{formatDate( personnel?.birthdate) || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Date Embauche:</strong>
                      {{formatDate(personnel?.dateEmbauche)  || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Date Embauche:</strong>
                      {{personnel?.sexe  || "Non renseigné" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="align-self-start"></div>
          </div>

          <div class="col-sm-12">
            <div class="d-flex align-items-center">
              <div class="accordion" id="additionalInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingAdditionalInfo">
                    <button
                      class="accordion-button btn-primary btn-sm"
                      type="button"
                      :class="{ collapsed: !isOpen, 'btn-blue': true }"
                      @click="toggleAccordion"
                      style="padding: 0.25rem 0.5rem; font-size: 0.875rem"
                    >
                      <i
                        :class="
                          isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up'
                        "
                      ></i>
                      Voir plus
                    </button>
                  </h2>
                  <div
                    id="collapseAdditionalInfo"
                    :class="{
                      'accordion-collapse collapse': true,
                      show: isOpen,
                    }"
                    aria-labelledby="headingAdditionalInfo"
                  >
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-md-6">
                          <p>
                            <strong>Boite postale:</strong>
                            {{ personnel?.boitePostale || "Nom inconnu" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Téléphone 1:</strong>
                            {{ personnel?.telephone || "Prénom inconnu" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Téléphone 2:</strong>
                            {{ personnel?.telephone2 || "Non renseigné" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Email:</strong>
                            {{ personnel?.email || "Non renseigné" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Adresse:</strong>
                            {{ personnel?.adresse || "Non renseigné" }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul
          class="nav nav-tabs border-tab nav-primary mb-3"
          id="top-tab"
          role="tablist"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              id="contact-info-tab"
              data-bs-toggle="tab"
              href="#contact-info"
              role="tab"
              aria-controls="contact-info"
              aria-selected="true"
            >
              <strong>Personne a contacter</strong>
            </a>
          </li>
        </ul>

        <div class="tab-content" id="top-tabContent">
          <div
            class="tab-pane fade show active"
            id="contact-info"
            role="tabpanel"
            aria-labelledby="contact-info-tab"
          >
          <table class="table" style="border: none;">
            <tbody>
              <tr>
                <td style="padding: 4px;">
                  <strong>Nom personne à contacter: </strong>{{ personnel?.nomPersonneAContacter || "Non renseigné" }}
                </td>
                <td style="padding: 4px;">
                  <strong>Prénom personne à contacter: </strong>{{ personnel?.prenomPersonneAContacter || "Non renseigné" }}
                </td>
              </tr>
              <tr>
                <td style="padding: 4px;">
                  <strong>Téléphone personne à contacter: </strong>{{ personnel?.telephonePersonneAContacter || "Non renseigné" }}
                </td>
                <td style="padding: 4px;">
                  <strong>Relation: </strong>{{ personnel?.relation || "Non renseigné" }}
                </td>
              </tr>
            </tbody>
          </table>

            <div class="mt-3">
              <button class="btn btn-success" @click="openModal('contact')">
                <i class="fa fa-edit lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Modifier</span>
              </button>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="family-info"
            role="tabpanel"
            aria-labelledby="family-info-tab"
            v-if="!['Divorcée', 'Veuve', 'Célibataire'].includes(personnel?.situationMatrimoniale)"
          >


            <div class="mt-3">
              <button
                class="btn btn-success"
                data-bs-target="#create-task"
                @click="openModal('family')"
              >
                <i class="fa fa-edit lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Modifier</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      class="modal fade"
      id="create-task"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{
                modalType === "contact" ? "Modifier Personne à Contacter" : ""
              }}
              {{ modalType === "family" ? "Modifier Conjoint et Enfants" : "" }}
              {{ modalType === "health" ? "Modifier Santé Physique" : "" }}
              {{
                modalType === "bank" ? "Modifier Informations Bancaires" : ""
              }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <template v-if="modalType === 'contact'">
              <form @submit.prevent="saveContactInfo">
                <div class="mb-3">
                  <label class="form-label">Nom personne à contacter</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.nomPersonneAContacter"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Prénom personne à contacter</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.prenomPersonneAContacter"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Téléphone</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.telephonePersonneAContacter"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Relation</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.relation"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { countries } from "./countries";
import {
  Form,
  Field,
  ErrorMessage,
  useFieldArray,
  useForm,
} from "vee-validate";
import {
  error,
  getUrlApiForFiles,
  success,
  showModal,
  hideModal,
  format_Date,
} from "@/utils/utils";
import Multiselect from "@vueform/multiselect";
export default defineComponent({
  name: "ViewPersonnel",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const personnel = ref(null);
    const route = useRoute();
    const isOpen = ref(false);
    const isModalOpen = ref(false);
    const modalType = ref("");
    const religion = ref();
    const religionOptions = ref([]);
    const banqueOptions = ref([]);
    const ethnie = ref();
    const ethnieOptions = ref([]);
    const countriesRef = ref(countries);
    const nombreEnfant = ref(null);
    const isDisable = ref(true);
    const enfantOptions = ref([]);
    const enfant = ref();
    const child = ref({
      id: "",
      nom: "",
      prenom: "",
      dateNaissance: "",
      sexe: "",
    });

    const activeEnfantId = ref(null);
    const activeEnfant = ref();
    const openModal = (type, enfantId = null) => {
      modalType.value = type;

      isModalOpen.value = true;
      const modalElement = document.getElementById("create-task");
      if (modalElement) {
        showModal(modalElement);
      }
    };
    const toggleAccordion = () => {
      isOpen.value = !isOpen.value;
    };
    const closeModal = () => {
      isModalOpen.value = false;
      const modalElement = document.getElementById("create-task");
      if (modalElement) {
        hideModal(modalElement);
      }
    };
    const regionn = ref();
    const ethnnie = ref();

    const getPersonnel = async (id: number) => {
      try {
          const { data } = await ApiService.get(`/personnel/${id}`);
          personnel.value = data.data;
      } catch (err) {
          error(err.response?.data?.message || "Erreur lors de la récupération des données.");
      }
  };

    const saveContactInfo = async () => {
      try {
        const response = await ApiService.put(
          `/personnels/${personnel.value.id}`,
          {
            nomPersonneAContacter: personnel.value.nomPersonneAContacter,
            prenomPersonneAContacter: personnel.value.prenomPersonneAContacter,
            telephonePersonneAContacter:
              personnel.value.telephonePersonneAContacter,
            relation: personnel.value.relation,
          }
        );
        if (response.data.code === 200) {
          success(response.data.message);
          closeModal();
        } else {
          error(
            "Une erreur est survenue lors de la mise à jour des informations de contact."
          );
        }
      } catch (err) {
        console.error(err);
        error(
          "Une erreur est survenue lors de la mise à jour des informations de contact."
        );
      }
    };

    const getAllReligions = async () => {
      try {
        const response = await ApiService.get("/all/religions");
        const religionsData = response.data.data.data;
        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
      } catch (error) {}
    };

    const getAllEthnies = async () => {
      try {
        const response = await ApiService.get("/all/ethnies");
        const ethniesData = response.data.data.data;
        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
      } catch (error) {}
    };
    watch(regionn, (newVal)=>{
      var type = null;
      if(newVal){
        type = religionOptions.value.find((reg => reg.value == newVal))
      }
    })
    watch(ethnnie, (newVal)=>{
      var type = null;
      if(newVal){
        type = ethnieOptions.value.find((reg => reg.value == newVal))
      }
 
    })

    const formatDate = (dateString: string) => {
      if (!dateString) return "Non spécifiée";
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Format invalide"
        : date.toLocaleDateString("fr-FR");
    };
    onMounted(async () => {
      await getAllReligions();
      await getAllEthnies();
      if (route.params.id) {
      await  getPersonnel(parseInt(route.params.id as string));
      }
    });
    return {
      personnel,
      formatDate,
      getUrlApiForFiles,
      isOpen,
      toggleAccordion,
      modalType,
      isModalOpen,
      openModal,
      closeModal,
      religionOptions,
      religion,
      ethnieOptions,
      ethnie,
      regionn,
      ethnnie,
      countries: countriesRef,
      nombreEnfant,
      enfantOptions,
      isDisable,
      format_Date,
      child,
      saveContactInfo
    };
  },
});
</script>
<style scoped>
.btn-blue {
  background-color: var(--bs-primary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
}
.btn-blue i {
  margin-right: 8px;
}
.btn-blue:hover {
  background-color: #0056b3;
  color: whit;
}
.accordion-button {
  background-color: transparent;
}
.table th, .table td {
  padding: 4px;
  border: none;
}

</style>
