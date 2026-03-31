<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Modifier un point de vente</h3>
    </div>
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="pointVenteForm" @submit="editPointVente" :validation-schema="pointVenteSchema" :initial-values="pointVenteForm">
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
                <Field  name="personnel"  v-slot="{ field }">
                  <Multiselect
                    :options="personnelOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le personnel"
                  />
                </Field>  
              </div>
              <ErrorMessage name="personnel" class="text-danger"/>
            </div>
           
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit">
                    Modifier
                </button>
                <router-link to="/point-ventes/liste-point-ventes" 
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

import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { PointVente} from '@/models/PointVente';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditPointVente",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const pointVenteSchema = Yup.object().shape({
      nomPointVente: Yup.string().required('Le nom est obligatoire'),
      adresse: Yup.string().required('L\' adresse est obligatoire'),
      personnel: Yup.string().notRequired(),
      //societe: Yup.string().required('La société est obligatoire'),
    });

    const pointVenteForm = ref<PointVente>();
    const router = useRouter();
    const route = useRoute();
    const personnelOptions = ref([]);
   
    function getPointVente(id:number) {
      ApiService.get("/pointVentes/"+id.toString())
        .then(({ data }) => {
          console.log("data",data)
          for (const key in data.data) {
            pointVenteForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editPointVente = async (values, {resetForm}) => {
      
      console.log('data', values)
      ApiService.put("/pointVentes/" + route.params.id, values)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListePointVente" });
          }
        }).catch(({ response }) => {
          console.log(response, "je suis là")
          error(response.data.message);
        });
    };

    const fetchPersonnel = async () => {
      try {
        const response = await ApiService.get('/all/users');
        //const personnelData = response.data.data.data;
        personnelOptions.value = response.data.data.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom} ${personnel.prenom}`,
        }));
      } catch (error) {
        //
      }
    };

    

    onMounted(() => {
      fetchPersonnel();
      if(route.params.id) {
        getPointVente(parseInt(route.params.id as string));
      }
      
    });

    return { 
      pointVenteSchema, editPointVente, pointVenteForm,
        personnelOptions
    };
  },
});
</script>