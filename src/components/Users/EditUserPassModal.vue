<template>
  <div class="modal fade" id="EditUserPassModal" tabindex="-1" role="dialog" ref="addEditUserPassModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Modifier le mot de passe</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h5>Vous êtes sur le point de modifier le mot de passe de: {{ selectedUser?.nom }} {{ selectedUser?.prenom }}</h5>
                    <Form ref="passForm" @submit="editUserPass" :validation-schema="passSchema">
                      <div class="row">
                        <div class="col-md-12 mb-4">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black fw-semibold mb-10">
                                Nouveau mot de passe
                            </label>
                            <Field name="newPassword" type="text" 
                                class="form-control shadow-none fs-md-15 text-black"/>
                                <ErrorMessage name="newPassword" class="text-danger"/>
                            </div>
                        </div>
                        <button
                          ref="submitButton"
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
  <!-- <div
    class="modal fade createNewModal"
    id="EditUserPassModal"
    tabindex="-1"
    ref="addEditUserPassModalRef"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <div style="float: right">
          <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
        </div>
          <h5 class="modal-title fw-bold text-black"></h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
        <h5>Vous êtes sur le point de modifier le mot de passe de: {{ selectedUser?.nomComplet }}</h5>
        <Form ref="passForm" @submit="editUserPass" :validation-schema="passSchema">
          <div class="row">
            <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                    Nouveau mot de passe
                </label>
                <Field name="newPassword" type="text" 
                    class="form-control shadow-none fs-md-15 text-black"/>
                    <ErrorMessage name="newPassword" class="text-danger"/>
                </div>
            </div>
            <button
              class="btn btn-primary"
              type="submit"
            >
              Envoyer
            </button>
          </div>
        </Form>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { ref, onMounted, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { User } from '@/models/users';

export default {
  name: "EditUserPassModal",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    selectedUser: Object as () => User | undefined,
  },
  setup: (props:any, { emit }: { emit: Function }) => {
    const passSchema = Yup.object().shape({
      newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
    });

      const passForm =  ref<User | null>(null);
      const addEditUserPassModalRef = ref<null | HTMLElement>(null);
      const submitButton = ref<HTMLButtonElement | null>(null);
      //const router = useRouter();
      const userForm = ref<User>();
      const route = useRoute();
      const passwords = ref<string>("");


      const editUserPass = async (values:any) => {

        if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }

        const passData = {
          id: selectedUser.value?.id,
          newPassword: values.newPassword,
        };
      ApiService.put("users/password/admin/"+passData.id, passData)
        .then(({ data }) => {
          if (data.code == 200) {
          success(data.message);
          //resetForm();
          hideModal(addEditUserPassModalRef.value);
          emit('close');
          emit('getAllUsers',data.data);
        }
        }).catch(({ response }) => {
          submitButton.value!.disabled = false;
          error(response.data.message);
        });
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

    watch(() => props.selectedUser, (newValue) => {
      selectedUser.value = newValue;
    });

    
    function password():string{
      let charactersArray = 'a-z,A-Z,0-9,#'.split(',')
      let CharacterSet = '';
      let newPassword = '';
      let size = 12;

      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
      }

      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789'
      }

      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '@$!%*?&#'
      }

      for (let i = 0; i < size; i++) {
        newPassword += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
      }
      return newPassword
    }

    onMounted(() => {
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
      }
      passwords.value=password();
      passForm.value?.setFieldValue("newPassword",passwords.value);
    });

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      formFields.forEach(field => {
        field.value = '';
      });
    };

    return {passSchema,
      editUserPass,
      passForm,
      submitButton,
      addEditUserPassModalRef,
      getUser,
      resetValue
    };
  },
};
</script>