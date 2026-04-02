<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="modelecontratForm" @submit="editModeleContrat" :validation-schema="ModeleContratSchema" :initial-values="modelecontratForm">
          <div class="row">
         <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type Contrat <span class="text-danger">*</span>
                  </label>
                  <Field name="typeContrat" 
                  v-model="typeContrat"
                  v-slot="{ field }">
                    <Multiselect
                      v-model="field.value"
                      :options="typeContratOptions"
                      label="label"
                      track-by="value"
                      placeholder="Sélectionner le typeContrat"
                    />


                  </Field>
                  <ErrorMessage name="typeContrat" class="text-danger" />
                </div>
              </div>
            <div class="card mb-3 bg-light border">
              <div class=" fw-bold mt-3" style="color: black;font-size: 20px; text-align: center;">
                Dictionnaire des variables disponibles
              </div>
              <div class="card-body" style="max-height: 250px; overflow-y: auto;">
                <table class="table table-sm table-bordered">
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in dictionnaireVariables" :key="item.variable">
                      <td>
                        <code>{{ item.variable }}</code>
                      </td>
                      <td>{{ item.description }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description du Modèle <span class="text-danger">*</span>
                  </label>
                  <div class="tinymce-wrapper">
                    <editor
                      v-if="isEditorReady"
                      v-model="description"
                      :init="{
                      plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                      toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                      height: 500,
                      }"
                      :api-key="tinymceApiKey"
                      @init="handleEditorInit"
                    />
                    <div v-else class="text-muted">Chargement de l'éditeur...</div>
                  </div>
                  <div v-if="descriptionError" class="text-danger">{{ descriptionError }}</div>
                </div>
              </div>
          
              
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier modele contrat
            </button>
            <router-link to="/modeleContrat/liste-modeleContrat" 
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
import { defineComponent, onMounted, ref, reactive, nextTick,watch, computed } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { ModeleContrat} from '@/models/ModeleContrat';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import VueMultiselect from 'vue-multiselect';
import Editor from '@tinymce/tinymce-vue';

export default defineComponent({
    name: "EditModeleContrat",
    components: {
    Form,
    Field,
    Editor,
    ErrorMessage,
    Multiselect,
    VueMultiselect,

  },
  setup: () => {
    const ModeleContratSchema = Yup.object().shape({
  //     date: Yup.string().required("la date est obligatoire."),
    typeContrat: Yup.string().required("Le type de contrat est obligatoire."),
// lieu: Yup.string().required("La description est obligatoire."), 
 });
    const modelecontratForm = ref<ModeleContrat>();
    const router = useRouter();
    const route = useRoute();
    const loading = ref<boolean>(false);
    const description = ref('');
    const descriptionError = ref('');
    const typeContrat = ref();
    const isEditorReady = ref(false);
    const typeContratOptions = ref([]);
    const tinymceApiKey = ref('uz847a8s67ivk7r2bgs2dctztrtids7i68lucoaoja3btzk6'); // Remplace par ta clé API ou laisse vide pour le mode local
    const dictionnaireVariables = [
      { variable: "{{employeur_raison_sociale}}", description: "Raison sociale de la société" },
      { variable: "{{employeur_organisation}}", description: "Organisation rattachée au contrat" },
      { variable: "{{employeur_adresse}}", description: "Adresse de la société" },
      { variable: "{{employeur_telephone}}", description: "Téléphone de la société" },
      { variable: "{{employeur_representant}}", description: "Nom complet du représentant légal" },

      { variable: "{{employe_nom}}", description: "Nom complet de l’employé" },
      { variable: "{{employe_naissance}}", description: "Date de naissance de l’employé" },
      { variable: "{{employe_sexe}}", description: "Sexe de l’employé" },
      { variable: "{{employe_nationalite}}", description: "Nationalité de l’employé" },
      { variable: "{{employe_adresse}}", description: "Adresse de l’employé" },
      { variable: "{{employe_situation}}", description: "Situation matrimoniale" },
      { variable: "{{employe_qualification}}", description: "Qualification professionnelle" },

      { variable: "{{contrat_duree}}", description: "Durée du contrat" },
      { variable: "{{contrat_date_debut}}", description: "Date de début du contrat" },
      { variable: "{{contrat_date_fin}}", description: "Date de fin du contrat" },
      { variable: "{{poste}}", description: "Poste occupé" },
      { variable: "{{lieu_travail}}", description: "Lieu de travail" },
      { variable: "{{salaire_base}}", description: "Salaire de base" },

      { variable: "{{ville_signature}}", description: "Ville de signature du contrat" },
      { variable: "{{date_signature}}", description: "Date de signature du contrat" },
    ];
    function nettoyerHtmlWord(html: string): string {
  // 1. Supprimer tous les attributs mso-* dans les styles inline
  let result = html.replace(/\s*mso-[^;}"]+;?/gi, '');
  
  // 2. Supprimer les marges négatives responsables du décalage
  result = result.replace(/margin\s*:\s*[^;"']+/gi, '');
  result = result.replace(/margin-right\s*:\s*-[\d.]+pt/gi, '');
  result = result.replace(/margin-left\s*:\s*-[\d.]+pt/gi, '');
  
  // 3. Supprimer les attributs lang inutiles
  result = result.replace(/\slang="[^"]*"/gi, '');
  
  // 4. Supprimer les bookmarks Word (<a name="..."></a>)
  result = result.replace(/<a\s+name="[^"]*"><\/a>/gi, '');
  
  // 5. Supprimer les styles vides restants
  result = result.replace(/\sstyle="[\s;]*"/gi, '');
  
  return result;
}
  function getModeleContrat(id: number) {
  ApiService.get(`/modeleContrats/${id}`)
    .then(({ data }) => {
      const modelecontratData = data.data;
      modelecontratForm.value = {
        ...modelecontratData,
        typeContrat: modelecontratData?.typeContrat.id
      };
      description.value = nettoyerHtmlWord(modelecontratData.description); // lier description ici
      typeContrat.value = modelecontratData?.typeContrat.id; // stocker pour liaison avec Multiselect
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
}

const editModeleContrat = async (values, { resetForm }) => {
  try {
    const id = Number(route.params.id);

    const payload = {
  description: nettoyerHtmlWord(description.value),
  typeContrat: values.typeContrat // juste un number
};

    const response = await ApiService.put(
      `/modeleContrats/${id}`,
      payload
    );

    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeModeleContratPage" });
    }
  } catch (err: any) {
    error(err.response?.data?.message || "Une erreur est survenue.");
  }
};


  const getAllTypeContrat = async () => {
      try {
        const response = await ApiService.get('/all/typeContrats');
        const typeData: any[] = response.data.data.data;
        typeContratOptions.value = typeData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
      } catch (error) {
        console.error('Error fetching type contrat:', error);
      }
    };
  
   const initializeEditor = async () => {
      await nextTick(); 
      isEditorReady.value = true; 
      console.log('TinyMCE Editor initialization triggered');
    };
    const handleEditorInit = (evt: any, editor: any) => {
      console.log('TinyMCE Editor initialized:', editor);
      setTimeout(() => editor.focus(), 100); 
    };
    onMounted(() => {
      if(route.params.id) {
        getModeleContrat(parseInt(route.params.id as string));
      }
     initializeEditor();
     getAllTypeContrat();
    });
    return {  typeContratOptions,typeContrat,
      ModeleContratSchema, editModeleContrat,modelecontratForm, descriptionError, isEditorReady,description, tinymceApiKey,handleEditorInit, dictionnaireVariables
    };
  },
});
</script>
  <style scoped>
.tinymce-wrapper {
  position: relative;
  width: 100%;
  min-height: 300px; /* Hauteur minimale pour éviter un affichage réduit */
}
.tinymce-wrapper .tox-tinymce {
  border: 1px solid #ced4da !important; /* Style cohérent avec Bootstrap */
  z-index: 1050; /* Au-dessus de la modale Bootstrap */
}
</style>