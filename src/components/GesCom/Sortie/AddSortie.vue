<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="addSortie" :validation-schema="sortieSchema" :keep-values="valuess">
        <div class="row">
          
            <div class="col-md-&é">
              <div class="form-group ">
                <label class="d-block text-black fw-semibold mb-10">
                  Date
                </label>
                <Field name="dateSortie" type="date" :value="getCurrentDate()"
                  class="form-control shadow-none fs-md-15 text-black" />
                <ErrorMessage name="dateSortie" class="text-danger" />
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Récuperant <span class="text-danger">*</span>
                </label>
                <Field name="recuperant" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le récupérant" />
                <ErrorMessage name="recuperant" class="text-danger" />
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Bénéficiaire<span class="text-danger">*</span>
                </label>
                <Field name="beneficiaire" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le beneficiaire" />
                <ErrorMessage name="beneficiaire" class="text-danger" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Motif
                </label>
                <Field name="motifSortie" as="textarea" rows="2" placeholder="Entrer les motifSorties"
                  v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                  <textarea class="form-control shadow-none rounded-0 text-black" v-model="field.value"></textarea>
                </Field>
                <ErrorMessage name="motifSortie" class="text-danger" />
              </div>
            </div>

            <div class="col-md-12 m-10">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                    <div class="col-md-4">
                      <h4 class="fs-4 text-white"><Samp></Samp>Sortie par Magasin</h4>
                    </div>
                    <div class="col-md-4 text-center">
                      <div class="p-6 bg-ecf3f2">
                        <span class="d-block fw-medium text-black-emphasis fs-13 text-uppercase">
                          Montant total: {{ montantTotal }}
                        </span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="d-flex float-end">
                        <button class="btn btn-success" type="button" :class="{ 'cursor-not-allowed': isDisable }"
                          :disabled="isDisable" @click="addRowMagasin()">
                          <i class="fa fa-plus-circle position-relative me-1 fs-12"></i>Ajouter un magasin
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="accordion dark-accordion my-3 py-7" id="magasin">
                      <div class="accordion-item accordion-wrapper" v-for="(magasin, magasinIndex) in magasins"
                        :key="magasinIndex">
                        <h2 class="accordion-header" :id="`magasin${magasinIndex}`">
                          <button
                            :class="`accordion-button bg-light-primary font-primary ${magasins.length == magasinIndex + 1 ? '' : 'collapsed'}`"
                            type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${magasinIndex}`"
                            :aria-expanded="`${magasins.length == magasinIndex + 1 ? true : false}`"
                            :aria-controls="`collapse${magasinIndex}`">
                            {{ magasin.nomMagasin ? magasin.nomMagasin : `Magasin ${magasinIndex + 1}` }}
                            <i class="vue-feather vue-feather--chevron-down svg-color" data-name="chevron-down"
                              data-tags="expand" data-type="chevron-down"><svg xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-chevron-down vue-feather__content">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg></i>
                          </button>
                        </h2>
                        <div :class="`accordion-collapse collapse ${magasins.length == magasinIndex + 1 ? 'show' : ''}`"
                          :id="`collapse${magasinIndex}`" :aria-labelledby="`magasin${magasinIndex}`"
                          data-bs-parent="#magasin" style="">
                          <div class="accordion-body">
                            <div class="row">
                              <div class="col-md-10 mb-2">
                                <div class="">
                                  <Multiselect :options="magasinOptions" :searchable="true" track-by="label"
                                    label="label" v-model="magasin.magasin" placeholder="Sélectionner le magasin"
                                    @select="selectMag(magasin.magasin, magasin)" />
                                </div>
                              </div>
                              <div class="col-md-2">
                                <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                  @click="removeRowMagasin(magasinIndex)">
                                  <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                </button>
                              </div>
                            </div>
                            <div class="border border-primary mb-10">
                              <div
                                class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                                <div class="col-md-7">
                                  <h5 class="fs-6 mx-1 text-white">Ajouter les produits dans le magasin</h5>
                                </div>
                                <div class="col-md-5">
                                  <div class="d-flex float-end">
                                    <button class="btn btn-sm btn-success" type="button"
                                      @click="addRowProduit(magasinIndex)"><i
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
                                  <div class="col-md-3">
                                    <label class="d-block text-black fw-semibold mb-10">
                                      Prix
                                    </label>
                                  </div>
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
                                <div class="row gy-0" v-for="(produit, produitIndex) in magasin.produits"
                                  :key="produitIndex">
                                  <div class="col-md-4">
                                    <div class="form-group mb-2">
                                      <Multiselect :options="produitOptions" :searchable="true" track-by="label"
                                        label="label" v-model="produit.produit" placeholder="Sélectionner le produit"
                                        @select=" selectProd(produit.produit, produit)" />
                                      <div class="invalid-feedback" v-if="validateRowProduit(produit.produit)">
                                        Le produit est obligatoire.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="form-group mb-2">
                                      <input v-model="produit.prixUnitaire" type="number"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le prix" />
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="form-group mb-2 ">
                                      <input type="number" v-model="produit.qtite" :class="validateRowProduit(produit.qtite)
                                          ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                          : 'form-control shadow-none fs-md-15 text-black '"
                                        placeholder="Entrer la quantité" />
                                      <div v-if="validateRowProduit(produit.qtite)" class="invalid-feedback">
                                        La quantité est obligatoire.
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-md-2 mb-2">
                                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                      @click="removeRowProduit(magasinIndex, produitIndex)">
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

            <div class="col-md-12 mt-3">
              <div class="d-flex justify-content-start mb-4">
                <button class="btn btn-success me-5" type="submit" :disabled="isDisable"
                  :class="{ 'cursor-not-allowed': isDisable }">
                  Ajouter une sortie
                </button>

                <router-link to="/sorties/liste-sorties" class="btn btn-danger"><i
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
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { Form, Field, ErrorMessage, useFieldArray } from "vee-validate";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { Sortie, SortieDepot } from "@/models/Sortie";
import { Produit, ProduitDepot } from "@/models/Produit";
import { MagasinDepot } from "@/models/Magasin";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import { getUserId } from "@/services/JwtService";

export default defineComponent({
  name: "AddSortie",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const sortieSchema = Yup.object().shape({
      motifSortie: Yup.string().required("Le motif est obligatoire"),
      // client: Yup.string().required(
      //   "La personne est oblgatoire est obligatoire"
      // ),

      recuperant: Yup.string().required("Le récupérant est obligatoire"),
      beneficiaire: Yup.string().required("Le bénéficiaire est obligatoire"),
      dateSortie: Yup.date().required("La date de sortie est obligatoire"),
    });

    const sortieForm = ref<Sortie | null>(null);
    const router = useRouter();
    // const clientOptions = ref([]);
    const groupeTaxeOptions = ref([]);
    const modePrixOptions = ref([]);
    const magasinOptions = ref([]);
    const methodeOptions = ref([]);
    const produitOptions = ref([]);

    const idSortie = ref(0);
    const idProduit = ref(0);
    const prixProd = ref();
    const valuess = ref();
    // formulaire dynamique start

    const isDisable = ref(true);
    const magasins = reactive([
      {
        magasin: "",
        produits: [
          {
            produit: "",
            qtite: 0,
            prixUnitaire: 0,
          },
        ],
      },
    ]);

    const addRowMagasin = () => {
      magasins.push({
        magasin: "",
        produits: [
          {
            produit: "",
            qtite: 0,
            prixUnitaire: 0,
          },
        ],
      });
    };

    const addRowProduit = (magasinIndex) => {
      magasins[magasinIndex].produits.push({
        produit: "",
        qtite: 0,
        prixUnitaire: 0,
      });
    };



    const removeRowMagasin = (index) => {
      magasins.splice(index, 1);
      totals();
    };

    const removeRowProduit = (magasinIndex, produitIndex) => {
      magasins[magasinIndex].produits.splice(produitIndex, 1);
      totals();
    };

    const selectMag = (selectedMagasin, magasin) => {
      magasin.magasin = selectedMagasin;
    };

    const selectProd = (selectedProduit, produit) => {
      produit.produit = selectedProduit;
      produit.prixUnitaire = selectedProduit.split("|")[2];
      produit.qtite = 0;
      totals();
    };

    const validateRowProduit = (value) => {
      return value === "" || value === 0 || value === "0" || value == null || value < 0;
    };

    watch(
      magasins,
      () => {
        isDisable.value = magasins.some(
          (magasin) =>
            magasin.magasin === "" ||
            magasin.produits.some(
              (produit) =>
                produit.produit === "" ||
                produit.prixUnitaire === 0 ||
                produit.qtite === 0
            )
        );
        totals();
      },
      { deep: true }
    );
    const montantTotal = ref(0);

    const totals = () => {
      montantTotal.value = magasins.reduce((total, magasin) => {
        return total + magasin.produits.reduce((subtotal, produit) => {
          return subtotal + produit.qtite * produit.prixUnitaire;
        }, 0);
      }, 0);
      console.log("totals", montantTotal.value);
    };

    onMounted(() => {
      fetchMagasins();
      fetchProduits();
      // fetchClient();
    });

    const magasinsss = ref(null);
    const produitsss = ref(null);

    const fetchMagasins = async () => {
      try {
        const response = await axios.get("/all/all/magasins");
        const magasinsData = response.data.data;
        magasinsss.value = magasinsData;
        magasinOptions.value = magasinsData.map((magasin) => ({
          value: magasin.id + "|" + magasin.nomMagasin,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    // const fetchProduits = async () => {
    //   try {
    //     const response = await axios.get("all/produits");
    //     const produitsData = response.data.data.data;
    //     produitsss.value = produitsData;
    //     produitOptions.value = produitsData.map((produit) => ({
    //       value: produit.id + "|" + produit.nomProd + "|" + produit.prixVente,
    //       label: `${produit.refProd} - ${produit.nomProd}`,
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

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
    // const getIndex = (event, produit) => {
    //   console.log("event", event.data);
    //   if (produit.qtite != null && produit.prixUnitaire != null) {
    //     montantTotal.value = produit.qtite * produit.prixUnitaire;
    //     console.log("getIndex", montantTotal.value);
    //   }
    //   totals();
    // };


    const getIndex = (event, produit) => {
      console.log("event", event.data);
      totals();
    };
    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const addSortie = async (values, { resetForm }) => {
      console.log("valeurrrr", values);
      // const currentUserId = getUserId();
      // if (!currentUserId) {
      //   error("Utilisateur non connecté. Veuillez vous connecter.");
      //   return;
      // } 
      values.magasins = magasins.map((magasin) => ({
        magasin: magasin.magasin.split("|")[0],
        produits: magasin.produits.map((produit) => ({
          produit: produit.produit.split("|")[0],
          qtitePhysique: produit.prixUnitaire,
          qtiteLogique: produit.qtite,
          nomProd: produit.produit.split("|")[1],
        })),
      }));
      values.montantTotal = montantTotal.value;
      // values.user = currentUserId,

      console.log("Données envoyées", values);
      ApiService.post("/sorties", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeSortie" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    // const fetchClient = async () => {
    //   try {
    //     const response = await ApiService.get("all/clients");
    //     const clientData = response.data.data.data;
    //     clientOptions.value = clientData.map((client) => ({
    //       value: client.id,
    //       label: `${
    //         client.nomClient
    //           ? client.nomClient + " " + client.prenomClient
    //           : client.raisonSociale
    //       }`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };

    return {
      sortieSchema,
      addSortie,
      sortieForm,
      // clientOptions,
      modePrixOptions,
      groupeTaxeOptions,
      methodeOptions,
      magasins,
      removeRowMagasin,
      removeRowProduit,
      addRowMagasin,
      addRowProduit,
      validateRowProduit,
      montantTotal,
      valuess,
      idSortie,
      magasinOptions,
      produitOptions,
      prixProd,
      selectProd,
      selectMag,
      getIndex,
      isDisable,
      getCurrentDate,
    };
  },
});
</script>
@/models/CategorieInfo

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}

.marge-droite {
  margin-left: 150px;
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
