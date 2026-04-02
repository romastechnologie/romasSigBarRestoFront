<template>
  <Card3 colClass="col-md-12 simple-form-wizard" pre="true" preClass="f-m-light mt-1" headerTitle="true"
    title="Edition de contrat" desc="Edition de contrat par type de contrat">
    <form-wizard class="border border-primary" :before-change="validateStep" @on-complete="handleFormSubmission"
      shape="tab" back-button-text="Précédent" next-button-text="Suivant" finish-button-text="Enregistrer"
      color="#9b59b6">
      <tab-content title="Information Générale">
        <div class="row">
          <!-- 
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Multiselect v-model="contrat.personnel" :options="personnelOptions" :preserve-search="true"
                :multiple="false" :searchable="true" placeholder="Sélectionner le personnel" label="label"
                track-by="label" />
              <span class="invalid-feedback"></span>
            </div>
          </div> -->

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Multiselect v-model="contrat.personnel" :options="personnelOptions" :preserve-search="true"
                :multiple="false" :searchable="true" placeholder="Sélectionner le personnel" label="label"
                track-by="label" :key="componentKey"
                />
                <span class="invalid-feedback"></span>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie de contrat <span class="text-danger">*</span>
              </label>
              <Multiselect :searchable="true" :options="[
                'Prestation',
                'Contrat de travail',
                'Contrat de stage'
              ]" v-model="contrat.categorieContrat" placeholder="Sélectionner la catégorie de contrat" />
              <span class="invalid-feedback"></span>
            </div>
          </div>

          <!-- <div class="col-md-4 mb-3" v-if="contrat.categorieContrat !== 'Prestation'"> -->
            <div class="col-md-4 mb-3" v-if="contrat.categorieContrat !== 'Prestation' && contrat.categorieContrat !== 'Contrat de stage'">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                     Type Contrat <span class="text-danger">*</span>
                 </label>
              <Multiselect v-model="contrat.typeContrat" :options="typeOptions" :preserve-search="true"
                :multiple="false" :searchable="true" placeholder="Sélectionner le type" label="label"
                track-by="label" />
              <span class="invalid-feedback"></span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="renouvelable" class="form-label">Renouvelable</label>
            <div class="form-check-size">
              <div class="form-check form-check-inline radio radio-primary">
                <input class="form-check-input" id="oui" v-model="contrat.renouvelable" type="radio" value="1" />
                <label class="form-check-label mb-0" for="oui">Oui</label>
              </div>
              <div class="form-check form-check-inline radio radio-primary">
                <input class="form-check-input" id="non" v-model="contrat.renouvelable" type="radio" value="0" />
                <label class="form-check-label mb-0" for="non">Non</label>
              </div>
            </div>
            <span class="invalid-feedback"></span>
          </div>
          <div class="col-md-4 mb-3">
            <label for="ref" class="form-label">Durée du contrat<span class="text-danger">*</span></label>
            <div class="input-group">
              <input v-model="contrat.dureeContrat" class="form-control" type="text" for="inputGroupSelect01" />
              <select class="form-select form-control" style="width: 20px !important"
                v-model="contrat.periodiciteDureeContrat">
                <option value="...">...</option>
                <option value="Jour(s)">Jour(s)</option>
                <option value="Mois">Mois</option>
                <option value="Ans">Ans</option>
              </select>
              <span class="invalid-feedback"></span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="dateDebut" class="form-label">Date d'embauche<span class="text-danger">*</span></label>
            <input v-model="contrat.dateDebut" class="form-control" type="Date" />
            <span class="invalid-feedback"></span>
          </div>
          <div class="col-md-4 mb-3" disabled>
            <label for="dateFin" class="form-label">Date de fin de contrat<span class="text-danger">*</span></label>
            <input v-model="contrat.dateFin" readonly disabled class="form-control" type="Date" />
            <span class="invalid-feedback"></span>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mode de tarification <span class="text-danger">*</span>
              </label>
              <Multiselect v-model="contrat.modetarification" :options="modeDeTarificationOptions"
                :preserve-search="true" :multiple="false" :searchable="true" placeholder="Sélectionner le mode"
                label="label" track-by="label" />
              <span class="invalid-feedback"></span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="salaireBase" class="form-label">{{ salaireBaseLabel }}<span class="text-danger">*</span></label>
            <input v-model="contrat.salaireBase" class="form-control" type="number" />
            <span class="invalid-feedback"></span>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Période de Paie <span class="text-danger">*</span>
              </label>
              <Multiselect :searchable="true" :options="[
                'Mensuel',
                'Hebdomadaire',
                'Bimensuel',
                'Bihebdomadaire',
              ]" v-model="contrat.periodeDePaie" placeholder="Sélectionner la période" />
              <span class="invalid-feedback"></span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="ref" class="form-label">Période d'essai<span class="text-danger">*</span></label>
            <div class="input-group">
              <input v-model="contrat.dureePeriodeEssai" class="form-control" type="text" for="inputGroupSelect01" />
              <select class="form-select form-control" style="width: 20px !important"
                v-model="contrat.periodiciteDureeEssai">
                <option value="...">...</option>
                <option value="Jour(s)">Jour(s)</option>
                <option value="Mois">Mois</option>
                <option value="Ans">Ans</option>
              </select>
              <span class="invalid-feedback"></span>
            </div>
          </div>
          <div class="col-md-4 mb-3" disabled>
            <label for="dateFinPeriodeEssai" class="form-label">
              Date fin de période d'Essai<span class="text-danger">*</span></label>
            <input v-model="contrat.dateFinPeriodeEssai" class="form-control" type="Date" readonly disabled />
            <span class="invalid-feedback"></span>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Poste Occupé <span class="text-danger">*</span>
              </label>
              <Multiselect v-model="contrat.poste" :options="fonctionOptions" :preserve-search="true" :multiple="false"
                :searchable="true" placeholder="Sélectionner la fonction" label="label" track-by="label"
                @change="fetchAttributionsByPoste($event)" />
              <span class="invalid-feedback"></span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Attributions <span class="text-danger">*</span>
              </label>
              <Field name="attributioncontrats" v-slot="{ field }" v-model="attributionpostes">
                <Multiselect mode="tags" v-bind="field" :close-on-select="false" :options="attributionOptions"
                  :searchable="true" :multiple="true" placeholder="" />
              </Field>
              <span class="invalid-feedback"></span>
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content title="Horaire de travail">
        <div class="row">
          <div class="col-md-12 mb-md-25">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-7">
                      <h3 class="fs-4 text-white">
                        Les horaires de l'entreprise
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div class="row d-flex align-items-center justify-content-between mt-2">
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Jour
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Heure d'ouverture
                          <span class="text-danger">*</span>
                        </label>
                      </div>

                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Début de pause
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold mb-10">
                          Fin de pause<span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold">
                          Heure de fermeture
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold mb-10">
                          Est jour ouvrable<span class="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <hr class="mt-0" />
                    <div class="row" v-for="(horaire, index) in horaires" :key="index">
                      <div class="col-md-2 mb-2">
                        <div class="form-group">
                          <input :disabled="horaire.estActif == '0'" readonly
                            class="form-control shadow-none fs-md-15 text-black" type="text" v-model="horaire.jour"
                            :class="valideteRowHoraire(horaire.jour, horaire.estActif)
                              ? 'is-invalid'
                              : ''
                              " />
                          <div class="invalid-feedback" v-if="
                            valideteRowHoraire(horaire.jour, horaire.estActif)
                          ">
                            Champs obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group">
                          <input :disabled="horaire.estActif == '0'" v-model="horaire.heureOuverture" type="time"
                            :class="valideteRowHoraire(
                              horaire.heureOuverture,
                              horaire.estActif
                            )
                              ? 'is-invalid'
                              : ''
                              " class="form-control shadow-none fs-md-15 text-black" placeholder="Saisir le nom" />
                          <div class="invalid-feedback" v-if="
                            valideteRowHoraire(
                              horaire.heureOuverture,
                              horaire.estActif
                            )
                          ">
                            Champs obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group">
                          <input :disabled="horaire.estActif == '0'" v-model="horaire.heureDebutPause" type="time"
                            :class="valideteRowHoraire(
                              horaire.heureDebutPause,
                              horaire.estActif
                            )
                              ? 'is-invalid'
                              : ''
                              " class="form-control shadow-none fs-md-15 text-black" />
                          <div class="invalid-feedback" v-if="
                            valideteRowHoraire(
                              horaire.heureDebutPause,
                              horaire.estActif
                            )
                          ">
                            Champs obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group">
                          <input :disabled="horaire.estActif == '0'" v-model="horaire.heureFinPause" type="time" :class="valideteRowHoraire(
                            horaire.heureFinPause,
                            horaire.estActif
                          )
                            ? 'is-invalid'
                            : ''
                            " class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          <div class="invalid-feedback" v-if="
                            valideteRowHoraire(
                              horaire.heureFinPause,
                              horaire.estActif
                            )
                          ">
                            Champs obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group">
                          <input :disabled="horaire.estActif == '0'" v-model="horaire.heureFermeture" type="time"
                            :class="valideteRowHoraire(
                              horaire.heureFermeture,
                              horaire.estActif
                            )
                              ? 'is-invalid'
                              : ''
                              " class="form-control shadow-none fs-md-15 text-black" placeholder="Saisir le nom" />
                          <div class="invalid-feedback" v-if="
                            valideteRowHoraire(
                              horaire.heureFermeture,
                              horaire.estActif
                            )
                          ">
                            Champs obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-check-size">
                          <div class="form-check form-check-inline radio radio-primary">
                            <input class="form-check-input" :id="index" v-model="horaire.estActif" type="radio"
                              :name="`radio${index}`" value="1" />
                            <label class="form-check-label mb-0" :for="index">Oui</label>
                          </div>
                          <div class="form-check form-check-inline radio radio-primary">
                            <input class="form-check-input" :id="`radio${index}`" v-model="horaire.estActif"
                              type="radio" :name="`radio${index}`" value="0" />
                            <label class="form-check-label mb-0" :for="`radio${index}`">Non</label>
                          </div>
                        </div>
                        <div class="invalid-feedback" v-if="
                          valideteRowHoraire(
                            horaire.estActif,
                            horaire.estActif
                          )
                        ">
                          Champs obligatoire.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-3">
                  <label for="nobreheuresTravail" class="form-label">Heures de travail<span
                      class="text-danger">*</span></label>
                  <input readonly v-model="contrat.nobreheuresTravail" class="form-control" type="number" />
                  <span class="invalid-feedback"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </Card3>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  reactive,
  computed,
  defineAsyncComponent,
} from "vue";
import { Form, Field, ErrorMessage, useFieldArray } from "vee-validate";
import { tab } from "@/core/data/forms";
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import * as Yup from "yup";
import axios from "axios";
import ApiService from "@/services/ApiService";
import { Contrat } from "@/models/Contrat";
import useVuelidate from "@vuelidate/core";
import { error, success, ajouterPeriode } from "@/utils/utils";
import { useRouter } from "vue-router";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import VueMultiselect from "vue-multiselect";
import { required, email } from "@vuelidate/validators";
const Card3 = defineAsyncComponent(
  () => import("@/components/common/card/CardData3.vue")
);

export default defineComponent({
  name: "AddContrat",
  components: {
    tab,
    FormWizard,
    TabContent,
    Card3,
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect,
  },

  setup: () => {
    const contratSchema = Yup.object().shape({
      salaireBase: Yup.string().required("Le salaire est obligatoire."),
      nobreheuresTravail: Yup.number()
        .typeError("veuillez entrer des nombres")
        .required("Les heures sont obligatoires."),
      dateDebut: Yup.date()
        .typeError("veuillez entrer une date valide")
        .required("La date de début est obligatoire."),
      dateFin: Yup.date()
        .typeError("veuillez entrer une date valide")
        .required("La date de fin est obligatoire."),
      categorieContrat: Yup.string().required("Le type est obligatoire."),
      dateFinPeriodeEssai: Yup.date()
        .typeError("veuillez entrer une date valide")
        .required("La période est obligatoire."),
      periodeDePaie: Yup.string().required("La période est obligatoire."),
      renouvelable: Yup.string().notRequired(),
      typeContrat: Yup.string().when("categorieContrat", {
        is: (value) => value !== "Prestation" && value!=="Contrat de stage",
        then: (schema) => schema.required("Le type est obligatoire."),
        otherwise: (schema) => schema.notRequired(),
      }),
      personnel: Yup.string().required("Le personnel est obligatoire."),
      attribution: Yup.array().required("Les attributions sont obligatoires."),
      modetarification: Yup.string().required(
        "Le mode de tarification est obligatoire."
      ),
    });
    const horaires = reactive([]);
    onMounted(async () => {
  try {
    await Promise.all([
      getAllTypeContrat(),
      getAllAttribution(),
      getAllPersonnel(), // Appeler après les autres pour éviter des conflits
      getAllModeTarifications(),
      fetchFonction(),
      
    ]);
    getAllHoraires();
  } catch (error) {
    console.error("Erreur lors du chargement initial:", error);
  }
});

    const contrat = ref({
      refContrat: "",
      poste: "",
      salaireBase: "",
      nobreheuresTravail: "",
      dateDebut: null,
      dateFin: null,
      dateFinPeriodeEssai: null,
      periodiciteDureeEssai: null,
      categorieContrat: "",
      periodeDePaie: "",
      renouvelable: "",
      typeContrat: "",
      personnel: "",
      attribution: [],
      modetarification: "",
      dureePeriodeEssai: null,
      dureeContrat: null,
      periodiciteDureeContrat: null,
    });

    watch(
      [
        () => contrat.value.dureeContrat,
        () => contrat.value.periodiciteDureeContrat,
        () => contrat.value.dateDebut,
      ],
      () => {
        if (
          contrat.value.dateDebut &&
          contrat.value.dureeContrat &&
          contrat.value.periodiciteDureeContrat
        ) {
          contrat.value.dateFin = ajouterPeriode(
            contrat.value.dateDebut,
            parseInt(contrat.value.dureeContrat.toString()),
            contrat.value.periodiciteDureeContrat.toLowerCase()
          );
        }
      }
    );

    const rules = {
      contrat: {
        refContrat: { required },
        poste: { required },
        dureePeriodeEssai: { required },
        periodiciteDureeEssai: { required },
        periodiciteDureeContrat: { required },
        salaireBase: { required },
        nobreheuresTravail: { required },
        categorieContrat: { required },
        dateFin: { required },
        dateFinPeriodeEssai: { required },
        periodeDePaie: { required },
        renouvelable: { required },
        typeContrat: { required },
        personnel: { required },
        attribution: { required },
        modetarification: { required },
      },
    };

    const v$ = useVuelidate(rules, { contrat });

    const validateStep = async (tabIndex) => {
      // Define what to validate for each step based on the tabIndex
      let fieldsToValidate;
      if (tabIndex === 0) {
        fieldsToValidate = [v$.value.form.salaireDeBase, v$.value.form.email];
      } else if (tabIndex === 1) {
        fieldsToValidate = [v$.value.form.address, v$.value.form.city];
      } else {
        return true; // Last step doesn't need validation
      }

      // Mark fields as touched and validate
      fieldsToValidate.forEach((field) => field.$touch());

      // Check if any field in the current step is invalid
      const isStepValid = fieldsToValidate.every((field) => !field.$invalid);
      return isStepValid;
    };

    const contratForm = ref(null);
    const showMErr = ref(false);
    const types = ref();
    const personnelId = ref();
    const personnel = ref();
    const typeOptions = ref([]);
    const typePrimeOptions = ref([]);
    const typeRetenueOptions = ref([]);
    const attributionpostes = ref<number[]>([]);
    const router = useRouter();
    const typePrimes = ref(null);
    const typeRetenues = ref(null);
    const salaireDeBase = ref();
    const personnelOptions = ref([]);
    const attributionOptions = ref();
    const attribution = ref();
    const OrganisationOptions = ref();
    const Organisation = ref();
    const modeDeTarificationOptions = ref();
    const personnels = ref([] as any[]);
    const fonctionOptions = ref([]);

    // Propriété calculée pour le libellé dynamique
    const salaireBaseLabel = computed(() => {
      if (contrat.value.modetarification && modeDeTarificationOptions.value.length > 0) {
        const selectedMode = modeDeTarificationOptions.value.find(
          (mode) => mode.value === contrat.value.modetarification
        );
        if (selectedMode) {
          const baseLabel = selectedMode.label.toLowerCase().replace("par ", "Salaire de Base par ").trim();
          return baseLabel.charAt(0).toUpperCase() + baseLabel.slice(1); // Capitalise la première lettre
        }
      }
      return "Salaire de base";
    });


    const getAllTypeContrat = async () => {
      try {
        const response = await ApiService.get("/all/typeContrats");
        const typesData = response.data.data.data;
        console.log("typesData", typesData);
        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    // const getAllPersonnel = async () => {
    //   try {
    //     const response = await ApiService.get("/all/personnels");
    //     const personnelsData = response.data.data.data;
    //     console.log("Data", personnelsData);
    //     personnelOptions.value = personnelsData.map((personnel) => ({
    //       value: personnel.id,
    //       label: personnel.nom + " " + personnel.prenom,
    //     }));
    //   } catch (error) {
    //     //error(response.data.message)
    //   }
    // };

//     const getAllPersonnel = async () => {
//   try {
//     // Récupérer tous les personnels
//     const response = await ApiService.get("/all/personnels");
//     const personnelsData = response.data.data.data;
//     console.log("Personnels bruts:", personnelsData);

//     // Récupérer les contrats existants
//     const contratsResponse = await ApiService.get("/all/contrats");
//     const contratsData = contratsResponse.data.data.data || [];
//     console.log("Contrats récupérés:", contratsData);

//     // Extraire les IDs des personnels ayant un contrat
//     const personnelsOccupes = contratsData.map((contrat) => contrat.personnel);
//     console.log("Personnels occupés (IDs):", personnelsOccupes);

//     // Filtrer les personnels non occupés
//     const filteredPersonnels = personnelsData.filter(
//       (personnel) => !personnelsOccupes.includes(personnel.id)
//     );
//     console.log("Personnels filtrés:", filteredPersonnels);

//     // Mettre à jour les options
//     personnelOptions.value = filteredPersonnels.map((personnel) => ({
//       value: personnel.id,
//       label: personnel.nom + " " + personnel.prenom,
//     }));
//     console.log("Options finales pour Multiselect:", personnelOptions.value);
//   } catch (error) {
//     console.error("Erreur lors du chargement des personnels ou contrats:", error);
//   }
// };

const componentKey = ref(0);


const getAllPersonnel = async () => {
  try {
    const response = await ApiService.get("/personnels");
    const personnelsData = response.data.data.data || [];
    console.log("Personnels disponibles (directement filtrés par l'API):", personnelsData);

    personnelOptions.value = personnelsData.map((personnel) => ({
      value: personnel.id,
      label: `${personnel.nom} ${personnel.prenom}`,
    }));
    console.log("Options pour Multiselect:", personnelOptions.value);
    componentKey.value += 1;
  } catch (error) {
    console.error("Erreur lors du chargement des personnels:", error);
    personnelOptions.value = [];
    componentKey.value += 1;
  }
};

    const getAllAttribution = async () => {
      try {
        const response = await ApiService.get("/all/attributions");
        const canalsData = response.data.data.data;
        console.log("Data", canalsData);
        attributionOptions.value = canalsData.map((attribution) => ({
          value: attribution.id,
          label: attribution.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    function getAllHoraires(page = 1, limi = 10, searchTerm = "") {
      ApiService.get(`/all/horaires?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          horaires.splice(0, horaires.length); // ← vider avant remplir
          data.data.data.forEach((horaire) => {
            horaires.push({
              id: horaire.id,
              jour: horaire.jour,
              heureOuverture: horaire.heureOuverture,
              heureFermeture: horaire.heureFermeture,
              heureDebutPause: horaire.heureDebutPause,
              heureFinPause: horaire.heureFinPause,
              estActif: horaire.estActif,
            });
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    const getAllModeTarifications = async () => {
      try {
        const response = await ApiService.get("/all/modeTarifications");
        const modeDeTarificationsData = response.data.data.data;
        console.log("Data", modeDeTarificationsData);
        modeDeTarificationOptions.value = modeDeTarificationsData.map(
          (modeDeTarification) => ({
            value: modeDeTarification.id,
            label: modeDeTarification.libelle,
          })
        );
      } catch (error) {
        //error(response.data.message)
      }
    };

    const fetchAttributionsByPoste = async (id) => {
      try {
        console.log('data1', id);
        const response = await axios.get("/attributionsPoste/" + id);
        attributionpostes.value = [];
        response.data.data.forEach((a) => {
          attributionpostes.value.push(a.id)
        })
        console.log('data2', attributionpostes.value);
      } catch (error) {
        console.error('Erreur lors du chargement des attributions :', error);
      }
    };

    // horaireContrat
    const isDisableeeeee = ref(true);
    const horaireContrats = reactive([
      {
        heureArrive: "",
        heureDepart: "",
        heureFinPause: "",
        heureDebutPause: "",
      },
    ]);

    watch(
      [
        () => contrat.value.dureePeriodeEssai,
        () => contrat.value.periodiciteDureeEssai,
        () => contrat.value.dateDebut,
      ],
      () => {
        if (
          contrat.value.dateDebut &&
          contrat.value.dureePeriodeEssai &&
          contrat.value.periodiciteDureeEssai
        ) {
          contrat.value.dateFinPeriodeEssai = ajouterPeriode(
            contrat.value.dateDebut,
            parseInt(contrat.value.dureePeriodeEssai.toString()),
            contrat.value.periodiciteDureeEssai.toLowerCase()
          ); // Exécuter la fonction handleChange lorsque l'une des variables change
        }
      }
    );

    const valideteRowHoraire = (e, d) => {
      if (
        (e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) &&
        d != "0"
      ) {
        console.log("erg");
        return true;
      } else {
        return false;
      }
    };

    const addRowHoraireContrat = () => {
      horaireContrats.push({
        heureArrive: "",
        heureDepart: "",
        heureFinPause: "",
        heureDebutPause: "",
      });
    };

    const removeRowHoraireContrat = (index) => {
      if (horaireContrats.length > 1) horaireContrats.splice(index, 1);
    };

    watch(
      horaires,
      (newValue) => {
        isDisableeeeee.value = newValue.some(
          (horaireContrat) =>
            valideteRowHoraireContrat(horaireContrat.heureArrive) ||
            valideteRowHoraireContrat(horaireContrat.heureFinPause) ||
            valideteRowHoraireContrat(horaireContrat.heureDepart) ||
            valideteRowHoraireContrat(horaireContrat.heureDebutPause)
        );
      },
      { deep: true }
    );

    const valideteRowHoraireContrat = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log("erg");
        return true;
      } else {
        return false;
      }
    };

    //const { remove, push, fields, update } = useFieldArray("horaireContrats");

    // formulaire dynamique
    const isDisable = ref(true);
    const isDisablee = ref(true);

    const isDisableee = ref(true);
    const attribution_postes = reactive([
      {
        poste: "",
        attribution: "",
      },
    ]);


    const addAttributionPoste = () => {
      attribution_postes.push({
        poste: "",
        attribution: "",
      });
    };

    const removeAttributionPoste = (index) => {
      if (attribution_postes.length > 1)
        attribution_postes.splice(index, 1);
    };

    const validateAttributionPoste = (value) => {
      return !value || value <= 0;
    };

    const calculerMontant = (item) => {
      const valeurUnitaire = item.valeurUnitaire || 1;
      return valeurUnitaire * item.quantite;
    };


   /* const updateValeurUnitaire = () => {
      const salaireBase = parseFloat(salaireDeBase.value) || 1;

      primes.forEach((prime) => {
        if (prime.typePrime) {
          const [id, valeur, typeDeValeur] = prime.typePrime.split("|");
          const valeurNum = parseFloat(valeur);
          if (typeDeValeur.includes("%")) {
            prime.valeurUnitaire = (salaireBase * valeurNum) / 100;
          } else if (typeDeValeur.includes("MT")) {
           // prime.valeurUnitaire = salaireBase + valeurNum;
             prime.valeurUnitaire = valeurNum;
          }
          prime.montant = calculerMontant(prime);
        }
      });

      retenues.forEach((retenue) => {
        if (retenue.typeRetenue) {
          const [id, valeur, typeDeValeur] = retenue.typeRetenue.split("|");
          const valeurNum = parseFloat(valeur);
          if (typeDeValeur.includes("%")) {
            retenue.valeurUnitaire = (salaireBase * valeurNum) / 100;
          } else if (typeDeValeur.includes("MT")) {
       //     retenue.valeurUnitaire = salaireBase + valeurNum;
            retenue.valeurUnitaire = valeurNum;

          }
          retenue.montant = calculerMontant(retenue);
        }
      });
    };*/
    const updateValeurUnitaire = () => {
  const base = parseFloat(contrat.value.salaireBase) || 0;
};


    // ✅ Watch uniquement sur salaireBase → recalcul de tous les montants


    //const isDisable = ref(true);
    const fonctions = reactive([
      {
        estActif: "",
        fonction: "",
        organisation: "",
        dateDebut: "",
        dateFin: "",
      },
    ]);

    const addRowFonction = () => {
      fonctions.push({
        estActif: "",
        fonction: "",
        organisation: "",
        dateDebut: "",
        dateFin: "",
      });
    };

    const removeRowFonction = (index) => {
      if (fonctions.length > 1) fonctions.splice(index, 1);
      //totals();
    };

    const valideteRowFonction = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log("erg");
        return true;
      } else {
        return false;
      }
    };

    /* watch(
        valeurPossibles,
        (newValue) => {
          isDisable.value =
          newValue.some(
            (valeurPossible) =>
            valideteRowValeurPossible(valeurPossible.valeur) ||
            valideteRowValeurPossible(valeurPossible.libelle)
           
          );
        },
        { deep: true }
      );*/

    const handleFormSubmission = async () => {
      try {
        console.log("Données du contrat avant soumission :", contrat.value);
        await addContrat(contrat.value);
      } catch (error) {
        console.error("Erreur lors de la soumission :", error);
      }
    };
    watch(fonctions, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].estActif == "" ||
          newValue[key].fonction == "" ||
          newValue[key].organisation == "" ||
          newValue[key].dateDebut == "" ||
          newValue[key].dateFin == ""
        ) {
          isDisableee.value = true;
        } else {
          isDisableee.value = false;
        }
      });
    });

  

    watch(
      () => contrat.value.categorieContrat,
      (newValue) => {
        if (newValue === "Prestation" || newValue === "Contrat de stage") {
          // Mettre CDI par défaut au lieu de vider
          const cdi = typeOptions.value.find(
            (t) => t.label.toLowerCase().includes('cdi')
          );
          contrat.value.typeContrat = cdi ? cdi.value : 1;
        }
      }
    );

    const { remove, push, fields, update } = useFieldArray("fonctions");

    const fetchFonction = async () => {
      try {
        const response = await axios.get("all/postes");
        const fonctionData = response.data.data.data;
        console.log("ZZZZZZZZZZ ===> ", fonctionData);
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.libelle}`,
        }));
      } catch (error) {
        //Ecrire un message d'erreur ici 
      }
    };

    // const addContrat = async (values) => {
    //   if (!values || Object.keys(values).length === 0) {
    //     console.error("Erreur : L'objet 'values' est vide ou indéfini !");
    //     return;
    //   }

    //   console.log("PRIME ===> ", primes);
    //   console.log("retenues ===> ", retenues);
    //   console.log("fonctions ===> ", fonctions);
    //   console.log("horaireContrats ===> ", horaires);
    //   console.log("horaireContrat ===> ", horaires);
    //   try {
    //     // Préparez les données avant l'envoi
    //     values["contratprime"] = primes.map((prime) => ({
    //       typeprime: parseInt(prime.typePrime.split("|")[0]),
    //       valeur: prime.valeur,
    //       valeurUnitaire: prime.valeurUnitaire,
    //       montant: prime.montant,
    //       quantite: prime.quantite,
    //     }));
    //     values["contratretenue"] = retenues.map((retenue) => ({
    //       typesretenue: parseInt(retenue.typeRetenue.split("|")[0]),
    //       valeur: retenue.valeur,
    //       valeurUnitaire: retenue.valeurUnitaire,
    //       montant: retenue.montant,
    //       quantite: retenue.quantite,
    //     }));
    //     values["attributionpostes"] = attribution_postes.map((attributionposte) => ({
    //       poste: parseInt(attributionposte.poste.split("|")[0]),
    //       attribution: parseInt(attributionposte.attribution.split("|")[0]),
    //     }));
    //     values["horaireContrats"] = horaires.map((horraire) => ({
    //       jour: horraire.jour,
    //       heureArrivee: horraire.heureOuverture,
    //       heureDepart: horraire.heureFermeture,
    //       heureFinPause: horraire.heureFinPause,
    //       heureDebutPause: horraire.heureDebutPause,
    //       estActif: horraire.estActif,
    //       personnel: values.personnel,
    //     }));
    //     console.log("Soumission des données formatées :", values);
    //     const { data } = await ApiService.post("/gescom/contrats", values);
    //     if (data.code === 201) {
    //       success(data.message);
    //       router.push({ name: "ListeContrat" });
    //     }
    //   } catch (err) {
    //     console.error("Erreur d'API :", err);
    //   }
    // };


//     const addContrat = async (values) => {
//   if (!values || Object.keys(values).length === 0) {
//     console.error("Erreur : L'objet 'values' est vide ou indéfini !");
//     return;
//   }

//   try {
//     values["contratprime"] = primes.map((prime) => ({
//       typeprime: parseInt(prime.typePrime.split("|")[0]),
//       valeur: prime.valeur,
//       valeurUnitaire: prime.valeurUnitaire,
//       montant: prime.montant,
//       quantite: prime.quantite,
//     }));
//     values["contratretenue"] = retenues.map((retenue) => ({
//       typesretenue: parseInt(retenue.typeRetenue.split("|")[0]),
//       valeur: retenue.valeur,
//       valeurUnitaire: retenue.valeurUnitaire,
//       montant: retenue.montant,
//       quantite: retenue.quantite,
//     }));
//     values["attributionpostes"] = attribution_postes.map((attributionposte) => ({
//       poste: parseInt(attributionposte.poste.split("|")[0]),
//       attribution: parseInt(attributionposte.attribution.split("|")[0]),
//     }));
//     values["horaireContrats"] = horaires.map((horraire) => ({
//       jour: horraire.jour,
//       heureArrivee: horraire.heureOuverture,
//       heureDepart: horraire.heureFermeture,
//       heureFinPause: horraire.heureFinPause,
//       heureDebutPause: horraire.heureDebutPause,
//       estActif: horraire.estActif,
//       personnel: values.personnel,
//     }));
//     console.log("Données soumises à l'API :", values);

//     const { data } = await ApiService.post("/gescom/contrats", values);
//     if (data.code === 201) {
//       success(data.message);
//       console.log("Contrat ajouté avec succès, ID du personnel :", values.personnel);

//       // Recharger les personnels
//       const updatedPersonnelsResponse = await ApiService.get("/all/personnels");
//       const updatedPersonnelsData = updatedPersonnelsResponse.data.data.data;
//       console.log("Personnels récupérés après ajout :", updatedPersonnelsData);

//       // Filtrer le personnel ajouté
//       personnelOptions.value = updatedPersonnelsData
//         .filter((personnel) => String(personnel.id) !== String(values.personnel))
//         .map((personnel) => ({
//           value: personnel.id,
//           label: personnel.nom + " " + personnel.prenom,
//         }));
//       console.log("Nouvelles options pour Multiselect :", personnelOptions.value);

//       router.push({ name: "ListeContrat" });
//     }
//   } catch (err) {
//     console.error("Erreur d'API ou lors du filtrage :", err);
//   }
// };


const addContrat = async (values) => {
  if (!values || Object.keys(values).length === 0) {
    console.error("Erreur : L'objet 'values' est vide ou indéfini !");
    return;
  }

  try {
    if (
      values.categorieContrat === 'Prestation' || 
      values.categorieContrat === 'Contrat de stage'
    ) {
      const cdi = typeOptions.value.find(
        (t) => t.label.toLowerCase().includes('cdi')
      );
      values.typeContrat = cdi ? cdi.value : 1; 
    }

    const joursActifs = horaires.filter(
      (h) => h.estActif === '1' || h.estActif === 1 || h.estActif === true
    ).length;
    const nbreJoursMois = Math.round((joursActifs / 7) * 30);
    values["nbrejours"] = nbreJoursMois;

    console.log("Jours actifs/semaine :", joursActifs);
    console.log("Jours travaillés/mois :", nbreJoursMois);

    values["attributionpostes"] = attribution_postes.map((attributionposte) => ({
      poste: parseInt(attributionposte.poste.split("|")[0]),
      attribution: parseInt(attributionposte.attribution.split("|")[0]),
    }));
    values["horaireContrats"] = horaires.map((horraire) => ({
      jour: horraire.jour,
      heureArrivee: horraire.heureOuverture,
      heureDepart: horraire.heureFermeture,
      heureFinPause: horraire.heureFinPause,
      heureDebutPause: horraire.heureDebutPause,
      estActif: horraire.estActif,
      personnel: values.personnel,
    }));
    console.log("Données soumises à l'API :", values);

    const { data } = await ApiService.post("/gescom/contrats", values);
    if (data.code === 201) {
      success(data.message);
      console.log("Contrat ajouté avec succès, ID du personnel :", values.personnel);

      router.push({ name: "ListeContrat" });
    }
  } catch (err) {
    console.error("Erreur d'API :", err);
  }
};
    return {
      contrat,
      horaires,
      contratSchema,
      addContrat,
      contratForm,
      typeOptions,
      showMErr,
      types,
      fetchAttributionsByPoste,
      isDisable,
      isDisableee,
      fonctionOptions,
      removeRowFonction,
      addRowFonction,
      valideteRowFonction,
      fonctions,
      salaireDeBase,
      typeRetenueOptions,
      typeRetenues,
      isDisablee,
      personnelOptions,
      personnelId,
      personnel,
      personnels,
      modeDeTarificationOptions,
      OrganisationOptions,
      Organisation,
      removeRowHoraireContrat,
      addRowHoraireContrat,
      valideteRowHoraireContrat,
      valideteRowHoraire,
      attributionOptions,
      attribution,
      handleFormSubmission,
      attributionpostes,
      horaireContrats,
      isDisableeeeee,
      validateStep,
      addAttributionPoste,
      removeAttributionPoste,
      validateAttributionPoste,
      salaireBaseLabel // Retourner la propriété calculée
    };
  },
});
</script>

<style>
.cursor-not-allowed {
  cursor: not-allowed;
}

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

input[readonly] {
  background-color: #f0f0f0;
}

.table-responsive {
  overflow-x: auto;
}

.table thead th,
.table tbody td {
  white-space: nowrap;
}

.typePrime-col,
.quantite-col,
.valeur-col,
.valeurUnitaire-col,
.montant-col {
  min-width: 150px;
}

.actions-col {
  width: 120px;
}

.form-control {
  width: 100%;
}

.td-large {
  min-width: 250px !important; /* ou 300px si tu veux plus large */
  max-width: 350px;
  width: 30%;
}

.table .td-large .multiselect {
  width: 100%; /* Pour que le champ prenne toute la largeur disponible */
}
</style>