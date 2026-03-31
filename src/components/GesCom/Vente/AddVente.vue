<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="addVente" :validation-schema="venteSchema" :keep-values="valuess">
        <div class="row gx-1">
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Date commande
              </label>
              <Field name="dateCommande" :readonly="true" :value="getCurrentDate()" type="date"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant HT
              </label>
              <Field v-model="totalsomme" name="montantHT" :readonly="true" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant HT RSE
              </label>
              <Field v-model="totalsommeremise" name="montantHTRSE" :readonly="true" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant TVA
              </label>
              <Field v-model="totaltva" name="montantTVA" :readonly="true" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant AIB
              </label>
              <Field v-model="totalaib" name="montantAIB" :readonly="true" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant Taxe S.
              </label>
              <Field v-model="totalts" name="montanTS" :readonly="true" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant TTC
              </label>
              <Field v-model="totalttc" name="montantTTC" :readonly="true" type="text"
                class="form-control shadow-none fs-md-15 text-black" placeholder="" />
            </div>
          </div>
        </div>
        <div class="row gx-1">
          <div class="col-md-2" v-if="typeFacture !== 'Facture proforma'">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Type Commande <span class="text-danger">*</span>
              </label>
              <Field name="typeCommande" v-model="typeC" v-slot="{ field }">
                <Multiselect :options="['Au comptoir', 'Sur commande']" :searchable="true" track-by="label"
                  label="label" v-model="field.value" v-bind="field" placeholder="Sélectionner le groupe de taxe"
                  @select="showHide(field.value)" />
              </Field>
            </div>
            <ErrorMessage name="groupeTaxe" class="text-danger" />
          </div>
          <div class="col-md-2">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Type Facture <span class="text-danger">*</span>
              </label>
              <Field name="typeFacture" v-model="typeFacture" v-slot="{ field }">
                <Multiselect :options="[
                  'Facture de vente',
                  'Facture de vente à l\'exportation',
                  'Facture proforma',
                ]" :searchable="true" track-by="label" label="label" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner" />
              </Field>
            </div>
            <ErrorMessage name="modePrix" class="text-danger" />
          </div>
          <div class="col-md-3">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Client <span class="text-danger">*</span>
                <a style="float: right" v-if="!selectedClient" class="btn btn-success me-3 btn-xs b-r-6"
                  data-bs-toggle="modal" data-bs-target="#AddClientModal" @click="toggleAbonne">
                  <i class="fa fa-plus-circle"></i>
                  Ajouter un client
                </a>
                <button style="float: right" v-if="selectedClient" class="btn btn-success me-3 btn-xs"
                  @click="toggleAbonne">
                  <i class="fa fa-plus-circle"></i>
                  Rechercher un client
                </button>
              </label>
              <Field name="client" v-slot="{ field }" v-if="!selectedClient" v-model="clientCharger">
                <Multiselect :options="clientOptions" :searchable="true" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner le client" />

              </Field>
              <Field name="client" v-model="selectedClientId" v-slot="{ field }" v-else>
                <Multiselect v-model="field.value" :options="clientsOps" placeholder="Sélectionner un client" />
              </Field>
            </div>
            <ErrorMessage name="client" class="text-danger" />
          </div>
          <div class="col-md-1">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                TAUX AIB
              </label>
              <Field name="tauxAIB" v-model="valeurAib" v-slot="{ field }">
                <Multiselect :options="['1%', '5%']" :searchable="true" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Choisir" />
              </Field>
            </div>
            <ErrorMessage name="tauxAIB" class="text-danger" />
          </div>
          <div class="col-md-2" v-if="showC">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant Reçu <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <Field name="montantReçu" type="text" v-model.number="montantReçu"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Montant reçu" readonly />
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#billetagePaiementModal" title="Ouvrir le billetage">
                  <i class="fa fa-calculator"></i>
                </button>
              </div>
              <ErrorMessage name="montantReçu" class="text-danger" />
              <small v-if="reliquatNonRendu > 0" class="text-warning d-block mt-1">
                <i class="fa fa-exclamation-triangle"></i> Reliquat non rendu: {{ reliquatNonRendu }} Fcfa
              </small>
            </div>
          </div>
          <div class="col-md-1" v-if="showC">
            <div class="form-group mb-2">
              <label class="d-block text-black fw-semibold">Reliquat</label>
              <Field 
                name="reliquat" 
                v-model="reliquatAffiche" 
                :readonly="true" 
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                :class="{
                  'text-success': reliquatAffiche > 0,
                  'text-danger': reliquatAffiche < 0
                }"
              />
            </div>
          </div>


          <div class="col-md-12 mb-md-25">
            <div class="accordion-body">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                    Produit
                  </button>
                </li>
                <!-- <li class="nav-item" role="presentation">
                  <button class="nav-link" id="home2-tab" data-bs-toggle="tab" data-bs-target="#home2-tab-pane"
                    type="button" role="tab" aria-controls="home2-tab-pane" aria-selected="false">
                    Elément
                  </button>
                </li> -->
              </ul>

              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                  <div class="row gx-2">
                    <div class="border border-primary mb-5">
                      <div class="row gx-2 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                        <div class="col-md-7">
                          <h4 class="fs-6 text-white">
                            Ajouter le produit
                          </h4>
                        </div>
                        <div class="col-md-5">
                          <div class="d-flex float-end">
                            <button
                              class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                              type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                              @click="addRowProduit()">
                              <i class="fa fa-plus-circle"></i>
                              {{ enModification ? 'Mettre à jour le produit' : 'Ajouter un produit' }}
                            </button>
                          </div>
                        </div>
                      </div>



                      <div>
                        <div class="card-body p-1">
                          <div>
                            <div class="row gx-1">
                              <div class="col-4">
                                <label class="d-block text-black fw-semibold">
                                  Produit
                                </label>
                                <Multiselect :options="produitOptions" :searchable="true" track-by="label" label="label"
                                  v-model="produit.produit" placeholder="Selectionnez le produit"
                                  :disabled="!clientCharger" @select="selectProd(produit.produit, produit)" />
                                <span class="invalid-feedback" v-if="validateRowProduit(produit.produit)">
                                  Champ obligatoire
                                </span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Quantité
                                </label>
                                <input type="text" v-model.number="produit.qtite"
                                  :class="validateRowProduit(produit.qtite) ? 'form-control is-invalid' : 'form-control'"
                                  placeholder="Entrer la quantité" @keyup="eventProduit" />
                                <span class="invalid-feedback" v-if="validateRowProduit(produit.qtite)">
                                  Champ obligatoire
                                </span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Prix unitaire
                                  <i class="fa fa-info-circle text-muted ms-1" v-if="produit.prixMin && produit.prixMax"
                                    :title="`Prix recommandé: ${produit.prixMin} - ${produit.prixMax}`"
                                    style="font-size: 12px; cursor: help;"></i>
                                </label>
                                <input type="text" v-model.number="produit.prixTtc"
                                  :class="validateRowProduit(produit.prixTtc) ? 'form-control is-invalid' : 'form-control'"
                                  placeholder="Entrer le prix" @keyup="eventProduit" />
                                <span class="invalid-feedback" v-if="validateRowProduit(produit.prixTtc)">
                                  Champ obligatoire
                                </span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Prix HT
                                </label>
                                <input type="text" v-model="produit.prixHt" :readonly="true" class="form-control"
                                  placeholder="" />
                                <span class="invalid-feedback"></span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Montant HT
                                </label>
                                <input type="text" v-model="produit.montantHt" :readonly="true" class="form-control"
                                  placeholder="" />
                                <span class="invalid-feedback"></span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Taxe S.
                                </label>
                                <input type="number" v-model.number="produit.taxeSpecifique" class="form-control"
                                  placeholder="" @keyup="eventProduit" />
                                <span class="invalid-feedback"></span>
                              </div>

                            </div>
                            <div class="row gx-1">
                              <div class="col-1">
                                <label class="d-block text-black fw-semibold">
                                  Type RSE
                                </label>
                                <Multiselect :options="['%', 'MT']" :searchable="true" track-by="label" label="label"
                                  v-model="produit.typeRemise" placeholder="..." @select="eventProduit" />
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Valeur remise
                                </label>
                                <input type="text" v-model.number="produit.valeurRemise" class="form-control"
                                  placeholder="" @keyup="eventProduit" />
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  MT Remise
                                </label>
                                <input type="text" v-model="produit.remise" :readonly="true" class="form-control"
                                  placeholder="" />
                                <span class="invalid-feedback"></span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  MT. HT Ap Rse
                                </label>
                                <input type="text" v-model="produit.montantHtApresRemise" :readonly="true"
                                  class="form-control" placeholder="" />
                                <span class="invalid-feedback"></span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  MT. TVA
                                </label>
                                <input type="text" v-model="produit.montantTva" :readonly="true" class="form-control"
                                  placeholder="" />
                                <span class="invalid-feedback"></span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  MT. TTC
                                </label>
                                <input type="text" v-model="produit.montantTtc" :readonly="true" class="form-control"
                                  placeholder="" />
                                <span class="invalid-feedback"></span>
                              </div>
                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Magasin
                                </label>
                                <Multiselect :options="magasin1Options" :searchable="true" track-by="label"
                                  label="label" v-model="produit.magasin" placeholder=""
                                  @select="updateStockByMagasin(produit)" />
                                <span class="invalid-feedback" v-if="validateRowProduit(produit.magasin)">
                                  Champ obligatoire
                                </span>
                              </div>

                              <div class="col">
                                <label class="d-block text-black fw-semibold">
                                  Stock
                                </label>
                                <p class="mb-1">Logigique: {{ produit.stockLogique || 0 }}</p>
                                <p class="pt-0">Physique: {{ produit.stockPhysique || 0 }}</p>
                              </div>
                              <!-- <div class="col pe-0">
                                    <label class="d-block text-black fw-semibold">
                                      ACTIONS
                                    </label>
                                    <div class="button-container" style="white-space: nowrap">
                                      <button
                                        type="button"
                                        class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                        @click="removeRowProduit(index)"
                                      >
                                      <i class="icofont icofont-ui-delete"></i>
                                      </button>
                                    </div>
                                  </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade p-10" id="home2-tab-pane" role="tabpanel" tabindex="0">
                  <div class="row">
                    <div class="border border-primary mb-5">
                      <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                        style="background-color: #0a59a4 !important">
                        <div class="col-md-7">
                          <h3 class="fs-4 text-white">
                            Entête de la facture
                          </h3>
                        </div>
                        <div class="col-md-5">
                          <div class="d-flex float-end">
                            <button
                              class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                              type="button" :class="{
                                'cursor-not-allowed': isDisableElement,
                              }" :disabled="isDisableElement" @click="addRowElement">
                              <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                              Ajouter une entête
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="row d-flex align-items-center justify-content-between mt-10">
                          <div class="col-md-3">
                            <label class="d-block text-black fw-semibold">
                              Titre <span class="text-danger">*</span>
                            </label>
                          </div>
                          <div class="col-md-3">
                            <label class="d-block text-black fw-semibold">Description</label>
                          </div>
                          <div class="col-md-2">
                            <label class="d-block text-black fw-semibold">
                              Taille police
                              <span class="text-danger">*</span>
                            </label>
                          </div>
                          <div class="col-md-3">
                            <label class="d-block text-black fw-semibold">
                              Alignement
                              <span class="text-danger">*</span>
                            </label>
                          </div>
                          <div class="col-md-1">
                            <label class="d-block text-black fw-semibold">
                              Action
                            </label>
                          </div>
                        </div>
                        <hr class="mt-0" />
                        <div class="row mb-5" v-for="(element, index) in elements" :key="index">
                          <div class="col-md-3 mb-5">
                            <Field name="titre" type="text" v-model="element.titre"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le titre" />
                            <div class="invalid-feedback" v-if="validateRowElement(element.titre)">
                              Le titre est obligatoire.
                            </div>
                          </div>
                          <div class="col-md-3 mb-5">
                            <Field name="description" type="text" v-model="element.description"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          </div>
                          <div class="col-md-2 mb-5">
                            <Field name="taillePolice" type="number" v-model="element.taillePolice"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          </div>
                          <div class="col-md-2 mb-5">
                            <Multiselect :options="['Centre', 'Gauche', 'Droite']" :searchable="true" track-by="label"
                              label="label" v-model="element.alignement" placeholder="" />
                          </div>
                          <div class="col-md-1 mb-5">
                            <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                              @click="removeRowElement(index)">
                              <i class="icofont icofont-ui-delete"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="prixErrorMessage" class="alert alert-danger mx-auto mb-2 py-1" role="alert"
                  style="max-width: 600px;">
                  <i class="fa fa-exclamation-triangle me-2"></i>{{ prixErrorMessage }}
                </div>
              </div>

            </div>

          </div>

          <div class="table-responsive">
            <table class="table table-fixed text-nowrap align-middle mb-0 table-bordered">
              <thead>
                <tr>

                  <th scope="col" class="produit info">
                    Produit
                  </th>
                  <th scope="col" class="quantite">
                    Quantité
                  </th>
                  <th scope="col" class="prix-unitaire">
                    Prix unitaire
                  </th>
                  <th scope="col" class="">
                    Prix HT
                  </th>
                  <th scope="col" class="">
                    Montant HT
                  </th>
                  <th scope="col" class="taxe">
                    Taxe S.
                  </th>
                  <th scope="col" class="type-rse">
                    Type RSE
                  </th>
                  <th scope="col" class="vente-rse">
                    Vente / RSE
                  </th>
                  <th scope="col" class="">
                    MT Remise
                  </th>
                  <th scope="col">
                    MT. HT Ap Rse
                  </th>
                  <th scope="col" class="">
                    MT. TVA
                  </th>
                  <th scope="col" class=" text pe-0">
                    MT. TTC
                  </th>
                  <th scope="col" class="magasin">
                    Magasin
                  </th>
                  <th scope="col" class="actions pe-0">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(produit, index) in produits" :key="index">
                  <td class="produit-col">
                    <span class="info">{{
                      produit.libelleProduit
                    }}</span>
                  </td>

                  <td class="quantite-col">
                    {{ produit.qtite }}
                  </td>
                  <td class="prix-unitaire-col">
                    {{ produit.prixTtc }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.prixHt }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.montantHt }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.taxeSpecifique }}
                  </td>
                  <td class="type-rse-col">
                    {{ produit.typeRemise }}
                  </td>
                  <td class="vente-rse-col">
                    {{ produit.valeurRemise }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.remise }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.montantHtApresRemise }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.montantTva }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.montantTtc }}
                  </td>
                  <td class="magasin-col">
                    {{ getMagasinLabel(produit.magasin) }}
                  </td>
                  <td class="actions-col pe-0">
                    <div class="button-container" style="white-space: nowrap">
                      <button type="button" class="btn btn-info transition border-0 pb-2 ps-8 pe-8"
                        @click="showDetails(produit)" data-bs-toggle="modal" data-bs-target="#stockDetailsModal">
                        <i class="fa fa-eye"></i>
                      </button>
                      <button type="button" class="btn btn-warnign transition border-0 pb-2 ps-8 pe-8"
                        @click="editProduit(index)">
                        <i class="icofont icofont-ui-edit"></i>
                      </button>
                      <button type="button" class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                        @click="removeRowProduit(index)">
                        <i class="icofont icofont-ui-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <!-- Modal Billetage -->
          <div class="modal fade" id="billetagePaiementModal" tabindex="-1"
            aria-labelledby="billetagePaiementModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header text-white">
                  <h5 class="modal-title">Billetage de Vente</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>

                <div class="modal-body">
                  <div class="row">
                    <!-- Billetage Encaissement -->
                    <div class="col-md-6 mb-3">
                      <div class="border border-primary">
                        <div class="row fw-bold py-2" style="background-color: #0a59a4">
                          <div class="col-md-7">
                            <h3 class="h3 fs-5 text-white mb-0">Billetage Encaissement</h3>
                          </div>
                          <div class="col-md-5 text-end">
                            <h3 class="fs-5 text-white mb-0" style="font-weight: bold;">
                              {{ montantTotalEncaissement || 0 }} Fcfa
                            </h3>
                          </div>
                        </div>
                        <div class="px-3 py-2">
                          <div class="row mt-2 fw-semibold">
                            <div class="col-md-4"><label>Monnaie</label></div>
                            <div class="col-md-4"><label>Quantité</label></div>
                            <div class="col-md-4"><label>Montant</label></div>
                          </div>
                          <hr class="mt-1 mb-2" />
                          <template v-for="(billetage, index) in billetageList" :key="'enc-' + index">
                            <div class="row align-items-center mb-2">
                              <div class="col-md-4 px-1">
                                <input v-model="billetage.libelle" readonly class="form-control form-control-sm" />
                              </div>
                              <div class="col-md-4 px-1">
                                <input type="number" min="0" v-model.number="billetage.qteBillet"
                                  @input="handleBilletageInput($event, billetage, 'encaissement')"
                                  @keypress="restrictInput($event)" class="form-control form-control-sm"
                                  placeholder="0" />
                              </div>
                              <div class="col-md-4 px-1">
                                <input type="text" v-model="billetage.montant" readonly
                                  class="form-control form-control-sm" />
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>

                    <!-- Billetage Reliquat -->
                    <div class="col-md-6 mb-3">
                      <div class="border border-danger">
                        <div class="row fw-bold py-2" style="background-color: #a40a0a">
                          <div class="col-md-7">
                            <h3 class="h3 fs-5 text-white mb-0">Reliquat à Rendre</h3>
                          </div>
                          <div class="col-md-5 text-end">
                            <h3 class="fs-5 text-white mb-0" style="font-weight: bold;">
                              {{ reliquatCalcule || 0 }} Fcfa
                            </h3>
                          </div>
                        </div>
                        <div class="px-3 py-2">
                          <div class="row mt-2 fw-semibold">
                            <div class="col-md-4"><label>Monnaie</label></div>
                            <div class="col-md-4"><label>Quantité</label></div>
                            <div class="col-md-4"><label>Montant</label></div>
                          </div>
                          <hr class="mt-1 mb-2" />
                          <template v-for="(billetage, index) in billetageSortieList" :key="'sort-' + index">
                            <div class="row align-items-center mb-2">
                              <div class="col-md-4 px-1">
                                <input v-model="billetage.libelle" readonly class="form-control form-control-sm" />
                              </div>
                              <div class="col-md-4 px-1">
                                <input type="number" min="0" v-model.number="billetage.qteBillet"
                                  @input="handleBilletageInput($event, billetage, 'sortie')"
                                  @keypress="restrictInput($event)" class="form-control form-control-sm"
                                  placeholder="0" />
                              </div>
                              <div class="col-md-4 px-1">
                                <input type="text" v-model="billetage.montant" readonly
                                  class="form-control form-control-sm" />
                              </div>
                            </div>
                          </template>
                          <div v-if="montantTotalSortie > reliquatCalcule" class="alert alert-danger mt-2 py-2">
                            <small>Le billetage de sortie ({{ montantTotalSortie }} Fcfa) dépasse le reliquat ({{
                              reliquatCalcule }}
                              Fcfa).</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Messages d'erreur/avertissement -->
                  <div v-if="billetageError" class="alert alert-danger mt-2">
                    <i class="fa fa-exclamation-triangle me-2"></i>{{ billetageError }}
                  </div>
                  <div v-if="reliquatNonRendu > 0" class="alert alert-warning mt-2">
                    <i class="fa fa-exclamation-triangle me-2"></i>Reliquat non rendu au client: {{ reliquatNonRendu }}
                    Fcfa
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="validerBilletage" data-bs-dismiss="modal"
                    :disabled="montantTotalEncaissement < totalttc || montantTotalSortie > reliquatCalcule">
                    <i class="fa fa-check me-1"></i> Valider
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fa fa-times me-1"></i> Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="stockDetailsModal" tabindex="-1" aria-labelledby="stockDetailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg"
              style="display: flex; align-items: center; min-height: calc(100vh - 1rem); margin: 0.5rem auto;">
              <div class="modal-content">
                <div class="modal-header">
                  <h5>Détails du produit</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                  <div class="row mb-3">
                    <div class="col-12">
                      <p class="fw-bold mb-1">Produit :</p>
                      <p>{{ selectedProduit?.libelleProduit || 'Non défini' }}</p>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Quantité :</p>
                      <p>{{ selectedProduit?.qtite || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Prix unitaire :</p>
                      <p>{{ selectedProduit?.prixTtc || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Prix HT :</p>
                      <p>{{ selectedProduit?.prixHt || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Montant HT :</p>
                      <p>{{ selectedProduit?.montantHt || 'Non défini' }}</p>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Taxe S. :</p>
                      <p>{{ selectedProduit?.taxeSpecifique || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Type RSE :</p>
                      <p>{{ selectedProduit?.typeRemise || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Valeur RSE :</p>
                      <p>{{ selectedProduit?.valeurRemise || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">MT Remise :</p>
                      <p>{{ selectedProduit?.remise || 'Non défini' }}</p>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">MT. HT Ap Rse :</p>
                      <p>{{ selectedProduit?.montantHtApresRemise || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">MT. TVA :</p>
                      <p>{{ selectedProduit?.montantTva || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">MT. TTC :</p>
                      <p>{{ selectedProduit?.montantTtc || 'Non défini' }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="fw-bold mb-1">Magasin :</p>
                      <p>{{ getMagasinLabel(selectedProduit?.magasin) }}</p>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div class="col-md-12 mt-5">
            <div class="d-flex align-items-center gap-3">

              <!-- Enregistrer -->
              <div class="btn-group" role="group">
                <button type="submit" class="btn btn-success px-4"
                  :disabled="isDisable || (showC && typeFacture !== 'Facture proforma' && (!montantTotalEncaissement || montantTotalEncaissement < totalttc))"
                  :class="{ 'cursor-not-allowed': isDisable || (showC && typeFacture !== 'Facture proforma' && (!montantTotalEncaissement || montantTotalEncaissement < totalttc)) }">
                  <i class="fa fa-save me-2"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown" aria-expanded="false" :disabled="isDisable">
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="$event => $parent.$emit('submit')"
                      :class="{ 'disabled': showC && typeFacture !== 'Facture proforma' && (!montantTotalEncaissement || montantTotalEncaissement < totalttc) }">
                      <i class="fa fa-save"></i> Enregistrer
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="handleSaveAndPrint"
                      :class="{ 'disabled': isGeneratingPdf || (showC && typeFacture !== 'Facture proforma' && (!montantTotalEncaissement || montantTotalEncaissement < totalttc)) }">
                      <i v-if="!isGeneratingPdf" class="fa fa-print"></i>
                      <i v-else class="fa fa-spinner fa-spin"></i>
                      {{ isGeneratingPdf ? 'Génération...' : 'Enregistrer et imprimer' }}
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Format impression -->
              <div style="width: 180px;">
                <Field name="formatImpression" v-model="formatImpression" v-slot="{ field }">
                  <Multiselect :options="['A4', 'A5', 'A6', 'T1', 'T2']" :searchable="true" v-model="field.value"
                    v-bind="field" placeholder="Format impression" />
                </Field>
                <ErrorMessage name="formatImpression" class="text-danger" />
              </div>

              <!-- Annuler -->
              <router-link to="/ventes/liste-ventes" class="btn btn-danger">
                <i class="fa fa-times me-1"></i> Annuler
              </router-link>

            </div>
          </div>

        </div> <!-- fin du gros div qui contient tout le formulaire (row gx-1 etc.) -->
      </Form>
    </div>
  </div>

  <AddClientModal @getclient="getClient" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive, computed } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { Vente } from "@/models/Vente";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import AddClientModal from "./AddClientModal.vue";
import { ProduitSelect } from "@/models/Produit";
import { error, success, warning } from "@/utils/utils";
import { client } from "@/core/data/dashboards";
import { Modal } from 'bootstrap';


interface BilletageForm {
  libelle: string;
  qteBillet: number;
  montant: number;
  monnaie: number;
  valueAct: number;
}
export default defineComponent({
  name: "AddVente",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    AddClientModal,
  },
  setup: () => {
    const venteSchema = Yup.object().shape({
      typeCommande: Yup.string().when('typeFacture', {
        is: (val: string) => val !== 'Facture proforma',
        then: (schema) => schema.required("Le type de commande est obligatoire"),
        otherwise: (schema) => schema.notRequired()
      }),
      typeFacture: Yup.string().required("Le type de facture est obligatoire"),
      tauxAIB: Yup.string().notRequired(),
      montantReçu: Yup.string().when([], (value, schema) => {
        return showC.value
          ? schema.required("Le montant est obligatoire")
          : schema.notRequired();
      }),
      formatImpression: Yup.string().required("Le format d'impression est obligatoire"),
    });

    const venteForm = ref<Vente | null>(null);
    const router = useRouter();
    const magasin1Options = ref([]);
    const produitOptions = ref([]);
    const clientOptions = ref([]);
    const produitShow = ref(null);
    const selectedClient = ref(false);
    const isSaving = ref(false);
    const billetageForm = ref<InstanceType<typeof Form> | null>(null);
    const billetageList = reactive<BilletageForm[]>([]);
    const billetageSortieList = reactive<BilletageForm[]>([]);
    const monnaieList = ref<any[]>([]);
    const montantTotalEncaissement = ref<number | null>(null);
    const montantTotalSortie = ref<number | null>(null);
    const reliquatNonRendu = ref<number>(0);
    const billetageError = ref<string>('');
    const caisseActive = ref<boolean>(true);
    const reliquatAffiche = ref(0);



    const enModification = ref(false);
    const modificationIndex = ref(null);
    const toggleAbonne = () => {
      selectedClient.value = !selectedClient.value;
    };
    const selectedClientId = ref(0);
    const clientsOps = ref<Array<{ value: any; label: string }>>([]);
    const clientCharger = ref(null);
    const montantReçu = ref(null);

    const totalsomme = ref(0.0);
    const totalsommeremise = ref(0.0);
    const totaltva = ref(0.0);
    const totalts = ref(0.0);
    const totalttc = ref(0.0);
    const totalaib = ref(0.0);
    const valeurAib = ref(0);
    // const clientId = 3;
    const selectedProduit = ref(null);
    const formatImpression = ref("A4");
    const produits = ref<Array<ProduitSelect>>([]);
    const typeFacture = ref('Facture de vente');
    const isGeneratingPdf = ref(false);
    const reliquat = ref(0);



    const getClient = async (values: {
      id: any;
      nomClient: string;
      prenomClient: string;
      raisonSociale: string;
    }) => {
      try {
        selectedClientId.value = values.id;
        const data = {
          value: values.id,
          label: values?.nomClient
            ? values?.nomClient + "" + values?.prenomClient
            : "" + values?.raisonSociale,
        };
        clientsOps.value = [...clientsOps.value, data];
        clientCharger.value = values.id;
        return clientsOps.value;
      } catch (error) {
        // Gérer l'erreur ici
      }
    };



    const fetchMagasin1 = async () => {
      try {
        const response = await ApiService.get("/all/all/magasins");
        console.log("magasiiiiiiiiiii", response);
        const magasin1sData = response.data.data;
        magasin1Options.value = magasin1sData.map((magasin) => ({
          value: magasin.id,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    const showDetails = (produit) => {
      selectedProduit.value = produit;
      console.log("produittt", selectedProduit);
    };

    const fetchProduits = async () => {
      try {
        const response = await axios.get("/all/produitconditionnements");
        const produitsData = response.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produitconditionnements) => ({
          value:
            produitconditionnements.id + "|" +
            // `${produitconditionnements.produit?.refProd} : ${produitconditionnements.produit?.codeProduit} ` +
            `${produitconditionnements.produit?.nomProd} [ ${produitconditionnements.conditionnement?.libelle} ]` + "|" +
            produitconditionnements.prixVenteHt + "|" +
            produitconditionnements.prixVenteTtc,

          label: `${produitconditionnements.produit?.refProd
            ? produitconditionnements.produit.refProd
            : produitconditionnements.produit?.codeProduit
            } : ${produitconditionnements.produit?.nomProd} [ ${produitconditionnements.conditionnement?.libelle} ]`,
          stockLogique: produitconditionnements.qteStockCondLogique || 0,
          stockPhysique: produitconditionnements.qteStockCond || 0


        }));

      } catch (error) {
        //
      }
    };


    const getPrixProduitCondiTypeClient = async (produitConditionnementId, clientId) => {
      console.log("recupp", produitConditionnementId, clientId);

      try {
        const response = await ApiService.get(`/prixproduitcondtypeclient/${produitConditionnementId}/${clientId}`);
        console.log("responnnnse", response);
        const donnePrix = response.data;
        return donnePrix;
      } catch (error) {

        error("Le prix produitContionnement type client n'\a pas pu être recupere")
        return null;
      }
    }

    const getMagasinLabel = (magasiId) => {
      const magasin = magasin1Options.value.find((m) => m.value === magasiId);
      return magasin ? magasin.label : 'Non defini';
    }

    const prixInitial = ref<number>(0)

    const selectProd = async (selectedProduit, produit) => {

      const dataprice = await getPrixProduitCondiTypeClient(selectedProduit.split("|")[0], clientCharger.value)
      console.log(selectedProduit, "selectedProduit");

      if (!dataprice || !dataprice.data || dataprice.data.prixTTC === null || dataprice.data.prixTTC === undefined) {
        warning("Aucun prix défini pour ce produit et ce client. Veuillez définir un prix avant de continuer.");
        produit.produit = null;
        return;
      }

      const taux = dataprice.data?.produitConditionnement?.produit?.groupeTaxes?.taux || 0;
      produit.taxe = taux === 0 ? 0 : 1;

      produit.qtite = 1;
      produit.prixTtc = Number(dataprice.data.prixTTC);
      produit.prixHt = Number(dataprice.data.prixHT);
      prixInitial.value = Number(dataprice.data.prixTTC);
      produit.prixInitial = Number(dataprice.data.prixTTC);
      console.log("prixxxxxxxxxxxxxx",prixInitial.value);
      produit.prixMin = Number(dataprice.data.prixMin || 0);
      produit.prixMax = Number(dataprice.data.prixMax || 0);
      produit.libelleProduit = selectedProduit.split("|")[1];
      produit.montantHt = Number(produit.prixHt);
      produit.montantTva = Number(produit.prixTtc - produit.prixHt);
      produit.montantTtc = Number(produit.prixTtc);
      produit.montantTs = 0.0;
      produit.montantHtApresRemise = Number(produit.prixHt);
      produit.stockLogique = 0;
      produit.stockPhysique = 0;

    };

   

    const fetchClient = async () => {
      try {
        const response = await ApiService.get(
          `/clients/${selectedClientId.value}`
        );
        const clientData = response.data.data.data;
        console.log("clientData", clientData);
        clientsOps.value = clientData.map((client) => ({
          value: client.id,
          label: `${client?.nomClient
            ? client?.nomClient + "" + client?.prenomClient
            : client?.raisonSociale
            }`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchClients = async () => {
      try {
        const response = await ApiService.get(`/all/clients`);
        console.log("responsssseee", response);
        const clientData = response.data.data;
        console.log("clientData", clientData);
        clientOptions.value = clientData.map((client) => ({
          value: client.id,
          label: `${client?.nomClient
            ? client?.nomClient + " " + client?.prenomClient
            : client?.raisonSociale
            }`,
        }));
      } catch (error) {
        //
      }
    };


    const fetchMonnaies = async () => {
      try {
        const response = await ApiService.get("/all/monnaies");
        console.log("vallllll", response);
        const monnaiesData = response.data.data.data;
        monnaieList.value = monnaiesData;

        billetageList.splice(0, billetageList.length);
        billetageSortieList.splice(0, billetageSortieList.length);

        monnaiesData.forEach((monnaie: any) => {
          billetageList.push({
            libelle: monnaie.libelle,
            qteBillet: 0,
            montant: 0,
            monnaie: monnaie.valeur,
            valueAct: monnaie.valeur,
          });

          billetageSortieList.push({
            libelle: monnaie.libelle,
            qteBillet: 0,
            montant: 0,
            monnaie: monnaie.valeur,
            valueAct: monnaie.valeur,
          });
        });
      } catch ({ response }) {
        error(response?.data?.message || "Impossible de charger les monnaies");
      }
    };

    const handleBilletageInput = (event: Event, billetage: BilletageForm, type: 'encaissement' | 'sortie') => {
      const target = event.target as HTMLInputElement;
      let value = parseInt(target.value) || 0;

      if (value < 0) value = 0;

      billetage.qteBillet = value;
      billetage.montant = billetage.qteBillet * billetage.valueAct;

      if (type === 'encaissement') {
        calculateMontantTotalEncaissement();
      } else {
        calculateMontantTotalSortie();
      }

      calculateReliquatNonRendu();
    };

      

    const restrictInput = (event: KeyboardEvent) => {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    };

    const calculateMontantTotalEncaissement = () => {
      montantTotalEncaissement.value = billetageList.reduce((total, billetage) => {
        return total + (billetage.montant || 0);
      }, 0);

      // Mettre à jour le montant reçu
      montantReçu.value = montantTotalEncaissement.value;
    };

    const calculateMontantTotalSortie = () => {
      montantTotalSortie.value = billetageSortieList.reduce((total, billetage) => {
        return total + (billetage.montant || 0);
      }, 0);
    };

    const reliquatCalcule = computed(() => {
      if (!montantTotalEncaissement.value || !totalttc.value) {
        return 0;
      }
      return montantTotalEncaissement.value - totalttc.value;
    });

     watch(reliquatCalcule,(newVal) => {
        reliquatAffiche.value = newVal;

       });

    const calculateReliquatNonRendu = () => {
      const sortie = montantTotalSortie.value || 0;
      const reliquat = reliquatCalcule.value || 0;
      reliquatNonRendu.value = reliquat - sortie >= 0 ? reliquat - sortie : 0;
    };

    const billetageValide = ref(false);

const validerBilletage = async () => {
  billetageError.value = '';

  if (!montantTotalEncaissement.value || montantTotalEncaissement.value < totalttc.value) {
    billetageError.value = `Montant insuffisant`;
    return;
  }

  if (montantTotalSortie.value > reliquatCalcule.value) {
    billetageError.value = `Sortie trop importante`;
    return;
  }

  // ✅ Vérifier le stock seulement si reliquat > 0
  if (reliquatCalcule.value > 0) {
    const billetsSortie = billetageSortieList
      .filter(b => b.qteBillet > 0)
      .map(b => ({
        monnaie: b.valueAct,  // ✅ valueAct = valeur du billet (500, 1000...)
        qteBillet: b.qteBillet
      }));

    if (billetsSortie.length > 0) {
      try {
        const response = await ApiService.post('/caisse/verifier-billets', { // ✅ bonne route
          billets: billetsSortie
        });

        if (!response.data.success) {
          billetageError.value = response.data.message;
          return; // ✅ bloque la validation
        }
      } catch (err) {
        billetageError.value = "Impossible de vérifier les billets en caisse";
        return;
      }
    }
  }

  billetageValide.value = true;
  success("Billetage validé avec succès");
};
    const resetBilletage = () => {
      billetageList.forEach(b => {
        b.qteBillet = 0;
        b.montant = 0;
      });
      billetageSortieList.forEach(b => {
        b.qteBillet = 0;
        b.montant = 0;
      });
      montantTotalEncaissement.value = 0;
      montantTotalSortie.value = 0;
      reliquatNonRendu.value = 0;
      billetageError.value = '';
    };

    // ========== FIN GESTION DU BILLETAGE ==========

    const updateStockByMagasin = async (produit) => {
      if (!produit.produit || !produit.magasin) {
        produit.stockLogique = 0;
        produit.stockPhysique = 0;
        return;
      }

      const produitId = produit.produit.split("|")[0];
      const magasinId = typeof produit.magasin === 'object' ? produit.magasin.value : produit.magasin;

      try {
        const response = await ApiService.get(`/stock/produit/${produitId}/magasin/${magasinId}`);
        const stockData = response.data.data;

        produit.stockLogique = Number(stockData.qtiteLogique || 0);
        produit.stockPhysique = Number(stockData.qtite || 0);
      } catch (error) {
        console.error("Erreur lors de la récupération du stock:", error);
        produit.stockLogique = 0;
        produit.stockPhysique = 0;
      }
    };

    onMounted(() => {
      fetchMagasin1();
      fetchProduits();
      fetchClients();
      fetchMonnaies();

      // Charger la vente en cours depuis sessionStorage
      chargerVenteEnCours();
    });

    const addVente = async (values, { resetForm }, shouldNormalize = false) => {
      if (!values.client) {
        error("Veuillez sélectionner un client");
        return null;
      }

      const isProforma = typeFacture.value === 'Facture proforma';

      if (isProforma) {
        shouldNormalize = false;
      }

      // Validation du billetage pour vente au comptoir
      if (typeC.value === "Au comptoir" && !isProforma) {
        if (!montantTotalEncaissement.value || montantTotalEncaissement.value === 0) {
          error("Veuillez renseigner le billetage en cliquant sur le bouton calculatrice");
          return null;
        }

        if (montantTotalEncaissement.value < totalttc.value) {
          error("Le montant encaissé est insuffisant");
          return null;
        }
      }

      if (produits.value.length === 0) {
        error("Veuillez ajouter au moins un produit");
        return null;
      }

      const validProduits = produits.value.filter((produit) => produit.produit && typeof produit.produit === "string");

      if (validProduits.length === 0) {
        error("Aucun produit valide n'a été sélectionné");
        return null;
      }

      const payload = {
        commande: {
          montantHT: values.montantHT,
          montantHTRSE: values.montantHTRSE,
          montantTVA: values.montantTVA,
          montantTS: values.montantTS,
          montantAIB: values.montantAIB,
          montantTTC: values.montantTTC,
          dateCommande: values.dateCommande || getCurrentDate(),
          typeCommande: isProforma ? null : values.typeCommande,
          typeFacture: values.typeFacture,
          tauxAIB: values.tauxAIB,
          montantReçu: isProforma ? "0" : (values.montantReçu || "0"),
          clientId: values.client,
          societeId: 1,
          formatImpression: values.formatImpression,
        },
        produits: produits.value.map((produit) => ({
          produit: produit.produit.split("|")[0],
          typeRemise: produit.typeRemise,
          libelleProduit: produit.libelleProduit,
          qtite: produit.qtite,
          prixTtc: produit.prixTtc,
          prixHt: produit.prixHt,
          prixInitial: produit.prixInitial,
          montantHt: produit.montantHt,
          montantTva: produit.montantTva,
          montantTtc: produit.montantTtc,
          taxeSpecifique: produit.taxeSpecifique,
          valeurRemise: produit.valeurRemise,
          montantHtApresRemise: produit.montantHtApresRemise,
          remise: produit.remise,
          magasin: produit.magasin
        })),
        elements: elements.map((element) => ({
          titre: element.titre,
          description: element.description,
          taillePolice: element.taillePolice,
          alignement: element.alignement,
        })),
        normaliser: shouldNormalize,
        billetage: typeC.value === "Au comptoir" && !isProforma ? {
          encaissement: billetageList.map(b => ({
            libelle: b.libelle,
            qteBillet: b.qteBillet,
            montant: b.montant,
            monnaie: b.monnaie,
            valueAct: b.valueAct
          })),
          sortie: billetageSortieList.map(b => ({
            libelle: b.libelle,
            qteBillet: b.qteBillet,
            montant: b.montant,
            monnaie: b.monnaie,
            valueAct: b.valueAct
          })),
          montantTotalEncaissement: montantTotalEncaissement.value,
          montantTotalSortie: montantTotalSortie.value,
          reliquatNonRendu: reliquatNonRendu.value
        } : null
      };

      console.log("Payload avec billetage:", payload);

      try {
        const response = await ApiService.post("/commandeClients", payload);

        if (response.data.code === 201) {
          isSaving.value = true;
          success(response.data.message);
          nettoyerVenteEnCours();
          resetForm();
          resetFormData();
          setTimeout(() => {
            isSaving.value = false;
          }, 100);
          router.push({ name: "ListeVente" });
          return response;
        }

        const errorMsg = response.data.message || "Erreur lors de l'enregistrement";
        error(errorMsg);
        return null;

      } catch (err) {
        console.error('Erreur complète:', err);

        let errorMessage = "Erreur inattendue";
        let isStockError = false;

        if (err.response) {
          errorMessage = err.response.data?.message
            || err.response.data?.errors
            || err.response.statusText
            || "Erreur lors de l'opération";

          const errorLower = errorMessage.toLowerCase();
          isStockError = errorLower.includes('stock insuffisant')
            || errorLower.includes('stock')
            || err.response.data?.errors === "Stock insuffisant";
        } else if (err.message) {
          errorMessage = err.message;
        }

        if (isStockError) {
          warning(errorMessage);
        } else {
          error(errorMessage);
        }

        return null;
      }
    };
    // const handleSaveAndPrint = async () => {
    //   try {
    //     if (!clientCharger.value) {
    //       error('Veuillez sélectionner un client');
    //       return;
    //     }

    //     if (produits.value.length === 0) {
    //       error('Veuillez ajouter au moins un produit');
    //       return;


    //     }

    //     const formData = {
    //       montantHT: totalsomme.value,
    //       montantHTRSE: totalsommeremise.value,
    //       montantTVA: totaltva.value,
    //       montantTS: totalts.value,
    //       montantAIB: totalaib.value,
    //       montantTTC: totalttc.value,
    //       dateCommande: getCurrentDate(),
    //       typeCommande: typeC.value,
    //       typeFacture: typeFacture.value,
    //       tauxAIB: valeurAib.value,
    //       montantReçu: montantReçu.value,
    //       client: clientCharger.value,
    //       formatImpression: formatImpression.value,

    //     };

    //     const response = await addVente(formData, { resetForm: () => { } }, true);

    //     if (!response?.data?.data?.facture?.id) {
    //       throw new Error('Erreur lors de l\'enregistrement de la facture');
    //     }

    //     const factureId = response.data.data.facture.id;


    //     const pdfResponse = await ApiService.get(
    //       `commande/facture/${factureId}?format=${formatImpression.value}`,
    //       "",
    //       { responseType: "blob" }
    //     );

    //     const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
    //     const blobUrl = window.URL.createObjectURL(blob);

    //     const newWindow = window.open(blobUrl, '_blank', 'noopener,noreferrer');

    //     setTimeout(() => {
    //       window.URL.revokeObjectURL(blobUrl);
    //     }, 5000);


    //     success("Facture enregistrée et ouverte avec succès");
    //     resetFormData();
    //     router.push({ name: "ListeVente" });

    //   } catch (err) {
    //     console.error('Erreur complète:', err);
    //     error(err.message || 'Erreur lors de l\'opération');
    //   }
    // };


    const handleSaveAndPrint = async () => {
      const loadingHtml = `
    <html>
      <head><title>Génération facture...</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #f8f9fa;">
        <div style="max-width: 400px; margin: 0 auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="width: 50px; height: 50px; border: 4px solid #e3e3e3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
          <h3 style="color: #333; margin-bottom: 10px;">Enregistrement et génération...</h3>
          <p style="color: #666; margin: 0;">Veuillez patienter quelques instants</p>
        </div>
        <style>
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </body>
    </html>
  `;

      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(loadingHtml);
        newWindow.document.close();
      }

      isGeneratingPdf.value = true;

      try {
        if (!clientCharger.value) {
          error('Veuillez sélectionner un client');
          if (newWindow && !newWindow.closed) {
            newWindow.close();
          }
          return;
        }

        if (produits.value.length === 0) {
          error('Veuillez ajouter au moins un produit');
          if (newWindow && !newWindow.closed) {
            newWindow.close();
          }
          return;
        }

        const isProforma = typeFacture.value === 'Facture proforma';

        // Validation du billetage pour vente au comptoir
        if (typeC.value === "Au comptoir" && !isProforma) {
          if (!montantTotalEncaissement.value || montantTotalEncaissement.value === 0) {
            error("Veuillez renseigner le billetage en cliquant sur le bouton calculatrice");
            if (newWindow && !newWindow.closed) {
              newWindow.close();
            }
            return;
          }

          if (montantTotalEncaissement.value < totalttc.value) {
            error("Le montant encaissé est insuffisant");
            if (newWindow && !newWindow.closed) {
              newWindow.close();
            }
            return;
          }
        }

        const formData = {
          montantHT: totalsomme.value,
          montantHTRSE: totalsommeremise.value,
          montantTVA: totaltva.value,
          montantTS: totalts.value,
          montantAIB: totalaib.value,
          montantTTC: totalttc.value,
          dateCommande: getCurrentDate(),
          typeCommande: isProforma ? null : typeC.value,
          typeFacture: typeFacture.value,
          tauxAIB: valeurAib.value,
          montantReçu: isProforma ? "0" : montantReçu.value,
          client: clientCharger.value,
          formatImpression: formatImpression.value,
        };

        const response = await addVente(formData, { resetForm: () => { } }, !isProforma);

        if (!response) {
          if (newWindow && !newWindow.closed) {
            newWindow.close();
          }
          return;
        }

        if (!response.data?.data?.facture?.id) {
          error('Erreur lors de l\'enregistrement de la facture');
          if (newWindow && !newWindow.closed) {
            newWindow.close();
          }
          return;
        }

        const factureId = response.data.data.facture.id;

        const pdfResponse = await ApiService.get(`/commande/facture/${factureId}?format=${formatImpression.value}`, "", {
          responseType: "blob",
          timeout: 60000
        });

        console.log("PDF généré:", pdfResponse);

        const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
        console.log("Taille du blob:", blob.size, "bytes");

        if (blob.size === 0) {
          throw new Error("PDF vide reçu du serveur");
        }

        const blobUrl = window.URL.createObjectURL(blob);

        if (newWindow && !newWindow.closed) {
          newWindow.location.href = blobUrl;
          success("Facture enregistrée et ouverte avec succès");
        } else {
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `facture-${factureId}-${formatImpression.value}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          success("Facture enregistrée et téléchargée avec succès");
        }

        resetFormData();
        router.push({ name: "ListeVente" });

      } catch (err: any) {
        console.error('Erreur complète:', err);

        if (newWindow && !newWindow.closed) {
          newWindow.close();
        }

        let errorMessage = "Erreur lors de la génération du PDF";

        if (err.message === 'Timeout') {
          errorMessage = "La génération de la facture prend trop de temps. Réessayez.";
        } else if (err.code === 'ECONNABORTED') {
          errorMessage = "Connexion interrompue. Vérifiez votre connexion internet.";
        } else if (err.message) {
          errorMessage = err.message;
        }

        error(errorMessage);
      } finally {
        isGeneratingPdf.value = false;
      }
    };

    watch(typeFacture, (newValue) => {
      if (newValue === 'Facture proforma') {
        typeC.value = null;
        showC.value = false;
        montantReçu.value = null;
        reliquat.value = 0;
        resetBilletage();
      } else {
        if (!typeC.value) {
          typeC.value = "Au comptoir";
        }
        showC.value = typeC.value === "Au comptoir";
      }
    });

    const resetFormData = () => {
      produits.value = [];
      clientCharger.value = null;
      selectedClientId.value = 0;
      montantReçu.value = null;
      totalsomme.value = 0.0;
      totalsommeremise.value = 0.0;
      totaltva.value = 0.0;
      totalts.value = 0.0;
      totalttc.value = 0.0;
      totalaib.value = 0.0;
      valeurAib.value = 0;
      typeC.value = "Au comptoir";
      typeFacture.value = "Facture de vente";
      formatImpression.value = "A4";
      produit.produit = "";
      produit.qtite = 0.0;
      produit.prixInitial = 0.0
      produit.prixTtc = 0.0;
      produit.prixHt = 0.0;
      produit.taxeSpecifique = 0.0;
      produit.typeRemise = "";
      produit.valeurRemise = 0.0;
      produit.montantHt = 0.0;
      produit.montantTva = 0.0;
      produit.montantTtc = 0.0;
      produit.montantTs = 0.0;
      produit.montantHtApresRemise = 0.0;
      produit.libelleProduit = "";
      produit.groupeTaxeProduit = "";
      produit.carton = 0.0;
      produit.piece = 0.0;
      produit.stock = 0.0;
      produit.remise = 0.0;
      produit.restAliv = 0.0;
      produit.taxe = 1;

      // Reset du billetage
      resetBilletage();

      // Nettoyer le sessionStorage
      nettoyerVenteEnCours();
    };


    const sauvegarderVenteEnCours = () => {
      try {
        const venteData = {
          clientCharger: clientCharger.value,
          selectedClientId: selectedClientId.value,
          produits: produits.value,
          typeC: typeC.value,
          typeFacture: typeFacture.value,
          valeurAib: valeurAib.value,
          montantReçu: montantReçu.value,
          formatImpression: formatImpression.value,
          elements: elements,
          billetageEncaissement: billetageList,
          billetageSortie: billetageSortieList,
          montantTotalEncaissement: montantTotalEncaissement.value,
          montantTotalSortie: montantTotalSortie.value,
          reliquatNonRendu: reliquatNonRendu.value,
          timestamp: new Date().getTime()
        };
        sessionStorage.setItem('venteEnCours', JSON.stringify(venteData));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la vente:', error);
      }
    };

    const chargerVenteEnCours = () => {
      try {
        const savedData = sessionStorage.getItem('venteEnCours');
        if (savedData) {
          const venteData = JSON.parse(savedData);

          clientCharger.value = venteData.clientCharger;
          selectedClientId.value = venteData.selectedClientId;
          produits.value = venteData.produits || [];
          typeC.value = venteData.typeC || "Au comptoir";
          typeFacture.value = venteData.typeFacture || "Facture de vente";
          valeurAib.value = venteData.valeurAib || 0;
          montantReçu.value = venteData.montantReçu;
          formatImpression.value = venteData.formatImpression || "A4";

          if (venteData.elements && venteData.elements.length > 0) {
            elements.splice(0, elements.length, ...venteData.elements);
          }

          // Restaurer le billetage
          if (venteData.billetageEncaissement && venteData.billetageEncaissement.length > 0) {
            billetageList.splice(0, billetageList.length, ...venteData.billetageEncaissement);
          }
          if (venteData.billetageSortie && venteData.billetageSortie.length > 0) {
            billetageSortieList.splice(0, billetageSortieList.length, ...venteData.billetageSortie);
          }
          montantTotalEncaissement.value = venteData.montantTotalEncaissement || 0;
          montantTotalSortie.value = venteData.montantTotalSortie || 0;
          reliquatNonRendu.value = venteData.reliquatNonRendu || 0;

          calculeDestotaux();

          console.log('Vente restaurée depuis sessionStorage');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la vente:', error);
        sessionStorage.removeItem('venteEnCours');
      }
    };

    const nettoyerVenteEnCours = () => {
      try {
        sessionStorage.removeItem('venteEnCours');
        console.log('SessionStorage nettoyé');
      } catch (error) {
        console.error('Erreur lors du nettoyage du sessionStorage:', error);
      }
    };


    const showDetail = (prod) => {
      produitShow.value = prod;
    };

    const showC = ref(true);
    const typeC = ref("Au comptoir");

    function showHide(test) {
      console.log("test", test);
      if (test == "Sur commande") {
        showC.value = false;
        console.log("ff", showC.value);
      } else {
        showC.value = true;
        console.log("el", showC.value);
      }
    }

    const isDisable = ref(true);
    const prixErrorMessage = ref('');

    const produit = reactive(
      {
        commande_clit_id: "",
        magasin: "",
        produit: "",
        prixInitial: 0.0,
        qtite: 0.0,
        prixTtc: 0.0,
        prixHt: 0.0,
        prixMin: 0.0,
        prixMax: 0.0,
        taxeSpecifique: 0.0,
        typeRemise: '',
        valeurRemise: 0.0,
        montantHt: 0.0,
        montantTva: 0.0,
        montantTtc: 0.0,
        montantTs: 0.0,
        montantHtApresRemise: 0.0,
        libelleProduit: "",
        groupeTaxeProduit: "",
        carton: 0.0,
        piece: 0.0,
        stock: 0.0,
        remise: 0.0,
        restAliv: 0.0,
        taxe: 1,
        stockLogique: 0.0,
        stockPhysique: 0.0
      },
    );

    const editProduit = (index) => {
      enModification.value = true;
      modificationIndex.value = index;
      const selectedProduit = produits.value[index];

      Object.assign(produit, {
        commande_clit_id: selectedProduit.commande_clit_id,
        magasin: selectedProduit.magasin,
        produit: selectedProduit.produit,
        qtite: selectedProduit.qtite,
        prixTtc: selectedProduit.prixTtc,
        prixHt: selectedProduit.prixHt,
        prixMin: (selectedProduit as any).prixMin || 0,
        prixMax: (selectedProduit as any).prixMax || 0,
        prixInitial: (selectedProduit as any).prixInitial,
        taxeSpecifique: selectedProduit.taxeSpecifique,
        typeRemise: selectedProduit.typeRemise,
        valeurRemise: selectedProduit.valeurRemise,
        montantHt: selectedProduit.montantHt,
        montantTva: selectedProduit.montantTva,
        montantTtc: selectedProduit.montantTtc,
        montantTs: selectedProduit.montantTs,
        montantHtApresRemise: selectedProduit.montantHtApresRemise,
        libelleProduit: selectedProduit.libelleProduit,
        groupeTaxeProduit: selectedProduit.groupeTaxeProduit,
        carton: selectedProduit.carton,
        piece: selectedProduit.piece,
        stock: selectedProduit.stock,
        remise: selectedProduit.remise,
        restAliv: selectedProduit.restAliv,
        taxe: selectedProduit.taxe,

      });
    }

    async function addRowProduit() {

      if (!produit.magasin) {
        error("Veuillez selectionner le magasin ");
        return;
      }

      if (!validatePrixUnitaire()) {
        return;
      }

      if (enModification.value) {

        produits.value[modificationIndex.value] = {
          ...produit,
          prixMin: produit.prixMin,
          prixMax: produit.prixMax
        } as any;
        enModification.value = false;
        modificationIndex.value = null;
      } else {

        const tproduit = {
          ...produit,
          prixMin: produit.prixMin,
          prixMax: produit.prixMax,
          prixInitial: produit.prixInitial
        } as any;
        produits.value.push(tproduit);
      }
      produit.commande_clit_id = "",
        produit.magasin = null,
        produit.produit = null,
        produit.qtite = 0.0,
        produit.prixTtc = 0.0,
        produit.prixHt = 0.0,
        produit.taxeSpecifique = 0.0,
        produit.typeRemise = '',
        produit.valeurRemise = 0.0,
        produit.montantHt = 0.0,
        produit.montantTva = 0.0,
        produit.montantTtc = 0.0,
        produit.montantTs = 0.0,
        produit.montantHtApresRemise = 0.0,
        produit.libelleProduit = "",
        produit.groupeTaxeProduit = "",
        produit.carton = 0.0,
        produit.piece = 0.0,
        produit.stock = 0.0,
        produit.remise = 0.0,
        produit.restAliv = 0.0;
        produit.prixMin = 0.0;
        produit.prixMax = 0.0;
        produit.taxe = 1;
        produit.stockLogique = 0.0;
        produit.stockPhysique = 0.0;
        produit.prixInitial = 0.0
        calculeDestotaux();


    }

    const removeRowProduit = (index) => {
      produits.value.splice(index, 1);
      calculeDestotaux();
    };

    watch(typeC, (newValue, oldValue) => {
      if (newValue === "Au comptoir") {
        showC.value = true;
      } else {
        showC.value = false;
        if (oldValue === "Au comptoir") {
          montantReçu.value = null;
          resetBilletage();

          if (montantTotalEncaissement.value > 0) {
            warning("Le billetage a été réinitialisé car vous êtes passé en mode 'Sur commande'");
          }
        }
      }
    });

    const validateRowProduit = (value) => {
      return !value || value <= 0;
    };

    // watch(
    //   produit,
    //   (newValue) => {
    //     isDisable.value = validateRowProduit(newValue.produit);
    //     // newValue.some(
    //     //   (produit) =>
    //     //     validateRowProduit(newValue.produit) ||
    //     //     validateRowProduit(newValue.qtite) ||
    //     //     validateRowProduit(newValue.prixTtc)
    //     // );
    //   },
    //   { deep: true }
    // );

    watch(
      [produit, produits],
      ([newProduit, newProduits]) => {
        if (newProduits.length > 0) {
          isDisable.value = false;
        } else {
          isDisable.value = validateRowProduit(newProduit.produit) ||
            validateRowProduit(newProduit.qtite) ||
            validateRowProduit(newProduit.prixTtc);
        }
      },
      { deep: true }
    );


    watch(clientCharger, (newValue, oldValue) => {
      if (oldValue !== null && newValue !== oldValue) {
        if (produits.value.length > 0) {
          const confirm = window.confirm(
            "Changer de client réinitialisera tous les produits. Continuer ?"
          );
          if (confirm) {
            produits.value = [];
            produit.produit = null;
            produit.qtite = 0;
            produit.prixTtc = 0;
            produit.prixHt = 0;
            produit.magasin = null;
            calculeDestotaux();
            resetBilletage();
          } else {
            clientCharger.value = oldValue;
          }
        }
      }
    });

    //Elements
    const isDisableElement = ref(true);

    const elements = reactive([
      {
        titre: "",
        description: "",
        taillePolice: 0,
        alignement: "",
      },
    ]);

    const addRowElement = () => {
      elements.push({
        titre: "",
        description: "",
        taillePolice: 0,
        alignement: "",
      });
    };

    const removeRowElement = (index) => {
      if (elements.length > 1) elements.splice(index, 1);
    };

    const validateRowElement = (value) => {
      return !value || value <= 0;
    };

    watch(
      elements,
      (newValue) => {
        isDisableElement.value = newValue.some(
          (element) =>
            validateRowElement(element.titre) ||
            validateRowElement(element.taillePolice) ||
            validateRowElement(element.alignement)
        );
      },
      { deep: true }
    );

    // Watcher pour sauvegarder automatiquement dans sessionStorage
    watch(
      [clientCharger, produits, typeC, typeFacture, valeurAib, montantReçu, formatImpression, elements],
      () => {
        if (!isSaving.value) {
          sauvegarderVenteEnCours();
        }
      },
      { deep: true }
    );

    const produitsss = ref(null);
    const valuess = ref();

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    //calcule des totaux
    var calculeDestotaux = () => {
      totalsomme.value = 0.0;
      totalsommeremise.value = 0.0;
      totaltva.value = 0.0;
      totalts.value = 0.0;
      totalttc.value = 0.0;
      totalaib.value = 0.0;

      produits.value.forEach(produi => {
        if (produi.montantHt > 0) {
          totalsomme.value += Number(produi.montantHt);
        }
        if (produi.montantHtApresRemise > 0) {
          totalsommeremise.value += Number(produi.montantHtApresRemise);
        }
        if (produi.prixHt > 0) {
          if (produi.taxe == 0) {
            totaltva.value += 0;
          } else {
            totaltva.value += Number((produi.prixTtc / 1.18) * 0.18 * produi.qtite);
          }
        }
        if (produi.montantTtc > 0) {
          totalttc.value += Number(produi.montantTtc);
        }
        if (produi.montantTs > 0) {
          if (produi.taxe == 1) {
            totalts.value += Number(produi.montantTs / 1.18);
            totaltva.value += Number(produi.montantTs / 1.18 * 0.18);
          } else {
            totalts.value += Number(produi.montantTs);
            totaltva.value += 0;
          }
        }
      });
      if (valeurAib.value && valeurAib.value != 0) {
        const tauxAib = parseFloat(String(valeurAib.value).replace('%', ''));

        if (!isNaN(tauxAib) && tauxAib > 0) {
          totalaib.value = (totalsommeremise.value * tauxAib) / 100;
          totalttc.value += totalaib.value;
        }
      }
    }

    const validatePrixUnitaire = () => {
      prixErrorMessage.value = ''; // Réinitialiser le message d'erreur

      if (!produit.prixTtc || !produit.prixMin || !produit.prixMax) {
        return true;
      }

      const prix = parseFloat(String(produit.prixTtc));
      const min = parseFloat(String(produit.prixMin));
      const max = parseFloat(String(produit.prixMax));

      if (prix < min || prix > max) {
        prixErrorMessage.value = `Le prix doit être entre ${min} et ${max}`;
        return false;
      }

      return true;
    };


    const eventProduit = () => {

      if (!validatePrixUnitaire()) {
        return;
      }

      produit.qtite = Number(produit.qtite) || 0;
      // produit.prixTtc = Number(produit.prixTtc) || 0;
      produit.prixHt = Number(produit.prixHt) || 0;
      produit.valeurRemise = Number(produit.valeurRemise) || 0;
      produit.taxeSpecifique = Number(produit.taxeSpecifique) || 0;

      if (produit.prixTtc && produit.qtite) {
        let remiseUnitaire = 0;
        let prixremise = produit.prixHt;

        if (produit.valeurRemise) {
          if (produit.typeRemise == '%' && produit.valeurRemise != 0) {
            remiseUnitaire = (produit.prixHt * produit.valeurRemise) / 100;
          } else if (produit.typeRemise == 'MT' && produit.valeurRemise != 0) {
            remiseUnitaire = produit.valeurRemise;
          }

          prixremise = produit.prixHt - remiseUnitaire;
        }

        if (produit.prixMin && produit.prixMax && remiseUnitaire > 0) {
          console.log("=== VALIDATION REMISE ===");
          console.log("prixTtc (prix unitaire):", produit.prixTtc);
          console.log("prixInitial:", produit.prixInitial);
          console.log("prixMin:", produit.prixMin);
          console.log("prixMax:", produit.prixMax);
          console.log("remiseUnitaire:", remiseUnitaire);
          console.log("prixTtcApresRemise:", produit.prixTtc - remiseUnitaire);
          console.log("typeRemise:", produit.typeRemise);
          console.log("valeurRemise:", produit.valeurRemise);
          console.log("=========================");
          const prixTtcApresRemise = produit.prixTtc - remiseUnitaire;

          if (prixTtcApresRemise < produit.prixMin) {
            warning(`La remise est trop élevée ! Le prix après remise (${prixTtcApresRemise.toFixed(0)} FCFA) est inférieur au prix minimum autorisé (${produit.prixMin} FCFA).`);

            produit.valeurRemise = 0;
            remiseUnitaire = 0;
            prixremise = produit.prixHt;
            produit.remise = 0;

            return;
          }
        }

      if (remiseUnitaire > 0) {
          if (produit.typeRemise == '%') {
            produit.prixTtc = produit.prixInitial - (produit.prixInitial * produit.valeurRemise / 100);
          } else if (produit.typeRemise == 'MT') {
            produit.prixTtc = produit.prixInitial - remiseUnitaire;
          }
        } else {
          produit.prixTtc = produit.prixInitial;
        }

      // if (remiseUnitaire > 0) {
      //   if (produit.typeRemise == '%') {
      //     produit.prixTtc = produit.prixTtc - (produit.prixTtc * produit.valeurRemise / 100);
      //   } else if (produit.typeRemise == 'MT') {
      //     produit.prixTtc = produit.prixTtc - remiseUnitaire;
      //   }
      // }

        let ts = produit.taxeSpecifique || 0;
        let ts_ht = 0;
        ts = isNaN(ts) ? 0 : ts;

        if (!isNaN(ts) && ts > 0) {
          ts_ht = (produit.taxe != 0) ? (ts / 1.18) : ts;
        }

        produit.montantHt = produit.prixHt * produit.qtite;
        produit.remise = remiseUnitaire * produit.qtite;

        if (produit.taxe != 0) {
          produit.montantHtApresRemise = parseInt((((produit.prixHt / 1.18) - remiseUnitaire) * produit.qtite + ts_ht).toFixed(0));
          produit.montantTtc = parseInt(((((produit.prixTtc / 1.18) - remiseUnitaire) * produit.qtite) * 1.18).toFixed(0));
          produit.montantTva = parseInt((produit.montantTtc - (produit.prixTtc * produit.qtite / 1.18) - produit.remise).toFixed(0));
        } else {
          // EXONERE(taux = 0)
          produit.montantHtApresRemise = parseInt(((produit.prixTtc - remiseUnitaire) * produit.qtite).toFixed(0));
          produit.montantTva = 0;
          produit.montantTtc = parseInt(((produit.prixTtc - remiseUnitaire) * produit.qtite).toFixed(0));
        }

        produit.montantTtc = parseInt((produit.montantTtc + ts).toFixed(0));
        produit.montantTs = ts * produit.qtite;
      }
    }
    return {
      showDetails,
      totalsomme,
      totalsommeremise,
      totaltva,
      totalts,
      totalttc,
      totalaib,
      valeurAib,
      venteSchema,
      addVente,
      montantReçu,
      venteForm,
      magasin1Options,
      produits,
      produit,
      eventProduit,
      removeRowProduit,
      removeRowElement,
      addRowProduit,
      addRowElement,
      validateRowProduit,
      validateRowElement,
      getPrixProduitCondiTypeClient,
      valuess,
      isDisable,
      isDisableElement,
      getCurrentDate,
      produitOptions,
      showDetail,
      produitsss,
      elements,
      showHide,
      showC,
      typeC,
      produitShow,
      clientOptions,
      toggleAbonne,
      clientsOps,
      clientCharger,
      selectedClientId,
      selectedClient,
      getClient,
      fetchClient,
      handleSaveAndPrint,
      selectProd,
      selectedProduit,
      formatImpression,
      typeFacture,
      enModification,
      modificationIndex,
      editProduit,
      getMagasinLabel,
      isGeneratingPdf,
      updateStockByMagasin,
      reliquat,
      prixErrorMessage,
      // Billetage
      billetageList,
      billetageSortieList,
      montantTotalEncaissement,
      montantTotalSortie,
      reliquatCalcule,
      reliquatNonRendu,
      billetageError,
      caisseActive,
      handleBilletageInput,
      restrictInput,
      validerBilletage,
      resetBilletage,
      billetageValide,
      reliquatAffiche
    };
  },
});

</script>

<style scoped>
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

.info {
  min-width: 300px
}

input[readonly] {
  background-color: #f0f0f0;
}


.table-responsive {
  overflow-x: auto;
}

.table thead th,

.compact-input {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  height: 32px;
}

.compact-error {
  font-size: 0.75rem;
  margin-top: 0.125rem;
}

.container-tight {
  padding-left: 0;
  padding-right: 0;
}

.modal-xl {
  max-width: 1200px;
}

.table tbody td {
  white-space: nowrap;
}

.produit-col,
.quantite-col,
.prix-unitaire-col,
.taxe-col,
.type-rse-col,
.vente-rse-col,
.magasin-col {
  min-width: 150px;
}


.actions-col {
  width: 120px;
  position: sticky;
  right: 0;
  background-color: white;
  z-index: 10;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Pour le header de la colonne Actions */
.table thead th.actions {
  position: sticky;
  right: 0;
  background-color: white;
  z-index: 11;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%;
}

label {
  margin-bottom: 0.2rem;
}

.produit-col {
  white-space: normal !important;
  word-wrap: break-word;
  max-width: 170px;
}
</style>
