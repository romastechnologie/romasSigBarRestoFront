<!-- <template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="personnelForm" @submit="addPersonnel" :validation-schema="personnelSchema">
        <div class="tab-content" id="add-product-pills-tabContent">
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
                      <div class="col-md-2">
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
                    </div>
                    <hr class="mt-0" />
                    <div class="row" v-for="(enfant, index) in enfants" :key="index">
                      <div class="col-md-3 mb-3">
                        <div class="form-group mb-5 mb-sm-5 mb-md-5">
                          <input v-model="enfant.nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                            placeholder="Saisir le nom" />
                          <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.nom)">
                            Le nom est obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 mb-3">
                        <div class="form-group mb-5 mb-sm-5 mb-md-5">
                          <input v-model="enfant.prenom" type="text"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="saisir le prénom" />
                          <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.prenom)">
                            Le prénom est obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 mb-3">
                        <div class="form-group mb-5 mb-sm-5 mb-md-5">
                          <input v-model="enfant.dateNaissance" type="date"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                        </div>
                        <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.dateNaissance)">
                          La date est obligatoire.
                        </div>
                      </div>
                      <div class="col-md-3 mb-3">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                          <Multiselect :searchable="true" :options="['Masculin', 'Féminin']" v-model="enfant.sexe"
                            v-bind="field" placeholder="Sélectionner le sexe" />
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
  name: "AddPersonnelContent",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const personnelSchema = Yup.object().shape({
      modeSaisie: Yup.string().required('Le mode de saisie est obligatoire'),
      typeChampsLibre: Yup.string().required('Le type de champs libre est obligatoire'),
      libelleChamp: Yup.string().required('Le libellé du champ libre est obligatoire'),
      nomChamp: Yup.string().required('Le nom du champ libre est obligatoire'),
      valeurPossible: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur est obligatoire'),
      valeurParDefaut: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur actuel est obligatoire'),
      estObligatoire: Yup.boolean().notRequired(),
      
     
    });

    const personnelForm = ref<Personnel | null>(null);
    const router = useRouter();
    
    const nom = ref();
    const prenom = ref();
    
    

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
    const valuess = ref();
   

    

    const addPersonnel = async (values, { resetForm }) => {
      values.enfants = enfants.map(enfant => ({
        nom: enfant.nom,
        sexe: enfant.sexe,
        prenom: enfant.prenom,
        dateNaissance: enfant.dateNaissance,
      }));

      
      ApiService.post("/personnels", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListePersonnelPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    

    onMounted(async () => {
      
    })

    return {
      personnelSchema,
      addPersonnel,
      personnelForm,
      removeRowEnfant,
      addRowEnfant,
      valideteRowEnfant,
      valuess,
      enfantOptions,
      isDisable,
      enfants,
      
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
</style> -->
