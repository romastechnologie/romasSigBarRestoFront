<template>
  <div class="modal fade" id="AddConditionnementModal" tabindex="-1" role="dialog" ref="addConditionnementModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="conditionnementForm" @submit="addConditionnement" :validation-schema="conditionnementSchema">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                  <ErrorMessage name="libelle" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Valeur
                  </label>
                  <Field name="valeur" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la valeur"/>
                  <ErrorMessage name="valeur" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mt-3">
                <div class="form-check">
                  <input 
                    id="estUniteMesure" 
                    name="estUniteMesure" 
                    v-model="estUniteMesure" 
                    type="checkbox" 
                    class="form-check-input shadow-none" 
                  />
                  <label for="estUniteMesure" class="form-check-label fw-medium position-relative top-1">
                    Est unité de mesure ?
                  </label>
                  <ErrorMessage name="estUniteMesure" class="text-danger" />
                </div>
              </div>
              <button  ref="submitButton" class="btn btn-primary" type="submit">
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
import { Conditionnement } from '@/models/Conditionnement';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "AddConditionnementModal",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const conditionnementSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libellé est obligatoire'),
      valeur: Yup.number().typeError('Veuillez entrer des nombres').required("La valeur est obligatoire"),
      estUniteMesure: Yup.boolean().notRequired(),
    });

    const conditionnementForm = ref<any>(null);
    const addConditionnementModalRef = ref<HTMLElement | null>(null);
    const router = useRouter();
    const estUniteMesure = ref(false);
    const conditionnementOptions = ref([]);
    const submitButton = ref<HTMLButtonElement | null>(null);
    
    const isUPDATE = ref(false);
    const title = ref("Ajouter un conditionnement");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      if (newValue) {
        getConditionnement(newValue);
        isUPDATE.value = true;
        btnTitle();
      }
    });

    const btnTitle = () => {
      if (isUPDATE.value) {
        title.value = "Modifier le conditionnement";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un conditionnement";
        btntext.value = "Ajouter";
      }
    };

    const getConditionnement = async (id: number) => {
      try {
        const { data } = await ApiService.get(`/conditionnements/${id}`);
        console.log("Données récupérées :", data.data);
        const donnees = data.data;

        if (conditionnementForm.value) {
          conditionnementForm.value.setValues({
            id: donnees.id, // Ajoute l’ID pour la modification
            code: donnees.code,
            libelle: donnees.libelle,
            valeur: donnees.valeur,
            estUniteMesure: donnees.estUniteMesure,
          });
        }
        estUniteMesure.value = donnees.estUniteMesure || false;
        emit('openmodal', addConditionnementModalRef.value);
      } catch ({ response }) {
        error(response?.data?.message || "Erreur lors de la récupération du conditionnement");
      }
    };

    const fetchConditionnement = async () => {
      try {
        const response = await ApiService.get('/conditionnements');
        const conditionnementData = response.data.data.data;
        conditionnementOptions.value = conditionnementData.map((conditionnement) => ({
          value: conditionnement.id,
          label: `${conditionnement.codeConditionnement} - ${conditionnement.libelleConditionnement}`,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      fetchConditionnement();
    });

    const addConditionnement = async (values: any, { resetForm }) => {

       if (submitButton.value) {
                    // eslint-disable-next-line
                    submitButton.value.disabled = true;
                  }
      const payload = {
        id: values.id, // Inclut l’ID pour la modification
        code: values.code,
        libelle: values.libelle,
        valeur: values.valeur,
        estUniteMesure: estUniteMesure.value,
      };
      console.log("Payload envoyé :", payload);

      try {
        if (isUPDATE.value) {
          const { data } = await ApiService.put(`/conditionnements/${values.id}`, payload);
          if (data.code === 200) {
            success(data.message);
            resetForm();
            hideModal(addConditionnementModalRef.value);
            isUPDATE.value = false;
            btnTitle();
            emit('close');
          }
        } else {
          const { data } = await ApiService.post("/conditionnements", payload);
          if (data.code === 201) {
            success(data.message);
            resetForm();
            hideModal(addConditionnementModalRef.value);
            emit('close');
          }
        }
      } catch ({ response }) {
         submitButton.value!.disabled = false;
        console.log("Erreur API :", response?.data);
        error(response?.data?.message || "Erreur lors de l'opération");
      }
    };

    const resetValue = () => {
      if (conditionnementForm.value) {
        conditionnementForm.value.resetForm();
      }
      estUniteMesure.value = false;
      isUPDATE.value = false;
      btnTitle();
    };

    return {
      conditionnementSchema,
      addConditionnementModalRef,
      addConditionnement,
      conditionnementForm,
      estUniteMesure,
      submitButton,
      title,
      btntext,
      resetValue,
      conditionnementOptions,
    };
  },
});
</script>