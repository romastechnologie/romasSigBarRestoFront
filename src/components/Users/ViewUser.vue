<template>
  <div class="row">
    <!-- Informations utilisateur -->
   
    <div class="col-xl-12">
    <Form class="card" ref="userForm" @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
      <!-- En-tête principal de la carte -->
      <div class="card-header">
        <h3 class="card-title mb-0">Détails de l'utilisateur</h3>
        <router-link to="/utilisateurs/liste-utilisateur" class="btn btn-primary transition border-0 lh-1 fw-medium"
          style="position: absolute; right: 10px; top: 10px;">
          <i class="flaticon-left-arrow lh-1 me-1"></i>
          Retour
        </router-link>
        <div class="card-options">
          <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
          <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>

      <!-- Corps de la carte avec deux compartiments gauche-droite -->
      <div class="card-body">
        <div class="row">
          <!-- Compartiment gauche : Profil utilisateur -->
          <div class="col-md-4 border-end">
            <h4 class="mb-3">Profil utilisateur</h4>
            <div class="row mb-2">
              <div class="profile-title">
                <div class="d-flex">
                  <img class="img-70 rounded-circle" alt="" src="@/assets/images/user/admin.jpg">
                  <div class="flex-grow-1" style="margin-left: 10px">
                    <h4>{{ user?.nom }} {{ user?.prenom }}</h4>
                    <p>{{ user?.email }}</p>
                  </div>
                </div>
              </div>
            </div>
           
          </div>

          <!-- Compartiment droit : Informations générales -->
          <div class="col-md-8">
            <h4 class="mb-3">Informations générales</h4>
            <table class="table table-borderless">
              <tbody>
                <tr v-if="user?.nom">
                  <td class="fw-medium">Nom et prénom :</td>
                  <td>{{ user?.nom }} {{ user?.prenom }}</td>
                </tr>
                <tr v-if="user?.telephone">
                  <td class="fw-medium">Téléphone :</td>
                  <td>{{ user?.telephone }}</td>
                </tr>
                <tr v-if="user?.email">
                  <td class="fw-medium">Email :</td>
                  <td>{{ user?.email }}</td>
                </tr>
                <tr v-if="user?.sexe">
                  <td class="fw-medium">Sexe :</td>
                  <td>{{ user?.sexe }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Form>
  </div>
    <!-- Section Rôles -->
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <h4>Rôle (s) affecté (s)à l'utilisateur</h4>

          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date d'affectation</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(rle, index) in userData?.userRoles" :key="index">
                  <td>{{ rle?.role?.description }}</td>
                  <td>{{ format_date(rle?.dateAffectation) }}</td>
                  

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Points de vente -->
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <h4>Point (s) de vente(s) affectés à l'utilisateur</h4>

          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Nom Point Vente</th>
                  <th>Date</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(pv, index) in user?.userpointventes || []" :key="index">

                  <td>{{ pv?.pointvente?.nomPointVente }}</td>
                  <td>{{ format_date(pv?.createdAt) }}</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddRoleModal :selectedUser="selectedUser" @close="reloadUserData" @getAllUsers="reloadUserData" />
    <AddPointVenteModal :selectedUser="selectedUser" @close="reloadUserData" @getAllUsers="reloadUserData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, success, format_date } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import { VueTelInput } from 'vue3-tel-input';
import { User, UserData } from '@/models/users';
import AddRoleModal from './AddRoleModal.vue';
import AddPointVenteModal from './AddPointVenteModal.vue';
import { useAuthStore } from '@/services/auth';
import JwtService from '@/services/JwtService';

export default defineComponent({
  name: 'EditUser',
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    AddRoleModal,
    AddPointVenteModal,
    VueTelInput,
  },
  setup() {
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required("L'email est obligatoire"),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom est obligatoire'),
      telephone: Yup.string().typeError('Veuillez entrer des chiffres').required('Le téléphone est obligatoire'),
    });

    const passSchema = Yup.object().shape({});

    const userForm = ref<User>();
    const passForm = ref<User | null>(null);
    const store = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const telephone = ref();
    const validPhone = ref<boolean>(false);
    const user = ref<User | null>(null);
    const userData = ref<UserData>();
    const selectedUser = ref<User | undefined>(undefined);

    onMounted(() => {
      if (route.params.id) {
        getUser(parseInt(route.params.id as string));
        getUserInfo(route.params.id as string);
      }
      if (JwtService.getUserId()) {
        getUserOnly(JwtService.getUserId());
      }
    });

    const getUserOnly = (id: string | null) => {
      ApiService.get('/users/' + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, typeof data.data[key] === 'object' && data.data[key] !== null ? data.data[key].id : data.data[key]);
          }
        })
        .catch(({ response }) => error(response.message));
    };

    const getUser = (id: number) => {
      ApiService.get('/users/' + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, typeof data.data[key] === 'object' && data.data[key] !== null ? data.data[key].id : data.data[key]);
          }
        })
        .catch(({ response }) => error(response.message));
    };

    const getUserInfo = (id: string) => {
      return ApiService.get('/users/' + id)
        .then(({ data }) => {
          console.log('Données utilisateur brutes :', data.data);
          userData.value = data.data;
          user.value = { ...data.data, userPointVentes: data.data.userPointVentes || [] };
        })
        .catch(({ response }) => error(response.data.message));
    };

    const editUser = async (values) => {
      ApiService.put('/users/' + values.id, values)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            router.push({ name: 'ListeUser' });
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const editUserPass = async (values: any) => {
      const passData = {
        id: parseInt(route.params.id as string),
        newPassword: values.newPassword,
      };
      ApiService.put('users/password/admin/' + passData.id, passData)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            router.push({ name: 'ListeUser' });
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const validate = (phoneObject) => {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid) {
        telephone.value = phoneObject.number;
      } else {
        telephone.value = '';
      }
    };

    const openAddRoleModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const openAddPointVenteModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const suppRole = async (id: any) => {
      ApiService.delete('/roles/users/' + id)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            getUserInfo(route.params.id as string);
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const suppPointVente = async (id: any) => {
      ApiService.delete('/pointventes/users/' + id)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            getUserInfo(route.params.id as string);
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const reloadUserData = () => {
      getUserInfo(route.params.id as string);
    };

    return {
      userForm,
      userSchema,
      editUser,
      reloadUserData,
      telephone,
      user,
      userData,
      openAddRoleModal,
      openAddPointVenteModal,
      selectedUser,
      suppRole,
      suppPointVente,
      editUserPass,
      passForm,
      format_date,
      passSchema,
      validPhone,
      validate,
    };
  },
});
</script>