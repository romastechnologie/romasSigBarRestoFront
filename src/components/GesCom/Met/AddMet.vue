<template>
  <div class="card mb-25 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter un met</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="metForm" @submit="addMet" :keep-values="valuess" :validation-schema="metSchema">
        <div class="row gx-1">
          <div class="col-md-12">
            <div class="row row gx-2">
              <div class="col-md-2">
                <label class="d-block text-black fw-semibold mb-1">
                  Image Met
                </label>
                <div class="upload-container">
                  <input type="file" ref="fileInput" @change="(event) => onFilePrinChange(event)"
                    accept="image/jpeg, image/png, image/jpg" hidden />
                  <div class="preview-card" @click="triggerFileInput">
                    <img v-if="imagePreview" :src="imagePreview" alt="Image preview" />
                    <div v-else class="text-center">
                      <div>
                        <i class="icofont icofont-camera fs-1"></i>
                      </div>
                      Cliquez pour ajouter l'image principal du met
                    </div>
                    <button v-if="imagePreview" class="delete-btn" @click.stop="removeImage">
                      <i class="icofont icofont-close"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-md-10">
                <div class="row gx-1">
                  <div class="col-md-3">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">Code du met</label>
                      <Field type="text" name="code" class="form-control shadow-none fs-md-15 text-black"
                        readonly="true" placeholder="Ce code est généré" />
                      <ErrorMessage name="code" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">Référence usine du met</label>
                      <Field name="refProd" type="text" class="form-control shadow-none fs-md-15 text-black"
                        placeholder="Entrer la référence" />
                      <ErrorMessage name="refProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Catégorie du met<span class="text-danger">*</span>
                      </label>
                      <Field name="categorieMet" v-slot="{ field }">
                        <Multiselect :options="categorieOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Sélectionner la catégorie" />
                      </Field>
                      <ErrorMessage name="categorieMet" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Famille du met<span class="text-danger">*</span>
                      </label>
                      <Field name="famille" v-slot="{ field }">
                        <Multiselect :options="familleOptions" :searchable="true" mode="tags" track-by="label"
                          label="label" v-model="field.value" v-bind="field" @select="selectFamille(field.value)"
                          placeholder="Sélectionner la famille" />
                      </Field>
                      <ErrorMessage name="famille" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Groupe de taxe<span class="text-danger">*</span>
                      </label>
                      <Field name="groupeTaxe" v-slot="{ field }">
                        <Multiselect :options="groupeTaxeOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Sélectionner le groupe" />
                      </Field>
                      <ErrorMessage name="groupeTaxe" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-sm-2 mb-md-2" ref="dropdownRef">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom du Met<span class="text-danger">*</span>
                      </label>
                      <Field name="nomProd" type="text" v-model="prodName" @focus="showBox = true"
                        class="mb-2 form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du met" />
                      <ul class="dropdown-menu show" v-if="metOptions.length > 0 && showBox == true">
                        <li v-for="(met, index) in metOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ met.codeMet }} - {{ met.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3" ref="dropdownRef1">
                      <label class="d-block text-black fw-semibold mb-1">Nom Standar du met</label>
                      <Field name="nomStandar" type="text" v-model="prodNameS" @focus="showBoxStan = true"
                        class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom" />
                      <ul class="dropdown-menu show" v-if="metStanOptions.length > 0 && showBoxStan == true">
                        <li v-for="(met, index) in metStanOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ met.codeMet }} - {{ met.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomStandar" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3" ref="dropdownRef2">
                      <label class="d-block text-black fw-semibold mb-1">Nom marché du met</label>
                      <Field name="nomMarche" type="text" v-model="prodNameM" @focus="showBoxM = true"
                        class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom marché" />
                      <ul class="dropdown-menu show" v-if="metMarOptions.length > 0 && showBoxM == true">
                        <li v-for="(met, index) in metMarOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ met.codeMet }} - {{ met.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomMarche" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Marque du met<span class="text-danger">*</span>
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
                      <label class="d-block text-black fw-semibold mb-1">Unité de Stockage</label>
                      <Field name="uniteStock" v-slot="{ field }" v-model="uniteStock">
                        <Multiselect :options="conditionnementOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Choisir l'unité de stockage" />
                      </Field>
                      <ErrorMessage name="uniteStock" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">Unité de gestion</label>
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
              <label class="d-block text-black fw-semibold mb-1">Description du met</label>
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
                {{ champsLibre.libelleChamp }}
                <span class="text-danger" v-if="champsLibre.estObligatoire == 1">*</span>
              </label>
              <div v-if="champsLibre.typeChamp == 'boolean'">
                <label>
                  <input type="radio" v-model="champsLibre.valeur"
                    :class="(valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-check shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                    name="status" value="1" checked> Oui
                </label>
                <label>
                  <input type="radio" v-model="champsLibre.valeur"
                    :class="(valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-check shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                    name="status" value="0"> Non
                </label>
                <div v-if="valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1" class="text-danger">
                  {{ champsLibre.libelleChamp }} est obligatoire.
                </div>
              </div>
              <div v-else-if="champsLibre.typeChamp == 'name'" class="input-group">
                <select v-if="champsLibre.modeSaisie == 'keywordValueList'"
                  :class="(valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-select shadow-none fs-md-15 text-black is-invalid' : 'form-select shadow-none fs-md-15 text-black'"
                  v-model="champsLibre.valeur" :name="champsLibre.nomChamp">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="(option, index) in champsLibre.valeurPossible" :key="index" :value="option.value">
                    {{ option.libelle }}
                  </option>
                </select>
                <select v-if="champsLibre.modeSaisie == 'keywordKeyValueList'"
                  :class="(valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-select shadow-none fs-md-15 text-black is-invalid' : 'form-select shadow-none fs-md-15 text-black'"
                  v-model="champsLibre.valeur" :name="champsLibre.nomChamp">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="(option, index) in champsLibre.valeurPossible" :key="index" :value="option.valeur">
                    {{ option.libelle }}
                  </option>
                </select>
              </div>
              <div v-else class="input-group">
                <input
                  :class="(valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-control shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                  v-model="champsLibre.valeur" :name="champsLibre.nomChamp" :type="champsLibre.typeChamp" />
              </div>
              <div v-if="valideteRowMet(champsLibre.valeur) && champsLibre.estObligatoire == 1" class="text-danger">
                {{ champsLibre.libelleChamp }} est obligatoire.
              </div>
            </div>
          </div>

          <!-- ===== TABS ===== -->
          <div class="col-md-12 mb-md-25">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                  type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                  Conditionnement
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="produit-tab" data-bs-toggle="tab" data-bs-target="#produit-tab-pane"
                  type="button" role="tab" aria-controls="produit-tab-pane" aria-selected="false">
                  Ingrédient
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

              <!-- ===== TAB : CONDITIONNEMENT ===== -->
              <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Conditionnement(s) du met</h3>
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
                        </div>
                      </div>
                    </div>

                    <div>
                      <!-- En-têtes colonnes -->
                      <div class="row gx-1">
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold">
                            Conditionnement <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Quantité <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">Prix Min</label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Prix de Vente <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">Prix Max</label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">Action</label>
                        </div>
                      </div>
                      <hr class="mt-0" />

                      <!-- Lignes conditionnements -->
                      <div class="row gx-1" v-for="(conditionnement, index) in conditionnements" :key="index">
                        <div class="col-md-2 mb-3">
                          <input v-if="index == 0" type="text" readonly :value="uniteGestion?.split('|')[2]"
                            class="form-control shadow-none fs-md-15 text-black" />
                          <Multiselect v-else :options="conditionnementOptions" :searchable="true" track-by="label"
                            label="label" v-model="conditionnement.conditionnement" placeholder="Sélectionner"
                            @select="selectConditionnement(conditionnement.conditionnement, conditionnement)" />
                          <div class="invalid-feedback" v-if="valideteRowMet(conditionnement.conditionnement)">
                            Le conditionnement est obligatoire.
                          </div>
                        </div>

                        <div class="col-md-2 mb-3">
                          <input v-if="index == 0" type="text" readonly v-model="conditionnement.quantite"
                            class="form-control shadow-none fs-md-15 text-black" />
                          <div class="input-group" v-else>
                            <input type="number" v-model="conditionnement.quantite"
                              :class="valideteRowMet(conditionnement.quantite) ? 'form-control shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                              placeholder="Entrer la quantité" />
                            <span class="input-group-text">
                              {{ uniteGestion != null ? uniteGestion?.split('|')[2] : 'UM' }}
                            </span>
                          </div>
                          <div v-if="valideteRowMet(conditionnement.quantite)" class="invalid-feedback">
                            La quantité est obligatoire.
                          </div>
                        </div>

                        <div class="col-md-2 mb-3">
                          <input v-if="index == 0" type="text" v-model="conditionnement.prixMin"
                            class="form-control shadow-none fs-md-15 text-black" />
                          <div class="input-group" v-else>
                            <input type="number" v-model="conditionnement.prixMin"
                              :class="isPrixMinInvalid(conditionnement) ? 'form-control shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                              placeholder="Entrer le prix minimal" />
                          </div>
                          <div v-if="isPrixMinInvalid(conditionnement)" class="invalid-feedback">
                            Le prix minimal doit être inférieur ou égal au prix de vente.
                          </div>
                        </div>

                        <div class="col-md-2 mb-3">
                          <input v-if="index == 0" type="text" v-model="conditionnement.prixVente"
                            class="form-control shadow-none fs-md-15 text-black" />
                          <div class="input-group" v-else>
                            <input type="number" v-model="conditionnement.prixVente"
                              :class="valideteRowMet(conditionnement.prixVente) ? 'form-control shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                              placeholder="Entrer le prix de vente" />
                          </div>
                          <div v-if="valideteRowMet(conditionnement.prixVente)" class="invalid-feedback">
                            Le prix de vente est obligatoire.
                          </div>
                        </div>

                        <div class="col-md-2 mb-3">
                          <input v-if="index == 0" type="text" v-model="conditionnement.prixMax"
                            class="form-control shadow-none fs-md-15 text-black" />
                          <div class="input-group" v-else>
                            <input type="number" v-model="conditionnement.prixMax"
                              :class="isPrixMaxInvalid(conditionnement) ? 'form-control shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                              placeholder="Entrer le prix maximal" />
                          </div>
                          <div v-if="isPrixMaxInvalid(conditionnement)" class="invalid-feedback">
                            Le prix Max doit être supérieur ou égal au prix de vente.
                          </div>
                        </div>

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

              <!-- ===== TAB : INGRÉDIENT ===== -->
              <div class="tab-pane fade p-10" id="produit-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Ingrédient(s)</h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" @click="addRowIngredient()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter un ingrédient
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <!-- En-têtes colonnes -->
                      <div class="row gx-1">
                        <div class="col-md-5">
                          <label class="d-block text-black fw-semibold">Produit</label>
                        </div>
                        <div class="col-md-5">
                          <label class="d-block text-black fw-semibold mb-1">Quantité</label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">Action</label>
                        </div>
                      </div>
                      <hr class="mt-0" />

                      <!-- Lignes ingrédients -->
                        <!--<div class="row gx-2" v-for="(produit, produitIndex) in produits"
                                        :key="produitIndex"> -->
                      <div class="row gx-1" v-for="(piece, index) in produit" :key="index">
                        <div class="col-md-5 mb-3">
                          <Field :name="`produit[${index}].produit`" v-slot="{ field }">
                            <Multiselect v-model="produit[index].produit" v-bind="field"
                              :options="produitOptions" :preserve-search="true" :multiple="false"
                              :searchable="true" placeholder="Sélectionner le produit" label="label"
                              track-by="value" value-prop="value" />
                          </Field>
                          <ErrorMessage :name="`produit[${index}].produit`" class="text-danger" />
                        </div>

                        <div class="col-md-5 mb-3">
                          <Field type="number" class="form-control shadow-none fs-md-15 text-black"
                            placeholder="Entrer la quantité" :name="`produit[${index}].quantite`"
                            v-model="produit[index].quantite" />
                          <ErrorMessage :name="`produit[${index}].quantite`" class="text-danger" />
                        </div>

                        <div class="col-md-2 mb-3" v-if="index > 0">
                          <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                            @click="removeRowIngredient(index)">
                            <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ===== TAB : IMAGE ===== -->
              <div class="tab-pane fade p-10" id="home2-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Image(s) du met</h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisablee }" :disabled="isDisablee"
                            @click="addRowImage()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i> Ajouter une image
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col-md-12">
                        <div class="product-upload mb-10">
                          <div class="dz-message needsclick">
                            <DropZone name="fichiers[]" :maxFilesize="50000000" :maxFiles="Number(10000000000)"
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
          <!-- ===== FIN TABS ===== -->

          <!-- ===== BOUTONS ===== -->
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit"
                :disabled="(isDisable || isDisableCha) ? true : false"
                :class="(isDisable || isDisableCha) ? { 'cursor-not-allowed': true } : {}">
                Ajouter un met
              </button>
              <router-link to="/mets/liste-mets" class="btn btn-danger">
                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                Annuler
              </router-link>
            </div>
          </div>

        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive, onBeforeUnmount } from "vue";
import { Form, Field, ErrorMessage, useFieldArray } from "vee-validate";
import { error, success } from "@/utils/utils";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { Met } from "@/models/Met";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import DropZone from "dropzone-vue";
import { ChampsLibre } from "@/models/ChampsLibre";

export default defineComponent({
  name: "AddMet",
  components: { Form, Field, ErrorMessage, Multiselect, DropZone },
  setup: () => {
    const metForm = ref<Met | null>(null);
    const router = useRouter();
    const route = useRoute();
    //const produitOptions = ref([]);

    const familleOptions = ref([]);
    const categorieOptions = ref([]);
    const groupeTaxeOptions = ref([]);
    const famille = ref();
    const groupeTaxe = ref();
    const categorieMet = ref();
    const marqueOptions = ref([]);
    const modeDefPrixOptions = ref([]);
    const metStanOptions = ref([]);
    const metMarOptions = ref([]);
    const prodName = ref("");
    const prodNameS = ref("");
    const prodNameM = ref("");
    const methodeOptions = ref([]);
    const isDisableCha = ref(false);
    const defaultImage = 'path/to/your/default-image.jpg';
    const hasFiles = ref(false);
    const toutFichier = ref<Array<File>>([]);
    const conditionnementOptions = ref([]);
    const conditionnementgOptions = ref([]);
    const metOptions = ref([]);
    const domaineOptions = ref([]);
    const prixProd = ref();
    const metsss: any = ref(null);
    const valuess = ref();
    const showBox = ref(false);
    const showBoxM = ref(false);
    const showBoxStan = ref(false);
    const chamsdescritifs = reactive<Array<ChampsLibre>>([]);
    const uniteStock = ref(null);
    const produitOptions = ref([]);

    const dropzoneOptions = {
      url: 'your-upload-url',
      thumbnailWidth: 150,
      maxFilesize: 2,
      headers: { "My-Awesome-Header": "header value" }
    };

    const produit = ref<any[]>([{ conditionnement: '', quantite: '' }]);

    const addRowIngredient = async () => {
      produit.value.push({ conditionnement: '', quantite: '' });
    };

    const removeRowIngredient = (index: number) => {
      if (produit.value.length > 1) {
        produit.value.splice(index, 1);
      }
    };

    const handleFileChange = (event: Event, index: number) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        produit.value[index].urlImage = file;
      }
    };

    const onSuccess = (file) => { hasFiles.value = true; };
    const onError = (file, message) => { console.error('File upload error:', message); };

    watch(prodName, (newValue) => {
      if (newValue !== "" && newValue.length >= 3) fetchProduis(newValue);
      else metOptions.value = [];
    });

    watch(prodNameS, (newValue) => {
      if (newValue !== "" && newValue.length >= 3) fetchSProduis(newValue);
      else metStanOptions.value = [];
    });

    watch(prodNameM, (newValue) => {
      if (newValue !== "" && newValue.length >= 3) fetchMProduis(newValue);
      else metMarOptions.value = [];
    });

    const montantTotal = ref(0);
    const isDisable = ref(true);
    const isDisablee = ref(true);
    const conditionnements = reactive([]);

    const images = reactive([{ file: null, previewUrl: null }]);

    const addRowConditionnement = () => {
      conditionnements.push({
        conditionnement: "",
        quantite: 0,
        prixMin: null,
        prixVente: null,
        prixMax: null,
        conditionnement2: ""
      });
    };

    const onFileAdd = (file: any) => { toutFichier.value.push(file["file"]); };

    const onFileRemove = (file: File) => {
      const index = toutFichier.value.findIndex(
        fil => fil.name === file["file"].name && fil.size === file["file"].size && fil.type === file["file"].type
      );
      if (index !== -1) toutFichier.value.splice(index, 1);
    };

    const dropdownRef = ref(null);
    const dropdownRef1 = ref(null);
    const dropdownRef2 = ref(null);

    function handleClickOutside(event) {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) showBox.value = false;
      if (dropdownRef1.value && !dropdownRef1.value.contains(event.target)) showBoxStan.value = false;
      if (dropdownRef2.value && !dropdownRef2.value.contains(event.target)) showBoxM.value = false;
    }

    const onFileChange = (event, index) => {
      const file = event.target.files[0];
      if (file) {
        images[index].previewUrl = URL.createObjectURL(file);
        images[index].file = file;
      }
    };

    function getMet(id: number) {
      ApiService.get("/mets/" + id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            metForm.value?.setFieldValue(key,
              (typeof data.data[key] === 'object' && data.data[key] !== null) ? data.data[key].id : data.data[key]
            );
          }
          metForm.value?.setFieldValue("famille", data.data["famille"].id);
          famille.value = parseInt(data.data["famille"].id);
          metForm.value?.setFieldValue("domaines", data.data["domainemets"].map((d) => d.domaineActivite.id));
          metForm.value?.setFieldValue("uniteStock", `${data.data["uniteStock"].id}|${data.data["uniteStock"].valeur}|${data.data["uniteStock"].libelle}`);
          metForm.value?.setFieldValue("uniteGestion", `${data.data["uniteGestion"].id}|${data.data["uniteGestion"].valeur}|${data.data["uniteGestion"].libelle}`);
          metForm.value?.setFieldValue("codeMet", "");
          metForm.value?.setFieldValue("id", null);
          metForm.value?.setFieldValue("imagePrincipal", null);
          delete metForm.value?.id;

          if (data.data["metchampslibres"] != null) {
            data.data["metchampslibres"].forEach(element => {
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

          if (data.data["metconditionnements"] != null) {
            data.data["metconditionnements"].forEach(element => {
              conditionnements.push({
                conditionnement: `${element.conditionnement.id}|${element.conditionnement.valeur}|${element.conditionnement.libelle}`,
                quantite: element.qteCond,
                conditionnement2: `${element.conditionnement2.id}|${element.conditionnement2.valeur}|${element.conditionnement2.libelle}`,
              });
            });
          }
        })
        .catch(({ response }) => { error(response.data.message); });
    }

    const addRowImage = () => { images.push({ file: null, previewUrl: null }); };
    const removeRowConditionnement = (index) => { if (conditionnements.length > 1) conditionnements.splice(index, 1); };
    const removeRowImage = (index) => { if (images.length > 1) images.splice(index, 1); };

    const valideteRowMet = (e) => e === "" || e === 0 || e === "0" || e == null || e < 0;

    const isPrixMinInvalid = (conditionnement) => {
      if (conditionnement.prixMin != null && conditionnement.prixVente != null) {
        return conditionnement.prixMin > conditionnement.prixVente;
      }
      return false;
    };

    const isPrixMaxInvalid = (conditionnement) => {
      if (conditionnement.prixMax != null && conditionnement.prixVente != null) {
        return conditionnement.prixMax < conditionnement.prixVente;
      }
      return false;
    };

    const validateRowProduit = (e) => e === '' || e === 0 || e === '0' || e == null || e < 0;

    const modeDefPrix = ref("");
    const selectGroupe = (value) => {
      modeDefPrix.value = parseInt(value.split("|")[1]) > 0 ? "TTC(Toutes Taxes Comprises)" : "HT(Hors Taxes)";
    };

    const selectFamille = (value) => {
      if (parseInt(value) > 0) fetchAllChamps(parseInt(value));
      else chamsdescritifs.length = 0;
    };

    watch(conditionnements, (newValue) => {
      let isInvalid = false;
      Object.keys(newValue).forEach((key) => {
        if (
          valideteRowMet(newValue[key].conditionnement) ||
          valideteRowMet(newValue[key].quantite) ||
          valideteRowMet(newValue[key].prixVente)
        ) {
          isInvalid = true;
        } else if (newValue[key].prixMin != null && newValue[key].prixVente != null &&
          parseFloat(newValue[key].prixMin) > parseFloat(newValue[key].prixVente)) {
          isInvalid = true;
        } else if (newValue[key].prixMax != null && newValue[key].prixVente != null &&
          parseFloat(newValue[key].prixMax) < parseFloat(newValue[key].prixVente)) {
          isInvalid = true;
        }
      });
      isDisable.value = isInvalid;
    });

    watch(chamsdescritifs, (newValue) => {
      const required = newValue.filter(o => o.estObligatoire == 1);
      Object.keys(required).forEach((key) => {
        if (required[key].valeur == "" || required[key].valeur == 0) {
          isDisableCha.value = true;
        } else {
          isDisableCha.value = false;
        }
      });
    });

    watch(images, (newValue) => {
      Object.keys(newValue).forEach((key) => {
        isDisablee.value = newValue[key].image === "";
      });
    });

    const { remove, push, fields, update } = useFieldArray("conditionnements");

    const fetchConditionnements = async () => {
      try {
        const response = await axios.get("/conditionnements");
        const data = response.data.data;
        metsss.value = data;
        conditionnementOptions.value = data.map((c) => ({
          value: `${c.id}|${c.valeur}|${c.libelle}`,
          label: c.libelle,
        }));
      } catch (e) { /* silence */ }
    };

    const fetchConditionnementugs = async () => {
      try {
        const response = await axios.get("/conditionnementugs");
        const data = response.data.data;
        conditionnementgOptions.value = data.map((c) => ({
          value: `${c.id}|${c.valeur}|${c.libelle}`,
          label: c.libelle,
        }));
      } catch (e) { /* silence */ }
    };

    const fetchAllChamps = async (id) => {
      try {
        const response = await axios.get("/champsdescritif/famille/" + id);
        chamsdescritifs.length = 0;
        response.data.data.forEach(element => chamsdescritifs.push(element.champslibre));
      } catch (e) { /* silence */ }
    };

    const fetchProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`mets/recherche?keyword=${newValue}&type=0`);
        metOptions.value = response.data.data;
      } catch (e) { /* silence */ }
    };

    const fetchSProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`mets/recherche?keyword=${newValue}&type=1`);
        metStanOptions.value = response.data.data;
      } catch (e) { /* silence */ }
    };

    const fetchMProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`mets/recherche?keyword=${newValue}&type=2`);
        metMarOptions.value = response.data.data;
      } catch (e) { /* silence */ }
    };

    const getAllProduits = async () => {
      try {
        const response = await ApiService.get('/all/produitconditionnements');
        const data = response.data.data;
        produitOptions.value = data.map((p) => ({
          value: `${p.id}|${p.produit?.codeProduit}|${p.produit?.nomProd}|${p.conditionnement.libelle}`,
          label: `${p.produit?.codeProduit}|${p.produit?.nomProd} [${p.conditionnement.libelle}]`,
        }));
      } catch (e) { console.log(e); }
    };

    const pays = [
      "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Anguilla",
      "Antarctique", "Antigua-et-Barbuda", "Antilles Néerlandaises", "Arabie Saoudite", "Argentine", "Arménie",
      "Aruba", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Bélarus",
      "Belgique", "Belize", "Bénin", "Bermudes", "Bhoutan", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil",
      "Brunéi Darussalam", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-vert",
      "Chili", "Chine", "Chypre", "Colombie", "Comores", "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba",
      "Danemark", "Djibouti", "Dominique", "Égypte", "El Salvador", "Émirats Arabes Unis", "Équateur", "Érythrée",
      "Espagne", "Estonie", "États Fédérés de Micronésie", "États-Unis", "Éthiopie", "Fédération de Russie",
      "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Gibraltar", "Grèce", "Grenade",
      "Groenland", "Guadeloupe", "Guam", "Guatemala", "Guinée", "Guinée Équatoriale", "Guinée-Bissau", "Guyana",
      "Guyane Française", "Haïti", "Honduras", "Hong-Kong", "Hongrie", "Inde", "Indonésie", "Irak", "Irlande",
      "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan",
      "Kiribati", "Koweït", "Lesotho", "Lettonie", "Liban", "Libéria", "Liechtenstein", "Lituanie", "Luxembourg",
      "Macao", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Martinique", "Maurice",
      "Mauritanie", "Mayotte", "Mexique", "Monaco", "Mongolie", "Montserrat", "Mozambique", "Myanmar", "Namibie",
      "Nauru", "Népal", "Nicaragua", "Niger", "Nigéria", "Niué", "Norvège", "Nouvelle-Calédonie",
      "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Panama",
      "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pitcairn", "Pologne",
      "Polynésie Française", "Porto Rico", "Portugal", "Qatar", "République Arabe Syrienne",
      "République Centrafricaine", "République de Corée", "République de Moldova",
      "République Démocratique du Congo", "République Démocratique Populaire Lao", "République Dominicaine",
      "République du Congo", "République Islamique d'Iran", "République Populaire Démocratique de Corée",
      "République Tchèque", "République-Unie de Tanzanie", "Réunion", "Roumanie", "Royaume-Uni", "Rwanda",
      "Sahara Occidental", "Saint-Kitts-et-Nevis", "Saint-Marin", "Saint-Pierre-et-Miquelon",
      "Saint-Siège (État de la Cité du Vatican)", "Saint-Vincent-et-les Grenadines", "Sainte-Hélène",
      "Sainte-Lucie", "Samoa", "Samoa Américaines", "Sao Tomé-et-Principe", "Sénégal", "Serbie-et-Monténégro",
      "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Sri Lanka",
      "Suède", "Suisse", "Suriname", "Svalbard et Île Jan Mayen", "Swaziland", "Tadjikistan", "Taïwan", "Tchad",
      "Terres Australes Françaises", "Territoire Britannique de l'Océan Indien",
      "Territoire Palestinien Occupé", "Thaïlande", "Timor-Leste", "Togo", "Tokelau", "Tonga",
      "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu",
      "Venezuela", "Viet Nam", "Wallis et Futuna", "Yémen", "Zambie", "Zimbabwe"
    ];

    const selectConditionnement = async (value: any, conditionnement: any) => {
      conditionnement.quantite = value.split("|")[1];
    };

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      return `${today.getFullYear()}-${month}-${day}`;
    };

    const addMet = async (values, { resetForm }) => {
      values.conditionnements = conditionnements.map(c => ({
        conditionnement: c.conditionnement.split("|")[0],
        qteCond: c.quantite,
        prixMin: c.prixMin,
        prixVente: c.prixVente,
        prixMax: c.prixMax,
        conditionnement2: uniteGestion.value.split("|")[0],
      }));
      values["uniteGestion"] = uniteGestion.value.split("|")[0];
      values["uniteStock"] = uniteStock.value.split("|")[0];
      if (imageFile.value) values["imagePrincipal"] = imageFile.value;
      values.champsdescritifs = chamsdescritifs.map(c => ({ champslibre: c.id, valeur: c.valeur }));
      delete values.urlImage;
      if (toutFichier.value.length > 0) {
        values['autreFichier[]'] = toutFichier.value.map((f) => f);
      }

      ApiService.postWithFile("/mets", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeMet" });
          }
        })
        .catch(({ response }) => { error(response.data.message); });
    };

    const fetchFamille = async () => {
      try {
        const response = await ApiService.get("all/all/familles");
        const data = response.data.data.data;
        familleOptions.value = data.map((f) => ({
          value: f.id,
          label: `${f.codeFamille} - ${f.libelleFamille} ${f.famille ? '(' + f.famille.libelleFamille + ')' : ""}`,
        }));
      } catch (e) { /* silence */ }
    };

    const fetchCategorieMet = async () => {
      try {
        const response = await ApiService.get("/categorieMets");
        const data = response.data.data.data;
        categorieOptions.value = data.map((c) => ({
          value: c.id,
          label: `${c.code} - ${c.libelle} ${c.categorieMet ? '(' + c.categorieMet.libelle + ')' : ""}`,
        }));
      } catch (e) { /* silence */ }
    };

    const fetchDomaines = async () => {
      try {
        const response = await ApiService.get("/domaines");
        const data = response.data.data.data;
        domaineOptions.value = data.map((d) => ({
          value: d.id,
          label: `${d.code} - ${d.libelle}`,
        }));
      } catch (e) { /* silence */ }
    };

    const fetchMarque = async () => {
      try {
        const response = await ApiService.get("all/all/marques");
        const data = response.data.data.data;
        marqueOptions.value = data.map((m) => ({ value: m.id, label: m.code }));
      } catch (e) { /* silence */ }
    };

    const metSchema = Yup.object().shape({
      categorieMet: Yup.string().required("La catégorie est obligatoire"),
      groupeTaxe: Yup.string().required("Le groupe de taxe est obligatoire"),
      marqProd: Yup.string().required("La marque est obligatoire"),
      suiviStock: Yup.string().required("La méthode de suivi est obligatoire"),
      refProd: Yup.string().notRequired(),
      nomProd: Yup.string().required("Le nom est obligatoire"),
      nomStandar: Yup.string().notRequired(),
      nomMarche: Yup.string().notRequired(),
      imagePrincipal: Yup.string().notRequired(),
      famille: Yup.array().of(Yup.string()).min(1, 'Au moins une famille est obligatoire'),
      uniteGestion: Yup.string().notRequired(),
      uniteStock: Yup.string().notRequired(),
      domaines: Yup.array().notRequired(),
      paysProduction: Yup.string().notRequired(),
      descProd: Yup.string().notRequired(),
      produit: Yup.array().of(
        Yup.object().shape({
          conditionnement: Yup.string().notRequired(),
          quantite: Yup.string().notRequired(),
        })
      ).notRequired(),
    });

    const fetchGroupTaxe = async () => {
      try {
        const response = await ApiService.get("all/groupeTaxes");
        const data = response.data.data.data;
        groupeTaxeOptions.value = data.map((g) => ({
          value: `${g.id}|${g.taux}`,
          label: g.libelle,
        }));
      } catch (e) { /* silence */ }
    };

    const seletUniteGestion = (valeur) => {
      uniteGestion.value = valeur;
      conditionnements.length = 0;
      conditionnements.push({
        conditionnement: uniteGestion.value.split("|")[0],
        quantite: uniteGestion.value.split("|")[1],
        prixMin: null,
        prixVente: null,
        prixMax: null,
        conditionnement2: ""
      });
    };

    const uniteGestion = ref(null);
    const fileInput = ref(null);
    const imagePreview = ref(null);
    const imageFile = ref<File>(null);

    const triggerFileInput = () => { fileInput.value.click(); };

    const onFilePrinChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => { imagePreview.value = e.target.result; };
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
      await fetchCategorieMet();
      await getAllProduits();
      await fetchDomaines();
      if (route.params.id) {
        await getMet(parseInt(route.params.id as string));
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      seletUniteGestion, metOptions, uniteGestion, metStanOptions, metMarOptions,
      prodName, prodNameS, prodNameM, addMet, produitOptions, hasFiles,
      groupeTaxe, categorieMet, metForm, familleOptions, categorieOptions,
      modeDefPrixOptions, groupeTaxeOptions, marqueOptions, methodeOptions,
      conditionnements, conditionnementgOptions, addRowImage, removeRowImage,
      removeRowConditionnement, addRowConditionnement, valideteRowMet,
      isPrixMaxInvalid, isPrixMinInvalid, validateRowProduit, montantTotal,
      addRowIngredient, produit, removeRowIngredient, handleFileChange,
      valuess, modeDefPrix, selectGroupe, images, conditionnementOptions,
      prixProd, selectConditionnement, isDisable, isDisablee, getCurrentDate,
      isDisableCha, onFileChange, dropzoneOptions, onFileAdd, onFileRemove,
      onSuccess, onError, defaultImage, chamsdescritifs, selectFamille,produitOptions,
      metSchema, triggerFileInput, onFilePrinChange, removeImage, imagePreview,
      imageFile, fileInput, uniteStock, domaineOptions, pays,
      showBox, showBoxM, showBoxStan, dropdownRef, dropdownRef1, dropdownRef2,
    };
  },
});
</script>

<style scoped>
@import 'dropzone-vue/dist/dropzone-vue.common.css';

.cursor-not-allowed {
  cursor: not-allowed;
}

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

.default-image-container {
  text-align: center;
  margin: 20px 0;
}

.default-image {
  width: 100px;
  height: auto;
}
</style>