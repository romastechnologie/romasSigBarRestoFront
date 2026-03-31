<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
      <Form ref="roleForm" @submit="addRole" :validation-schema="roleSchema">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom <span class="text-danger">*</span>
              </label>
              <Field name="nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom" />
              <ErrorMessage name="nom" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Description <span class="text-danger">*</span>
              </label>
              <Field type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Écrire la description" name="description" />
              <ErrorMessage name="description" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2 mb-3">
            <div class="form-check">
              <Field name="isChecked" :value="check" @change="chang" type="checkbox" class="form-check-input"/>
              <label for="isChecked" class="form-check-label">
                Est Inventaire
              </label>
              <ErrorMessage name="isChecked" class="text-danger" />
            </div>
          </div>
          <div class="mb-7">
            <div class="row">
              <div class="col-xl-3 col-md-3" v-for="(privilege, index) in permissions" :key="index">
                <div class="d-flex align-items-center">
                  <Field class="form-check-input m-r-5" type="checkbox" :value="privilege.id" name="privileges" />
                  <p>{{ privilege.description }}</p>
                </div>
                <ErrorMessage name="privileges" class="text-danger" />
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit">
                Créer un rôle
              </button>
              <router-link to="/roles/liste-role" class="btn btn-danger">
                Annuler
              </router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { Permission } from '@/models/Role';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "AddRole",
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  setup() {
    const roleSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom est obligatoire'),
      description: Yup.string().required("La description est obligatoire"),
      privileges: Yup.array().min(1, 'Les privilèges sont obligatoires'),
    isChecked: Yup.boolean().default(false),
    });

    const isChecked = ref(false);
    const permissions = ref<Array<Permission>>([]);
    const router = useRouter();

    onMounted(() => {
      getAllPermissions();
    });

    const addRole = async (values: any) => {
      console.log("Valeurs envoyées avant l'envoi : ", values);
      values["isChecked"] = check.value;
      const payload = {
        ...values,
        estInventaire: check.value, 
      };
      try {
        console.log('vhvh',payload);
        const { data } = await ApiService.post("/roles", payload);
        if (data.code === 201) {
          success(data.message);
          router.push({ name: "ListeRolePage" });
        }
      } catch ({ response }) {
        error(response.data.message);
      }
    };

    const check = ref(false);
    const chang = ()=>{
      if(check.value == false){
        check.value = true;
      }else{
        check.value = false;
      }
      console.log("Valeurs envoyées avant l'envoi :",check.value);
    }
  

    function getAllPermissions() {
      ApiService.get("/permissions")
        .then(({ data }) => {
          permissions.value = data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    return { roleSchema, addRole, permissions, isChecked,  chang,check };
  },
});
</script>

<style scoped>
.alert-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>
