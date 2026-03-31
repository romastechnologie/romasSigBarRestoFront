<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/societes/liste-societes" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Dénomination</td>
                  <td>{{ societe?.denomination }}</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{ societe?.adresse }}</td>
                </tr>
                <tr>
                  <td>Raison social</td>
                  <td>{{ societe?.raisonSocial }}</td>
                </tr>
                <tr>
                  <td>Ifu</td>
                  <td>{{ societe?.ifu }}</td>
                </tr>
                <tr>
                  <td>Sigle</td>
                  <td>{{ societe?.sigle }}</td>
                </tr>
                <tr>
                  <td>Api</td>
                  <td>{{ societe?.apiNim }}</td>
                </tr>
                <tr>
                  <td>Api token</td>
                  <td>{{ societe?.apiToken }}</td>
                </tr>
                <tr>
                  <td>Lien api</td>
                  <td>{{ societe?.lienApi }}</td>
                </tr>
                <tr>
                  <td>Lieu impressions</td>
                  <td>{{ societe?.lieuImpression }}</td>
                </tr>
                <tr>
                  <td>Message commerciale</td>
                  <td>{{ societe?.messageCommercial }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Societe } from "@/models/Societe";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewSociete",
  setup: () => {
    const route = useRoute();
    const societe = ref<Societe | null>(null);

    function getSociete(id: string) {
      return ApiService.get("/societes", id)
        .then(({ data }) => {
          societe.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getSociete(id);
    });

    return { 
      societe,
      getSociete,
      format_Date,
     };
  },
});
</script>
