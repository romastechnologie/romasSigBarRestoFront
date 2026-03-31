<template>
  <div class="modal fade" id="AddRoleModal" tabindex="-1" role="dialog" ref="addAddRoleModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Ajout de rôle</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Vous êtes sur le point de compléter de (s) rôle (s) à: {{ selectedUser?.nom }}  {{ selectedUser?.prenom }}</h5>
          <Form ref="passForm" @submit="addRole" :validation-schema="passSchema">
            <div class="row">
              <div class="col-md-12 mb-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Rôle <span class="text-danger">*</span>
                  </label>
                  <Multiselect
                    v-model="roles"
                    :options="roleOptions"
                    :close-on-select="false"
                    :preserve-search="true"
                    :clear-on-select="false"
                    :multiple="true"
                    :searchable="true"
                    mode="tags"
                    placeholder="Sélectionner le rôle"
                    label="label"
                    track-by="label"
                  />
                  <span class="text-danger" v-if="showMErr">Le rôle est obligatoire</span>
                </div>
              </div>
              <button ref="submitButton" class="btn btn-primary" type="submit">
                Envoyer
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { User } from '@/models/users';
import Multiselect from '@vueform/multiselect';

export default {
  name: "AddRoleModal",
  components: {
    Form,
    Multiselect,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    selectedUser: Object as () => User | undefined,
  },
  setup(props: any, { emit }: { emit: Function }) {
    const passSchema = Yup.object().shape({
      // La validation Yup peut être omise ici car nous gérons manuellement
    });

    const passForm = ref<any>(null);
    const addAddRoleModalRef = ref<HTMLElement | null>(null);
    const route = useRoute();
    const roleOptions = ref<{ value: number; label: string }[]>([]);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const roles = ref<{ value: number; label: string }[]>([]); // Typage explicite pour un tableau
    
    const showMErr = ref(false);

    const addRole = async (values: any, { resetForm }: { resetForm: () => void }) => {
      if (!props.selectedUser?.id) {
        error("Utilisateur non sélectionné");
        return;
      }

     
      // Vérifiez les rôles sélectionnés

      //const selectedRoles = Array.isArray(roles.value) ? roles.value.map(role => role.value) : [];
      const selectedRoles = roles.value ? roles.value.map(role => role.value) : [];
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }

      values['userId'] = props.selectedUser.id;
      values['roles'] = roles.value;

      console.log("Rôles sélectionnés avant soumission:", roles.value);

      console.log("je mange", selectedRoles)
      // Validation : vérifier si au moins un rôle est sélectionné
      if (selectedRoles.length === 0) {
        showMErr.value = true;
        return;
      }
      showMErr.value = false;

      try {
        const { data } = await ApiService.post(`/roles/users/${props.selectedUser.id}`, values);
        
        console.log("je mange", values)
        if (data.code === 200) {
          success(data.message);
          resetForm();
          roles.value = []; // Réinitialiser les sélections après succès
          hideModal(addAddRoleModalRef.value);
          emit('close');
        }
      } catch ({ response }) {
        submitButton.value!.disabled = false;
        error(response?.data?.message || 'Erreur lors de l\'ajout des rôles');
      }
    };

    const fetchRoles = async (userId: number) => {
      try {
        const response = await ApiService.get(`/resteante/roles/${userId}`);
        const rolesData = response.data.data;
        roleOptions.value = rolesData.map((role: any) => ({
          value: role.id,
          label: role.nom,
        }));
        console.log("Roles récupérés:", roleOptions.value); // DEBUG
      } catch (err) {
        error('Erreur lors de la récupération des rôles');
        console.error(err);
      }
    };

    watch(() => props.selectedUser, (newValue) => {
  console.log("Utilisateur sélectionné:", newValue);
  if (newValue) {
    fetchRoles(newValue.id);
  }
});

watch(roles, (newValue) => {
  console.log("Valeur de roles mise à jour:", newValue);
});


    onMounted(() => {
      if (route.params.id) {
        fetchRoles(parseInt(route.params.id as string));
      }
    });

    return {
      passSchema,
      addRole,
      submitButton,
      passForm,
      addAddRoleModalRef,
      roleOptions,
      roles,
      showMErr,
    };
  },
};
</script>