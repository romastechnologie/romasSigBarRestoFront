<template>

    <div class="modal fade" id="AddPermissionModal" tabindex="-1" role="dialog" ref="addPermissionModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="permissionForm" @submit="addPermission" :validation-schema="permissionSchema">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Nom <span class="text-danger">*</span>
                              </label>
                              <Field name="nom" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                              <ErrorMessage name="nom" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Description <span class="text-danger">*</span>
                              </label>
                              <Field name="description" cols="20"
                              rows="3" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                                <textarea
                                  v-model="field.value"
                                  class="form-control shadow-none rounded-0 text-black"
                                ></textarea>
                              </Field>
                              <ErrorMessage name="description" class="text-danger"/>
                            </div>
                          </div>
                          <button
                            class="btn btn-primary"
                            type="submit">
                            {{ btntext }}
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
    import { ref, watch } from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import ApiService from '@/services/ApiService';
    import { error, hideModal, success } from '@/utils/utils';
    import { Permission } from '@/models/Permission';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddPermissionModal",
      components: {
        Form,
        Field,
        ErrorMessage
      },
      props:{
        id: {
          type: Number,
          required: true,
          default:0
        },
      },
      emits: ["refreshPermissions",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const permissionSchema = Yup.object().shape({
          description: Yup.string().required('La description est obligatoire'),
          nom: Yup.string().required('Le nom est obligatoire'),
        });
    
    
        const permissionnew = ref(props.id);
        const permissionForm =  ref<Permission | null>(null);
        const addPermissionModalRef = ref<null | HTMLElement>(null);
        let permissions= ref<Array<Permission>>([]);
        const title = ref('Ajouter une permission');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getPermission(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getPermission = async (id: number) => {
          return ApiService.get("/permissions/"+id)
          .then(({ data }) => {
            permissionForm.value?.setFieldValue("id",data.data.id);
            permissionForm.value?.setFieldValue("nom",data.data.nom);
            permissionForm.value?.setFieldValue("description",data.data.description);
            emit('openmodal', addPermissionModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier la permission";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter une permission";
             btntext.value = "Ajouter";
          }
        }
    
        const addPermission = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Permission;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/permissions/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addPermissionModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshPermissions");
                router.push('/permissions/liste-permission');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/permissions",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addPermissionModalRef.value);
                //router.push('/permissions/liste-permission');
                emit("refreshPermissions");
    
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }
        }; 
    
        const resetValue = () => {
          const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isupdate.value=false;
          formFields.forEach(field => {
            field.value = '';
          });
          btnTitle()
        };
    
        return {permissions, title,btntext, resetValue, permissionSchema,
           addPermission, permissionForm,addPermissionModalRef,permissionnew,
           //refreshPermissions
           };
      },
    };
    </script>@/models/Permission