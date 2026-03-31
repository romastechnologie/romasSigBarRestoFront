<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="transfertForm" @submit="editTransfert" :validation-schema="transfertSchema" :initial-values="transfertForm">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant <span class="text-danger">*</span>
                </label>
                <Field name="montant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montant" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Magasin1 <span class="text-danger">*</span>
                </label>
                <Field  name="magasin1"  v-slot="{ field }">
                  <Multiselect
                    :options="magasin1Options"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le magasin1"
                  />
                </Field>  
              </div>
              <ErrorMessage name="magasin1" class="text-danger"/>
            </div>
            
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Magasin 2 <span class="text-danger">*</span>
                </label>
                <Field  name="magasin2"  v-slot="{ field }">
                  <Multiselect
                    :options="magasin2Options"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le magasin2"
                  />
                </Field>  
              </div>
              <ErrorMessage name="magasin2" class="text-danger"/>
            </div>

            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date <span class="text-danger">*</span>
                  </label>
                  <Field name="date" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="date" class="text-danger"/>
              </div>
            <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Motif 
                  </label>
                  <Field name="motif" as="textarea"  cols="30"
                    rows="12" placeholder="Entrer les motifs" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                  <textarea
                  class="form-control shadow-none rounded-0 text-black"
                    v-model="field.value"
                  ></textarea>
                </Field>
                  <ErrorMessage name="motif" class="text-danger"/>
                </div>
              </div>
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier un transfert
            </button>
            <router-link to="/transferts/liste-transferts" 
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
import { Transfert} from '@/models/Transfert';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditTransfert",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const transfertSchema = Yup.object().shape({
      magasin1: Yup.string().required('Le magasin1 est obligatoire'),
      magasin2: Yup.string().required('Le magasin2 est obligatoire'),
      motif: Yup.string().notRequired(),
      date: Yup.date().notRequired(),
      montant: Yup.number().typeError('Veuillez entrer des chiffres').required('Le montant est obligatoire'),
    });

    const transfertForm = ref<Transfert>();
    const router = useRouter();
    const route = useRoute();

    const magasin1Options = ref([]);
    const magasin2Options = ref([]);

    const fetchMagasin1 = async () => {
      try {
        const response = await ApiService.get('/magasins');
        const magasin1sData = response.data.data.data;
        magasin1Options.value = magasin1sData.map((magasin) => ({
          value: magasin.id,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchMagasin2 = async () => {
      try {
        const response = await ApiService.get('/magasins');
        const magasin2Data = response.data.data.data;
        magasin2Options.value = magasin2Data.map((magasin) => ({
          value: magasin.id,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(()=> {
      if(route.params.id) {
        getTransfert(parseInt(route.params.id as string));
      }
      fetchMagasin1();
      fetchMagasin2()
    })

    function getTransfert(id:number) {
      ApiService.get("/transferts/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            transfertForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editTransfert = async (values, {resetForm}) => {
      const data = transfertForm.value;
      ApiService.put("/transferts/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeTransfertPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { 
      transfertSchema, editTransfert, transfertForm,magasin1Options,
        magasin2Options,
      };
  },
});
</script>