<template>
  <a  href="javascript:void(0);" data-bs-toggle="modal"  
  data-bs-target="#pointVenteModal">
  <vue-feather type="log-in"></vue-feather><span>Changer de point de vente</span></a>
  <div class="modal fade" id="pointVenteModal" tabindex="-1" role="dialog" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="modal-toggle-wrapper">
            <ul class="modal-img">
              <li> <img src="@/assets/images/gif/danger.gif" alt="error"></li>
            </ul>
            <h4 class="text-center pb-2">Vous êtes sur le point de changer de point de vente</h4>
            <p class="text-center">Vous voulez vraiment changer de point de vente, si oui
              toutes les opérations que vous ferez seraient dans ce point de vente.</p>
            <div class="m-5">
              <Multiselect v-model="point_vente" :options="pointOptions" :searchable="true"
                placeholder="Sélectionner un point de vente" />
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" type="button" data-bs-dismiss="modal">Changer le point de vente</button>
              <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import JwtService from "@/services/JwtService";
import Multiselect from '@vueform/multiselect/src/Multiselect';
import { error,showModal } from "@/utils/utils";

export default defineComponent({
  name: "PointVenteModal",
  components: {
    Multiselect
  },
  setup() {

    const PointVenteModalRef = ref();

    let point_vente = ref<string>("");
    let pointOptions = ref<Array<{ value: "", labele: "" }>>([]);

    onMounted(() => {
      if (JwtService.getPointDeVente()) {
        point_vente.value = JwtService.getPointDeVente()!;
      }
      if (JwtService.getPointDeVentes()) {
        pointOptions.value = JwtService.getPointDeVentes().map((point: any) => {
          return { value: point.id + "|" + point.nomPointVente, label: point.nomPointVente }
        });
      }

    });

    const changePointVente = (value: any) => {
    console.log(value, "value")
    point_vente.value = value.split("|")[1];
    JwtService.savePointDeVente(value.split("|")[1]);
    JwtService.savePointDeVenteId(value.split("|")[0]);
}

    return {
      pointOptions,
      point_vente,
      PointVenteModalRef,
      showModal,
      
    };
  },
});
</script>@/models/CategorieInfo