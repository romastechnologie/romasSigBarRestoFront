<template>
  <div class="card">
    <div class="card-header">
                <h5 class="">Detail du personnel</h5>
                <!----><!----><!---->
                <div class="w-100 d-flex justify-content-end">
                <router-link
              to="/personnelles/liste-personnel"
              class="btn btn-primary transition border-0 lh-1 justify-content-end"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              Retour
            </router-link>
              </div>
            </div>

    <div class="row product-page-main">
      <div class="col-sm-12">
        <div class="profile-section mb-4 p-3 border rounded">
          <div class="d-flex align-items-start justify-content-between">
            <div class="d-flex align-items-center">
              <img
                v-if="personnel?.photoEmploye"
                :src="getUrlApiForFiles(personnel.photoEmploye, 'Personnels')"
                alt="Profile"
                class="img-thumbnail"
                style="width: 120px; height: 120px"
              />
              <div class="ms-3">
                <div class="row">
                  <div
                    class="card-head box-shadow bg-white d-lg-flex align-items-center p-15 p-sm-20 p-md-25"
                  >
                    <div class="w-100 d-flex justify-content-end">
                      <router-link
                        v-if="personnel && personnel.id"
                        :to="{
                          name: 'EditPersonnellePage2',
                          params: { id: personnel.id },
                        }"
                        class="btn btn-primary transition border-0 lh-1 fw-medium"
                      >
                        <i
                          class="fas fa-arrow-left lh-1 me-1 position-relative top-2"
                        ></i>
                        Modifier
                      </router-link>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <p>
                      <strong>Nom:</strong>
                      {{ personnel?.nom || "Nom inconnu" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Prénom:</strong>
                      {{ personnel?.prenom || "Prénom inconnu" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Situation Matrimoniale:</strong>
                      {{ personnel?.situationMatrimoniale || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Civilité:</strong>
                      {{ personnel?.civilite || "Non renseigné" }}
                    </p>
                  </div>
                <!-- <div class="col-md-6">
                    <p>
                      <strong>Date de Naissance:</strong>
                      {{
                        personnel?.birthdate
                          ?.split("T")[0]
                          ?.split("-")
                          .reverse()
                          .join("-") || "Non renseigné"
                      }}
                    </p>
                  </div>--> 
                 <!--<div class="col-md-6">
                    <p>
                      <strong>Date d'Embauche:</strong>
                      {{
                        personnel?.dateEmbauche
                          ?.split("T")[0]
                          ?.split("-")
                          .reverse()
                          .join("-") || "Non renseigné"
                      }}
                    </p>
                  </div>--> 
                  <!--<div class="col-md-6">
                    <p>
                      <strong>Numéro Sécu Sociale:</strong>
                      {{ personnel?.numeroSecuriteSociale || "Non renseigné" }}
                    </p>
                  </div>-->
                  <div class="col-md-6">
                    <p>
                      <strong>Nationalité:</strong>
                      {{ personnel?.nationalite || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Religion:</strong>
                      {{ personnel?.religion?.libelle || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Ethnie:</strong>
                      {{ personnel?.ethnie?.libelle || "Non renseigné" }}
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      <strong>Service:</strong>
                      {{  personnel?.organisation_personnels?.[personnel.organisation_personnels.length - 1]?.organisation?.nom || "Non renseigné"}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="align-self-start"></div>
          </div>

          <div class="col-sm-12">
            <div class="d-flex align-items-center">
              <div class="accordion" id="additionalInfoAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingAdditionalInfo">
                    <button
                      class="accordion-button btn-primary btn-sm"
                      type="button"
                      :class="{ collapsed: !isOpen, 'btn-blue': true }"
                      @click="toggleAccordion"
                      style="padding: 0.25rem 0.5rem; font-size: 0.875rem"
                    >
                      <i
                        :class="
                          isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up'
                        "
                      ></i>
                      Voir plus
                    </button>
                  </h2>
                  <div
                    id="collapseAdditionalInfo"
                    :class="{
                      'accordion-collapse collapse': true,
                      show: isOpen,
                    }"
                    aria-labelledby="headingAdditionalInfo"
                  >
                    <div class="accordion-body">
                      <div class="row">
                        <div class="col-md-6">
                          <p>
                            <strong>Boite postale:</strong>
                            {{ personnel?.boitePostale || "Nom inconnu" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Téléphone 1:</strong>
                            {{ personnel?.telephone || "Prénom inconnu" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Téléphone 2:</strong>
                            {{ personnel?.telephone2 || "Non renseigné" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Email:</strong>
                            {{ personnel?.email || "Non renseigné" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Departement:</strong>
                            {{
                              personnel?.departement?.libelle || "Non renseigné"
                            }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Commune:</strong>
                            {{ personnel?.commune?.libelle || "Non renseigné" }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Quartier:</strong
                            >{{
                              personnel?.quartier?.libelle || "Non renseigné"
                            }}
                          </p>
                        </div>
                        <div class="col-md-6">
                          <p>
                            <strong>Adresse:</strong>
                            {{ personnel?.adresse || "Non renseigné" }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul
          class="nav nav-tabs border-tab nav-primary mb-3"
          id="top-tab"
          role="tablist"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              id="contact-info-tab"
              data-bs-toggle="tab"
              href="#contact-info"
              role="tab"
              aria-controls="contact-info"
              aria-selected="true"
            >
              <strong>Personne a contacter</strong>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="family-info-tab"
              data-bs-toggle="tab"
              href="#family-info"
              role="tab"
              aria-controls="family-info"
              aria-selected="false"
              v-if="!['Divorcée', 'Veuve', 'Célibataire'].includes(personnel?.situationMatrimoniale)"

            >
              <strong>Conjoint</strong>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="family-info-tab"
              data-bs-toggle="tab"
              href="#enfant-info"
              role="tab"
              aria-controls="family-info"
              aria-selected="false"
            >
              <strong> Enfant</strong>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="health-info-tab"
              data-bs-toggle="tab"
              href="#health-info"
              role="tab"
              aria-controls="health-info"
              aria-selected="false"
            >
              <strong>Santé physique</strong>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="bank-info-tab"
              data-bs-toggle="tab"
              href="#bank-info"
              role="tab"
              aria-controls="bank-info"
              aria-selected="false"
            >
              <strong>Informations bancaires</strong>
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="affectation-info-tab"
              data-bs-toggle="tab"
              href="#affectation-info"
              role="tab"
              aria-controls="affectation-info"
              aria-selected="false"
            >
              <strong>Historique des affectations</strong>
            </a>
          </li>
        </ul>

        <div class="tab-content" id="top-tabContent">
          <div
            class="tab-pane fade show active"
            id="contact-info"
            role="tabpanel"
            aria-labelledby="contact-info-tab"
          >
          <table class="table" style="border: none;">
            <tbody>
              <tr>
                <td style="padding: 4px;">
                  <strong>Nom personne à contacter: </strong>{{ personnel?.nomPersonneAContacter || "Non renseigné" }}
                </td>
                <td style="padding: 4px;">
                  <strong>Prénom personne à contacter: </strong>{{ personnel?.prenomPersonneAContacter || "Non renseigné" }}
                </td>
              </tr>
              <tr>
                <td style="padding: 4px;">
                  <strong>Téléphone personne à contacter: </strong>{{ personnel?.telephonePersonneAContacter || "Non renseigné" }}
                </td>
                <td style="padding: 4px;">
                  <strong>Relation: </strong>{{ personnel?.relation || "Non renseigné" }}
                </td>
              </tr>
            </tbody>
          </table>

            <div class="mt-3">
              <button class="btn btn-success" @click="openModal('contact')">
                <i class="fa fa-edit lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Modifier</span>
              </button>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="family-info"
            role="tabpanel"
            aria-labelledby="family-info-tab"
            v-if="!['Divorcée', 'Veuve', 'Célibataire'].includes(personnel?.situationMatrimoniale)"
          >
          <table class="table" style="border: none;">
          <tbody>
            <tr>
              <td style="padding: 4px;">
                <strong>Nom conjoint: </strong>{{ personnel?.conjoints?.nomCon || "Non renseigné" }}
              </td>
              <td style="padding: 4px;">
                <strong>Prénom conjoint: </strong>{{ personnel?.conjoints?.prenomCon || "Non renseigné" }}
              </td>
            </tr>
            <tr>
              <td style="padding: 4px;">
                <strong>Date de naissance du conjoint: </strong>{{ personnel?.conjoints?.dateNaissanceCon || "Non renseigné" }}
              </td>
              <td style="padding: 4px;">
                <strong>Nationalité du conjoint: </strong>{{ personnel?.conjoints?.nationaliteCon || "Non renseigné" }}
              </td>
            </tr>
            <tr>
              <td style="padding: 4px;">
                <strong>Passeport conjoint: </strong>{{ personnel?.conjoints?.numPassportCon || "Non renseigné" }}
              </td>
              <td style="padding: 4px;">
                <strong>Religion conjoint: </strong>{{ personnel?.conjoints?.religionCon?.label || "Non renseigné" }}
              </td>
            </tr>
            <tr>
              <td style="padding: 4px;">
                <strong>Ethnie: </strong>{{ personnel?.conjoints?.ethnieCon?.label || "Non renseigné" }}
              </td>
              <td style="padding: 4px;">
                <strong>Téléphone conjoint: </strong>{{ personnel?.conjoints?.telephoneCon || "Non renseigné" }}
              </td>
            </tr>
          </tbody>
        </table>


            <div class="mt-3">
              <button
                class="btn btn-success"
                data-bs-target="#create-task"
                @click="openModal('family')"
              >
                <i class="fa fa-edit lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Modifier</span>
              </button>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="enfant-info"
            role="tabpanel"
            aria-labelledby="enfant-info-tab"
          >
            <div class="col-md-12 mb-md-25">
              <div
                class="tab-pane fade show active p-10"
                id="home-tab-pane"
                role="tabpanel"
                tabindex="0"
              >
                <div class="row">
                  <div class="col-md-12 mb-3">
                 <div
                      class="form-group mb-15 mb-sm-20 mb-md-25 d-flex align-items-center" >
                    <!--<div class="me-3" style="flex: 0 0 150px">
                        <label class="d-block text-black mb-10">
                          Nombre d'enfants<span class="text-danger">*</span>
                        </label>
                        <Field
                          name="nombreEnfant"
                          v-model="nombreEnfant"
                          type="text"
                          class="form-control shadow-none fs-md-15 text-black"
                          placeholder="Entrer le nombre d'enfants"
                        />
                      </div>--> 
                      <button
                        style="flex: 0 0 150px"
                        class="me-3 btn btn-success"
                        data-bs-target="#create-task"
                        @click="openModal('ajoutenfant')"
                      >
                        <i
                          class="fa fa-edit lh-1 me-1 position-relative top-2"
                        ></i>
                        <span class="position-relative">Ajouter</span>
                      </button>
                    </div>
                  </div>
                  <div
                    class="border border-primary mb-10"
                    v-if="nombreEnfant > 0"
                  >
                    <div
                      class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4"
                    >
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Enfants</h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        class="row d-flex align-items-center justify-content-between mt-10"
                      >
                        <div class="col-md-2 mb-2">
                          <label class="d-block text-black fw-semibold">
                            Nom
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2 mb-2">
                          <label class="d-block text-black fw-semibold">
                            Prénom
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-10">
                            Date Naissance<span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-10">
                            Sexe <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-10">
                            Actions <span class="text-danger">*</span>
                          </label>
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
                              :disabled="true"
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              placeholder="Saisir le nom"
                            />
                            <div
                              class="invalid-feedback"
                              v-if="valideteRowEnfant(enfant.nom)"
                            ></div>
                          </div>
                        </div>
                        <div class="col-md-3 mb-2">
                          <div class="form-group">
                            <input
                              v-model="enfant.prenom"
                              :disabled="true"
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              placeholder="saisir le prénom"
                            />
                            <div
                              class="invalid-feedback"
                              v-if="valideteRowEnfant(enfant.prenom)"
                            ></div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div class="form-group">
                            <input
                              v-model="enfant.dateNaissance"
                              :disabled="true"
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              placeholder=""
                            />
                          </div>
                          <div
                            class="invalid-feedback"
                            v-if="valideteRowEnfant(enfant.dateNaissance)"
                          ></div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div class="form-group">
                            <Multiselect
                              :disabled="true"
                              :searchable="true"
                              :options="['Masculin', 'Féminin']"
                              v-model="enfant.sexe"
                              placeholder="Sélectionner le sexe"
                            />
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <button
                            class="btn btn-primary btn-sm"
                            @click="openModal('enfant', enfant.id)"
                            data-bs-target="#create-task"
                          >
                            <i
                              class="fa fa-edit lh-1 me-1 position-relative top-2"
                            ></i>
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

          <div
            class="tab-pane fade"
            id="health-info"
            role="tabpanel"
            aria-labelledby="health-info-tab"
          >
          <table class="table" style="border: none;">
              <tbody>
                <tr>
                  <td style="padding: 4px;">
                    <strong>Taille: </strong>{{ personnel?.santeemploye?.taille || "Non renseigné" }}
                  </td>
                  <td style="padding: 4px;">
                    <strong>Poids: </strong>{{ personnel?.santeemploye?.poids || "Non renseigné" }}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px;">
                    <strong>Groupe sanguin: </strong>{{ personnel?.santeemploye?.groupeSanguin || "Non renseigné" }}
                  </td>
                  <td style="padding: 4px;">
                    <strong>Vision gauche: </strong>{{ personnel?.santeemploye?.visionGauche || "Non renseigné" }}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px;">
                    <strong>Vision droite: </strong>{{ personnel?.santeemploye?.visionDroite || "Non renseigné" }}
                  </td>
                  <td style="padding: 4px;">
                    <strong>Audience gauche: </strong>{{ personnel?.santeemploye?.audienceGauche || "Non renseigné" }}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px;">
                    <strong>Audience droite: </strong>{{ personnel?.santeemploye?.audienceDroite || "Non renseigné" }}
                  </td>
                  <td style="padding: 4px;">
                    <strong>Main gauche: </strong>{{ personnel?.santeemploye?.mainGauche || "Non renseigné" }}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px;">
                    <strong>Main droite: </strong>{{ personnel?.santeemploye?.mainDroite || "Non renseigné" }}
                  </td>
                  <td style="padding: 4px;">
                    <strong>Jambe gauche: </strong>{{ personnel?.santeemploye?.jambeGauche || "Non renseigné" }}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px;">
                    <strong>Jambe droite: </strong>{{ personnel?.santeemploye?.jambeDroite || "Non renseigné" }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="mt-3">
              <button
                class="btn btn-success"
                data-bs-target="#create-task"
                @click="openModal('health')"
              >
                <i class="fa fa-edit lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Modifier</span>
              </button>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="bank-info"
            role="tabpanel"
            aria-labelledby="bank-info-tab"
          >
          <table class="table" style="border: none;">
          <tbody>
            <tr>
              <td style="padding: 4px;">
                <strong>Banque: </strong>{{ personnel?.banque?.denominationBanque || "Non renseigné" }}
              </td>
              <td style="padding: 4px;">
                <strong>Numéro de compte bancaire: </strong>{{ personnel?.numeroCompte || "Non renseigné" }}
              </td>
            </tr>
            <tr>
              <td style="padding: 4px;">
                <strong>Code IBAN: </strong>{{ personnel?.codeIban || "Non renseigné" }}
              </td>
              <td style="padding: 4px;">
                <strong>Code SWIFT: </strong>{{ personnel?.codeSwift || "Non renseigné" }}
              </td>
            </tr>
          </tbody>
        </table>

            <div class="mt-3">
              <button
                class="btn btn-success"
                data-bs-target="#create-task"
                @click="openModal('bank')"
              >
                <i class="fa fa-edit lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Modifier</span>
              </button>
            </div>
          </div>

          <div class="tab-pane fade" id="affectation-info" role="tabpanel" aria-labelledby="affectation-info-tab">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>Nom de l'organisation</th>
        <th>Date de début</th>
        <th>Date de fin</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(affectation, index) in personnel?.organisation_personnels || []" :key="affectation.id">
        <td>{{ index + 1 }}</td>
        <td>{{ affectation.organisation?.nom || 'Non renseigné' }}</td>
        <td>{{ affectation.DateDebut || 'Non renseignée' }}</td>
        <td>{{ affectation.DateFin || 'En cours' }}</td>
        <td>
          <span 
            v-if="affectation.statut === 'actif'" 
            class="badge bg-success"
          >
            Actif
          </span>
          <span 
            v-else-if="affectation.statut === 'inactif'" 
            class="badge bg-danger"
          >
            Inactif
          </span>
          <span 
            v-else 
            class="badge bg-secondary"
          >
            Non renseigné
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

        </div>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      class="modal fade"
      id="create-task"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{
                modalType === "contact" ? "Modifier Personne à Contacter" : ""
              }}
              {{ modalType === "family" ? "Modifier Conjoint et Enfants" : "" }}
              {{ modalType === "health" ? "Modifier Santé Physique" : "" }}
              {{
                modalType === "bank" ? "Modifier Informations Bancaires" : ""
              }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <template v-if="modalType === 'contact'">
              <form @submit.prevent="saveContactInfo">
                <div class="mb-3">
                  <label class="form-label">Nom personne à contacter</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.nomPersonneAContacter"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Prénom personne à contacter</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.prenomPersonneAContacter"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Téléphone</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.telephonePersonneAContacter"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Relation</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.relation"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>

            <template v-if="modalType === 'family'">
              <form @submit.prevent="saveFamilyInfo">
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label">Nom conjoint</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personnel.conjoints.nomCon"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Prénom conjoint</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personnel.conjoints.prenomCon"
                    />
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label">Date de naissance</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="personnel.conjoints.dateNaissanceCon"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Nationalité</label>
                    <Field
                      name="nationaliteCon"
                      v-model="personnel.conjoints.nationaliteCon"
                      v-slot="{ field }"
                    >
                      <Multiselect
                        :options="countries"
                        :searchable="true"
                        track-by="value"
                        label="label"
                        v-model="field.value"
                        v-bind="field"
                        placeholder="pays de résidence"
                      />
                    </Field>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label">Passeport conjoint</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personnel.conjoints.numPassportCon"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Religion conjoint</label>
                    <Field
                      name="religionCon"
                      v-model="regionn"
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
                        placeholder="religion du conjoint"
                        label="label"
                        track-by="value"
                      />
                    </Field>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label">Ethnie conjoint</label>
                    <Field
                      name="ethnieCon"
                      v-model="ethnnie"
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
                        placeholder="ethnie du conjoint"
                        label="label"
                        track-by="value"
                      />
                    </Field>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Telephone conjoint </label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="personnel.conjoints.telephoneCon"
                    />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>

            <template v-if="modalType === 'health'">
              <form @submit.prevent="saveHealthInfo">
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label">Taille</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personnel.santeemploye.taille"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Poids</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="personnel.santeemploye.poids"
                    />
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Groupe Sanguin
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="groupeSanguin"
                      v-model="personnel.santeemploye.groupeSanguin"
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
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Vision Gauche
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="visionGauche"
                      type="text"
                      v-model="personnel.santeemploye.visionGauche"
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
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Vision Droite
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="visionDroite"
                      type="text"
                      v-model="personnel.santeemploye.visionDroite"
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
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Audience Gauche
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="audienceGauche"
                      type="text"
                      v-model="personnel.santeemploye.audienceGauche"
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
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Audience Droite
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="audienceDroite"
                      v-model="personnel.santeemploye.audienceDroite"
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
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Main Gauche <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="mainGauche"
                      v-model="personnel.santeemploye.mainGauche"
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
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Main Droite <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="mainDroite"
                      v-model="personnel.santeemploye.mainDroite"
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
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Jambe Gauche
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="jambeGauche"
                      v-model="personnel.santeemploye.mainDroite"
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
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="d-block text-black mb-10">
                      Jambe Droite
                      <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="jambeDroite"
                      v-model="personnel.santeemploye.jambeDroite"
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
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>

            <template v-if="modalType === 'bank'">
              <form @submit.prevent="saveBankInfo">
                <div class="mb-3">
                  <label class="form-label">Banque</label>
                  <Field name="banque">
                    <Multiselect
                      v-model="personnel.banque"
                      :options="banqueOptions"
                      :searchable="true"
                      track-by="value"
                      label="label"
                      placeholder="Sélectionner la banque"
                    />
                  </Field>
                </div>
                <div class="mb-3">
                  <label class="form-label">Numéro de compte</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.numeroCompte"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Code Iban</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.codeIban"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Code swift</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="personnel.codeSwift"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>

            <template v-if="modalType === 'enfant'">
              <form @submit.prevent="saveEnfantInfo">
                <div class="mb-3">
                  <label class="form-label">Nom enfant</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="activeEnfant.nom"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Prénom enfant</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="activeEnfant.prenom"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Date</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="activeEnfant.dateNaissance"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Sexe</label>
                  <Multiselect
                    :searchable="true"
                    :options="['Masculin', 'Féminin']"
                    v-model="activeEnfant.sexe"
                    placeholder="Sélectionner le sexe"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>

            <template v-if="modalType === 'ajoutenfant'">
              <form @submit.prevent="ajoutEnfantInfo">
                <div class="mb-3">
                  <label class="form-label">Nom enfant</label>
                  <input type="text" class="form-control" v-model="child.nom" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Prénom enfant</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="child.prenom"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Date</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="child.dateNaissance"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Sexe</label>
                  <Multiselect
                    :searchable="true"
                    :options="['Masculin', 'Féminin']"
                    placeholder="Sélectionner le sexe"
                    v-model="child.sexe"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { countries } from "./countries";
import {
  Form,
  Field,
  ErrorMessage,
  useFieldArray,
  useForm,
} from "vee-validate";
import {
  error,
  getUrlApiForFiles,
  success,
  showModal,
  hideModal,
  format_Date,
} from "@/utils/utils";
import Multiselect from "@vueform/multiselect";
export default defineComponent({
  name: "ViewPersonnel",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const personnel = ref(null);
    const route = useRoute();
    const isOpen = ref(false);
    const isModalOpen = ref(false);
    const modalType = ref("");
    const religion = ref();
    const religionOptions = ref([]);
    const banqueOptions = ref([]);
    const ethnie = ref();
    const ethnieOptions = ref([]);
    const countriesRef = ref(countries);
    const nombreEnfant = ref(null);
    const isDisable = ref(true);
    const enfantOptions = ref([]);
    const { remove, push, fields, update } = useFieldArray("enfants");
    const enfant = ref();
    const child = ref({
      id: "",
      nom: "",
      prenom: "",
      dateNaissance: "",
      sexe: "",
    });

    const activeEnfantId = ref(null);
    const activeEnfant = ref();
    const openModal = (type, enfantId = null) => {
      modalType.value = type;
      activeEnfantId.value = enfantId;
      if (type === "enfant" && enfantId) {
        activeEnfant.value = enfants.find((e) => e.id === enfantId) || {};
      }

      isModalOpen.value = true;
      const modalElement = document.getElementById("create-task");
      if (modalElement) {
        showModal(modalElement);
      }
    };
    const enfants = reactive([
      {
        id: "",
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: "",
      },
    ]);
    const toggleAccordion = () => {
      isOpen.value = !isOpen.value;
    };
    const closeModal = () => {
      isModalOpen.value = false;
      const modalElement = document.getElementById("create-task");
      if (modalElement) {
        hideModal(modalElement);
      }
    };
    const regionn = ref();
    const ethnnie = ref();

    const getPersonnel = async (id: number) => {
      try {
        const { data } = await ApiService.get(`/personnel/${id}`);
        console.log("data", data);
        personnel.value = data.data;
        console.log("personnelb=====> ", personnel.value);
        //.value=data.data?.religionCon.id;
        if (data.data.conjoints?.religionCon) {
          regionn.value = data.data.conjoints.religionCon.id;
          console.log('religionvalu',regionn.value);
        } else {
          personnel.value.conjoints.religionCon = null;
        };
        if (data.data.conjoints?.ethnieCon) {
          ethnnie.value = data.data.conjoints.ethnieCon.id;
          console.log('religionvalu',ethnnie.value);
        } else {
          personnel.value.conjoints.ethnieCon = null;
        };
        
        nombreEnfant.value = data.data.nombreEnfant || 0;
        enfants.splice(0, enfants.length);
        if (data.data.enfants && data.data.enfants.length > 0) {
          data.data.enfants.forEach((enfant) => {
            enfants.push({
              id: enfant.id || "",
              nom: enfant.nom || "",
              prenom: enfant.prenom || "",
              dateNaissance: format_Date(enfant.dateNaissance) || "",
              sexe: enfant.sexe || "",
            });
          });
        }
        console.log("Liste complète des enfants formatés :", enfants);
      } catch (err) {
        error(
          err.response?.data?.message ||
            "Erreur lors de la récupération des données."
        );
      }
    };

    const saveContactInfo = async () => {
      try {
        const response = await ApiService.put(
          `/personnels/${personnel.value.id}`,
          {
            nomPersonneAContacter: personnel.value.nomPersonneAContacter,
            prenomPersonneAContacter: personnel.value.prenomPersonneAContacter,
            telephonePersonneAContacter:
              personnel.value.telephonePersonneAContacter,
            relation: personnel.value.relation,
          }
        );
        if (response.data.code === 200) {
          success(response.data.message);
          closeModal();
        } else {
          error(
            "Une erreur est survenue lors de la mise à jour des informations de contact."
          );
        }
      } catch (err) {
        console.error(err);
        error(
          "Une erreur est survenue lors de la mise à jour des informations de contact."
        );
      }
    };
    const saveFamilyInfo = async () => {
      try {
        const response = await ApiService.put(
          `/conjointPersonnels/${personnel.value.id}`,
          {
            nomCon: personnel.value.conjoints.nomCon,
            prenomCon: personnel.value.conjoints.prenomCon,
            dateNaissanceCon: personnel.value.conjoints.dateNaissanceCon,
            nationaliteCon: personnel.value.conjoints.nationaliteCon,
            numPassportCon: personnel.value.conjoints.numPassportCon,
            religionCon: personnel.value.conjoints.religionCon?.value,
            ethnieCon: personnel.value.conjoints.ethnieCon?.value,
            telephoneCon: personnel.value.conjoints.telephoneCon,
          }
        );
        if (response.data.code === 200) {
          success(response.data.message);
          closeModal();
        } else {
          error(
            "Une erreur est survenue lors de la mise à jour des informations de contact."
          );
        }
      } catch (err) {
        console.error(err);
        error(
          "Une erreur est survenue lors de la mise à jour des informations de contact."
        );
      }
    };
    const saveHealthInfo = async () => {
      try {
        const response = await ApiService.put(
          `/santePersonnels/${personnel.value.id}`,
          {
            taille: personnel.value.santeemploye.taille,
            poids: personnel.value.santeemploye.poids,
            audienceGauche: personnel.value.santeemploye.audienceGauche,
            audienceDroite: personnel.value.santeemploye.audienceDroite,
            jambeGauche: personnel.value.santeemploye.jambeGauche,
            jambeDroite: personnel.value.santeemploye.jambeDroite,
            visionGauche: personnel.value.santeemploye.visionGauche,
            visionDroite: personnel.value.santeemploye.visionDroite,
            mainGauche: personnel.value.santeemploye.mainGauche,
            mainDroite: personnel.value.santeemploye.mainDroite,
          }
        );
        if (response.data.code === 200) {
          success(response.data.message);
          closeModal();
        } else {
          error(
            "Une erreur est survenue lors de la mise à jour des informations de contact."
          );
        }
      } catch (err) {
        console.error(err);
        error(
          "Une erreur est survenue lors de la mise à jour des informations de contact."
        );
      }
    };
    const saveBankInfo = async () => {
      try {
        const response = await ApiService.put(
          `/personnels/${personnel.value.id}`,
          {
            banque: personnel.value.banque?.value,
            numeroCompte: personnel.value.numeroCompte,
            codeIban: personnel.value.codeIban,
            codeSwift: personnel.value.codeSwift,
          }
        );
        if (response.data.code === 200) {
          success(response.data.message);
          closeModal();
        } else {
          error(
            "Une erreur est survenue lors de la mise à jour des informations de contact."
          );
        }
      } catch (err) {
        console.error(err);
        error(
          "Une erreur est survenue lors de la mise à jour des informations de contact."
        );
      }
    };
    const saveEnfantInfo = async () => {
      try {
        const response = await ApiService.put(
          `/PersonnelEnfants/${personnel.value.id}`,
          {
            id: activeEnfant.value.id,
            nom: activeEnfant.value.nom,
            prenom: activeEnfant.value.prenom,
            dateNaissance: activeEnfant.value.dateNaissance,
            sexe: activeEnfant.value.sexe,
          }
        );
        if (response.data.code === 200) {
          success(response.data.message);
          closeModal();
        } else {
          error(
            "Une erreur est survenue lors de la mise à jour des informations de contact."
          );
        }
      } catch (err) {
        console.error(err);
        error(
          "Une erreur est survenue lors de la mise à jour des informations de contact."
        );
      }
    };
    const ajoutEnfantInfo = async () => {
  try {
    const response = await ApiService.post(`/enfant`, {
      personnelId: personnel.value.id,
      nom: child.value.nom,
      prenom: child.value.prenom,
      dateNaissance: child.value.dateNaissance,
      sexe: child.value.sexe,
    });
    if (response.data.code === 201) {
      success(response.data.message);
      await getPersonnel(personnel.value.id);
      child.value = { id: "", nom: "", prenom: "", dateNaissance: "", sexe: "" };
      closeModal();
    } else {
      error("Une erreur est survenue lors de l'enregistrement de l'enfant.");
    }
  } catch (err) {
    console.error(err);
    error("Une erreur est survenue lors de l'enregistrement de l'enfant.");
  }
};

    const getAllReligions = async () => {
      try {
        const response = await ApiService.get("/all/religions");
        const religionsData = response.data.data.data;
        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
      } catch (error) {}
    };
    const fetchBanque = async () => {
      ApiService.get("all/banques")
        .then(({ data }) => {
          console.log("banque",data)
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
    const getAllEthnies = async () => {
      try {
        const response = await ApiService.get("/all/ethnies");
        const ethniesData = response.data.data.data;
        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
      } catch (error) {}
    };
    const addRowEnfant = () => {
      enfants.push({
        id: "",
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: "",
      });
    };
    const removeRowEnfant = (index) => {
      if (enfants.length > 1) enfants.splice(index, 1);
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
    watch(regionn, (newVal)=>{
      var type = null;
      if(newVal){
        type = religionOptions.value.find((reg => reg.value == newVal))
      }
      if(personnel.value.conjoints && personnel.value.conjoints.religionCon) personnel.value.conjoints.religionCon= type;   
    })
    watch(ethnnie, (newVal)=>{
      var type = null;
      if(newVal){
        type = ethnieOptions.value.find((reg => reg.value == newVal))
      }
      if(personnel.value.conjoints && personnel.value.conjoints.ethnieCon) personnel.value.conjoints.ethnieCon= type;
 
    })
    watch(nombreEnfant, (newVal) => {
      const count = parseInt(newVal) || 0;
      enfants.length = count;
      for (let i = 0; i < count; i++) {
        if (!enfants[i]) {
          enfants[i] = {
            id: "",
            nom: "",
            prenom: "",
            dateNaissance: "",
            sexe: "",
          };
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
    const formatDate = (dateString: string) => {
      if (!dateString) return "Non spécifiée";
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Format invalide"
        : date.toLocaleDateString("fr-FR");
    };
    onMounted(async () => {
      await getAllReligions();
      await getAllEthnies();
      await fetchBanque();
      if (route.params.id) {
      await  getPersonnel(parseInt(route.params.id as string));
      }
    });
    return {
      personnel,
      formatDate,
      getUrlApiForFiles,
      isOpen,
      toggleAccordion,
      modalType,
      isModalOpen,
      openModal,
      closeModal,
      saveContactInfo,
      saveFamilyInfo,
      saveHealthInfo,
      saveBankInfo,
      saveEnfantInfo,
      ajoutEnfantInfo,
      religionOptions,
      religion,
      ethnieOptions,
      ethnie,
      regionn,
      ethnnie,
      countries: countriesRef,
      banqueOptions,
      removeRowEnfant,
      addRowEnfant,
      valideteRowEnfant,
      nombreEnfant,
      enfantOptions,
      isDisable,
      enfants,
      format_Date,
      enfant,
      activeEnfant,
      child,
    };
  },
});
</script>
<style scoped>
.btn-blue {
  background-color: var(--bs-primary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
}
.btn-blue i {
  margin-right: 8px;
}
.btn-blue:hover {
  background-color: #0056b3;
  color: whit;
}
.accordion-button {
  background-color: transparent;
}
.table th, .table td {
  padding: 4px;
  border: none;
}

</style>
