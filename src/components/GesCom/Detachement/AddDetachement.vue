<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="addDetachement" :validation-schema="detachementSchema">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date <span class="text-danger">*</span>
              </label>
              <Field name="dateDetachement" type="date" :value="getCurrentDate()"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDetachement" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Magasin <span class="text-danger">*</span>
              </label>
              <Field name="magasin" v-slot="{ field }">
                <Multiselect :options="magasinOptions" :searchable="true" track-by="value" label="label"
                  v-model="selectedMagasin" v-bind="field" placeholder="Sélectionner le magasin" @select="selectMag" />
              </Field>
              <ErrorMessage name="magasin" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif <span class="text-danger">*</span>
              </label>
              <Field name="motif" as="textarea" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrez le motif du détachement" />
              <ErrorMessage name="motif" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 m-10">
            <div class="border border-primary mb-10">
              <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                <div class="col-md-7">
                  <h5 class="fs-6 mx-1 text-white">Ajouter les produits</h5>
                </div>
                <div class="col-md-5">
                  <div class="d-flex float-end">
                    <button class="btn btn-sm btn-success" type="button" @click="addRowProduit">
                      <i class="fa fa-plus-circle position-relative me-1 fs-12"></i>Ajouter un produit
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-3">
                <div class="row mt-10">
                  <div class="col-md-4">
                    <label class="d-block text-black fw-semibold">
                      Produit Source <span class="text-danger">*</span>
                    </label>
                  </div>
                  <div class="col-md-2">
                    <label class="d-block text-black fw-semibold mb-10">
                      Quantité Source <span class="text-danger">*</span>
                    </label>
                  </div>
                  <div class="col-md-3">
                    <label class="d-block text-black fw-semibold mb-10">
                      Produit Cible <span class="text-danger">*</span>
                    </label>
                  </div>
                  <div class="col-md-2">
                    <label class="d-block text-black fw-semibold mb-10">
                      Quantité Cible <span class="text-danger">*</span>
                    </label>
                  </div>
                  <div class="col-md-1">
                    <label class="d-block text-black fw-semibold mb-10">
                      Action
                    </label>
                  </div>
                  <hr class="mt-0" />
                </div>
                <div class="row gy-0" v-for="(produit, produitIndex) in produits" :key="produitIndex">
                  <div class="col-md-4">
                    <div class="form-group mb-2">
                      <Multiselect :options="produitOptions" :searchable="true" track-by="value" label="label"
                        v-model="produit.produitSource" placeholder="Sélectionner le produit source"
                        @select="(option) => selectProd(produit, true, produitIndex, option)"
                        @clear="onClearProduitSource(produit, produitIndex)" />
                      <div class="invalid-feedback d-block"
                        v-if="validateRowProduit(produit.produitSource, produitIndex, 'produitSource')">
                        Le produit source est obligatoire.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group mb-2">
                     <input
                        type="number"
                        v-model.number="produit.qtiteSource"
                        :class="validateRowProduit(produit.qtiteSource, produitIndex, 'qtiteSource') ? 
                          'form-control shadow-none fs-md-15 text-black is-invalid' : 
                          'form-control shadow-none fs-md-15 text-black'"
                        :placeholder="produit.stockDisponible ? `Disponible : ${produit.stockDisponible}` : 'Entrer la quantité'"
                        min="1"
                        @input="calculateQuantiteCible(produit, produitIndex)"
                      />

                      <div v-if="validateRowProduit(produit.qtiteSource, produitIndex, 'qtiteSource')"
                        class="invalid-feedback">
                        La quantité source doit être positive.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-2">
                      <Multiselect :options="getProduitCibleOptions(produit.produitSource)" :searchable="true"
                        track-by="value" label="label" v-model="produit.produitCible"
                        placeholder="Sélectionner le produit cible"
                        @select="(option) => selectProd(produit, false, produitIndex, option)"
                        @clear="onClearProduitCible(produit, produitIndex)" />
                      <div class="invalid-feedback d-block"
                        v-if="validateRowProduit(produit.produitCible, produitIndex, 'produitCible')">
                        Le produit cible est obligatoire.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group mb-2">
                      <input type="text" v-model.number="produit.qtiteCible"
                        :class="validateRowProduit(produit.qtiteCible, produitIndex, 'qtiteCible') ? 'form-control shadow-none fs-md-15 text-black is-invalid' : 'form-control shadow-none fs-md-15 text-black'"
                        placeholder="Entrer la quantité" min="0" disabled />
                      <div v-if="validateRowProduit(produit.qtiteCible, produitIndex, 'qtiteCible')"
                        class="invalid-feedback">
                        La quantité cible doit être un nombre entier positif.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-1 mb-1">
                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                      @click="removeRowProduit(produitIndex)" :disabled="produits.length === 1">
                      <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit" :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }">
                Faire un détachement
              </button>
              <router-link to="/detachements/liste-detachements" class="btn btn-danger">
                <i class="fa fa-times lh-1 me-1 position-relative top-2"></i>
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
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import * as Yup from "yup";
import Multiselect from "@vueform/multiselect";
import { useAuthStore } from "@/services/auth";
import { option } from "@/composables/common/animationView";
import { getUserId } from "@/services/JwtService";

interface Produit {
  produitSource: any;
  produitCible: any;
  qtiteSource: number;
  qtiteCible: number;
  stockDisponible : number;
  erreurQuantite?: string;
}

export default defineComponent({
  name: "AddDetachement",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const detachementSchema = Yup.object().shape({
      dateDetachement: Yup.date().required("La date est obligatoire"),
      magasin: Yup.string().required("Le magasin est obligatoire"),
      motif: Yup.string().required("Le motif est obligatoire"),
    });

    const router = useRouter();
    const authStore = useAuthStore();
    const magasinOptions = ref<any[]>([]);
    const produitOptions = ref<any[]>([]);
    const isDisable = ref(true);
    const selectedMagasin = ref<any>(null);

    const produits = reactive<Produit[]>([
      {
        produitSource: null,
        produitCible: null,
        qtiteSource: 0,
        qtiteCible: 0,
        stockDisponible : 0,
      },
    ]);

    const addRowProduit = () => {
      produits.push({
        produitSource: null,
        produitCible: null,
        qtiteSource: 0,
        qtiteCible: 0,
        stockDisponible : 0,
      });
    };

    const removeRowProduit = (produitIndex: number) => {
      if (produits.length > 1) {
        produits.splice(produitIndex, 1);
      }
    };

    const getProduitId = (produitSelection: any): string | null => {
      if (!produitSelection) return null;

      if (typeof produitSelection === "string") {
        return produitSelection.split("|")[0] || null;
      }

      if (produitSelection.value) {
        return produitSelection.value.split("|")[0] || null;
      }


      return null;
    };

    const getIdProduitDepuisValeur = (value: any): string | null => {
      if (!value) return null;
      let val = "";
      if (typeof value === 'string') {
        val = value;
      } else if (value.value) {
        val = value.value
      } else {
        return null;
      }

      const parts = val.split("|");
      return parts.length > 1 ? parts[1] : null;
    }

    const onClearProduitSource = (produit: Produit, produitIndex: number) => {
      produit.produitSource = null;
      produit.produitCible = null;
      produit.qtiteSource = 0;
      produit.qtiteCible = 0;

      calculateQuantiteCible(produit, produitIndex);
    };

    const onClearProduitCible = (produit: Produit, produitIndex: number) => {
      produit.produitCible = null;
      produit.produitCible = 0;

      calculateQuantiteCible(produit, produitIndex);
    };



    const getConditionnementValue = (produitSelection: any): number => {
      if (!produitSelection) return 1;

      let val = "";
      if (typeof produitSelection === "string") {
        val = produitSelection;
      } else if (produitSelection.value) {
        val = produitSelection.value;
      } else {
        return 1;
      }

      const parts = val.split("|");
      if (parts.length === 0) return 1;

      const valeurPart = parts[parts.length - 1];
      const valeurMatch = valeurPart.match(/\[([^\]]+)\]/);

      return valeurMatch ? Number(valeurMatch[1]) || 1 : 1;
    };



   const calculateQuantiteCible = (produit: Produit, produitIndex: number) => {
      if (produit.produitSource && produit.produitCible && produit.qtiteSource > 0) {
        const valeurCible = getConditionnementValue(produit.produitCible);
        const valeurSource = getConditionnementValue(produit.produitSource);
        const quantiteCalculee = (produit.qtiteSource * valeurSource) / valeurCible;

        produit.qtiteCible = Math.round(quantiteCalculee * 100) / 100; 
      } else {
        produit.qtiteCible = 0;
      }
    };

    const selectProd = async (
  produit: Produit,
  isSource: boolean,
  produitIndex: number,
  selectedProduit: any
) => {
  if (isSource) {
    produit.produitSource = selectedProduit;

    try {
      const conditionnementId = getProduitId(selectedProduit); 
      if (!conditionnementId) error("ID manquant");

      const { data } = await ApiService.get(`/produits/conditionnement/${conditionnementId}/stock`);
      
      
      produit.stockDisponible = data.qteStock || 0;

      if (produit.qtiteSource > produit.stockDisponible) {
        produit.qtiteSource = 0;
      }
    } catch (err) {
      console.error("Erreur stock:", err);
      produit.stockDisponible = 0;
      produit.qtiteSource = 0;
    }
  } else {
    produit.produitCible = selectedProduit;
  }

  calculateQuantiteCible(produit, produitIndex);
};


    const validateRowProduit = (field: any, produitIndex: number, fieldName: string): boolean => {
      if (fieldName === 'produitSource' || fieldName === 'produitCible') {
        return !field || field === null;
      }

      if (fieldName === 'qtiteSource' || fieldName === 'qtiteCible') {
        return field <= 0;
      }
      return false;
    };

    const selectMag = (selectedMagasinOption: any) => {
      if (selectedMagasinOption) {
        selectedMagasin.value = selectedMagasinOption;
      }
    };

    const fetchMagasins = async () => {
      try {
        const response = await ApiService.get("/all/all/magasins");
        const magasinsData = response.data.data;
        magasinOptions.value = magasinsData.map((magasin: any) => ({
          value: magasin.id + "|" + magasin.nomMagasin,
          label: magasin.nomMagasin,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des magasins");
      }
    };

    const fetchProduits = async () => {
      try {
        const response = await ApiService.get("/all/produitconditionnements");
        const produitsData = response.data.data;
        console.log("vamllllll",produitsData);
        produitOptions.value = produitsData.map((produit: any) => ({
          value: `${produit.id}|${produit.produit.nomProd}|[${produit.conditionnement.libelle}]|[${produit.qteCond}]`,
          label: `${produit.produit.nomProd} [${produit.conditionnement.libelle}]`,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des produits conditionnés");
      }
    };

    const getCurrentDate = (): string => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const addDetachement = async (values: any, { resetForm }: any) => {
      
      const produitsValides = produits.filter(
        (p) =>
          p.produitSource &&
          p.produitCible &&
          p.qtiteSource > 0 &&
          p.qtiteCible > 0
      );


      if (produitsValides.length === 0) {
        error("Au moins un produit valide est requis pour le détachement.");
        return;
      }

      const produitsPayload = produitsValides.map((produit) => {
        console.log("Avant formatage:", produit);

        return {
          produitSource: getProduitId(produit.produitSource),
          produitSourceNom: typeof produit.produitSource === "string"
            ? produit.produitSource.split("|")[1] + " " + produit.produitSource.split("|")[2]
            : produit.produitSource.label,
          produitCibleId: getProduitId(produit.produitCible),
          produitCibleNom: typeof produit.produitCible === "string"
            ? produit.produitCible.split("|")[1] + " " + produit.produitCible.split("|")[2]
            : produit.produitCible.label,
          produitCible: getProduitId(produit.produitCible),
          qtiteSource: produit.qtiteSource,
          qtiteCible: produit.qtiteCible,
        };
      });


      const produitsFiltres = produitsPayload.filter(
        (p) => p.produitSource && p.produitCible
      );

      if (produitsFiltres.length === 0) {
        error("Aucun produit valide sélectionné.");
        return;
      }

      const payload = {
        dateDetachement: values.dateDetachement,
        motif: values.motif,
        magasin: selectedMagasin.value ?
          (typeof selectedMagasin.value === 'string'
            ? selectedMagasin.value.split("|")[0]
            : selectedMagasin.value.value?.split("|")[0]
          ) : "",
        produits: produitsFiltres,
        // userId: currentUserId,
      };

      try {

        const { data } = await ApiService.post("/detachements", payload);
        if (data.code === 201) {
          success(data.message);
          resetForm();
          produits.splice(0, produits.length);
          produits.push({
            produitSource: null,
            produitCible: null,
            qtiteSource: 0,
            qtiteCible: 0,
            stockDisponible : 0,
          });
          selectedMagasin.value = null;
          router.push({ name: "ListeDetachement" });
        }
      } catch (err: any) {
        console.error("Erreur détaillée:", err.response?.data);
        error(
          err.response?.data?.message ||
          "Erreur lors de la création du détachement"
        );
      }
    };

   watch([selectedMagasin, produits], () => {
  const hasValidProduits = produits.some(
    (produit) => {
      return produit.produitSource &&
        produit.produitCible &&
        produit.qtiteSource > 0 &&
        produit.qtiteCible > 0; 
    }
  );

  isDisable.value = !selectedMagasin.value || !hasValidProduits;
}, { deep: true });


    const getProduitCibleOptions = (produitSource: any) => {
      if (!produitSource) return [];

      const sourceProduitId = getIdProduitDepuisValeur(produitSource);
      const sourceConditionnementId = getProduitId(produitSource);

      if (!sourceProduitId) return [];

      return produitOptions.value.filter((option) => {
        const optionProduitId = getIdProduitDepuisValeur(option);
        const optionConditionnementId = getProduitId(option);

        return optionProduitId === sourceProduitId &&
          optionConditionnementId !== sourceConditionnementId;
      });
    };
    onMounted(() => {
      fetchMagasins();
      fetchProduits();


    });

    return {
      detachementSchema,
      addDetachement,
      produits,
      addRowProduit,
      removeRowProduit,
      validateRowProduit,
      selectProd,
      selectMag,
      isDisable,
      getCurrentDate,
      magasinOptions,
      produitOptions,
      getProduitCibleOptions,
      calculateQuantiteCible,
      selectedMagasin,
      onClearProduitCible,
      onClearProduitSource,
      getIdProduitDepuisValeur
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}

.bord1 {
  border: 1px solid #07a;
}

.fond {
  background-color: rgb(94, 191, 233);
}

:deep(input[type=number]::-webkit-inner-spin-button),
:deep(input[type=number]::-webkit-outer-spin-button) {
  -webkit-appearance: auto !important;
  opacity: 1 !important;
}

:deep(input[type=number]) {
  -moz-appearance: number-input !important;
}



</style>