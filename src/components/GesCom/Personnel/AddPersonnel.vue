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
                    Situation matrimoniale <span class="text-danger"></span>
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
                <Field name="photoEmploye" type="file" 
                      accept="image/jpeg, image/png application/pdf"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Choisissez une image"/>
                <ErrorMessage name="photoEmploye" class="text-danger"/>
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
                <Field name="birthdate" type="date" 
                class="form-control shadow-none fs-md-15 text-black"/>
              </div>
              <ErrorMessage name="birthdate" class="text-danger"/>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nationalité<span class="text-danger"></span>
                </label>
                <Field name="nationalite" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nationnalité "/>
                <ErrorMessage name="nationalite" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Boite Postale <span class="text-danger"></span>
                </label>
                <Field name="boitePostale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer votre adresse postale"/>
                <ErrorMessage name="boitePostale" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Religion <span class="text-danger"></span>
              </label>
              <Field name="religions" v-model="religions" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la religion"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="religions" class="text-danger"/>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Ethnie <span class="text-danger"></span>
              </label>
              <Field name="ethnies" v-model="ethnies" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="ethnies" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone 1<span class="text-danger">*</span>
                </label>
                <Field name="telephone" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone 2
                </label>
                <Field name="telephone2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Email <span class="text-danger"></span>
                </label>
                <Field name="email" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="email" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nom de la personne à contacter  <span class="text-danger">*</span>
                </label>
                <Field name="nomPersonneAContacter" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomPersonneAContacter" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Prénom personnel à contacter <span class="text-danger">*</span>
                </label>
                <Field name="prenomPersonneAContacter" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomPersonneAContacter" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone personne à contacter <span class="text-danger">*</span>
                </label>
                <Field name="telephonePersonneAContacter" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephonePersonneAContacter" class="text-danger"/>
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
            <div class="col-md-12 mt-3 mb-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
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
      telephone: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone est obligatoire'),
      telephone2: Yup.number().notRequired(),
      birthdate: Yup.date().notRequired(),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      civilite: Yup.string().required('La civilité est obligatoire'),
      nomPersonneAContacter:Yup.string().notRequired(),
      prenomPersonneAContacter:Yup.string().notRequired(),
      telephonePersonnelAContacter:Yup.number().notRequired(),
      relation:Yup.string().notRequired(),
      dateDebutFonc: Yup.date().notRequired(),
      dateFinFonc: Yup.date().notRequired(),
    });

    const personnelForm =  ref<Personnel | null>(null);
    const router = useRouter();
    const religions = ref();
    const ethnies = ref();
    
    const isDisable = ref(true);
    const fonctions = reactive([
      {
        estActif: "",
        fonction: "",
        dateDebutFonc: "",
        dateFinFonc: ""
      },
    ]);

    const addRowFonction = () => {
      fonctions.push({
        estActif: "",
        fonction: "",
        dateDebutFonc: "",
        dateFinFonc: ""
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
          newValue[key].dateDebutFonc == "" ||
          newValue[key].dateFinFonc == ""
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
    const showMErr = ref(false);
    
    const addPersonnel = async (values, { resetForm }) => {

        const formData = new FormData();

        // Ajouter la photo si c'est bien un File
        const photoInput = document.querySelector('input[name="photoEmploye"]') as HTMLInputElement;
        if (photoInput && photoInput.files && photoInput.files[0]) {
            formData.append('photoEmploye', photoInput.files[0]);
        }

        //  Ajouter les fonctions
        values.fonctions = fonctions.map(fonction => ({
            estActif:      fonction.estActif,
            fonction:      fonction.fonction,
            dateDebutFonc: fonction.dateDebutFonc,
            dateFinFonc:   fonction.dateFinFonc,
        }));

        //  Ajouter tous les autres champs dans le FormData
        const champsAExclure = ['photoEmploye'];
        for (const key in values) {
            if (champsAExclure.includes(key)) continue;

            const val = values[key];
            if (val === null || val === undefined) continue;

            // Les objets/tableaux (comme fonctions) doivent être stringifiés
            if (typeof val === 'object' && !(val instanceof File)) {
                formData.append(key, JSON.stringify(val));
            } else {
                formData.append(key, val);
            }
        }

        //  Envoyer en multipart
        axios.post("/personnels", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
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

    const fetchFonction = async () => {
      try {
        const response = await ApiService.get("/all/postes");
        const fonctionData = response.data.data.data;
        console.log("ffff",fonctionData.value);
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

//       const getAllServices = async () => {
//   try {
//     const response = await ApiService.get(
//       "/all/recupererToutesOrganisationSansFilsAvecParent"
//     );

//     console.log("rfrrf ===> ", response);
//     const servicesData = response.data.data;
//     console.log("465484635418416541 ===> ", servicesData);

//     serviceOptions.value = servicesData.map((service) => ({
//       value: service.id,
//       label: `[ ${service?.organisation.nom} ] ` + service.nom,
//     }));

//     console.log("RYYYYY ==> ", serviceOptions);
//   } catch (error) {
//     console.log("RYYYYY5252 ==> ", error);
//     //error(response.data.message)
//   }
// };
      
    onMounted(async () => {
      fetchFonction();
      getAllReligions();
      getAllEthnies();
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
        religions,
        ethnies,
        showMErr
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
