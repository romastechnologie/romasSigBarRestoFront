<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter un utilisateur</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
      <Form ref="userForm" @submit="addUser" :validation-schema="userSchema">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Nom <span class="text-danger">*</span>
              </label>
              <Field name="nom" type="text" class="form-control"
                placeholder="Entrer le nom" />
              <ErrorMessage name="nom" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Prénom <span class="text-danger">*</span>
              </label>
              <Field v-model="selectpersonnel.prenom" name="prenom" type="text" class="form-control"
                placeholder="Entrer le prénom" />
              <ErrorMessage name="prenom" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone <span class="text-danger">*</span>
                </label>
                <Field name="telephone" v-model="telephone"  v-slot="{ field }">
                  <vue-tel-input
                    placeholder="Entrer le numéro de téléphone"
                    v-model = "field.value"
                    v-bind = "field"
                    defaultCountry="BJ"
                    mode="international"
                    @validate="validate"
                    class ="shadow-none fs-md-15 text-black py-2">
                  </vue-tel-input>
                </Field>
                <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                <!-- <Field name="telephone" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/> -->
                <ErrorMessage name="telephone" class="text-danger"/>
              </div>
            </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Email <span class="text-danger">*</span>
              </label>
              <Field type="email" class="form-control" placeholder="Entrer l'email"
                name="email" />
              <ErrorMessage name="email" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Sexe <span class="text-danger">*</span>
              </label>
              <Field name="sexe" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="['Masculin', 'Féminin']"
                  :close-on-select="true" :clear-on-select="false" placeholder="Sélectionner le sexe" />
              </Field>
              <ErrorMessage name="sexe" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-10 mb-sm-15 mb-md-17">
              <label class="d-block text-black fw-semibold mb-10">
                Mot de passe <span class="text-danger">*</span>
              </label>
              <Field name="password" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le mot de passe" />
              <ErrorMessage name="password" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Rôle <span class="text-danger">*</span>
              </label>
              <Multiselect 
                v-model="roles" 
                :options="roleOptions" 
                :close-on-select="true" 
                :preserve-search="true"
                :clear-on-select="false" 
                :multiple="true" 
                :searchable="true" 
                placeholder="Sélectionner le rôle"
                label="label" 
                track-by="label" />
              <span class="text-danger" v-if="showMErr">Le rôle est obligatoire</span>
            </div>
          </div>
          <div class="col-md-8 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Point de vente <span class="text-danger">*</span>
              </label>
              <Field name="pointDeVente" type="text" v-slot="{ field }">
                <Multiselect
                  mode="tags" v-model="field.value" v-bind="field" :options="pointDeVenteOptions"
                  :close-on-select="true" :clear-on-select="false" placeholder="Sélectionner un point de vente" />
              </Field>
              <ErrorMessage name="pointDeVente" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12">
            <div class="mt-4">
              <button class="btn btn-success me-3" type="submit">
                Créer un utilisateur
              </button>
              <router-link to="/utilisateurs/liste-utilisateur" class=" btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
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
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { User } from '@/models/users';
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { VueTelInput } from 'vue3-tel-input'
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
  name: "AddUser",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect,
    VueTelInput
  },

  setup: () => {
    const userSchema = Yup.object().shape({
      // personnelId: Yup.number().required('Le personnel est obligatoire'),
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom obligatoire'),
      pointDeVente: Yup.number().required('Le point de vente est obligatoire'),
      telephone: Yup.string().typeError('Veuillez entrer des chiffres').required('Le telephone est obligatoire'),
      // telephone: Yup.number()
      //   .typeError('Le téléphone doit être un nombre')
      //   .required('Le téléphone est obligatoire')
      //   .test(
      //     'is-six-digits',
      //     'Le téléphone doit avoir exactement 8 chiffres',
      //     value => (value ? /^[0-9]{8}$/.test(value.toString()) : true)
      //   ),
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
      //roles: Yup.array().required('Le rôle est obligatoire'),
    });

    const selectpersonnel = ref({
      nom: "",
      prenom: "",
      email: "",
      telephone: ""
    })

    const roleOptions = ref([]);
    const personnelOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const userForm = ref<User | null>(null);
    const codepay = ref();
    const nationalnumlber = ref();
    const telephone = ref();
    const validPhone = ref<boolean>(false);
    const numberPhone = ref();
    const value = ref('')
    const personnels = ref([] as any[]);

    function password(): string {
      let charactersArray = 'a-z,A-Z,0-9,#'.split(',')
      let CharacterSet = '';
      let password = '';
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
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
      }
      return password
    }
    const showMErr = ref(false);
    const roles = ref([]);
    let roles_ = ref([]);
    const personnelId = ref();

    const addUser = async (values: any, { resetForm }) => {
      console.log("Valeurs du formulaire: ", values);
      values['roles'] = roles.value;
      values['personnel'] = personnelId.value;
      if (roles.value.length === 0) {
        showMErr.value = true;
      }
      else {
        showMErr.value = false;
      }
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/users", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              //resetForm();
              console.log('flefelef')
              router.push({ name: "ListeUser" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      }
    };

    function validate(phoneObject) {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid == true) {
        telephone.value = phoneObject.number;
        codepay.value= phoneObject.countryCallingCode;
        nationalnumlber.value = phoneObject.nationalNumber;
        numberPhone.value = phoneObject.nationalNumber;

      }else{
        telephone.value="";
        codepay.value= "";
        nationalnumlber.value= "";
        numberPhone.value="";
      }
    }

    const fetchRoles = async () => {
      try {
        const response = await axios.get("/roles");
        console.log('Roles :', response);
        const rolesData = response.data.data;
        roles_ = rolesData;
        roleOptions.value = rolesData.map((role: any) => ({
          value: role.id,
          label: `${role.nom}`
        }));
      } catch (error) {
        //
        console.log("Erreur ", error)
      }
    };
    const pointDeVenteOptions = ref([]);
    const fetchPointDeVente = async () => {
      try {
        const response = await axios.get("/tout/pointventes");
        console.log('Point de vente :', response);
        const pointData = response.data.data;
        pointDeVenteOptions.value = pointData.map((point: any) => ({
          value: point.id,
          label: `${point.nomPointVente}`
        }));
      } catch (error) {
        console.log("Erreur ", error)
      }
    };

    onMounted(async() => {
      await fetchRoles();
      await fetchPointDeVente()
      passwords.value = password();
      userForm.value?.setFieldValue("password", passwords.value);
    })

    return {
      userForm,
      userSchema,
      addUser,
      roleOptions,
      telephone,
      validPhone,
      value,
      roles,
      showMErr,
      personnelOptions,
      personnelId,
      pointDeVenteOptions,
      
        validate,
      selectpersonnel      // validate,
      // onInput,
    };
  },
});
</script>