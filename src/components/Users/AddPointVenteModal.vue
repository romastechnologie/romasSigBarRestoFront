<template>
  <div class="modal fade" id="AddPointVenteModal" tabindex="-1" role="dialog" ref="addAddPointVenteModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Ajout de point de vente</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h5>Vous êtes sur le point de complèter de (s) point (s) de vente (s) à: {{ selectedUser?.nom }} {{ selectedUser?.prenom }}</h5>
                      <Form ref="passForm" @submit="addPointVente" :validation-schema="passSchema">
                        <div class="row">
                          <div class="col-md-12 mb-4">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Point de vente <span class="text-danger">*</span>
                              </label>
                              <Multiselect
                                v-model = "pointVentes"
                                :options="pointVenteOptions"
                                :close-on-select="false"
                                :preserve-search="true"
                                :clear-on-select="false"
                                :multiple="true"
                                :searchable="true"
                                mode="tags"
                                placeholder="Sélectionner un point de vente"
                                label="label"
                                track-by="label"
                              />
                              <span class="text-danger" v-if="showMErr">Le point de vente est obligatoire</span>
                            </div>
                          </div>
                          <button ref="submitButton"
                            class="btn btn-primary"
                            type="submit"
                          >
                            Envoyer
                          </button>
                        </div>
                      </Form>
                </div>
                <!-- <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-primary" type="button">Save changes</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { User } from '@/models/users';
import Multiselect from '@vueform/multiselect'

import axios from 'axios';
//import store from "./ListeUser.vue";

export default {
  name: "AddPointVenteModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    

  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    selectedUser: Object as () => User | undefined,
  },
  setup: (props : any, { emit }: { emit: Function }) => {
    const passSchema = Yup.object().shape({
      //pointVentes: Yup.array().required('Le rôle est obligatoire'),
    });

      const passForm =  ref<User | null>(null);
      const addAddPointVenteModalRef = ref<null | HTMLElement>(null);
      //const router = useRouter();
      const userForm = ref<User>();
      const route = useRoute();
      const pointVenteOptions = ref([]);
      const submitButton = ref<HTMLButtonElement | null>(null);
      const pointVentes = ref([])
      const showMErr = ref(false);
      
      const addPointVente = async (values:any, {resetForm}: {resetForm: () => void  }) => {
        
        if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }
        values['pointventes']=pointVentes.value
        // .map(pointVente => pointVente.value)
        // if(pointVentes.value.length === 0) {
        //   showMErr.value = true;
        // }
        // else {
        //   showMErr.value = false;
        // }
        console.log('ton ton', selectedUser.value)
        console.log('eokeok', values)
      if(showMErr.value === false) {
        ApiService.post("/pointventes/users/"+selectedUser.value?.id, values)
        .then(({ data }) => {
          if (data.code == 200) {
          success(data.message);
          resetForm();
          hideModal(addAddPointVenteModalRef.value);
          emit('close');
         
        }
        }).catch(({ response }) => {
          submitButton.value!.disabled = false;
          error(response.data.message);
        });
        
       
      }
      // else{
      //   showMErr.value = true;
      // }
      
    };

    function getUser(id:number) {
      ApiService.get("/users/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const selectedUser = ref<User | undefined>(undefined);
    const selectedUserId = ref<number>();

    watch(() => props.selectedUser, (newValue) => {
      selectedUser.value = newValue;
      if(newValue){
        selectedUserId.value = newValue.id;
        fetchPointVentes(selectedUserId.value);
      }
    });

    onMounted(() => {
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
        fetchPointVentes(parseInt(route.params.id as string));
      
      }
    });

    const fetchPointVentes = async (userId:any) => {
      try {
        if (selectedUserId.value) {
          console.log("TST", selectedUserId.value);
          const response = await ApiService.get(`/resteante/pointventes/${userId}`);
          const pointVentesData = response.data.data;
          pointVenteOptions.value = pointVentesData.map((pointVente:any) => ({
            value: pointVente.id,
            label: pointVente.nomPointVente,
          }));
        }
        console.log("Point de vente récupérés:", pointVenteOptions.value);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des points de vente :", error);
      }
    };

    return {passSchema,
      addPointVente,
      passForm,
      submitButton,
      addAddPointVenteModalRef,
      getUser,pointVenteOptions,
      selectedUserId,
      pointVentes,
      showMErr
    };
  },
};
</script>