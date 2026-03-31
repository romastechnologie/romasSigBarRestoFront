<template>
  <Form @submit="addPersonnel">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="">
              <div class="card-header">
                <h5 class="">Formulaire d'ajout de personnel</h5>
                <!----><!----><!---->
              </div>
              <div class="card-body">
                <div class="row g-xl-5 g-3">
                  <div
                    class="col-xxl-3 col-xl-4 box-col-4e sidebar-left-wrapper"
                  >
                    <ul
                      class="sidebar-left-icons nav nav-pills"
                      ref="tabContainer"
                      id="add-product-pills-tab"
                      role="tablist"
                    ></ul>
                  </div>
                  <div class="col-xxl-9 col-xl-8 box-col-8 position-relative">
                    <div class="tab-content" id="add-product-pills-tabContent">
                      <div
                        v-if="currentStep === 1"
                        class="tab-pane fade show active"
                        id="info-personnel"
                        role="tabpanel"
                        aria-labelledby="info-personnel-tab"
                      >
                        <div class="sidebar-body">
                          <div class="row g-2">
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Nom <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="nom"
                                  v-model="nom"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer le nom"
                                />
                                <span class="text-danger" v-show="!nom"
                                  >Entrer le nom</span
                                >
                              </div>
                            </div>
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Prénom <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="prenom"
                                  v-model="prenom"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer le prenom"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Sexe <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="sexe"
                                  v-model="sexe"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="['Masculin', 'Féminin']"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner le sexe"
                                  />
                                </Field>
                                                      </div>
                            </div>
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Situation matrimoniale
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="situationMatrimoniale"
                                  v-model="situation"
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

                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Photo<span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="photo"
                                  v-model="photo"
                                  type="file"
                                  accept="image/jpeg, image/png application/pdf"
                                  @change="onFileChange"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Choisissez une image"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 mb-3">
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
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Date de naissance
                                </label>
                                <Field
                                  name="birthdate"
                                  v-model="birthdate"
                                  :max="maxDate"
                                  @input="checkAge"
                                  type="date"
                                  class="form-control shadow-none fs-md-15 text-black"
                                />
                              </div>
                              <p v-if="ageError" class="text-danger fs-md-12">
                                L'âge minimal est de 18 ans.
                              </p>
                            </div>
                            <div class="col-md-4 mt-3">
                              <label for="dateEmbauche" class="form-label">
                                Date d'embauche<span class="text-danger"
                                  >*</span
                                ></label
                              >
                              <Field
                                name="dateEmbauche"
                                v-model="dateEmbauche"
                                class="form-control"
                                type="Date"
                                :max="maxDate1"
                              />
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Numéro de Sécurité Sociale
                                </label>
                                <Field
                                  name="numeroSecuriteSociale"
                                  v-model="numeroSecuriteSociale"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer le numéro"
                                />
                              </div>
                            </div>
                            <!--<div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nationalité<span class="text-danger">*</span>
                                          </label>
                                          <Field name="nationalite" v-model="nationalite" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la nationnalité " />
                                          <ErrorMessage name="nationalite" class="text-danger" />
                                        </div>
                                      </div>-->
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Pays de résidence
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="nationalite"
                                  v-model="nationalite"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="countries"
                                    :searchable="true"
                                    track-by="value"
                                    label="label"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner le pays"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-6 mb-3">
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
                            <div class="col-md-6 mb-3">
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
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Service GG <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="service"
                                  v-model="service"
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="currentStep === 2"
                        class="tab-pane fade show active"
                        id="adresse-contact"
                        role="tabpanel"
                        aria-labelledby="adresse-contact-tab"
                      >
                        <div class="sidebar-body">
                          <div class="row g-2">
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Boite Postale
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="boitePostale"
                                  v-model="boitePostale"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer votre adresse postale"
                                />
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
  <div class="form-group mb-15 mb-sm-20 mb-md-25">
    <label class="d-block text-black mb-10">
      Téléphone 1<span class="text-danger">*</span>
    </label>
    <input
      v-model="telephone"
      type="text"
      class="form-control shadow-none fs-md-15 text-black"
      placeholder="Entrer le téléphone"
      maxlength="10"
      @input="telephone = '01' + telephone.slice(2)"
    />
  </div>
</div>
<div class="col-md-4 mb-3">
  <div class="form-group mb-15 mb-sm-20 mb-md-25">
    <label class="d-block text-black mb-10">
      Téléphone 2
    </label>
    <input
      v-model="telephone2"
      type="text"
      class="form-control shadow-none fs-md-15 text-black"
      placeholder="Entrer le téléphone"
      maxlength="10"
      @input="telephone2 = '01' + telephone2.slice(2)"
    />
  </div>
</div>

                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Email <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="email"
                                  v-model="email"
                                  type="email"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer l'email"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Département <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="departement"
                                  v-model="departement"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="departementOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="field.value"
                                    v-bind="field"
                                    @change="departementChange($event)"
                                    placeholder="Sélectionner le departement"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Communes <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="commune"
                                  v-model="commune"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="communeOptions"
                                    @change="communeChange($event)"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedCommune"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord un département"
                                    placeholder="Sélectionner la commune"
                                  />
                                </Field>
                              </div>
                            
                            </div>
                            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Arrondissement
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="arrondissement"
                                  v-model="arrondissement"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="arrondissementOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedArrondissement"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord une commune"
                                    @change="arrondissementChange($event)"
                                    placeholder="Sélectionner l' arrondissement"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Quartier <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="quartier"
                                  v-model="quartier"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="quartierOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedQuartier"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord un arrondissement"
                                    placeholder="Sélectionner le quartier"
                                  />
                                </Field>
                              </div>
                            </div>
                          </div>
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
                        </div>
                      </div>
                      <div
                        v-if="currentStep === 3"
                        class="tab-pane fade show active"
                        id="info-conjoint"
                        role="tabpanel"
                        aria-labelledby="info-conjoint-tab"
                      >
                        <div v-if="showSpouseFields">
                          <div class="sidebar-body">
                            <div class="row g-2">
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Nom du Conjoint<span class="text-danger"
                                      >*</span
                                    >
                                  </label>
                                  <Field
                                    name="nomCon"
                                    v-model="nomCon"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le nom du conjoint "
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Prénom du Conjoint<span class="text-danger"
                                      >*</span
                                    >
                                  </label>
                                  <Field
                                    name="prenomCon"
                                    v-model="prenomCon"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le prenom du conjoint "
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Date de Naissance du conjoint
                                  </label>
                                  <Field
                                    name="dateNaissanceCon"
                                    v-model="dateNaissanceCon"
                                    type="date"
                                    :max="maxDate"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer la date de naissance du conjoint "
                                  />
                                </div>
                              </div>
                              <!-- <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nationalité du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="nationaliteCon" v-model="nationaliteCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la nationalité du conjoint " />
                                        </div>
                                      </div>-->
<div class="col-md-6">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Nationalité du Conjoint
                                    <span class="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="nationaliteCon"
                                    v-model="nationaliteCon"
                                    v-slot="{ field }"
                                  >
                                    <Multiselect
                                      :options="countries"
                                      :searchable="true"
                                      track-by="value"
                                      label="label"
                                      v-model="field.value"
                                      v-bind="field"
                                      placeholder="Sélectionner le pays de résidence"
                                    />
                                  </Field>

                                  </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Téléphone du Conjoint<span
                                      class="text-danger"
                                      >*</span
                                    >
                                  </label>
                                  <Field
                                    name="teleph                              oneCon"
                                    v-model="telephoneCon"
                                    type="string"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le téléphone du conjoint "
                                      maxlength="10"
                                    @input="telephoneCon = '01' + telephoneCon.slice(2)"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Passport du Conjoint<span
                                      class="text-danger"
                                      ></span
                                    >
                                  </label>
                                  <Field
                                    name="passportCon"
                                    v-model="numPassportCon"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le numéro du conjoint "
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Religion Du Conjoint<span
                                      class="text-danger"
                                      ></span
                                    >
                                  </label>
                                  <Field
                                    name="religionCon"
                                    v-model="religionCon"
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
                                      placeholder="Sélectionner la religion du conjoint"
                                      label="label"
                                      track-by="label"
                                    />
                                  </Field>
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Ethnie Du Conjoint<span class="text-danger"
                                      ></span
                                    >
                                  </label>
                                  <Field
                                    name="ethnieCon"
                                    v-model="ethnieCon"
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
                                      placeholder="Sélectionner l'ethnie du conjoint"
                                      label="label"
                                      track-by="label"
                                    />
                                  </Field>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 mb-md-25">
                          <div
                            class="tab-pane fade show active p-10"
                            id="home-tab-pane"
                            role="tabpanel"
                            tabindex="0"
                          >
                            <div class="row">
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Nombre d'enfants<span class="text-danger"
                                      >*</span
                                    >
                                  </label>
                                  <Field
                                    name="nombreEnfant"
                                    v-model="nombreEnfant"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le nombre d'enfants"
                                  />
                                </div>
                              </div>
                              <div class="border border-primary mb-10">
                                <div
                                  class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                  style="background-color: #0a59a4"
                                >
                                  <div class="col-md-7">
                                    <h3 class="fs-4 text-white">Enfants</h3>
                                  </div>
                                  <div class="col-md-5">
                                    <div class="d-flex float-end">
                                      <!--  <button
                                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                                    type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                                                    @click="addRowEnfant()">
                                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                                    Ajouter un enfant
                                                  </button>-->
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
                                    <div class="col-md-3">
                                      <label
                                        class="d-block text-black fw-semibold"
                                      >
                                        Nom
                                        <span class="text-danger">*</span>
                                      </label>
                                    </div>
                                    <div class="col-md-3">
                                      <label
                                        class="d-block text-black fw-semibold"
                                      >
                                        Prénom
                                        <span class="text-danger">*</span>
                                      </label>
                                    </div>
                                    <div class="col-md-3">
                                      <label
                                        class="d-block text-black fw-semibold mb-10"
                                      >
                                        Date Naissance<span class="text-danger"
                                          >*</span
                                        >
                                      </label>
                                    </div>
                                    <div class="col-md-3">
                                      <label
                                        class="d-block text-black fw-semibold mb-10"
                                      >
                                        Sexe <span class="text-danger">*</span>
                                      </label>
                                    </div>
                                    <div class="col-md-2">
                                      <!--  <label class="d-block text-black fw-semibold mb-10">
                                                    Actions <span class="text-danger">*</span>
                                                  </label>-->
                                    </div>
                                  </div>
                                  <hr class="mt-0" />
                                  <div
                                    class="row"
                                    v-for="(enfant, index) in enfants"
                                    :key="index"
                                  >
                                    <div class="col-md-3 mb-2">
                                      <div class="form-group">
                                        <input
                                          v-model="enfant.nom"
                                          type="text"
                                          class="form-control shadow-none fs-md-15 text-black"
                                          placeholder="Saisir le nom"
                                        />
                                        <div
                                          class="invalid-feedback"
                                          v-if="valideteRowEnfant(enfant.nom)"
                                        >
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-3 mb-2">
                                      <div class="form-group">
                                        <input
                                          v-model="enfant.prenom"
                                          type="text"
                                          class="form-control shadow-none fs-md-15 text-black"
                                          placeholder="saisir le prénom"
                                        />
                                        <div
                                          class="invalid-feedback"
                                          v-if="
                                            valideteRowEnfant(enfant.prenom)
                                          "
                                        >
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-3 mb-2">
                                      <div class="form-group">
                                        <input
                                          v-model="enfant.dateNaissance"
                                          type="date"
                                          :max="maxDate1"
                                          class="form-control shadow-none fs-md-15 text-black"
                                          placeholder=""
                                        />
                                      </div>
                                      <div
                                        class="invalid-feedback"
                                        v-if="
                                          valideteRowEnfant(
                                            enfant.dateNaissance
                                          )
                                        "
                                      >
                                      </div>
                                    </div>
                                    <div class="col-md-3 mb-2">
                                      <div class="form-group">
                                        <Multiselect
                                          :searchable="true"
                                          :options="['Masculin', 'Féminin']"
                                          v-model="enfant.sexe"
                                          placeholder="Sélectionner le sexe"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-2 mb-2">
                                      <!--   <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                                    @click="removeRowEnfant(index)">
                                                   <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                                    </button>-->
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="currentStep === 4"
                        class="tab-pane fade show active"
                        id="info-sante-personnel"
                        role="tabpanel"
                        aria-labelledby="info-sante-personnel-tab"
                      >
                        <div class="sidebar-body">
                          <div class="row g-2">
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Taille<span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="taille en (cm)"
                                  type="number"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  v-model="taille"
                                  placeholder="Taille(cm) "
                                />
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Poids<span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="poids en (cm)"
                                  type="number"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  v-model="poids"
                                  placeholder="Poids(kg) "
                                />
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Groupe Sanguin
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="groupeSanguin"
                                  v-model="groupeSanguin"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'A+',
                                      'B+',
                                      'AB+',
                                      'O+',
                                      'A-',
                                      'B-',
                                      'AB-',
                                      'O-',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner le Groupe Sanguin"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Vision Gauche
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="visionGauche"
                                  type="text"
                                  v-model="visionGauche"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'à vue réduite',
                                      'Visé de loin',
                                      'Astigmatique',
                                      'à vue réduite & astigmatique',
                                      'Visé de loin & astigmatique',
                                      'partiellement handicapé',
                                      'Aveugle',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la vision Gauche"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Vision Droite
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="visionDroite"
                                  type="text"
                                  v-model="visionDroite"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'à vue réduite',
                                      'Visé de loin',
                                      'Astigmatique',
                                      'à vue réduite & astigmatique',
                                      'Visé de loin & astigmatique',
                                      'partiellement handicapé',
                                      'Aveugle',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la vision Droite"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Audience Gauche
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="audienceGauche"
                                  type="text"
                                  v-model="audienceGauche"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'partiellement handicapé',
                                      'Sourd',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner l'audience Gauche"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Audience Droite
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="audienceDroite"
                                  v-model="audienceDroite"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'partiellement handicapé',
                                      'Sourd',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner l'audience Droite"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Main Gauche <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="mainGauche"
                                  v-model="mainGauche"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'partiellement handicapé',
                                      'handicapé',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la main Gauche"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Main Droite <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="mainDroite"
                                  v-model="mainDroite"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'partiellement handicapé',
                                      'handicapé',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la main Droite"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Jambe Gauche
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="jambeGauche"
                                  v-model="jambeGauche"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'partiellement handicapé',
                                      'handicapé',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la jambe Droite"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Jambe Droite
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="jambeDroite"
                                  v-model="jambeDroite"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Normal',
                                      'partiellement handicapé',
                                      'handicapé',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la jambe Droite"
                                  />
                                </Field>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="currentStep === 5"
                        class="tab-pane fade show active"
                        id="info-bancaire"
                        role="tabpanel"
                        aria-labelledby="info-bancaire-tab"
                      >
                        <div class="sidebar-body">
                          <div class="row g-2">
                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Banque
                                </label>
                                <Field name="banque">
                                  <Multiselect
                                    v-model="banque"
                                    :options="banqueOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    placeholder="Sélectionner la banque"
                                  />
                                </Field>
                              </div>
                            </div>

                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Numéro de compte bancaire
                                </label>
                                <Field
                                  name="numeroCompte"
                                  v-model="numeroCompte"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer le numéro de compte"
                                />
                              </div>
                            </div>

                            <div class="col-md-4 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Code Iban
                                </label>
                                <Field
                                  name="codeIban"
                                  v-model="codeIban"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer le code"
                                />
                              </div>
                            </div>
                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Code Swift
                                </label>
                                <Field
                                  name="codeSwift"
                                  v-model="swift"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Entrer le code"
                                />
                              </div>
                            </div>
                           <!-- <div class="col-md-6 mb-3">
                              <label
                                for="releveIdentiteBancaire"
                                class="form-label"
                                >Relevé d'identité bancaire<span
                                  class="text-danger"
                                  >*</span
                                ></label
                              >
                              <Field
                                name="releveIdentiteBancaire"
                                v-model="releveIdentiteBancaire"
                                @change="onribChange"
                                class="form-control"
                                type="file"
                                placeholder="Joindre le RIB"
                              />
                            </div>-->

                            <h1>Informations sur la personne à contacter</h1>
                            <div class="row g-2">
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Nom de la personne à contacter
                                  </label>
                                  <Field
                                    name="nomPersonneAContacter"
                                    v-model="nomPersonneAContacter"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le nom"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Prénom personne à contacter
                                  </label>
                                  <Field
                                    name="prenomPersonneAContacter"
                                    v-model="prenomPersonneAContacter"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le prenom"
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Téléphone personne à contacter
                                  </label>
                                  <Field
                                    name="telephonePersonneAContacter"
                                    type="text"
                                    v-model="telephonePersonneAContacter"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le téléphone"
                                    maxlength="10"
                                    @input="telephonePersonneAContacter = '01' + telephonePersonneAContacter.slice(2)"
                                 
                                  />
                                </div>
                              </div>
                              <div class="col-md-6 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                  <label class="d-block text-black mb-10">
                                    Relation
                                  </label>
                                  <Field
                                    name="relation"
                                    v-model="relation"
                                    type="text"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Indiquer la relation"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="buttons mt-3">
                        <a
                          type="button"
                          class="btn btn-secondary me-3"
                          @click="previousStep"
                          :disabled="currentStep === 1"
                        >
                          Précédent
                        </a>
                        <a
                          v-if="currentStep < tabs.length"
                          type="button"
                          class="btn btn-primary"
                          @click="nextStep"
                        >
                          Suivant
                        </a>
                        <button
                          v-if="currentStep === tabs.length"
                          type="submit"
                          class="btn btn-success"
                        >
                          Modifier
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
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import {
  Form,
  Field,
  ErrorMessage,
  useFieldArray,
  useForm,
} from "vee-validate";
import { error, success, format_date } from "@/utils/utils";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { Personnel } from "@/models/Personnel";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import { Tab } from "bootstrap";
import { countries } from "./countries";

export default defineComponent({
  name: "AddPersonnelContent",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const personnelInfoSchema = Yup.object().shape({
      nom: Yup.string().required("Le nom du personnel est obligatoire"),
      prenom: Yup.string().required("Le prénom du personnel est obligatoire"),
      numeroCompte: Yup.string().notRequired(),
      birthdate: Yup.date().notRequired(),
      religion: Yup.string().required("Religion est obligatoire"),
      ethnie: Yup.string().required("Ethnie est obligatoire"),
      nationalite: Yup.string().required("La nationalité est obligatoire"),
      situationMatrimoniale: Yup.string().required(
        "la situation matrimoniale est obligatoire"
      ),
      sexe: Yup.string().required("Le sexe est obligatoire"),
      civilite: Yup.string().required("La civilité est obligatoire"),
      numeroSecuriteSociale: Yup.date().notRequired(),
      dateEmbauche: Yup.date().notRequired(),
      photo: Yup.mixed().notRequired(),
    });

    const personnelContSchema = Yup.object().shape({
      adresse: Yup.string().required("L' adresse du personnel est obligatoire"),
      email: Yup.string()
        .email("Le format de l'email est invalide")
        .required("L'email est obligatoire"),
      telephone: Yup.number()
        .typeError("Veuillez entrer des chiffres")
        .required("Le telephone est obligatoire"),
      telephone2: Yup.number().notRequired(),
      boitePostale: Yup.string().notRequired(),
    });

    const personnelConSchema = Yup.object().shape({
      nomCon: Yup.string().required("Le nom du conjoint est obligatoire"),
      prenomCon: Yup.string().required("Le prenom du conjoint est obligatoire"),
      dateNaissanceCon: Yup.string().notRequired(),
      nationaliteCon: Yup.string().required(
        "La nationalité du conjoint est obligatoire"
      ),
      passportCon: Yup.string().notRequired(),
      religionCon: Yup.string().notRequired(),
      ethnieCon: Yup.string().notRequired(),
    });

    const personnelSanteSchema = Yup.object().shape({
      taille: Yup.string().required("La taille  est obligatoire"),
      poids: Yup.string().required("Le poids est obligatoire"),
      groupeSanguin: Yup.string().required("Le groupe sanguin est obligatoire"),
      visionGauche: Yup.string().required("La vision gauche est obligatoire"),
      visionDroite: Yup.string().required("La vision droite est obligatoire"),
      audienceGauche: Yup.string().required("Audience Gauche est obligatoire"),
      audienceDroite: Yup.string().required("Audience Droite obligatoire"),
      mainGauche: Yup.string().required("La main gauche est obligatoire"),
      mainDroite: Yup.string().required("La main Droite est obligatoire"),
      jambeGauche: Yup.string().required("La jambe gauche est obligatoire"),
      jambeDroite: Yup.string().required("La jambe droite est obligatoire"),
    });

    const personnelPersonneConSchema = Yup.object().shape({
      nomPersonneAContacter: Yup.string().notRequired(),
      prenomPersonneAContacter: Yup.string().notRequired(),
      telephonePersonneAContacter: Yup.number().notRequired(),
      relation: Yup.string().notRequired(),

      quartier: Yup.string().required("Le quartier est obligatoire"),
      arrondissement: Yup.string().required(
        "L'arrondissement  est obligatoire"
      ),
      commune: Yup.string().required("La commune est obligatoire"),
      departement: Yup.string().required("Le département  est obligatoire"),
    });

    const personnelForm = ref<Personnel | null>(null);
    const router = useRouter();
    const religion = ref();
    const ethnie = ref();
    const service = ref();
    const nom = ref();
    const prenom = ref();
    const adresse = ref();
    const email = ref();
    const telephone = ref();
    const telephone2 = ref();
    const nomCon = ref();
    const birthdate = ref();
    const dateEmbauche = ref();
    const prenomCon = ref();
    const dateNaissanceCon = ref();
    const nationaliteCon = ref();
    const numPassportCon = ref();
    const telephoneCon = ref();
    const taille = ref();
    const poids = ref();
    const sexe = ref();
    const civilite = ref();
    const groupeSanguin = ref();
    const visionGauche = ref();
    const visionDroite = ref();
    const audienceGauche = ref();
    const audienceDroite = ref();
    const mainGauche = ref();
    const numeroCompte = ref();
    const mainDroite = ref();
    const jambeGauche = ref();
    const jambeDroite = ref();
    const boitePostale = ref();
    const nomPersonneAContacter = ref();
    const prenomPersonneAContacter = ref();
    const telephonePersonneAContacter = ref();
    const relation = ref();
    const personnels = ref<Personnel[]>([]);
    const numeroSecuriteSociale = ref("");
    const banque = ref();
    const arrondissement = ref();
    const quartier = ref();
    const commune = ref();
    const departement = ref();
    const releveIdentiteBancaire = ref();
    const codeIban = ref();
    const swift = ref();
    const religionCon = ref();
    const ethnieCon = ref();
    const nombreEnfant = ref();
    const situation = ref();
    const photo = ref<File>(null);
    const departementOptions = ref([]);
    const communeOptions = ref([]);
    const arrondissementOptions = ref([]);
    const quartierOptions = ref([]);
    const ageError = ref(false);
    const today = new Date();
    const isDisable = ref(true);
    const enfants = reactive([
      {
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: "",
      },
    ]);

    const onFileChange = (e) => {
      const file = e.target.files[0];
      console.log("Le fichier ===> ", file);
      photo.value = file;
    };

    const onribChange = (e) => {
      const file = e.target.files[0];
      console.log("Le fichier2 ===> ", file);
      releveIdentiteBancaire.value = file;
    };

    const addRowEnfant = () => {
      enfants.push({
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: "",
      });
    };

    const removeRowEnfant = (index) => {
      if (enfants.length > 1) enfants.splice(index, 1);
      //totals();
    };

    watch(
      enfants,
      (newValue) => {
        isDisable.value = newValue.some(
          (enfant) =>
            valideteRowEnfant(enfant.nom) ||
            valideteRowEnfant(enfant.prenom) ||
            valideteRowEnfant(enfant.sexe) ||
            valideteRowEnfant(enfant.dateNaissance)
        );
      },
      { deep: true }
    );

    watch(nombreEnfant, (newVal) => {
      const count = parseInt(newVal) || 0;

      enfants.length = count;
      for (let i = 0; i < count; i++) {
        if (!enfants[i]) {
          enfants[i] = { nom: "", prenom: "", dateNaissance: "", sexe: "" };
        }
      }
    });

    const valideteRowEnfant = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log("erg");
        return true;
      } else {
        return false;
      }
    };

    const { remove, push, fields, update } = useFieldArray("enfants");

    const enfantOptions = ref([]);
    const valuess = ref();
    const religionOptions = ref([]);
    const ethnieOptions = ref([]);
    const serviceOptions = ref([]);
    const banqueOptions = ref([]);

  

    const addPersonnel = async ( values) => {
      const id = router.currentRoute.value.params.id; 
  if (!id) {
    console.error("ID manquant dans l'URL");
    return;
  }
  
  values.id = id;
      const elemt = {
        nom: nom.value,
        urlImage: photo.value,
        prenom: prenom.value,
        sexe: sexe.value,
        situation: situation.value,
        civilite: civilite.value,
        birthdate: birthdate.value,
        numeroSecuriteSociale: numeroSecuriteSociale.value,
        religion: religion.value,
        ethnie: ethnie.value,
        service: service.value,
        boitePostale: boitePostale.value,
        telephone: telephone.value,
        telephone2: telephone2.value,
        email: email.value,
        selectedCommune: selectedCommune.value,
        selectedArrondissement: selectedArrondissement.value,
        selectedQuartier: selectedQuartier.value,
        adresse: adresse.value,
        nomCon: nomCon.value,
        prenomCon: prenomCon.value,
        dateNaissanceCon: dateNaissanceCon.value,
        nationaliteCon: nationaliteCon.value,
        telephoneCon: telephoneCon.value,
        numPassportCon: numPassportCon.value,
        religionCon: religion.value,
        ethnieCon: ethnieCon.value,
        nombreEnfant: nombreEnfant.value,
        taille: taille.value,
        poids: poids.value,
        groupeSanguin: groupeSanguin.value,
        visionGauche: visionGauche.value,
        visionDroite: visionDroite.value,
        audienceGauche: audienceGauche.value,
        audienceDroite: audienceDroite.value,
        mainGauche: mainGauche.value,
        mainDroite: mainDroite.value,
        jambeGauche: jambeGauche.value,
        jambeDroite: jambeDroite.value,
        banque: banque.value,
        departement: departement.value,
        commune: commune.value,
        quartier: quartier.value,
        arrondissement: arrondissement.value,
        dateEmbauche: dateEmbauche.value,
        nationalite: nationalite.value,
        releveIdentiteBancaire: releveIdentiteBancaire.value,
        codeIban: codeIban.value,
        swift: swift.value,
        nomPersonneAContacter: nomPersonneAContacter.value,
        prenomPersonneAContacter: prenomPersonneAContacter.value,
        telephonePersonneAContacter: telephonePersonneAContacter.value,
        relation: relation.value,
        personnels: personnels.value,
      };
      console.log("Données élément:", elemt);

      values.enfants = enfants.map((enfant) => {
        console.log("Enfant récupéré :", enfant);
        return {
          nom: enfant.nom,
          sexe: enfant.sexe,
          prenom: enfant.prenom,
          dateNaissance: enfant.dateNaissance,
        };
      });
      console.log("Enfants traités :", values.enfants);

      console.log("requête:", values);
      for (const key in elemt) {
        values[key] = elemt[key];
      }

      axios.put(`/personnels/${values.id}`, values, {
          headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
        })
        .then(({ data }) => {
          console.log("Réponse de la requête :", data);
          if (data.code == 200) {
            success(data.message);
           // resetForm();
            router.push("/personnelles/liste-personnel");
          }
        })
        .catch(({ response }) => {
          console.log("Erreur lors de l'envoi des données :", response);
          error(response);
        });
    };

    const checkAge = () => {
      if (!birthdate.value) return;

      const birthDate = new Date(birthdate.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();

      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
      }

      ageError.value = age < 18;
    };

    const getAllReligions = async () => {
      try {
        const response = await ApiService.get("/all/religions");
        const religionsData = response.data.data.data;

        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    const getAllEthnies = async () => {
      try {
        const response = await ApiService.get("/all/ethnies");
        const ethniesData = response.data.data.data;

        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    const activateTab = async (tabEl: HTMLElement | null) => {
      if (!tabEl) {
        return;
      }
      const tabInstance = Tab.getInstance(tabEl);
      const tabTrigger = document.getElementById(tabInstance);
      tabInstance.show();
    };

    const getAllServices = async () => {
      try {
        const response = await ApiService.get(
          "/all/recupererToutesOrganisationSansFilsAvecParent"
        );

        console.log("rfrrf ===> ", response);
        const servicesData = response.data.data;
        console.log("465484635418416541 ===> ", servicesData);

        serviceOptions.value = servicesData.map((service) => ({
          value: service.id,
          label: service.nom,
        }));

        console.log("RYYYYY ==> ", serviceOptions);
      } catch (error) {
        console.log("RYYYYY5252 ==> ", error);
        //error(response.data.message)
      }
    };

    const fetchBanque = async () => {
      ApiService.get("all/banques")
        .then(({ data }) => {
          const banqueData = data.data.data;
          banqueOptions.value = banqueData.map((banque) => {
            return {
              value: banque.id,
              label: `${banque.denominationBanque}`,
            };
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    // const fetchBanque = async () => {
    //   try {
    //     const response = await ApiService.get("/all/banques");
    //     const banqueData = response.data.data.data;
    //     banqueOptions.value = banqueData.map((banque) => ({
    //       value: banque.id,
    //       label: `${banque.denominationBanque}`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };
   
    const countriesRef = ref(countries);
    const nationalite = ref('Bénin'); 
    const selectedCommune = ref([]);
    const selectedArrondissement = ref([]);
    const selectedQuartier = ref([]);

   
    function departementChange(value) {
      console.log("g,rl;m", value);
      if (value) {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get("/departements/communes/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            console.log("donnee", donnee);
            if (donnee.length > 0) {
              communeOptions.value = donnee.map((commune: any) => {
                return {
                  label: commune.libelle,
                  value: commune.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function communeChange(value) {
      if (value) {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get("/communes/arrondissements/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              arrondissementOptions.value = donnee.map(
                (arrondissement: any) => {
                  return {
                    label: arrondissement.libelle,
                    value: arrondissement.id,
                  };
                }
              );
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function arrondissementChange(value) {
      if (value) {
        quartierOptions.value = [];
        selectedQuartier.value = [];
        ApiService.get("/arrondissements/quartiers/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              quartierOptions.value = donnee.map((quartier: any) => {
                return {
                  label: quartier.libelle,
                  value: quartier.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        quartierOptions.value = [];
        selectedQuartier.value = [];
      }
    }

    const fetchDepartements = async () => {
      ApiService.get("/all/departements")
        .then(({ data }) => {
          const donnees = data.data.data;
          departementOptions.value = donnees.map((departement) => {
            return {
              value: departement.id,
              label: `${departement.libelle}`,
            };
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };
    function getPersonnel(id: number) {
  console.log(`Requête pour récupérer les données du personnel avec ID: ${id}`);
  ApiService.get(`/personnels/${id.toString()}`)
    .then(({ data }) => {
      console.log("Données reçues depuis l'API:", data);
      if (!data) {
        console.error("Erreur : Données manquantes ou structure inattendue dans la réponse.");
        return;
      }
      const personnelData = data;

      const formatDate = (date: string | null | undefined) => {
        return date ? new Date(date).toISOString().split("T")[0] : "";
      };

      nom.value = personnelData.nom || "";
      prenom.value = personnelData.prenom || "";
      sexe.value = personnelData.sexe || "";
      situation.value = personnelData.situationMatrimoniale || "";
      photo.value = personnelData.photoEmploye || "";
      civilite.value = personnelData.civilite || "";
      birthdate.value = formatDate(personnelData.birthdate); 
      dateEmbauche.value = formatDate(personnelData.dateEmbauche); 
      numeroSecuriteSociale.value = personnelData.numeroSecuriteSociale || "";
      nationalite.value = personnelData.nationalite || "";
      adresse.value = personnelData.adresse || "";

      service.value = personnelData.service?.id || ""; 
      console.log('service', service.value);
      religion.value = personnelData.religion?.id || ""; 
      ethnie.value = personnelData.ethnie?.id || ""; //
      console.log("ethnie",ethnie.value);
      departement.value = personnelData.departement?.id || "";
      commune.value = personnelData.commune?.id || ""; // 
      console.log('commune',commune.value);
      arrondissement.value = personnelData.arrondissement?.id || ""; 
      quartier.value = personnelData.quartier?.id || ""; 

      boitePostale.value = personnelData.boitePostale || "";
      telephone.value = personnelData.telephone || "";
      telephone2.value = personnelData.telephone2 || "";
      email.value = personnelData.email || "";

      nomCon.value = personnelData.conjoints?.nomCon || "";
      prenomCon.value = personnelData.conjoints?.prenomCon || "";
      dateNaissanceCon.value = formatDate(personnelData.conjoints?.dateNaissanceCon);
      nationaliteCon.value = personnelData.conjoints?.nationaliteCon || "";
      console.log('nationalité conjoint', nationaliteCon);
      telephoneCon.value = personnelData.conjoints?.telephoneCon || "";
      numPassportCon.value = personnelData.conjoints?.numPassportCon || "";
      religionCon.value = personnelData.conjoints?.religion?.id || "";
      ethnieCon.value = personnelData.conjoints?.ethnie?.id || "";
      console.log('ethnie',ethnieCon.value);

      nombreEnfant.value = personnelData.nombreEnfant || 0;
      taille.value = personnelData.santeemploye?.taille || "";
      poids.value = personnelData.santeemploye?.poids || "";
      groupeSanguin.value = personnelData.santeemploye?.groupeSanguin || "";
      visionGauche.value = personnelData.santeemploye?.visionGauche || "";
      visionDroite.value = personnelData.santeemploye?.visionDroite || "";
      audienceGauche.value = personnelData.santeemploye?.audienceGauche || "";
      audienceDroite.value = personnelData.santeemploye?.audienceDroite || "";
      mainDroite.value = personnelData.santeemploye?.mainDroite || "";
      mainGauche.value = personnelData.santeemploye?.mainGauche || "";
      jambeGauche.value = personnelData.santeemploye?.jambeGauche || "";
      jambeDroite.value = personnelData.santeemploye?.jambeDroite || "";


      banque.value = personnelData.banque?.denominationBanque || ""; 
      numeroCompte.value = personnelData.numeroCompte || "";
      codeIban.value = personnelData.codeIban || "";
      swift.value = personnelData.codeSwift || "";

      nomPersonneAContacter.value = personnelData.nomPersonneAContacter || "";
      prenomPersonneAContacter.value = personnelData.prenomPersonneAContacter || "";
      telephonePersonneAContacter.value = personnelData.telephonePersonneAContacter || "";
      relation.value = personnelData.relation || "";

      console.log("Tous les champs ont été remplis.");
    })
    .catch(({ response }) => {
      const errorMessage = response?.data?.message || "Une erreur est survenue lors de la récupération des données.";
      console.error("Erreur lors de la requête API:", errorMessage);
      error(errorMessage);
    });
}



   /* const fetchCommunes = async () => {
      ApiService.get("/communes")
        .then(({ data }) => {
          const donnees = data.data.data;
          communeOptions.value = donnees.map((commune) => {
            return {
              value: commune.id,
              label: `${commune.libelle}`,
            };
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };*/

    /*const fetchQuartiers = async () => {
      ApiService.get("/quartiers")
        .then(({ data }) => {
          const donnees = data.data.data;
          quartierOptions.value = donnees.map((quartier) => {
            return {
              value: quartier.id,
              label: `${quartier.libelle}`,
            };
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };*/

    /*const fetchArrondissement = async () => {
      ApiService.get("/arrondissements")
        .then(({ data }) => {
          const donnees = data.data.data;
          arrondissementOptions.value = donnees.map((arrondissement) => {
            return {
              value: arrondissement.id,
              label: `${arrondissement.libelle}`,
            };
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };*/


    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];

    const maxDate1 = today.toISOString().split("T")[0];

    const tabContainer = ref(null);
    const tabs = [
      {
        id: "#info-personnel",
        icon: "product-detail",
        title: "Informations générales du personnel",
        desc: "Ajouter les informations du personnel",
      },
      {
        id: "#adresse-contact",
        icon: "product-gallery",
        title: "Adresse et contacts du personnel",
        desc: "Complèter les adresses et les contacts du personnel",
      },
      {
        id: "#info-conjoint",
        icon: "product-category",
        title: "Conjoint et enfants",
        desc: "Complèter les informations du conjoints et des enfants",
      },
      {
        id: "#info-sante-personnel",
        icon: "advance",
        title: "Santé et physique",
        desc: "Complèter les informations sur la santé du personnel",
      },
      {
        id: "#info-bancaire",
        icon: "pricing",
        title: "Informations bancaires",
        desc: "Ajouter les informations bancaires",
      },
      /*{
            id: "#personne-acontacter",
            icon: "advance",
            title: "Personne à contacter",
            desc: "Ajouter la personne à contacter"
        }*/
    ];
    onMounted(() => {
  const id = router.currentRoute.value.params.id; 
  if (id) {
    getPersonnel(Number(id)); 
  }
});

    onMounted(async () => {
    
      tabs.forEach((tab, index) => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
      li.innerHTML = `
<button 
    class="nav-link ${currentStep.value === index + 1 ? "active" : ""}" 
    id="${tab.id}" 
    role="tab" 
    aria-controls="detail-product" 
    aria-selected="${currentStep.value === index + 1}"
    disabled
>
    <div class="nav-rounded">
        <div class="product-icons">
            <svg class="stroke-icon">
                <use href="${
                    require("@/assets/svg/icon-sprite.svg") + "#" + tab.icon
                }"></use>
            </svg>
        </div>
    </div>
    <div class="product-tab-content">
        <h5>${tab.title}</h5>
        <p>${tab.desc}</p>
    </div>
</button>
`;

        tabContainer.value.appendChild(li);
        const tabElements = tabContainer.value.querySelectorAll(".nav-link");
       tabElements.forEach((tab, index) => {
    const bsTab = new Tab(tab);

    tab.addEventListener("click", (event) => {
        if (index + 1 > currentStep.value) {
            event.preventDefault();
            return;
        }
        currentStep.value = index + 1;
        bsTab.show();
    });
});
        tabElements.forEach((tab, index) => {
          const bsTab = new Tab(tab);
          tab.addEventListener("click", () => {
            currentStep.value = index + 1;
            bsTab.show();
          });
        });
      });

      showTab(currentStep.value);
      await getAllReligions();
      await getAllEthnies();
      await getAllServices();
      await fetchBanque();
    await fetchDepartements();
    //  await fetchCommunes();
    //  await fetchQuartiers();
     // await fetchArrondissement();
    });

    const { handleSubmit, validate } = useForm({
      validationSchema: personnelConSchema,
      initialValues: {
        name: "",
        email: "",
        street: "",
        city: "",
      },
    });
    const currentStep = ref(1);

    let activeclass = ref<string>("Informations générales du personnel");

    const nextStep = async () => {
      const isValid = await validate();
      if (!isValid) return; 

      if (currentStep.value === 1) {
        checkAge();
        if (ageError.value) return;
        let element1 = {
          nom: nom.value,
          prenom: prenom.value,
          sexe: sexe.value,
          situation: situation.value,
          photo: photo.value,
          civilite: civilite.value,
        // birthdate: birthdate.value,
          dateEmbauche: dateEmbauche.value,
       //   numeroSecuriteSociale: numeroSecuriteSociale.value,
          religion: religion.value,
          ethnie: ethnie.value,
          service: service.value,
        };
        for (const key in element1) {
          if (!element1[key]) {
            error(`Saisir l'élément suivant ${key}`);
            return false;
          }
        }
      }
      if (currentStep.value === 2) {
        let element2 = {
          boitePostale: boitePostale.value,
          telephone: telephone.value,
          email: email.value,
          departement: departement.value,
          commune: commune.value,
          arrondissement: arrondissement.value,
          quartier: quartier.value,
          adresse: adresse.value,
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        for (const key in element2) {
          if (!element2[key]) {
            error(`Saisir l'élément suivant ${key}`);
            return false;
          }
          if (key === "email" && !emailRegex.test(element2[key])) {
            error("Veuillez entrer une adresse email valide");
            return false;
          }
        }
      }

      if (currentStep.value === 3) {
        let element3 = {
          nomCon: nomCon.value,
          prenomCon: prenomCon.value,
          dateNaissanceCon: dateNaissanceCon.value,
          nationaliteCon: nationaliteCon.value,
          telephoneCon: telephoneCon.value,
        //  religionCon: religionCon.value,
          //ethnieCon: ethnieCon.value,
        };
        if (
          situation.value == "Marié(e)" ||
          situation.value == "Concubinage" ||
          situation.value == "Union libre" ||
          situation.value == "Veuve"
        ) {
          for (const key in element3) {
            if (!element3[key]) {
              error(`Saisir l'élément suivant ${key}`);
              return false;
            }
          }
        }
        if (nombreEnfant.value === null || nombreEnfant.value === undefined) {
          error("Saisir le nombre d'enfants");
          return false;
        } else if (nombreEnfant.value > 0) {
          for (let i = 0; i < nombreEnfant.value; i++) {
            const enfant = {
              nom: enfants[i]?.nom,
              prenom: enfants[i]?.prenom,
              dateNaissance: enfants[i]?.dateNaissance,
            };

            for (const key in enfant) {
              if (!enfant[key]) {
                error(`Saisir l'élément suivant ${key} pour l'enfant ${i + 1}`);
                return false;
              }
            }
          }
        }
      }
      if (currentStep.value === 4) {
        //useForm({ validationSchema: personnelPersonneConSchema });
        let element4 = {
          taille: taille.value,
          poids: poids.value,
          groupeSanguin: groupeSanguin.value,
          visionGauche: visionGauche.value,
          visionDroite: visionDroite.value,
          audienceGauche: audienceGauche.value,
          audienceDroite: audienceDroite.value,
          mainGauche: mainGauche.value,
          mainDroite: mainDroite.value,
          jambeGauche: jambeGauche.value,
          jambeDroite: jambeDroite.value,
        };
        for (const key in element4) {
          if (!element4[key]) {
            error(`Saisir l'élément suivant ${key}`);
            return false;
          }
        }
      }

      if (currentStep.value === 5) {
  // Vérifiez si une banque est sélectionnée
  if (banque.value) {
    let element5 = {
      numeroCompte: numeroCompte.value,
      codeIban: codeIban.value,
      swift: swift.value,
      releveIdentiteBancaire: releveIdentiteBancaire.value,
      nomPersonneAContacter: nomPersonneAContacter.value,
      prenomPersonneAContacter: prenomPersonneAContacter.value,
      telephonePersonneAContacter: telephonePersonneAContacter.value,
      relation: relation.value,
    };

    // Vérifiez que tous les champs sont remplis
    for (const key in element5) {
      if (!element5[key]) {
        error(`Saisir l'élément suivant ${key}`);
        return false;
      }
    }
  } else {
    // Si aucune banque n'est sélectionnée, seul le champ "banque" est obligatoire
    if (!banque.value) {
      error("Veuillez sélectionner une banque");
      return false;
    }
  }
}

      currentStep.value++;
      showTab(currentStep.value);
    };

    // Fonction pour afficher un onglet via Bootstrap Tab
    const showTab = (stepIndex) => {
      const tabElements = tabContainer.value.querySelectorAll(".nav-link");
      if (tabElements[stepIndex - 1]) {
        const tab = new Tab(tabElements[stepIndex - 1]);
        tab.show();
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        showTab(currentStep.value); // Afficher l'onglet correspondant à l'étape précédente
      }
    };

    // Soumettre le formulaire
    const handleSubmitForm = (values) => {
      if (currentStep.value === tabs.length) {
        alert("Formulaire soumis avec succès !");
        console.log(values); // Envoyer les données à une API si nécessaire
      }
    };

    const goToStep = (step) => {
      if (step <= currentStep.value) {
        currentStep.value = step;
      }
    };

    return {
      activateTab,
      handleSubmitForm,
      addPersonnel,
      personnelForm,
      removeRowEnfant,
      addRowEnfant,
      onFileChange,
      onribChange,
      valideteRowEnfant,
      valuess,
      enfantOptions,
      isDisable,
      enfants,
      previousStep,
      nextStep,
      goToStep,
      tabContainer,
      currentStep,
      tabs,
      activeclass,
      religionOptions,
      ethnieOptions,
      serviceOptions,
      banqueOptions,
      prenomCon,
      situation,
      photo,
      religion,
      ethnie,
      service,
      nom,
      prenom,
      adresse,
      email,
      telephone,
      telephone2,
      nomCon,
      nombreEnfant,
      ethnieCon,
      religionCon,
      swift,
      codeIban,
      releveIdentiteBancaire,
      banque,
      commune,
      quartier,
      departement,
      arrondissement,
      telephoneCon,
      numeroSecuriteSociale,
      personnels,
      relation,
      telephonePersonneAContacter,
      prenomPersonneAContacter,
      nomPersonneAContacter,
      boitePostale,
      jambeDroite,
      jambeGauche,
      mainDroite,
      mainGauche,
      audienceDroite,
      audienceGauche,
      visionGauche,
      visionDroite,
      birthdate,
      dateNaissanceCon,
      dateEmbauche,
      nationalite,
      nationaliteCon,
      numPassportCon,
      taille,
      poids,
      sexe,
      civilite,
      groupeSanguin,
      quartierOptions,
      communeOptions,
      numeroCompte,
      departementOptions,
      arrondissementOptions,
      departementChange,
      communeChange,
      arrondissementChange,
      selectedCommune,
      selectedArrondissement,
      selectedQuartier,
      countries: countriesRef,
      ageError,
      maxDate,
      maxDate1,
      getPersonnel,
      format_date,
    };
  },
  computed: {
    showSpouseFields() {
      return (
        this.situation?.toString() !== "Célibataire" &&
        this.situation !== "Divorcée"
      );
    },
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

.step-active {
  color: purple;
}
</style>
