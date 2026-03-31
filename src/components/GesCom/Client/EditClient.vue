<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-client-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="clientForm" @submit="editClient" :validation-schema="clientSchema" :initial-values="clientForm" v-slot="{ errors }">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Statut<span class="text-danger">*</span>
              </label>
              <Field name="statut" v-model="defaultStatut" v-slot="{ field }">
                <Multiselect
                  :options="statut"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le statut"
                  @select="handleObjetInput"
                />
              </Field>
              <ErrorMessage name="statut" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom du client <span class="text-danger">*</span>
              </label>
              <Field name="nomClient" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
              <ErrorMessage name="nomClient" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Prénom du client<span class="text-danger">*</span>
              </label>
              <Field name="prenomClient" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
              <ErrorMessage name="prenomClient" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Civilite <span class="text-danger">*</span>
              </label>
              <Field name="civilite" v-slot="{ field }">
                <Multiselect
                  :options="['M.', 'Mme']"
                  :searchable="true"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner la civilité"
                />
              </Field>
              <ErrorMessage name="civilite" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type de pièce <span class="text-danger">*</span>
              </label>
              <Field name="piece" v-slot="{ field }">
                <Multiselect
                  :options="pieceOptions"
                  :searchable="true"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le type de pièce"
                />
              </Field>
              <ErrorMessage name="piece" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Numéro de pièce : <span class="text-danger">*</span>
              </label>
              <Field name="numeroPiece" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le numéro de pièce"/>
              <ErrorMessage name="numeroPiece" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date d'expiration<span class="text-danger">*</span>
              </label>
              <Field name="dateExpiration" type="date" :min="currentDate"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateExpiration" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sigle
              </label>
              <Field name="sigle" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
              <ErrorMessage name="sigle" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom Commercial
              </label>
              <Field name="nomCommercial" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom commercial"/>
              <ErrorMessage name="nomCommercial" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Raison sociale <span class="text-danger">*</span>
              </label>
              <Field name="raisonSociale" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
              <ErrorMessage name="raisonSociale" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                IFU <span class="text-danger" v-if="!showAdditionalFields">*</span>
              </label>
              <Field name="ifu" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
              <ErrorMessage name="ifu" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Régistre de commerce <span class="text-danger">*</span>
              </label>
              <Field name="rccm" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
              <ErrorMessage name="rccm" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Pays de résidence <span class="text-danger">*</span>
              </label>
              <Field name="paysResidence" v-model="pay" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="pays" :searchable="true"
                  placeholder="Sélectionner le pays de résidence" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="paysResidence" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mb-3" v-if="pay=='Bénin'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Quartier de résidence<span class="text-danger">*</span>
              </label>
              <Field name="quartier" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" placeholder="Rechercher un quartier"
                  :filter-results="false" :min-chars="2" :resolve-on-load="false" :delay="0" :searchable="true"
                  :options-limit="300" 
                  :options="(!rechercheInitier) ? quartierOptions : (async (query) => {
                      return await fechQuartiers(query)
                  })"
                  :no-options-text="noOptionsTextQuatier"
                  @search-change="handleSearchChange" />
              </Field>
              <ErrorMessage name="quartier" class="text-danger" />
            </div>  
          </div>
          <div class="col-md-4 mb-3" v-if="pay!='Bénin'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Région de résidence<span class="text-danger">*</span>
              </label>
              <Field name="region" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer votre région" />
              <ErrorMessage name="region" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="pay!='Bénin'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Ville de résidence<span class="text-danger">*</span>
              </label>
              <Field name="ville" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer votre ville" />
              <ErrorMessage name="ville" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Adresse
              </label>
              <Field name="adresseClient" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
              <ErrorMessage name="adresseClient" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email
              </label>
              <Field name="emailClient" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
              <ErrorMessage name="emailClient" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone 1 <span class="text-danger">*</span>
              </label>
              <Field name="telephone1" v-model="telephone1" v-slot="{ field }">
                <vue-tel-input
                  placeholder="Entrer le numéro de téléphone"
                  v-model="field.value"
                  v-bind="field"
                  defaultCountry="BJ"
                  mode="international"
                  @validate="validatePhone($event, 'telephone1')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephone1 && !validPhone.telephone1" class="text-danger">Veuillez entrer un numéro correct</div>
              <ErrorMessage name="telephone1" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone 2
              </label>
              <Field name="telephone2" v-model="telephone2" v-slot="{ field }">
                <vue-tel-input
                  placeholder="Entrer le numéro de téléphone"
                  v-model="field.value"
                  v-bind="field"
                  defaultCountry="BJ"
                  mode="international"
                  @validate="validatePhone($event, 'telephone2')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephone2 && !validPhone.telephone2" class="text-danger">Veuillez entrer un numéro correct</div>
              <ErrorMessage name="telephone2" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de naissance
              </label>
              <Field name="dateNais" type="date" :max="currentDate"
                class="form-control shadow-none fs-md-15 text-black"/>
              <ErrorMessage name="dateNais" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de création
              </label>
              <Field name="dateCreation" type="date" :max="currentDate"
                class="form-control shadow-none fs-md-15 text-black"/>
              <ErrorMessage name="dateCreation" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom et Prénoms de la personne à contacter <span class="text-danger">*</span>
              </label>
              <Field name="personneAContacter" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom et les prénoms du contact"/>
              <ErrorMessage name="personneAContacter" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone de la personne à contacter <span class="text-danger">*</span>
              </label>
              <Field name="telephonePersonneAContacter"  v-model="telephonePersonneAContacter"  v-slot="{ field }">
                <vue-tel-input
                  placeholder="Entrer le numéro de téléphone"
                  v-model="field.value"
                  v-bind="field"
                  defaultCountry="BJ"
                  mode="international"
                  @validate="validatePhone($event, 'telephonePersonneAContacter')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephonePersonneAContacter && !validPhone.telephonePersonneAContacter" class="text-danger">Veuillez entrer un numéro correct</div>
              <ErrorMessage name="telephonePersonneAContacter" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Promoteur <span class="text-danger">*</span>
              </label>
              <Field name="promoteur" v-slot="{ field }">
                <Multiselect v-model="field.value" :options="clientOptions" :searchable="true" track-by="label"
                  label="label" placeholder="Sélectionner le promoteur" v-bind="field" />
              </Field>
              <ErrorMessage name="promoteur" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Gérant <span class="text-danger">*</span>
              </label>
              <Field name="gerant" v-slot="{ field }">
                <Multiselect v-model="field.value" :options="clientOptions" :searchable="true" track-by="label"
                  label="label" placeholder="Sélectionner le gérant" v-bind="field" />
              </Field>
              <ErrorMessage name="gerant" class="text-danger" />
            </div>
          </div>
          <!-- <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom et Prénoms du représentant
              </label>
              <Field name="personneRepresentant" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom et les prénoms du représentant" />
              <ErrorMessage name="personneRepresentant" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone du représentant
              </label>
              <Field name="telephoneRepresentant"  v-model="telephoneRepresentant" v-slot="{ field }">
                <vue-tel-input
                  placeholder="Entrer le numéro de téléphone"
                  v-model="field.value"
                  v-bind="field"
                  defaultCountry="BJ"
                  mode="international"
                  @validate="validatePhone($event, 'telephoneRepresentant')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephoneRepresentant && !validPhone.telephoneRepresentant" class="text-danger">Veuillez entrer un numéro correct</div>
              <ErrorMessage name="telephoneRepresentant" class="text-danger" />
            </div>
          </div> -->
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button ref="submitButton" class="btn btn-success me-3" type="submit">
                Modifier un client
              </button>
              <router-link to="/clients/liste-clients" class="btn btn-danger">
                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler
              </router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import { Client } from '@/models/Client';
import Multiselect from '@vueform/multiselect';
import 'vue3-tel-input/dist/vue3-tel-input.css';
import { VueTelInput } from 'vue3-tel-input';
import { useForm } from 'vee-validate';

export default defineComponent({
  name: "EditClient",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueTelInput
  },
  setup: () => {
    const currentDate = ref(new Date().toISOString().split('T')[0]);
    const clientForm = ref<Client | null>(null);
    const router = useRouter();
    const route = useRoute();
    const defaultStatut = ref(1);
    const showAdditionalFields = ref(true);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const pieceOptions = ref([]);
    const pay = ref('Bénin');
    const telephone1 = ref('');
    const telephone2 = ref('');
    const telephonePersonneAContacter = ref('');
    const telephoneRepresentant = ref('');
    const validPhone = ref({
      telephone1: true,
      telephone2: true,
      telephonePersonneAContacter: true,
      telephoneRepresentant: true,
    });

    const { errors, validate } = useForm();

    const clientOptions = ref([]);
    const quartierOptions = ref([]);
    const rechercheInitier = ref(false);
    const noOptionsTextQuatier = ref("Tapez au moins deux caractères");
    const handleSearchChange = async (query) => {
      rechercheInitier.value = true;
    };

    // const clientSchema = Yup.object().shape({
    //   nomClient: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("Le nom du client est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   prenomClient: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("Le prénom du client est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   civilite: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("La civilité est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   raisonSociale: Yup.string().when([], (value, schema) => {
    //     return !showAdditionalFields.value
    //       ? schema.required("La raison sociale est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   rccm: Yup.string().when([], (value, schema) => {
    //     return !showAdditionalFields.value
    //       ? schema.required("Le rccm est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   dateCreation: Yup.date().when([], (value, schema) => {
    //     return !showAdditionalFields.value
    //       ? schema.notRequired()
    //       : schema.notRequired();
    //   }),
    //   dateNais: Yup.date().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.notRequired()
    //       : schema.notRequired();
    //   }),
    //   piece: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("La pièce est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   numeroPiece: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("Le numéro est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   dateExpiration: Yup.date().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("La date d'expiration est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   ifu: Yup.string()
    //     .matches(/^\d{13}$/, 'La saisie doit avoir exactement 13 chiffres')
    //     .when([], (value, schema) => {
    //       return !showAdditionalFields.value
    //         ? schema
    //             .min(13, "La saisie doit avoir exactement 13 chiffres")
    //             .max(13, "La saisie doit avoir exactement 13 chiffres")
    //             .required("L'ifu est obligatoire")
    //         : schema
    //             .min(13, "La saisie doit avoir exactement 13 chiffres")
    //             .max(13, "La saisie doit avoir exactement 13 chiffres");
    //     }),
    //   adresseClient: Yup.string().required('L\'adresse est obligatoire'),
    //   emailClient: Yup.string().email("Veuillez entrer un mail valide").notRequired(),
    //   telephone1: Yup.string()
    //     .typeError('Veuillez entrer des chiffres')
    //     .required('Le telephone 1 est obligatoire'),
    //   telephone2: Yup.string().typeError('Veuillez entrer des chiffres').notRequired(),
    //   sigle: Yup.string().notRequired(),
    //   nomCommercial: Yup.string().when([], (value, schema) => {
    //     return !showAdditionalFields.value ? schema.notRequired() : schema;
    //   }),
    //   statut: Yup.string().required('Le statut est obligatoire'),

    //   personneAContacter: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value
    //       ? schema.required("Le nom et prénoms sont obligatoires")
    //       : schema.notRequired();
    //   }),
    //   telephonePersonneAContacter: Yup.string()
    //     .typeError('Veuillez entrer des chiffres')
    //     .required('Le telephone du contact est obligatoire'),

    //   personneRepresentant: Yup.string().when([], (value, schema) => {
    //     return showAdditionalFields.value ? schema.notRequired() : schema.required("Le nom et prénoms du représentant sont obligatoires");
    //   }),
    //   promoteur: Yup.string().when([], (value, schema) => {
    //     return !showAdditionalFields.value
    //       ? schema.required("Le promoteur est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   gerant: Yup.string().when([], (value, schema) => {
    //     return !showAdditionalFields.value
    //       ? schema.required("Le gérant est obligatoire")
    //       : schema.notRequired();
    //   }),
    //   paysResidence: Yup.string().required('Le pays de résidence est obligatoire'),
    //   telephoneRepresentant: Yup.string()
    //     .typeError('Veuillez entrer des chiffres')
    //     .when([], (value, schema) => {
    //       return !showAdditionalFields.value ? schema.notRequired() : schema.required("Le téléphone du représentant est obligatoire");
    //     }),
    //     quartier: Yup.string().when([], (value, schema) => {
    //       return paysResidence === 'Bénin'
    //         ? schema.required('Le quartier est obligatoire')
    //         : schema.notRequired();
    //     }),
    //   ville: Yup.string().when('paysResidence', (paysResidence:string, schema) => {
    //     return paysResidence !== 'Bénin'
    //       ? schema.required('La ville est obligatoire')
    //       : schema.notRequired();
    //   }),
    //   region: Yup.string().when('paysResidence', (paysResidence: string, schema) => {
    //     return paysResidence !== 'Bénin'
    //       ? schema.required('La région est obligatoire')
    //       : schema.notRequired();
    //   }),
      
    // });

    const clientSchema = Yup.object().shape({
      nomClient: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("Le nom du client est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      prenomClient: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("Le prénom du client est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      civilite: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("La civilité est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      raisonSociale: Yup.string().when([], {
        is: () => showAdditionalFields.value === false,
        then: schema => schema.required("La raison sociale est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      rccm: Yup.string().when([], {
        is: () => showAdditionalFields.value === false,
        then: schema => schema.required("Le rccm est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      dateCreation: Yup.date().notRequired(),
      dateNais: Yup.date().notRequired(),
      piece: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("La pièce est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      numeroPiece: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("Le numéro est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      dateExpiration: Yup.date().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("La date d'expiration est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      ifu: Yup.string()
        .matches(/^\d{13}$/, "La saisie doit avoir exactement 13 chiffres")
        .when([], {
          is: () => showAdditionalFields.value === false,
          then: schema => schema.required("L'ifu est obligatoire"),
          otherwise: schema => schema.notRequired(),
        }),
      adresseClient: Yup.string().required("L'adresse est obligatoire"),
      emailClient: Yup.string().email("Veuillez entrer un mail valide").notRequired(),
      telephone1: Yup.string()
        .typeError("Veuillez entrer des chiffres")
        .required("Le telephone 1 est obligatoire"),

      telephone2: Yup.string().notRequired(),
      sigle: Yup.string().notRequired(),
      nomCommercial: Yup.string().notRequired(),
      statut: Yup.string().required("Le statut est obligatoire"),
      personneAContacter: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("Le nom et prénoms sont obligatoires"),
        otherwise: schema => schema.notRequired(),
      }),
      telephonePersonneAContacter:Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("Le telephone du contact est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      // personneRepresentant: Yup.string().when([], {
      //   is: () => showAdditionalFields.value === false,
      //   then: schema => schema.required("Le nom et prénoms du représentant sont obligatoires"),
      //   otherwise: schema => schema.notRequired(),
      // }),
      // telephoneRepresentant: Yup.string()
      //   .typeError("Veuillez entrer des chiffres")
      //   .when([], {
      //     is: () => showAdditionalFields.value === false,
      //     then: schema => schema.required("Le téléphone du représentant est obligatoire"),
      //     otherwise: schema => schema.notRequired(),
      //   }),
      promoteur: Yup.string().when([], {
        is: () => showAdditionalFields.value === false,
        then: schema => schema.required("Le promoteur est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      gerant: Yup.string().when([], {
        is: () => showAdditionalFields.value === false,
        then: schema => schema.required("Le gérant est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      
      quartier: Yup.string().when('paysResidence', {
        is: (val: string) => val === 'Bénin',
        then: schema => schema.required('Le quartier est obligatoire').typeError('Veuillez renseigner votre quartier'),
        otherwise: schema => schema.notRequired(),
      }),
      ville: Yup.string().when('paysResidence', {
        is: (val: string) => val !== 'Bénin',
        then: schema => schema.required('La ville est obligatoire').typeError('Veuillez renseigner votre ville'),
        otherwise: schema => schema.notRequired(),
      }),
      region: Yup.string().when('paysResidence', {
        is: (val: string) => val !== 'Bénin',
        then: schema => schema.required('La région est obligatoire').typeError('Veuillez renseigner votre région'),
        otherwise: schema => schema.notRequired(),
      }),
      paysResidence: Yup.string().required('Le pays de résidence est obligatoire'),
    });

    const fechQuartiers = async (key) => {
      try {
        const { data } = await ApiService.get(`/zone/quartiers/${key}`);
        quartierOptions.value = data.data.data.map((item) => ({
          value: item.id,
          label: item.libelle + " [ " + item?.arrondissement?.libelle + " ] [ " + item?.arrondissement?.commune?.libelle + " ] [ " + item?.arrondissement?.commune?.departement?.libelle + " ]",
        }));
        return quartierOptions.value;
      } catch (error) {
        console.error("Error fetching quartiers:", error);
      }
    };

    const getAllPiece = async () => {
      try {
        const response = await ApiService.get('/pieces');
        const piecesData = response.data.data;
        pieceOptions.value = piecesData.map((piece: any) => ({
          value: piece.id,
          label: piece.libelle,
        }));
      } catch (err) {
        error(err.message);
      }
    };

    const getAllClients = async () => {
      try {
        const response = await ApiService.get('/all/clients');
        const clientData: Client[] = response.data.data;
        clientOptions.value = clientData
          .filter((client) => client.nomClient && client.prenomClient)
          .map((client) => ({
            value: client.id,
            label: `${client.nomClient} ${client.prenomClient}`,
          }));
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };

    const getQuartier = async (id) => {
      try {
      const response = await ApiService.get('/quartiers/'+id);
        quartierOptions.value = response.data.map((quartier) => ({
            value: quartier.id,
            label: `${quartier.libelle} [ ${quartier.arrondissement.libelle} ] [ ${quartier.arrondissement.commune.libelle} ] [ ${quartier.arrondissement.commune.departement.libelle} ]`,
          }));
        console.log("quartierOptions.value", quartierOptions.value);
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };

    const validatePhone = (phoneObject: any, fieldName: string) => {
      validPhone.value[fieldName] = phoneObject.valid || false;
      if (phoneObject.valid) {
        switch (fieldName) {
          case 'telephone1':
            telephone1.value = phoneObject.number;
            break;
          case 'telephone2':
            telephone2.value = phoneObject.number;
            break;
          case 'telephonePersonneAContacter':
            telephonePersonneAContacter.value = phoneObject.number;
            break;
          case 'telephoneRepresentant':
            telephoneRepresentant.value = phoneObject.number;
            break;
        }
      } else {
        switch (fieldName) {
          case 'telephone1':
            telephone1.value = '';
            break;
          case 'telephone2':
            telephone2.value = '';
            break;
          case 'telephonePersonneAContacter':
            telephonePersonneAContacter.value = '';
            break;
          case 'telephoneRepresentant':
            telephoneRepresentant.value = '';
            break;
        }
      }
    };

    function getClient(id: number) {
      ApiService.get(`/clients/${id}`)
        .then(({ data }) => {
          if (!data?.data) {
            throw new Error('Aucune donnée client reçue');
          }
          console.log("data clients clients", data.data);
          const clientData = data.data;
          //clientForm.value = data.data;
          for (const key in data.data) {
            console.log("key", key, "value", data.data[key],clientData.nomClient, clientData.prenomClient, clientData.civilite);
            const value = data.data[key];
            console.log(clientForm.value,"clientForm.value");
            if (key === 'telephone1') {
              telephone1.value = value || '';
            } else if (key === 'telephone2') {
              telephone2.value = value || '';
            } else if (key === 'telephonePersonneAContacter') {
              telephonePersonneAContacter.value = value || '';
            } else if (key === 'telephoneRepresentant') {
              telephoneRepresentant.value = value || '';
            } else if (key === 'paysResidence') {
              pay.value = value || 'Bénin';
              clientForm.value[key] = value;
            }else if (key === 'quartier') {
              console.log("value quartier", value);
              if (value) {
                getQuartier(value.id);
                clientForm.value?.setFieldValue(key, value.id || null);
              } else {
                clientForm.value?.setFieldValue(key, null);
              }
            } else {
               (typeof value == 'object' && value !== null )?  clientForm.value?.setFieldValue(key, value?.id || null) :  clientForm.value?.setFieldValue(key, value || null);
            }
          }
          showAdditionalFields.value = clientData.statut == 1;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du client:', error);
          error(error.message || 'Une erreur est survenue');
        });
    }

    const editClient = async (values, { resetForm }) => {
      const { valid, errors } = await validate()
      console.log("valid", valid, "errors", errors);
      console.log("values", values);
      if (!values.id) {
        error("L'ID du client est requis pour la modification.");
        return;
      }
      if (submitButton.value) {
        submitButton.value.disabled = true;
      }
      ApiService.put(`/clients/${values.id}`, values)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeClient" });
          }
        })
        .catch(({ response }) => {
          if (submitButton.value) {
            submitButton.value.disabled = false;
          }
          error(response.data.message);
        });
    };

    const pays = [
      "Afghanistan",
      "Afrique du Sud",
      "Albanie",
      "Algérie",
      "Allemagne",
      "Andorre",
      "Angola",
      "Anguilla",
      "Antarctique",
      "Antigua-et-Barbuda",
      "Antilles Néerlandaises",
      "Arabie Saoudite",
      "Argentine",
      "Arménie",
      "Aruba",
      "Australie",
      "Autriche",
      "Azerbaïdjan",
      "Bahamas",
      "Bahreïn",
      "Bangladesh",
      "Barbade",
      "Bélarus",
      "Belgique",
      "Belize",
      "Bénin",
      "Bermudes",
      "Bhoutan",
      "Bolivie",
      "Bosnie-Herzégovine",
      "Botswana",
      "Brésil",
      "Brunéi Darussalam",
      "Bulgarie",
      "Burkina Faso",
      "Burundi",
      "Cambodge",
      "Cameroun",
      "Canada",
      "Cap-vert",
      "Chili",
      "Chine",
      "Chypre",
      "Colombie",
      "Comores",
      "Costa Rica",
      "Côte d'Ivoire",
      "Croatie",
      "Cuba",
      "Danemark",
      "Djibouti",
      "Dominique",
      "Égypte",
      "El Salvador",
      "Émirats Arabes Unis",
      "Équateur",
      "Érythrée",
      "Espagne",
      "Estonie",
      "États Fédérés de Micronésie",
      "États-Unis",
      "Éthiopie",
      "Fédération de Russie",
      "Fidji",
      "Finlande",
      "France",
      "Gabon",
      "Gambie",
      "Géorgie",
      "Géorgie du Sud et les Îles Sandwich du Sud",
      "Ghana",
      "Gibraltar",
      "Grèce",
      "Grenade",
      "Groenland",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guinée",
      "Guinée Équatoriale",
      "Guinée-Bissau",
      "Guyana",
      "Guyane Française",
      "Haïti",
      "Honduras",
      "Hong-Kong",
      "Hongrie",
      "Île Bouvet",
      "Île Christmas",
      "Île de Man",
      "Île Norfolk",
      "Îles (Malvinas) Falkland",
      "Îles Åland",
      "Îles Caïmanes",
      "Îles Cocos (Keeling)",
      "Îles Cook",
      "Îles Féroé",
      "Îles Heard et McDonald",
      "Îles Mariannes du Nord",
      "Îles Marshall",
      "Îles Mineures Éloignées des États-Unis",
      "Îles Salomon",
      "Îles Turks et Caïques",
      "Îles Vierges Britanniques",
      "Îles Vierges des États-Unis",
      "Inde",
      "Indonésie",
      "Irak",
      "Irlande",
      "Islande",
      "Israël",
      "Italie",
      "Jamahiriya Arabe Libyenne",
      "Jamaïque",
      "Japon",
      "Jordanie",
      "Kazakhstan",
      "Kenya",
      "Kirghizistan",
      "Kiribati",
      "Koweït",
      "L'ex-République Yougoslave de Macédoine",
      "Lesotho",
      "Lettonie",
      "Liban",
      "Libéria",
      "Liechtenstein",
      "Lituanie",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malaisie",
      "Malawi",
      "Maldives",
      "Mali",
      "Malte",
      "Maroc",
      "Martinique",
      "Maurice",
      "Mauritanie",
      "Mayotte",
      "Mexique",
      "Monaco",
      "Mongolie",
      "Montserrat",
      "Mozambique",
      "Myanmar",
      "Namibie",
      "Nauru",
      "Népal",
      "Nicaragua",
      "Niger",
      "Nigéria",
      "Niué",
      "Norvège",
      "Nouvelle-Calédonie",
      "Nouvelle-Zélande",
      "Oman",
      "Ouganda",
      "Ouzbékistan",
      "Pakistan",
      "Palaos",
      "Panama",
      "Papouasie-Nouvelle-Guinée",
      "Paraguay",
      "Pays-Bas",
      "Pérou",
      "Philippines",
      "Pitcairn",
      "Pologne",
      "Polynésie Française",
      "Porto Rico",
      "Portugal",
      "Qatar",
      "République Arabe Syrienne",
      "République Centrafricaine",
      "République de Corée",
      "République de Moldova",
      "République Démocratique du Congo",
      "République Démocratique Populaire Lao",
      "République Dominicaine",
      "République du Congo",
      "République Islamique d'Iran",
      "République Populaire Démocratique de Corée",
      "République Tchèque",
      "République-Unie de Tanzanie",
      "Réunion",
      "Roumanie",
      "Royaume-Uni",
      "Rwanda",
      "Sahara Occidental",
      "Saint-Kitts-et-Nevis",
      "Saint-Marin",
      "Saint-Pierre-et-Miquelon",
      "Saint-Siège (État de la Cité du Vatican)",
      "Saint-Vincent-et-les Grenadines",
      "Sainte-Hélène",
      "Sainte-Lucie",
      "Samoa",
      "Samoa Américaines",
      "Sao Tomé-et-Principe",
      "Sénégal",
      "Serbie-et-Monténégro",
      "Seychelles",
      "Sierra Leone",
      "Singapour",
      "Slovaquie",
      "Slovénie",
      "Somalie",
      "Soudan",
      "Sri Lanka",
      "Suède",
      "Suisse",
      "Suriname",
      "Svalbard et Île Jan Mayen",
      "Swaziland",
      "Tadjikistan",
      "Taïwan",
      "Tchad",
      "Terres Australes Françaises",
      "Territoire Britannique de l'Océan Indien",
      "Territoire Palestinien Occupé",
      "Thaïlande",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinité-et-Tobago",
      "Tunisie",
      "Turkménistan",
      "Turquie",
      "Tuvalu",
      "Ukraine",
      "Uruguay",
      "Vanuatu",
      "Venezuela",
      "Viet Nam",
      "Wallis et Futuna",
      "Yémen",
      "Zambie",
      "Zimbabwe"
    ];

    const statut = [
      {
        value: 1,
        label: "Personne physique"
      },
      {
        value: 2,
        label: "Personne Morale"
      }
    ];

    const handleObjetInput = (selectedValue) => {
      showAdditionalFields.value = selectedValue === 1;
    };

    onMounted(() => {
      getAllPiece();
      if (route.params.id) {
        getClient(parseInt(route.params.id as string));
      }
      getAllClients();
    });

    return {
      clientForm,
      statut,
      clientSchema,
      editClient,
      validPhone,
      validatePhone,
      showAdditionalFields,
      handleObjetInput,
      pays,
      currentDate,
      defaultStatut,
      pieceOptions,
      telephone1,
      telephone2,
      telephonePersonneAContacter,
      telephoneRepresentant,
      pay,
      clientOptions,
      quartierOptions,
      noOptionsTextQuatier,
      fechQuartiers,
      submitButton,errors,handleSearchChange, rechercheInitier
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.marge-droite {
  margin-left: 15px;
}
.hr-longeur {
  width: 80%;
}
.bord1 {
  border: 1px solid #07a;
}
.fond {
  background-color: rgb(94, 191, 233);
}
</style>