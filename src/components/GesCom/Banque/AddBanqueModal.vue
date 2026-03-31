<template>

  <div class="modal fade" id="AddBanqueModal" tabindex="-1" role="dialog" ref="addBanqueModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="banqueForm" @submit="addBanque" :validation-schema="banqueSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
           
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denominationBanque" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la dénomination"/>
                <ErrorMessage name="denominationBanque" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Code banque
                </label>
                <Field name="codeBanque" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code banque"/>
                <ErrorMessage name="adresse" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Code swift
                </label>
                <Field name="codeSwift" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code swift"/>
                <ErrorMessage name="adresse" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Identification internationale
                </label>
                <Field name="identification" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'identification internationale"/>
                <ErrorMessage name="identification" class="text-danger"/>
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
import { ref, watch,onMounted} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Banque } from '@/models/Banque';

export default {
  name: "AddBanqueModal",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
  },
  setup: (props, { emit }) => {
    const loading = ref<boolean>(false);
    const banqueSchema = Yup.object().shape({
      sigle: Yup.string().required('Le sigle est obligatoire'),
      denominationBanque: Yup.string().required('La dénomination est obligatoire'),
      codeSwift: Yup.string().notRequired(),
      codeBanque: Yup.string().notRequired(),
      identification: Yup.string().notRequired(),
    });
    const banqueForm = ref<Banque | null>(null);
    const addBanquesModalRef = ref<null | HTMLElement>(null);
    const title = ref('Ajouter une banque');
    const btntext = ref('Ajouter');
    const  isUPDATE = ref(false);
    const banqueOptions = ref([]);
    

    onMounted(() => {
      fetchBanque();
    });

    watch(() => props.id, (newValue) => {
      if (newValue != 0) {
        getBanque(newValue);
        isUPDATE.value = true;
        btnTitle();
      }

    });

    const btnTitle = async () => {
      if ( isUPDATE.value) {
        title.value = "Modifier une banque";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter une banque";
        btntext.value = "Ajouter";
      }
    }

    const getBanque = async (id: number) => {
      return ApiService.get("/banques/" + id)
        .then(({ data }) => {
          banqueForm.value?.setFieldValue("id", data.data.id);
          banqueForm.value?.setFieldValue("sigle", data.data.sigle);
          banqueForm.value?.setFieldValue("denominationBanque", data.data.denominationBanque);
          banqueForm.value?.setFieldValue("adresse", data.data.adresse);
          emit('openmodal', addBanquesModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const fetchBanque = async () => {
      try {
        const response = await ApiService.get('/banques');
        const banqueData = response.data.data.data;
        banqueOptions.value = banqueData.map((banque) => ({
          value: banque.id,
          label: `${banque.adresse} - ${banque. numCompte}`,
        }));
      } catch (error) {
        //
      }
    };


    const addBanque = async (values: any, banqueForm) => {
      values = values as Banque;
      if ( isUPDATE.value) {
        console.log('puuuttt')
        ApiService.put("/banques/"+values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              banqueForm.resetForm();
              hideModal(addBanquesModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit("close");
            }
          }) 
            .catch(({ response }) => {
            error(response.data.message)
          });
      } else {
        console.log('posttttt')
        ApiService.post("/banques", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              banqueForm.resetForm();
              hideModal(addBanquesModalRef.value);
              emit('close');
            }
          })
            .catch(({ response }) => {
            error(response.data.message)
          });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return { banqueSchema, addBanque, banqueForm,btntext, addBanquesModalRef, title, resetValue,banqueOptions };
  },
};

</script>