<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="champsLibreFamilleForm" @submit="editChampsLibreFamille" :validation-schema="champsLibreFamilleSchema" :initial-values="initialValues">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Famille <span class="text-danger">*</span>
              </label>
              <Field name="famille" v-slot="{ field }">
                <Multiselect v-model="famille" :options="familleOptions" :searchable="true" track-by="label"
                  label="label" placeholder="Sélectionner la Famille" v-bind="field" />
              </Field>
              <ErrorMessage name="famille" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Champs Descriptif <span class="text-danger">*</span>
              </label>
              <Field name="champslibre" v-slot="{ field }">
                <Multiselect :options="champsLibreOptions" :searchable="true" :preserve-search="true" mode="tags"
                  track-by="label" label="label" v-model="champslibre" v-bind="field"
                  placeholder="Sélectionner le champ" />
              </Field>
              <ErrorMessage name="champslibre" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit">
                Modifier un champ affecté
              </button>
              <router-link to="/champsLibreFamille/liste-champsLibreFamille" class="btn btn-danger">
                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler
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
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from '@vueform/multiselect';
import { FamilleProduitChampsLibres } from "@/models/FamilleProduitChampsLibres";

export default defineComponent({
  name: "EditChampsLibreFamille",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const champsLibreFamilleSchema = Yup.object().shape({
      famille: Yup.string().required("La famille est obligatoire"),
      champslibre: Yup.array().required("Le champ descriptif est obligatoire"),
    });

    const champsLibreFamilleForm = ref<any>(null); // Référence au composant Form
    const router = useRouter();
    const route = useRoute();
    const familleOptions = ref<any[]>([]);
    const champsLibreOptions = ref<any[]>([]);
    const famille = ref<string | null>(null); // Variable réactive pour le champ famille
    const champslibre = ref<string[]>([]); // Variable réactive pour le champ champslibre
    const initialValues = ref({});

    const getAllFamille = async () => {
      try {
        const response = await ApiService.get('/all/all/familles');
        const familleData = response.data.data.data;
        familleOptions.value = familleData.map((famille: any) => ({
          value: famille.id,
          label: `${famille.codeFamille}-${famille.libelleFamille}`,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des familles");
      }
    };

    const getAllChampsLibre = async () => {
      try {
        const response = await ApiService.get('/all/all/champsLibres');
        const champsLibreData = response.data.data.data;
        champsLibreOptions.value = champsLibreData.map((champsLibres: any) => ({
          value: champsLibres.id,
          label: `${champsLibres.nomChamp} [${champsLibres.libelleChamp}]`,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des champs libres");
      }
    };

    const getChampsLibreFamille = async (id: number) => {
      try {
        const { data } = await ApiService.get(`/familleProduitChampsLibres/${id}`);
        console.log('Données récupérées:', data.data);

        // Synchroniser les variables réactives
        famille.value = data.data.famille; // Assurez-vous que c’est un ID (string)
        champslibre.value = data.data.champslibre; // Assurez-vous que c’est un tableau d’IDs (string[])

        // Définir les valeurs initiales pour le formulaire
        initialValues.value = {
          id: data.data.id,
          famille: data.data.famille,
          champslibre: data.data.champslibre,
        };

        // Mettre à jour le formulaire
        if (champsLibreFamilleForm.value) {
          champsLibreFamilleForm.value.setValues(initialValues.value);
          console.log('Valeurs assignées au formulaire:', initialValues.value);
        }
      } catch ({ response }) {
        error(response?.data?.message || "Erreur lors de la récupération des données");
      }
    };

    const editChampsLibreFamille = async (values: any, { resetForm }: any) => {
      console.log('Valeurs envoyées à l’API:', values);
      try {
        const { data } = await ApiService.put(`/familleProduitChampsLibres/${values.id}`, values);
        if (data.code === 200) {
          success(data.message);
          resetForm();
          router.push("/champsLibreFamille/liste-champsLibreFamille");
        }
      } catch ({ response }) {
        error(response.data.message);
      }
    };

    onMounted(async () => {
      await getAllFamille();
      await getAllChampsLibre();
      if (route.params.id) {
        await getChampsLibreFamille(parseInt(route.params.id as string));
      }
    });

    return {
      champsLibreFamilleSchema,
      editChampsLibreFamille,
      champsLibreFamilleForm,
      familleOptions,
      champsLibreOptions,
      famille,
      champslibre,
      initialValues,
    };
  },
});
</script>