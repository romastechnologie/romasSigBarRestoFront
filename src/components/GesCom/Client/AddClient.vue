<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter un client</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="clientForm" @submit="addClient" :validation-schema="clientSchema">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Statut<span class="text-danger">*</span>
              </label>
              <Field name="statut" v-model="defaultStatut" v-slot="{ field }">
                <Multiselect :options="statut" :searchable="true" track-by="label" label="label" v-model="field.value"
                  v-bind="field" placeholder="Sélectionner le statut" @select="handleObjetInput" />
              </Field>
            </div>
            <ErrorMessage name="statut" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom du client <span class="text-danger">*</span>
              </label>
              <Field name="nomClient" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom" />
              <ErrorMessage name="nomClient" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Prénom du client<span class="text-danger">*</span>
              </label>
              <Field name="prenomClient" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le prenom" />
              <ErrorMessage name="prenomClient" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Civilité <span class="text-danger">*</span>
              </label>
              <Field name="civilite" v-slot="{ field }">
                <Multiselect :options="['M.', 'Mme']" :searchable="true" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner la civilité" />
              </Field>
              <ErrorMessage name="civilite" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type de pièce <span class="text-danger">*</span>
              </label>
              <Field name="piece" v-slot="{ field }">
                <Multiselect :options="pieceOptions" :searchable="true" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner le type de pièce" />
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
                placeholder="Entrer le numéro de pièce" />
              <ErrorMessage name="numeroPiece" class="text-danger" />
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
              <Field name="sigle" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le sigle" />
              <ErrorMessage name="sigle" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom Commercial
              </label>
              <Field name="nomCommercial" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom commercial" />
              <ErrorMessage name="nomCommercial" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Raison sociale <span class="text-danger">*</span>
              </label>
              <Field name="raisonSociale" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la raison sociale" />
              <ErrorMessage name="raisonSociale" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                IFU <span class="text-danger" v-if="!showAdditionalFields">*</span>
              </label>
              <Field name="ifu" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer l'ifu" />
              <ErrorMessage name="ifu" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Régistre de commerce <span class="text-danger">*</span>
              </label>
              <Field name="rccm" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le régistre de commerce" />
              <ErrorMessage name="rccm" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Pays de résidence <span class="text-danger">*</span>
              </label>
              <Field name="paysResidence" v-model="pay" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="pays" :searchable="true"
                  placeholder="Sélectionner le pays de résidence" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="paysResidence" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12  mb-3" v-if="pay == 'Bénin'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Quartier de résidence<span class="text-danger">*</span>
              </label>
              <Field name="quartier" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" placeholder="Rechercher un quartier"
                  :filter-results="false" :min-chars="2" :resolve-on-load="false" :delay="0" :searchable="true"
                  :options-limit="300" :options="async (query) => {
                    return await fechQuartiers(query)
                  }" :no-options-text=noOptionsTextQuatier />
              </Field>
            </div>
            <ErrorMessage name="quartier" class="text-danger" />
          </div>
          <div class="col-md-4  mb-3" v-if="pay != 'Bénin'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Région de résidence<span class="text-danger">*</span>
              </label>
              <Field name="region" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer votre région" />
            </div>
            <ErrorMessage name="region" class="text-danger" />
          </div>
          <div class="col-md-4  mb-3" v-if="pay != 'Bénin'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Ville de résidence<span class="text-danger">*</span>
              </label>
              <Field name="ville" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer votre ville" />
            </div>
            <ErrorMessage name="ville" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Adresse complète <span class="text-danger">*</span>
              </label>
              <Field name="adresseClient" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Ex: Non loin de ..." />
              <ErrorMessage name="adresseClient" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email
              </label>
              <Field name="emailClient" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer l'email" />
              <ErrorMessage name="emailClient" class="text-danger" />
            </div>
          </div>

          <!-- Champs téléphoniques corrigés -->
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone 1 <span class="text-danger">*</span>
              </label>
              <Field name="telephone1" v-slot="{ field }">
                <vue-tel-input placeholder="Entrer le numéro de téléphone" v-model="telephone1" v-bind="field"
                  defaultCountry="BJ" mode="international" @validate="validatePhone($event, 'telephone1')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephone1 && !validPhone.telephone1" class="text-danger">Veuillez entrer un numéro correct
              </div>
              <ErrorMessage name="telephone1" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone 2
              </label>
              <Field name="telephone2" v-slot="{ field }">
                <vue-tel-input placeholder="Entrer le numéro de téléphone" v-model="telephone2" v-bind="field"
                  defaultCountry="BJ" mode="international" @validate="validatePhone($event, 'telephone2')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephone2 && !validPhone.telephone2" class="text-danger">Veuillez entrer un numéro correct
              </div>
              <ErrorMessage name="telephone2" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de naissance
              </label>
              <Field name="dateNais" type="date" :max="currentDate"
                class="form-control shadow-none fs-md-15 text-black" />
            </div>
            <ErrorMessage name="dateNais" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de création
              </label>
              <Field name="dateCreation" type="date" :max="currentDate"
                class="form-control shadow-none fs-md-15 text-black" />
            </div>
            <ErrorMessage name="dateCreation" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom et Prénoms de la personne à contacter <span class="text-danger">*</span>
              </label>
              <Field name="personneAContacter" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom et les prénoms du contact" />
              <ErrorMessage name="personneAContacter" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone de la personne à contacter <span class="text-danger">*</span>
              </label>
              <Field name="telephonePersonneAContacter" v-slot="{ field }">
                <vue-tel-input placeholder="Entrer le numéro de téléphone" v-model="telephonePersonneAContacter"
                  v-bind="field" defaultCountry="BJ" mode="international"
                  @validate="validatePhone($event, 'telephonePersonneAContacter')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephonePersonneAContacter && !validPhone.telephonePersonneAContacter" class="text-danger">
                Veuillez entrer un numéro correct</div>
              <ErrorMessage name="telephonePersonneAContacter" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
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
              <Field name="telephoneRepresentant" v-slot="{ field }">
                <vue-tel-input placeholder="Entrer le numéro de téléphone" v-model="telephoneRepresentant" v-bind="field"
                  defaultCountry="BJ" mode="international" @validate="validatePhone($event, 'telephoneRepresentant')"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <div v-if="telephoneRepresentant && !validPhone.telephoneRepresentant" class="text-danger">Veuillez entrer un numéro correct</div>
              <ErrorMessage name="telephoneRepresentant" class="text-danger" />
            </div>
          </div> -->
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button ref="submitButton" class="btn btn-success me-3" type="submit">
                Ajouter un client
              </button>
              <router-link to="/clients/liste-clients" class=" btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, onMounted } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Client } from '@/models/Client';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { VueTelInput } from 'vue3-tel-input'
import { countries } from '@/utils/countries';

export default defineComponent({
  name: "AddClient",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueTelInput
  },
  setup: () => {
    const currentDate = ref(new Date().toISOString().split('T')[0]);
    /* const clientSchema = Yup.object().shape({
      nomClient: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le nom du client est obligatoire")
          : schema;
      }),
      prenomClient: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le prénom du client est obligatoire")
          : schema;
      }),
      civilite: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("La civilité est obligatoire")
          : schema;
      }),
      raisonSociale: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.required("La raison sociale est obligatoire")
          : schema;
      }),
      rccm: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.required("Le rccm est obligatoire")
          : schema;
      }),
      dateCreation: Yup.date().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.notRequired()
          : schema;
      }),
      piece: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("La pièce est obligatoire")
          : schema;
      }),
      numeroPiece: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le numéro est obligatoire")
          : schema;
      }),
      dateExpiration: Yup.date().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("La date d'expiration est obligatoire")
          : schema;
      }),
      dateNais: Yup.date().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.notRequired()
          : schema;
      }),
      ifu: Yup.string()
        .matches(/^\d{13}$/, 'La saisie doit avoir exactement 13 chiffres')
        .when([], (value, schema) => {
          return !showAdditionalFields.value
            ? schema
                .min(13, "La saisie doit avoir exactement 13 chiffres")
                .max(13, "La saisie doit avoir exactement 13 chiffres")
                .required("L'ifu est obligatoire")
            : schema
                .min(13, "La saisie doit avoir exactement 13 chiffres")
                .max(13, "La saisie doit avoir exactement 13 chiffres");
        }),
      adresseClient: Yup.string().required('L\'adresse est obligatoire'),
      emailClient: Yup.string().email("Veuillez entrer un mail valide").notRequired(),
      telephone1: Yup.string()
        .typeError('Veuillez entrer des chiffres')
        .required('Le telephone 1 est obligatoire'),
      telephone2: Yup.string().typeError('Veuillez entrer des chiffres').notRequired(),
      sigle: Yup.string().notRequired(),
      nomCommercial: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value ? schema.notRequired() : schema;
      }),
      statut: Yup.string().required('Le statut est obligatoire'),
      personneAContacter: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le nom et prénoms sont obligatoires")
          : schema;
      }),
      telephonePersonneAContacter: Yup.string()
        .typeError('Veuillez entrer des chiffres')
        .required('Le telephone du contact est obligatoire'),
      personneRepresentant: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value ? schema.notRequired() : schema;
      }),
      promoteur: Yup.string().when([], (value, schema) => {
      return !showAdditionalFields.value
        ? schema.required("Le promoteur est obligatoire")
        : schema;
    }),
    gerant: Yup.string().when([], (value, schema) => {
      return !showAdditionalFields.value
        ? schema.required("Le gérant est obligatoire")
        : schema;
    }),
      telephoneRepresentant: Yup.string()
        .typeError('Veuillez entrer des chiffres')
        .when([], (value, schema) => {
          return !showAdditionalFields.value ? schema.notRequired() : schema;
        }),
      quartier: Yup.string().when('paysResidence', ([paysResidence], schema) => {
        return paysResidence === 'Bénin'
          ? schema.required('Le quartier est obligatoire').typeError('Veuillez renseigner votre quartier')
          : schema.notRequired();
      }),
      ville: Yup.string().when('paysResidence', ([paysResidence], schema) => {
        return paysResidence !== 'Bénin'
          ? schema.required('La ville est obligatoire').typeError('Veuillez renseigner votre ville')
          : schema.notRequired();
      }),
      region: Yup.string().when('paysResidence', ([paysResidence], schema) => {
        return paysResidence !== 'Bénin'
          ? schema.required('La région est obligatoire').typeError('Veuillez renseigner votre région')
          : schema.notRequired();
      }),
      paysResidence: Yup.string().required('Le pays de résidence est obligatoire'),
    });*/

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
      telephonePersonneAContacter: Yup.string().when([], {
        is: () => showAdditionalFields.value === true,
        then: schema => schema.required("Le telephone du contact est obligatoire"),
        otherwise: schema => schema.notRequired(),
      }),
      categorieClient: Yup.string().required('La catégorie du client est obligatoire'),

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

    onMounted(async () => {
      getAllPiece();
      getAllClients();
      fetchCategorieClient();
    });

    const clientForm = ref<Client | null>(null);
    const router = useRouter();
    const defaultStatut = ref(1);
    const showAdditionalFields = ref(true);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const pieceOptions = ref([]);
    const pay = ref('Bénin');
    const nationalnumlber = ref();
    const telephone1 = ref('');
    const clientOptions = ref([]);
    const telephone2 = ref('');
    const telephonePersonneAContacter = ref('');
    const telephoneRepresentant = ref('');
    const categorieClientOptions = ref([]);

    const validPhone = ref({
      telephone1: true,
      telephone2: true,
      telephonePersonneAContacter: true,
      telephoneRepresentant: true,
    });
    const numberPhone = ref();
    const quartierOptions = ref([]);
    const noOptionsTextQuatier = ref("Tapez au moins deux caractères");
    // Correction de la validation des numéros de téléphone
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

    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }


    const handleObjetInput = (selectedValue) => {
      showAdditionalFields.value = selectedValue === 1;
    }

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

    const valuess = ref();


    const addClient = async (values, { resetForm }) => {
      if (submitButton.value) {
        submitButton.value.disabled = true;
      }
      ApiService.post("/clients", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeClient" });
          }
        }).catch(({ response }) => {
          submitButton.value!.disabled = false;
          error(response.data.message);
        });
    };

    return {
      clientSchema,
      addClient,
      clientForm,
      statut, clientOptions,
      showAdditionalFields,
      handleObjetInput,
      submitButton,
      defaultStatut,
      valuess,
      currentDate,
      validPhone,
      validatePhone, // Nouvelle fonction corrigée
      telephone1,
      telephone2,
      pieceOptions,
      telephonePersonneAContacter,
      telephoneRepresentant, pays,
      getCurrentDateTime,
      noOptionsTextQuatier,
      quartierOptions, fechQuartiers, pay, categorieClientOptions
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