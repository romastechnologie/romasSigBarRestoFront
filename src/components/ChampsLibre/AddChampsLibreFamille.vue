<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="champsLibreFamilleForm" @submit="addChampsLibreFamille" :validation-schema="champsLibreFamilleSchema">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Famille <span class="text-danger">*</span>
              </label>
              <Field name="famille" v-slot="{ field }">
                <Multiselect v-model="field.value" :options="familleOptions" :searchable="true" track-by="label"
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
                  track-by="label" label="label" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner le champ" />
              </Field>
              <ErrorMessage name="champslibre" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un champs affecté
              </button>
              <router-link to="/champsLibreFamille/liste-champsLibreFamille" class=" btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import ApiService from '@/services/ApiService';
  import * as Yup from 'yup';
  import { hideModal } from '@/utils/utils';
  import { FamilleProduitChampsLibres } from "@/models/FamilleProduitChampsLibres"
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect'
  import VueMultiselect from 'vue-multiselect'

  export default defineComponent({
    name: "AddChampsLibreFamille",
    components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
    setup: () => {
      const champsLibreFamilleSchema = Yup.object().shape({
        famille: Yup.string().required("Le statut est obligatoire"),
        champslibre: Yup.array().required("Le champs est obligatoire"),
      });
      const champsLibreFamilleForm = ref(null);
      const showMErr = ref(false);
      const addChampsLibreFamilleModalRef = ref<null | HTMLElement>(null);
      let champsLibreFamille = ref<Array<FamilleProduitChampsLibres>>([]);
      const router = useRouter();
      const familleOptions = ref([]);
      const champsLibreOptions = ref([]);
      const famille = ref();
      const champslibre = ref();
      // const item = ref({ ...props.item });
      const localItem = ref();
      const isUPDATE = ref(false);
      const title = ref("Ajouter un champsLibre et Famille");
      const btntext = ref('Ajouter');
      const btnTitle = async () => {
        if (isUPDATE.value) {
          title.value = "Modifier le champsLibre et Famille";
          btntext.value = "Modifier";
        } else {
          title.value = "Ajouter un champsLibre et Famille";
          btntext.value = "Ajouter";
        }
      }
      const getAllFamille = async () => {
        console.log('Data')
        try {
          const response = await ApiService.get('/all/all/familles');
          const familleData = response.data.data.data;
          console.log('response', response)
          familleOptions.value = familleData.map((famille) => ({
            value: famille.id,
            label: `${famille.codeFamille}-${famille.libelleFamille}`,
          }));
        }
        catch (error) {
          //error(response.data.message)
        }
      }
      const getAllChampsLibre = async () => {
        console.log('Data')
        try {
          const response = await ApiService.get('/all/all/champsLibres');
          const champsLibreData = response.data.data.data;
          console.log('response', response)
          champsLibreOptions.value = champsLibreData.map((champsLibres) => ({
            value: champsLibres.id,
            label: champsLibres.nomChamp+` [${champsLibres.libelleChamp}]`,
          }));
        }
        catch (error) {
          //error(response.data.message)
        }
      }
      const addChampsLibreFamille = async (values: any, { resetForm }) => {
        // values['famille'] = famille.value.value
        // values['champslibre'] = champslibre.value.value 
        values = values as FamilleProduitChampsLibres;
        console.log('Données envoyées', values)
        ApiService.post("/familleProduitChampsLibres", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              resetForm();
              router.push("/champsLibreFamille/liste-champsLibreFamille");
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
      const resetValue = () => {
        const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value = false;
        formFields.forEach(field => {
          field.value = '';
        });
        btnTitle()
      };
      onMounted(async () => {
        await getAllFamille();
        await getAllChampsLibre();
      });
      return {
        champsLibreFamilleSchema,
        addChampsLibreFamilleModalRef,
        addChampsLibreFamille,
        champsLibreFamilleForm,
        title, btntext, resetValue,
        familleOptions, champsLibreOptions, famille, champslibre
      };
    },
  });
  </script>