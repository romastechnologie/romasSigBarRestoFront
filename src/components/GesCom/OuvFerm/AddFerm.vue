<template>
  <div class="card mb-10 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-10 p-sm-15 p-md-20 letter-spacing">
      <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Fermerture de caisse</h4>
              <router-link to="/OuverturesFermetures" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
        </div>
      <Form class="row g-2" :validation-schema="schema" @submit="sendFermerOuvFer">
        <div class="row mb-2">
           <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fermeture
              </label>
              <Field
                name="dateFin"
              type="datetime-local"
              :max="currentDateTime"
              v-model="dateFin"
                class="form-control shadow-none fs-md-15 text-black"
                readonly
              />
            </div>
            <ErrorMessage name="dateFin" class="text-danger" />
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                 Personnes présentes à la fermeture <span class="text-danger">*</span>
              </label>
              <Field name="user[]" v-slot="{ field }">
              <Multiselect
               v-model="user"
                :options="userOptions"
                :searchable="true"
                :multiple="true"
                :taggable="true"
                mode="tags"
                label="label"
                track-by="value"
                placeholder="Sélectionner les personnes"
                v-bind="field"
              />
            </Field>
            <ErrorMessage name="user" class="text-danger" />
             <div v-if="userOptions.length === 0" class="text-danger mt-1 fs-md-12">
              Aucune personne disponible.
            </div>
            </div>
          </div>
           
        </div>
        <div class="row mb-2">
        
            <div class="col-md-12">
            <label class="d-block text-black fw-semibold mb-2">Caisse <span class="text-danger">*</span></label>
            <div v-if="ouvFer.reliquatTotalRetourner > 0" class="form-control shadow-none fs-md-14 text-black fw-bold" readonly>
              Vous êtes en train de fermer la caisse : {{ caisseNom }} avec un montant total reliquat qui est : {{ ouvFer?.reliquatTotalRetourner }} FCFA
            </div>
            <div v-else class="form-control shadow-none fs-md-14 text-black fw-bold">
             Vous êtes en train de fermer la caisse : {{ caisseNom }}

            </div>
            <div v-if="!caisseNom" class="text-danger mt-1 fs-md-12">
              Aucune caisse ouverte disponible.
            </div>
            
          </div >

        <div class="mb-2">
          <div class="col-md-12">
            <label for="observationsFin" class="d-block text-black fw-semibold mb-2">Observations</label>
            <Field
              name="observationsFin"
              as="textarea"
              class="form-control fs-md-14"
              v-model="observationsFin"
              placeholder="Entrez vos observations (facultatif)"
            />
            <ErrorMessage name="observationsFin" class="text-danger fs-md-12" />
          </div>
        </div>
         
      </div>

        <div class="row mb-2">
          <div class="col-md-12">
            <div v-if="conversionError" class="alert alert-warning" role="alert">
              {{ conversionError }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="border border-success mb-5">
              <div class="row d-flex align-items-center justify-content-between fw-bold py-1" style="background-color: #28a745">
                <div class="col-md-6">
                  <h3 class="fs-15 text-white">Solde Théorique</h3>
                </div>
                <div class="col-md-6">
                  <h5 class="fs-15 text-white" style="text-align: end;font-weight: bold;"> Total : {{ montantTotalTheorique }} FCFA</h5>
                </div>
              </div>
              <div>
                <div class="row d-flex align-items-center justify-content-between mt-1 text-success">
                  <div class="col-md-4">
                    <label class="d-block fw-semibold fs-md-13">Monnaie</label>
                  </div>
                  <div class="col-md-4">
                    <label class="d-block fw-semibold fs-md-13">Quantité</label>
                  </div>
                  <div class="col-md-4">
                    <label class="d-block fw-semibold fs-md-13">Montant</label>
                  </div>
                </div>
                <hr class="my-1" />
                <template v-for="(billetage, index) in billetageTheoriqueList" :key="index">
                  <div class="container m-1 text-success">
                    <div class="row">
                      <div class="col-md-4">
                        <input
                          name="monnaie"
                          placeholder="Monnaie"
                          v-model="billetage.libelle"
                          readonly
                          class="form-control fs-md-13 py-1"
                        />
                      </div>
                      <div class="col-md-4">
                        <Field
                          :name="`billetageTheoriqueList[${index}].quantite`"
                          type="number"
                          placeholder="Quantité"
                          class="form-control fs-md-13 py-1"
                          v-model="billetage.quantite"
                          @input="handleBilletageTheoriqueInput($event, billetage, index)"
                          readonly
                          min="0"
                        />
                        <ErrorMessage :name="`billetageTheoriqueList[${index}].quantite`" class="text-danger fs-md-12" />
                      </div>
                      <div class="col-md-4">
                        <input
                          type="text"
                          v-model="billetage.montant"
                          placeholder="Montant"
                          readonly
                          class="form-control fs-md-13 py-1"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="border border-primary mb-5">
              <div class="row d-flex align-items-center justify-content-between fw-bold py-1" style="background-color: #0a59a4">
                <div class="col-md-6">
                  <h3 class="fs-md-15 text-white">Solde Physique</h3>
                </div>
                <div class="col-md-6">
                  <h5 class="fs-15 text-white" style="text-align: end;font-weight: bold;"> Total : {{ montantTotalReel }} FCFA</h5>
                </div>
              </div>
              <div>
                <div class="row d-flex align-items-center justify-content-between mt-1 text-primary">
                  <div class="col-md-6">
                    <label class="d-block fw-semibold fs-md-13">Quantité</label>
                  </div>
                  <div class="col-md-6">
                    <label class="d-block fw-semibold fs-md-13">Montant</label>
                  </div>
                </div>
                <hr class="my-1" />
                <template v-for="(billetage, index) in billetageReelList" :key="index">
                  <div class="container m-1 text-primary">
                    <div class="row">
                      <div class="col-md-6">
                        <Field
                          :name="`billetageReelList[${index}].quantite`"
                          type="number"
                          :placeholder="`Quantité (${billetageTheoriqueList[index]?.libelle})`"
                          class="form-control fs-md-13 py-1"
                          v-model="billetage.quantite"
                          @input="handleBilletageReelInput($event, billetage, index)"
                          min="0"
                        />
                        <ErrorMessage :name="`billetageReelList[${index}].quantite`" class="text-danger fs-md-12" />
                      </div>
                      <div class="col-md-6">
                        <input
                          type="text"
                          v-model="billetage.montant"
                          placeholder="Montant"
                          readonly
                          class="form-control fs-md-13 py-1"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="border border-danger mb-5">
              <div class="row d-flex align-items-center justify-content-between fw-bold py-1" style="background-color: #dc3545">
                <div class="col-md-6">
                  <h3 class="fs-15 text-white">Écart</h3>
                </div>
                <div class="col-md-6">
                  <h5 class="fs-15 text-white" style="text-align: end;font-weight: bold;"> Total : {{ montantTotalEcart }} FCFA</h5>
                </div>
              </div>
              <div>
                <div class="row d-flex align-items-center justify-content-between mt-1 text-danger">
                  <div class="col-md-6">
                    <label class="d-block fw-semibold fs-md-13">Quantité</label>
                  </div>
                  <div class="col-md-6">
                    <label class="d-block fw-semibold fs-md-13">Montant</label>
                  </div>
                </div>
                <hr class="my-1" />
                <template v-for="(billetage, index) in ecartList" :key="index">
                  <div class="container m-1 text-danger">
                    <div class="row">
                      <div class="col-md-6">
                        <Field
                          :name="`ecartList[${index}].quantite`"
                          type="number"
                          v-model="billetage.quantite"
                          :placeholder="`Quantité (${billetageTheoriqueList[index]?.libelle})`"
                          readonly
                          class="form-control fs-md-13 py-1"
                        />
                        <ErrorMessage :name="`ecartList[${index}].quantite`" class="text-danger fs-md-12" />
                      </div>
                      <div class="col-md-6">
                        <input
                          type="text"
                          v-model="billetage.montant"
                          placeholder="Montant"
                          readonly
                          class="form-control fs-md-13 py-1"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
 
        <div class="mb-2 mt-1">
          <button
            type="submit"
            class="btn btn-primary btn-sm top-end"
            :disabled="!caisse || conversionError"
          >
            Fermer
          </button>
          <router-link to="/OuverturesFermetures" type="button" class="btn btn-danger btn-sm mx-1">
            Annuler
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>




<script lang="ts">
import { ref, reactive, defineComponent, onMounted, computed } from "vue";
import * as Yup from "yup";
import { configure, Form, Field, ErrorMessage } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import { useForm } from "vee-validate";
import ApiService from "@/services/ApiService";
import router from "@/router";
import { error, success } from "@/utils/utils";
import { OuvFerm } from "@/models/OuvFerm";
import { useRoute } from "vue-router";

export interface Billetage {
  sens?: string;
  quantite: number;
  montant: number;
  libelle: string;
  valueAct: number;
  monnaie: number;
  ouv_fer?: number;
}



export default defineComponent({
  name: "AddFerm",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
  },

  setup(props) {
    const route = useRoute();
    const { setFieldValue } = useForm();
    const dateFin = ref(getCurrentDateTime());
    const currentDateTime = ref(getCurrentDateTime());
    const ouvFer = ref<OuvFerm>({
      caisseId: 0,
      fondsRoulement: 0,
      solde: 0,
      dateOuverture: "",
      dateFin: null,
      ecart: null,
      status: "",
      userIds: [],
      userCreationId: 0,
       reliquatTotalRetourner: 0
    });
    const userOptions = ref<{ value: number; label: string }[]>([]);
    const user = ref<number[]>([]);
    const ouvFerList = ref<OuvFerm[]>([]);
    const billetageTheoriqueList = reactive<Billetage[]>([]);
    const billetageReelList = reactive<Billetage[]>([]);
    const ecartList = reactive<Billetage[]>([]);
    const monnaieList = ref<any[]>([]);
    const montantTotalTheorique = ref<number>(0);
    const montantTotalReel = ref<number>(0);
    const montantTotalEcart = ref<number>(0);
    const caisse = ref<number | null>(null);
    const caisseNom = ref<string | null>(null);
    const stockTheorique = ref<number>(0);
    const pointCaisse = ref<number>(0);
    const rapportFile = ref<string | null>(null);
    const rapportFileError = ref<string | null>(null);
    const estRegularise = ref<boolean>(false);
    const observationsFin = ref<string>('');


     const conversionError = computed(() => {
      if (montantTotalEcart.value === 0 && ecartList.some(billetage => billetage.quantite !== 0)) {
        return 'Veuillez faire une conversion de billet avant de fermer';
      }
      return null;
    });

    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const schema = Yup.object().shape({
      dateFin: Yup.string().required("La date de fermeture est obligatoire"),
      observationsFin: Yup.string().nullable(),
      user: Yup.array()
        .of(Yup.number())
        .min(1, "Au moins une personne doit être sélectionnée"),
      rapportFile: Yup.string()
        .nullable()
        .test('is-valid-pdf', 'Le fichier doit être un PDF valide', (value) => {
          if (!value) return true;
          return value.startsWith('data:application/pdf;base64,');
        }),
      billetageTheoriqueList: Yup.array().of(
        Yup.object().shape({
          quantite: Yup.number()
            .typeError("La quantité doit être un nombre")
            .required("La quantité est obligatoire")
            .integer("La quantité doit être un entier")
            .min(0, "La quantité ne peut pas être négative"),
        })
      ),
      billetageReelList: Yup.array().of(
        Yup.object().shape({
          quantite: Yup.number()
            .typeError("La quantité doit être un nombre")
            .required("La quantité est obligatoire")
            .integer("La quantité doit être un entier")
            .min(0, "La quantité ne peut pas être négative"),
        })
      ),
      ecartList: Yup.array().of(
        Yup.object().shape({
          quantite: Yup.number()
            .typeError("La quantité doit être un nombre")
            .required("La quantité est obligatoire")
            .integer("La quantité doit être un entier"),
        })
      ),
    });

    configure({
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
    });

    const handleFileUpload = async (event: Event, setValue: (value: string | null) => void) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        if (file.type !== "application/pdf") {
          rapportFileError.value = "Le fichier doit être un PDF.";
          rapportFile.value = null;
          setValue(null);
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          rapportFileError.value = "Le fichier ne doit pas dépasser 5 Mo.";
          rapportFile.value = null;
          setValue(null);
          return;
        }
        try {
          const base64 = await fileToBase64(file);
          rapportFile.value = base64;
          rapportFileError.value = null;
          setValue(base64);
        } catch (err) {
          rapportFileError.value = "Erreur lors de la conversion du fichier.";
          rapportFile.value = null;
          setValue(null);
        }
      } else {
        rapportFile.value = null;
        rapportFileError.value = null;
        setValue(null);
      }
    };

    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    // const saveTemporary = async () => {
    //   try {
    //     if (!caisse.value) {
    //       throw new Error("Aucune caisse disponible.");
    //     }
    //     const isCaisseOuverte = await checkCaisseStatus(caisse.value);
    //     if (!isCaisseOuverte) {
    //       return;
    //     }
    //     const payload = {
    //       caisseId: caisse.value,
    //       pointCaisse: pointCaisse.value,
    //       stockTheorique: stockTheorique.value,
    //       ecart: montantTotalEcart.value,
    //       billetageList: billetageReelList.map((b) => ({
    //         monnaie: b.monnaie,
    //         libelle: b.libelle,
    //         qteBillet: b.quantite,
    //         montant: b.montant,
    //         valueAct: b.valueAct,
    //       })),
    //       rapportFile: rapportFile.value || null,
    //       observationsFin: observationsFin.value,
    //     };
    //     console.log("Payload envoyé à /ouvfers/enregistrer :", JSON.stringify(payload, null, 2));
    //     const response = await ApiService.post("/ouvfers/enregistrer", payload, 
    //      );
    //     if (response.data.success) {
    //       Swal.fire({
    //         icon: "success",
    //         title: "Enregistrement temporaire",
    //         text: "Les données ont été enregistrées temporairement.",
    //         timer: 2500,
    //         showConfirmButton: false,
    //       });
    //       {
    //     } else {
    //       throw new Error(response.data.message || "Échec de l'enregistrement temporaire");
    //     }
    //   } catch (err: any) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Erreur",
    //       text: err.response?.data?.message || err.message || "Erreur lors de l'enregistrement.",
    //       timer: 3000,
    //       showConfirmButton: false,
    //     });
    //   }
    // };

    const sendFermerOuvFer = async () => {
      try {
        if (!caisse.value) {
          throw new Error("Aucune caisse disponible.");
        }
        const isCaisseOuverte = await checkCaisseStatus(caisse.value);
        if (!isCaisseOuverte) {
          return;
        }
        if (montantTotalEcart.value !== 0 && !estRegularise.value) {
          const confirmation = await Swal.fire({
            icon: "warning",
            title: "Écart détecté",
            text: `Un écart de ${montantTotalEcart.value} FCFA a été détecté. Voulez-vous fermer la caisse sans régulariser ?`,
            showCancelButton: true,
            confirmButtonText: "Oui, fermer",
            cancelButtonText: "Annuler",
          });
          if (!confirmation.isConfirmed) {
            return;
          }
        }
        const payload = {
          caisseId: caisse.value,
          pointCaisse: pointCaisse.value,
          stockTheorique: stockTheorique.value,
          ecart: montantTotalEcart.value,
          billetageList: billetageReelList.map((b) => ({
            monnaie: b.monnaie,
            libelle: b.libelle,
            qteBillet: b.quantite,
            montant: b.montant,
            valueAct: b.valueAct,
          })),
          ecartList: ecartList.map((e) => ({
            monnaie: e.monnaie,
            libelle: e.libelle,
            qteBillet: e.quantite,
            montant: e.montant,
            valueAct: e.valueAct,
          })),
          rapportFile: rapportFile.value || null,
          observationsFin: observationsFin.value,
          userIds: user.value,
        };
        console.log('Payload envoyé:', payload);
        await ApiService.post("/ouvfers/fermer", payload);
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Fermeture de caisse enregistrée avec succès",
          timer: 2500,
          showConfirmButton: false,
        });
        router.push("/OuverturesFermetures");
      } catch (err) {
        error(err);
      }
    };

    const getAllUsers = async () => {
      try {
        const { data } = await ApiService.get('/users');
        const donnees = data.data.data;
        userOptions.value = donnees.map((us: any) => ({
          value: us.id,
          label: `${us.nom} ${us.prenom}`,
        }));
      } catch (err: any) {
        error(err.response?.data?.message || 'Erreur lors de la récupération des utilisateurs');
      }
    };

    const checkCaisseStatus = async (caisseId: number) => {
      try {
        const response = await ApiService.get(`/ouvfers/check?caisseId=${caisseId}`);
        if (!response.data.data.isOpen) {
          Swal.fire({
            icon: "warning",
            title: "Caisse non ouverte",
            text: "La caisse n'est pas ouverte. Veuillez ouvrir la caisse avant de la fermer.",
            timer: 3000,
            showConfirmButton: false,
          });
          return false;
        }
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: err.response?.data?.message || "Erreur lors de la vérification de l'état de la caisse.",
          timer: 3000,
          showConfirmButton: false,
        });
        return false;
      }
    };

    const handleBilletageTheoriqueInput = (event: Event, billetage: Billetage, index: number) => {
      const inputValue = (event.target as HTMLInputElement).value;
      const qte = parseInt(inputValue, 10) || 0;
      billetage.quantite = qte;
      billetage.montant = qte * billetage.valueAct;
      montantTotalTheorique.value = billetageTheoriqueList.reduce((total, item) => total + item.montant, 0);
      updateEcart();
    };

    const handleBilletageReelInput = (event: Event, billetage: Billetage, index: number) => {
      const inputValue = (event.target as HTMLInputElement).value;
      const qte = parseInt(inputValue, 10) || 0;
      billetage.quantite = qte;
      billetage.montant = qte * billetage.valueAct;
      montantTotalReel.value = billetageReelList.reduce((total, item) => total + item.montant, 0);
      pointCaisse.value = montantTotalReel.value;
      updateEcart();
    };

    const resetRapportFile = () => {
      rapportFile.value = null;
      rapportFileError.value = null;
      setFieldValue("rapportFile", null);
    };

    const updateEcart = async () => {
      if (!caisse.value) {
        montantTotalEcart.value = 0;
        stockTheorique.value = 0;
        resetRapportFile();
        Swal.fire({
          icon: "warning",
          title: "Aucune caisse disponible",
          text: "Aucune caisse ouverte pour calculer le stock théorique.",
          timer: 3000,
          showConfirmButton: false,
        });
        return;
      }
      try {
        const response = await ApiService.get(`/ouvfers/solde-theorique?caisseId=${caisse.value}`);
        stockTheorique.value = response.data.data.stockTheorique || 0;
        ecartList.splice(0, ecartList.length);
        billetageTheoriqueList.forEach((theorique, index) => {
          const reel = billetageReelList[index];
          const ecartQuantite = reel.quantite - theorique.quantite;
          ecartList.push({
            monnaie: theorique.monnaie,
            libelle: theorique.libelle,
            valueAct: theorique.valueAct,
            quantite: ecartQuantite,
            montant: ecartQuantite * theorique.valueAct,
          });
        });
        montantTotalEcart.value = ecartList.reduce((total, item) => total + item.montant, 0);
      } catch (err: any) {
        stockTheorique.value = 0;
        montantTotalEcart.value = 0;
        resetRapportFile();
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: err.response?.data?.message || "Impossible de récupérer le solde théorique.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    };

    const getOuvFerById = async (ouvFerId: number) => {
      try {
        const { data } = await ApiService.get(`/ouvFer/${ouvFerId}`);
        const ouvFerData = data.data;
        console.log("donneee",ouvFerData);
        if (ouvFerData && ouvFerData.caisse) {
          caisse.value = ouvFerData.caisse.id;
          caisseNom.value = ouvFerData.caisse.nom;
          ouvFer.value = ouvFerData;
          if (caisse.value !== null) {
            await handleCaisseChange(caisse.value);
          }
        } else {
          caisse.value = null;
          caisseNom.value = null;
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Aucune caisse associée à cette ouverture/fermeture.",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      } catch (err: any) {
        caisse.value = null;
        caisseNom.value = null;
        error(err.response?.data?.message || "Erreur lors de la récupération des données de l'ouverture/fermeture");
      }
    };

    const getAllOuvFer = async () => {
      try {
        const res = await ApiService.get("/all/ouvFer");
        ouvFerList.value = res.data.data;
        console.log("tout",ouvFerList.value);
      } catch (err) {
        console.error("Erreur lors de la récupération des ouvfers:", err);
      }
    };

    const getAllMonnaies = async () => {
      try {
        const res = await ApiService.get("/all/monnaies");
        monnaieList.value = res.data.data.data;
      } catch (err) {
        console.error("Erreur lors de la récupération des monnaies:", err);
      }
    };

    const handleCaisseChange = async (newCaisseId: number) => {
      console.log("Caisse sélectionnée (caisseId) :", newCaisseId);
      if (newCaisseId) {
        const isOpen = await checkCaisseStatus(newCaisseId);
        if (isOpen) {
          try {
            const response = await ApiService.get(`/ouvfers/solde-theorique?caisseId=${newCaisseId}`);
            stockTheorique.value = response.data.data.stockTheorique || 0;

            const billetageResponse = await ApiService.get(`/ouvfers/monnaie-caisse?caisseId=${newCaisseId}`);
            const monnaieCaisseData = billetageResponse.data.data;
            billetageTheoriqueList.splice(0, billetageTheoriqueList.length);
            billetageReelList.splice(0, billetageReelList.length);
            ecartList.splice(0, ecartList.length);
            monnaieCaisseData.forEach((item: any) => {
              billetageTheoriqueList.push({
                monnaie: item.monnaieId,
                libelle: item.libelle,
                valueAct: item.valeur,
                quantite: item.quantite,
                montant: item.quantite * item.valeur,
              });
              billetageReelList.push({
                monnaie: item.monnaieId,
                libelle: item.libelle,
                valueAct: item.valeur,
                quantite: 0,
                montant: 0,
              });
            });
            montantTotalTheorique.value = billetageTheoriqueList.reduce((total, item) => total + item.montant, 0);
            montantTotalReel.value = billetageReelList.reduce((total, item) => total + item.montant, 0);
            if (Math.abs(montantTotalTheorique.value - stockTheorique.value) > 0.01) {
              Swal.fire({
                icon: "warning",
                title: "Incohérence détectée",
                text: `Le stock théorique (${stockTheorique.value} FCFA) ne correspond pas au total du billetage (${montantTotalTheorique.value} FCFA).`,
                timer: 3000,
                showConfirmButton: false,
              });
            }
            updateEcart();
          } catch (err) {
            console.error("Erreur lors de la récupération des données:", err);
            Swal.fire({
              icon: "error",
              title: "Erreur",
              text: "Impossible de récupérer les données de la caisse.",
              timer: 3000,
              showConfirmButton: false,
            });
            billetageTheoriqueList.splice(0, billetageTheoriqueList.length);
            billetageReelList.splice(0, billetageReelList.length);
            ecartList.splice(0, ecartList.length);
            montantTotalTheorique.value = 0;
            montantTotalReel.value = 0;
            montantTotalEcart.value = 0;
            stockTheorique.value = 0;
          }
        } else {
          caisse.value = null;
          caisseNom.value = null;
          billetageTheoriqueList.splice(0, billetageTheoriqueList.length);
          billetageReelList.splice(0, billetageReelList.length);
          ecartList.splice(0, ecartList.length);
          montantTotalTheorique.value = 0;
          montantTotalReel.value = 0;
          montantTotalEcart.value = 0;
          stockTheorique.value = 0;
        }
      }
    };

    onMounted(async () => {
      const ouvFerId = Number(route.params.id) || Number(props.id);
      if (ouvFerId) {
        await getOuvFerById(ouvFerId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Aucune ouverture/fermeture spécifiée.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
      await Promise.all([getAllMonnaies(), getAllOuvFer(), getAllUsers()]);
    });

    return {
      dateFin,
      user,
      userOptions,
      currentDateTime,
      ouvFer,
      ouvFerList,
      billetageTheoriqueList,
      billetageReelList,
      ecartList,
      monnaieList,
      montantTotalTheorique,
      montantTotalReel,
      montantTotalEcart,
      caisse,
      caisseNom,
      stockTheorique,
      pointCaisse,
      rapportFile,
      rapportFileError,
      estRegularise,
      observationsFin,
      schema,
      handleFileUpload,
      // saveTemporary,
      sendFermerOuvFer,
      handleCaisseChange,
      handleBilletageTheoriqueInput,
      handleBilletageReelInput,
      resetRapportFile,
      conversionError,
    };
  },
});
</script>

<style scoped>
.overview {
  margin: auto;
}
.text-title {
  text-align: center;
}
.overflow {
  padding: 20px 100px;
}
.montant-total {
  text-align: right;
  font-weight: bold;
  margin-top: 10px;
  font-size: 1.1rem;
  color: #0a59a4;
}
.border-danger {
  border-color: #dc3545 !important;
}
/* .form-control:disabled,
.form-control:read-only {
  background-color: #e9ecef;
}
:deep(.multiselect) {
  background-color: #ffffff !important;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
} */
</style>