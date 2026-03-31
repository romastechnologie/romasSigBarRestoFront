<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form class="row g-3" :validation-schema="schema" @submit="sendOuvFer">
       
        <div class="col-md-6 mt-4">
          <div class="col mb-3">
            <label class="d-block text-black fw-semibold mb-10">
              Date d'ouverture <span class="text-danger">*</span>
            </label>
            <Field
              name="dateOuverture"
              class="form-control shadow-none fs-md-15 text-black"
              type="datetime-local"
              :max="currentDateTime"
              v-model="dateOuverture"
              readonly
            />
            <ErrorMessage name="dateOuverture" class="text-danger" />
          </div>
          <div class="col mb-3">
            <label for="soldeTheorique">Fonds de caisse initial </label>
            <input
              type="number"
              id="soldeTheorique"
              class="form-control"
              v-model="soldeTheorique"
              disabled
            />
          </div>
          <div class="col mb-3">
            <label for="reliquatTotalRetourner">Reliquat à retourner </label>
            <input
              type="number"
              id="reliquatTotalRetourner"
              class="form-control"
              v-model="reliquatTotalRetourner"
              disabled
            />
          </div>
          <div class="col mb-3">
            <label for="caisse">Caisse</label>
            <Field name="caisse" v-slot="{ field }">
              <Multiselect
                v-model="caisse"
                :options="caisseOptions"
                :preserve-search="true"
                :multiple="false"
                :searchable="true"
                placeholder="Sélectionner la caisse"
                label="label"
                track-by="value"
                v-bind="field"
                @change="handleCaisseChange"
              />
            </Field>
            <ErrorMessage name="caisse" class="text-danger" />
            <div v-if="caisseOptions.length === 0" class="text-danger mt-2">
              Aucune caisse affectée à cet utilisateur.
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Personnes présentes à l'ouverture <span class="text-danger">*</span>
              </label>
              <Field name="user" v-slot="{ field }">
                <Multiselect
                  v-model="user"
                  :options="userOptions"
                  :searchable="true"
                  track-by="value"
                  mode="tags"
                  label="label"
                  placeholder="Sélectionner la personne"
                  v-bind="field"
                />
              </Field>
              <ErrorMessage name="user" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Observation 
            </label>              
            <Field
                name="observations"
                as="textarea"
                cols="30"
                rows="12"
                placeholder="Entrer votre observation"
                class="form-control shadow-none rounded-0 text-black"
              />
              <ErrorMessage name="observations" class="text-danger" />
            </div>
          </div>
          <div class="mb-3 mt-1">
            <button type="submit" class="btn btn-primary top-end" :disabled="caisseOptions.length === 0 || isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Ouvrir
            </button>
            <router-link to="/ouv_fers/liste-ouv_fer/" type="button" class="btn btn-danger mx-1">Annuler</router-link>
          </div>
        </div>
         <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 mb-md-25">
              <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-10">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2" style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Billetage</h3>
                      </div>
                      <!-- <div class="col-md-5">
                        <h3 class="fs-5 text-white" style="text-align: end;font-weight: bold;" v-if="montantTotal">
                          Total : {{ montantTotal }} Fcfa
                        </h3>
                      </div> -->
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-2">
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">Monnaie</label>
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">Quantité</label>
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">Montant</label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <div v-for="(billetage, index) in billetageList" :key="index" class="container m-3">
                        <div class="row">
                          <div class="col-md-4">
                            <input
                              name="monnaie"
                              placeholder="Sélectionner la monnaie"
                              v-model="billetage.libelle"
                              readonly
                              class="form-control"
                            />
                          </div>
                          <div class="col-md-4">
                            <Field
                              :name="`billetageList[${index}].qteBillet`"
                              type="number"
                              min="0"
                              placeholder="Entrer la quantité"
                              class="form-control"
                              v-model="billetage.qteBillet"
                              @input="event => handleBilletageInput(event, billetage)"
                              @keypress="restrictInput"
                            />
                            <ErrorMessage :name="`billetageList[${index}].qteBillet`" class="text-danger" />
                          </div>
                          <div class="col-md-4">
                            <input
                              type="text"
                              v-model="billetage.montant"
                              placeholder="Montant"
                              readonly
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="billetageList.length === 0" class="text-muted ms-3">
                        Aucune donnée de billetage disponible. Veuillez saisir les quantités manuellement.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>


<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from 'vue';
import * as Yup from 'yup';
import { configure, Form, Field, ErrorMessage } from 'vee-validate';
import Multiselect from '@vueform/multiselect';
import Swal from 'sweetalert2';
import ApiService from '@/services/ApiService';
import router from '@/router';
import { Caisse } from '@/models/Caisse';
import { useRoute } from 'vue-router';
import { error, monSwal, success } from '@/utils/utils';
import { getUserId } from '@/services/JwtService';

interface Billetage {
  monnaie: number;
  qteBillet: number;
  montant: number;
  libelle: string;
  valueAct: number;
}

export default defineComponent({
  name: 'AddOuvFerm',
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  
  setup() {
    const route = useRoute();
    const userOptions = ref<{ value: number; label: string }[]>([]);
    const user = ref<number[]>([]);
    const dateOuverture = ref(getCurrentDateTime());
    const currentDateTime = ref(getCurrentDateTime());
    const billetageList = reactive<Billetage[]>([]);
    const monnaieList = ref<any[]>([]);
    // const montantTotal = ref<number>(0);
    const soldeTheorique = ref<number>(0);
    const reliquatTotalRetourner = ref<number>(0); 
    const caisseOptions = ref<{ value: number; label: string }[]>([]);
    const caisse = ref<number | null>(null);
    const caisses = ref<Caisse[]>([]);
    const isSubmitting = ref<boolean>(false);



    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const schema = Yup.object().shape({
      dateOuverture: Yup.string().required("La date d'ouverture est obligatoire"),
      caisse: Yup.number().required("La caisse est obligatoire"),
      user: Yup.array()
        .min(1, "Au moins une personne doit être sélectionnée")
        .required("Ce champ est obligatoire"),
      observations: Yup.string().notRequired(),
      billetageList: Yup.array()
        .of(
          Yup.object().shape({
            qteBillet: Yup.number()
              .typeError("La quantité doit être un nombre")
              .required("La quantité est obligatoire")
              .integer("La quantité doit être un entier")
              .min(0, "La quantité ne peut pas être négative"),
          })
        )
        .test('at-least-one', 'Au moins une quantité doit être non nulle', (value) => {
          return value?.some((billet: any) => billet.qteBillet > 0) || false;
        }),
    });

    configure({
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
    });

    const restrictInput = (event: KeyboardEvent) => {
      const invalidChars = ['e', 'E', '+', '-', '.'];
      if (invalidChars.includes(event.key)) {
        event.preventDefault();
      }
    };

    const handleBilletageInput = (event: Event, billetage: Billetage) => {
      const inputValue = (event.target as HTMLInputElement).value;
      const qte = parseInt(inputValue, 10);
      billetage.qteBillet = isNaN(qte) || qte < 0 ? 0 : qte;
      billetage.montant = billetage.qteBillet * billetage.valueAct;
      soldeTheorique.value = billetageList.reduce((total, item) => total + item.montant, 0);
    };


    const fetchDernFermeture = async (caisseId: number) => {
      console.log("fetchDernFermeture appelé avec caisseId =", caisseId);
      try {
        const response = await ApiService.get(`/derniere/fermeture/caisse?caisseId=${caisseId}`);
        const { soldeTheorique: fetchedSolde, billetage, reliquatTotalRetourner: apiReliquat } = response.data.data || { soldeTheorique: 0, billetage: [] , reliquatTotalRetourner: 0};
        console.log("res",response.data.data);
         reliquatTotalRetourner.value = apiReliquat || 0;
        billetageList.splice(0, billetageList.length);
        if (billetage.length > 0) {
          billetage.forEach((billet: Billetage) => {
            billetageList.push({
              monnaie: billet.monnaie,
              libelle: billet.libelle,
              qteBillet: billet.qteBillet,
              montant: billet.montant,
              valueAct: billet.valueAct,
            });
          });
          soldeTheorique.value = fetchedSolde;
          
        } else {
          await getAllMonnaies();
          soldeTheorique.value = 0;
        }
      } catch (err: any) {
        console.error("Erreur lors de fetchDernFermeture:", err.response?.data || err.message || err);
        await getAllMonnaies();
        soldeTheorique.value = 0;
        if (err.response?.status >= 500) {
          error('Erreur serveur lors de la récupération de la dernière fermeture. Veuillez saisir les quantités manuellement.');
        }
      }
    };

    
    const handleCaisseChange = async (newCaisseId: number) => {
      if (newCaisseId) {
        await fetchDernFermeture(newCaisseId);
      }
    };

    const sendOuvFer = async (values: any, { resetForm }: any) => {
      isSubmitting.value = true;
      //  const currentUserId = getUserId();

      // console.log("User ID from localStorage:", currentUserId);

      // if (!currentUserId) {
      //   error("Utilisateur non connecté. Veuillez vous connecter.");
      //   return;
      // }

      try {
        const payload = {
          dateOuverture: dateOuverture.value,
          caisseId: caisse.value,
          userIds: user.value,
          billetageList: billetageList
            // .filter(b => b.qteBillet > 0)
            .map(b => ({
              monnaie: b.monnaie,
              libelle: b.libelle,
              qteBillet: b.qteBillet,
              montant: b.montant, 
              valueAct: b.valueAct,
            })),
          observations: values.observations, 
        };

        const caisseName = caisses.value.find(c => c.id.toString() === caisse.value?.toString())?.nom || "caisse inconnue";        
        const soldeTheoriqueFormatted = soldeTheorique.value.toFixed(2);
         const result = await monSwal(
          `Vous êtes sur le point d'ouvrir la caisse ${caisseName} avec un fonds de roulement de ${soldeTheoriqueFormatted} Fcfa. Êtes-vous sûr ?`,
          undefined,
          'btn btn-primary',
          undefined,
          undefined
        );

        if (result) {
          console.log('Payload envoyé :', payload);
          await ApiService.post('/ouvFer', payload);
          success('Ouverture de caisse enregistrée avec succès');
          resetForm();
          router.push('/OuverturesFermetures');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Erreur lors de l'ouverture de la caisse";
        console.error("Erreur serveur :", errorMessage);
        error(errorMessage);
      }finally {
              isSubmitting.value = false;
      }
    };

    const getCaisse = async () => {
      try {
        const { data } = await ApiService.get('/all/caisses');
        const donnees = data.data.data;
        caisseOptions.value = donnees
          .filter((ca) => ca.statut == 0)
          .map((ca: Caisse) => ({
            label: ca.nom,
            value: ca.id,
          }));
        caisses.value = donnees;
      } catch (err: any) {
        error(err.response?.data?.message || 'Erreur lors de la récupération des caisses');
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

    const getAllOuvFer = async () => {
      try {
        const { data } = await ApiService.get('/all/ouv_fers');
        // Pas utilisé dans ce composant, mais conservé pour référence
      } catch (err) {
        console.error('Erreur lors de la récupération des ouv_fers:', err);
      }
    };

    const getAllMonnaies = async () => {
      try {
        const { data } = await ApiService.get('/all/monnaies');
        monnaieList.value = data.data.data;
        billetageList.splice(0, billetageList.length);
        monnaieList.value.forEach((element: any) => {
          billetageList.push({
            libelle: element.libelle,
            montant: 0,
            valueAct: element.valeur,
            monnaie: element.id,
            qteBillet: 0,
          });
        });
      } catch (err) {
        console.error('Erreur lors de la récupération des monnaies:', err);
        error('Erreur lors de la récupération des monnaies');
      }
    };

    
 

    onMounted(async () => {
      await Promise.all([
        getCaisse(),
        getAllUsers(),
        getAllOuvFer(),
      ]);
    });

    return {
      user,
      userOptions,
      dateOuverture,
      currentDateTime,
      billetageList,
      monnaieList,
      soldeTheorique,
      caisse,
      caisseOptions,
      schema,
      restrictInput,
      handleBilletageInput,
      sendOuvFer,
      handleCaisseChange,
      isSubmitting,
      reliquatTotalRetourner
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
}
</style>