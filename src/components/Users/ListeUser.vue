<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Liste des utilisateurs</h3>
    </div>
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center"  v-if="checkPermission('AddUser')">
        <router-link
          class="btn btn-primary"
          to="/utilisateurs/ajouter-utilisateur"
        >
        <i class="fa fa-plus-circle"></i>
          Ajouter un utilisateur
        </router-link>
        <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button> -->
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un utilisateur"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <!-- <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
        </button> -->
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table v-if="users.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom et Prénom
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Téléphone
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Email
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Rôle
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Sexe
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Statut
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >Date création</th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for ="(user, index) in users" :key="index">
                <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                  {{ user.nom }} {{ user.prenom }}
                </th>
                <td class="shadow-none lh-1 fw-medium ">{{ user.telephone }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ user.email }} </td>
                <td class="shadow-none lh-1 fw-medium">
                    <div class="row">
                        <span v-for="(userRole,index) in user.userRoles" :key="index" class="text-center">
                        <div class="col-12">
                        <div class="col-6">
                         <span class="badge badge-primary"  v-if="userRole.role">{{ userRole.role.nom }}</span> 
                        </div><br>
                        </div>
                        </span>
                    </div>
                </td>
                <td class="shadow-none lh-1 fw-medium ">{{ user.sexe }} </td>
                <td class="shadow-none lh-1 fw-medium"><span class="badge badge-primary background-light-primary font-primary">Actif</span></td>
                <td class="shadow-none lh-1 fw-medium">{{ format_date(user.createdAt) }} </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary pe-0">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                        <li class="dropdown-item d-flex align-items-center"  v-if="checkPermission('EditPassword')">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#EditUserPassModal"
                            @click="openEditPassModal(user)"
                          >
                          <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i>
                            Modifier le mot de passe
                          </a>
                        </li>
                        <li class="dropdown-item d-flex align-items-center"  v-if="checkPermission('EditUser')">
                          <router-link
                            :to="{ name: 'EditUser',params: { id: user.id } }"
                          >
                          <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i>
                            Voir ou Modifier les informations
                          </router-link>
                        </li>
                        <li class="dropdown-item d-flex align-items-center"  v-if="checkPermission('AddUserRole')">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#AddRoleModal"
                            @click="openAddPointVenteModal(user)"
                          >
                          <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i>
                          Ajouter un rôle
                          </a>
                        </li>
                        <li class="dropdown-item d-flex align-items-center"  v-if="checkPermission('AddUserRole')">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#AddPointVenteModal"
                            @click="openAddRoleModal(user)"
                          >
                          <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i>
                          Ajouter un point de vente
                          </a>
                        </li>
                        <li class="dropdown-item d-flex align-items-center">
                          <router-link :to="{ name: 'ViewUser', params: { id: user.id } }" class="dropdown-item d-flex align-items-center">
                              <i class="fa fa-eye lh-1 me-8 position-relative top-1"></i>Détails
                          </router-link>
                        </li> 
                        <li class="dropdown-item d-flex align-items-center" v-if="checkPermission('DeleteUserRole')">
                          <a
                            href="javascript:void(0);"
                            @click="suppression(user.id, users, 'users', 'un utilisateur')"
                          >
                          <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
                            Supprimer
                          </a>
                        </li>
                  </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
       <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
<EditUserPassModal :selectedUser="selectedUser"/>
<AddRoleModal :selectedUser="selectedUser" @close="rechercher"/>
<AddPointVenteModal :selectedUser="selectedUser" :selectedUserId="selectedUserId"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch} from "vue";
import ApiService from "@/services/ApiService";
import { User, UserData } from "@/models/users";
import { format_date, suppression, error, success, } from "@/utils/utils";
import EditUserPassModal from "./EditUserPassModal.vue";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import AddRoleModal from "./AddRoleModal.vue";
import AddPointVenteModal from "./AddPointVenteModal.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ListeUser",
  components: {
    AddRoleModal,
    EditUserPassModal,
    AddPointVenteModal,
    PaginationComponent
  },
  setup(){
    onMounted(() => {
      getAllUsers();
    });

    const users = ref<Array<User>>([]);
    const user = ref<User>();
    const route = useRoute();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }: { page_: number, limit_: number }) => {
      try {
        page.value = page_;
        getAllUsers(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllUsers(page.value, limit.value, searchTerm.value );
    }


    // END PAGINATE

    function getAllUsers(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/users?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          users.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          console.log("utilisateurs reccuperer avec succes", data.data);
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }

    const selectedUser = ref<User | undefined>(undefined);
    const selectedUserId = ref<number>();

    const openEditAgenceModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const openAddRoleModal = (user: User) => {
      selectedUser.value = { ...user };
      selectedUserId.value = user.id;
    };

    const openAddPointVenteModal = (user: User) => {
      selectedUser.value = { ...user };
      selectedUserId.value = user.id;
    };

    const openEditPassModal = (user: User) => {
      selectedUser.value = { ...user };
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name:string) => {
      return privileges.value.includes(name);
    }

    return {users,
      checkPermission,
      format_date,
      suppression,
      user,
      selectedUser,
      openEditAgenceModal,
      openEditPassModal,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      openAddRoleModal,
      openAddPointVenteModal,
      selectedUserId,

    };
  },
});
</script>