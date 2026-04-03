
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

             <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Groupe de Taxe<span class="text-danger">*</span>
              </label>
              <Field name="groupe" v-model="groupe" v-slot="{ field }">
                <Multiselect
                  :options="groupeOptions"
                  :searchable="true"
                  track-by="value"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner un groupe"
                  @select="onGroupeSelect"

                />
              </Field>
            <ErrorMessage name="groupe" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Mode de définition<span class="text-danger">*</span>
              </label>
              <Field name="mode" v-model="mode" :readonly= "estRedonly" v-slot="{ field }">
               <Multiselect
                :options="modeOptions"
                :searchable="true"
                track-by="value"
                label="label"
                v-model="field.value"
                :disabled="estRedonly"
                placeholder="Sélectionner le mode de definition"
              />

              </Field>
            <ErrorMessage name="mode" class="text-danger" />
            </div>
          </div>
            <div class="col-md-12 m-10">
            <div class="row">
              <div class="border border-primary mb-10">
                <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                  <div class="col-md-7">
                    <h4 class="fs-4 text-white">Définir les prix par catégorie client</h4>
                  </div>
                  <div class="col-md-5">
                    <div class="d-flex float-end">
                      
                    </div>
                  </div>
                </div>
                <div>
                  <div class="accordion dark-accordion my-3 py-7" id="categorieAccordion">
                    <div
                      class="accordion-item accordion-wrapper"
                      v-for="(categorie, categorieIndex) in categories"
                      :key="categorieIndex"
                    >
                      <h2 class="accordion-header" :id="`categorie${categorieIndex}`">
                        <button
                          :class="`accordion-button bg-light-primary font-primary ${categories.length === categorieIndex + 1 ? '' : 'collapsed'}`"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="`#collapseCategorie${categorieIndex}`"
                          :aria-expanded="`${categories.length === categorieIndex + 1 ? true : false}`"
                          :aria-controls="`collapseCategorie${categorieIndex}`"
                        >
                          {{ categorie.nomCategorie ? categorie.nomCategorie : `Catégorie ${categorieIndex + 1}` }}
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
                        :id="`collapseCategorie${categorieIndex}`"
                        :class="`accordion-collapse collapse ${categories.length === categorieIndex + 1 ? 'show' : ''}`"
                        :aria-labelledby="`categorie${categorieIndex}`"
                        data-bs-parent="#categorieAccordion"
                      >
                        <div class="accordion-body">
                          <div class="row">
                            <div class="col-md-10 mb-2">
                              <div>
                                <Multiselect
                                  :options="categorieClientOptions"
                                  :searchable="true"
                                  track-by="label"
                                  label="label"
                                  v-model="categorie.categorie"
                                  placeholder="Sélectionner la catégorie client"
                                  :disabled="true"
                                  @select="selectCategorie(categorie.categorie, categorie)"
                                />
                              </div>
                            </div>
                            <div class="col-md-2">
                              <button
                                class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                type="button"
                                @click="removeRowCategorie(categorieIndex)"
                              >
                                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                              </button>
                            </div>
                          </div>
                          <div class="border border-primary mb-10">
                            <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                              <div class="col-md-7">
                                <h5 class="fs-6 mx-1 text-white">
                                  Ajouter les prix pour {{ categorie.nomCategorie || 'la catégorie' }}
                                </h5>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="btn btn-sm btn-success"
                                    type="button"
                                    @click="addRowPrix(categorieIndex)"
                                  >
                                    <i class="fa fa-plus-circle position-relative me-1 fs-12"></i>
                                    Ajouter un prix
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="p-3">
                              <div class="row mt-10">
                                <div class="col-md-5">
                                  <label class="d-block text-black fw-semibold">
                                    Produit Conditionnement <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Prix Min (XOF)
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Prix de Vente (XOF) <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Prix Max (XOF)
                                  </label>
                                </div>
                                <div class="col-md-1">
                                  <label class="d-block text-black fw-semibold">Action</label>
                                </div>
                              </div>
                              <div
                                class="row gy-0"
                                v-for="(prix, prixIndex) in categorie.prixList"
                                :key="prixIndex"
                              >
                                <div class="col-md-5">
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
                                <div class="col-md-2">
                                  <div class="form-group mb-2">
                                    <input
                                      type="number"
                                      v-model="prix.prixMin"
                                      step="0.01"
                                      min="0"
                                      class="form-control shadow-none fs-md-15 text-black"
                                     
                                    />
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <div class="form-group mb-2">
                                    <input
                                      type="number"
                                      v-model="prix.prix"
                                      step="0.01"
                                      min="0"
                                      :class="
                                        validatePrixRow(prix.prix) || prix.prix < prix.prixMin || prix.prix > prix.prixMax
                                          ? 'form-control shadow-none fs-md-15 text-black is-invalid'
                                          : 'form-control shadow-none fs-md-15 text-black'
                                      "
                                      placeholder="Entrez le prix en Francs CFA"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="validatePrixRow(prix.prix)"
                                    >
                                      Le prix est obligatoire.
                                    </div>
                                    <div
                                      class="invalid-feedback"
                                      v-if="prix.prix < prix.prixMin"
                                    >
                                      Le prix doit être supérieur ou égal au prix minimum.
                                    </div>
                                    <div
                                      class="invalid-feedback"
                                      v-if="prix.prix > prix.prixMax"
                                    >
                                      Le prix doit être inférieur ou égal au prix maximum.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <div class="form-group mb-2">
                                    <input
                                      type="number"
                                      v-model="prix.prixMax"
                                      step="0.01"
                                      min="0"
                                      class="form-control shadow-none fs-md-15 text-black"
                                      
                                    />
                                  </div>
                                </div>
                                <div class="col-md-1">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowPrix(categorieIndex, prixIndex)"
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
import { Produit } from '@/models/Produit';

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
    const produit = ref<Produit | null>(null);
    const categorieClientOptions = ref([]);
    const produitConditionnementOptions = ref([]);
    const isDisable = ref(true);
    const valuess = ref();
    const groupeOptions = ref([]);
   const estRedonly = ref(true);
    const modeOptions = ref([
      { value: 'HT', label: 'HT' },
      { value: 'TTC', label: 'TTC' },
    ]);

    const mode =ref('');
    const groupe =ref('');
    const categories = reactive([
      {
        categorie: '',
        nomCategorie: '',
        prixList: [
          {
            produitConditionnement: '',
            prix: 0,
            prixMin: 0,
            prixMax: 0,
            prixHT: 0,
            prixTTC: 0,
          },
        ],
      },
    ]);

    const prixProduitCondTypeClientSchema = Yup.object().shape({
      dateDefinition: Yup.date().required('La date de définition est obligatoire'),
      mode: Yup.string().required('Le mode de définition est obligatoire').oneOf(['HT', 'TTC'], 'Le mode doit être HT ou TTC'),
      groupe: Yup.string().required('Le groupe est obligatoire'),
    });

        const onGroupeSelect = (selectedGroupe: any) => {
      const groupeValue = selectedGroupe?.value || selectedGroupe;
      const code = selectedGroupe.split('|')[1];

      console.log('Groupe sélectionné:', groupeValue);
         
        if (code == 'B' || code == 'D') {
         estRedonly.value = false;
          mode.value = 'TTC';

          console.log('Mode défini sur TTC');
        } else {
         estRedonly.value = true;
          mode.value = 'HT';
        }
    };

       const calculePrix = (prix: number,produit:any) => {
        const taux = groupe.value.split('|')[2];
        console.log("valllll",taux);

        
        let prixHT = prix;
        let prixTTC = prix;
        
        if(mode.value === 'HT') {
          prixHT = prix;
          prixTTC = prixHT * (1 + parseInt(taux) / 100);
        } else if (mode.value === 'TTC') {
          prixTTC = prix;
          prixHT = prixTTC / (1 + parseInt(taux) / 100);
        }
        produit.prixHT =prixHT,
        produit.prixTTC =prixTTC
        console.log("calcul",produit);
      };
    
    const addRowPrix = (categorieIndex: number) => {
      categories[categorieIndex].prixList.push({
        produitConditionnement: '',
        prix: 0,
        prixMin: 0,
        prixMax: 0,
        prixHT:0,
        prixTTC:0,
      });
    };

    const removeRowCategorie = (index: number) => {
      categories.splice(index, 1);
    };

    const removeRowPrix = (categorieIndex: number, prixIndex: number) => {
      categories[categorieIndex].prixList.splice(prixIndex, 1);
    };

    const selectCategorie = (selectedCategorie: string, categorie: any) => {
      categorie.categorie = selectedCategorie;
      categorie.nomCategorie = categorieClientOptions.value.find(
        (opt: any) => opt.value === selectedCategorie
      )?.label || '';
      produitConditionnementOptions.value.forEach(element =>{
          categorie.prixList.push(
            {
        produitConditionnement: element.value,
        prix: 0,
        prixMin: 0,
        prixMax: 0,
        prixHT:0,
        prixTCC:0,
            }
          )
      });
      
    };

    const selectProduitConditionnement = (selectedProduit: string, prix: any) => {
      prix.produitConditionnement = selectedProduit;
      const produit = produitConditionnementOptions.value.find(
        (opt: any) => opt.value === selectedProduit
      );
      prix.prixMin = produit?.prixMin || 0;
      prix.prixMax = produit?.prixMax || Infinity;
    };

    const validatePrixRow = (value: any) => {
      return value === '' || value === 0 || value === null || value < 0;
    };

     watch(
      categories,
      (newValue) => {
        isDisable.value = newValue.some(
          (categorie) =>
            categorie.categorie === '' ||
            categorie.prixList.some(
              (prix) =>
                prix.produitConditionnement === '' ||
                prix.prix === 0 ||
                prix.prix < prix.prixMin ||
                prix.prix > prix.prixMax
            )
        );
        newValue.forEach(categorie => {
          categorie.prixList.forEach(element => {
            calculePrix(element.prix,element)

          });
          
        });
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


      const fetchGroupeTaxe = async () => {
        try {
          const response = await ApiService.get("all/groupeTaxes");
          const groupeData = response.data.data.data;
          groupeOptions.value = groupeData.map((groupe) => ({
            value: `${groupe.id}|${groupe.code}|${groupe.taux}`,
            label: `${groupe.code} - ${groupe.libelle}`,
          }));
        } catch (error) {
          error('Erreur lors du chargement des groupes');
        }
      };


    const fetchDefiniPrix = (definiPrixId: string) => {
  return ApiService.get(`/produitconditionnement/${definiPrixId}`)
    .then(({ data }) => {
      console.log("valll",data);
      const definiPrix = data.data;
      console.log("valeurrrrr", definiPrix);

      const premierPrix = definiPrix
        .flatMap((pc: any) => pc.prixCategorieClients)
        .find((pcc: any) => pcc.groupeTaxe && pcc.mode);
      if (premierPrix) {
        groupe.value = `${premierPrix.groupeTaxe.id}|${premierPrix.groupeTaxe.code}|${premierPrix.groupeTaxe.taux}`;

        mode.value = premierPrix.mode;

        const code = premierPrix.groupeTaxe.code;
        estRedonly.value = !(code === 'B' || code === 'D');
      }
       produitConditionnementOptions.value = definiPrix.map((produit: any) => ({
          value: produit.id,
          label: `${produit.produit.nomProd} [${produit.conditionnement.libelle}]`,
          prixCategorieClients: Array.isArray(produit.prixCategorieClients)
            ? produit.prixCategorieClients
            .map((prix: any) => ({
                categorieClientId:  prix.categorieClientId,
                prixMin: parseFloat(prix.prixMin) || 0,
                prixMax: parseFloat(prix.prixMax) || 0,
                prix: parseFloat(prix.prix) || 0,
                prixHT: parseFloat(prix.prixHT) || 0,
                prixTTC: parseFloat(prix.prixTTC) || 0,
              }))
            : [],
         
        }));

        console.log("reccuu",produitConditionnementOptions);
      
    }).catch(({ response }) => {
      error(response?.data?.message || 'Erreur lors de la récupération des produits conditionnement');
    });
};


    const addPrixProduitCondTypeClient = async (values: any, { resetForm }: any) => {
      let isValid = true;
      const produitConditionnementIds = new Set<number>();
      const categorieIds = new Set<number>();
      const payloads = [];
       for(const categorie of categories){
      for(const prix of categorie.prixList){
        payloads.push({
           categorieClient: categorie.categorie,
            produitConditionnement: prix.produitConditionnement,
            prix: prix.prix,
            prixMin: prix.prixMin,
            prixMax: prix.prixMax,
            prixHT:prix.prixHT,
            prixTTC:prix.prixTTC,
            mode: values.mode?.value || values.mode,
        })
        
      }

    }

     
      for (const categorie of categories) {
        console.log("testt",categorie,!categorie.categorie,categorie.prixList.length === 0,categorie.categorie);
        if (!categorie.categorie || categorie.prixList.length === 0) {
          
          isValid = false;
          error(`Veuillez ajouter au moins un prix pour la catégorie ${categorie.nomCategorie || 'inconnue'}.`);
          continue;
        }
        for (const prix of categorie.prixList) {
          const prixData = categories.find((c) => c.categorie === categorie.categorie)?.prixList.find(
            (p) => p.produitConditionnement === prix.produitConditionnement
          );
          if (
            !prix.produitConditionnement ||
            prix.prix <= 0 ||
            prix.prix < prixData?.prixMin ||
            prix.prix > prixData?.prixMax
          ) {
            isValid = false;
            error('Veuillez remplir tous les champs obligatoires pour chaque catégorie.');
            break;
          }
          produitConditionnementIds.add(parseInt(prix.produitConditionnement));
          categorieIds.add(parseInt(categorie.categorie));
        }
      }
      if (!isValid) return;

      try {
         const  response = await ApiService.post('/prixProduitCondTypeClients', {prixList:payloads,groupeTaxe:groupe.value,mode:mode.value});
        console.log("response",response)
        if (response.data && response.data.code === 201) {
          success('Prix produit conditionnement ajoutés avec succès');
          resetForm();
          router.push({ name: 'ListePrixProduitCondtionnementTypeClients' });
        } else {
          error('Certaines créations ont échoué');
          console.error('Erreurs dans la réponse:', response);
        }
      } catch (err) {
        error('Erreur lors de l\'ajout des prix produit conditionnement');
        console.error('Erreur API:', err);
      }
    };

    

   const fetchCategorieClient = async () => {
  try {
    const response = await ApiService.get('/all/categorieClient');
    const categorieClientData = response.data.data.data;
    categorieClientOptions.value = categorieClientData.map((categorie: any) => ({
      value: categorie.id,
      label: `${categorie.libelle}`,
    }));

    categories.splice(0, categories.length);

    categorieClientOptions.value.forEach((categorie: any) => {
      const prixList = produitConditionnementOptions.value.map((produit: any) => {
        const prixCategorie = produit.prixCategorieClients
        .find(
          (prix: any) => prix.categorieClientId === categorie.value
        ) || {};

        return {
          produitConditionnement: produit.value,
          prixMin: prixCategorie.prixMin || 0,
          prix: prixCategorie.prix || 0,
          prixMax: prixCategorie.prixMax || 0,
          prixHT: prixCategorie.prixHT || 0,
          prixTTC: prixCategorie.prixTTC || 0,
        };
      });

      categories.push({
        categorie: categorie.value,
        nomCategorie: categorie.label,
        prixList: prixList.length > 0 ? prixList : [{
          produitConditionnement: '',
          prixMin: 0,
          prix: 0,
          prixMax: 0,
          prixHT:0,
          prixTTC:0,
        }],
      });
    });


  } catch (err) {
    error('Erreur lors de la récupération des catégories clients');
    console.error('Erreur API catégories:', err);
  }
};

    onMounted(async () => {
      const definiPrixId = route.query.definiPrixId as string;

      await Promise.all([
        fetchDefiniPrix(definiPrixId),
        fetchGroupeTaxe(),
      ]);

      await fetchCategorieClient();
    });


    return {
      prixProduitCondTypeClientSchema,
      addPrixProduitCondTypeClient,
      produit,
      groupeOptions,
      modeOptions,
      categorieClientOptions,
      produitConditionnementOptions,
      categories,
      addRowPrix,
      removeRowCategorie,
      removeRowPrix,
      validatePrixRow,
      selectCategorie,
      selectProduitConditionnement,
      isDisable,
      getCurrentDate,
      valuess,
      calculePrix,
      estRedonly,
      mode,
      groupe,
      onGroupeSelect,

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