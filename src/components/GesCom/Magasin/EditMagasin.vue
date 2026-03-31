<template>
    <div class="card mb-25 border-0 bg-white add-user-card">
        <div class="card-header">
            <h3 class="text-black fw-semibold">Modification d'un magasin</h3>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="magasinForm" @submit="updateMagasin" :validation-schema="magasinSchema">
                <!-- <div class="col-md-3">
                    <br />
                    <div class="form-check mt-3 mb-15 mb-sm-20 mb-md-25">
                        <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                            Est Principal ?
                        </label>
                        <input id="estPrincipal" name="estPrincipal" v-model="estPrincipal" :value="estPrincipal"
                            type="checkbox" class="form-check-input shadow-none" />
                        <ErrorMessage name="estPrincipal" class="text-danger" />
                    </div>
                </div> -->
                <div class="row mb-10">
                    <div class="col-md-3 mb-3">
                        <div class="form-group ">
                            <label class="d-block text-black fw-semibold mb-10">
                                Code du magasin <span class="text-danger">*</span>
                            </label>
                            <Field name="code" type="text" v-model="code"
                                class="form-control shadow-none fs-md-15 text-black"
                                placeholder="Entrer le code du magasin" />
                            <ErrorMessage name="code" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="form-group ">
                            <label class="d-block text-black fw-semibold mb-10">
                                Nom du magasin <span class="text-danger">*</span>
                            </label>
                            <Field name="nomMagasin" type="text" v-model="nomMagasin"
                                class="form-control shadow-none fs-md-15 text-black"
                                placeholder="Entrer le nom magasin" />
                            <ErrorMessage name="nomMagasin" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-md-5  mb-3">
                        <div class="form-group">
                            <label class="d-block text-black fw-semibold mb-10">
                                Magasinier <span class="text-danger">*</span>
                            </label>
                            <Field name="user"  v-model="selectedUser" v-slot="{ field }">
                                <Multiselect :options="personnelOptions" :searchable="true" track-by="label"
                                    label="label" v-bind="field"
                                    placeholder="Sélectionner le magasinier" />
                            </Field>
                            <ErrorMessage name="user" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-md-12 mb-3">
                        <div class="form-group">
                            <label class="d-block text-black fw-semibold mb-10">
                                Adresse du magasin <span class="text-danger">*</span>
                            </label>
                            <Field name="adresse" type="text" v-model="adresse"
                                class="form-control shadow-none fs-md-15 text-black"
                                placeholder="Entrer l'adresse" />
                            <ErrorMessage name="adresse" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-md-12 m-10">
                        <div class="row">
                            <div class="border border-primary mb-10">
                                <div
                                    class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                                    <div class="col-md-7">
                                        <h4 class="fs-5 text-white">Sections / compartiments du magasin</h4>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="d-flex float-end">
                                            <button class="btn btn-success" type="button" :disabled="isDisable"
                                                :class="{ 'cursor-not-allowed': isDisable }" @click="addRowSection()">
                                                <i class="fa fa-plus-circle position-relative me-1 fs-12"></i>Ajouter une section
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row gx-2" v-for="(section, sectionIndex) in sections"
                                        :key="sectionIndex">
                                        <div class="col-md-2 mb-2">
                                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                                <label v-if="sectionIndex == 0" class="d-block text-black fw-semibold">
                                                    Code Section <span class="text-danger">*</span>
                                                </label>
                                                <div class="input-group">
                                                    <span class="input-group-text" id="inputGroup-sizing-default">{{
                                                        code != null ?
                                                            code : 'Code'
                                                        }}</span>
                                                    <input type="text" v-model="section.code" :class="validateRowProduit(section.code) || validateDupliacat(section.code)
                                                        ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                                        : 'form-control shadow-none fs-md-15 text-black '"
                                                        placeholder="Entrer le nom de la section"
                                                        aria-label="Sizing example input"
                                                        aria-describedby="inputGroup-sizing-sm" />
                                                </div>
                                                <div class="text-danger" v-if="validateRowProduit(section.code)">
                                                    Le code de la section est obligatoire.
                                                </div>
                                                <div class="text-danger" v-if="section.code && validateDupliacat(section.code)">
                                                    Le code de la section doit être unique.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <label v-if="sectionIndex == 0" class="d-block text-black fw-semibold">
                                                    Nom Section <span class="text-danger">*</span>
                                                </label>
                                                <div class="form-group">
                                                    <input type="text" v-model="section.nomMagasin" :class="validateRowProduit(section.nomMagasin)
                                                        ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                                        : 'form-control shadow-none fs-md-15 text-black '"
                                                        placeholder="Entrer le nom de la section"
                                                        aria-label="Sizing example input"
                                                        aria-describedby="inputGroup-sizing-sm" />
                                                </div>
                                                <div class="text-danger" v-if="validateRowProduit(section.nomMagasin)">
                                                    Le nom de la section est obligatoire.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-5 mb-2">
                                            <div class="form-group">
                                                <label v-if="sectionIndex == 0" class="d-block text-black fw-semibold">
                                                    Indication Section <span class="text-danger">*</span>
                                                </label>
                                                <div class="">
                                                    <input type="text" v-model="section.adresse" :class="validateRowProduit(section.adresse)
                                                        ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                                        : 'form-control shadow-none fs-md-15 text-black '"
                                                        placeholder="Entrer l'adresse de la section"
                                                        aria-label="Sizing example input"
                                                        aria-describedby="inputGroup-sizing-sm" />
                                                </div>
                                                <div class="text-danger" v-if="validateRowProduit(section.adresse)">
                                                    L'adresse de la section est obligatoire.
                                                </div>
                                            </div>
                                        </div>
                                        <div :class="(sectionIndex == 0) ? 'col-md-1 mt-4' : 'col-md-1'">
                                            <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                                type="button" @click="removeRowSection(sectionIndex)">
                                                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <button ref="submitButton" class="btn btn-primary me-5" type="submit" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Modification en cours...' : 'Modifier le magasin' }}
                </button>
                <button class="btn btn-danger" type="button" @click="router.push({ name: 'ListeMagasin' })">
                    Annuler
                </button>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';
import { Magasin } from '@/models/Magasin';

export default defineComponent({
    name: "EditMagasin",
    components: {
        Form,
        Field,
        ErrorMessage,
        Multiselect
    },

    setup: () => {
        const magasinSchema = Yup.object().shape({
            nomMagasin: Yup.string().required('Le nom du magasin est obligatoire'),
            code: Yup.string().required('Le code du magasin est obligatoire'),
            user: Yup.string().required('Le magasinier est obligatoire'),
            adresse: Yup.string().required('L\'adresse est obligatoire'),
        });

        const estPrincipal = ref(false);
        const personnelOptions = ref([]);
        const magasinForm = ref<Magasin | null>(null);
        const valuess = ref();
        const submitButton = ref<HTMLButtonElement | null>(null);
        const currentDateTime = ref(getCurrentDateTime());
        const code = ref('');
        const nomMagasin = ref('');
        const adresse = ref('');
        const selectedUser = ref(null);
        const loading = ref(false);
        const magasinId = ref(null);

        const sections = reactive([
            {
                id: null,
                code: '',
                nomMagasin: '',
                adresse: "",
            },
        ]);
        
        const sectionsToDelete = ref([]); // Liste des IDs des sections à supprimer

        const router = useRouter();
        const route = useRoute();
        const isDisable = ref(true);

        watch(sections, (newValue) => {
            isDisable.value = newValue.some(sectionItem =>
                sectionItem.nomMagasin === '' ||
                sectionItem.adresse === '' ||
                sectionItem.code === ''
            );
        }, { deep: true });

        const addRowSection = () => {
            sections.push({
                id: null, // Nouvelle section, pas encore en base
                code: '',
                nomMagasin: '',
                adresse: "",
            });
        };

        const removeRowSection = (index) => {
            const sectionToRemove = sections[index];
            
            // Si la section a un ID, elle existe déjà en base de données
            if (sectionToRemove.id) {
                // Ajouter à la liste des sections à supprimer lors de la sauvegarde
                sectionsToDelete.value.push(sectionToRemove.id);
            }
            
            // Supprimer la section du tableau local
            sections.splice(index, 1);
        };

        function getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        // Fonction pour charger les données du magasin à modifier
        const loadMagasinData = async () => {
            try {
                loading.value = true;
                magasinId.value = route.params.id;
                
                if (!magasinId.value) {
                    error('ID du magasin non fourni');
                    router.push({ name: 'ListeMagasin' });
                    return;
                }

                const response = await ApiService.get(`/magasins/${magasinId.value}`);
                
                if (response.data.code === 200) {
                    const magasinData = response.data.data;
                    
                    // Remplir les champs du formulaire
                    code.value = magasinData.code;
                    nomMagasin.value = magasinData.nomMagasin;
                    adresse.value = magasinData.adresse;
                    estPrincipal.value = magasinData.estPrincipal || false;
                    
                    // Sélectionner l'utilisateur
                    if (magasinData.user) {
                        selectedUser.value = magasinData.user.id    ;
                    }
                    
                    // Charger les sections si elles existent
                    if (magasinData.sections && magasinData.sections.length > 0) {
                        sections.splice(0, sections.length); // Vider le tableau
                        magasinData.sections.forEach(section => {
                            sections.push({
                                id: section.id || null, // ID de la section existante
                                code: section.code || '',
                                nomMagasin: section.nomMagasin || '',
                                adresse: section.adresse || ''
                            });
                        });
                    }
                } else {
                    error('Erreur lors du chargement des données du magasin');
                    router.push({ name: 'ListeMagasin' });
                }
            } catch (err) {
                console.error('Erreur lors du chargement du magasin:', err);
                error('Erreur lors du chargement des données du magasin');
                router.push({ name: 'ListeMagasin' });
            } finally {
                loading.value = false;
            }
        };

        const updateMagasin = async (values: any, { resetForm }) => {
            if (submitButton.value) {
                submitButton.value.disabled = true;
            }

            loading.value = true;
            
            values = values as Magasin;
            values.sections = sections;
            values.sectionsToDelete = sectionsToDelete.value; // Ajouter les IDs des sections à supprimer
            values.id = magasinId.value;
            values.estPrincipal = estPrincipal.value;
            
            // S'assurer que les valeurs des champs sont correctes
            values.code = code.value;
            values.nomMagasin = nomMagasin.value;
            values.adresse = adresse.value;
            values.user = selectedUser.value ? selectedUser.value.value : null;
            
            console.log("Données à modifier ===> ", values);
            
            try {
                const response = await ApiService.put(`/magasins/${magasinId.value}`, values);
                
                if (response.data.code === 200) {
                    // Si la modification est réussie et qu'il y a des sections à supprimer
                    if (sectionsToDelete.value.length > 0) {
                        await deleteSections();
                    }
                    
                    success(response.data.message || 'Magasin modifié avec succès');
                    router.push({ name: 'ListeMagasin' });
                } else {
                    error(response.data.message || 'Erreur lors de la modification');
                }
            } catch (err) {
                console.error('Erreur lors de la modification:', err);
                error(err.response?.data?.message || 'Erreur lors de la modification du magasin');
            } finally {
                loading.value = false;
                if (submitButton.value) {
                    submitButton.value.disabled = false;
                }
            }
        };

        const fetchPersonnel = async () => {
            try {
                const response = await axios.get('all/users');
                const userData = response.data.data;
                console.log("Personnel ===> ", userData);
                personnelOptions.value = userData.map((user) => ({
                    value: user.id,
                    label: `${user.nom} ${user.prenom}`,
                }));
            } catch (error) {
                console.log("Erreur lors du chargement du personnel ==> ", error);
            }
        };

        const validateDupliacat = (e) => {
            return sections.filter((element) => element.code === e).length > 1;
        };

        const validateRowProduit = (e) => {
            return e === '' || e === 0 || e === '0' || e == null || e < 0;
        };

        // Fonction pour supprimer les sections marquées pour suppression
        const deleteSections = async () => {
            try {
                for (const sectionId of sectionsToDelete.value) {
                    await ApiService.delete(`/magasins/${sectionId}`);
                }
                // Vider la liste après suppression réussie
                sectionsToDelete.value = [];
            } catch (err) {
                console.error('Erreur lors de la suppression des sections:', err);
                error('Certaines sections n\'ont pas pu être supprimées');
            }
        };

        onMounted(async () => {
            currentDateTime.value = getCurrentDateTime();
            await fetchPersonnel();
            await loadMagasinData();
        });

        return {
            loading,
            validateDupliacat,
            isDisable,
            submitButton,
            validateRowProduit,
            currentDateTime,
            getCurrentDateTime,
            valuess,
            updateMagasin,
            deleteSections,
            magasinSchema,
            estPrincipal,
            personnelOptions,
            addRowSection,
            removeRowSection,
            sections,
            sectionsToDelete,
            code,
            nomMagasin,
            adresse,
            selectedUser,
            router,
            route
        };
    },
});
</script>

<style scoped></style>
