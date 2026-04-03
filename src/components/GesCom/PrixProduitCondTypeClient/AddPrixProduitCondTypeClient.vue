<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-prix-produit-cond-type-client-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">
        Définir un prix pour {{ produit?.nomProd || 'le produit' }}
      </h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        ref="prixProduitCondTypeClientForm"
        @submit="addPrixProduitCondTypeClient"
        :validation-schema="prixProduitCondTypeClientSchema"
        :keep-values="valuess"
      >
        <div class="row">
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de définition <span class="text-danger">*</span>
              </label>
              <Field
                name="dateDefinition"
                type="date"
                :value="getCurrentDate()"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Sélectionner la date de définition"
                readonly
              />
              <ErrorMessage name="dateDefinition" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 m-10">
            <div class="row">
              <div class="border border-primary mb-10">
                <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                  <div class="col-md-7">
                    <h4 class="fs-4 text-white">Définir les prix par famille</h4>
                  </div>
                  <div class="col-md-5">
                    <div class="d-flex float-end">
                    </div>
                  </div>
                </div>
                <div>
                  <div class="accordion dark-accordion my-3 py-7" id="familleAccordion">
                    <div
                      class="accordion-item accordion-wrapper"
                      v-for="(famille, familleIndex) in familles"
                      :key="familleIndex"
                    >
                      <h2 class="accordion-header" :id="`famille${familleIndex}`">
                        <button
                          :class="`accordion-button bg-light-primary font-primary ${familles.length === familleIndex + 1 ? '' : 'collapsed'}`"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="`#collapseFamille${familleIndex}`"
                          :aria-expanded="`${familles.length === familleIndex + 1 ? true : false}`"
                          :aria-controls="`collapseFamille${familleIndex}`"
                        >
                          {{ famille.nomFamille ? famille.nomFamille : `Famille ${familleIndex + 1}` }}
                          <i
                            class="vue-feather vue-feather--chevron-down svg-color"
                            data-name="chevron-down"
                            data-tags="expand"
                            data-type="chevron-down"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-chevron-down vue-feather__content"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </i>
                        </button>
                      </h2>
                      <div
                        :id="`collapseFamille${familleIndex}`"
                        :class="`accordion-collapse collapse ${familles.length === familleIndex + 1 ? 'show' : ''}`"
                        :aria-labelledby="`famille${familleIndex}`"
                        data-bs-parent="#familleAccordion"
                      >
                        <div class="accordion-body">
                          <div class="row">
                            <div class="col-md-10 mb-2">
                              <div>
                                <Multiselect
                                  :options="familleOptions"
                                  :searchable="true"
                                  track-by="label"
                                  label="label"
                                  v-model="famille.famille"
                                  placeholder="Sélectionner la famille"
                                  :disabled="true"
                                  @select="selectFamille(famille.famille, famille)"
                                />
                              </div>
                            </div>
                            <div class="col-md-2">
                              <button
                                class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                type="button"
                                @click="removeRowFamille(familleIndex)"
                              >
                                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                              </button>
                            </div>
                          </div>
                          <div class="border border-primary mb-10">
                            <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                              <div class="col-md-7">
                                <h5 class="fs-6 mx-1 text-white">
                                  Ajouter les prix pour {{ famille.nomFamille || 'la famille' }}
                                </h5>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="btn btn-sm btn-success"
                                    type="button"
                                    @click="addRowPrix(familleIndex)"
                                  >
                                    <i class="fa fa-plus-circle position-relative me-1 fs-12"></i>
                                    Ajouter un prix
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="p-3">
                              <div class="row mt-10">
                                <div class="col-md-6">
                                  <label class="d-block text-black fw-semibold">
                                    Produit Conditionnement <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-5">
                                  <label class="d-block text-black fw-semibold">
                                    Prix de Vente (XOF) <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-1">
                                  <label class="d-block text-black fw-semibold">Action</label>
                                </div>
                              </div>
                              <div
                                class="row gy-0"
                                v-for="(prix, prixIndex) in famille.prixList"
                                :key="prixIndex"
                              >
                                <div class="col-md-6">
                                  <div class="form-group mb-2">
                                    <Multiselect
                                      :options="produitConditionnementOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="prix.produitConditionnement"
                                      placeholder="Sélectionner le produit conditionnement"
                                      @select="selectProduitConditionnement(prix.produitConditionnement, prix)"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="validatePrixRow(prix.produitConditionnement)"
                                    >
                                      Le produit conditionnement est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-5">
                                  <div class="form-group mb-2">
                                    <input
                                      type="number"
                                      v-model="prix.prix"
                                      step="0.01"
                                      min="0"
                                      class="form-control shadow-none fs-md-15 text-black"
                                      placeholder="Entrez le prix en Francs CFA"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="validatePrixRow(prix.prix)"
                                    >
                                      Le prix est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-1">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowPrix(familleIndex, prixIndex)"
                                  >
                                    <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-5">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Ajouter un prix produit conditionnement
              </button>
              <router-link
                to="/prixproduits/liste-prixproduits"
                class="btn btn-danger"
              >
                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative">Annuler</span>
              </router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect';

export default defineComponent({
  name: 'AddPrixProduitCondTypeClient',
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const produitId = ref(route.params.produitId ? parseInt(route.params.produitId as string) : null);
    const produit = ref(null);
    const familleOptions = ref([]);
    const produitConditionnementOptions = ref([]);
    const isDisable = ref(true);
    const valuess = ref();

    const familles = reactive([
      {
        famille: '',
        nomFamille: '',
        prixList: [
          {
            produitConditionnement: '',
            prix: 0,
          },
        ],
      },
    ]);

    const prixProduitCondTypeClientSchema = Yup.object().shape({
      dateDefinition: Yup.date().required('La date de définition est obligatoire'),
    });

    const addRowPrix = (familleIndex: number) => {
      familles[familleIndex].prixList.push({
        produitConditionnement: '',
        prix: 0,
      });
    };

    const removeRowFamille = (index: number) => {
      familles.splice(index, 1);
    };

    const removeRowPrix = (familleIndex: number, prixIndex: number) => {
      familles[familleIndex].prixList.splice(prixIndex, 1);
    };

    const selectFamille = (selectedFamille: string, famille: any) => {
      famille.famille = selectedFamille;
      famille.nomFamille = familleOptions.value.find(
        (opt: any) => opt.value === selectedFamille
      )?.label || '';
    };

    const selectProduitConditionnement = (selectedProduit: string, prix: any) => {
      prix.produitConditionnement = selectedProduit;
    };

    const validatePrixRow = (value: any) => {
      return value === '' || value === 0 || value === null || value < 0;
    };

    watch(
      familles,
      (newValue) => {
        isDisable.value = newValue.some(
          (famille) =>
            famille.famille === '' ||
            famille.prixList.some(
              (prix) =>
                prix.produitConditionnement === '' ||
                prix.prix === 0
            )
        );
      },
      { deep: true }
    );

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const fetchDefiniPrix = (definiPrixId: string) => {
      return ApiService.get(`/produitconditionnement/${definiPrixId}`)
        .then(({ data }) => {
          produitConditionnementOptions.value = data.data.map((produit: any) => ({
            value: produit.id,
            label: `${produit.produit.nomProd} [${produit.conditionnement.libelle}]`,
          }));
        }).catch(({ response }) => {
          error(response?.data?.message || 'Erreur lors de la récupération des produits conditionnement');
        });
    };

    const addPrixProduitCondTypeClient = async (values: any, { resetForm }: any) => {
      let isValid = true;
      const payloads = [];

      for (const famille of familles) {
        for (const prix of famille.prixList) {
          payloads.push({
            famille: famille.famille,                    // ← Changé : categorieClient → famille
            produitConditionnement: prix.produitConditionnement,
            prix: prix.prix,
          });
        }
      }

      for (const famille of familles) {
        if (!famille.famille || famille.prixList.length === 0) {
          isValid = false;
          error(`Veuillez ajouter au moins un prix pour la famille ${famille.nomFamille || 'inconnue'}.`);
          continue;
        }
        for (const prix of famille.prixList) {
          if (!prix.produitConditionnement || prix.prix <= 0) {
            isValid = false;
            error('Veuillez remplir tous les champs obligatoires pour chaque famille.');
            break;
          }
        }
      }
      if (!isValid) return;

      try {
        const response = await ApiService.post('/prixProduitCondTypeClients', { 
          prixList: payloads 
        });
        
        if (response.data && response.data.code === 201) {
          success('Prix produit conditionnement ajoutés avec succès');
          resetForm();
          router.push({ name: 'ListePrixProduitCondtionnementTypeClients' });
        } else {
          error('Certaines créations ont échoué');
        }
      } catch (err) {
        error('Erreur lors de l\'ajout des prix produit conditionnement');
      }
    };
const fetchFamille = async () => {
      try {
        const response = await ApiService.get('/all/familles');   // ← Assure-toi que l'endpoint est correct
        const familleData = response.data.data.data;
        familleOptions.value = familleData.map((famille: any) => ({
          value: famille.id,
          label: `${famille.libelleFamille}`,
        }));

        familles.splice(0, familles.length);

        familleOptions.value.forEach((famille: any) => {
          const prixList = produitConditionnementOptions.value.map((produit: any) => ({
            produitConditionnement: produit.value,
            prix: 0,
          }));

          familles.push({
            famille: famille.value,
            nomFamille: famille.label,
            prixList: prixList.length > 0 ? prixList : [{
              produitConditionnement: '',
              prix: 0,
            }],
          });
        });
      } catch (err) {
        error('Erreur lors de la récupération des familles');
      }
    };    onMounted(async () => {
      const definiPrixId = route.query.definiPrixId as string;
      await Promise.all([
        fetchDefiniPrix(definiPrixId),
        fetchFamille(),
      ]);
    });

    return {
      prixProduitCondTypeClientSchema,
      addPrixProduitCondTypeClient,
      produit,
      familleOptions,
      produitConditionnementOptions,
      familles,
      addRowPrix,
      removeRowFamille,
      removeRowPrix,
      validatePrixRow,
      selectFamille,
      selectProduitConditionnement,
      isDisable,
      getCurrentDate,
      valuess,
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.accordion {
  max-width: 100%;
}
</style>