<template>
  <div class="modal fade" id="AddModeleContratModal" tabindex="-1" role="dialog" ref="addModeleContratModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="modeleContratForm" @submit="addModeleContrat" :validation-schema="modeleContratSchema">
            <div class="row">
                 <div class="col-md-12 mb-3">
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
                      :value="typeContrat"
                      @update:modelValue="typeContrat = $event"
                    />
                  </Field>
                  <ErrorMessage name="typeContrat" class="text-danger" />
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
              <button class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { ModeleContrat } from '@/models/ModeleContrat';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "AddModeleContratModal",
  components: {
    Form,
    Field,
    Editor,
    ErrorMessage,
    Multiselect
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
  },
  emits: ["refreshModeleContrats", 'openmodal'],

  setup: (props: any, { emit }: { emit: Function }) => {
    const loading = ref<boolean>(false);
    const description = ref('');
    const descriptionError = ref('');
    const typeContrat = ref(null);
    const isEditorReady = ref(false);
    const tinymceApiKey = ref('uz847a8s67ivk7r2bgs2dctztrtids7i68lucoaoja3btzk6'); // Remplace par ta clé API ou laisse vide pour le mode local

    const modeleContratSchema = Yup.object().shape({
    //  dureeDefaut: Yup.number().required("la duree est obligatoire."),
    //  salaireBaseDefaut: Yup.number().required("le salaire de base est obligatoire."),
  //    conditionsSpecifiques: Yup.string().required("Les conditions specifiques sont obligatoires."),
      typeContrat: Yup.number().required("Le type de contrat est obligatoire."),
    });

    onMounted(() => {
      getAllTypeContrat();
      initializeEditor();
    });

    const initializeEditor = async () => {
      await nextTick(); 
      isEditorReady.value = true;
      console.log('TinyMCE Editor initialization triggered');
    };

    const handleEditorInit = (evt: any, editor: any) => {
      console.log('TinyMCE Editor initialized:', editor);
      setTimeout(() => editor.focus(), 100); 
    };

    const modeleContratnew = ref(props.id);
    const modeleContratForm = ref<InstanceType<typeof Form> | null>(null);
    const addModeleContratModalRef = ref<null | HTMLElement>(null);
    let modeleContrats = ref<Array<ModeleContrat>>([]);
    const title = ref('Ajouter un modele contrat');
    const typeContratOptions = ref([]);
    const btntext = ref('Ajouter');
    const isupdate = ref(false);
    const router = useRouter();

    watch(() => props.id, (newValue) => {
      if (newValue !== 0) {
        getModeleContrat(newValue);
        isupdate.value = true;
      }
      btnTitle();
    });

    const getModeleContrat = async (id: number) => {
      try {
        const { data } = await ApiService.get("/modeleContrats/" + id);
        if (modeleContratForm.value) {
          console.log('values',modeleContratForm.value);
          modeleContratForm.value.setFieldValue("id", data.data.id);
       //   modeleContratForm.value.setFieldValue("dureeDefaut", data.data.dureeDefaut);
      //    modeleContratForm.value.setFieldValue("salaireBaseDefaut", data.data.salaireBaseDefaut);
       //   modeleContratForm.value.setFieldValue("conditionsSpecifiques", data.data.conditionsSpecifiques);
          modeleContratForm.value.setFieldValue("typeContrat", data.data.typeContrat?.id || null);
          description.value = data.data.description || '';
          typeContrat.value = data.data.typeContrat?.id || null;
          emit('openmodal', addModeleContratModalRef.value);
          await nextTick(); 
          initializeEditor(); 
        }
      } catch ({ response }) {
        error(response?.data?.message || 'Erreur lors de la récupération du modèle contrat');
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

    const btnTitle = () => {
      if (isupdate.value) {
        title.value = "Modifier le modele contrat";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un modele contrat";
        btntext.value = "Ajouter";
      }
    };

    const addModeleContrat = async (values: any, { resetForm }: { resetForm: () => void }) => {
      if (!description.value) {
        descriptionError.value = "La description est obligatoire.";
        return;
      }
      descriptionError.value = '';

      const payload = {
        ...values,
        typeContrat: typeContrat.value,
        description: description.value,
      };

      console.log("Valeurs envoyées à l'API :", payload);
      loading.value = true;

      try {
        if (isupdate.value) {
          const { data } = await ApiService.put(`/modeleContrats/${values.id}`, payload);
          if (data.code === 200) {
            success(data.message);
            resetForm();
            description.value = '';
            hideModal(addModeleContratModalRef.value);
            isupdate.value = false;
            btnTitle();
            emit("refreshModeleContrats");
            router.push({ name: "ListeModeleContratPage" });
          }
        } else {
          const { data } = await ApiService.post("/modeleContrats", payload);
          if (data.code === 201) {
            success(data.message);
            resetForm();
            description.value = '';
            hideModal(addModeleContratModalRef.value);
            emit("refreshModeleContrats");
          }
        }
      } catch ({ response }) {
        error(response?.data?.message || 'Erreur lors de la soumission');
      } finally {
        loading.value = false;
      }
    };

    const resetValue = () => {
      if (modeleContratForm.value) {
        modeleContratForm.value.resetForm();
      }
      description.value = '';
      typeContrat.value = null;
      isupdate.value = false;
      btnTitle();
    };

    return {
      typeContrat, title, btntext, resetValue, modeleContratSchema, typeContratOptions, modeleContrats,
      addModeleContrat, modeleContratForm, addModeleContratModalRef, modeleContratnew,
      description, descriptionError, isEditorReady, tinymceApiKey,handleEditorInit,
    };
  },
};
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