<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="personnelForm" @submit="addPersonnel" :validation-schema="personnelSchema">
          <div class="row">
              <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Prénom <span class="text-danger">*</span>
                </label>
                <Field name="prenom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
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
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Situation matrimoniale <span class="text-danger">*</span>
                  </label>
                  <Field  name="situationMatrimoniale"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Célibataire', 'Mariée', 'Divorcée', 'Veuve','Concubinage','Union libre']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la situation"
                    />
                  </Field>
                  <ErrorMessage name="situationMatrimoniale" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Photo<span class="text-danger">*</span>
                </label>
                <Field name="urlImage" type="file" 
                      accept="image/jpeg, image/png application/pdf"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Choisissez une image"/>
                <ErrorMessage name="urlImage" class="text-danger"/>
              </div>
            </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Civilite <span class="text-danger">*</span>
                  </label>
                  <Field  name="civilite"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Mr', 'Mme']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la civilité"
                    />
                  </Field>
                  <ErrorMessage name="civilite" class="text-danger"/>
                </div>
              </div>
              
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresse" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresse" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Date de naissance 
                  </label>
                  <Field name="dateNais" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateNais" class="text-danger"/>
              </div>
              <div class="col-md-4 mt-3">
                    <label for="dateEmbauche" class="form-label"> Date d'embauche<span class="text-danger">*</span></label>
                    <Field name="dateEmbauche"  class="form-control" type="Date"/>
                    <ErrorMessage name="dateEmbauche" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Numéro de Sécurité Sociale
                </label>
                <Field name="numeroSecuriteSociale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le numéro"/>
                <ErrorMessage name="numeroSecuriteSociale" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Relevé d'identité bancaire 
                </label>
                <Field name="releveIdentiteBancaire" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le relevé"/>
                <ErrorMessage name="releveIdentiteBancaire" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Code Iban 
                </label>
                <Field name="codeIban" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="codeIban" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Code Swift 
                </label>
                <Field name="codeSwift" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="codeSwift" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nationalité<span class="text-danger">*</span>
                </label>
                <Field name="nationalite" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nationnalité "/>
                <ErrorMessage name="nationalite" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nombre d'enfants<span class="text-danger">*</span>
                </label>
                <Field name="nombreEnfant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nombre d'enfants"/>
                <ErrorMessage name="nombreEnfant" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Boite Postale <span class="text-danger">*</span>
                </label>
                <Field name="boitePostale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer votre adresse postale"/>
                <ErrorMessage name="codeIban" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Religion <span class="text-danger">*</span>
              </label>
              <Field name="religions" v-model="religions" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la religion"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La religion est obligatoire</span>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Ethnie <span class="text-danger">*</span>
              </label>
              <Field name="ethnies" v-model="ethnies" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">L'ethnie est obligatoire</span>
            </div>
          </div>

          <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Taille<span class="text-danger">*</span>
                </label>
                <Field name="taille" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Taille(cm) "/>
                <ErrorMessage name="taille" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Poids<span class="text-danger">*</span>
                </label>
                <Field name="poids" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Poids(kg) "/>
                <ErrorMessage name="poids" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Groupe Sanguin <span class="text-danger">*</span>
                  </label>
                  <Field  name="groupeSanguin"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['A+', 'B+','AB+','O+','A-','B-','AB-','O-']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le Groupe Sanguin"
                    />
                  </Field>
                  <ErrorMessage name="groupeSanguin" class="text-danger"/>
                </div>
              </div>


              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Vision Gauche <span class="text-danger">*</span>
                  </label>
                  <Field  name="visionGauche"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal', 'à vue réduite','Visé de loin','Astigmatique','à vue réduite & astigmatique','Visé de loin & astigmatique','partiellement handicapé','Aveugle']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la vision Gauche"
                    />
                  </Field>
                  <ErrorMessage name="visionGauche" class="text-danger"/>
                </div>
              </div>
              
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Vision Droite <span class="text-danger">*</span>
                  </label>
                  <Field  name="visionDroite"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal', 'à vue réduite','Visé de loin','Astigmatique','à vue réduite & astigmatique','Visé de loin & astigmatique','partiellement handicapé','Aveugle']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la vision Droite"
                    />
                  </Field>
                  <ErrorMessage name="visionDroite" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Audience Gauche <span class="text-danger">*</span>
                  </label>
                  <Field  name="audienceGauche"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal','partiellement handicapé','Sourd']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner l'audience Gauche"
                    />
                  </Field>
                  <ErrorMessage name="audienceGauche" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Audience Droite <span class="text-danger">*</span>
                  </label>
                  <Field  name="audienceDroite"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal','partiellement handicapé','Sourd']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner l'audience Droite"
                    />
                  </Field>
                  <ErrorMessage name="audienceDroite" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Main Gauche <span class="text-danger">*</span>
                  </label>
                  <Field  name="mainGauche"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal','partiellement handicapé','handicapé']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la main Gauche"
                    />
                  </Field>
                  <ErrorMessage name="mainGauche" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Main Droite <span class="text-danger">*</span>
                  </label>
                  <Field  name="mainDroite"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal','partiellement handicapé','handicapé']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la main Droite"
                    />
                  </Field>
                  <ErrorMessage name="mainDroite" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Jambe Gauche <span class="text-danger">*</span>
                  </label>
                  <Field  name="jambeGauche"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal','partiellement handicapé','handicapé']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la jambe Droite"
                    />
                  </Field>
                  <ErrorMessage name="jambeGauche" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Jambe Droite <span class="text-danger">*</span>
                  </label>
                  <Field  name="jambeDroite"  type="text"  v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['Normal','partiellement handicapé','handicapé']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la jambe Droite"
                    />
                  </Field>
                  <ErrorMessage name="jambeDroite" class="text-danger"/>
                </div>
              </div>
          <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nom du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="nomCon" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du conjoint "/>
                <ErrorMessage name="nomCon" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                 Prenom du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="prenomCon" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom du conjoint "/>
                <ErrorMessage name="prenomCon" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Date de Naissance du conjoint
                </label>
                <Field name="dateNaissanceCon" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date de naissance du conjoint "/>
                <ErrorMessage name="dateNaissanceCon" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nationalité du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="nationaliteCon" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nationalité du conjoint "/>
                <ErrorMessage name="nationaliteCon" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="telephoneCon" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone du conjoint "/>
                <ErrorMessage name="telephoneCon" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Passport du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="passportCon" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nationalité du conjoint "/>
                <ErrorMessage name="passportCon" class="text-danger"/>
              </div>
            </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Religion Du Conjoint<span class="text-danger">*</span>
              </label>
              <Field name="religions" v-model="religions" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la religion du conjoint"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La religion est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Ethnie Du Conjoint<span class="text-danger">*</span> 
              </label>
              <Field name="ethnies" v-model="ethnies" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie du conjoint"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">L'ethnie est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                ServiceC<span class="text-danger">*</span>
              </label>
              <Field name="services" v-model="services" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="serviceOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le service"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le service est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone 1<span class="text-danger">*</span>
                </label>
                <Field name="tel" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="tel" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone 2
                </label>
                <Field name="tel2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="tel2" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Email <span class="text-danger">*</span>
                </label>
                <Field name="email" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="email" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nom de la personne à contacter
                </label>
                <Field name="nomPersonneAContacter" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomPersonneAContacter" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Prénom personnel à contacter
                </label>
                <Field name="prenomPersonneAContacter" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomPersonneAContacter" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone personne à contacter
                </label>
                <Field name="telPersonneAContacter" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telPersonneAContacter" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black  mb-10">
                  Relation
                </label>
                <Field name="relation" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Indiquer la relation"/>
                <ErrorMessage name="relation" class="text-danger"/>
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
                    Choisir des fonctions
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
                                  Fonctions
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowFonction()"
                                  >
                                    <i
                                      class="fa fa-plus-circle position-relative ms-5 fs-12"
                                    ></i>
                                    Ajouter une fonction
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
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Etat
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold">
                                    Fonction
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Date de début <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Date de fin <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
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
                                v-for="(fonction, index) in fonctions"
                                :key="index"
                              >
                                <div class="col-md-2 mb-2">
                                  <div class="form-check mt-3 mb-15 mb-sm-20 mb-md-25">
                                    <label
                                      for="estActif"
                                      class="form-check-label fw-medium position-relative top-1"
                                    >
                                      Est Actif ?
                                    </label>
                                    <input
                                      name="estActif"
                                      v-model="fonction.estActif"
                                      type="checkbox"
                                      class="form-check-input shadow-none"
                                    />
                                    <ErrorMessage name="estActif" class="text-danger" />
                                  </div>
                                </div>
                                <div class="col-md-3 mb-2">
                                  <div class="">
                                    <Multiselect
                                      :options="fonctionOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="fonction.fonction"
                                      placeholder="Sélectionner la Fonction"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowFonction(fonction.fonction)"
                                    >
                                      La fonction est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input
                                      v-model="fonction.dateDebut"
                                      type="date"
                                      class="form-control shadow-none fs-md-15 text-black"
                                      placeholder=""
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowFonction(fonction.dateDebut)"
                                    >
                                      La date de début est obligatoire.
                                    </div>
                                  </div>
                                  
                                </div>
                                <div class="col-md-2 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input
                                      v-model="fonction.dateFin"
                                      type="date"
                                      class="form-control shadow-none fs-md-15 text-black"
                                      placeholder=""
                                    />
                                  </div>
                                  <div
                                      class="invalid-feedback"
                                      v-if="valideteRowFonction(fonction.dateFin)"
                                    >
                                      La date de fin est obligatoire.
                                    </div>
                                </div>
                                <div class="col-md-3 mb-2">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowFonction(index)"
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
            <div class="col-md-12 mt-3 mb-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                   :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
                >
                    Ajouter un personnel
                </button>
                <router-link to="/personelles/liste-personnels" 
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

import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Personnel } from '@/models/Personnel';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddPersonnel",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const personnelSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom du personnel est obligatoire'),
      prenom: Yup.string().required('Le prénom du personnel est obligatoire'),
      adresse: Yup.string().required('L\' adresse du personnel est obligatoire'),
      email: Yup.string().email('Le format de l\'email est invalide').required('L\'email est obligatoire'),
      tel: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone est obligatoire'),
      tel2: Yup.number().notRequired(),
      dateNais: Yup.date().notRequired(),
      nomCon: Yup.string().required('Le nom du conjoint est obligatoire'),
      prenomCon: Yup.string().required('Le prenom du conjoint est obligatoire'),
      dateNaissanceCon: Yup.string().required('La date de naissance du conjoint est obligatoire'),
      nationaliteCon: Yup.string().required('La nationalité du conjoint est obligatoire'),
      passportCon: Yup.string().required('Le passport du conjoint est obligatoire'),
      taille: Yup.string().required('La taille  est obligatoire'),
      poids: Yup.string().required('Le poids est obligatoire'),
      
      //nomUtilisateur: Yup.string().required('Le nom est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      civilite: Yup.string().required('La civilité est obligatoire'),
      groupeSanguin: Yup.string().required('Le groupe sanguin est obligatoire'),
      visionGauche: Yup.string().required('La vision gauche est obligatoire'),
      visionDroite: Yup.string().required('La vision droite est obligatoire'),
      audienceGauche: Yup.string().required('Audience Gauche est obligatoire'),
      audienceDroite: Yup.string().required('Audience Droite obligatoire'),
      mainGauche: Yup.string().required('La main gauche est obligatoire'),
      mainDroite: Yup.string().required('La main Droite est obligatoire'),
      jambeGauche: Yup.string().required('La jambe gauche est obligatoire'),
      jambeDroite: Yup.string().required('La jambe droite est obligatoire'),

      nomPersonneAContacter:Yup.string().notRequired(),
      prenomPersonneAContacter:Yup.string().notRequired(),
      telPersonnelAContacter:Yup.number().notRequired(),
      relation:Yup.string().notRequired(),
    });

    const personnelForm =  ref<Personnel | null>(null);
    const router = useRouter();
    const religions = ref();
    const ethnies = ref();
    const services = ref();

    // const estActif= ref(true)

    // watch(estActif, () => {
    //   console.log('estservice', estActif.value)
    // })

     // formulaire dynamique start

    
    const isDisable = ref(true);
    const fonctions = reactive([
      {
        estActif: "",
        fonction: "",
        dateDebut: "",
        dateFin: ""
      },
    ]);

    const addRowFonction = () => {
      fonctions.push({
        estActif: "",
        fonction: "",
        dateDebut: "",
        dateFin: ""
      });
    };

    const removeRowFonction = (index) => {
      if (fonctions.length > 1) fonctions.splice(index, 1);
      //totals();
    };

    const valideteRowFonction = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

  
    watch(fonctions, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].estActif == "" ||
          newValue[key].fonction == "" ||
          newValue[key].dateDebut == "" ||
          newValue[key].dateFin == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("fonctions");

    const fonctionOptions = ref([]);
    const produitsss: any = ref(null);
    const valuess = ref();
    const religionOptions = ref([]);
    const ethnieOptions = ref([]);
    const serviceOptions = ref([]);

    const addPersonnel = async (values, {resetForm}) => {
      
      values.fonctions = fonctions.map(fonction => ({
        estActif: fonction.estActif,
        fonction: fonction.fonction,  
        dateDebut: fonction.dateDebut,
        dateFin: fonction.dateFin,
      }));
      ApiService.post("/personnels",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListePersonnelPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchFonction = async () => {
      try {
        const response = await ApiService.get("/all/postes");
        const fonctionData = response.data.data.data;
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const getAllReligions = async () => {
        try{
        const response = await ApiService.get('/all/religions');
        const religionsData = response.data.data.data;

        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllEthnies = async () => {
        try{
        const response = await ApiService.get('/all/ethnies');
        const ethniesData = response.data.data.data;

        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

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
      label: `[ ${service?.organisation.nom} ] ` + service.nom,
    }));

    console.log("RYYYYY ==> ", serviceOptions);
  } catch (error) {
    console.log("RYYYYY5252 ==> ", error);
    //error(response.data.message)
  }
};
      
    onMounted(async () => {
      fetchFonction();
      getAllReligions();
      getAllEthnies();
      getAllServices();
    })

    return { personnelSchema,
        addPersonnel,
        personnelForm,
        removeRowFonction,
        addRowFonction,
        valideteRowFonction,
        valuess,
        fonctionOptions,
        isDisable,
        fonctions,
        religionOptions,
        ethnieOptions,
        serviceOptions,
        religions,
        ethnies,
        services
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
</style>
