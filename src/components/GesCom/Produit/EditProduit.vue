<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Modifier un produit</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="produitForm" @submit="editProduit" :validation-schema="produitSchema" :initial-values="produitForm">
        <div class="row gx-1">
          <div class="col-md-12">
            <div class="row row gx-2">
              <div class="col-md-2">
                <!--<div class="form-check">
                  <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                    Est Service ?
                  </label>
                  <input id="estService" name="estService" v-model="estService" :value="estService" type="checkbox"
                    class="form-check-input shadow-none" />
                  <ErrorMessage name="estService" class="text-danger" />
                </div>-->
                <label class="d-block text-black fw-semibold mb-1">
                  Image Produit
                </label>
                <div class="upload-container">
                  <input type="file" ref="fileInput" @change="(event) => onFilePrinChange(event)"
                    accept="image/jpeg, image/png, image/jpg" hidden />
                  <!-- Carte d'aperçu (cliquable pour choisir une image) -->
                  <div class="preview-card" @click="triggerFileInput">
                    <img v-if="imagePreview" :src="imagePreview" alt="Image preview" />
                    <div v-else class="text-center">
                      <div>
                        <i class="icofont icofont-camera fs-1"></i>
                      </div>
                      Cliquez pour ajouter l'image principal du produit
                    </div>
                    <!-- Bouton de suppression sur l'image -->
                    <button v-if="imagePreview" class="delete-btn" @click.stop="removeImage"><i
                        class="icofont icofont-close"></i></button>
                  </div>
                </div>
              </div>
              <div class="col-md-10">
                <div class="row gx-1">
                  <div class="col-md-3">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Code du produit
                      </label>
                      <Field type="text" v-model="codeProduit" name="code"
                        class="form-control shadow-none fs-md-15 text-black" readonly="true"
                        placeholder="Ce code est généré" />
                      <ErrorMessage name="code" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Référence usine du produit
                      </label>
                      <Field name="refProd" type="text" class="form-control shadow-none fs-md-15 text-black"
                        placeholder="Entrer la référence" />
                      <ErrorMessage name="refProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Famille du produit<span class="text-danger">*</span>
                      </label>
                      <Field name="famille" v-slot="{ field }" v-model="famille">
                        <Multiselect :options="familleOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" @select="selectFamille(field.value)"
                          placeholder="Sélectionner la famille" />
                      </Field>
                      <ErrorMessage name="famille" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-sm-2 mb-md-2" ref="dropdownRef">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom du Produit<span class="text-danger">*</span>
                      </label>
                      <Field name="nomProd" type="text" v-model="prodName" @focus="showBox = true"
                        class="mb-2 form-control shadow-none fs-md-15 text-black"
                        placeholder="Entrer le nom du produit" />
                      <ul class="dropdown-menu show " v-if="produitOptions.length > 0 && showBox==true">
                        <li v-for="(produit, index) in produitOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ produit.codeProduit }} - {{
                            produit.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3" ref="dropdownRef1">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom Standar du produit
                      </label>
                      <Field name="nomStandar" type="text" v-model="prodNameS" @focus="showBoxStan = true"
                        class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom" />
                      <ul class="dropdown-menu show " v-if="produitStanOptions.length > 0 && showBoxStan==true">
                        <li v-for="(produit, index) in produitStanOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ produit.codeProduit }} - {{
                            produit.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomStandar" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3" ref="dropdownRef2">
                      <label class="d-block text-black fw-semibold mb-1">
                        Nom marché du produit
                      </label>
                      <Field name="nomMarche" type="text" v-model="prodNameM" @focus="showBoxM = true"
                        class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom marché" />
                      <ul class="dropdown-menu show " v-if="produitMarOptions.length > 0 && showBoxM==true">
                        <li v-for="(produit, index) in produitMarOptions" :key="index">
                          <a class="dropdown-item" href="javascript:void(0);">{{ produit.codeProduit }} - {{
                            produit.nomProd }}</a>
                        </li>
                      </ul>
                      <ErrorMessage name="nomMarche" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Marque du produit<span class="text-danger">*</span>
                      </label>
                      <Field name="marqProd" v-slot="{ field }">
                        <Multiselect :options="marqueOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Choisir la marque" />
                      </Field>
                      <ErrorMessage name="marqProd" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Unité de Stockage
                      </label>
                      <Field name="uniteStock" v-slot="{ field }">
                        <Multiselect :options="conditionnementOptions" :searchable="true" track-by="label" label="label"
                          v-model="field.value" v-bind="field" placeholder="Choisir l'unité de stockage" />
                      </Field>
                      <ErrorMessage name="uniteStock" class="text-danger" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-3 mb-sm-3 mb-md-3">
                      <label class="d-block text-black fw-semibold mb-1">
                        Unité de gestion
                      </label>
                      <Field name="uniteGestion" v-slot="{ field }">
                        <Multiselect :options="conditionnementgOptions" :searchable="true" track-by="label"
                          label="label" v-model="field.value" v-bind="field" placeholder="Choisir l'unité de gestion" />
                      </Field>
                      <ErrorMessage name="uniteGestion" class="text-danger" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Méthode de Suivi de stock <span class="text-danger">*</span>
              </label>
              <Field name="suiviStock" type="text" v-slot="{ field }">
                <Multiselect :searchable="true" :options="['CUMP', 'FIFO', 'LIFO', 'Par lot']" v-model="field.value"
                  v-bind="field" placeholder="Sélectionner la méthode" />
              </Field>
              <ErrorMessage name="suiviStock" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Pays de Fabrication <span class="text-danger">*</span>
              </label>
              <Field name="paysProduction" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="pays" :searchable="true"
                  placeholder="Sélectionner le pays de fabrication" />
              </Field>
              <ErrorMessage name="paysProduction" class="text-danger" />
            </div>
          </div>
          <div class="col-md-8">
            <div class="form-group mb-3 mb-sm-3 mb-md-3">
              <label class="d-block text-black fw-semibold mb-1">
                Description du produit
              </label>
              <Field name="descProd" as="textarea" cols="15" rows="1" placeholder="Entrer la description"
                v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                <textarea class="form-control shadow-none rounded-0 text-black" v-model="field.value"></textarea>
              </Field>
              <ErrorMessage name="descProd" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-1">
                    Seuil d'approvisionnement
                </label>
                <Field name="seuilAppro" type="number"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le seuil d'approvisionnement" />
                <ErrorMessage name="seuilAppro" class="text-danger" />
            </div>
        </div>

          <div class="col-md-3" v-for="(champsLibre, index) in chamsdescritifs" :key="index">
            <div class="form-group mb-3 mb-sm-3 mb-md-3">
              <label class="d-block text-black fw-semibold mb-1">
                {{ champsLibre.libelleChamp }} <span class="text-danger" v-if="champsLibre.estObligatoire == 1">*</span>
              </label>
              <input
                :class="(valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1) ? 'form-control shadow-none fs-md-15 text-black is-invalid ' : 'form-control shadow-none fs-md-15 text-black '"
                v-model="champsLibre.valeur" :name="champsLibre.nomChamp" :type="champsLibre.typeChamp" />
              <div v-if="valideteRowProduit(champsLibre.valeur) && champsLibre.estObligatoire == 1" class="text-danger">
                {{ champsLibre.libelleChamp }} est obligatoire.
              </div>
            </div>
          </div>


          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit">
                Modifier un produit
              </button>
              <router-link to="/produits/liste-produits" class="btn btn-danger"><i
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

import { defineComponent, ref, onMounted, reactive, watch, onBeforeUnmount } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success, getUrlApiForProductFiles } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Produit } from '@/models/Produit';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'
import DropZone from "dropzone-vue";
import { ChampsLibre } from "@/models/ChampsLibre";
import axios from 'axios';

export default defineComponent({
  name: "EditProduit",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    DropZone
  },
  setup: () => {
    const produitSchema = Yup.object().shape({
      marqProd: Yup.string().required("La marque est obligatoire"),
      suiviStock: Yup.string().required("La méthode est obligatoire"),
      refProd: Yup.string().notRequired(),
      nomProd: Yup.string().required("Le nom est obligatoire"),
      nomStandar: Yup.string().notRequired(),
      nomMarche: Yup.string().notRequired(),
      imagePrincipal: Yup.string().notRequired(),
      famille: Yup.string().required("La famille est obligatoire"),
      uniteGestion: Yup.string().notRequired(),
      uniteStock: Yup.string().notRequired(),
      descProd: Yup.string().notRequired(),
      paysProduction: Yup.string().notRequired(),
      seuilAppro: Yup.number().notRequired(),
    });
    const produitForm = ref<Produit | null>(null);
    const router = useRouter();
    const route = useRoute();
    const familleOptions = ref([]);
    const marqueOptions = ref([]);
    const produitStanOptions = ref([]);
    const produitMarOptions = ref([]);
    const prodName = ref("");
    const prodNameS = ref("");
    const prodNameM = ref("");
    const codeProduit = ref("");

    const methodeOptions = ref([]);

    const isDisableCha = ref(false);
    const defaultImage = 'path/to/your/default-image.jpg'; // Chemin de l'image par défaut
    const hasFiles = ref(false); // Indicateur pour savoir si des fichiers ont été déposés
    const toutFichier = ref<Array<File>>([])
    const conditionnementOptions = ref([]);
    const produitOptions = ref([]);
    const prixProd = ref();
    const produitsss: any = ref(null);
    const valuess = ref();
    const chamsdescritifs = reactive<Array<ChampsLibre>>([]);


    const dropzoneOptions = {
      url: 'your-upload-url', // URL de téléchargement des fichiers
      thumbnailWidth: 150,
      maxFilesize: 2,
      headers: { "My-Awesome-Header": "header value" }
    };

    const onSuccess = (file) => {
      hasFiles.value = true; // Mettre à jour l'indicateur lorsqu'un fichier est déposé avec succès
    };

    const onError = (file, message) => {
      console.error('File upload error:', message);
    };



    watch(prodName, (newValue, oldValue) => {
      if (newValue != "" && newValue.length >= 3) {
        fetchProduis(newValue);
      } else {
        produitOptions.value = [];
      }
    })

    watch(prodNameS, (newValue, oldValue) => {
      if (newValue != "" && newValue.length >= 3) {
        fetchSProduis(newValue);
      } else {
        produitStanOptions.value = [];
      }
    })

    watch(prodNameM, (newValue, oldValue) => {
      if (newValue != "" && newValue.length >= 3) {
        fetchMProduis(newValue);
      } else {
        produitMarOptions.value = [];
      }
    })

    const montantTotal = ref(0);
    const isDisable = ref(true);
    const isDisablee = ref(true);
    const famille = ref();
    const unite = ref();
    const conditionnements = reactive([]);
    const conditionnementgOptions = ref([]);
    const uniteStock = ref();
    const showBox = ref(false);
    const showBoxM = ref(false);
    const showBoxStan = ref(false);

    function getProduit(id: number) {
      ApiService.get("/produits/" + id.toString())
        .then(({ data }) => {
          console.log(data.data, "datadatadatadatadatadatadatadata");
          for (const key in data.data) {
            produitForm.value?.setFieldValue(key, (typeof data.data[key] === 'object' && data.data[key] !== null) ? data.data[key].id : data.data[key]);
          }
          produitForm.value?.setFieldValue("famille", data.data["famille"].id)
          console.log("famille ===> ", data.data["famille"])
          famille.value = parseInt(data.data["famille"].id);
          uniteGestion.value = parseInt(data.data["uniteGestion"].id);
          uniteStock.value = parseInt(data.data["uniteStock"].id);
          codeProduit.value = data.data["codeProduit"];
          if (data.data["imagePrincipal"] != null) {
            imagePreview.value = getUrlApiForProductFiles(data.data["imagePrincipal"]);
          }

          if (data.data["produitchampslibres"] != null) {
            data.data["produitchampslibres"].forEach(element => {
              chamsdescritifs.push({
                id: parseInt(element.champslibre.id),
                libelleChamp: element.champslibre.libelleChamp,
                estObligatoire: element.champslibre.estObligatoire,
                typeChamp: element.champslibre.typeChamp,
                nomChamp: element.champslibre.nomChamp,
                valeur: element.valeur,
                idProChamp: (element.id) ? parseInt(element.id) : null,
              });
            });

          }

          console.log("FOOROROROROROMMM ===> ", famille.value)
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    const editProduit = async (values, { resetForm }) => {
      const data = produitForm.value;
      values["famille"] = famille.value;
      //values["uniteGestion"] = uniteGestion.value.split("|")[0]
      //values["uniteStock"] = uniteStock.value.split("|")[0]
      values.champsdescritifs = chamsdescritifs.map(champsdescritif => ({
        champslibre: champsdescritif.id,
        valeur: champsdescritif.valeur,
        idProChamp: (champsdescritif.idProChamp) ? champsdescritif.idProChamp : null
      }));
      console.log(values, "valuesvaluesvaluesvalues");
      ApiService.put("/produits/" + route.params.id, values)
        .then(({ data }) => {
          console.log(data, "datadatadatadatadatadatadatadata");
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeProduit" });
          }
        }).catch(({ response }) => {
          error(response.message);
        });
    };


    const fetchMarque = async () => {
      try {
        const response = await ApiService.get("all/all/marques");
        const marqueData = response.data.data.data;
        marqueOptions.value = marqueData.map((marque) => ({
          value: marque.id,
          label: marque.libelle,
        }));
      } catch (error) {
        //
      }
    };

    const fetchAllChamps = async (id) => {
      try {
        const response = await axios.get("/champsdescritif/famille/" + id);
        console.log(response.data, "response.dataresponse.dataresponse.data");
        chamsdescritifs.length = 0;
        response.data.data.forEach(element => {
          chamsdescritifs.push(element.champslibre);
        });
        console.log(chamsdescritifs, "chamsdescritifs.valuechamsdescritifs.value");

      } catch (error) {
        //
      }
    };




    const fetchFamille = async () => {
      try {
        const response = await ApiService.get('/all/all/familles');
        const familleData = response.data.data.data;
        familleOptions.value = familleData.map((famille) => ({
          value: famille.id,
          label: `${famille.codeFamille} - ${famille.libelleFamille}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`produits/recherche?keyword=${newValue}&type=0`);
        console.log(response, "responseresponseresponseresponse");
        produitOptions.value = response.data.data;;
      } catch (error) {
        //
      }
    };

    const fetchSProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`produits/recherche?keyword=${newValue}&type=1`);
        console.log(response, "responseresponseresponseresponse");
        produitStanOptions.value = response.data.data;;
      } catch (error) {
        //
      }
    };

    const fetchMProduis = async (newValue) => {
      try {
        const response = await ApiService.get(`produits/recherche?keyword=${newValue}&type=2`);
        console.log(response, "responseresponseresponseresponse");
        produitMarOptions.value = response.data.data;;
      } catch (error) {
        //
      }
    };


    watch(prodName, (newValue, oldValue) => {
      if (newValue && newValue.length >= 3) {
        fetchProduis(newValue);
      } else {
        produitOptions.value = [];
      }
    })

    watch(prodNameS, (newValue, oldValue) => {
      if (newValue && newValue.length >= 3) {
        fetchSProduis(newValue);
      } else {
        produitStanOptions.value = [];
      }
    })

    watch(prodNameM, (newValue, oldValue) => {
      if (newValue && newValue.length >= 3) {
        fetchMProduis(newValue);
      } else {
        produitMarOptions.value = [];
      }
    })

    const selectFamille = (value) => {
      console.log(value, "valuevaluevaluevalue");
      if (parseInt(value) > 0) {
        fetchAllChamps(parseInt(value));
      } else {
        chamsdescritifs.length = 0;
      }
    }

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };


    watch(chamsdescritifs, (newValue, oldValue) => {
      const newValueLast = newValue.filter(order => order.estObligatoire == 1);
      console.log(newValueLast, "newValueLastnewValueLast");
      Object.keys(newValueLast).forEach(function (key) {
        if (newValueLast[key].valeur == "" || newValue[key].valeur == 0) {
          if (newValueLast[key].estObligatoire == 1) {
            isDisableCha.value = true;
            console.log(isDisableCha.value, "isDisableCha.value true");
          }
        } else {
          isDisableCha.value = false;
          console.log(isDisableCha.value, "isDisableCha.value false");
        }
      });
    });

    const fetchConditionnements = async () => {
      try {
        const response = await axios.get("/conditionnements");
        const conditionnementsData = response.data.data;
        produitsss.value = conditionnementsData;
        conditionnementOptions.value = conditionnementsData.map((conditionnement) => ({
          value: conditionnement.id,
          label: `${conditionnement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchConditionnementugs = async () => {
      try {
        const response = await axios.get("/conditionnementugs");
        const conditionnementgData = response.data.data;
        produitsss.value = conditionnementgData;
        conditionnementgOptions.value = conditionnementgData.map((conditionnement) => ({
          value: conditionnement.id,
          label: `${conditionnement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };


    const uniteGestion = ref(null);
    const fileInput = ref(null);
    const imagePreview = ref(null);
    const imageFile = ref<File>(null);

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const onFilePrinChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const pays = [
      "Afghanistan",
      "Afrique du Sud",
      "Albanie",
      "Algérie",
      "Allemagne",
      "Andorre",
      "Angola",
      "Anguilla",
      "Antarctique",
      "Antigua-et-Barbuda",
      "Antilles Néerlandaises",
      "Arabie Saoudite",
      "Argentine",
      "Arménie",
      "Aruba",
      "Australie",
      "Autriche",
      "Azerbaïdjan",
      "Bahamas",
      "Bahreïn",
      "Bangladesh",
      "Barbade",
      "Bélarus",
      "Belgique",
      "Belize",
      "Bénin",
      "Bermudes",
      "Bhoutan",
      "Bolivie",
      "Bosnie-Herzégovine",
      "Botswana",
      "Brésil",
      "Brunéi Darussalam",
      "Bulgarie",
      "Burkina Faso",
      "Burundi",
      "Cambodge",
      "Cameroun",
      "Canada",
      "Cap-vert",
      "Chili",
      "Chine",
      "Chypre",
      "Colombie",
      "Comores",
      "Costa Rica",
      "Côte d'Ivoire",
      "Croatie",
      "Cuba",
      "Danemark",
      "Djibouti",
      "Dominique",
      "Égypte",
      "El Salvador",
      "Émirats Arabes Unis",
      "Équateur",
      "Érythrée",
      "Espagne",
      "Estonie",
      "États Fédérés de Micronésie",
      "États-Unis",
      "Éthiopie",
      "Fédération de Russie",
      "Fidji",
      "Finlande",
      "France",
      "Gabon",
      "Gambie",
      "Géorgie",
      "Géorgie du Sud et les Îles Sandwich du Sud",
      "Ghana",
      "Gibraltar",
      "Grèce",
      "Grenade",
      "Groenland",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guinée",
      "Guinée Équatoriale",
      "Guinée-Bissau",
      "Guyana",
      "Guyane Française",
      "Haïti",
      "Honduras",
      "Hong-Kong",
      "Hongrie",
      "Île Bouvet",
      "Île Christmas",
      "Île de Man",
      "Île Norfolk",
      "Îles (Malvinas) Falkland",
      "Îles Åland",
      "Îles Caïmanes",
      "Îles Cocos (Keeling)",
      "Îles Cook",
      "Îles Féroé",
      "Îles Heard et McDonald",
      "Îles Mariannes du Nord",
      "Îles Marshall",
      "Îles Mineures Éloignées des États-Unis",
      "Îles Salomon",
      "Îles Turks et Caïques",
      "Îles Vierges Britanniques",
      "Îles Vierges des États-Unis",
      "Inde",
      "Indonésie",
      "Irak",
      "Irlande",
      "Islande",
      "Israël",
      "Italie",
      "Jamahiriya Arabe Libyenne",
      "Jamaïque",
      "Japon",
      "Jordanie",
      "Kazakhstan",
      "Kenya",
      "Kirghizistan",
      "Kiribati",
      "Koweït",
      "L'ex-République Yougoslave de Macédoine",
      "Lesotho",
      "Lettonie",
      "Liban",
      "Libéria",
      "Liechtenstein",
      "Lituanie",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malaisie",
      "Malawi",
      "Maldives",
      "Mali",
      "Malte",
      "Maroc",
      "Martinique",
      "Maurice",
      "Mauritanie",
      "Mayotte",
      "Mexique",
      "Monaco",
      "Mongolie",
      "Montserrat",
      "Mozambique",
      "Myanmar",
      "Namibie",
      "Nauru",
      "Népal",
      "Nicaragua",
      "Niger",
      "Nigéria",
      "Niué",
      "Norvège",
      "Nouvelle-Calédonie",
      "Nouvelle-Zélande",
      "Oman",
      "Ouganda",
      "Ouzbékistan",
      "Pakistan",
      "Palaos",
      "Panama",
      "Papouasie-Nouvelle-Guinée",
      "Paraguay",
      "Pays-Bas",
      "Pérou",
      "Philippines",
      "Pitcairn",
      "Pologne",
      "Polynésie Française",
      "Porto Rico",
      "Portugal",
      "Qatar",
      "République Arabe Syrienne",
      "République Centrafricaine",
      "République de Corée",
      "République de Moldova",
      "République Démocratique du Congo",
      "République Démocratique Populaire Lao",
      "République Dominicaine",
      "République du Congo",
      "République Islamique d'Iran",
      "République Populaire Démocratique de Corée",
      "République Tchèque",
      "République-Unie de Tanzanie",
      "Réunion",
      "Roumanie",
      "Royaume-Uni",
      "Rwanda",
      "Sahara Occidental",
      "Saint-Kitts-et-Nevis",
      "Saint-Marin",
      "Saint-Pierre-et-Miquelon",
      "Saint-Siège (État de la Cité du Vatican)",
      "Saint-Vincent-et-les Grenadines",
      "Sainte-Hélène",
      "Sainte-Lucie",
      "Samoa",
      "Samoa Américaines",
      "Sao Tomé-et-Principe",
      "Sénégal",
      "Serbie-et-Monténégro",
      "Seychelles",
      "Sierra Leone",
      "Singapour",
      "Slovaquie",
      "Slovénie",
      "Somalie",
      "Soudan",
      "Sri Lanka",
      "Suède",
      "Suisse",
      "Suriname",
      "Svalbard et Île Jan Mayen",
      "Swaziland",
      "Tadjikistan",
      "Taïwan",
      "Tchad",
      "Terres Australes Françaises",
      "Territoire Britannique de l'Océan Indien",
      "Territoire Palestinien Occupé",
      "Thaïlande",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinité-et-Tobago",
      "Tunisie",
      "Turkménistan",
      "Turquie",
      "Tuvalu",
      "Ukraine",
      "Uruguay",
      "Vanuatu",
      "Venezuela",
      "Viet Nam",
      "Wallis et Futuna",
      "Yémen",
      "Zambie",
      "Zimbabwe"
    ];

    const removeImage = () => {
      imagePreview.value = null;
      imageFile.value = null;
    };

    const valideteRowProduit = (e) => {
      if (e == "" || e == 0 || e == "" || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

    const dropdownRef = ref(null);
    const dropdownRef1 = ref(null);
    const dropdownRef2 = ref(null);

    function handleClickOutside(event) {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showBox.value = false;
      }

      if (dropdownRef1.value && !dropdownRef1.value.contains(event.target)) {
        showBoxStan.value = false;
      }

      if (dropdownRef2.value && !dropdownRef2.value.contains(event.target)) {
        showBoxM.value = false;
      }
    }

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    onMounted(async () => {
      document.addEventListener('click', handleClickOutside);
      await fetchFamille();
      await fetchMarque();
      await fetchConditionnements();
      await fetchConditionnementugs();
      if (route.params.id) {
        await getProduit(parseInt(route.params.id as string));
      }
    });

    return {
      editProduit,
      codeProduit,
      produitOptions,
      uniteGestion,
      produitStanOptions,
      produitMarOptions,
      prodName,
      prodNameS,
      prodNameM,
      hasFiles,
      produitForm,
      familleOptions,
      marqueOptions,
      methodeOptions,
      valideteRowProduit,
      getUrlApiForProductFiles,
      fetchConditionnementugs,
      conditionnementgOptions,
      conditionnementOptions,
      montantTotal,
      valuess,
      //selectGroupe,
      //images,
      prixProd,
      isDisable,
      isDisablee,
      getCurrentDate,
      isDisableCha,
      //onFileChange,
      dropzoneOptions,
      // onFileAdd,
      //onFileRemove,
      onSuccess,
      onError,
      defaultImage,
      chamsdescritifs,
      selectFamille,
      produitSchema,
      triggerFileInput,
      onFilePrinChange,
      removeImage,
      imagePreview,
      imageFile,
      fileInput,
      pays,famille,
      showBox,
      showBoxM,
      showBoxStan,
      dropdownRef,
      dropdownRef1,
      dropdownRef2
    };
  },
});
</script>
<style scoped>
.dropzone-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: auto;
}

.default-image-container {
  text-align: center !important;
  margin: 20px 0 !important;
}

.default-image {
  width: 100px !important;
  height: auto !important;
}

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

@import 'dropzone-vue/dist/dropzone-vue.common.css';

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.preview-card {
  width: 100%;
  height: 200px;
  border: 2px dashed #4caf50;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background: #f8f8f8;
  position: relative;
}

.preview-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  padding: 5px 8px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
}

.delete-btn:hover {
  background: darkred;
}
</style>
