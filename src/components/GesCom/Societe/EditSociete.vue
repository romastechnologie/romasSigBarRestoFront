<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="societeForm" @submit="editSociete" :validation-schema="societeSchema" :initial-values="societeForm">
            <div class="row">
              <div class="col-md-4 mt-20">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="custom-checkbox">
                <input type="checkbox" name="estRegimeTPS">
                <span class="checkmark"></span>
                Est Régime TPS ?
              </label>   
            </div>
          </div>
          <div class="col-md-4 mt-20">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="custom-checkbox">
                <input type="checkbox" name="estModeMecef">
                <span class="checkmark"></span>
                Est Mode MECEF ?
              </label>   
            </div>
          </div>
            <div class="col-md-4 mt-20">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination<span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la dénomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSocial" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSocial" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  N° RCCM <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
            
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  N° IFU <span class="text-danger">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone <span class="text-danger">*</span>
                </label>
                <Field name="telephone" v-model="telephone"  v-slot="{ field }">
                  <vue-tel-input
                    placeholder="Entrer le numéro de téléphone"
                    v-model = "field.value"
                    v-bind = "field"
                    defaultCountry="BJ"
                    mode="international"
                    @validate="validate"
                    class ="shadow-none fs-md-15 text-black py-2">
                  </vue-tel-input>
                </Field>
                <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                <!-- <Field name="telephone" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/> -->
                <ErrorMessage name="telephone" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresse" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresse" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Message Commercial
                </label>
                <Field name="messageCommercial" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer votre message commercial"/>
                <ErrorMessage name="messageCommercial" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Lieu d'impression des factures
                </label>
                <Field name="lieuImpression" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le lieu d'impression"/>
                <ErrorMessage name="lieuImpression" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Joindre le logo
                </label>
                <Field name="logo" type="file" 
                      accept="image/jpeg, image/png application/pdf"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Logo"/>
              </div>
              <ErrorMessage name="logo" class="text-danger"/>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Joindre l'entête<span class="text-danger">*</span>
                </label>
                <Field name="entete" type="file" 
                      accept="image/jpeg, image/png application/pdf"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entête"/>
              </div>
              <ErrorMessage name="entete" class="text-danger"/>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Joindre le pied de page
                </label>
                <Field name="pied" type="file" 
                      accept="image/jpeg, image/png application/pdf"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Pied de page"/>
              </div>
              <ErrorMessage name="pied" class="text-danger"/>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Lien API
                </label>
                <Field name="lienApi" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Lien API"/>
                <ErrorMessage name="lienApi" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  API Nim
                </label>
                <Field name="apiNim" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="API Nim"/>
                <ErrorMessage name="apiNim" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  API Token
                </label>
                <Field name="apiToken" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="API Token"/>
                <ErrorMessage name="apiToken" class="text-danger"/>
              </div>
            </div>


            <div class="col-md-12 mb-md-25">
            <div class="accordion" id="basicAccordion">
              <div class="accordion-item mb-0 bord1">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#basicCollapseOne"
                    aria-expanded="false"
                    aria-controls="basicCollapseOne"
                  >
                    Comptes bancaires
                  </button>
                </h2>
                <div
                  id="basicCollapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#basicAccordion"
                >
                  <div class="accordion-body">

                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active p-10"
                        id="home-tab-pane"
                        role="tabpanel"
                        tabindex="0"
                      >
                        <div class="row">
                          <div class="border border-primary mb-10">
                            <div
                              class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4"
                            >
                              <div class="col-md-7">
                                <h3 class="fs-4 text-white">
                                  Comptes bancaires
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowCompte()"
                                  >
                                    <i
                                      class="fa fa-plus-circle position-relative ms-5 fs-12"
                                    ></i>
                                    Ajouter un compte
                                  </button>
                                  <router-link
                                    to="/liste-mouvements"
                                  ></router-link>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                class="row d-flex align-items-center justify-content-between mt-10"
                              >
                                <div class="col-md-5">
                                  <label class="d-block text-black fw-semibold">
                                    Banque
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-5">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Numéro de compte <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Action
                                  </label>
                                </div>
                              </div>
                              <hr class="mt-0" />
                              <div
                                class="row"
                                v-for="(compte, index) in comptes"
                                :key="index"
                              >
                                <div class="col-md-5 mb-2">
                                  <div class="">
                                    <Multiselect
                                      :options="banqueOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="compte.banque"
                                      placeholder="Sélectionner la Fonction"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowCompte(compte.banque)"
                                    >
                                      La banque est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-5 mb-2">
                                  <div class="">
                                    <input
                                        type="number"
                                        v-model="compte.numCompte"
                                        :class="
                                          valideteRowCompte(compte.numCompte)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer le compte"
                                      />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowCompte(compte.numCompte)"
                                    >
                                      Le numéro est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowCompte(index)"
                                  >
                                    <i
                                      class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Modifier une sociéte
                </button>
                <router-link to="/societes/liste-societes" 
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

import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Societe} from '@/models/Societe';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from "@vueform/multiselect";
import VueMultiselect from 'vue-multiselect'
import { countries } from '@/utils/countries';
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { VueTelInput } from 'vue3-tel-input'

export default defineComponent({
    name: "EditSociete",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect,
    VueTelInput
  },
  setup: () => {
    const societeSchema = Yup.object().shape({
      denomination: Yup.string().required('La dénomination est obligatoire'),
      adresse: Yup.string().required('L\' adresse est obligatoire'),
      raisonSocial: Yup.string().required('La raison sociale est obligatoire'),
      ifu: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'ifu est obligatoire'),
      sigle: Yup.string().notRequired(),
      messageCommercial: Yup.string().notRequired(),
      lieuImpression: Yup.string().notRequired(),
      apiNim: Yup.string().notRequired(),
      apiToken: Yup.string().notRequired(),
      lienApi: Yup.string().notRequired(),
      telephone: Yup.number().typeError('Veuillez entrer des chiffres').required('Le téléphone est obligatoire'),
    });

    const societeForm = ref<Societe>();
    const router = useRouter();
    const route = useRoute();

    const  codepay= ref();
    const  nationalnumlber= ref();
    const telephone=ref();
    const validPhone=ref<boolean>(false);
    const numberPhone=ref();
    const countriesRef = ref(countries)
    const  numeroNational = ref();
    const defaultCountriy = 'Bénin';

    function onInput(phone, phoneObject, input) {
      //
    }

    function validate(phoneObject) {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid == true) {
        telephone.value = phoneObject.number;
        codepay.value= phoneObject.countryCallingCode;
        nationalnumlber.value = phoneObject.nationalNumber;
        numberPhone.value = phoneObject.nationalNumber;

      }else{
        telephone.value="";
        codepay.value= "";
        nationalnumlber.value= "";
        numberPhone.value="";
      }
    }

    function getSociete(id:number) {
      ApiService.get("/societes/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            societeForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

     // formulaire dynamique start

     const isDisable = ref(true);
    const comptes = reactive([
      {
        numCompte: "",
        banque: ""
      },
    ]);

    const addRowCompte = () => {
      comptes.push({
        numCompte: "",
        banque: ""
      });
    };

    const removeRowCompte = (index) => {
      if (comptes.length > 1) comptes.splice(index, 1);
      //totals();
    };

    const valideteRowCompte = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

  
    watch(comptes, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].numCompte == "" ||
          newValue[key].banque == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("comptes");

    const banqueOptions = ref([]);
    const produitsss: any = ref(null);
    const valuess = ref();

    const editSociete = async (values, {resetForm}) => {
      const data = societeForm.value;
      values.comptes = comptes.map(compte => ({
        numCompte: compte.numCompte,
        banque: compte.banque,
      }));
      ApiService.put("/societes/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeSociete" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchBanque = async () => {
      try {
        const response = await ApiService.get("all/banques");
        const banqueData = response.data.data.data;
        banqueOptions.value = banqueData.map((banque) => ({
          value: banque.id,
          label: `${banque.denomination}`,
        }));
      } catch (error) {
        //
      }
    };

    

    onMounted(() => {
      if(route.params.id) {
        getSociete(parseInt(route.params.id as string));
      }
      fetchBanque()
    });

    return { 
      societeSchema, editSociete, societeForm, removeRowCompte,
        addRowCompte,
        valideteRowCompte,
        valuess,
        banqueOptions,
        isDisable,
        comptes,
        countries: countriesRef, 
        defaultCountriy,
        numeroNational,
        telephone, validate
    };
  },
});
</script>