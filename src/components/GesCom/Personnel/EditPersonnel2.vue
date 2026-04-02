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
              <!-- Après téléphone 2, avant religion -->

              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Sexe <span class="text-danger">*</span>
                  </label>
                  <Field name="sexe" v-model="sexe" type="text" v-slot="{ field }">
                    <Multiselect
                      :searchable="true"
                      :options="['Masculin', 'Féminin']"
                      v-model="field.value"
                      v-bind="field"
                      placeholder="Sélectionner le sexe"
                    />
                  </Field>
                  <ErrorMessage name="sexe" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">Nationalité <span class="text-danger">*</span></label>
                  <Field name="nationalite" v-model="nationalite" type="text"
                    class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nationalité"/>
                  <ErrorMessage name="nationalite" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">Boite Postale</label>
                  <Field name="boitePostale" v-model="boitePostale" type="text"
                    class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la boite postale"/>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">Date de naissance</label>
                  <Field name="birthdate" v-model="birthdate" type="date"
                    class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">Date d'embauche <span class="text-danger">*</span></label>
                  <Field name="dateEmbauche" v-model="dateEmbauche" type="date"
                    class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="dateEmbauche" class="text-danger"/>
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
            <router-link to="/personnelles/liste-personnel" 
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
      email: Yup.string().email("Email invalide").required("Email est obligatoire."),
      civilite: Yup.string().required("Civilité est obligatoire."),
      religion: Yup.mixed().required("Religion est obligatoire."),
      ethnie: Yup.mixed().required("Ethnie est obligatoire."),
      telephone: Yup.string().required("Téléphone est obligatoire."),
      telephone2: Yup.string().notRequired(),
      adresse: Yup.string().required("Adresse est obligatoire."),
      nationalite: Yup.string().required("Nationalité est obligatoire."),
      boitePostale: Yup.string().notRequired(),
      sexe: Yup.string().required("Sexe est obligatoire."),
      birthdate: Yup.date().notRequired(),
      dateEmbauche: Yup.date().notRequired(),
      // ✅ Supprimé : commune, departement, arrondissement, quartier
      // car absents du formulaire
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
    const nationalite= ref();
    const sexe= ref();
    const dateEmbauche=ref();
    const boitePostale= ref();
    const serviceOptions = ref([]);
    const organisation = ref();
    const birthdate = ref();


  
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

const  getPersonnel = async (id: number) => {
            console.log(id, "Personnel")
            return ApiService.get("/personnel/" + id)
                .then(({ data }) => {
                    const donnees = data.data;
                    console.log(donnees, 'donnéees');
                    nom.value = donnees?.nom;
                    prenom.value = donnees?.prenom;
                    sexe.value = donnees?.sexe;
                    dateEmbauche.value= donnees?.dateEmbauche;
                    birthdate.value = donnees?.birthdate;
                    boitePostale.value = donnees?.boitePostale;
                    civilite.value=donnees?.civilite;
                    email.value=donnees?.email;
                    telephone.value=donnees?.telephone;
                    telephone2.value=donnees?.telephone2;
                    religion.value=donnees?.religion.id; 
                    adresse.value= donnees?.adresse;  
                    situationMatrimoniale.value=donnees?.situationMatrimoniale;
                    nationalite.value=donnees?.nationalite;
                    adresse.value=donnees?.adresse; 
                    ethnie.value=donnees?.ethnie.id;
                    personnelId.value = donnees?.id;
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

const editPersonnel = async (values, { resetForm }) => {
    try {
        // ✅ Mapper religion et ethnie correctement
        const payload = {
            ...values,
            religion: values.religion?.value ?? values.religion,
            ethnie:   values.ethnie?.value   ?? values.ethnie,
        };

        // ✅ Supprimer les champs non désirés
        delete payload.nomPersonneAContacter;
        delete payload.prenomPersonneAContacter;
        delete payload.telephonePersonneAContacter;
        delete payload.relation;
        delete payload.fonctions;

        const response = await ApiService.put(`/personnels/${values.id}`, payload);

        if (response.status === 200) {
            success(response.data.message);
            resetForm();
            router.push({ name: "ViewPersonnellePage", params: { id: values.id } });
        }
    } catch (err) {
        error(err.response?.data?.message || "Erreur lors de la modification.");
    }
};



    onMounted(async () => {
      await getAllReligions();
      await getAllEthnies();
     if (route.params.id) {
       await getPersonnel(parseInt(route.params.id as string));
      }
    });

    return { 
      personnelSchema, 
      editPersonnel, 
      personnelForm, 
      adresse,
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
      dateEmbauche,
      birthdate,
      boitePostale,
      sexe


    };
  },
});
</script>