<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="banqueForm" @submit="addBanque" :validation-schema="banqueSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
           
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denominationBanque" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la dénomination"/>
                <ErrorMessage name="denominationBanque" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresse" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresse" class="text-danger"/>
              </div>
            </div>
<!--<div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Societe <span class="text-danger">*</span>
                </label>
                <Field  name="societe"  v-slot="{ field }">
                  <Multiselect
                    :options="societeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la societe"
                  />
                </Field>  
              </div>
              <ErrorMessage name="societe" class="text-danger"/>
            </div>-->
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter une banque
                </button>
                <router-link to="/banques/liste-banques" 
                    class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, watch,onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Banque } from '@/models/Banque';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddBanque",
    components: {
    Form,
    Field,
    ErrorMessage,
    //Multiselect
  },
  setup: () => {
    const banqueSchema = Yup.object().shape({
      sigle: Yup.string().required('Le sigle est obligatoire'),
      adresse: Yup.string().required('L\'adresse est obligatoire'),
      denominationBanque: Yup.string().required('La dénomination est obligatoire'),
      //societe: Yup.string().required('La societe est obligatoire'),
    });
    
    const banqueForm =  ref<Banque | null>(null);
    const router = useRouter();
    const societeOptions = ref([]);

    const addBanque = async (values, {resetForm}) => {
      ApiService.post("/banques",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeBanque" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchSociete = async () => {
      try {
        const response = await ApiService.get('/societes');
        const societeData = response.data.data.data;
        societeOptions.value = societeData.map((societe) => ({
          value: societe.id,
          label: `${societe.denominationBanque}`,
        }));
      } catch (error) {
        //
      }
    };


    onMounted(() => {
      fetchSociete();
    });

    return { banqueSchema,
       addBanque,
        banqueForm,societeOptions
      };
  },
});
</script>