<<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="transfertForm" @submit="addTransfert" :validation-schema="transfertSchema">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="d-block text-black fw-semibold mb-10">
                                Date
                            </label>
                            <Field name="date" type="date" :value="getCurrentDate()"
                                class="form-control shadow-none fs-md-15 text-black" />
                            <ErrorMessage name="date" class="text-danger" />
                        </div>
                    </div>
                   
                    <div class="col-md-6">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black fw-semibold mb-10">
                                Point De Vente Cible <span class="text-danger">*</span>
                            </label>
                            <Field name="pointDeVente1" v-slot="{ field }">
                                <Multiselect :options="pointDeVenteOptions" :searchable="true" track-by="label"
                                    label="label" v-model="field.value" placeholder="Sélectionner le point de vente"
                                    @select="selectedPointVente = field.value; console.log('Point de vente sélectionné:', field.value)" />
                            </Field>
                            <ErrorMessage name="pointDeVente1" class="text-danger" />
                        </div>
                    </div>

                     <div class="col-md-6">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black fw-semibold mb-10">
                                Les magasins du point de vente source <span class="text-danger">*</span>
                            </label>
                            <Field name="magasin1" v-slot="{ field }">
                                <Multiselect :options="magasin1Options" :searchable="true" track-by="label"
                                    label="label" v-model="field.value" v-bind="field"
                                    placeholder="Sélectionner le magasin" />
                            </Field>
                            <ErrorMessage name="magasin1" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black fw-semibold mb-10">
                                Magasin B <span class="text-danger">*</span>
                            </label>
                            <Field name="magasin2" v-slot="{ field }">
                                <Multiselect :options="magasin2Options" :searchable="true" track-by="label"
                                    label="label" v-model="field.value" v-bind="field" :disabled="!selectedPointVente"
                                    placeholder="Sélectionner le magasin" />
                            </Field>
                            <ErrorMessage name="magasin2" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black fw-semibold mb-10">
                                Motif
                            </label>
                            <Field name="motif" as="textarea" cols="6" rows="2" placeholder="Entrer les motifs"
                                v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                                <textarea class="form-control shadow-none rounded-0 text-black"
                                    v-model="field.value"></textarea>
                            </Field>
                            <ErrorMessage name="motif" class="text-danger" />
                        </div>
                    </div>

                    <div class="border border-primary mb-10 mt-3">
                        <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                            <div class="col-md-5">
                                <h5 class="fs-6 mx-1 text-white">Transfert (s) du produit</h5>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex align-items-center">
                                    <div class="p-6 bg-ecf3f2"><span
                                            class="d-block fw-medium text-black-emphasis fs-13 text-uppercase">Montant
                                            total: {{ montantTotal }}</span></div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex float-end">
                                    <button class="btn btn-sm btn-success" type="button" @click="addRowProduit()"><i
                                            class="fa fa-plus-circle position-relative me-1 fs-12"></i>Ajouter un
                                        produit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="p-3">
                            <div class="row mt-10">
                                <div class="col-md-4">
                                    <label class="d-block text-black fw-semibold">
                                        Produit <span class="text-danger">*</span>
                                    </label>
                                </div>
                                <div class="col-md-3">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Prix Unitaire
                                    </label>
                                </div>
                                <div class="col-md-3">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Quantité <span class="text-danger">*</span>
                                    </label>
                                </div>
                                <div class="col-md-2">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Action
                                    </label>
                                </div>
                                <hr class="mt-0" />
                            </div>
                            <div class="row gy-0" v-for="(produit, index) in produits" :key="index">
                                <div class="col-md-4">
                                    <div class="form-group mb-2">
                                        <Multiselect :options="produitOptions" :searchable="true" track-by="label"
                                            label="label" v-model="produit.produit"
                                            placeholder="Sélectionner le produit"
                                            @select="selectProd(produit.produit, produit)" />
                                        <div class="invalid-feedback" v-if="validateRowProduit(produit.produit)">
                                            Le produit est obligatoire.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group mb-2">
                                        <input type="number" v-model="produit.prixUnitaire" :class="validateRowProduit(produit.prixUnitaire)
                                                ? 'form-control shadow-none fs-md-15 text-black is-invalid'
                                                : 'form-control shadow-none fs-md-15 text-black'" placeholder="Entrer le prixUnitaire" />
                                        <div v-if="validateRowProduit(produit.prixUnitaire)" class="invalid-feedback">
                                            Le prix Unitaire est obligatoire.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group mb-2">
                                        <input v-model="produit.qtite" type="number"
                                            class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la quantite" />
                                    </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                        @click="removeRowProduit(index)">
                                        <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 mt-3">
                        <div class="d-flex align-items-center">
                            <button class="btn btn-success me-3" type="submit">
                                Faire un transfert
                            </button>
                            <router-link to="/transferts/liste-transferts" class="btn btn-danger">
                                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                <span class="position-relative"></span>Annuler
                            </router-link>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

    <script lang="ts">

    import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
    import { Form, Field, ErrorMessage, useFieldArray, useSetFieldValue } from 'vee-validate';
    import { error, success } from '@/utils/utils';
    import { useRouter } from "vue-router";
    import ApiService from '@/services/ApiService';
    import { Transfert } from '@/models/Transfert';
    import * as Yup from 'yup';
    import axios from 'axios';
    import Multiselect from '@vueform/multiselect'
    import { Produit, ProduitDepot } from "@/models/Produit";
    import JwtService from '@/services/JwtService';

    export default defineComponent({
        name: "AddTransfertPointVente",
        components: {
            Form,
            Field,
            ErrorMessage,
            Multiselect
        },
        setup: () => {
            const transfertSchema = Yup.object().shape({
                pointDeVente1: Yup.number().required('Le point de vente cible est obligatoire'),
                magasin1: Yup.number().required('Le magasin source est obligatoire'),
                magasin2: Yup.number().required('Le magasin cible est obligatoire'),
                motif: Yup.string().notRequired(),
                date: Yup.date().required("La date est obligatoire"),
            });

            const transfertForm = ref<any>(null);
            const router = useRouter();
            const magasin1Options = ref([]);
            const magasin2Options = ref([]);
            const produitOptions = ref([]);
            const pointDeVenteOptions = ref([]);

            
            const userPointVenteId = ref<string | null>(JwtService.getPointDeVenteId());

            const fetchMagasin1 = async () => {
                try {
                    if (!userPointVenteId.value) {
                        error('Point de vente non trouvé. Veuillez vous reconnecter.');
                        return;
                    }

                    const response = await ApiService.get(`magasins/pointdevente/${userPointVenteId.value}`);
                    const magasin1sData = response.data.data;
                    console.log("magasinSourceee", magasin1sData);

                    if (Array.isArray(magasin1sData)) {
                        magasin1Options.value = magasin1sData.map((magasin) => ({
                            value: magasin.id,
                            label: `${magasin.nomMagasin}`,
                        }));
                    } else {
                        magasin1Options.value = [{
                            value: magasin1sData.id,
                            label: magasin1sData.nomMagasin,
                        }];
                    }

                    console.log("magasin1Options après mapping:", magasin1Options.value);

                } catch (err) {
                    console.error("Erreur complète:", err);
                    error('Erreur lors du chargement des magasins source');
                }
            };



            const fetchMagasin2 = async (pointVenteCibleId: number) => {
                console.log("fetchMagasin2 appelé avec pointVenteCibleId:", pointVenteCibleId);
                try {
                    const response = await ApiService.get(`magasins/pointdevente/${pointVenteCibleId}`);
                    const magasin2Data = response.data.data;
                    console.log("Magasins cibles:", magasin2Data);

                    const magasin2Array = Array.isArray(magasin2Data) ? magasin2Data : [magasin2Data];

                    magasin2Options.value = magasin2Array.map((magasin) => ({
                        value: magasin.id,
                        label: `${magasin.nomMagasin}`,
                    }));
                    console.log("magasin2Options mis à jour:", magasin2Options.value);
                } catch (err) {
                    console.error("Erreur dans fetchMagasin2:", err);
                    error('Erreur lors du chargement des magasins cibles');
                }
            };

            const fetchpointDeVente = async () => {
                try {
                    const response = await ApiService.get('all/pointventes');
                    const pointventeData = response.data.data.data;
                    pointDeVenteOptions.value = pointventeData
                        .filter(pv => pv.id.toString() !== userPointVenteId.value)
                        .map((pv) => ({
                            value: pv.id,
                            label: `${pv.nomPointVente}`,
                        }));
                } catch (err) {
                    error('Erreur lors du chargement des points de vente');
                }
            };

            const fetchProduits = async () => {
                try {
                    const response = await axios.get("all/produitconditionnements");
                    const produitsData = response.data.data;
                    produitsss.value = produitsData;
                    produitOptions.value = produitsData.map((produitconditionnements) => ({
                        value: produitconditionnements.id + "|" + `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]` + "|" + produitconditionnements.prixVenteHt + "|" + produitconditionnements.prixVenteTtc,
                        label: `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]`,
                    }));
                } catch (err) {
                    error('Erreur lors du chargement des produits');
                }
            };



            const selectedPointVente = ref(null);
            watch(selectedPointVente, (newValue) => {
                console.log("selectedPointVente changé:", newValue);
                const pointVenteId = typeof newValue === 'object' && newValue.value ? newValue.value : newValue;
                if (pointVenteId) {
                    console.log("Appel de fetchMagasin2 avec:", pointVenteId);
                    magasin2Options.value = [];
                    if (transfertForm.value) {
                        transfertForm.value.setFieldValue('pointDeVente1', pointVenteId);
                        transfertForm.value.setFieldValue('magasin2', null);
                    }
                    fetchMagasin2(pointVenteId);
                } else {
                    console.log("newValue non valide:", newValue);
                    magasin2Options.value = [];
                    if(transfertForm.value){
                    transfertForm.value.setFieldValue('magasin2', null); 
                    }
                }
            });
            onMounted(() => {
                fetchMagasin1();
                fetchProduits();
                fetchpointDeVente();
            });

            const addTransfert = async (values, { resetForm }) => {
                console.log("Valeurs du formulaire:", values); // Vérifier ici
                values.produits = produits.map(produit => ({
                    produitId: produit.produit.split("|")[0],
                    prixUnitaire: produit.prixUnitaire,
                    qtite: produit.qtite,
                }));
                values.montantTotal = montantTotal.value;

                const payload = {
                    ...values,
                    // magasin1: values.magasin1.value,
                    // magasin2: values.magasin2.value,
                    // pointDeVente1: values.pointDeVente1,
                };

                console.log("valeur", payload);

                ApiService.post("/transferts", payload)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message);
                            resetForm();
                            router.push({ name: "ListeTransfert" });
                        }
                    }).catch(({ response }) => {
                        error(response.data.message);
                    });
            };

            const montantTotal = ref(0);
            const isDisable = ref(true);
            const produits = reactive([
                {
                    produit: "",
                    prixUnitaire: 0,
                    qtite: 0,
                },
            ]);

            const addRowProduit = () => {
                produits.push({
                    produit: "",
                    prixUnitaire: 0,
                    qtite: 0,
                });
            };

            const removeRowProduit = (index) => {
                if (produits.length > 1) produits.splice(index, 1);
                totals();
            };

            const validateRowProduit = (e) => {
                if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
                    return true;
                } else {
                    return false;
                }
            };

            const totals = () => {
                montantTotal.value = produits.reduce((total, produit) => {
                    const quantite = Number(produit.qtite) || 0;
                    const prix = Number(produit.prixUnitaire) || 0;
                    return total + quantite * prix;
                }, 0);
            };

            watch(
                produits,
                () => {
                    isDisable.value = produits.some(
                        (produit) =>
                            produit.produit === "" ||
                            produit.prixUnitaire === 0 ||
                            produit.qtite === 0
                    );
                    totals();
                },
                { deep: true }
            );

            const { remove, push, fields, update } = useFieldArray("produits");

            const prixUnitaireProd = ref();
            const produitsss: any = ref(null);
            const valuess = ref();
            const idProduit = ref(0);

            const getIndex = (event, produit) => {
                console.log("event", event.data);
                totals();
            };

            const selectProd = async (value: any, produit: ProduitDepot) => {
                console.log("Element", value);
                console.log("Objet", produit.prixUnitaire);
                produit.prixUnitaire = value.split("|")[2];
                produit.qtite = 1;
                totals();
            };

            const getCurrentDate = () => {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, "0");
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const year = today.getFullYear();
                return `${year}-${month}-${day}`;
            };

            return {
                transfertSchema,
                addTransfert,
                transfertForm,
                magasin1Options,
                magasin2Options,
                produits,
                removeRowProduit,
                addRowProduit,
                validateRowProduit,
                montantTotal,
                valuess,
                idProduit,
                prixUnitaireProd,
                selectProd,
                getIndex,
                isDisable,
                getCurrentDate,
                produitOptions,
                pointDeVenteOptions,
                selectedPointVente,
            };
        },
    });
</script>
    <style scoped>
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
</style>