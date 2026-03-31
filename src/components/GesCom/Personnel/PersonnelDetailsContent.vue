<template>
     <div class="container-fluid">
        <div class="row">
            <div class="col-12">
            <div class="card">
                <div class="">
                    <div class="card-header"><h5 class="">Formulaire d'ajout de personnel</h5><!----><!----><!----></div>
                    <div class="card-body">
                        <div class="row g-xl-5 g-3">
                            
        <div class="sidebar-body advance-options">
            <ul class="nav nav-tabs border-tab mb-0" id="advance-option-tab" role="tablist">
                <li class="nav-item"><a class="nav-link active" id="info-personnel-tab" data-bs-toggle="tab"
                        href="#info-personnel" role="tab" aria-controls="info-personnel"
                        aria-selected="true">Informations sur le personnel</a></li>
                <li class="nav-item"><a class="nav-link" id="adresse-contact-tab" data-bs-toggle="tab"
                        href="#adresse-contact" role="tab" aria-controls="adresse-contact"
                        aria-selected="false">Adresses et contacts</a></li>
                <li class="nav-item"><a class="nav-link" id="info-conjoint-tab" data-bs-toggle="tab"
                        href="#info-conjoint" role="tab" aria-controls="info-conjoint"
                        aria-selected="false">Conjoints et enfants</a></li>
                 <li class="nav-item"><a class="nav-link" id="info-sante-personnel-tab" data-bs-toggle="tab"
                        href="#info-sante-personnel" role="tab" aria-controls="info-sante-personnel"
                        aria-selected="false">Santé et physique</a></li>
                <li class="nav-item"><a class="nav-link" id="info-bancaire-tab" data-bs-toggle="tab"
                        href="#info-bancaire" role="tab" aria-controls="info-bancaire"
                        aria-selected="false">Banques et personne à contacter</a></li>
            </ul>
            <div class="tab-content" id="advance-product">
                <div class="tab-pane fade show active" id="info-personnel" role="tabpanel" aria-labelledby="info-personnel-tab">
                    <div class="meta-body">
                    <table class="table">
                   Bonjour
                   <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{ personnel?.nom }}</td>
                </tr>
                <tr>
                  <td>Prénom</td>
                  <td>{{ personnel?.prenom }}</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{ personnel?.adresse }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ personnel?.email }}</td>
                </tr>
                <tr v-if="personnel?.tel">
                  <td>Téléphone </td>
                  <td>{{ personnel?.tel}}</td>
                </tr>
                <tr>
                  <td>Sexe</td>
                  <td>{{ personnel?.sexe }}</td>
                </tr>
                <tr>
                  <td>Civilite</td>
                  <td>{{ personnel?.civilite }}</td>
                </tr>
              </tbody>
                   bgij
                    </table>
                    </div>
                </div>
                <div class="tab-pane" id="adresse-contact" role="tabpanel" aria-labelledby="adresse-contact-tab">
                    <div class="meta-body">
                        <table class="table">
                   
                    </table>
                    </div>
                </div>
                <div class="tab-pane fade " id="info-conjoint" role="tabpanel" aria-labelledby="info-conjoint-tab">
                    <div class="meta-body">
                        
                    </div>
                </div>
                <div class="tab-pane fade " id="info-sante-personnel" role="tabpanel" aria-labelledby="info-sante-personnel-tab">
                    <div class="meta-body">
                        
                    </div>
                </div>
                <div class="tab-pane" id="info-bancaire" role="tabpanel" aria-labelledby="info-bancaire-tab">
                    <div class="meta-body">
                        
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

</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Personnel } from "@/models/Personnel";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PersonnelDetailsContent",
  setup: () => {
    const route = useRoute();
    const personnel = ref<Personnel | null>(null);

    function getPersonnel(id: string) {
      return ApiService.get("/personnels", id)
        .then(({ data }) => {
          personnel.value = data.data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getPersonnel(id);
    });

    return { 
      personnel,
      getPersonnel,
     };
  },
});
</script>
