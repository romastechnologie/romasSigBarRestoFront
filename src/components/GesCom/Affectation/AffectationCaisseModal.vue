<template>
  <div
    class="modal fade createNewModal"
    id="AffectationCaisseModal"
    tabindex="-1"
    aria-labelledby="AffectationCaisseModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">
            Affecter une caisse à {{ selectedUser?.nom || "un utilisateur" }} {{ selectedUser?.prenom || "" }}
          </h5>
          <button
            type="button"
            class="btn-close shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-20">
          <Form ref="affectationForm" :validation-schema="affectationSchema" @submit="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Utilisateur <span class="text-danger">*</span>
                  </label>
                  <Field name="userId" v-slot="{ field, errors }">
                    <Multiselect
                      v-model="selectedUserId"
                      :options="userOptions"
                      :preserve-search="true"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner l'utilisateur"
                      label="label"
                      track-by="value"
                      :class="{ 'is-invalid': errors.length }"
                      @update:modelValue="field.onChange($event)"
                    />
                    <ErrorMessage name="userId" class="text-danger" />
                  </Field>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Caisse <span class="text-danger">*</span>
                  </label>
                  <Field name="caisseId" v-slot="{ field, errors }">
                    <Multiselect
                      v-model="selectedCaisseId"
                      :options="caissesOptions"
                      :preserve-search="true"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner une caisse"
                      label="label"
                      track-by="value"
                      :class="{ 'is-invalid': errors.length }"
                      @update:modelValue="field.onChange($event)"
                    />
                    <ErrorMessage name="caisseId" class="text-danger" />
                  </Field>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end mt-20 mt-md-25">
              <button
                type="button"
                class="btn btn-secondary me-2"
                data-bs-dismiss="modal"
                @click="resetForm"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="btn btn-primary me-3"
              >
                Affecter
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { error, success, hideModal } from "@/utils/utils";
import { User } from "@/models/users";
import { Caisse } from "@/models/Caisse";
import Multiselect from "@vueform/multiselect";

interface FormValues {
  userId: number | null;
  caisseId: number | null;
}

export default defineComponent({
  name: "AffectationCaisseModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    selectedUser: {
      type: Object as () => User | null,
      default: null,
    },
  },
  emits: ["affectee", "openmodal"],
  setup(props, { emit }) {
    const modalRef = ref<HTMLElement | null>(null);
    const affectationForm = ref<InstanceType<typeof Form> | null>(null);
    const users = ref<User[]>([]);
    const caisses = ref<Caisse[]>([]);
    const selectedUserId = ref<number | null>(null);
    const selectedCaisseId = ref<number | null>(null);

    

    // Schéma de validation
    const affectationSchema = Yup.object().shape({
      userId: Yup.number()
        .required("L'utilisateur est obligatoire")
        .typeError("Veuillez sélectionner un utilisateur"),
      caisseId: Yup.number()
        .required("La caisse est obligatoire")
        .typeError("Veuillez sélectionner une caisse"),
    });

    // Options pour Multiselect
    const userOptions = computed(() => {
      return users.value.map((user) => ({
        value: user.id,
        label: `${user.nom} ${user.prenom}`,
      }));
    });

    const caissesOptions = computed(() => {
      return caisses.value.map((caisse) => ({
        value: caisse.id,
        label: `${caisse.nom}`,
      }));
    });

    const getAllUsers = async () => {
      try {
        const { data } = await ApiService.get("/users");
        users.value = data.data.data || [];
      } catch (err: any) {
        error(err.response?.data?.message || "Erreur lors de la récupération des utilisateurs");
      }
    };

    const fetchAllCaisse = async () => {
      try {
        const { data } = await ApiService.get("/all/caisses?page=1&limit=1000");
        caisses.value = data.data.data || [];
      } catch (err: any) {
        error(err.response?.data?.message || "Erreur lors de la récupération des caisses");
      }
    };

    const handleSubmit = async (values: FormValues) => {
      try {
        console.log("Valeurs soumises :", values); // Debug
        await ApiService.post("/affectationCaisse", {
          userId: values.userId,
          caisseId: values.caisseId,
        });
        success("Caisse affectée avec succès");
        emit("affectee");
        resetForm();
        hideModal(modalRef.value);
      } catch (err: any) {
        error(err.response?.data?.message || "Erreur lors de l'affectation de la caisse");
      }
    };

    const resetForm = () => {
      selectedUserId.value = null;
      selectedCaisseId.value = null;
      affectationForm.value?.resetForm();
    };

    watch(
      () => props.selectedUser,
      (newUser) => {
        if (newUser) {
          selectedUserId.value = newUser.id;
          affectationForm.value?.setFieldValue("userId", newUser.id);
          emit("openmodal", modalRef.value);
        }
      },
      { immediate: true }
    );

    watch(selectedUserId, (newValue) => {
      affectationForm.value?.setFieldValue("userId", newValue);
    });

    watch(selectedCaisseId, (newValue) => {
      affectationForm.value?.setFieldValue("caisseId", newValue);
    });

    onMounted(async () => {
      await Promise.all([getAllUsers(), fetchAllCaisse()]);
    });

    return {
      modalRef,
      affectationForm,
      users,
      caisses,
      userOptions,
      caissesOptions,
      selectedUserId,
      selectedCaisseId,
      affectationSchema,
      handleSubmit,
      resetForm,
    };
  },
});
</script>