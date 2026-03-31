<template>
  <div class="card mb-25 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter un produit</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="produitForm" @submit="addProduit" :keep-values="valuess" :validation-schema="produitSchema">
        <div class="row gx-1">
          <div class="col-md-12">
            <div class="row row gx-2">
              <div class="col-md-2">
                <!--<div class="form-check">
                  <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                    Est Service ?
                  </label>
                  <input id="estService" name="estService" v-model="estService" :value="estService" type="checkbox"
                    class="form-check-input shadow-none" />
                  <ErrorMessage name="estService" class="text-danger" />
                </div>-->
                <label class="d-block text-black fw-semibold mb-1">
                  Image Produit
                </label>
                <div class="upload-container">
                  <input type="file" ref="fileInput" @change="(event) => onFilePrinChange(event)"
                    accept="image/jpeg, image/png, image/jpg" hidden />
                  <!-- Carte d'aperçu (cliquable pour choisir une image) -->
                  <div class="preview-card" @click="triggerFileInput">
                    <img v-if="imagePreview" :src="imagePreview" alt="Image preview" />
                    <div v-else class="text-center">
                      <div>
                        <i class="icofont icofont-camera fs-1"></i>
                      </div>
                      Cliquez pour ajouter l'image principal du produit
                    </div>
                    <!-- Bouton de suppression sur l'image -->
                    <button v-if="imagePreview" class="delete-btn" @click.stop="removeImage"><i
                        class="icofont icofont-close"></i></button>
                  </div>
                </div>
              </div>
              <div class="col-md-10">
                <div class="row gx-1">
                  <div class="col-md-3">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Code du produit
                      </label>
                      <Field type="text" name="code" class="form-control shadow-none fs-md-15 text-black"
                        readonly="true" placeholder="Ce code est généré" />
                      <ErrorMessage name="code" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Référence usine du produit
                      </label>
                      <Field name="refProd" type="text" class="form-control shadow-none fs-md-15 text-black"
                        placeholder="Entrer la référence" />
                      <ErrorMessage name="refProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Famille du produit<span class="text-danger">*</span>
                      </label>
                      <Field name="famille" v-slot="{ field }">
                        <Multiselect :options="familleOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" @select="selectFamille(field.value)"
                          placeholder="Sélectionner la famille" />
                      </Field>
                      <ErrorMessage name="famille" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-sm-2 mb-md-2" ref="dropdownRef">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom du Produit<span class="text-danger">*</span>
                      </label>
                      <Field name="nomProd" type="text" v-model="prodName" @focus="showBox = true"
                        class="mb-2 form-control shadow-none fs-md-15 text-black"
                        placeholder="Entrer le nom du produit" />
                      <ul class="dropdown-menu show" v-if="produitOptions.length > 0 && showBox == true">
                        <li v-for="(produit, index) in produitOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ produit.codeProduit }} - {{
                            produit.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3" ref="dropdownRef1">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom Standar du produit
                      </label>
                      <Field name="nomStandar" type="text" v-model="prodNameS" @focus="showBoxStan = true"
                        class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom" />
                      <ul class="dropdown-menu show " v-if="produitStanOptions.length > 0 && showBoxStan == true">
                        <li v-for="(produit, index) in produitStanOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ produit.codeProduit }} - {{
                            produit.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomStandar" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3" ref="dropdownRef2">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom marché du produit
                      </label>
                      <Field name="nomMarche" type="text" v-model="prodNameM" @focus="showBoxM = true"
                        class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom marché" />
                      <ul class="dropdown-menu show " v-if="produitMarOptions.length > 0 && showBoxM == true">
                        <li v-for="(produit, index) in produitMarOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ produit.codeProduit }} - {{
                            produit.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomMarche" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Marque du produit<span class="text-danger">*</span>
                      </label>
                      <Field name="marqProd" v-slot="{ field }">
                        <Multiselect :options="marqueOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Choisir la marque" />
                      </Field>
                      <ErrorMessage name="marqProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Unité de Stockage
                      </label>
                      <Field name="uniteStock" v-slot="{ field }" v-model="uniteStock">
                        <Multiselect :options="conditionnementOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Choisir l'unité de stockage" />
                      </Field>
                      <ErrorMessage name="uniteStock" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Unité de gestion
                      </label>
                      <Field name="uniteGestion" v-slot="{ field }" v-model="uniteGestion">
                        <Multiselect :options="conditionnementgOptions" :searchable="true" track-by="label"
                          label="label" v-model="field.value" v-bind="field" @select="seletUniteGestion(field.value)"
                          placeholder="Choisir l'unité de gestion" />
                      </Field>
                      <ErrorMessage name="uniteGestion" class="text-danger" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3">
            <br />
            <div class="form-check mt-3 mb-3 mb-sm-3 mb-md-3">
              <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                Est Service ?
              </label>
              <input id="estService" name="estService" v-model="estService" :value="estService" type="checkbox"
                class="form-check-input shadow-none" />
              <ErrorMessage name="estService" class="text-danger" />
            </div>
          </div> -->
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Méthode de Suivi de stock <span class="text-danger">*</span>
              </label>
              <Field name="suiviStock" type="text" v-slot="{ field }">
                <Multiselect :searchable="true" :options="['CUMP', 'FIFO', 'LIFO', 'Par lot']" v-model="field.value"
                  v-bind="field" placeholder="Sélectionner la méthode" />
              </Field>
              <ErrorMessage name="suiviStock" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Domaine d'utilisation <span class="text-danger">*</span>
              </label>
              <Field name="domaines" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="domaineOptions" :close-on-select="false"
                  :preserve-search="true" :clear-on-select="false" :multiple="true" :searchable="true" mode="tags"
                  placeholder="Sélectionner les domaines" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="domaines" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Pays de Fabrication <span class="text-danger">*</span>
              </label>
              <Field name="paysProduction" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="pays" :searchable="true"
                  placeholder="Sélectionner le pays de fabrication" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="paysProduction" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-3 mb-sm-3 mb-md-3">
              <label class="d-block text-black fw-semibold mb-1">
                Description du produit
              </label>
              <Field name="descProd" as="textarea" placeholder="Entrer la description" v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black">
                <textarea class="form-control shadow-none rounded-0 text-black" v-model="field.value"></textarea>
              </Field>
              <ErrorMessage name="descProd" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3" v-for="(champsLibre, index) in chamsdescritifs" :key="index">
            <div class="form-group mb-3 mb-sm-3 mb-md-3">
              <label class="d-block text-black fw-semibold mb-1">
                {{ champsLibre.libelleChamp }} <span class="text-danger" v-if="champsLibre.estObligatoire == 1">*</span>
              </label>
              <div v-if="champsLibre.typeChamp == 'boolean'">
                <label>
                  <input type="radio" v-model="champsLibre.valeur"
                    :class="(valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-check shadow-none fs-md-15 text-black is-invalid ' : 'form-control shadow-none fs-md-15 text-black '"
                    name="status" value="1" checked> Oui
                </label>
                <label>
                  <input type="radio" v-model="champsLibre.valeur"
                    :class="(valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-check shadow-none fs-md-15 text-black is-invalid ' : 'form-control shadow-none fs-md-15 text-black '"
                    name="status" value="0"> Non
                </label>
                <div v-if="valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1"
                  class="text-danger">
                  {{ champsLibre.libelleChamp }} est obligatoire.
                </div>
              </div>
              <div v-else-if="champsLibre.typeChamp == 'name'" class="input-group">
                <select v-if="champsLibre.modeSaisie == 'keywordValueList'"
                  :class="(valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-select shadow-none fs-md-15 text-black is-invalid ' : 'form-select shadow-none fs-md-15 text-black '"
                  v-model="champsLibre.valeur" :name="champsLibre.nomChamp">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="(option, index) in champsLibre.valeurPossible" :key="index" :value="option.value">
                    {{ option.libelle }}
                  </option>
                </select>
                <select v-if="champsLibre.modeSaisie == 'keywordKeyValueList'"
                  :class="(valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-select shadow-none fs-md-15 text-black is-invalid ' : 'form-select shadow-none fs-md-15 text-black '"
                  v-model="champsLibre.valeur" :name="champsLibre.nomChamp">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="(option, index) in champsLibre.valeurPossible" :key="index" :value="option.valeur">
                    {{ option.libelle }}
                  </option>
                </select>
              </div>
              <div v-else class="input-group">
                <input
                  :class="(valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-control shadow-none fs-md-15 text-black is-invalid ' : 'form-control shadow-none fs-md-15 text-black '"
                  v-model="champsLibre.valeur" :name="champsLibre.nomChamp" :type="champsLibre.typeChamp" />
              </div>
              <div v-if="valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1" class="text-danger">
                {{ champsLibre.libelleChamp }} est obligatoire.
              </div>
            </div>
          </div>

          <div class="col-md-12 mb-md-25">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                  type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                  Conditionnement
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="home2-tab" data-bs-toggle="tab" data-bs-target="#home2-tab-pane"
                  type="button" role="tab" aria-controls="home2-tab-pane" aria-selected="false">
                  Image
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">
                          Conditionnement(s) du produit
                        </h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                            @click="addRowConditionnement()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter un conditionnement
                          </button>
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row gx-1 ">
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold">
                            Conditionnement
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Quantité <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Prix Min 
                          </label>
                        </div>
                         <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            PrixDeVente <span class="text-danger">*</span>
                          </label>
                        </div>
                         <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Prix Max 
                          </label>
                        </div>

                        
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Action
                          </label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <div class="row gx-1" v-for="(conditionnement, index) in conditionnements" :key="index">
                        <div class="col-md-2 mb-3">
                          <div class="">
                            <input v-if="index == 0" type="text" readonly :value="uniteGestion?.split('|')[2]"
                              class="form-control shadow-none fs-md-15 text-black" />
                            <Multiselect v-else :options="conditionnementOptions" :searchable="true" track-by="label"
                              label="label" v-model="conditionnement.conditionnement" placeholder="Sélectionner"
                              @select="selectConditionnement(conditionnement.conditionnement, conditionnement)" />
                            <div class="invalid-feedback" v-if="valideteRowProduit(conditionnement.conditionnement)">
                              Le conditionnement est obligatoire.
                            </div>
                          </div>
                        </div>

                        <div class="col-md-2 mb-3">
                          <div class="form-group mb-2 ">
                            <input v-if="index == 0" type="text" readonly v-model="conditionnement.quantite"
                              class="form-control shadow-none fs-md-15 text-black" />
                            <div class="input-group" v-else>
                              <input type="number" v-model="conditionnement.quantite" :class="valideteRowProduit(conditionnement.quantite)
                                ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                : 'form-control shadow-none fs-md-15 text-black '" placeholder="Entrer la quantité"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                              <span class="input-group-text" id="inputGroup-sizing-default">{{ uniteGestion != null
                                ? (uniteGestion?.split("|")[2]) : 'UM' }}</span>
                            </div>
                            <div v-if="valideteRowProduit(conditionnement.quantite)" class="invalid-feedback">
                              La quantité est obligatoire.
                            </div>
                          </div>
                        </div>

                         <div class="col-md-2 mb-3">
                          <div class="form-group mb-2 ">
                            <input v-if="index == 0" type="text" v-model="conditionnement.prixMin"
                              class="form-control shadow-none fs-md-15 text-black" />
                            <div class="input-group" v-else>
                             <input type="number" v-model="conditionnement.prixMin" 
                              :class="isPrixMaxInvalid(conditionnement) 
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid'
                                  : 'form-control shadow-none fs-md-15 text-black'"
                                placeholder="Entrer le prix minimal" aria-label="Saisir le prix minimal"
                                aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div v-if="isPrixMinInvalid(conditionnement)" class="invalid-feedback">
                              Le prix minimal doit être inférieur ou égal au prix de vente.
                            </div>
                          </div>
                        </div>
                         <div class="col-md-2 mb-3">
                          <div class="form-group mb-2 ">
                            <input v-if="index == 0" type="text" v-model="conditionnement.prixVente"
                              class="form-control shadow-none fs-md-15 text-black" />
                            <div class="input-group" v-else>
                              <input type="number" v-model="conditionnement.prixVente" :class="valideteRowProduit(conditionnement.prixVente)
                                ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                : 'form-control shadow-none fs-md-15 text-black '" placeholder="Entrer le prix de vente"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
              
                            </div>
                            <div v-if="valideteRowProduit(conditionnement.prixVente)" class="invalid-feedback">
                              Le prix de vente est obligatoire.
                            </div>
                          </div>
                        </div>
                         <div class="col-md-2 mb-3">
                          <div class="form-group mb-2 ">
                            <input v-if="index == 0" type="text" v-model="conditionnement.prixMax"
                              class="form-control shadow-none fs-md-15 text-black" />
                            <div class="input-group" v-else>
                              <input type="number" v-model="conditionnement.prixMax" :class="isPrixMaxInvalid(conditionnement)
                                ? 'form-control shadow-none fs-md-15 text-black is-invalid'
                                : 'form-control shadow-none fs-md-15 text-black '" placeholder="Entrer le prix maximal"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
              
                            </div>
                            <div v-if="isPrixMaxInvalid(conditionnement)" class="invalid-feedback">
                              Le prix Max doit être supérieur  ou égal  au prix de vente
                            </div>
                          </div>
                        </div>
                        <!-- <div class="col-md-3 mb-3">
                          <div class="input-group">
                            <Multiselect :options="conditionnementOptions" :searchable="true" track-by="label"
                              label="label" v-model="conditionnement.conditionnement2" placeholder="Sélectionner" />
                            <div class="invalid-feedback" v-if="valideteRowProduit(conditionnement.conditionnement2)">
                              Le conditionnement est obligatoire.
                            </div>
                          </div>
                        </div> -->

                        <div class="col-md-2 mb-3" v-if="index > 0">
                          <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                            @click="removeRowConditionnement(index)">
                            <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade p-10" id="home2-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4 !important">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Image(s) du produit</h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisablee }" :disabled="isDisablee"
                            @click="addRowImage()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i> Ajouter une image
                          </button>
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col-md-12">
                        <div class="product-upload  mb-10">
                          <!--<p>Images</p>-->
                          <div class="dz-message needsclick">
                            <DropZone name="fichiers[]" :maxFilesize="50000000" :maxFiles="Number(10000000000)" class=""
                              :uploadOnDrop="true" @addedFile="onFileAdd" @removedFile="onFileRemove"
                              :options="dropzoneOptions" @vdropzone-success="onSuccess" @vdropzone-error="onError">
                              <div class="default-image-container" v-if="!hasFiles">
                                <img :src="defaultImage" alt="Default" class="default-image" />
                                <p>Drag and drop files here, or click to select files</p>
                              </div>
                            </DropZone>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit" :disabled="(isDisable || isDisableCha) ? true : false"
                :class="(!isDisable || !isDisableCha) ? { 'cursor-not-allowed': false } : { 'cursor-not-allowed': true }">
                Ajouter un produit
              </button>
              <router-link to="/produits/liste-produits" class="btn btn-danger"><i
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
import { defineComponent, ref, watch, onMounted, reactive, onBeforeUnmount } from "vue";
import { Form, Field, ErrorMessage, useFieldArray, useForm } from "vee-validate";
import { error, success } from "@/utils/utils";
import { useRouter, useRoute } from "vue-router";

import ApiService from "@/services/ApiService";
import { Produit } from "@/models/Produit";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import DropZone from "dropzone-vue";
import { ChampsLibre } from "@/models/ChampsLibre";


export default defineComponent({
  name: "AddProduit",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    DropZone
  },
  setup: () => {
    const produitForm = ref<Produit | null>(null);
    const router = useRouter();
    const route = useRoute();
    const familleOptions = ref([]);
    const groupeTaxeOptions = ref([]);
    const famille = ref();
    const marqueOptions = ref([]);
    const modeDefPrixOptions = ref([]);
    const produitStanOptions = ref([]);
    const produitMarOptions = ref([]);
    const prodName = ref("");
    const prodNameS = ref("");
    const prodNameM = ref("");
    //const magasinOptions = ref([]);
    const methodeOptions = ref([]);
    //const estService = ref(false);
    const isDisableCha = ref(false);
    const defaultImage = 'path/to/your/default-image.jpg'; // Chemin de l'image par défaut
    const hasFiles = ref(false); // Indicateur pour savoir si des fichiers ont été déposés
    const toutFichier = ref<Array<File>>([])
    const conditionnementOptions = ref([]);
    const conditionnementgOptions = ref([]);
    const produitOptions = ref([]);
    const domaineOptions = ref([]);
    const prixProd = ref();
    const produitsss: any = ref(null);
    const valuess = ref();
    const showBox = ref(false);
    const showBoxM = ref(false);
    const showBoxStan = ref(false);
    const chamsdescritifs = reactive<Array<ChampsLibre>>([]);
    const codeProduit = ref("");
    const uniteStock = ref(null);
    const dropzoneOptions = {
      url: 'your-upload-url', // URL de téléchargement des fichiers
      thumbnailWidth: 150,
      maxFilesize: 2,
      headers: { "My-Awesome-Header": "header value" }
    };

    const onSuccess = (file) => {
      hasFiles.value = true; // Mettre à jour l'indicateur lorsqu'un fichier est déposé avec succès
    };

    const onError = (file, message) => {
      console.error('File upload error:', message);
    };

    // watch(estService, () => {
    //   console.log('estservice', estService.value)
    // })

    watch(prodName, (newValue, oldValue) => {
      if (newValue != "" && newValue.length >= 3) {
        fetchProduis(newValue);
      } else {
        produitOptions.value = [];
      }
    })

    watch(prodNameS, (newValue, oldValue) => {
      if (newValue != "" && newValue.length >= 3) {
        fetchSProduis(newValue);
      } else {
        produitStanOptions.value = [];
      }
    })

    watch(prodNameM, (newValue, oldValue) => {
      if (newValue != "" && newValue.length >= 3) {
        fetchMProduis(newValue);
      } else {
        produitMarOptions.value = [];
      }
    })


    const montantTotal = ref(0);
    const isDisable = ref(true);
    const isDisablee = ref(true);
    const conditionnements = reactive([]);

    const images = reactive([
      {
        file: null,
        previewUrl: null,
      },
    ]);

    const addRowConditionnement = () => {
      conditionnements.push({
        conditionnement: "",
        quantite: 0,
        prixMin:null,
        prixVente:null,
        prixMax:null,
        conditionnement2: ""
      });
    };

    const onFileAdd = (file: any) => {
      toutFichier.value.push(file["file"]);
    };

    const onFileRemove = (file: File) => {
      //
      console.log("J'ai retiré ceci ==> ", file);
      console.log("LLLL ==> ", file["file"].name);
      console.log("TOUS FICHIERS ==> ", toutFichier.value);
      // Recherche de l'index du fichier dans le tableau
      const index = toutFichier.value.findIndex(fil => ((fil.name === file["file"].name) && (fil.size === file["file"].size) && (fil.type === file["file"].type)));
      if (index !== -1) {
        toutFichier.value.splice(index, 1);
      } else {
        console.log(`Le fichier ${file["file"].name} n'a pas été trouvé dans le tableau.`);
      }
    }

    const dropdownRef = ref(null);
    const dropdownRef1 = ref(null);
    const dropdownRef2 = ref(null);

    function handleClickOutside(event) {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showBox.value = false;
      }

      if (dropdownRef1.value && !dropdownRef1.value.contains(event.target)) {
        showBoxStan.value = false;
      }

      if (dropdownRef2.value && !dropdownRef2.value.contains(event.target)) {
        showBoxM.value = false;
      }
    }

    const onFileChange = (event, index) => {
      const file = event.target.files[0];
      if (file) {
        images[index].previewUrl = URL.createObjectURL(file);
        images[index].file = file;
      }
    };

    function getProduit(id: number) {
      ApiService.get("/produits/" + id.toString())
        .then(({ data }) => {
          console.log(data.data, "datadatadatadatadatadatadatadata");
          for (const key in data.data) {
            produitForm.value?.setFieldValue(key, (typeof data.data[key] === 'object' && data.data[key] !== null) ? data.data[key].id : data.data[key]);
          }
          produitForm.value?.setFieldValue("famille", data.data["famille"].id)
          console.log("famille ===> ", data.data["famille"])
          famille.value = parseInt(data.data["famille"].id);
          //uniteGestion.value = parseInt(data.data["uniteGestion"].id);
          //uniteStock.value = parseInt(data.data["uniteStock"].id);
          produitForm.value?.setFieldValue("domaines", data.data["domaineproduits"].map((domaine) => domaine.domaineActivite.id));
          produitForm.value?.setFieldValue("uniteStock", data.data["uniteStock"].id + "|" + data.data["uniteStock"].valeur + "|" + data.data["uniteStock"].libelle);
          produitForm.value?.setFieldValue("uniteGestion", data.data["uniteGestion"].id + "|" + data.data["uniteGestion"].valeur + "|" + data.data["uniteGestion"].libelle);
          produitForm.value?.setFieldValue("codeProduit", "");
          produitForm.value?.setFieldValue("id", null);
          produitForm.value?.setFieldValue("imagePrincipal", null);
          delete  produitForm.value?.id;
          // if (data.data["imagePrincipal"] != null) {
          //   imagePreview.value = getUrlApiForProductFiles(data.data["imagePrincipal"]);
          // }
          if (data.data["produitchampslibres"] != null) {
            data.data["produitchampslibres"].forEach(element => {
              chamsdescritifs.push({
                id: parseInt(element.champslibre.id),
                libelleChamp: element.champslibre.libelleChamp,
                estObligatoire: element.champslibre.estObligatoire,
                typeChamp: element.champslibre.typeChamp,
                nomChamp: element.champslibre.nomChamp,
                valeur: element.valeur,
                idProChamp: null,
              });
            });

          }

          if (data.data["produitconditionnements"] != null) {
            data.data["produitconditionnements"].forEach(element => {
              conditionnements.push({
                conditionnement: element.conditionnement.id + "|" + element.conditionnement.valeur + "|" + element.conditionnement.libelle,
                quantite: element.qteCond,
                conditionnement2:  element.conditionnement2.id + "|" + element.conditionnement2.valeur + "|" + element.conditionnement2.libelle,
              });
            });

          }

          console.log("FOOROROROROROMMM ===> ", famille.value)
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }


    const addRowImage = () => {
      images.push({
        file: null,
        previewUrl: null,
      });
    };

    const removeRowConditionnement = (index) => {
      if (conditionnements.length > 1) conditionnements.splice(index, 1);
      //totals();
    };

    const removeRowImage = (index) => {
      if (images.length > 1) images.splice(index, 1);
      //totals();
    };

    const valideteRowProduit = (e) => {
      if (e == "" || e == 0 || e == "" || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

       const isPrixMinInvalid=(conditionnement=>{
      if(conditionnement.prixMin !=null && conditionnement.prixVente !=null){
        return conditionnement.prixMin > conditionnement.prixVente;
      }
      return false;
    })

    const isPrixMaxInvalid=(conditionnement=>{
      if(conditionnement.prixMax !=null && conditionnement.prixVente !=null){
        return conditionnement.prixMax < conditionnement.prixVente;
      }
      return false;
    })

    const modeDefPrix = ref("");
    const selectGroupe = (value) => {
      console.log(value, "valuevaluevaluevalue");
      if (parseInt(value.split("|")[1]) > 0) {
        modeDefPrix.value = "TTC(Toutes Taxes Comprises)";
      } else {
        modeDefPrix.value = "HT(Hors Taxes)";
      }
    }

    const selectFamille = (value) => {
      console.log(value, "valuevaluevaluevalue");
      if (parseInt(value) > 0) {
        fetchAllChamps(parseInt(value));
      } else {
        chamsdescritifs.length = 0;
      }
    }

      watch(conditionnements, (newValue, oldValue) => {
  let isInvalid = false;
  Object.keys(newValue).forEach(function (key) {
    if (
      valideteRowProduit(newValue[key].conditionnement) ||
      valideteRowProduit(newValue[key].quantite) ||
      valideteRowProduit(newValue[key].prixVente)
    ) {
      isInvalid = true;
    } else if (
      newValue[key].prixMin != null &&
      newValue[key].prixVente != null &&
      parseFloat(newValue[key].prixMin) > parseFloat(newValue[key].prixVente)
    ) {
      isInvalid = true;
    } else if (
      newValue[key].prixMax != null &&
      newValue[key].prixVente != null &&
      parseFloat(newValue[key].prixMax) < parseFloat(newValue[key].prixVente)
    ) {
      isInvalid = true;
    } else {
    }
  });
  isDisable.value = isInvalid;
});


    watch(chamsdescritifs, (newValue, oldValue) => {
      const newValueLast = newValue.filter(order => order.estObligatoire == 1);
      console.log(newValueLast, "newValueLastnewValueLast");
      Object.keys(newValueLast).forEach(function (key) {
        if (newValueLast[key].valeur == "" || newValue[key].valeur == 0) {
          if (newValueLast[key].estObligatoire == 1) {
            isDisableCha.value = true;
            console.log(isDisableCha.value, "isDisableCha.value true");
          }
        } else {
          isDisableCha.value = false;
          console.log(isDisableCha.value, "isDisableCha.value false");
        }
      });
    });

    watch(images, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (newValue[key].image == "") {
          isDisablee.value = true;
        } else {
          isDisablee.value = false;
        }
      });
    });


    const { remove, push, fields, update } = useFieldArray("conditionnements");



    const fetchConditionnements = async () => {
      try {
        const response = await axios.get("/conditionnements");
        const conditionnementsData = response.data.data;
        produitsss.value = conditionnementsData;
        conditionnementOptions.value = conditionnementsData.map((conditionnement) => ({
          value: conditionnement.id + "|" + conditionnement.valeur + "|" + conditionnement.libelle,
          label: `${conditionnement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchConditionnementugs = async () => {
      try {
        const response = await axios.get("/conditionnementugs");
        const conditionnementgData = response.data.data;
        produitsss.value = conditionnementgData;
        conditionnementgOptions.value = conditionnementgData.map((conditionnement) => ({
          value: conditionnement.id + "|" + conditionnement.valeur + "|" + conditionnement.libelle,
          label: `${conditionnement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchAllChamps = async (id) => {
      try {
        const response = await axios.get("/champsdescritif/famille/" + id);
        console.log(response.data, "response.dataresponse.dataresponse.data");
        chamsdescritifs.length = 0;
        response.data.data.forEach(element => {
          chamsdescritifs.push(element.champslibre);
        });
        console.log(chamsdescritifs, "chamsdescritifs.valuechamsdescritifs.value");

      } catch (error) {
        //
      }
    };

    const fetchProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`produits/recherche?keyword=${newValue}&type=0`);
        console.log(response, "responseresponseresponseresponse");
        produitOptions.value = response.data.data;;
      } catch (error) {
        //
      }
    };

    const fetchSProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`produits/recherche?keyword=${newValue}&type=1`);
        console.log(response, "responseresponseresponseresponse");
        produitStanOptions.value = response.data.data;;
      } catch (error) {
        //
      }
    };

    const fetchMProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`produits/recherche?keyword=${newValue}&type=2`);
        console.log(response, "responseresponseresponseresponse");
        produitMarOptions.value = response.data.data;;
      } catch (error) {
        //
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

    const selectConditionnement = async (value: any, conditionnement: any) => {
      console.log("Element", value);
      console.log("Objet", conditionnement.quantite);
      conditionnement.quantite = value.split("|")[1];
    };

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const addProduit = async (values, { resetForm }) => {
      console.log('Valeurs du formulaire :', values);
      console.log('Iff')
      values.conditionnements = conditionnements.map(conditionnement => ({
        conditionnement: conditionnement.conditionnement.split("|")[0],
        qteCond: conditionnement.quantite,
        prixMin:conditionnement.prixMin,
        prixVente:conditionnement.prixVente,
        prixMax:conditionnement.prixMax,
        conditionnement2: uniteGestion.value.split("|")[0],
      }));
      console.log("tkttt",values.conditionnements);
      values["uniteGestion"] = uniteGestion.value.split("|")[0]
      values["uniteStock"] = uniteStock.value.split("|")[0]
      if (imageFile.value) {
        console.log(imageFile.value, "imageFile.value")
        values["imagePrincipal"] = imageFile.value;
      }

      values.champsdescritifs = chamsdescritifs.map(champsdescritif => ({
        champslibre: champsdescritif.id,
        valeur: champsdescritif.valeur,
      }));
      console.log('Les champs descriptifs ===> ', values);
      //values['images'] =  images.map(image => (image.file))
      // retirer urmImage du values
      delete values.urlImage;
      if (toutFichier.value.length > 0) {
        values['autreFichier[]'] = [];
        values['autreFichier[]'] = toutFichier.value.map((fichier) => (fichier));
      }

      console.log('Les fichiers ===> ', values["images"]);
      console.log('Mon FORMIULAIRE', values);

      ApiService.postWithFile("/produits", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeProduit" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchFamille = async () => {
      try {
        const response = await ApiService.get("all/all/familles");
        const familleData = response.data.data.data;
        console.log(familleData, "familleData");
        familleOptions.value = familleData.map((famille) => ({
          value: famille.id,
          label: `${famille.codeFamille} - ${famille.libelleFamille} ${famille.famille ? '(' + famille.famille.libelleFamille + ')' : ""}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchDomaines = async () => {
      try {
        const response = await ApiService.get("/domaines");
        const domainesData = response.data.data.data;
        console.log(domainesData, "domainesDatadomainesDatadomainesData");
        domaineOptions.value = domainesData.map((domaine) => ({
          value: domaine.id,
          label: `${domaine.code} - ${domaine.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchMarque = async () => {
      try {
        const response = await ApiService.get("all/all/marques");
        const marqueData = response.data.data.data;
        marqueOptions.value = marqueData.map((marque) => ({
          value: marque.id,
          label: marque.code,
        }));
      } catch (error) {
        //
      }
    };

    const produitSchema = Yup.object().shape({
      //groupeTaxe: Yup.string().required("Le groupe de taxe est obligatoire"),
      marqProd: Yup.string().required("La marque est obligatoire"),
      // modeDefPrix: Yup.string().required("Le mode de prix est obligatoire"),
      suiviStock: Yup.string().required("La méthode de suivi est obligatoire"),
      refProd: Yup.string().notRequired(),
      nomProd: Yup.string().required("Le nom est obligatoire"),
      nomStandar: Yup.string().notRequired(),
      nomMarche: Yup.string().notRequired(),
      imagePrincipal: Yup.string().notRequired(),
      famille: Yup.string().required("La famille est obligatoire"),
      uniteGestion: Yup.string().notRequired(),
      uniteStock: Yup.string().notRequired(),
      domaines: Yup.array().notRequired(),
      paysProduction: Yup.string().notRequired(),
      //estService: Yup.boolean().notRequired(),
      descProd: Yup.string().notRequired(),
    });

    const fetchGroupTaxe = async () => {
      try {
        const response = await ApiService.get("all/groupeTaxes");
        const groupeTaxeData = response.data.data.data;
        groupeTaxeOptions.value = groupeTaxeData.map((groupeTaxe) => ({
          value: `${groupeTaxe.id}|${groupeTaxe.taux}`,
          label: `${groupeTaxe.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const seletUniteGestion = (valeur) => {
      uniteGestion.value = valeur;
      conditionnements.length = 0;
      conditionnements.push({
        conditionnement: uniteGestion.value.split("|")[0],
        quantite: uniteGestion.value.split("|")[1],
        prixMin:null,
        prixVente:null,
        prixMax:null,
        conditionnement2: ""
      });
    }

    const uniteGestion = ref(null);
    const fileInput = ref(null);
    const imagePreview = ref(null);
    const imageFile = ref<File>(null);

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const onFilePrinChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const removeImage = () => {
      imagePreview.value = null;
      imageFile.value = null;
    };

    onMounted(async () => {
      document.addEventListener('click', handleClickOutside);
      await fetchFamille();
      await fetchGroupTaxe();
      await fetchConditionnements();
      await fetchConditionnementugs();
      await fetchMarque();
      await fetchDomaines();
      if (route.params.id) {
        console.log("ID from route params:", route.params.id);
        await getProduit(parseInt(route.params.id as string));
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      seletUniteGestion,
      produitOptions,
      uniteGestion,
      produitStanOptions,
      produitMarOptions,
      prodName,
      prodNameS,
      prodNameM,
      addProduit,
      hasFiles,
      produitForm,
      familleOptions,
      modeDefPrixOptions,
      groupeTaxeOptions,
      marqueOptions,
      methodeOptions,
      // magasinOptions,
      conditionnements,
      conditionnementgOptions,
      addRowImage,
      removeRowImage,
      removeRowConditionnement,
      addRowConditionnement,
      valideteRowProduit,
       isPrixMaxInvalid,
      isPrixMinInvalid,
      montantTotal,
      valuess,
      modeDefPrix,
      selectGroupe,
      images,
      conditionnementOptions,
      prixProd,
      selectConditionnement,
      isDisable,
      isDisablee,
      getCurrentDate,
      isDisableCha,
      //estService,
      onFileChange,
      dropzoneOptions,
      onFileAdd,
      onFileRemove,
      onSuccess,
      onError,
      defaultImage,
      chamsdescritifs,
      selectFamille,
      produitSchema,
      triggerFileInput,
      onFilePrinChange,
      removeImage,
      imagePreview,
      imageFile,
      fileInput,
      uniteStock,
      domaineOptions, pays,
      showBox, showBoxM, showBoxStan, dropdownRef, dropdownRef1, dropdownRef2,

    };
  },
});
</script>

<style scoped>
.dropzone-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: auto;
}

.default-image-container {
  text-align: center !important;
  margin: 20px 0 !important;
}

.default-image {
  width: 100px !important;
  height: auto !important;
}

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

@import 'dropzone-vue/dist/dropzone-vue.common.css';

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.preview-card {
  width: 100%;
  height: 200px;
  border: 2px dashed #4caf50;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background: #f8f8f8;
  position: relative;
}

.preview-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  padding: 5px 8px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
}

.delete-btn:hover {
  background: darkred;
}
</style>
