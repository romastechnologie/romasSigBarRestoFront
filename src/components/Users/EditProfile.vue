  <template>
  <div class="row">

    <div class="col-xl-4">
      <!-- My Profile Card -->
      <div class="card">
        <!-- Card Header -->
        <div class="card-header">
          <h4 class="card-title mb-0">Profile : <span class="btn f-w-500 background-light-primary font-primary">Actif</span></h4>
          <!-- Card Options -->
          <div class="card-options">
            <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
            <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
          </div>
        </div>

        <!-- Card Body For user -->
        <div class="card-body">
          <Form ref="userPassForm"   @submit="editUserPass" :validation-schema="userPassSchema" :initial-values="userPassForm">
              <div class="row mb-2">
                  <div class="profile-title">
                      <div class="d-flex"> <img class="img-70 rounded-circle" alt="" src="@/assets/images/user/admin.jpg">
                          <div class="flex-grow-1" style="margin-left: 10px">
                              <h4 class="">{{ user?.nom }} {{ user?.prenom }}</h4>
                              <p class="">{{ user?.email }}</p>
                              
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                  Ancien mot de passe
              </label>
              <Field name="password" type="password" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="password" class="text-danger"/>
              </div>
          </div>
          <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                  Nouveau mot de passe
              </label>
              <Field name="newPassword" type="password" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="newPassword" class="text-danger"/>
              </div>
          </div>
          <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                  Confirmer le nouveau mot de passe
              </label>
              <Field name="confirmNewPassword" type="password" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                  <ErrorMessage name="confirmNewPassword" class="text-danger"/>
              </div>
          </div>
          <div class="form-footer">
            <div class="col-md-12 mb-3">
              <div class="d-flex align-items-center ">
                <button
                class="btn btn-primary me-3"
                  type="submit">
                    Modifier le mot de passe
                </button>
              </div>
            </div>
          </div>
      </Form>
      </div>

      </div>
    </div>

    <!-- Informations de l'utilisateur Form -->
    <div class="col-xl-8">
      <!-- Edit Profile Form -->
      <Form class="card" ref="userForm" @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
        <!-- Card Header -->
        <div class="card-header">
          <h4 class="card-title mb-0">Modifier les informations</h4>
          <!-- Card Options -->
          <div class="card-options">
            <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
            <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-2">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <Field name="nom" type="text" 
                class="form-control" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <Field name="prenom" type="text" 
                class="form-control" placeholder="Entrer le prénom"/>
                  <ErrorMessage name="prenom" class="text-danger"/>
                </div>
              </div>
                <div class="col-md-4 mb-2" >
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Téléphone <span class="text-danger">*</span>
                    </label>
                    <Field name="telephone" type="text"
                  class="form-control shadow-none fs-md-15 text-black"    placeholder="Entrer le numéro de téléphone"
                    />
                    <ErrorMessage name="telephone" class="text-danger"/>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Email <span class="text-danger">*</span>
                    </label>
                    <Field
                      type="email" 
                      class="form-control shadow-none fs-md-15 text-black"
                      placeholder="Entrer l'email"
                      name="email"
                    />
                    <ErrorMessage name="email" class="text-danger"/>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Sexe <span class="text-danger">*</span>
                    </label>
                    <Field  name="sexe"  type="text"  v-slot="{ field }">
                      <VueMultiselect
                      v-model = "field.value"
                      v-bind = "field"
                      :options="['Masculin', 'Féminin']"
                      :close-on-select="true"
                      :clear-on-select="false"
                      placeholder="Sélectionner le sexe"
                    />
                    </Field>
                    <ErrorMessage name="sexe" class="text-danger"/>
                  </div>
                </div>
          </div>
        </div>
        <!-- Card Footer -->
        <div class="card-footer text-end">
          <div class="col-md-12">
              <div class="mt-4">
                <button
                class="btn btn-primary me-3"
                  type="submit">
                    Modifier un utilisateur
                </button>
                <router-link to="/utilisateurs/liste-utilisateur" 
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
import { defineComponent, onMounted, ref, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import VueMultiselect from 'vue-multiselect'
import { User, UserData } from "@/models/users";
import AddRoleModal from "./AddRoleModal.vue";
import { useAuthStore } from "@/services/auth";
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "EditProfile",
  components: {
  Form,
  Field,
  ErrorMessage,
  Multiselect,
  VueMultiselect,

},

setup: () => {

    //Utilisateur Info
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom est obligatoire'),
      telephone : Yup.number()
      .typeError('Le téléphone doit être un nombre')
      .required('Le téléphone est obligatoire')
      .test(
        'is-six-digits',
        'Le téléphone doit avoir exactement 6 chiffres',
        value => (value ? /^[0-9]{8}$/.test(value.toString()) : true)
      ),
    });

    // Profile mot de passe
    const userPassSchema = Yup.object().shape({
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
      newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
      confirmNewPassword: Yup.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .oneOf([Yup.ref("newPassword")], "Les champs de mot de passe et de confirmation de mot de passe doivent correspondre")
      .label("Confirmation de mot"),
    });

    const userPassForm = ref<User>();
    const userForm = ref<User>();

    const store = useAuthStore();

    const roleOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const telephone=ref();

    onMounted(() => {
      //userForm.value?.setFieldValue("password",passwords.value);
      if(JwtService.getUser()) {
        getUser(JwtService.getUser());
      }
      if (JwtService.getUser()) {
        getUserOnly(JwtService.getUser());
      }
    });

    function getUser(id:string | null) {
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

  
    function logout() {
      store.logout()
      if (!store.isAuthenticated) {
        router.push({name:'login'})
      }
    }

    function getUserOnly(id: string | null) {
      ApiService.get("/users/" + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userPassForm.value?.setFieldValue(
              key,
              typeof data.data[key] === 'object' && data.data[key] !== null
                ? data.data[key].id
                : data.data[key]
            );
          }
        })
        .catch(({ response }) => {
          error(response.message);
          //router.push({ name: "userForms-liste" });
        });
    }

    const editUserPass = async (values, {resetForm}) => {
      console.log('eemege', values)
        ApiService.put("/users/password/"+ values.id,values)
          .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              resetForm();
              logout();
            }
          }).catch(({ response }) => {
            error(response.data.message);
        });
      };

    const user = ref<User | null>(null);
    const users = ref<Array<User>>([]);

    const editUser = async (values) => {
      ApiService.put("/users/" + values.id, values)
        .then(({ data }) => {
          if (data.code === 200) { 
            console.log('Fait avec succès ');
            success(data.message);
            logout();
            //resetForm();
            //router.push({ name: "ListeUser" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

  return {userForm,
      userSchema,
      editUser,
      roleOptions,
      telephone,
      user,
      users,
      userPassSchema,
      editUserPass,
      userPassForm,
      logout,
      
      //validPhone,
      // validate,
      // onInput,
    };
},
});
</script>