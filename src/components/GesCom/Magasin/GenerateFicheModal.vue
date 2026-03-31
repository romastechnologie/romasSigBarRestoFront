<template>
  <div class="modal fade" id="GenerateFicheModal" tabindex="-1" role="dialog" ref="addGenerateFicheModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <!-- <h4 class="modal-title">{{ title }}</h4> -->
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <!-- <Form ref="generateFicheForm" @submit="addGenerateFiche" :validation-schema="generateFicheSchema">
                      <div class="row">
                        
                      <div class="col-md-12  mb-3">
                        <div class="form-group">
                          <label class="d-block text-black fw-semibold mb-10">
                            Magasin <span class="text-danger">*</span>
                          </label>
                          <Field  name="magasin"  v-slot="{ field }">
                            <Multiselect
                              :options="magasinOptions"
                              :searchable="true"
                              track-by="label"
                              label="label"
                              v-model = "field.value"
                              v-bind = "field"
                              placeholder="Sélectionner le magasin"
                            />
                          </Field>  
                          <ErrorMessage name="magasin" class="text-danger"/>
                        </div>
                      </div>
                     
                      <button class="btn btn-primary" type="submit">
                      {{ btntext }}
                      </button>
                </div>
                    </Form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
// import ApiService from '@/services/ApiService';
// import * as Yup from 'yup';
// import { hideModal } from '@/utils/utils';
// import { GenerateFiche } from '@/models/GenerateFiche';
// import { error , success } from '@/utils/utils';
// import { useRouter } from 'vue-router';
// import Multiselect from '@vueform/multiselect';
// import axios from 'axios';

export default defineComponent({
    name: "GenerateFicheModal",
    components: {
    Form,
    Field,
    ErrorMessage,
    //Multiselect
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  // setup(props, { emit }){
  //   const generateFicheSchema = Yup.object().shape({
  //     magasin: Yup.string().required('Le generateFicheier est obligatoire'),
      
  //   });

  //   const generateFicheForm = ref<GenerateFiche | null>(null);
  //   const addGenerateFicheModalRef = ref<null | HTMLElement>(null);
  //   const router = useRouter();
  //   const magasinOptions = ref([]);
  //   const localItem = ref(props.item);
  //   const isUPDATE = ref(false);
  //   const title = ref("Ajouter un generateFiche");
  //   const btntext = ref('Ajouter');
  //   const estPrincipal = ref(false);

  //   onMounted(async () => {
  //     await fetchMagasin();
  //   });

  //   watch(() => props.item, (newValue) => {
  //     getGenerateFiche(newValue);
  //     isUPDATE.value = true;
  //     btnTitle();
  //   });

  //   const btnTitle = async () => {
  //     if (isUPDATE.value) {
  //        title.value = "Modifier le generateFiche";
  //        btntext.value = "Modifier";
  //     }else{
  //        title.value = "Ajouter un generateFiche";
  //        btntext.value = "Ajouter";
  //     }
  //   }

  //   const getGenerateFiche = async (id: number) => {
  //     return ApiService.get("/generateFiches/"+id)
  //     .then(({ data }) => {
  //       const donnees = data.data;
  //       for (const key in donnees) {
  //         generateFicheForm.value?.setFieldValue(key, 
  //         (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
  //         );
  //       }
  //       emit('openmodal', addGenerateFicheModalRef.value);

  //     })
  //     .catch(({ response }) => {
  //       error(response.data.message)
  //     });
  //   }

  //   const fetchMagasin = async () => {
  //     try {
  //       console.log("4nkjnkj ===> ");
  //       const response = await axios.get('all/all/magasins');
  //       const magasinData = response.data.data.data;
  //       console.log("TTTTTTTTTTtt ===> ",magasinData);
  //       magasinOptions.value = magasinData.map((magasin) => ({
  //         value: magasin.id,
  //         label: magasin.nomMagasin,
  //       }));
  //     } catch (error) {
  //       console.log("RRYRYFJGHB ==> ",error);
  //     }
  //   };

    

  //   const addGenerateFiche = async (values: any, generateFicheForm) => {
  //     values = values as GenerateFiche;
  //     console.log("ZZZZZZZZZZZ ===> ",isUPDATE.value)
  //     if(isUPDATE.value){
  //       ApiService.put("/generateFiches/"+values.id,values)
  //       .then(({ data }) => {
  //           if(data.code == 200) { 
  //             success(data.message);
  //             generateFicheForm.resetForm();
  //             hideModal(addGenerateFicheModalRef.value);
  //             isUPDATE.value=false;
  //             btnTitle();
  //             emit('close');
  //           }
  //       })
  //       .catch(({ response }) => {
  //           error(response.data.message);
  //       });
  //     }else{
  //       console.log("Création ===> ",values);
  //       ApiService.post("/generateFiches",values)
  //       .then(({ data }) => {
  //           if(data.code == 201) { 
  //             success(data.message);
  //             generateFicheForm.resetForm();
  //             hideModal(addGenerateFicheModalRef.value);
  //             emit('close');
  //           }
  //       })
  //       .catch(({ response }) => {
  //           error(response.data.message);
  //       });
  //     }
  //   };

  //   const resetValue = () => {
  //     const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
  //       isUPDATE.value=false;
  //     formFields.forEach(field => {
  //       field.value = '';
  //     });
  //     btnTitle()
  //   };

  //   return { generateFicheSchema,
  //     addGenerateFicheModalRef,
  //     addGenerateFiche,
  //     generateFicheForm,
  //     title,btntext,resetValue,
  //     magasinOptions,
  //   };
  // },
});
</script>