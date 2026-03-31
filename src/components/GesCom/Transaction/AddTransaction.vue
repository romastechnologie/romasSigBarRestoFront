<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="transactionForm" @submit="addTransaction" :validation-schema="transactionSchema">
          <div class="row">
              <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type opération <span class="text-danger">*</span>
                </label>
                <Field  name="typeOperation"  v-slot="{ field }">
                  <Multiselect
                    :options="typeOperationOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type d'operation"
                  />
                </Field>  
              <ErrorMessage name="typeOperation" class="text-danger"/>
            </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Client <span class="text-danger">*</span>
                </label>
                <Field  name="client"  v-slot="{ field }">
                  <Multiselect
                    :options="clientOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le client"
                  />
                </Field>  
              </div>
              <ErrorMessage name="client" class="text-danger"/>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Mode de règlement <span class="text-danger">*</span>
                </label>
                <Field  name="modeReglement"  v-slot="{ field }">
                  <Multiselect
                    :options="modeReglementOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le mode de règlement"
                  />
                </Field>  
              </div>
              <ErrorMessage name="modeReglement" class="text-danger"/>
            </div>
                <!-- <div class="form-group mb-15 mb-sm-20 mb-md-25">
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
              </div> -->
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Référence <span class="text-danger">*</span>
                </label>
                <Field name="refTrans" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la référence"/>
                <ErrorMessage name="refTrans" class="text-danger"/>
              </div>
            </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant <span class="text-danger">*</span>
                </label>
                <Field name="montTrans" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montTrans" class="text-danger"/>
              </div>
            </div>
            
            <!-- <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Banque <span class="text-danger">*</span>
                </label>
                <Field  name="banque"  v-slot="{ field }">
                  <Multiselect
                    :options="banqueOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la banque"
                  />
                </Field>  
              </div>
              <ErrorMessage name="banque" class="text-danger"/>
            </div> -->
            <!-- <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Compte <span class="text-danger">*</span>
                </label>
                <Field  name="compte"  v-slot="{ field }">
                  <Multiselect
                    :options="compteOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le compte"
                  />
                </Field>  
              </div>
              <ErrorMessage name="compte" class="text-danger"/>
            </div> -->
            
            <div class="col-md-12 mt-3">
              <div class="d-flex justify-content-start mb-4">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                  Faire une transaction
                </button>
                <router-link to="/transactions/liste-transactions" 
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

import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Transaction } from '@/models/Transaction';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddTransaction",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const transactionSchema = Yup.object().shape({
      client: Yup.string().required('Le client est obligatoire'),
      typeOperation: Yup.string().required('Le type d\'operation est obligatoire'),
      refTrans: Yup.string().required("La référence est obligatoire"),
      modeReglement: Yup.string().required("Le modeReglement est obligatoire"),
      montTrans: Yup.number().typeError('Veuillez entrer des chiffres').required('Le montant est obligatoire'),
    });

    const transactionForm =  ref<Transaction | null>(null);
    const router = useRouter();
    const banqueOptions = ref([]);
    const modeReglementOptions = ref([]);
    const clientOptions = ref([]);
    const typeOperationOptions = ref([]);

    const fetchModeReglement = async () => {
      try {
        const response = await ApiService.get('all/modes-reglement');
        const modeReglementsData = response.data.data.data;
        modeReglementOptions.value = modeReglementsData.map((modeReglement) => ({
          value: modeReglement.id,
          label: `${modeReglement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get('all/clients');
        const clientData = response.data.data.data;
        clientOptions.value = clientData.map((client) => ({
          value: client.id,
          label: `${client.nomClient}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchTypeOperation = async () => {
      try {
        const response = await ApiService.get('/all/typeOperations');
        const typeOperationData = response.data.data.data;
        typeOperationOptions.value = typeOperationData.map((typeOperation) => ({
          value: typeOperation.id,
          label: `${typeOperation.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(()=> {
      fetchModeReglement();
      fetchClient();
      fetchTypeOperation();
    })
    
    const addTransaction = async (values, {resetForm}) => {
      ApiService.post("/transactions",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeTransactionPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { transactionSchema,
       addTransaction,
        transactionForm,
        typeOperationOptions,clientOptions,
        modeReglementOptions,
      };
  },
});
</script>