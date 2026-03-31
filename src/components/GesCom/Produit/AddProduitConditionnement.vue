<template>
  <div class="card mb-25 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Compléter un conditionnement pour {{ produit?.nomProd }}</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="addProduitConditionnement" :validation-schema="conditionnementSchema" v-slot="{ errors }">
        <div class="row gx-3">
          <!-- Informations du produit existant -->
          <div class="col-md-12 mb-3">
            <div class="alert alert-info">
              <p class="mb-0">
                Ajout de conditionnement pour le produit : <strong>{{ produit?.codeProduit }} - {{ produit?.nomProd }}</strong>
                <br />
                Unité de gestion actuelle : <strong>{{ uniteGestionLabel }}</strong>
              </p>
            </div>
          </div>
          <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="d-block text-black fw-semibold">
                    Conditionnement <span class="text-danger">*</span>
                  </label>
                    <Field name="conditionnement" type="text" v-slot="{ field }">
                        <Multiselect
                          :options="conditionnementOptions"
                          :searchable="true"
                          v-model="field.value"
                          v-bind="field"
                          track-by="label"
                          label="label"
                          placeholder="Sélectionner un conditionnement"/>
                    </Field>
                  <ErrorMessage name="conditionnement" class="text-danger" />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="d-block text-black fw-semibold">
                    Quantité <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <Field name="quantite" type="number" class="form-control shadow-none fs-md-15 text-black"  min="0"
                    />
                    <span class="input-group-text">
                      {{ uniteGestionLabel || 'UM' }}
                    </span>
                  </div>
                  <ErrorMessage name="quantite" class="text-danger" />
                </div>
              </div>
          <!-- Boutons d'action -->
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                Ajouter le conditionnement(s)
              </button>
              <router-link :to="{ name: 'ViewProduit', params: { id: produit?.id } }" class="btn btn-danger">
                <i class="fa fa-times me-1"></i> Annuler
                </router-link>  
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { Form ,Field,ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/services/ApiService";
import { useRouter, useRoute } from "vue-router";
import { success, error } from "@/utils/utils";

export default defineComponent({
  name: "AddProduitConditionnement",
  components: {
    Form,
    Multiselect,
    Field,
    ErrorMessage
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    // Données du produit
    const produit = ref<any>(null);
    const uniteGestionLabel = ref<string>("");
    const conditionnementOptions = ref<any[]>([]);
  

    // Schéma de validation
    const conditionnementSchema = Yup.object().shape({
        conditionnement: Yup.string().required("Le conditionnement est requis"),
        quantite: Yup.number().required("La quantité est requise").min(0, "La quantité doit être positive"),
    });

    // Charger les données du produit
    const getProduit = async (id: string) => {
      try {
        const response = await ApiService.get(`/produits/${id}`);
        produit.value = response.data.data;
        console.log("Réponse API produit :", response.data.data);
        // Initialiser l'unité de gestion
        const uniteGestion = produit.value?.uniteGestion;
        console.log("Unité de gestion :", uniteGestion);
        if (uniteGestion) {
          uniteGestionLabel.value = uniteGestion.libelle || "UM";
        }
      } catch (err) {
        error("Erreur lors de la récupération du produit");
      }
    };

    // Charger les conditionnements disponibles
    const fetchConditionnements = async () => {
      try {
        const response = await ApiService.get("/conditionnements");
        conditionnementOptions.value = response.data.data.map((cond: any) => ({
          value: `${cond.id}|${cond.valeur}|${cond.libelle}`,
          label: cond.libelle,
        }));
      } catch (err) {
        error("Erreur lors du chargement des conditionnements");
      }
    };

 
    const selectConditionnement = (value: string, conditionnement: any) => {
      conditionnement.conditionnement = value;
      conditionnement.quantite = parseInt(value.split("|")[1]) || 0;
    };

    const addProduitConditionnement = async (values: any) => {
      values["conditionnement"] = values["conditionnement"].split("|")[0];
      values["qteCond"] = values["quantite"];
      values["conditionnement2"] = produit.value.uniteGestion.id;
      values["produit"] = produit.value.id;
      console.log("Valeurs à envoyer :", values);
      try {
        const response = await ApiService.post(`/produits/conditionnements`,values);
        if (response.data.code === 201) {
          success("Conditionnement(s) ajouté(s) avec succès");
          router.push({ name: "ViewProduit", params: { id: produit.value?.id } });
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Erreur lors de l'ajout des conditionnements";
        error(errorMessage);
      }
    };
   
    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getProduit(id);
        fetchConditionnements();
      } else {
        error("ID du produit non spécifié");
        router.push("/produits/liste-produits");
      }
    });

    return {
      produit,
      uniteGestionLabel,
      conditionnementOptions,
      conditionnementSchema,
      selectConditionnement,
      addProduitConditionnement,
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}

.is-invalid .multiselect {
  border-color: #dc3545;
}

.alert-info {
  background-color: #e6f3ff;
  border-color: #b8daff;
  color: #004085;
}
</style>