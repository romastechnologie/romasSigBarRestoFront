Collection.vue


<div class="col-md-12 mb-md-25">
                                      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                                        <div class="row">
                                          <div class="border border-primary mb-10">
                                            <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                              style="background-color: #0a59a4">
                                              <div class="col-md-7">
                                                <h3 class="fs-4 text-white">
                                                  Enfants
                                                </h3>
                                              </div>
                                              <div class="col-md-5">
                                                <div class="d-flex float-end">
                                                  <button
                                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                                    type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                                                    @click="addRowEnfant()">
                                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                                    Ajouter un enfant
                                                  </button>
                                                  <router-link to="/liste-mouvements"></router-link>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div class="row d-flex align-items-center justify-content-between mt-10">
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                    Nom
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-3">
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
                                              <div class="row" v-for="(enfant, index) in enfants" :key="index">
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="enfant.nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                                                      placeholder="Saisir le nom" />
                                                    <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.nom)">
                                                      Le nom est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="enfant.prenom" type="text"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="saisir le prénom" />
                                                    <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.prenom)">
                                                      Le prénom est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group">
                                                    <input v-model="enfant.dateNaissance" type="date"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                                  </div>
                                                  <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.dateNaissance)">
                                                    La date est obligatoire.
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group ">
                                                    <Multiselect :searchable="true" :options="['Masculin', 'Féminin']" v-model="enfant.sexe"
                                                      placeholder="Sélectionner le sexe" />
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                                    @click="removeRowEnfant(index)">
                                                   <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                                    </button>
                                             </div> 
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>


const isDisable = ref(true);
    const enfants = reactive([{
      nom: "",
      sexe: "",
      prenom: "",
      dateNaissance: ""
    }]);


    const addRowEnfant = () => {
        enfants.push({
          nom: "",
          sexe: "",
          prenom: "",
          dateNaissance: ""
        });
      };
  
      const removeRowEnfant = (index) => {
        if (enfants.length > 1) enfants.splice(index, 1);
        //totals();
      };
  
      watch(
        enfants,
        (newValue) => {
          isDisable.value =
          newValue.some(
            (enfant) =>
            valideteRowEnfant(enfant.nom) ||
            valideteRowEnfant(enfant.prenom) ||
            valideteRowEnfant(enfant.sexe) ||
            valideteRowEnfant(enfant.dateNaissance)
          );
        },
        { deep: true }
      );
  
      const valideteRowEnfant = (e) => {
        if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
          console.log('erg')
          return true;
        } else {
          return false;
        }
      };
  
      const { remove, push, fields, update } = useFieldArray("enfants");
  
      const enfantOptions = ref([]);

      const addPersonnel = async (values, { resetForm }) => {
        values.enfants = enfants.map(enfant => ({
          nom: enfant.nom,
          sexe: enfant.sexe,
          prenom: enfant.prenom,
          dateNaissance: enfant.dateNaissance,
        }));


        <div class="col-md-4 mb-3"> 
  <label for="duree" class="form-label">Durée du circuit <span class="text-danger">*</span></label>
  <div class="input-group">
    <input name="dureeCircuit" id="duree" class="form-control" type="text" placeholder="Entrez la durée">
    <select name="uniteDuree" class="form-select form-control" style="width: 20px !important;">
      <option value="...">...</option>
      <option value="Jour(s)">Jour(s)</option>
      <option value="Mois">Mois</option>
      <option value="Annees">Années</option>
    </select>
    <span class="invalid-feedback"></span>
  </div>
</div>

<div class="col-md-4 mb-3"> 
  <label for="distance" class="form-label">Distance parcourue <span class="text-danger">*</span></label>
  <div class="input-group">
    <input name="distanceParcourue" id="distance" class="form-control" type="text" placeholder="Entrez la distance">
    <select name="uniteDistance" class="form-select form-control" style="width: 20px !important;">
      <option value="...">...</option>
      <option value="Kilomètres">Kilomètres</option>
      <option value="Miles">Miles</option>
    </select>
    <span class="invalid-feedback"></span>
  </div>
</div>

v-model="circuit.Duree"
v-model="circuit.typeDuree"