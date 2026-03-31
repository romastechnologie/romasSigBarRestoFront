<template>
  <div class="modal fade" id="AddTaxeModal" tabindex="-1" role="dialog" ref="addTaxeModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="taxeForm" @submit="addTaxe" :validation-schema="taxeSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="codeTaxe" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le codeTaxe"/>
                  <ErrorMessage name="codeTaxe" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelleTaxe" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                  <ErrorMessage name="libelleTaxe" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Appelation <span class="text-danger">*</span>
                </label>
                <Field name="appelation" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: TVA"/>
                <ErrorMessage name="appelation" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de taux <span class="text-danger">*</span>
                </label>
                <Field  name="typeTaux"  v-slot="{ field }">
                  <Multiselect
                    :options="['%' ,'Quantite', 'Montant']"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type de taux"
                  />
                </Field>  
                <ErrorMessage name="typeTaux" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Valeur taxe <span class="text-danger">*</span>
                </label>
                <Field name="valeurTaxe" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 18"/>
                <ErrorMessage name="valeurTaxe" class="text-danger"/>
              </div>
            </div>
           <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sens <span class="text-danger">*</span>
              </label>
              <Field  name="sens"  type="text"  v-slot="{ field }">
                <Multiselect
                  :searchable = "true"
                  :options = "['Déductible', 'Collecté']"
                  v-model = "field.value"
                  v-bind = "field"
                  placeholder="Sélectionner le sens"
                />
              </Field>
                <ErrorMessage name="sens" class="text-danger"/>
            </div>
          </div>
          <button
               ref="submitButton" 
              class="btn btn-primary"
              type="submit"
            >
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
import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { Taxe } from '../../../models/Taxe';
import { error, success, hideModal } from '../../../utils/utils';
import Multiselect from '@vueform/multiselect';

export default defineComponent({
  name: "AddTaxeModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const taxeSchema = Yup.object().shape({
      codeTaxe: Yup.string().required("Le codeTaxe est obligatoire"),
      libelleTaxe: Yup.string().required('Le libellé est obligatoire'),
      typeTaux: Yup.string().notRequired(),
      valeurTaxe: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur taxe est obligatoire'),
      appelation: Yup.string().required('L\'appelation est obligatoire'),
      sens: Yup.string().required('Le sens est obligatoire'),
    });

    const taxeForm = ref<any>(null);
    const addTaxeModalRef = ref<HTMLElement | null>(null);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une taxe");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      if (newValue) {
        getTaxe(newValue);
        isUPDATE.value = true;
        btnTitle();
      }
    });

    const btnTitle = () => {
      if (isUPDATE.value) {
        title.value = "Modifier la taxe";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter une taxe";
        btntext.value = "Ajouter";
      }
    };

    const getTaxe = async (id: number) => {
      return ApiService.get("/taxes/" + id)
        .then(({ data }) => {
          const donnees = data.data;
          for (const key in donnees) {
            taxeForm.value?.setFieldValue(
              key,
              typeof donnees[key] === 'object' && donnees[key] !== null ? donnees[key].id : donnees[key]
            );
          }
          emit('openmodal', addTaxeModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const addTaxe = async (values: any, { resetForm }) => {
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }
      values = values as Taxe;
      if (isUPDATE.value) {
        ApiService.put("/taxes/" + values.id, values)
          .then(({ data }) => {
            if (data.code === 200) {
              success(data.message);
              resetForm();
              hideModal(addTaxeModalRef.value);
              isUPDATE.value = false;
              btnTitle();
             
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        ApiService.post("/taxes", values)
          .then(({ data }) => {
            if (data.code === 201) {
              success(data.message);
              resetForm();
              hideModal(addTaxeModalRef.value);
              emit('close');
            }
          })
          .catch(({ response }) => {
            submitButton.value!.disabled = false;
            error(response.data.message);
          });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isUPDATE.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle();
    };

    return {
      taxeSchema,
      addTaxeModalRef,
      addTaxe,
      taxeForm,
      submitButton,
      title,
      btntext,
      resetValue,
    };
  },
});
</script>

