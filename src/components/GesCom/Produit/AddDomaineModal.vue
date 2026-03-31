<template>
  <div class="modal fade" id="AddDomaineModal" tabindex="-1" domaine="dialog" ref="addAddDomaineModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" domaine="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Ajout de domaine</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Vous êtes sur le point de compléter de (s) domaine (s) à: {{ nomProduit }} </h5>
          <Form ref="passForm" @submit="addDomaine" :validation-schema="passSchema">
            <div class="row">
              <div class="col-md-12 mb-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Domaine <span class="text-danger">*</span>
                  </label>
                  <Multiselect
                    v-model="domaines"
                    :options="domaineOptions"
                    :close-on-select="false"
                    :preserve-search="true"
                    :clear-on-select="false"
                    :multiple="true"
                    :searchable="true"
                    mode="tags"
                    placeholder="Sélectionner le domaine"
                    label="label"
                    track-by="label"
                  />
                  <span class="text-danger" v-if="showMErr">Le domaine est obligatoire</span>
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
import { Produit } from '@/models/Produit';
import Multiselect from '@vueform/multiselect';

export default {
  name: "AddDomaineModal",
  components: {
    Form,
    Multiselect,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    // selectedProduitId: {
    //   type: Number,
    //   default: 0,
    // },
    selectedProduit: Object as () => Produit | undefined,
  },
  setup(props: any, { emit }: { emit: Function }) {
    const passSchema = Yup.object().shape({
      // La validation Yup peut être omise ici car nous gérons manuellement
    });

    const passForm = ref<any>(null);
    const addAddDomaineModalRef = ref<HTMLElement | null>(null);
    const route = useRoute();
    const domaineOptions = ref<{ value: number; label: string }[]>([]);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const domaines = ref<{ value: number; label: string }[]>([]); // Typage explicite pour un tableau
    const nomProduit = ref('');
    
    const showMErr = ref(false);

    const addDomaine = async (values: any, { resetForm }: { resetForm: () => void }) => {
      console.log("data send", domaines.value);
      
      if (!props.selectedProduit?.id) {
        error("Produit non sélectionné");
        return;
      }

     
      // Vérifiez les domaines sélectionnés

      //const selectedDomaines = Array.isArray(domaines.value) ? domaines.value.map(domaine => domaine.value) : [];
      const selectedDomaines = domaines.value ? domaines.value.map(domaine => domaine.value) : [];
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }

      values['produitId'] = props.selectedProduit.id;
      values['domaines'] = domaines.value;

      console.log("Domaines sélectionnés avant soumission:", domaines.value);

      console.log("je mange", selectedDomaines)
      // Validation : vérifier si au moins un domaine est sélectionné
      if (selectedDomaines.length === 0) {
        showMErr.value = true;
        return;
      }
      showMErr.value = false;

      try {
        const { data } = await ApiService.post(`Nouveau plafond pour le compte:${props.selectedProduit.id}`, values);
        
        console.log("je mange", values)
        if (data.code === 200) {
          success(data.message);
          resetForm();
          domaines.value = []; // Réinitialiser les sélections après succès
          hideModal(addAddDomaineModalRef.value);
          emit('close');
        }
      } catch ({ response }) {
        submitButton.value!.disabled = false;
        error(response?.data?.message || 'Erreur lors de l\'ajout des domaines');
      }
    };

    const fetchDomaines = async (produitId: number) => {
      try {
        const response = await ApiService.get(`/resteante/domaines/${produitId}`);
        console.log("Domaines récupérés:", response.data.data);
        const domainesData = response.data.data;
        domaineOptions.value = domainesData.map((domaine: any) => ({
          value: domaine.id,
          label: domaine.libelle,
        }));
        console.log("Domaines récupérésdddddddddddd:", domaineOptions.value); // DEBUG
      } catch (err) {
        error('Erreur lors de la récupération des domaines');
        console.error(err);
      }
    };

    watch(() => props.selectedProduit, (newValue) => {
      // console.log("Prdouit sélectionné:", newValue.nomProd);
      nomProduit.value = newValue.nomProd;
      if (newValue && newValue.id != 0) {
        fetchDomaines(newValue.id);
      }
    });

watch(domaines, (newValue) => {
  console.log("Valeur de domaines mise à jour:", newValue);
});


    onMounted(() => {
      if (route.params.id) {
        fetchDomaines(parseInt(route.params.id as string));
      }
    });

    return {
      passSchema,
      addDomaine,
      submitButton,
      passForm,
      addAddDomaineModalRef,
      domaineOptions,
      domaines,
      showMErr,
      nomProduit
    };
  },
};
</script>