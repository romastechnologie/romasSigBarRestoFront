<template>
  <div class="modal fade" id="AddDomaineActiviteModal" tabindex="-1" role="dialog" ref="addDomaineActiviteModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="domaineActiviteForm" @submit="addDomaineActivite" :validation-schema="domaineActiviteSchema">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                  <ErrorMessage name="libelle" class="text-danger"/>
                </div>
              </div>
            <button
              class="btn btn-primary"
              type="submit"
            >
            {{ btntext }}
            </button>
          </div>
        </Form>
        </div>
        <!-- <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';

import { error , success, hideModal } from '@/utils/utils';
import {DomaineActivite} from '@/models/DomaineActivite';

export default defineComponent({
    name: "AddDomaineActiviteModal",
    components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const domaineActiviteSchema = Yup.object().shape({
      code: Yup.string().required("Le code est obligatoire"),
      libelle: Yup.string().required('Le libellé est obligatoire'),
    });

    const domaineActiviteForm = ref<DomaineActivite | null>(null);
    const addDomaineActiviteModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un domaine");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getDomaineActivite(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le domaine";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un domaine";
         btntext.value = "Ajouter";
      }
    }

    const getDomaineActivite = async (id: number) => {
      return ApiService.get("/domaines/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          domaineActiviteForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addDomaineActiviteModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addDomaineActivite = async (values: any, domaineActiviteForm) => {
      values = values as DomaineActivite;
      if(isUPDATE.value){
        ApiService.put("/domaines/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              domaineActiviteForm.resetForm();
              hideModal(addDomaineActiviteModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/domaines",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              domaineActiviteForm.resetForm();
              hideModal(addDomaineActiviteModalRef.value);
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
        isUPDATE.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return { domaineActiviteSchema,
      addDomaineActiviteModalRef,
      addDomaineActivite,
      domaineActiviteForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/DomaineActivite