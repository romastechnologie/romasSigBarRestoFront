<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="modelecontratForm" @submit="addModeleContrat" :validation-schema="modelecontratSchema">
          <div class="row">
               <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type Contrat <span class="text-danger">*</span>
                  </label>
                  <Field name="typeContrat" v-slot="{ field }">
                    <Multiselect
                      v-model="field.value"
                      v-bind="field"
                      :options="typeContratOptions"
                      :preserve-search="true"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner le typeContrat"
                      label="label"
                      track-by="label"
                      :value="typeContrat"/>
                  </Field>
                  <ErrorMessage name="typeContrat" class="text-danger" />
                </div>
              </div>
             <!--  <div class="col-md-4 mb-3">
                <label for="date" class="form-label">
                 Date<span class="text-danger">*</span>
                </label>
                <Field name="date" class="form-control shadow-none fs-md-15 text-black" v-model="date" type="date" />
                <ErrorMessage name="date" class="text-danger" />
            </div>
            
               <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Lieu<span class="text-danger">*</span>
                  </label>
                  <Field name="lieu" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le lieu" />
                  <ErrorMessage name="lieu" class="text-danger" />
                </div>
              </div>--> 

           
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
          
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button class="btn btn-success me-3" type="submit">
                  Ajouter Modele de contrat
                </button>
                <router-link to="/modelecontrats/liste-modelecontrat" class=" btn btn-danger "><i
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
import { defineComponent, onMounted, ref, reactive, nextTick,watch, computed } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { ModeleContrat } from '@/models/ModeleContrat';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import Editor from '@tinymce/tinymce-vue'

  export default defineComponent({
    name: "AddModeleContrat",
    components: {
      Form,
    Field,
    Editor,
    ErrorMessage,
    Multiselect
    },

  
    setup: () => {
    const loading = ref<boolean>(false);
    const description = ref('');
    const descriptionError = ref('');
    const typeContrat = ref(null);
    const isEditorReady = ref(false);
    const tinymceApiKey = ref('uz847a8s67ivk7r2bgs2dctztrtids7i68lucoaoja3btzk6'); // Remplace par ta clé API ou laisse vide pour le mode local
    const typeContratOptions = ref([]);
    const newContrat = ref<number | null>(null);

      const modelecontratSchema = Yup.object().shape({
 //   date: Yup.string().required("la date est obligatoire."),
     // salaireBaseDefaut: Yup.number().required("le salaire de base est obligatoire."),
    //  conditionsSpecifiques: Yup.string().required("Les conditions specifiques sont obligatoires."),
  typeContrat: Yup.number().required("Le type de contrat est obligatoire."),
 // description: Yup.string().required("La description est obligatoire."), 
// lieu: Yup.string().required("La description est obligatoire."), 


      });
      onMounted(async () => {
          getAllTypeContrat();
      initializeEditor();
      });

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
      const modelcontratForm = ref(null);
      const router = useRouter(); 
      const addModeleContrat = async (values, {resetForm}) => {
          values.description = description.value;
          console.log("valeur contrat", values);
        ApiService.post("/modeleContrats",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeModeleContratPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
  
      return {  typeContratOptions,modelecontratSchema,addModeleContrat,modelcontratForm, descriptionError, isEditorReady,description, tinymceApiKey,handleEditorInit,
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