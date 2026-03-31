<template>
    <div class="notification-box">
        <a class="btn btn-primary" href="#">
            Pv : {{ point_vente }}
        </a>
    </div>

    <div class="onhover-show-div notification-dropdown" style="width:500px">
        <!-- <ul class="modal-img">
            <li> <img src="@/assets/images/gif/danger.gif" width="80px" alt="error"></li>
        </ul> -->
        <div class="mx-5 my-5 text-center">
            <h4 class="text-center pb-2"><img src="@/assets/images/gif/danger.gif" width="50px" alt="error">Vous êtes sur le point de changer de point de vente</h4>
            <!-- <img src="@/assets/images/gif/danger.gif" width="80px" alt="error"> -->
            <p class="text-center">si vous changer de de point de vente,
                toutes les opérations que vous ferez seraient dans ce point de vente.</p>
            <div class="m-5">
                <select class="form-select" @change="changePointVente($event.target.value)">
                    <option value="" selected disabled>Sélectionner un point de vente</option>
                    <option v-for="(point,index) in pointOptions" :value="point.value" :key="index">{{ point.label }}</option>
                </select>
                <!-- <Multiselect :options='["Azzz","Baaaaaaa","zzzzzzzz"]' :searchable="true" @select="changePointVente"
                    placeholder="Sélectionner un produit" /> -->
            </div>
        </div>
    </div>
    <!-- <div class="modal fade" id="PointVenteModal" tabindex="-1" role="dialog" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
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
                            placeholder="Sélectionner un produit" />
                        </div>
                       <div class="modal-footer">
                        <button class="btn btn-primary" type="button"
                            data-bs-dismiss="modal">Changer le point de vente</button>
                        <button class="btn btn-danger" type="button"
                            data-bs-dismiss="modal">Fermer</button>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import JwtService from "@/services/JwtService";
import Multiselect from '@vueform/multiselect/src/Multiselect';
import "vue-multiselect/dist/vue-multiselect.css"
import "@vueform/multiselect/themes/default.css";

let point_vente = ref<string>("");
let pointOptions = ref<Array<{ value: "", label: "" }>>([]);

onMounted(() => {
    if (JwtService.getPointDeVente()) {
        point_vente.value = JwtService.getPointDeVente()!;
    }
    if (JwtService.getPointDeVentes()) {
        console.log(JwtService.getPointDeVentes(),"ddddddddddddddd")
        pointOptions.value = JwtService.getPointDeVentes().map((point: any) => {
            return { 
                value: point.id + "|" + point.nomPointVente, 
                label: point.nomPointVente 
            }
        });
    }
});

const changePointVente = (value: any) => {
    console.log(value, "value")
    point_vente.value = value.split("|")[1];
    JwtService.savePointDeVente(value.split("|")[1]);
    JwtService.savePointDeVenteId(value.split("|")[0]);
}

</script>