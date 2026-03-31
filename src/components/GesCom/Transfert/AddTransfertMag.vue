<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="transfertForm" @submit="addTransfert" :validation-schema="transfertSchema">
        <div class="row">
          <div class="col-md-&é">
            <div class="form-group ">
              <label class="d-block text-black fw-semibold mb-10">
                Date
              </label>
              <Field name="date" type="date" :value="getCurrentDate()"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="date" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Magasin A <span class="text-danger">*</span>
              </label>
              <Field name="magasin1" v-slot="{ value, handleChange }">
                <Multiselect :options="magasin1Options" track-by="value" label="label" :object="true"
                  :model-value="selectedMagasin1" @update:modelValue="(val) => { selectedMagasin1 = val; handleChange(val); }" placeholder="Sélectionner le magasin" />
              </Field>

            </div>
            <ErrorMessage name="magasin1" class="text-danger" />
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Magasin B <span class="text-danger">*</span>
              </label>
              <Field name="magasin2" v-slot="{ value, handleChange }">
                <Multiselect :options="magasin2OptionsFiltered" track-by="value" label="label" :object="true"
                  :model-value="selectedMagasin2" @update:modelValue="(val) => { selectedMagasin2 = val; handleChange(val); }" placeholder="Sélectionner le magasin"
                  :key="`magasin2-${selectedMagasin1?.value || 'empty'}`" />
              </Field>
            </div>
            <ErrorMessage name="magasin2" class="text-danger" />
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif
              </label>
              <Field name="motif" as="textarea" cols="12" rows="6" placeholder="Entrer les motifs" v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black">
                <textarea class="form-control shadow-none rounded-0 text-black" v-model="field.value"></textarea>
              </Field>
              <ErrorMessage name="motif" class="text-danger" />
            </div>
          </div>

          <div class="border border-primary mb-10 mt-3">
            <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
              <div class="col-md-5">
                <h5 class="fs-6 mx-1 text-white">Transfert (s) du produit</h5>
              </div>

              <div class="col-md-4">
                <div class="d-flex align-items-center ">
                  <!-- <div class="p-6 bg-ecf3f2"><span class="d-block  fw-medium text-black-emphasis fs-13 text-uppercase">Montant total: {{montantTotal}}</span></div> -->
                </div>
              </div>
              <div class="col-md-3">
                <div class="d-flex float-end">
                  <button class="btn btn-sm btn-success" type="button" @click="addRowProduit()"><i
                      class="fa fa-plus-circle position-relative me-1 fs-12"></i>Ajouter un produit
                  </button>
                </div>
              </div>
            </div>
            <div class="p-3">
              <div class="row mt-10">
                <div class="col-md-4">
                  <label class="d-block text-black fw-semibold">
                    Produit
                    <span class="text-danger">*</span>
                  </label>
                </div>

                <!-- <div class="col-md-3">
                  <label class="d-block text-black fw-semibold mb-10" >
                    Prix Unitaire
                  </label>
                </div> -->
                <div class="col-md-3">
                  <label class="d-block text-black fw-semibold mb-10">
                    Quantité<span class="text-danger">*</span>
                  </label>
                </div>
                <div class="col-md-2">
                  <label class="d-block text-black fw-semibold mb-10">
                    Action
                  </label>
                </div>
                <hr class="mt-0" />
              </div>
              <div class="row gy-0" v-for="(produit, index) in produits" :key="index">
                <div class="col-md-4">
                  <div class="form-group mb-2">
                    <Multiselect :options="produitOptions" :searchable="true" track-by="label" label="label"
                      v-model="produit.produit" placeholder="Sélectionner le produit"
                      @select=" selectProd(produit.produit, produit)" />
                    <div class="invalid-feedback" v-if="validateRowProduit(produit.produit)">
                      Le produit est obligatoire.
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-3">
                  <div
                    class="form-group mb-2 ">
                    <input
                      type="number"
                      v-model="produit.prixUnitaire"
                      :class="
                        validateRowProduit(produit.prixUnitaire)
                          ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                          : 'form-control shadow-none fs-md-15 text-black '"
                      placeholder="Entrer le prixUnitaire"/>
                    <div v-if="validateRowProduit(produit.prixUnitaire)"
                      class="invalid-feedback">
                       Le prix Unitaire est obligatoire.
                    </div>
                  </div>
                </div> -->
                <div class="col-md-3">
                  <div class="form-group mb-2">
                    <input v-model="produit.qtite" type="number" class="form-control shadow-none fs-md-15 text-black"
                      placeholder="Entrer la quantite" />
                  </div>
                </div>

                <div class="col-md-2 mb-2">
                  <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                    @click="removeRowProduit(index)">
                    <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Faire un transfert
              </button>
              <router-link to="/transferts/liste-transferts" class=" btn btn-danger"><i
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

import { defineComponent, ref, watch, onMounted, reactive, computed } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray, useForm } from 'vee-validate';
import { error, success, warning } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Transfert } from '@/models/Transfert';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import { Produit, ProduitDepot } from "@/models/Produit";
import JwtService from '@/services/JwtService';

export default defineComponent({
  name: "AddTransfertMag",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const transfertSchema = Yup.object().shape({
      magasin1: Yup.object().nullable().required('Le magasin A est obligatoire'),
      magasin2: Yup.object()
        .nullable()
        .required('Le magasin destination est obligatoire')
        .test(
          'different-magasin',
          'Les deux magasins doivent être différents',
          function (value) {
            const { magasin1 } = this.parent;
            return !magasin1 || !value || (magasin1 as any).value !== (value as any).value;
          }
        ),
      motif: Yup.string().notRequired(),
      date: Yup.date().required("La date est obligatoire"),

    });

    const transfertForm = ref<Transfert | null>(null);
    const router = useRouter();
    const magasin1Options = ref([]);
    const produitOptions = ref([]);
    const selectedMagasinA = ref(null);
    
    // Variables réactives pour les valeurs du formulaire
    const selectedMagasin1 = ref(null);
    const selectedMagasin2 = ref(null);

    // const fetchMagasin1 = async () => {
    //   try {
    //     const response = await ApiService.get('all/magasins');
    //     const magasin1sData = response.data.data.data;
    //     magasin1Options.value = magasin1sData.map((magasin) => ({
    //       value: magasin.id,
    //       label: `${magasin.nomMagasin}`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };

    const userPointVenteId = ref<string | null>(JwtService.getPointDeVenteId());
    const fetchMagasin1 = async () => {
      try {
        if (!userPointVenteId.value) {
          error('Point de vente non trouvé. Veuillez vous reconnecter.');
          return;
        }

        const response = await ApiService.get(`magasins/pointdevente/${userPointVenteId.value}`);
        const magasin1sData = response.data.data;
        console.log("magasinSourceee", magasin1sData);

        if (Array.isArray(magasin1sData)) {
          magasin1Options.value = magasin1sData.map((magasin) => ({
            value: magasin.id,
            label: `${magasin.nomMagasin}`,
          }));
        } else {
          magasin1Options.value = [{
            value: magasin1sData.id,
            label: magasin1sData.nomMagasin,
          }];
        }

        console.log("magasin1Options après mapping:", magasin1Options.value);

      } catch (err) {
        console.error("Erreur complète:", err);
        error('Erreur lors du chargement des magasins source');
      }
    };

    const fetchProduits = async () => {
      try {
        const response = await axios.get("all/produitconditionnements");
        const produitsData = response.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produitconditionnements) => ({
          value: produitconditionnements.id + "|" + `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]` + "|" + produitconditionnements.prixVenteHt + "|" + produitconditionnements.prixVenteTtc,
          label: `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]`,
        }));
      } catch (error) {
      }
    };

    // const fetchMagasin2 = async () => {
    //   try {
    //     const response = await ApiService.get('all/magasins');
    //     const magasin2Data = response.data.data.data;
    //     magasin2Options.value = magasin2Data.map((magasin) => ({
    //       value: magasin.id,
    //       label: `${magasin.nomMagasin}`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };

    const magasin2OptionsFiltered = computed(() => {
      if (!selectedMagasin1.value) {
        return magasin1Options.value;
      }

      return magasin1Options.value.filter(option =>
        option.value !== selectedMagasin1.value.value
      );
    });
  
    watch(selectedMagasin1, (newVal, oldVal) => {
      console.log('Magasin A changé → objet :', newVal);
      if (selectedMagasin2.value && newVal && selectedMagasin2.value.value === newVal.value) {
        selectedMagasin2.value = null;
      }
    });

    watch(magasin2OptionsFiltered, (v) => {
      console.log("B options:", v);
    });

    onMounted(() => {
      fetchMagasin1();
      fetchProduits();
    })

    const addTransfert = async (values, { resetForm }) => {
      // Extraire seulement les IDs des magasins sélectionnés
      values.magasin1 = selectedMagasin1.value?.value || null;
      values.magasin2 = selectedMagasin2.value?.value || null;
      
      values.produits = produits.map(produit => ({
        produitId: produit.produit.split("|")[0],
        // prixUnitaire: produit.prixUnitaire,
        qtite: produit.qtite,
      }));
      console.log("valeur", values);
      ApiService.post("/transferts/Mag", values)

        .then(({ data }) => {
          console.log("vallll",data);
          if (data.code == 201) {
            success(data.message);
            resetForm();
            selectedMagasin1.value = null;
            selectedMagasin2.value = null;
            router.push({ name: "ListeTransfert" });
          }
        }).catch(({ response }) => {
        console.log('Détails de l\'erreur:', response); 
        
        let errorMessage = "Une erreur est survenue lors du transfert";
        
        if (response?.data?.errors) {
          errorMessage = String(response.data.errors);
        } else if (response?.data?.message) {
          errorMessage = String(response.data.message);
        }
        
        warning(errorMessage, 8000);
      });
    };

    const montantTotal = ref(0);
    const isDisable = ref(true);
    const produits = reactive([
      {
        produit: "",
        // prixUnitaire: 0,
        qtite: 0,
        // montant: 0,
      },
    ]);

    const addRowProduit = () => {
      produits.push({
        produit: "",
        // prixUnitaire: 0,
        qtite: 0,
        // montant: 0,
      });
    };

    const removeRowProduit = (index) => {
      if (produits.length > 1) produits.splice(index, 1);
      totals();
    };

    const validateRowProduit = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

    const totals = () => {
      montantTotal.value = produits.reduce((total, produit) => {
        const quantite = Number(produit.qtite) || 0;
        // const prix = Number(produit.prixUnitaire) || 0;
        return quantite;
      }, 0);
      console.log("totals", montantTotal.value);
    };

    watch(
      produits,
      () => {
        isDisable.value = produits.some(
          (produit) =>
            produit.produit === "" ||
            // produit.prixUnitaire === 0 ||
            produit.qtite === 0
        );
        totals();
      },
      { deep: true }
    );

    const { remove, push, fields, update } = useFieldArray("produits");

    const prixUnitaireProd = ref();
    const produitsss: any = ref(null);
    const valuess = ref();

    const idProduit = ref(0);

    // const getIndex = (event, produit) => {
    //   console.log("event", event.data);
    //   if (produit.qtite != null && produit.prixUnitaire != null) {
    //     produit.montant = produit.qtite * produit.prixUnitaire;
    //     console.log("getIndex", produit.montant);
    //   } else {
    //     produit.montant = 0;
    //   }
    //   totals();
    // };

    const getIndex = (event, produit) => {
      console.log("event", event.data);
      totals();
    };

    const selectProd = async (value: any, produit: ProduitDepot) => {
      console.log("Element", value);
      // console.log("Objet", produit.prixUnitaire);

      // produit.prixUnitaire = value.split("|")[2];
      produit.qtite = 1;
      totals();
    };
    




    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    return {
      transfertSchema,
      addTransfert,
      transfertForm, 
      magasin1Options,
      magasin2OptionsFiltered,
      selectedMagasin1,
      selectedMagasin2,
      produits,
      removeRowProduit,
      addRowProduit,
      validateRowProduit,
      // montantTotal,
      valuess,
      idProduit,
      prixUnitaireProd,
      selectProd,
      getIndex,
      isDisable,
      getCurrentDate,
      produitOptions,
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.marge-droite {
  margin-left: 15px;
}

.hr-longeur {
  width: 80%;
}

.bord1 {
  border: 1px solid #07a;
}

.fond {
  background-color: rgb(94, 191, 233);
}
</style>