<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter un point de vente</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="pointVenteForm" @submit="addPointVente" :validation-schema="pointVenteSchema">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom point de vente <span class="text-danger">*</span>
              </label>
              <Field name="nomPointVente" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
              <ErrorMessage name="nomPointVente" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Adresse <span class="text-danger">*</span>
              </label>
              <Field name="adresse" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
              <ErrorMessage name="adresse" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom gérant
              </label>
              <Field name="personnel" v-slot="{ field }">
                <Multiselect
                  :options="personnelOptions"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le personnel"
                />
              </Field>
            </div>
            <ErrorMessage name="personnel" class="text-danger"/>
          </div>
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button  ref="submitButton" class="btn btn-success me-3" type="submit">
                Ajouter un point de vente
              </button>
              <router-link to="/point-ventes/liste-point-ventes" class="btn btn-danger">
                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                Annuler
              </router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { PointVente } from '@/models/PointVente';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';

export default defineComponent({
  name: "AddPointVente",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup() {
    const pointVenteSchema = Yup.object().shape({
      nomPointVente: Yup.string().required('Le nom est obligatoire'),
      adresse: Yup.string().required('L\'adresse est obligatoire'),
      personnel: Yup.string().notRequired(),
    });

    const pointVenteForm = ref<PointVente | null>(null);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const router = useRouter();
    const personnelOptions = ref([]);
    
    const addPointVente = async (values, { resetForm }) => {
     
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }
      try {
        values['code'] = 'PV_' + values.nomPointVente.replace(/\s+/g, '').substring(0, 3).toUpperCase();
        values['tel'] = '-';
        values['estPrincipal'] = false;
        values['estSup'] = false;
        const { data } = await ApiService.post("/pointVentes", values);
        if (data.code === 201) {
          success(data.message);
          resetForm();
          router.push({ name: "ListePointVente" });
        } else {
          error('Une erreur est survenue lors de l\'ajout du point de vente.');
        }
      } catch (err) {
        submitButton.value!.disabled = false;
        error(err.response?.data?.message || 'Erreur lors de l\'ajout du point de vente.');
      }
    };

    const fetchPersonnel = async () => {
      try {
        const response = await ApiService.get('/all/users');
        personnelOptions.value = response.data.data.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom} ${personnel.prenom}`,
        }));
      } catch (err) {
        error('Erreur lors de la récupération des personnels.');
      }
    };

    onMounted(() => {
      fetchPersonnel();
    });

    return { 
      pointVenteSchema,
      addPointVente,
      pointVenteForm,
      submitButton,
      personnelOptions
    };
  },
});
</script>
