<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center" style="width:100%;">
        <Form style="width:100%;" class="search-bg svg-color pt-3">
          <div class="row">
            <div class="col-4">
              <div class="form-group mb-15 mt-30 mb-sm-20 mb-md-25">
                <Field name="recherche" type="text" v-model="recherche" class="form-control shadow-none text-black"
                  placeholder="Rechercher" />
                <ErrorMessage name="recherche" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date Début 
                </label>
                <Field name="debut" type="date" v-model="debut" style="background-color: #fff;"
                  class="form-control shadow-none rounded-0 text-black" placeholder="Choisisser la date" />
                <ErrorMessage name="debut" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date Fin 
                </label>
                <Field name="fin" v-model="fin" type="date" style="background-color: #fff;"
                  class="form-control shadow-none rounded-0" placeholder="Choisisser la date" />
                <ErrorMessage name="fin" class="text-danger" />
              </div>
            </div>

            <!--<div class="col-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Mode de paiement <span class="text-danger">*</span>
                  </label>
                  <Field name="modeleBoite" v-model="model" v-slot="{ field }">
                    <Multiselect :options="modeOptionsPaiements" :searchable="true" no-results-text="Aucun mode trouvé"
                      v-model="field.value" v-bind="field" placeholder="Sélectionner le mode de paiement" />
                  </Field>
                  <ErrorMessage name="modeleBoite" class="text-danger" />
                </div>
              </div>
  
              <div v-if="!etatAgence" class="col-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Agence <span class="text-danger">*</span>
                  </label>
                  <Field name="bureau" v-model="bureau" v-slot="{ field }">
                    <Multiselect :options="bureausBoitesOptions" :searchable="true" v-model="field.value"
                      no-results-text="Aucune agence trouvée" v-bind="field" placeholder="Sélectionner une agence" />
                  </Field>
                  <ErrorMessage name="bureau" class="text-danger" />
                </div>
              </div>
              <div class="col-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Type de paiement {{ montantTotal }}<span class="text-danger">*</span>
                  </label>
                  <Field name="option" v-model="etat" v-slot="{ field }">
                    <Multiselect :options="etatsOptions" :searchable="true" v-model="field.value" v-bind="field"
                      no-results-text="Aucun type trouvé" placeholder="Sélectionner un type de paiement" />
                  </Field>
                  <ErrorMessage name="option" class="text-danger" />
                </div>
              </div>-->
          </div>
        </Form>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Code
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Nom produit
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Famille
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Quantité
              </th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(item, i) in apropocondis" :key="i">
              <tr v-for="(apropocondi, index) in item.apropocondis" :key="index">
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ apropocondi?.produitcondi?.produit?.codeProduit }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ apropocondi?.produitcondi?.produit?.nomProd + ' [' +
                    apropocondi?.produitcondi?.conditionnement?.code + ']' }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ apropocondi?.produitcondi?.produit?.famille?.codeFamille }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ apropocondi?.qtite }}
                </td>
              </tr>
            </template>
          </tbody>

        </table>
      </div>
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import { Depense } from "@/models/Depense";
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "EtatProduitsEntree",
  components: {
    PaginationComponent,
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    onMounted(() => {
      getAllProduits();
    });

    // const formatDate = (date: Date): string => {
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, '0');
    //   const day = String(date.getDate()).padStart(2, '0');
    //   return `${year}-${month}-${day}`;
    // };
    const debut = ref("");
    const fin = ref("");

    const apropocondis = ref<Array<any>>([]);
    const recherche = ref("")

    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
         getAllProduits(page_, limit_, recherche.value, debut.value, fin.value);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllProduits(page.value, limit.value, searchTerm.value);
    }

    function getAllProduits(page = 1, limi = 10, searchTerm = '', debutDate = debut.value, finDate = fin.value) {
      ApiService.get(`/etatProduitsEntrees?page=${page}&limit=${limi}&motCle=${searchTerm}&debut=${debutDate}&fin=${finDate}`)
        .then(({ data }) => {
          apropocondis.value = data.data.retour.entities;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    watch([recherche, debut, fin], () => {
      getAllProduits(1, limit.value, recherche.value, debut.value, fin.value);
    });


    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return {
      apropocondis,
      checkPermission,
      getAllProduits,
      page,
      totalPages,
      limit,
      debut, fin,
      totalElements,
      handlePaginate,
      rechercher,
      recherche,
      searchTerm
    };
  },
});
</script>