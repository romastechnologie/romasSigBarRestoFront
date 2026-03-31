<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="personnelForm" @submit="editPersonnel" :validation-schema="personnelSchema" :initial-values="personnelForm">
          
            <Field name="id" v-model="personnelId" type="hidden" />

            <div class="row">
            <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <Field v-model="nom" name="nom" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <Field v-model="prenom" name="prenom" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                  <ErrorMessage name="prenom" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Situation matrimoniale
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="situationMatrimoniale"
                                  v-model="situationMatrimoniale"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Célibataire',
                                      'Marié(e)',
                                      'Divorcée',
                                      'Veuve',
                                      'Concubinage',
                                      'Union libre',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la situation"
                                  />
                                </Field>
                              </div>
                            </div>

            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Pays de résidence
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="nationalite"
                                  v-model="nationalite"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="countries"
                                    :searchable="true"
                                    track-by="value"
                                    label="label"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner le pays"
                                  />
                                </Field>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Civilite <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="civilite"
                                  v-model="civilite"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="['Mr', 'Mme']"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la civilité"
                                  />
                                </Field>
                              </div>
                            </div>

                            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Email <span class="text-danger">*</span>
                </label>
                <Field name="email" type="string" v-model="email"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le mail"/>
                <ErrorMessage name="email" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Téléphone <span class="text-danger">*</span>
                </label>
                <Field name="telephone" type="string" v-model=telephone
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer telephone"/>
                <ErrorMessage name="telephone" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Telephone 2 <span class="text-danger"></span>
                </label>
                <Field name="telephone2" type="string" v-model="telephone2"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le telephone 2"/>
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Religion <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="religion"
                                  v-model="religion"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    v-model="field.value"
                                    v-bind="field"
                                    :options="religionOptions"
                                    :preserve-search="true"
                                    :multiple="false"
                                    :searchable="true"
                                    placeholder="Sélectionner la religion"
                                    label="label"
                                    track-by="label"
                                  />
                                </Field>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Ethnie <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="ethnie"
                                  v-model="ethnie"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    v-model="field.value"
                                    v-bind="field"
                                    :options="ethnieOptions"
                                    :preserve-search="true"
                                    :multiple="false"
                                    :searchable="true"
                                    placeholder="Sélectionner l'ethnie"
                                    label="label"
                                    track-by="label"
                                  />
                                </Field>
                              </div>
                            </div>      

                         <!--  <div class="col-md-4">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Service  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="service"
                                  v-model="organisation"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    v-model="field.value"
                                    v-bind="field"
                                    :options="serviceOptions"
                                    :preserve-search="true"
                                    :multiple="false"
                                    :searchable="true"
                                    placeholder="Sélectionner le service"
                                    label="label"
                                    track-by="label"
                                  />
                                </Field>
                              </div>
                            </div>--> 

                              <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Département <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="departement"
                                  v-model="departement"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="departementOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="field.value"
                                    v-bind="field"
                                    @change="departementChange($event)"
                                    placeholder="Sélectionner le departement"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Communes <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="commune"
                                  v-model="commune"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="communeOptions"
                                    @change="communeChange($event)"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedCommune"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord un département"
                                    placeholder="Sélectionner la commune"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Arrondissement
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="arrondissement"
                                  v-model="arrondissement"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="arrondissementOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedArrondissement"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord une commune"
                                    @change="arrondissementChange($event)"
                                    placeholder="Sélectionner l' arrondissement"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Quartier <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="quartier"
                                  v-model="quartier"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="quartierOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedQuartier"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord un arrondissement"
                                    placeholder="Sélectionner le quartier"
                                  />
                                </Field>
                              </div>
                            </div>
                         
                          <div class="col-md-12 mt-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label
                                class="d-block text-black fw-semibold mb-10"
                              >
                                Adresse <span class="text-danger">*</span>
                              </label>
                              <Field
                                name="adresse"
                                cols="20"
                                v-model="adresse"
                                rows="3"
                                as="textarea"
                                placeholder="Ex: M/ DOSSOU C/905"
                                v-slot="{ field }"
                                class="form-control shadow-none rounded-0 text-black"
                              >
                                <textarea
                                  v-model="field.value"
                                  class="form-control shadow-none rounded-0 text-black"
                                ></textarea>
                              </Field>
                            </div>
                          </div>
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier le personnel 
            </button>
            <router-link to="/liste-personnel" 
                class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Personnel} from '@/models/Personnel';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect';
import { countries } from "./countries";

export default defineComponent({
    name: "EditPersonnel",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect

  },
  setup: () => {
    const personnelSchema = Yup.object().shape({
  nom: Yup.string().required("Nom est obligatoire."),
  prenom: Yup.string().required("Prénom est obligatoire."),
  situationMatrimoniale: Yup.string().required("Situation est obligatoire."),
  email: Yup.string().required("Situation est obligatoire."),
  civilite: Yup.string().required("Civilité est obligatoire."),
  //pays: Yup.string().required("Pays est obligatoire."),
  religion: Yup.string().required("Réligion est obligatoire."),
  ethnie: Yup.string().required("Ethnie est obligatoire."),
  telephone: Yup.string().required("Téléphone est obligatoire."),
  telephone2: Yup.string().notRequired(),
  commune: Yup.string().required("Commune est obligatoire."),
  departement: Yup.string().required("Département est obligatoire."),
  arrondissement: Yup.string().required("Arrondissement est obligatoire."),
  quartier: Yup.string().required("Quartier est obligatoire."),
  adresse: Yup.string().required("Adrese est obligatoire."),
  nationalite: Yup.string().required("Nationalite est obligatoire."),
  
});
    const personnelForm = ref<Personnel>();
      const personnelId = ref();      
    const countriesRef = ref(countries);
    const selectedCommune = ref([]);
    const selectedArrondissement = ref([]);
    const selectedQuartier = ref([]);
    const departementOptions = ref([]);
    const communeOptions = ref([]);
    const arrondissementOptions = ref([]);
    const quartierOptions = ref([]);
    const arrondissement = ref();
    const quartier = ref();
    const commune = ref();
    const departement = ref();
    const adresse= ref();
    const nationalite = ref();
    const religion = ref();
    const religionOptions = ref([]);
    const ethnie = ref();
    const situationMatrimoniale = ref();
    const ethnieOptions = ref([]);
    const nom = ref();
    const prenom = ref();
    const email = ref();
    const telephone = ref();
    const telephone2 = ref();
    const civilite= ref();
    const serviceOptions = ref([]);
    const organisation = ref();


  
    const router = useRouter();
    const route = useRoute();


    const getAllReligions = async () => {
      try {
        const response = await ApiService.get("/all/religions");
        const religionsData = response.data.data.data;
        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
      } catch (error) {
      }
    }
    const getAllEthnies = async () => {
      try {
        const response = await ApiService.get("/all/ethnies");
        const ethniesData = response.data.data.data;

        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
      } catch (error) {
      }
    };

    function departementChange(value) {
      console.log("g,rl;m", value);
      if (value) {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get("/departements/communes/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            console.log("donnee", donnee);
            if (donnee.length > 0) {
              communeOptions.value = donnee.map((commune: any) => {
                return {
                  label: commune.libelle,
                  value: commune.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function communeChange(value) {
      if (value) {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get("/communes/arrondissements/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              arrondissementOptions.value = donnee.map(
                (arrondissement: any) => {
                  return {
                    label: arrondissement.libelle,
                    value: arrondissement.id,
                  };
                }
              );
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function arrondissementChange(value) {
      if (value) {
        quartierOptions.value = [];
        selectedQuartier.value = [];
        ApiService.get("/arrondissements/quartiers/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              quartierOptions.value = donnee.map((quartier: any) => {
                return {
                  label: quartier.libelle,
                  value: quartier.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        quartierOptions.value = [];
        selectedQuartier.value = [];
      }
    }

    const fetchDepartements = async () => {
      ApiService.get("/all/departements")
        .then(({ data }) => {
          console.log('departement',data);
          const donnees = data.data.data;
          departementOptions.value = donnees.map((departement) => {
            return {
              value: departement.id,
              label: `${departement.libelle}`,
            };
          });
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
        //error(response.data.message)
      }
    };


    
const  getPersonnel = async (id: number) => {
            console.log(id, "Personnel")
            return ApiService.get("/personnel/" + id)
                .then(({ data }) => {
                    const donnees = data.data;
                    console.log(donnees, 'donnéees');
                    nom.value=donnees?.nom;
                    prenom.value=donnees?.prenom;
                    civilite.value=donnees?.civilite;
                    email.value=donnees?.email;
                    telephone.value=donnees?.telephone;
                    telephone2.value=donnees?.telephone2;
                    religion.value=donnees?.religion.id; 
                    adresse.value= donnees?.adresse;  
                    situationMatrimoniale.value=donnees?.situationMatrimoniale;
                    nationalite.value=donnees?.nationalite;
                    departement.value=donnees?.departement.id;
                    commune.value=donnees?.commune;
                    arrondissement.value=donnees?.arrondissement;
                    quartier.value=donnees?.quartier;
                    adresse.value=donnees?.adresse; 
                    ethnie.value=donnees?.ethnie.id;
                    personnelId.value = donnees?.id;
                    if (donnees?.organisation_personnels?.length > 0) {
        const lastOrg = donnees.organisation_personnels[donnees.organisation_personnels.length - 1];
        organisation.value = lastOrg?.organisation?.id; 
      }
           
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

const editPersonnel = async (values, { resetForm }) => {
  console.log("Valeurs envoyées :", values);
  try {
    const response = await ApiService.put(`/personnels/${values.id}`, values);
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
     router.push({ name: "DetailsPersonnelPage" });
    }
  } catch (error) {
  //  console.error("Erreur lors de la modification :", error.response?.data?.message);
  }
};



    onMounted(async () => {
      await  fetchDepartements();
      await getAllReligions();
      await getAllEthnies();
      await getAllServices();
     if (route.params.id) {
       await getPersonnel(parseInt(route.params.id as string));
      }
    });

    return { 
      personnelSchema, 
      editPersonnel, 
      personnelForm, 
      quartierOptions,
      communeOptions,
      departementOptions,
      arrondissementOptions,
      departementChange,
      communeChange,
      arrondissementChange,
      selectedCommune,
      selectedArrondissement,
      selectedQuartier,
      commune,
      departement,
      adresse,
      quartier,
      arrondissement,
      countries: countriesRef,
      religionOptions,
      religion,
      ethnieOptions,
      ethnie,
      nationalite,
      situationMatrimoniale,
       nom,
     prenom,
    email,
     telephone,
    telephone2,
    civilite,
    personnelId,
    organisation,
    serviceOptions


    };
  },
});
</script>