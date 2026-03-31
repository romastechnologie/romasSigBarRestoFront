<template>
  <div class="row">
    <!-- Profil utilisateur -->
    <div class="col-xl-4">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0">Profile : <span class="badge badge-primary f-w-500 background-light-primary font-primary">Actif</span></h4>
          <div class="card-options">
            <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
            <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
          </div>
        </div>
        <div class="card-body">
          <Form ref="passForm" @submit="editUserPass" :validation-schema="passSchema">
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
            <!--<div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">Mot de passe <span class="text-danger">*</span></label>
                <Field name="newPassword" type="text" class="form-control shadow-none fs-md-15 text-black"/>
                <ErrorMessage name="newPassword" class="text-danger"/>
              </div>
            </div>
            <div class="form-footer">
              <button class="btn btn-primary" type="submit">Modifier le mot de passe</button>
            </div>-->
          </Form>
        </div>
      </div>
    </div>

    <!-- Informations utilisateur -->
    <div class="col-xl-8">
      <Form class="card" ref="userForm" @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
        <div class="card-header">
          <h4 class="card-title mb-0">Modifier les informations</h4>
          <div class="card-options">
            <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
            <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 mb-3"><div class="form-group"><label class="d-block text-black fw-semibold">Nom <span class="text-danger">*</span></label><Field name="nom" type="text" class="form-control" placeholder="Entrer le nom"/><ErrorMessage name="nom" class="text-danger"/></div></div>
            <div class="col-md-4 mb-3"><div class="form-group"><label class="d-block text-black fw-semibold">Prénom <span class="text-danger">*</span></label><Field name="prenom" type="text" class="form-control" placeholder="Entrer le prénom"/><ErrorMessage name="prenom" class="text-danger"/></div></div>
            <div class="col-md-4 mb-3"><div class="form-group mb-15 mb-sm-20 mb-md-25"><label class="d-block text-black fw-semibold mb-10">Téléphone <span class="text-danger">*</span></label><Field name="telephone" v-model="telephone" v-slot="{ field }"><vue-tel-input placeholder="Entrer le numéro de téléphone" v-model="field.value" v-bind="field" defaultCountry="BJ" mode="international" @validate="validate" class="shadow-none fs-md-15 text-black py-2"></vue-tel-input></Field><div v-if="!validPhone" class="text-danger">Veuillez entrer un numéro correct</div><ErrorMessage name="telephone" class="text-danger"/></div></div>
            <div class="col-md-4 mb-3"><div class="form-group mb-15 mb-sm-20 mb-md-25"><label class="d-block text-black fw-semibold mb-10">Email <span class="text-danger">*</span></label><Field type="email" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email" name="email"/><ErrorMessage name="email" class="text-danger"/></div></div>
            <div class="col-md-4 mb-3"><div class="form-group mb-15 mb-sm-20 mb-md-25"><label class="d-block text-black fw-semibold mb-10">Sexe <span class="text-danger">*</span></label><Field name="sexe" type="text" v-slot="{ field }"><Multiselect v-model="field.value" v-bind="field" :options="['Masculin', 'Féminin']" :close-on-select="true" :clear-on-select="false" placeholder="Sélectionner le sexe"/></Field><ErrorMessage name="sexe" class="text-danger"/></div></div>
          </div>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-primary me-3" type="submit">Modifier un utilisateur</button>
          <router-link to="/utilisateurs/liste-utilisateur" class="btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>Annuler</router-link>
        </div>
      </Form>
    </div>

    <!-- Section Rôles (Tableau + Bouton Ajouter) -->
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
          <h4>Rôles
            <h5 style="float:right" class="dropdown-item d-flex align-items-center">
            <a class="btn btn-primary btn-sm mt-3" href="#" data-bs-toggle="modal" data-bs-target="#AddRoleModal" @click="openAddRoleModal(user)">
            <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i> Ajouter un rôle
        </a>

      </h5>
      </h4>
        </div>
      </div>
        
        <div class="card-body">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date d'affectation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rle, index) in userData?.userRoles" :key="index">
                  <td>{{ rle?.role?.description }}</td>
                  <td>{{ format_date(rle?.dateAffectation) }}</td>
                  <td>
                    <a v-if="userData?.userRoles?.length > 1" class="btn btn-danger btn-sm" @click="suppRole(rle.id)"><i class="fa fa-trash"></i> Supprimer</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
          <h4>Points de vente
          <h5 style="float:right">
        <a class="btn btn-primary btn-sm mt-3" href="#" data-bs-toggle="modal" data-bs-target="#AddPointVenteModal" @click="openAddPointVenteModal(user)">
            <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i> Ajouter un point de vente
        </a>
      </h5>
      </h4>
        </div>
      </div>
        
        <div class="card-body">
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Nom Point Vente</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pv, index) in user?.userpointventes || []" :key="index">

                  <td>{{ pv?.pointvente?.nomPointVente }}</td>
                  <td>{{ format_date(pv?.createdAt) }}</td>
                  <td>
                    <a v-if="index > 0" class="btn btn-danger btn-sm" @click="suppPointVente(pv.id)"><i class="fa fa-trash"></i> Supprimer</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
    

   
  </div>
   <!-- Modals -->
   <AddRoleModal :selectedUser="selectedUser" @close="reloadUserData" @getAllUsers="reloadUserData"/>
    <AddPointVenteModal :selectedUser="selectedUser" @close="reloadUserData" @getAllUsers="reloadUserData"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';
import ApiService from '@/services/ApiService';
import { error, success, format_date } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import { VueTelInput } from 'vue3-tel-input';
import { User, UserData } from "@/models/users";
import AddRoleModal from "./AddRoleModal.vue";
import AddPointVenteModal from "./AddPointVenteModal.vue";
import { useAuthStore } from "@/services/auth";
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "EditUser",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    AddRoleModal,
    AddPointVenteModal,
    VueTelInput
  },
  setup() {
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required('L\'email est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom est obligatoire'),
      telephone: Yup.string().typeError('Veuillez entrer des chiffres').required('Le téléphone est obligatoire'),
    });

    const passSchema = Yup.object().shape({
      //newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
    });

    const userForm = ref<User>();
    const passForm = ref<User | null>(null);
    const store = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const telephone = ref();
    const validPhone = ref<boolean>(false);
    const user = ref<User | null>(null);
    let userData = ref<UserData>();
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
      ApiService.get("/users/" + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, typeof data.data[key] === 'object' && data.data[key] !== null ? data.data[key].id : data.data[key]);
          }
        })
        .catch(({ response }) => error(response.message));
    };

    const getUser = (id: number) => {
      ApiService.get("/users/" + id)
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, typeof data.data[key] === 'object' && data.data[key] !== null ? data.data[key].id : data.data[key]);
          }
        })
        .catch(({ response }) => error(response.message));
    };

    const getUserInfo = (id: string) => {
      return ApiService.get("/users/" + id)
        .then(({ data }) => {

          console.log("Données utilisateur frffffffff :", data.data);

          userData.value = data.data;
          console.log(data,"maintenant")
         user.value = { ...data.data, userPointventes: data.data.userPointventes || [] };

        })
        .catch(({ response }) => error(response.data.message));
    };

    const editUser = async (values) => {
      ApiService.put("/users/" + values.id, values)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            router.push({ name: "ListeUser" });
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const editUserPass = async (values: any) => {
      const passData = {
        id: parseInt(route.params.id as string),
        newPassword: values.newPassword,
      };
      ApiService.put("users/password/admin/" + passData.id, passData)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            router.push({ name: "ListeUser" });
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const validate = (phoneObject) => {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid) {
        telephone.value = phoneObject.number;
      } else {
        telephone.value = "";
      }
    };

    const openAddRoleModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const openAddPointVenteModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const suppRole = async (id: any) => {
      ApiService.delete("/roles/users/" + id)
        .then(({ data }) => {
          if (data.code === 200) {
            success(data.message);
            getUserInfo(route.params.id as string);
          }
        })
        .catch(({ response }) => error(response.data.message));
    };

    const suppPointVente = async (id: any) => {
      ApiService.delete("/pointventes/users/" + id)
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
.modal {
  display: block !important;
  z-index: 1050 !important;
}
.modal-backdrop {
  z-index: 1049 !important;
}
