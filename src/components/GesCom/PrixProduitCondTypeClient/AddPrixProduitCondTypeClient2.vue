<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-prix-produit-cond-famille-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">
        Définir un prix pour {{ produit?.nomProd || 'le produit' }}
      </h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        ref="prixProduitCondFamilleForm"
        @submit="addPrixProduitCondFamille"
        :validation-schema="prixProduitCondFamilleSchema"
        :keep-values="valuess"
      >
        <div class="row">
          <!-- Date de définition -->
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de définition <span class="text-danger">*</span>
              </label>
              <Field
                name="dateDefinition"
                type="date"
                :value="getCurrentDate()"
                class="form-control shadow-none fs-md-15 text-black"
                readonly
              />
              <ErrorMessage name="dateDefinition" class="text-danger" />
            </div>
          </div>

          <!-- Section Familles -->
          <div class="col-md-12 mt-4">
            <div class="border border-primary mb-10">
              <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold p-2 bg-primary">
                <div class="col-md-7">
                  <h4 class="fs-4 mx-1 text-white">Définir les prix par famille</h4>
                </div>
                <div class="col-md-5">
                  <div class="d-flex float-end">
                    <button
                      class="btn btn-success"
                      type="button"
                      @click="addRowFamille"
                    >
                      <i class="fa fa-plus-circle position-relative me-1 fs-12"></i>
                      Ajouter une famille
                    </button>
                  </div>
                </div>
              </div>

              <div class="p-3">
                <div v-for="(familleItem, familleIndex) in familles" :key="familleIndex" 
                     class="row gy-0 border border-primary mb-3">
                  
                  <!-- En-tête famille -->
                  <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold px-2 py-2 bg-primary">
                    <div class="col-md-7">
                      <h5 class="fs-6 mx-1 text-white">
                        Sélectionner la famille
                      </h5>
                    </div>
                  </div>

                  <!-- Sélection famille + bouton supprimer -->
                  <div class="col-md-10">
                    <div class="form-group mt-2">
                      <Multiselect
                        :options="getFamilleOptions(familleIndex)"
                        :searchable="true"
                        track-by="value"
                        label="label"
                        v-model="familleItem.famille"
                        placeholder="Sélectionner la famille"
                        @select="selectFamille(familleItem.famille, familleItem)"
                      />
                      <div class="invalid-feedback" v-if="validateRow(familleItem.famille)">
                        La famille est obligatoire.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2 mt-2">
                    <button
                      class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                      type="button"
                      @click="removeRowFamille(familleIndex)"
                    >
                      <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    </button>
                  </div>

                  <!-- Section prix par conditionnement -->
                  <div class="col-md-12 my-3">
                    <div class="border border-primary p-0">
                      <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold p-2 bg-primary">
                        <div class="col-md-7">
                          <h5 class="fs-6 text-white">
                            Ajouter les prix pour {{ familleItem.nomFamille || 'la famille' }}
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
                              Prix (XOF) <span class="text-danger">*</span>
                            </label>
                          </div>
                          <div class="col-md-1">
                            <label class="d-block text-black fw-semibold">Action</label>
                          </div>
                        </div>

                        <div class="row gy-0" v-for="(prix, prixIndex) in familleItem.prixList" :key="prixIndex">
                          <div class="col-md-6">
                            <div class="form-group mb-2">
                              <Multiselect
                                :options="produitConditionnementOptions"
                                :searchable="true"
                                track-by="value"
                                label="label"
                                v-model="prix.produitConditionnement"
                                placeholder="Sélectionner le produit conditionnement"
                                @select="selectProduitConditionnement(prix.produitConditionnement, prix)"
                              />
                              <div class="invalid-feedback" v-if="validateRow(prix.produitConditionnement)">
                                Le conditionnement est obligatoire.
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
                                :class="{ 'is-invalid': validateRow(prix.prix) }"
                                placeholder="Entrez le prix en Francs CFA"
                              />
                              <div class="invalid-feedback" v-if="validateRow(prix.prix)">
                                Le prix est obligatoire.
                              </div>
                            </div>
                          </div>

                          <div class="col-md-1">
                            <button
                              class="btn btn-danger transition border-0 pb-2 ps-4 pe-4"
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

          <!-- Boutons -->
          <div class="col-md-12 mt-5">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Enregistrer les prix par famille
              </button>
              <router-link to="/prixproduits/liste-prixproduits" class="btn btn-danger">
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
  name: 'AddPrixProduitCondFamille',
  components: { Form, Field, ErrorMessage, Multiselect },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const produit = ref(null);

    const familleOptions = ref<any[]>([]);
    const produitConditionnementOptions = ref<any[]>([]);

    const isDisable = ref(true);
    const valuess = ref({});

    const familles = reactive<any[]>([
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

    const prixProduitCondFamilleSchema = Yup.object().shape({
      dateDefinition: Yup.date().required('La date de définition est obligatoire'),
    });

    // Ajouter une nouvelle famille
    const addRowFamille = () => {
      familles.push({
        famille: '',
        nomFamille: '',
        prixList: [{ produitConditionnement: '', prix: 0 }],
      });
    };

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

    const selectFamille = (selected: string, familleItem: any) => {
      familleItem.famille = selected;
      familleItem.nomFamille = familleOptions.value.find(
        (opt: any) => opt.value === selected
      )?.label || '';
    };

    const selectProduitConditionnement = (selected: any, prix: any) => {
      prix.produitConditionnement = selected?.value || selected;
    };

    const validateRow = (value: any) => {
      return !value || value === 0 || value < 0;
    };

    // Désactiver le bouton si formulaire incomplet
    watch(familles, (newValue) => {
      isDisable.value = newValue.some((fam) =>
        !fam.famille ||
        fam.prixList.some((p: any) => !p.produitConditionnement || p.prix <= 0)
      );
    }, { deep: true });

    const getCurrentDate = () => {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    };

    // Empêcher de sélectionner deux fois la même famille
    const getFamilleOptions = (familleIndex: number) => {
      const selectedFamilles = familles
        .filter((_, idx) => idx !== familleIndex)
        .map((f) => f.famille)
        .filter((f) => f !== '');

      return familleOptions.value.filter(
        (opt: any) => !selectedFamilles.includes(opt.value)
      );
    };

    // Charger les familles
    const fetchFamilles = async () => {
      try {
        const res = await ApiService.get('/all/familles');
        const data = res.data.data?.data || res.data.data || [];

        familleOptions.value = data.map((f: any) => ({
          value: f.id,
          label: f.libelleFamille || f.codeFamille,
        }));
      } catch (err) {
        error('Erreur lors du chargement des familles');
      }
    };

    // Charger les conditionnements
    const fetchConditionnements = async () => {
      try {
        const res = await ApiService.get(`/produitconditionnement?produitId=${route.params.produitId}`);
        produitConditionnementOptions.value = res.data.data.map((pc: any) => ({
          value: pc.id,
          label: `${pc.produit?.nomProd} [${pc.conditionnement?.libelle}]`,
        }));
      } catch (err) {
        error('Erreur lors du chargement des conditionnements');
      }
    };

    // Soumission
    const addPrixProduitCondFamille = async (values: any, { resetForm }: any) => {
      const payloads = [];

      for (const famille of familles) {
        for (const prix of famille.prixList) {
          if (prix.produitConditionnement && prix.prix > 0) {
            payloads.push({
              famille: famille.famille,
              produitConditionnement: prix.produitConditionnement,
              prix: prix.prix,
              dateDebut: values.dateDefinition,
              actif: true,
            });
          }
        }
      }

      if (payloads.length === 0) {
        error('Veuillez ajouter au moins un prix valide');
        return;
      }

      try {
        const response = await ApiService.post('/prixfamille/bulk', { prixList: payloads });

        if (response.data?.code === 201) {
          success('Prix par famille ajoutés avec succès');
          resetForm();
          router.push({ name: 'ListePrixFamille' }); // Adaptez le nom de route
        }
      } catch (err) {
        error('Erreur lors de l’enregistrement des prix');
      }
    };

    onMounted(() => {
      const definiPrixId = route.query.definiPrixId as string;
      Promise.all([
        fetchConditionnements(),
        fetchFamilles(),
        // fetchDefiniPrix(definiPrixId) // à réactiver si tu veux charger des données existantes
      ]);
    });

    return {
      prixProduitCondFamilleSchema,
      addPrixProduitCondFamille,
      familles,
      familleOptions,
      produitConditionnementOptions,
      addRowFamille,
      addRowPrix,
      removeRowFamille,
      removeRowPrix,
      validateRow,
      selectFamille,
      selectProduitConditionnement,
      getFamilleOptions,
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
</style>