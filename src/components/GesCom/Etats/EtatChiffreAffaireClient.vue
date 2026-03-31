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
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Choisisser la date" />
                                <ErrorMessage name="debut" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black fw-semibold mb-10">
                                    Date Fin
                                </label>
                                <Field name="fin" v-model="fin" type="date" style="background-color: #fff;"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Choisisser la date" />
                                <ErrorMessage name="fin" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black fw-semibold mb-10">
                                    Client
                                </label>
                                <Field name="infoCli" v-model="infoCli" v-slot="{ field }">
                                    <Multiselect no-results-text="Aucun type trouvé" v-model="field.value"
                                        v-bind="field" :filter-results="false" :min-chars="2" :resolve-on-load="false"
                                        :delay="0" :searchable="true" :options-limit="15" :options="async (query) => {
                                            const results = await getClientByTag(query);
                                            if (results && results.length > 0) {
                                                return results;
                                            } else if (query.length >= 3) {
                                                return [{ value: '', label: 'Aucun enregistrement trouvé' }];
                                            } else {
                                                return [];
                                            }
                                        }" noOptionsText="Tapez au moins deux caractères"
                                        placeholder="Rechercher un client" />
                                </Field>
                                <ErrorMessage name="infoCli" class="text-danger" />
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
                                Ref.Cmd
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Date Cmd
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Client
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Montant Ht (FCFA)
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Montant TTC (FCFA)
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Type Cmd
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Statut Paie
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Statut Liv.
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(commande, index) in commandes" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ commande.refCom }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ format_Date(commande.dateCommande) }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                <span v-if="commande && commande.client">
                                    {{ commande.client.nomClient }}
                                </span>
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ commande.montHT }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ commande.montTTC }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ commande.typeCommande }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ commande.statutPaiement }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ commande.statutLiv }}
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
import { defineComponent, onMounted, ref, Ref, toRef, watch } from "vue";
import Swal from "sweetalert2";
import { Depense } from "@/models/Depense";
import ApiService from "@/services/ApiService";
import { suppression, error, format_Date } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import JwtService from "@/services/JwtService";
import * as Yup from 'yup';
import Multiselect from "@vueform/multiselect/src/Multiselect";
import axios from "axios";

export default defineComponent({
    name: "EtatChiffreAffaireClient",
    components: {
        Form,
        Field,
        ErrorMessage,
        Multiselect,
        PaginationComponent
    },
    setup() {
        onMounted(() => {
            getClientByTag();
            getAllCommandes(1, 10, recherche.value, typeCommande.value, statutCommande.value, statutLivraison.value, debut.value, fin.value,infoCli.value);
        });

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const etatForm = ref<any | null>({});

        const etatSchema = Yup.object().shape({
            infoCli: Yup.string().notRequired(),
            statutCommande: Yup.string().notRequired(),
            statutLivraison: Yup.string().notRequired(),
            dateFin: Yup.date().notRequired(),
            recherche: Yup.string().notRequired(),
            dateDebut: Yup.date().notRequired(),
        });
        const debut = ref(formatDate(new Date()));
        const fin = ref(formatDate(new Date()));
        const statutCommande: Ref<string> = ref("");
        const statutLivraison: Ref<string> = ref("");
        const recherche: Ref<string> = ref("");
        const typeCommande: Ref<string> = ref("");
        const clients = ref<Array<any>>([]);
        const infoCli = ref<string>("");
        const commandes = ref<Array<any>>([]);

        console.log("LES DATE SONT LES SUIVANTEs ", fin);
        watch(
            () => [statutCommande.value, statutLivraison.value, typeCommande.value, recherche.value, debut.value, fin.value, infoCli.value],
            (newValues, oldValues) => {
                console.log('Nouvelles valeurs :', newValues);
                getAllCommandes(1, 10, newValues[3], newValues[2], newValues[0], newValues[1], newValues[4], newValues[5], newValues[6]);
            }
        );

        const statutOptions = [
            {
                value: "",
                label: 'Sélectionnez une option'
            },
            {
                value: 'En attente',
                label: 'En attente'
            },
            {
                value: 'Payée',
                label: 'Payée'
            },
            {
                value: 'Annulée',
                label: 'Annulée'
            },
            {
                value: 'Partielle',
                label: 'Partielle'
            }
        ];

        const statutLivOptions = [
            {
                value: "",
                label: 'Sélectionnez une option'
            },
            {
                value: 'Non livrée',
                label: 'Non livrée'
            },
            {
                value: 'Livrée',
                label: 'Livrée'
            },
            {
                value: 'Partielle',
                label: 'Partielle'
            }
        ];
        const typeCommandesOptions = [
            {
                value: "",
                label: 'Sélectionnez un type'
            },
            {
                value: 'Au comptoir',
                label: 'Au comptoir'
            },
            {
                value: 'Sur commande',
                label: 'Sur commande'
            },

        ];

        const searchTerm = ref('');
        const page = ref(1);
        const totalPages = ref(0);
        const limit = ref(10);
        const totalElements = ref(0);

        const handlePaginate = ({ page_, limit_ }) => {
            try {
                page.value = page_;
                getAllCommandes(page_, limit_);
            } catch (error) {
                //
            }
        };

        function rechercher() {
            getAllCommandes(page.value, limit.value, searchTerm.value, typeCommande.value, statutCommande.value, statutLivraison.value);
        }

        function getAllCommandes(page = 1, limi = 10, searchTerm = '', typeCommande = "", statutCommande = "", statutLivraison = "", debut = '', fin = '',idClient = '') {
            ApiService.get(`/etatChiffreAffaireCommande?start=${page}&limit=${limi}&motCle=${searchTerm}&statutPaiement=${statutCommande}&typeCommande=${typeCommande}&statutLivraison=${statutLivraison}&debut=${debut}&fin=${fin}&idClient=${idClient}`)
                .then(({ data }) => {
                    commandes.value = data.data.data;
                    console.log("testtttt",commandes.value);

                    totalPages.value = data.data.totalPages;
                    limit.value = data.data.limit;
                    totalElements.value = data.data.totalElements;
                    return data.data;
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const getClientByTag = async (recherche:string = "") => {
    console.log("Ewaaaa");
    try {
        const reponse = await axios.get("all/clients/");
        console.log("REPONSEESSSS ===> ", reponse);
        const clientsData = reponse.data?.data?.data 
            || reponse.data?.data 
            || [];
        clients.value = clientsData.map((client) => {
            return { label: `${client.nomClient} ${client.prenomClient} - ${client.telephone1}`, value: client.id };
        });
        return clients.value;
    }
    catch (error) {
        console.error("Erreur lors de la récupération des clients : ", error);
        return [];
    }
}


        const privileges = ref<Array<string>>(JwtService.getPrivilege());

        const checkPermission = (name) => {
            return privileges.value.includes(name);
        }



        return {
            clients,
            getClientByTag,
            commandes,
            checkPermission,
            getAllCommandes,
            page,
            format_Date,
            totalPages,
            limit,
            statutCommande,
            statutLivraison,
            typeCommande,
            debut, fin, etatSchema,
            totalElements,
            handlePaginate,
            rechercher,
            recherche,
            searchTerm,
            etatForm,
            statutOptions,
            typeCommandesOptions,
            statutLivOptions,
            infoCli
        };
    },
});
</script>