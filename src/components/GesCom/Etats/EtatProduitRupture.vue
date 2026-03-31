<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center" style="width:100%;">
        <Form ref="etatForm" :validation-schema="etatSchema" style="width:100%;">
          <div class="row">
            <div class="col-4">
              <div class="form-group mb-15 mt-30 mb-sm-20 mb-md-25">
                <Field name="recherche" type="text" v-model="recherche" style="margin-top:30px;"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Rechercher" />
                <ErrorMessage name="recherche" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date Début
                </label>
                <Field name="debut" type="date" v-model="debut" style="background-color: #fff;"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Choisisser la date" />
                <ErrorMessage name="debut" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date Fin
                </label>
                <Field name="fin" v-model="fin" type="date" style="background-color: #fff;"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Choisisser la date" />
                <ErrorMessage name="fin" class="text-danger" />
              </div>
            </div>
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
                Seuil Rupture
              </th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(produit, index) in produits" :key="index">
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ produit.refProd }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis"
                >
              {{ produit.nomProd  }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ produit?.famille.codeFamille }}
            </td>
             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ produit.seuilRupture }}
            </td>
            
          </tr>
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
import * as Yup from 'yup';

export default defineComponent({
  name: "EtatProduitRupture",
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

   
    const produits = ref<Array<any>>([]);
    const recherche = ref("")

    const etatForm = ref<any | null>({});
      
    const etatSchema = Yup.object().shape({
      fin: Yup.date().notRequired(),
      recherche: Yup.string().notRequired(),
      debut: Yup.date().notRequired(),
    });

    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const debut = ref("");
    const fin = ref("");
    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllProduits(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllProduits(page.value, limit.value, searchTerm.value);
    }

    function getAllProduits(page = 1, limi = 10, searchTerm = '',debutDate = debut.value, finDate = fin.value) {
      ApiService.get(`/etatProduitRupture?page=${page}&limit=${limi}&motCle=${searchTerm}&debut=${debutDate}&fin=${finDate}&`)
        .then(({ data }) => {

          produits.value = data.data.retour.entities;
          console.log("data ====> ", produits.value);
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
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
      produits,
      checkPermission,
      getAllProduits,
      page,
      totalPages,
      limit,
      debut, fin,
      totalElements,
      handlePaginate,
      etatForm,
      etatSchema,      
      recherche,
      searchTerm,
      rechercher
    };
  },
});
</script>