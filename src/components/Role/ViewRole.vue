<template>
  <div class="row">

    <div class="col-md-4 col-xxl-4 col-sm-4 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <h4 class="text-black text-center fw-bold mb-10">{{ roleData?.description}}</h4>
          <h5 class="my-15 mt-3">Key: <span class="fw-bolder text-black">{{ roleData?.nom }}</span> </h5> 
          <p class="my-15 mt-3">Date de création: <span class="text-black fw-bold">{{  format_date(roleData?.createdAt) }}</span> </p>
          <div class="mb-20 mt-3">Total des permission pour ce rôle: <span class="fw-bolder text-black">{{ roleData?.rolePermissions?.length }}</span></div>
          <div class="mb-20 mt-3">Total des utilisateurs pour ce rôle: <span class="fw-bolder text-black">{{ userData?.userRoles?.length }}</span>  </div>

          <router-link :to="{ name: 'EditRolePage', params: { id: roleData?.id } }" class="btn  btn-primary mt-3 text-center">
            <i class="fa fa-plus-circle lh-2 me-8 position-relative top-1"></i> Complèter un privilège
          </router-link>
        </div>
      </div>
    </div>
    <!--begin::Content-->
    <div class="col-md-8 col-xxl-8 col-sm-8">
      <div class="card mb-25 border-0 rounded-0 bg-white">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between">
            <h5 class="card-title fw-bold mb-0">Liste des utilisateurs</h5>
            <div class="card-select mt-10 mt-sm-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5">
              <form>
                <div class="input-group">
                  <input type="text" class="form-control shadow-none fw-medium ps-12 pt-8 pb-8 pe-12 letter-spacing" 
                  placeholder="Rechercher">
                  <button class="default-btn position-relative transition border-0 text-white ps-12 pe-12 rounded-1" type="button">
                    <i class="flaticon-search-interface-symbol position-relative"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">Nom et prénom </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"> Email </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"> Statut </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for ="(user, index) in userData?.userRoles" :key="index" >
                  <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    {{ getRandomColor()}}
                    <span  :class="`badge badge-${color} me-3 fw-bold rounded-circle`">{{ getFirstletre(user.user.sexe) }}</span>
                    {{ user.user.nom }} {{ user.user.prenom }}
                  </th>
                  <td class="shadow-none lh-1 fw-medium ">{{ user.user.email }} </td>
                  <td class="shadow-none lh-1 fw-medium"><span class="btn f-w-500 background-light-success font-success">Actif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card-header">
      </div>
      <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-title">
            <h4 class="mb-0 h2">Liste des permissions</h4>
          </div>
          <div class="card-body pt-0">
            <!--begin::Permissions-->
            <div class="row">
              <div class="col-6" v-for ="(pri, index) in roleData?.rolePermissions" :key="index">
                <div class="d-flex align-items-center py-2">
                  <div class="col-8"><span class="bullet bg-primary me-3"></span><p class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">{{ pri?.permission?.description }}</p>   </div>
                  <div class="col-4">
                    <span class="bullet bg-primary me-3"></span>
                    <span class="btn f-w-500 background-light-danger font-danger">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(pri.id, roleData?.rolePermissions,'rolePermission',`la permission ${pri.permission.nom}`)"><i class="fa fa-trash-o lh-2 me-8 position-relative top-1" ></i>Supprimer</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Permissions-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { RoleData, UserRole } from '@/models/Role';
import ApiService from '@/services/ApiService';
import moment from 'moment';
import { defineComponent, onMounted, ref, } from 'vue';
import { useRoute } from 'vue-router';
import { error, suppression } from '@/utils/utils';
import { User, UserData } from "@/models/users";

export default defineComponent({
  name: "ViewRole",
  components: {
  },

  setup() {
      const route = useRoute();
      const color = ref("");
      let roleData = ref<RoleData>();
      let userData = ref<UserData>();
      const users = ref<Array<UserRole>>([]);
        const user = ref<User | null>(null);

      function  format_date(value:any){
         if (value) {
           return moment(String(value)).format('DD-MM-YYYY h:m')
          }
      }
    const colors=["danger","success","secondary","info","primary","warning","dark"]

    function getRandomColor() {
			const randomIndex = Math.floor(Math.random() * colors.length);
			color.value = colors[randomIndex];
		}
    
    // Send login request
    function getRole(id:string) {
      return ApiService.get("/roles/",id)
      .then(({ data }) => {
        roleData.value = data.data;
        users.value=data.data.users;
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    } 

    function getUser(id: string) {
      return ApiService.get("/users/role"+id)
        .then(({ data }) => {
          userData.value = data.data;
          user.value = data.data;
        })
        .catch(({ response }) => {
          //Condition pour le onmounted
          //error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getRole(id);
      getUser(id);
    });

  
    function getFirstletre(value:string){
      return value?.split('')[0];
    }

    return {
      roleData,
      color,
      getFirstletre,
      getRandomColor,
      format_date,
      users,
      suppression,
      userData,
      user,
      getUser
    };
  },
});
</script>