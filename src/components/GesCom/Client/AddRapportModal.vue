<template>
  <div class="modal fade" :class="{ 'show d-block': visible }" tabindex="-1" role="dialog" aria-labelledby="addRapportModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="addRapportModalLabel">Ajouter un rapport</h4>
          <button class="btn-close py-0" type="button" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Ajouter un rapport pour : {{ selectedClient?.nomClient }} {{ selectedClient?.prenomClient }}</h5>
          <Form ref="passForm" @submit="addRapport" :validation-schema="passSchema">
            <div class="row">
              <!-- Date de relance -->
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold mb-1">
                    Date de relance <span class="text-danger">*</span>
                  </label>
                  <Field name="dateRelance" type="datetime-local" :value="getCurrentDateTime()" readonly
                    class="form-control shadow-none fs-md-15 text-black" />
                  <ErrorMessage name="dateRelance" class="text-danger" />
                </div>
              </div>

              <!-- Sélection de l'échéance -->
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold mb-1">
                    Échéance <span class="text-danger">*</span>
                  </label>
                  <Field name="echeanceId" as="select" class="form-control shadow-none fs-md-15 text-black">
                    <option value="">Sélectionner une échéance</option>
                    <option v-for="echeance in echeancesOptions" :key="echeance.id" :value="echeance.id">
                      {{ formatEcheanceLabel(echeance) }}
                    </option>
                  </Field>
                  <ErrorMessage name="echeanceId" class="text-danger" />
                </div>
              </div>

              <!-- Description -->
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold mb-1">
                    Description <span class="text-danger">*</span>
                  </label>
                  <Field name="description" as="textarea" cols="15" rows="3" placeholder="Entrer la description"
                    class="form-control shadow-none rounded-0 text-black" />
                  <ErrorMessage name="description" class="text-danger" />
                </div>
              </div>

              <!-- Canal utilisé -->
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold mb-1">
                    Canal utilisé <span class="text-danger">*</span>
                  </label>
                  <Field name="canalUtilise" v-slot="{ field }">
                    <Multiselect v-model="field.value" v-bind="field" :options="canalOptions" :searchable="true"
                      placeholder="Sélectionner le canal" :multiple="false" />
                  </Field>
                  <ErrorMessage name="canalUtilise" class="text-danger" />
                </div>
              </div>

              <!-- Boutons -->
              <div class="col-md-12">
                <div class="d-flex align-items-center">
                  <button ref="submitButton" class="btn btn-primary me-3" type="submit">Ajouter le rapport</button>
                  <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { error, success } from "@/utils/utils";
import { Client } from "@/models/Client";
import Multiselect from "@vueform/multiselect";
import { format_Date } from "@/utils/utils";

export default defineComponent({
  name: "AddRapportModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    selectedClient: {
      type: Object as () => Client | null,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const visible = ref(true); // Le modal est visible par défaut quand monté
    const passForm = ref<any>(null);
    const submitButton = ref<HTMLButtonElement | null>(null);

    // Schéma de validation
    const passSchema = Yup.object().shape({
      dateRelance: Yup.string().required("La date de relance est obligatoire"),
      echeanceId: Yup.string().required("L'échéance est obligatoire"),
      description: Yup.string().required("La description est obligatoire"),
      canalUtilise: Yup.string().required("Le canal utilisé est obligatoire"),
    });

    // Options pour le canal utilisé
    const canalOptions = ref(["SMS", "Appel téléphonique", "Mail", "Visite", "SMS Whatsapp", "Appel Whatsapp"]);

    // Récupérer les échéances du client
    const echeancesOptions = computed(() => {
      const echeances: any[] = [];
      props.selectedClient?.creances?.forEach((creance) => {
        creance.echeances?.forEach((echeance) => {
          echeances.push(echeance);
        });
      });
      return echeances;
    });

    // Formater le libellé de l'échéance
    const formatEcheanceLabel = (echeance: any) => {
      return echeance ? `${format_Date(echeance.date)} - ${echeance.montant}` : "";
    };

    // Obtenir la date et heure actuelles
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Ajouter un rapport
    const addRapport = async (values: any, { resetForm }: { resetForm: () => void }) => {
      if (submitButton.value) {
        submitButton.value.disabled = true;
      }

      try {
        //const response = await ApiService.post(`/rapports/clients/${props.selectedClient?.id}`, values);
        const response = await ApiService.post(`/rapports/clients/${props.selectedClient?.id}`, values);
        if (response.data.code === 200) {
          success(response.data.message);
          resetForm();
          closeModal();
        }
      } catch (err: any) {
        error(err.response?.data?.message || "Erreur lors de l'ajout du rapport");
        if (submitButton.value) submitButton.value.disabled = false;
      }
    };

    // Fermer le modal
    const closeModal = () => {
      visible.value = false;
      emit("close");
    };

    onMounted(() => {
      // Pas besoin de logique supplémentaire ici, le modal est contrôlé par le parent
    });

    return {
      passSchema,
      addRapport,
      passForm,
      submitButton,
      getCurrentDateTime,
      formatEcheanceLabel,
      canalOptions,
      echeancesOptions,
      visible,
      closeModal,
    };
  },
});
</script>

<style scoped>
.modal.fade.show.d-block {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>