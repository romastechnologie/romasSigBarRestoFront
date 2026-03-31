<template>
  <div
    class="modal fade createNewModal"
    id="AddCaisseModal"
    tabindex="-1"
    ref="addCaisseModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="caisseForm" @submit="addCaisse" :validation-schema="caisseSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    code <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="code"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer code"
                  />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    nom <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="nom"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer nom"
                  />
                  <ErrorMessage name="nom" class="text-danger" />
                </div>
              </div>

              <!-- <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date d'ouverture <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="dateOuverture"
                    type="date"
                    class="form-control shadow-none fs-md-15 text-black"
                  />
                  <ErrorMessage name="dateOuverture" class="text-danger" />
                </div>
              </div> -->

              <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Point de vente<span class="text-danger">*</span>
                </label>
                <Field name="pointvente" v-slot="{ field }">
                  <Multiselect
                    :options="pointventeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner le point de vente "
                  />
                </Field>  
              </div>
              <ErrorMessage name="pointvente" class="text-danger"/>
            </div>
            </div>

            <div class="d-flex justify-content-end mt-20 mt-md-25">
              <button
                class="btn btn-primary me-3"
                type="submit"
              >
                {{ btntext }}
              </button>
            </div>
          </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Caisse } from '@/models/Caisse';
import { PointVente } from '@/models/PointVente';

export default defineComponent({
  name: 'AddCaisseModal',
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const caisseSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      // dateOuverture: Yup.date().required('La date est obligatoire').typeError('La date doit être valide'),
      // total_encaissement: Yup.number()
      //   .required('Le total encaissement est obligatoire')
      //   .min(0, 'Le total encaissement doit être positif'),
      // total_decaissement: Yup.number()
      //   .required('Le total décaissement est obligatoire')
      //   .min(0, 'Le total décaissement doit être positif'),
      // ecart: Yup.number().required('L\'écart est obligatoire'),
      // cloture: Yup.boolean().required('La clôture est obligatoire'),
      pointvente: Yup.number().required('Le\' point de vente est obligatoire'),
    });

    
    const pointventeOptions=ref([]);
    const pointvente = ref(null);
    const caisseForm = ref<InstanceType<typeof Form> | null>(null);
    const addCaisseModalRef = ref<HTMLElement | null>(null);
    const isUPDATE = ref(false);
    const title = ref('Ajouter une caisse');
    const btntext = ref('Enregistrer');
    const pointventes = ref<PointVente[]>([]);
    const selectedPointventeId = ref<number | null>(null);
    const selectedCloture = ref<boolean | null>(null);

    watch(
      () => props.item,
      (newValue) => {
        if (newValue) {
          getCaisse(newValue);
          isUPDATE.value = true;
          btnTitle();
        }
      }
    );

    const btnTitle = () => {
      if (isUPDATE.value) {
        title.value = 'Modifier la caisse';
        btntext.value = 'Modifier';
      } else {
        title.value = 'Modifier une caisse';
        btntext.value = 'Enregistrer';
      }
    };

  const fetchPointVentes = async () => {
  ApiService.get("/all/pointventes") 
    .then(({ data }) => {
      const donnees = data.data.data;
      pointventeOptions.value = donnees.map((pointventeUser) => ({
        label: `${pointventeUser.nomPointVente}`,
        value: pointventeUser.id,
      }));
      pointventes.value = donnees; 
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};



    function getCaisse(id: string) {
  ApiService.get(`/caisses/${id}`)
    .then(({ data }) => {
      const donnees = data.data;
      for (const key in donnees) {
        caisseForm.value?.setFieldValue(
          key,
          typeof donnees[key] === 'object' && donnees[key] !== null
            ? donnees[key].id
            : donnees[key]
        );
      }
      selectedPointventeId.value = donnees.agenceId;
      selectedCloture.value = donnees.cloture;
      emit('openmodal', addCaisseModalRef.value);
    })
    .catch(( err:any ) => {
      //
    });
}


    function addCaisse(values: any) {
  values = values as Caisse;

  if (isUPDATE.value) {
    ApiService.put(`/caisses/${values.id}`, values)
      .then(({ data }) => {
        if (data.code === 200) {
          success(data.message);
          caisseForm.value?.resetForm();
          hideModal(addCaisseModalRef.value);
          isUPDATE.value = false;
          btnTitle();
          emit('close');
        }
      })
      .catch(({ response }) => {
        error(response?.data?.message || 'Erreur lors de l\'enregistrement de la caisse');
      });
  } else {
    ApiService.post('/caisses', values)
      .then(({ data }) => {
        if (data.code === 201) {
          success(data.message);
          caisseForm.value?.resetForm();
          hideModal(addCaisseModalRef.value);
          emit('close');
        }
      })
      .catch(({ response }) => {
        error(response?.data?.message || 'Erreur lors de l\'enregistrement de la caisse');
      });
  }
}


    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input, textarea, select'
      );
      isUPDATE.value = false;
      formFields.forEach((field) => {
        field.value = '';
      });
      selectedPointventeId.value = null;
      selectedCloture.value = null;
      btnTitle();
    };

    onMounted(() => {
      fetchPointVentes();
    });

    return {
      caisseSchema,
      addCaisseModalRef,
      addCaisse,
      pointvente,
      pointventeOptions,
      caisseForm,
      title,
      btntext,
      resetValue,
    };
  },
});
</script>