<template>
  <div class="modal fade" id="AddClientModal" tabindex="-1" role="dialog" ref="addClientModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <Form ref="clientForm" @submit="addClient" :validation-schema="clientSchema">
          <div class="row">
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Statut<span class="text-danger">*</span>
                </label>
                <Field  name="statut" v-model="defaultStatut"  v-slot="{ field }">
                  <Multiselect
                    :options="statut"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le statut"
                    @select="handleObjetInput"
                  />
                </Field>  
              </div>
              <ErrorMessage name="estPublie" class="text-danger"/>
            </div>
            <div class="col-md-6 mb-3" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nomClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prénom <span class="text-danger">*</span>
                </label>
                <Field name="prenomClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresseClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresseClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Email <span class="text-danger">*</span>
                </label>
                <Field name="emailClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="emailClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sexe <span class="text-danger">*</span>
              </label>
              <Field  name="sexe"  type="text"  v-slot="{ field }">
                <Multiselect
                  :searchable = "true"
                  :options = "['Masculin', 'Féminin']"
                  v-model = "field.value"
                  v-bind = "field"
                  placeholder="Sélectionner le sexe"
                />
              </Field>
                <ErrorMessage name="sexe" class="text-danger"/>
            </div>
          </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 1 <span class="text-danger">*</span>
                </label>
                <Field name="telephone1" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone1" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 2 
                </label>
                <Field name="telephone2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3" v-if="showAdditionalFields">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de naissance <span class="text-danger">*</span>
                  </label>
                  <Field name="dateNais" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateNais" class="text-danger"/>
              </div>
            <div class="col-md-6 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSociale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSociale" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  IFU <span class="text-danger">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Régistre de commerce <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la denomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Catégorie du client<span class="text-danger">*</span>
                </label>
                <Field name="categorieClient" v-slot="{ field }">
                  <Multiselect :options="categorieClientOptions" :searchable="true" track-by="label" label="label"
                    v-model="field.value" v-bind="field" placeholder="Sélectionner la catégorie du client" />
                </Field>
                <ErrorMessage name="categorieClient" class="text-danger" />
              </div>
            </div>
            <div class="col-md-6" v-if="!showAdditionalFields">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de création <span class="text-danger">*</span>
                  </label>
                  <Field name="dateCreation" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateCreation" class="text-danger"/>
              </div>
            <div class="col-md-12 mb-3 mt-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un client
                </button>
                <router-link to="/clients/liste-clients" 
                    class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
      </div>
    </Form>
          </div>
          <!-- <button
            type="button"
            class="btn-close shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetValue()"
          ></button> -->
        </div>
      </div>
    </div>
  </template>

  
<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Client } from '@/models/Client';
import { useRouter } from "vue-router";
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default {
  name: "AddClientModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props:{
    item: {
      type: Number,
      default:0
    },
  },
  emits: ["getAllClients",'openmodal'],

  setup: (props, { emit }) => {

    const clientSchema = Yup.object().shape({
      nomClient: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le nom du client est obligatoire")
          : schema
      }),
      prenomClient: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le prénom du client est obligatoire")
          : schema
      }),
      sexe: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le sexe est obligatoire")
          : schema
      }),
      raisonSociale: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.required("Le nom du client est obligatoire")
          : schema
      }),
      dateCreation: Yup.date().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.required("La date est obligatoire")
          : schema
      }),
      dateNais: Yup.date().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("La date est obligatoire")
          : schema
      }),
      adresseClient: Yup.string().required('L\' adresse du client est obligatoire'),
      emailClient: Yup.string().email("Veuillez entrer un mail valide").required('L\'email est obligatoire'),
      telephone1: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone 1 est obligatoire'),
      telephone2: Yup.number().typeError('Veuillez entrer des chiffres').notRequired(),
      ifu: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'ifu est obligatoire'),
      sigle: Yup.string().notRequired(),
      denomination: Yup.string().notRequired(),
      statut: Yup.string().required('Le statut est obligatoire'),
    });

    const clientForm =  ref<Client | null>(null);
    const router = useRouter();
    const defaultStatut = ref(1);
    const showAdditionalFields = ref(true);
    const categorieClientOptions = ref([]);
    

    const handleObjetInput = (selectedValue) => {
      showAdditionalFields.value = selectedValue === 1;
    }

    const statut = 
      [
      {
          value: 1 ,
          label: "Personne physique"
      },
      {
          value: 2 ,
          label: "Personne Morale"
      }
    ];

    const fetchCategorieClient = async () => {
          try {
            const response = await ApiService.get('/all/categorieClient');
            const categorieClientData = response.data.data.data;
            categorieClientOptions.value = categorieClientData.map((categorie: any) => ({
              value: categorie.id,
              label: `${categorie.libelle}`,
            }));
            console.log('Catégories disponibles dans AddClient:', categorieClientOptions.value);
          } catch (err) {
            error('Erreur lors de la récupération des catégories clients');
            console.error('Erreur API catégories:', err);
          }
        };


      onMounted(async () => {
      fetchCategorieClient();
    });

    const clientnew = ref(props.item);
    const addClientModalRef = ref<null | HTMLElement>(null);
    let clients= ref<Array<Client>>([]);

     

    const addClient = async (values,{ resetForm }) => {
      values = values as Client;
        ApiService.post('/clients',values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            hideModal(addClientModalRef.value);
            emit('close');
            emit('getclient',data.data);
          }
        }).catch(({ response }) => {
          error(response.message);
        });
    }; 

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      formFields.forEach(field => {
        field.value = '';
      });
    };

    return {clients,resetValue, clientSchema, addClient,
       clientForm,addClientModalRef,clientnew,
       statut,showAdditionalFields,
        handleObjetInput,
        defaultStatut, categorieClientOptions};
  },
};
</script>