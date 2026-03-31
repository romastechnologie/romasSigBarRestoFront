<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-reglement-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Enregistrer un règlement</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="reglementForm" @submit="addReglement" :validation-schema="reglementSchema">
        <div class="row">

          <!-- 1. Date du règlement -->
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date du règlement <span class="text-danger">*</span>
              </label>
              <Field name="date" type="datetime-local" :value="getCurrentDateTime()" readonly
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="date" class="text-danger" />
            </div>
          </div>

          <!-- 2. Type de règlement -->
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type de règlement <span class="text-danger">*</span>
              </label>
              <Field name="typeReglement" v-model="typeReglement" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="['Commande', 'Créance']"
                  :preserve-search="true" :multiple="false" :searchable="true"
                  placeholder="Sélectionner le type de reglement" label="label" track-by="label"
                  @select="onTypeReglementSelect" />
              </Field>
              <ErrorMessage name="typeReglement" class="text-danger" />
            </div>
          </div>

          <!-- 3. Sélection Créance (si type = Créance) -->
          <div class="col-md-4 mb-3" v-if="selectedTypeReglement === 'Créance'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Créance <span class="text-danger">*</span>
              </label>
              <Field name="creance" v-model="creance" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="creanceOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner une créance" label="label"
                  track-by="label" @select="onCreanceSelect" />
              </Field>
              <ErrorMessage name="creance" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="selectedTypeReglement === 'Créance'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Montant Créance</label>
              <input type="text" :value="montantCreance || 0" readonly v-format-montant
                class="form-control shadow-none fs-md-15 text-black" />
            </div>
          </div>
          <div class="col-md-4 mb-3" v-if="selectedTypeReglement === 'Créance'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Reste à payer (Créance)</label>
              <input type="text" v-format-montant :value="calculatedResteAPayer" readonly
                class="form-control shadow-none fs-md-15 text-black" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="selectedTypeReglement === 'Commande'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Commandes non payées <span class="text-danger">*</span>
              </label>
              <Field name="commande" v-slot="{ field }">
                <Multiselect :options="commandesOptions" :searchable="true" track-by="value" label="label"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner la commande"
                  @change="handleCommandeChange"
                  :disabled="selectedModeReglementLabel?.toUpperCase() === 'ESPECES' && !caisseActive" />
              </Field>
              <ErrorMessage name="commande" class="text-danger" />
            </div>
          </div>

          <!-- Montant TTC avec tooltip récapitulatif -->
          <div class="col-md-4 mb-3" v-if="selectedTypeReglement === 'Commande'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Montant TTC <span class="text-danger">*</span>
              </label>

              <div class="tooltip-wrapper">
                <Field name="montantTtc">
                  <input type="number" v-model="montantTtc" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le montant" readonly
                    :disabled="selectedModeReglementLabel?.toUpperCase() === 'ESPECES' && !caisseActive" />
                </Field>

                <div class="tooltip-box" v-if="commandeSelectionnee">
                  <strong>Récapitulatif :</strong>
                  <ul class="mb-0 mt-1">
                    <li>Montant total : {{ commandeSelectionnee.montTTC }} Fcfa</li>
                    <li>Déjà payé : {{ commandeSelectionnee.montantDejaPaye }} Fcfa</li>
                    <li>Restant : {{ commandeSelectionnee.montantRest }} Fcfa</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Montant payé <span class="text-danger">*</span>
              </label>
              <Field name="montantPaye" v-slot="{ field }">
                <input type="text" v-bind="field" v-format-montant v-model="montantPaye"
                  class="form-control shadow-none fs-md-15 text-black" name="montantPaye" />
              </Field>
              <ErrorMessage name="montantPaye" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="selectedTypeReglement === 'Commande'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Montant Reste à Payer</label>
              <Field name="montantRest" v-slot="{ field }">
                <input type="number" v-bind="field" readonly class="form-control shadow-none fs-md-15 text-black" />
              </Field>
            </div>
          </div>

          <!-- 6. Mode de règlement (toujours visible) -->
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mode de règlement <span class="text-danger">*</span>
              </label>
              <Field name="modeReglement" v-model="modeReglement" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="modeReglementOptions"
                  :preserve-search="true" :multiple="false" :searchable="true"
                  placeholder="Sélectionner un mode de règlement" label="label" track-by="label"
                  @select="onModeReglementSelect" />
              </Field>
              <ErrorMessage name="modeReglement" class="text-danger" />
            </div>
          </div>

          <!-- 7. Référence Document (toujours visible) -->
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Référence Document <span class="text-danger">*</span>
              </label>
              <Field name="refDocument" v-slot="{ field }">
                <input type="text" v-bind="field" v-model="refDocument"
                  class="form-control shadow-none fs-md-15 text-black" name="refDocument" />
              </Field>
              <ErrorMessage name="refDocument" class="text-danger" />
            </div>
          </div>

          <!-- 8. Champs conditionnels selon mode règlement -->
          <div class="col-md-4 mb-3" v-if="showCompteField">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">Compte <span class="text-danger">*</span></label>
              <Field name="compte" v-model="compte" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="compteOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner un compte" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="compte" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="showRefTransactionField">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Référence de transaction <span class="text-danger">*</span>
              </label>
              <Field type="text" name="refTransaction" v-model="refTransaction"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="refTransaction" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="showBanqueField">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">Banque <span class="text-danger">*</span></label>
              <Field name="banque" v-model="banque" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="banqueOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner une banque" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="banque" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="showNumCompteField">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Numéro de chèque <span class="text-danger">*</span>
              </label>
              <Field type="text" name="numeroCheque" v-model="numeroCheque"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="numeroCheque" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="showDateChequeField">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date d'émission du chèque <span class="text-danger">*</span>
              </label>
              <Field name="dateCheque" type="datetime-local" :value="getCurrentDateTime()"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateCheque" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3" v-if="showDateVirementField">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date du virement <span class="text-danger">*</span>
              </label>
              <Field name="dateVirement" type="datetime-local" :value="getCurrentDateTime()"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateVirement" class="text-danger" />
            </div>
          </div>

          <!-- 9. Billetage (si Commande + ESPECES) -->
          <div
            v-if="selectedModeReglementLabel?.toUpperCase() === 'ESPECES' && selectedTypeReglement === 'Commande' && caisseActive"
            class="col-md-12">
            <div class="row">
              <!-- Billetage Encaissement -->
              <div class="col-md-6 mb-md-12">
                <div class="border border-primary mb-5">
                  <div class="row fw-bold py-2" style="background-color: #0a59a4">
                    <div class="col-md-7">
                      <h3 class="h3 fs-4 text-white">Billetage Paiement</h3>
                    </div>
                    <div class="col-md-5">
                      <h3 class="fs-5 text-white" style="text-align: end;font-weight: bold;"
                        v-if="montantTotalEncaissement">{{ montantTotalEncaissement }} Fcfa</h3>
                    </div>
                  </div>
                  <div class="px-3">
                    <div class="row mt-2">
                      <div class="col-md-4"><label class="fw-semibold">Monnaie</label></div>
                      <div class="col-md-4"><label class="fw-semibold">Quantité</label></div>
                      <div class="col-md-4"><label class="fw-semibold">Montant</label></div>
                    </div>
                    <hr class="mt-0" />
                    <template v-for="(billetage, index) in billetageList" :key="index">
                      <div class="container-tight m-0 py-1">
                        <div class="row align-items-center">
                          <div class="col-md-4 px-1">
                            <input name="monnaie" v-model="billetage.libelle" readonly
                              class="form-control compact-input" placeholder="Monnaie" />
                          </div>
                          <div class="col-md-4 px-1">
                            <Field :name="`billetageList[${index}].qteBillet`" type="number" min="0"
                              v-model="billetage.qteBillet"
                              @input="event => handleBilletageInput(event, billetage, 'encaissement')"
                              @keypress="restrictInput($event)" class="form-control compact-input" placeholder="Qté"
                              :disabled="!caisseActive" />
                            <ErrorMessage :name="`billetageList[${index}].qteBillet`"
                              class="text-danger compact-error" />
                          </div>
                          <div class="col-md-4 px-1">
                            <input type="text" v-model="billetage.montant" readonly placeholder="Montant"
                              class="form-control compact-input" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Billetage Sortie / Reliquat -->
              <div class="col-md-6 mb-md-12">
                <div class="border mb-5"
                  :class="montantManquant > 0 ? 'border-indigo-500 bg-indigo-50' : 'border-danger'">
                  <div class="row fw-bold py-2"
                    :style="montantManquant > 0 ? 'background-color: #6366f1; color: white' : 'background-color: #a40a0a'">
                    <div class="col-md-7">
                      <h3 class="h3 fs-4 text-white">
                        {{ montantManquant > 0 ? 'Montant Manquant' : 'Reliquat à Rendre' }}
                      </h3>
                    </div>
                    <div class="col-md-5">
                      <h3 class="fs-5 text-white" style="text-align: end;font-weight: bold;">
                        {{ montantManquant > 0 ? montantManquant : reliquatCalcule }} Fcfa
                      </h3>
                    </div>
                  </div>
                  <div class="px-3" v-if="montantManquant === 0">
                    <div class="row mt-2">
                      <div class="col-md-4"><label class="fw-semibold">Monnaie</label></div>
                      <div class="col-md-4"><label class="fw-semibold">Quantité</label></div>
                      <div class="col-md-4"><label class="fw-semibold">Montant</label></div>
                    </div>
                    <hr class="mt-0" />
                    <template v-for="(billetage, index) in billetageSortieList" :key="index">
                      <div class="container-tight m-0 py-1">
                        <div class="row align-items-center">
                          <div class="col-md-4 px-1">
                            <input name="monnaie" v-model="billetage.libelle" readonly
                              class="form-control compact-input" placeholder="Monnaie" />
                          </div>
                          <div class="col-md-4 px-1">
                            <Field :name="`billetageSortieList[${index}].qteBillet`" type="number" min="0"
                              v-model="billetage.qteBillet"
                              @input="event => handleBilletageInput(event, billetage, 'sortie')"
                              @blur="() => { if (!billetage.qteBillet) billetage.qteBillet = 0 }"
                              @keypress="restrictInput($event)" class="form-control compact-input" placeholder="Qté"
                              :disabled="!caisseActive" />
                            <ErrorMessage :name="`billetageSortieList[${index}].qteBillet`"
                              class="text-danger compact-error" />
                          </div>
                          <div class="col-md-4 px-1">
                            <input type="text" v-model="billetage.montant" readonly placeholder="Montant"
                              class="form-control compact-input" />
                          </div>
                        </div>
                      </div>
                    </template>
                    <div v-if="montantTotalSortie > reliquatCalcule" class="text-danger mt-2">
                      Le billetage de sortie ({{ montantTotalSortie }} Fcfa) dépasse le reliquat
                      ({{ reliquatCalcule }} Fcfa).
                    </div>
                  </div>
                  <div class="px-3 py-4 text-center" v-else>
                    <i class="fa fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                    <p class="mb-2 text-dark fw-bold">Paiement Partiel</p>
                    <p class="mb-0 text-muted">
                      Il manque encore <strong class="text-warning">{{ montantManquant }} Fcfa</strong>
                    </p>
                    <p class="mb-0 text-muted small mt-2">Le client pourra compléter le paiement plus tard</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reliquat à retourner -->
            <div class="row mt-3">
              <div class="col-md-10"></div>
              <div class="col-md-2">
                <div class="form-group mb-2">
                  <label class="form-label fw-semibold mb-1 text-start d-block">Reliquat à retourner</label>
                  <input type="number" class="form-control form-control-sm shadow-none text-start"
                    v-model.number="reliquatRetourner" readonly :class="{ 'is-warning': reliquatRetourner > 0 }" />
                  <div v-if="reliquatRetourner > 0" class="text-black mt-2">
                    Reliquat non rendu : {{ reliquatRetourner }} Fcfa.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 10. Échéances (si Créance) -->
          <div class="col-md-12" v-if="creanceValue?.echeances?.length">
            <h5 class="mt-3">Échéances</h5>
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Date Échéance</th>
                  <th>Montant</th>
                  <th>Reste à payer</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(echeance, index) in creanceValue.echeances" :key="index">
                  <td>{{ format_Date(echeance.date) }}</td>
                  <td>{{ separateur(echeance.montant) }}</td>
                  <td>{{ separateur(echeance.reste_a_payer) }}</td>
                  <td>
                    <span :class="['badge', getStatutBadge(echeance).class]">{{ getStatutBadge(echeance).text }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 11. Boutons -->
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button ref="submitButton" class="btn btn-primary me-3" type="submit">
                Enregistrer le règlement
              </button>
              <router-link to="/reglements/liste-reglements" class="btn btn-danger">
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
import { defineComponent, onMounted, ref, computed, watch, reactive } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, format_date, format_Date, monSwal, separateur, success } from '@/utils/utils';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import router from '@/router';
import { useAuthStore } from '@/services/auth';


interface BilletageForm {
  libelle: string;
  qteBillet: number;
  montant: number;
  monnaie: number;
  valueAct: number;
}

export default defineComponent({
  name: "AddReglement",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },

  setup: () => {
    const showCompteField = ref(false);
    const showBanqueField = ref(false);
    const showNumCompteField = ref(false);
    const showDateVirementField = ref(false);
    const showRefTransactionField = ref(false);
    const showDateChequeField = ref(false);
    const montantCreance = ref<number>(0);
    const typeReglement = ref('');
    // Schéma de validation dynamique
    const reglementSchema = computed(() => {
      const schema: any = {
        date: Yup.string().required('La date du règlement est obligatoire'),
        refDocument: Yup.string().required('La référence est obligatoire'),
        //echeance: Yup.number().required('L\'échéance est obligatoire').typeError('Veuillez sélectionner une échéance'),
        montantPaye: Yup.string()
          .required('Le montant payé est obligatoire')
          .typeError('Veuillez entrer un nombre')
          .min(1, 'Le montant payé doit être supérieur à 0')
          .test(
            'montant-max',
            'Le montant payé ne peut pas dépasser le reste à payer',
            function (value) {
              if (selectedTypeReglement.value === 'Commande') {
                return true;
              }
              if (selectedTypeReglement.value === 'Créance') {
                const montantPayeNum = parseInt((value || '0').toString().replace(/\s+/g, ''));
                return montantPayeNum <= montantCreance.value;
              }
              return true;
            }
          ),
        modeReglement: Yup.number().required('Le mode de règlement est obligatoire').typeError('Veuillez sélectionner un mode de règlement'),
      };

      if (showCompteField.value) {
        schema.compte = Yup.number().required('Le compte est obligatoire').typeError('Veuillez sélectionner un compte');
      }
      if (showBanqueField.value) {
        schema.banque = Yup.number().required('La banque est obligatoire').typeError('Veuillez sélectionner une banque');
      }
      if (showNumCompteField.value) {
        schema.numeroCheque = Yup.string().required('Le numéro de chèque est obligatoire');
      }
      if (showDateChequeField.value) {
        schema.dateCheque = Yup.string().required('La date du chèque est obligatoire');
      }
      if (showDateVirementField.value) {
        schema.dateVirement = Yup.string().required('La date du virement est obligatoire');
      }
      if (showRefTransactionField.value) {
        schema.refTransaction = Yup.string().required('La référence de transaction est obligatoire');
      }

      if (selectedTypeReglement.value === 'Créance') {
        schema.creance = Yup.string().required('La créance est obligatoire');
      } else if (selectedTypeReglement.value === 'Commande') {
        schema.commande = Yup.number().required('La commande est obligatoire');
      }

      if (selectedTypeReglement.value === 'Commande') {
        schema.montantTtc = Yup.number()
          .typeError('Le montant doit être un nombre valide')
          .required('Le montant est obligatoire')
          .min(0, 'Le montant doit être positif');

        schema.billetageList = Yup.array().when('modeReglement', {
          is: 1,
          then: (schema) =>
            schema.of(
              Yup.object().shape({
                qteBillet: Yup.number()
                  .transform((value, originalValue) =>
                    originalValue === '' || originalValue === null ? 0 : value
                  )
                  .typeError('La quantité doit être un nombre')
                  .required('La quantité est obligatoire')
                  .integer('La quantité doit être un entier')
                  .min(0, 'La quantité ne peut pas être négative')
                  .default(0)
              })
            ).required('Les encaissements sont obligatoires pour le paiement en espèces')
              .test(
                'encaissement-min',
                'Le total encaissé doit être supérieur à 0',
                function () {
                  const encaissement = montantTotalEncaissement.value || 0;
                  return encaissement > 0;
                }
              ),
          otherwise: (schema) => schema.notRequired()
        });
        schema.billetageSortieList = Yup.array().when('modeReglement', {
          is: 1,
          then: (schema) =>
            schema.of(
              Yup.object().shape({
                qteBillet: Yup.number()
                  .transform((value, originalValue) =>
                    originalValue === '' || originalValue === null ? 0 : value
                  )
                  .typeError('La quantité doit être un nombre')
                  .required('La quantité est obligatoire')
                  .integer('La quantité doit être un entier')
                  .min(0, 'La quantité ne peut pas être négative')
                  .default(0)
              })
            ).required('Les reliquats sont obligatoires pour le paiement en espèces')
              .test(
                'reliquat-not-exceed',
                'Le total du billetage de sortie ne peut pas dépasser le reliquat',
                function () {
                  const sortie = montantTotalSortie.value || 0;
                  const reliquat = reliquatCalcule.value || 0;
                  return sortie <= reliquat;
                }
              ),
          otherwise: (schema) => schema.notRequired()
        });
        schema.reliquatRetourner = Yup.number()
          .typeError('Le reliquat à retourner doit être un nombre valide')
          .min(0, 'Le reliquat à retourner ne peut pas être négatif')
          .test(
            'reliquat-retourner-match',
            'Le reliquat à retourner doit correspondre au calcul',
            function () {
              const reliquat = reliquatCalcule.value || 0;
              const sortie = montantTotalSortie.value || 0;
              const expectedReliquatRetourner = reliquat - sortie >= 0 ? reliquat - sortie : 0;
              return reliquatRetourner.value === expectedReliquatRetourner;
            }
          );
      }
      return Yup.object().shape(schema);
    });

    // Fonction pour obtenir la date et l'heure actuelles
    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    const { values } = useForm()

    // Variables réactives
    const creanceOptions = ref([]);
    const echeanceOptions = ref([]);
    const modeReglementOptions = ref([]);
    const compteOptions = ref([]);
    const banqueOptions = ref([]);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const creance = ref(null);
    const echeance = ref(null);
    const creanceValue = ref(null);
    const selectedEcheance = ref<any>(null);
    const montantPaye = ref('');
    const montantRestPaye = ref('');
    const modeReglement = ref(null);
    const selectedModeReglementLabel = ref<string | null>(null);
    const compte = ref(null);
    const banque = ref(null);
    const numeroCheque = ref<string>('');
    const refTransaction = ref<string>('');
    const telephoneMoMo = ref<string>('');
    const validPhone = ref<boolean>(false);
    const billetageList = reactive<BilletageForm[]>([]);
    const billetageSortieList = reactive<BilletageForm[]>([]);
    const monnaieList = ref<any[]>([]);
    const montantTotalEncaissement = ref<number | null>(null);
    const montantTotalSortie = ref<number | null>(null);
    const commandesOptions = ref([]);
    const reliquatRetourner = ref(0);
    const caisseId = ref<number | null>(null);
    const showCaisseClosedMessage = ref<boolean>(false);
    const caisseActive = ref<boolean>(false);
    // const selectedModePaiement = ref<number | null>(1);
    const selectedTypeReglement = ref<string | null>(null);
    const montantTtc = ref<number | null>(null);
    const typeOperationId = ref<number>(1);
    const reglementForm = ref<InstanceType<typeof Form> | null>(null);
    const selectedCommande = ref(null);
    const { resetForm } = useForm();
    const store = useAuthStore();
    const montant = ref<number | null>(null);







    const montantManquant = computed(() => {
      if (!montantTotalEncaissement.value || !montantTtc.value) {
        return 0;
      }
      const difference = montantTtc.value - montantTotalEncaissement.value;
      return difference > 0 ? difference : 0;
    });

    const onTypeReglementSelect = async (value: string) => {
      selectedTypeReglement.value = value;
      montantPaye.value = '';
      montantCreance.value = 0;
      creance.value = null;
      selectedCommande.value = null;
      montantTtc.value = null;

      if (value === 'Commande' && !caisseActive.value) {
        const confirmed = await monSwal(
          "Aucune caisse ouverte n'est disponible. Voulez-vous ouvrir une caisse maintenant ?",
          "Ouvrir la caisse",
          "btn btn-primary",
          "Plus tard",
          "Vous pourrez ouvrir une caisse plus tard."
        );

        if (confirmed) {
          ouvrirCaisse();
        }
      }
    };

    const veriferCaisseOuverte = async () => {
      store.loadCaisseFromStorage();
      console.log("storeee", store.isCaisseOuverte);

      if (store.isCaisseOuverte()) {
        caisseActive.value = true;
        caisseId.value = store.getCaisseId();
        showCaisseClosedMessage.value = false;
        console.log("Caisse déjà en session:", caisseId.value);
        return;
      }

      try {
        const response = await ApiService.get("/ouvfer");
        console.log("Réponse /ouvfer:", response.data);

        if (response.data.code === 200) {
          if (response.data.data) {
            const ouvertureData = response.data.data;
            console.log("je suisiiiiiiiii", ouvertureData);
            store.setCaisseOuverte(ouvertureData);
            caisseActive.value = true;
            caisseId.value = ouvertureData.id;
            showCaisseClosedMessage.value = false;

            console.log("Caisse ouverte chargée depuis API:", {
              ouvertureId: ouvertureData.id,
              caisseId: ouvertureData.caisse.id,
              nom: ouvertureData.caisse.nom
            });
          } else {
            caisseActive.value = false;
            caisseId.value = null;
            showCaisseClosedMessage.value = false;
          }
        }
      } catch (err: any) {
        caisseActive.value = false;
        caisseId.value = null;
        const msg = err.response?.data?.message || "Impossible de vérifier la caisse";
        error(msg);
      }
    };

    const ouvrirCaisse = () => {
      router.push({ name: 'AddOuvFermPage' })
    };

    const montantError = computed(() => {
      if (selectedModeReglementLabel.value?.toUpperCase() !== 'ESPECES') {
        return null;
      }

      if (montantTtc.value === null || montantTotalEncaissement.value === null) {
        return null;
      }

      const encaissement = montantTotalEncaissement.value || 0;
      const ttc = montantTtc.value || 0;
      const sortie = montantTotalSortie.value || 0;
      const reliquat = encaissement - ttc;

      if (reliquat > 0 && sortie > reliquat) {
        return `Le billetage de sortie (${sortie} Fcfa) ne peut pas dépasser le reliquat (${reliquat} Fcfa)`;
      }

      return null;
    });

    const getAllMonnaies = async () => {
      try {
        const res = await ApiService.get("/all/monnaies");
        monnaieList.value = res.data.data.data;
        billetageList.splice(0, billetageList.length);
        billetageSortieList.splice(0, billetageSortieList.length);
        monnaieList.value.forEach((element) => {
          const billetage = {
            libelle: element.libelle,
            montant: 0,
            valueAct: element.valeur,
            monnaie: element.id,
            qteBillet: 0,
          };
          billetageList.push({ ...billetage });
          billetageSortieList.push({ ...billetage });
        });
      } catch (err) {
        console.error("Erreur lors de la récupération des monnaies:", err);
        error("Erreur lors de la récupération des monnaies");
      }
    };

    const verifierBillets = async (): Promise<boolean> => {
      if (reliquatCalcule.value <= 0) return true;

      const billetsAVerifier = billetageSortieList
        .filter(b => b.qteBillet > 0)
        .map(b => ({
          monnaie: b.valueAct,
          qteBillet: b.qteBillet
        }));

      if (billetsAVerifier.length === 0) return true;

      try {
        const response = await ApiService.post('/caisse/verifier-billets', {
          billets: billetsAVerifier
        });

        if (!response.data.success) {
          error(response.data.message);
          return false;
        }

        return true;
      } catch (err) {
        error("Erreur lors de la vérification des billets en caisse");
        return false;
      }
    };
    const fetchCommande = async () => {
      try {
        const response = await ApiService.get('/commandesNonPaye');
        console.log("vallll", response);
        const commandeDonnees = response.data.data;
        commandesOptions.value = commandeDonnees.map((commande) => {
          const montantDejaPaye = commande.montTTC - commande.montantRest;
          const pourcentagePaye = ((montantDejaPaye / commande.montTTC) * 100).toFixed(0);

          return {
            value: commande.id,
            label: `${commande.refCom} - ${commande.client.nomClient} - Reste: ${commande.montantRest} Fcfa ${montantDejaPaye > 0 ? `(${pourcentagePaye}% payé)` : ''}`,
            montTTC: commande.montTTC,
            montantRest: commande.montantRest,
            montantDejaPaye: montantDejaPaye,
          };
        });

        console.log("Commandes options :", commandesOptions.value);
        console.log("Première commande :", commandesOptions.value[0]);

      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    };

    const commandeSelectionnee = computed(() => {
      if (!selectedCommande.value) return null;
      return commandesOptions.value.find(cmd => cmd.value === selectedCommande.value);
    });

    const reliquatCalcule = computed(() => {
      if (!montantTotalEncaissement.value || !montantTtc.value) {
        return 0;
      }
      const difference = montantTotalEncaissement.value - montantTtc.value;
      return difference > 0 ? difference : 0;
    });

    const calculateReliquatRetourner = () => {
      const sortie = montantTotalSortie.value || 0;
      const reliquat = reliquatCalcule.value || 0;
      reliquatRetourner.value = reliquat - sortie >= 0 ? reliquat - sortie : 0;
    };

    //  const handleBilletageInput = (event: Event, billetage: BilletageForm, type: 'encaissement' | 'sortie') => {
    //   const newValue = Number((event.target as HTMLInputElement).value);
    //   billetage.qteBillet = isNaN(newValue) || newValue < 0 ? 0 : newValue;
    //   updateMontant(billetage, type);
    //   calculateMontantRest();
    // };

    const handleBilletageInput = async (event: Event, billetage: BilletageForm, type: 'encaissement' | 'sortie') => {
      const newValue = Number((event.target as HTMLInputElement).value);
      billetage.qteBillet = isNaN(newValue) || newValue < 0 ? 0 : newValue;
      updateMontant(billetage, type);
      calculateMontantRest();

      if (type === 'sortie' && billetage.qteBillet > 0) {
        await verifierBillets();
      }
    };

    const updateMontant = (billetage: BilletageForm, type: 'encaissement' | 'sortie') => {
      billetage.montant = billetage.qteBillet * billetage.valueAct || 0;
      if (type === 'encaissement') {
        calculateTotalEncaissement();
      } else {
        calculateTotalSortie();
      }
    };

    // const calculateTotalEncaissement = () => {
    //   const total = billetageList.reduce((total, billetage) => {
    //     return total + (billetage.montant || 0);
    //   }, 0);
    //   montantTotalEncaissement.value = total || null;

    //   if (reglementForm.value) {
    //     reglementForm.value.setFieldValue('montantPaye', total);
    //   }
    //   montantPaye.value = total.toString();

    //   calculateReliquatRetourner();
    // };

    const calculateTotalEncaissement = () => {
      const total = billetageList.reduce((total, billetage) => {
        return total + (billetage.montant || 0);
      }, 0);

      montantTotalEncaissement.value = total || null;

      const montantFinal = Math.min(total, montantTtc.value || total);

      if (reglementForm.value) {
        reglementForm.value.setFieldValue('montantPaye', montantFinal);
      }
      montantPaye.value = montantFinal.toString();

      calculateReliquatRetourner();
    };


    const calculateTotalSortie = () => {
      const total = billetageSortieList.reduce((total, billetage) => {
        return total + (billetage.montant || 0);
      }, 0);
      montantTotalSortie.value = total || null;
      calculateReliquatRetourner();
    };

    watch([montantTotalEncaissement, montantTotalSortie, montantTtc], () => {
      calculateReliquatRetourner();
    });

    const cancelOperation = async () => {
      const confirmed = await monSwal(
        "Voulez-vous vraiment annuler l'opération ?",
        "Confirmer",
        "btn btn-primary",
        "Annuler",
        "L'opération a été annulée !"
      );
      if (confirmed) {
        if (reglementForm.value) {
          resetForm();
        } else {
          console.warn('billetageForm n\'est pas défini');
        }
        billetageList.length = 0;
        billetageSortieList.length = 0;
        montant.value = null;
        montantTtc.value = null;
        montantPaye.value = null;
        reliquatRetourner.value = 0;
        selectedCommande.value = null;
        selectedModeReglementLabel.value = null;
        selectedTypeReglement.value = null;
        typeReglement.value = ''
        await getAllMonnaies();
        if (reglementForm.value) {
          reglementForm.value.setFieldValue('modePaiement', 1);
        }
        router.push({ name: 'AddPaiement' });
      }
    };

    watch(billetageList, () => {
      calculateTotalEncaissement();
    }, { deep: true });

    watch(billetageSortieList, () => {
      calculateTotalSortie();
    }, { deep: true });


    const handleCommandeChange = (value: any) => {
      console.log("Valeur reçue :", value);
      selectedCommande.value = value;
      if (!value) {
        montantTtc.value = null;
        montantPaye.value = null;
        return;
      }

      const commande = commandesOptions.value.find(
        (cmd: any) => cmd.value === value
      );

      console.log("infoooooooooiciiii", commande);

      if (commande) {
        montantTtc.value = commande.montantRest;
        if (reglementForm.value) {
          reglementForm.value.setFieldValue('montantTtc', commande.montantRest);
        }

        if (selectedModeReglementLabel.value?.toUpperCase() === 'ESPECES') {
          montantPaye.value = commande.montantRest;
          if (reglementForm.value) {
            reglementForm.value.setFieldValue('montantPaye', commande.montantRest);
            reglementForm.value.setFieldValue('montantRest', 0);
          }
        } else {
          montantPaye.value = null;
          if (reglementForm.value) {
            reglementForm.value.setFieldValue('montantRest', commande.montantRest);
          }
        }
      } else {
        montantTtc.value = null;
        montantPaye.value = null;
      }
    };


    const calculatedResteAPayer = computed(() => {
      if (!montantCreance.value) return 0;
      return Math.max(0, montantCreance.value - parseInt((montantPaye.value.replace(/\s+/g, '') || 0).toString()));
    });

    const calculateMontantRest = () => {
      const montantTtcValue = montantTtc.value || 0;

      if (selectedModeReglementLabel.value?.toUpperCase() === 'ESPECES') {
        const encaissement = montantTotalEncaissement.value || 0;
        const montantRestValue = montantTtcValue - encaissement;
        if (reglementForm.value) {
          reglementForm.value.setFieldValue('montantRest', montantRestValue >= 0 ? montantRestValue : 0);
        }
      } else {
        const montantPayeValue = parseInt(montantPaye.value.toString().replace(/\s+/g, '') || '0');
        const montantRestValue = montantTtcValue - montantPayeValue;
        if (reglementForm.value) {
          reglementForm.value.setFieldValue('montantRest', montantRestValue >= 0 ? montantRestValue : 0);
        }
      }
    };


    // Charger les créances
    const getAllCreances = async () => {
      try {
        const response = await ApiService.get('/all/creances');
        const creancesData = response.data.data;
        creanceOptions.value = creancesData.map((cre: any) => ({
          value: cre.id + "|" + cre.reste_a_payer,
          label: `${cre.refCrean} - ${cre.client.nomClient && cre.client.prenomClient
              ? `${cre.client.nomClient} ${cre.client.prenomClient}`
              : cre.client.raisonSociale || 'Client inconnu'
            } - Montant: ${cre.montant} reste à payer: ${cre.reste_a_payer}`,
          creance: cre,
        }));

      } catch (err) {
        error(err.message);
      }
    };
    // Charger les échéances
    /*  const getAllEcheances = async () => {
        try {
          const response = await ApiService.get('/all/echeances');
          const echeancesData = response.data.data;
          echeanceOptions.value = echeancesData.map((ech: any) => ({
            value: ech.id,
            label: `${format_Date(ech.date)} - ${
              ech.creance.client.nomClient && ech.creance.client.prenomClient
                ? `${ech.creance.client.nomClient} ${ech.creance.client.prenomClient}`
                : ech.creance.client.nomClient || ech.creance.client.raisonSociale || 'Client inconnu'
            } - ${ech.montant} (Reste: ${ech.reste_a_payer})`,
            echeance: ech,
          }));
        } catch (err) {
          error(err.message);
        }
      }; */

    // // Filtrer les échéances en fonction de la créance sélectionnée
    // const filteredEcheanceOptions = computed(() => {
    //   if (!creance.value) return [];
    //   return echeanceOptions.value.filter((option: any) => option.echeance.creance.id === creance.value);
    // });

    // Charger les modes de règlement
    const getAllModesReglement = async () => {
      try {
        const response = await ApiService.get('/modes-reglement');
        const modesData = response.data.data;
        modeReglementOptions.value = modesData.map((mode: any) => ({
          value: mode.id,
          label: mode.libelle,
        }));
      } catch (err) {
        error(err.message);
      }
    };

    // Charger les comptes
    const getAllComptes = async () => {
      try {
        const response = await ApiService.get('/comptes-entreprise');
        const comptesData = response.data.data;
        compteOptions.value = comptesData.map((compte: any) => ({
          value: compte.id,
          label: `${compte.intituleCompteEnt} - ${compte.typeCompte}-${compte.telephoneMoMo || compte.numeroCompteEnt}`,
        }));
      } catch (err) {
        error(err.message);
      }
    };

    // Charger les banques
    const getAllBanques = async () => {
      try {
        const response = await ApiService.get('/banques');
        const banquesData = response.data.data;
        banqueOptions.value = banquesData.map((banque: any) => ({
          value: banque.id,
          label: banque.denominationBanque,
        }));
      } catch (err) {
        error(err.message);
      }
    };
    //recupère une créance
    function getCreance(id: string) {
      return ApiService.get("/creances/", id)
        .then(({ data }) => {
          creanceValue.value = data.data;
        })
        .catch(({ response }) => {
          error(response?.data?.message || "Erreur lors de la récupération de la créance");
        });
    }

    const onModeReglementSelect = (value: number) => {
      const selectedMode = modeReglementOptions.value.find((option: any) => option.value === value);
      selectedModeReglementLabel.value = selectedMode ? selectedMode.label : null;
      resetFields();
      if (selectedModeReglementLabel.value) {
        const modeLabel = selectedModeReglementLabel.value.toUpperCase();
        if (modeLabel === 'ESPECES') {
          showCompteField.value = false;
          showBanqueField.value = false;
          showNumCompteField.value = false;
          showDateVirementField.value = false;
          showDateChequeField.value = false;
          showRefTransactionField.value = false;

          if (selectedTypeReglement.value === 'Commande') {
            getAllMonnaies();
          }

        } else if (modeLabel === 'CHEQUES') {
          showCompteField.value = false;
          showBanqueField.value = true;
          showNumCompteField.value = true;
          showDateVirementField.value = false;
          showDateChequeField.value = true;
          showRefTransactionField.value = false;

        } else if (modeLabel === 'VIREMENT BANCAIRE') {
          showCompteField.value = true;
          showBanqueField.value = false;
          showNumCompteField.value = false;
          showDateChequeField.value = false;
          showDateVirementField.value = true; // Activer le champ dateVirement
          showRefTransactionField.value = false;

        } else if (modeLabel === 'MOBILE MONEY') {
          showCompteField.value = true;
          showBanqueField.value = false;
          showNumCompteField.value = false;
          showDateVirementField.value = false;
          showDateChequeField.value = false;
          showRefTransactionField.value = true;

        }
      }
    };

    // Réinitialiser les champs
    const resetFields = () => {
      compte.value = null;
      banque.value = null;
      numeroCheque.value = '';
    };

    // Sélection de la créance
    const onCreanceSelect = (value) => {
      console.log("Créance sélectionnée :", value);
      montantCreance.value = value.split('|')[1] ? parseInt(value.split('|')[1]) : 0;
      modeReglement.value = null;
      montantPaye.value = "0";
      getCreance(value.split('|')[0])
    };

    // Sélection de l'échéance
    // const onEcheanceSelect = (value: number) => {
    //   const selected = echeanceOptions.value.find((option: any) => option.value === value);
    //   selectedEcheance.value = selected ? selected.echeance : null;
    //   montantPaye.value = "0";
    // };

    const addReglement = async (values: any, { resetForm }: any) => {
      if (submitButton.value) {
        submitButton.value.disabled = true;
      }

      if (selectedModeReglementLabel.value?.toUpperCase() === 'ESPECES'
        && selectedTypeReglement.value === 'Commande') {

        const billetsOk = await verifierBillets();

        if (!billetsOk) {
          submitButton.value!.disabled = false;
          return;
        }
      }

      const reglementData: any = {
        date: values.date,
        montantPaye: parseInt((montantPaye.value.replace(/\s+/g, '')).toString()),
        refDocument: values.refDocument,
        modeReglement: values.modeReglement,
      };

      if (selectedTypeReglement.value === 'Créance') {
        reglementData.creance = values.creance.split('|')[0];
      } else if (selectedTypeReglement.value === 'Commande') {
        reglementData.commande = values.commande;
        reglementData.montantTtc = montantTtc.value;
        reglementData.montantRest = values.montantRest;
        reglementData.caisseId = caisseId.value;

        if (selectedModeReglementLabel.value?.toUpperCase() === 'ESPECES') {
          reglementData.billetagesEncaissement = billetageList;
          reglementData.montantTotalEncaissement = montantTotalEncaissement.value;
          reglementData.billetagesSortie = billetageSortieList;
          reglementData.montantTotalSortie = montantTotalSortie.value || 0;
          reglementData.reliquat = reliquatCalcule.value;
          reglementData.reliquatRetourner = reliquatRetourner.value;
          reglementData.montantDu = commandeSelectionnee.value.montTTC;
        }
      }

      if (showCompteField.value) {

        reglementData.compte = values.compte;
      }
      if (showBanqueField.value) {
        reglementData.banque = values.banque;
      }
      if (showNumCompteField.value) {
        reglementData.numeroCheque = values.numeroCheque;
      }
      if (showDateVirementField.value) {
        reglementData.dateVirement = values.dateVirement;
      }
      if (showRefTransactionField.value) {
        reglementData.refTransaction = values.refTransaction;
      }

      console.log("Données envoyées au serveur :", reglementData);

      try {
        const response = await ApiService.post("/reglements", reglementData);
        if (response.data.code === 201) {
          success(response.data.message);
          resetForm();
          router.push({ name: "ListeReglement" });
        }
      } catch (err) {
        submitButton.value!.disabled = false;
        error(err.message);
      }
    };

    const getStatutBadge = (echeance: any) => {
      const today = new Date();
      const echeanceDate = new Date(echeance.date);

      // 1. Payé (reste_a_payer = 0)
      if (echeance.reste_a_payer === 0) {
        return { class: 'badge badge-light-success', text: 'Payé' };
      }

      // 2. En attente (date dans le futur, aucun paiement partiel)
      if (echeanceDate > today && echeance.reste_a_payer === echeance.montant) {
        return { class: 'badge badge-light-warning', text: 'En attente' };
      }

      // 3. En cours (paiement partiel, avant ou après la date)
      if (echeance.reste_a_payer > 0 && echeance.reste_a_payer < echeance.montant) {
        return { class: 'badge badge-light-info', text: 'En cours' };
      }

      // 4. Impayé (date dépassée, aucun paiement)
      if (echeanceDate < today && echeance.reste_a_payer === echeance.montant) {
        return { class: 'badge badge-light-danger', text: 'Impayé' };
      }

      // Par défaut
      return { class: 'badge badge-light-secondary', text: 'Inconnu' };
    };

    // Charger les données au montage
    onMounted(async () => {

      await veriferCaisseOuverte();
      getAllCreances();
      //getAllEcheances();
      getAllModesReglement();
      getAllBanques();
      getAllComptes();
      fetchCommande();
      // getAllMonnaies();
    });

    const restrictInput = (event: KeyboardEvent) => {
      if (!/^[0-9]*$/.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
      }
    };

    return {
      reglementSchema,
      addReglement,
      getCurrentDateTime,
      format_date,
      format_Date,
      creanceOptions,
      echeanceOptions,
      // filteredEcheanceOptions,
      modeReglementOptions,
      compteOptions,
      banqueOptions,
      submitButton,
      creance,
      echeance,
      selectedEcheance,
      montantPaye,
      modeReglement,
      compte,
      banque,
      getStatutBadge,
      numeroCheque,
      refTransaction,
      showCompteField,
      showBanqueField,
      showNumCompteField,
      showDateVirementField,
      showDateChequeField,
      showRefTransactionField,
      onCreanceSelect,
      montantCreance,
      //onEcheanceSelect,
      onModeReglementSelect,
      calculatedResteAPayer,
      creanceValue,
      montantRestPaye, separateur,
      billetageList,
      billetageSortieList,
      montantTotalEncaissement,
      montantTotalSortie,
      restrictInput,
      handleBilletageInput,
      commandesOptions,
      handleCommandeChange,
      cancelOperation,
      reglementForm,
      reliquatCalcule,
      reliquatRetourner,
      showCaisseClosedMessage,
      ouvrirCaisse,
      caisseActive,
      caisseId,
      montantManquant,
      commandeSelectionnee,
      selectedTypeReglement,
      selectedModeReglementLabel,
      typeReglement,
      onTypeReglementSelect,
      montantTtc,
      selectedCommande,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
}

.montant-total {
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 8px;
}

.text-danger {
  font-size: 0.75rem;
  color: #dc3545;
}

.text-warning {
  font-size: 0.75rem;
  color: #ffc107;
}

.compact-input {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  height: 30px;
}

.compact-error {
  font-size: 0.75rem;
  margin-top: 2px;
}

.container-tight {
  margin: 0;
  padding: 2px 0;
}

.is-warning {
  border-color: #ffc107;
}

.disabled-form {
  opacity: 0.6;
  pointer-events: none;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.border-warning {
  border-color: #ff9800 !important;
  border-width: 2px !important;
}

.fa-exclamation-triangle {
  color: #ff9800;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.tooltip-box {
  display: none;
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #0a59a4;
  border-radius: 6px;
  padding: 10px 14px;
  min-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 0.85rem;
  color: #333;
}

/* ✅ Afficher au hover */
.tooltip-wrapper:hover .tooltip-box {
  display: block;
}
</style>