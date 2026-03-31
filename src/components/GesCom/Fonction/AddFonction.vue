<template>
    <div class="modal fade" id="AddFonction" tabindex="-1" role="dialog" ref="addFonctionRef" aria-labelledby="tooltipmodal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ title }}</h4>
            <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Form ref="fonctionForm" @submit="addFonction" :validation-schema="fonctionSchema">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Libellé <span class="text-danger">*</span>
                    </label>
                    <Field name="libelle" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                    <ErrorMessage name="libelle" class="text-danger"/>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Description
                    </label>
                    <Field name="description" type="text" 
                      class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer une description (optionnel)"/>
                    <ErrorMessage name="description" class="text-danger"/>
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
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import ApiService from '@/services/ApiService';
  import * as Yup from 'yup';
  import { hideModal } from '@/utils/utils';
  import { ModeReglement } from '@/models/ModeReglement';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
import { Fonction } from '@/models/Fonction';
  
  export default defineComponent({
    name: "AddFonctionPage",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    props: {
      item: {
        type: Number,
        default: 0,
      }
    },
    setup(props, { emit }) {
      const fonctionSchema = Yup.object().shape({
        libelle: Yup.string().required('Le libellé est obligatoire'),
        description: Yup.string().nullable(), 
      });
  
      const fonctionForm = ref<any>(null); 
      const addFonctionRef = ref<null | HTMLElement>(null);
      const router = useRouter();
      const isUPDATE = ref(false);
      const title = ref("Ajouter une fonction");
      const btntext = ref('Ajouter');
  
      
      const btnTitle = async () => {
        if (isUPDATE.value) {
          title.value = "Modifier une fonction";
          btntext.value = "Modifier";
        } else {
          title.value = "Ajouter une fonction";
          btntext.value = "Ajouter";
        }
      };
  
   
      const getFonction = async (id: number) => {
        return ApiService.get("/fonction/" + id)
          .then(({ data }) => {
            const donnees = data.data;
            for (const key in donnees) {
              fonctionForm.value?.setFieldValue(key, donnees[key]);
            }
            emit('openmodal', addFonctionRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      };
  
 
      watch(() => props.item, (newValue) => {
        if (newValue) {
          getFonction(newValue);
          isUPDATE.value = true;
          btnTitle();
        }
      });
  
   
      const addFonction = async (values: any, { resetForm }) => {
        values = values as Fonction;
        if (isUPDATE.value) {
          ApiService.put("/fonction/" + values.id, values)
            .then(({ data }) => {
              if (data.code === 200) {
                success(data.message);
                resetForm();
                hideModal(addFonctionRef.value);
                isUPDATE.value = false;
                btnTitle();
                emit('close');
              }
            })
            .catch(({ response }) => {
              error(response.data.message);
            });
        } else {
          ApiService.post("/fonction", values)
            .then(({ data }) => {
              if (data.code === 201) {
                success(data.message);
                resetForm();
                hideModal(addFonctionRef.value);
                emit('close');
              }
            })
            .catch(({ response }) => {
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
  
      onMounted(() => {
       
      });
  
      return {
        fonctionSchema,
        addFonctionRef,
        addFonction,
        fonctionForm,
        title,
        btntext,
        resetValue,
      };
    },
  });
  </script>