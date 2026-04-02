<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
            <div class="card p-2 col-lg-6 col-md-7 mx-auto">
                <template v-for="presence in presences" :key="presence.id">
                    <div v-if="presence.id === +$route.params.id" class="card col-12 p-2 mx-auto">
                        <Form @submit="updatePresence" :validation-schema="schemaPresence()" name="sendPresence">
                            <p class="my-0"> Date </p>
                            <Field type="date" :value="presence.date" name="presenceDate" id="presenceDate"
                                class="form-control mb-1" />
                            <ErrorMessage name="presenceDate" class="text-danger text-start mb-2" />
                            <p class="my-0"> Personnel </p>
                            <input type="text"
                                :value="presence.personnel ? presence.personnel.nom + ' ' + presence.personnel.prenom : ''"
                                readonly class="form-control mb-1" />
                            <p class="my-0"> Heure d'arrivée </p>
                            <Field :value="presence.heureArrivee" type="text" name="heureArrivee" id="heureArrivee"
                                class="form-control mb-1" />
                            <ErrorMessage name="heureArrivee" class="text-danger text-start mb-2" />
                            <p class="my-0"> Heure de depart </p>
                            <Field :value="presence.heureDepart" type="text" name="heureDepart" id="heureDepart"
                                class="form-control mb-1" />
                            <ErrorMessage name="heureDepart" class="text-danger text-start mb-2" />
                            <p class="my-0"> Présence </p>
                            <select name="presenceStatut" id="presenceStatut" class="form-select mb-1">
                                <option value="present"> Présent </option>
                                <option value="absent"> Absent </option>
                            </select>
                            <p class="my-0"> Durée </p>
                            <Field :value="presence.duree" type="text" name="duree" id="duree"
                                class="form-control mb-1" />
                            <ErrorMessage name="duree" class="text-danger text-start mb-2" />
                            <p class="my-0"> Statut justifié </p>
                            <select name="statutJustifie" id="statutJustifie" class="form-select mb-2">
                                <option value="Oui"> Oui </option>
                                <option value="Non"> Non </option>
                            </select>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary col-12" style="background-">
                                    Envoyer </button>
                            </div>
                        </Form>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted} from 'vue'
import Swal from 'sweetalert2';
import axios from 'axios';
import ApiService from '@/services/ApiService';

const router = useRouter()
const route = useRoute()

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
});

const presences = ref([] as any[]);

// ------------------------------------------------ SCHEMA -------------------------------------------------

function schemaPresence() {
    return yup.object().shape({
        presenceDate: yup.date().required("La date est obligatoire."),
        heureArrivee: yup.string().required("L'heure d'arrivée est obligatoire."),
        heureDepart: yup.string().required("L'heure de départ est obligatoire."),
        duree: yup.string().required("La durée est obligatoire."),
    })
}

// ------------------------------------------------ UPDATE -------------------------------------------------

async function updatePresence(value: object) {

    const presenceStatut = document.getElementById("presenceStatut") as HTMLInputElement;
    const statutJustifie = document.getElementById("statutJustifie") as HTMLInputElement;
    const presenceDate = document.getElementById("presenceDate") as HTMLInputElement;

    Object.assign(value, {
        statut: presenceStatut.value,
        statutJustifie: statutJustifie.value,
        date: presenceDate.value
    })

    try {
        const response = await ApiService.put(`/presences/${route.params.id}`, value);
        Swal.fire({
            timer: 1500,
            position: "top-end",
            text: "Presence modifié avec succès!",
            icon: "success"
        });
        router.push("/presences/liste-presence")
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la presence:', error);
        throw error;
    }
}

// ------------------------------------------------- GET --------------------------------------------------

const getAllPresences = async () => {
  try {
    const response = await ApiService.get('/presences');
    presences.value = response.data.data.data;
    console.log("aaa",presences);
  } catch (error) {
    console.error('Erreur lors de la recupération des présences:', error);
    throw error;
  }
}

onMounted(() => {
    getAllPresences();
})

</script>

<style></style>