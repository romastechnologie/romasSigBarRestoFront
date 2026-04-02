<template>
  <div class="modal fade" id="AddPosteModal" tabindex="-1" role="dialog" ref="addPosteModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="poste">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="posteForm" @submit="addPoste" :validation-schema="posteSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libelle <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libelle" />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Attribution <span class="text-danger">*</span>
                  </label>
                  <Field name="attributionpostes" v-slot="{ field }">
                    <Multiselect
                      v-bind="field"
                      :options="attributionOptions"
                      :multiple="true"
                      mode="tags"
                      placeholder="Sélectionner l'attribution"
                      label="label"
                      track-by="value"
                      :object="true"
                      @input="field.onChange($event)"
                    />
                  </Field>
                  <ErrorMessage name="attributionpostes" class="text-danger" />
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
import { onMounted, ref, watch } from 'vue';
import { Form, ErrorMessage, Field } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import Multiselect from '@vueform/multiselect';
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

export default {
  name: "AddPosteModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ["refreshPostes", 'openmodal'],

  setup(props: any, { emit }: { emit: Function }) {
    const loading = ref<boolean>(false);
    const posteSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libelle est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),
      attributionpostes: Yup.array()
        .of(
          Yup.object().shape({
            value: Yup.number().required('L\'ID de l\'attribution est requis'),
            label: Yup.string().required('Le libellé de l\'attribution est requis'),
          })
        )
        .min(1, 'Au moins une attribution est requise')
        .required('Les attributions de poste sont obligatoires'),
    });
    const posteForm = ref<any>(null);
    const addPosteModalRef = ref<null | HTMLElement>(null);
    const attributionOptions = ref<Array<{ value: number; label: string }>>([]);
    const title = ref('Ajouter un poste');
    const btntext = ref('Ajouter');
    const isupdate = ref(false);
    const router = useRouter();

    watch(() => props.id, (newValue) => {
      if (newValue !== 0) {
        getPoste(newValue);
        isupdate.value = true;
      }
      btnTitle();
    });

    const getPoste = async (id: number) => {
      return ApiService.get("/postes/" + id)
        .then(async ({ data }) => {
          console.log("Valeurs-data", data);
          console.log("API Response (attributionpostes):", data.data.attributionpostes);
          posteForm.value?.setFieldValue("id", data.data.id);
          posteForm.value?.setFieldValue("libelle", data.data.libelle);
          posteForm.value?.setFieldValue("code", data.data.code);

          // Transformer les attributionpostes en [{ value, label }]
          const selectedAttributions = data.data.attributionpostes?.map(ap => ({
            value: ap.attribution.id,
            label: ap.attribution.libelle,
          })) || [];
          posteForm.value?.setFieldValue("attributionpostes", selectedAttributions);
          await nextTick();
          emit('openmodal', addPosteModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    onMounted(async () => {
      fetchAttribution();
    });

    const btnTitle = () => {
      if (isupdate.value) {
        title.value = "Modifier le poste";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un poste";
        btntext.value = "Ajouter";
      }
    };

    const addPoste = async (values: any, { resetForm }: { resetForm: () => void }) => {
      loading.value = false;

      console.log("Données envoyées au backend :", values);

      if (isupdate.value) {
        ApiService.put(`/postes/${values.id}`, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              resetForm();
              hideModal(addPosteModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("refreshPostes");
              router.push('/postes/liste-poste');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        ApiService.post("/postes", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              resetForm();
              hideModal(addPosteModalRef.value);
              emit("refreshPostes");
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      }
    };

    const fetchAttribution = async () => {
      try {
        const response = await ApiService.get("all/attributions");
        const fonctionData = response.data.data.data;
        console.log("valeurs", fonctionData);
        attributionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.libelle}`,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des attributions :", error);
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isupdate.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle();
    };

    return {
      attributionOptions,
      title,
      btntext,
      resetValue,
      posteSchema,
      addPoste,
      posteForm,
      addPosteModalRef,
    };
  },
};
</script>