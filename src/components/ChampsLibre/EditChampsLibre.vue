<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="champsLibreForm" @submit="editChampsLibre" :validation-schema="champsLibreSchema" :initial-values="initialValues">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type de champs descriptif
              </label>
              <div class="form-check-size border rounded-3 p-2">
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinline1" type="radio" v-model="typeChampsLibre" name="typeChamp" value="name" />
                  <label class="form-check-label mb-0" for="radioinline1">Mot Clé</label>
                </div>
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinline2" v-model="typeChampsLibre" type="radio" name="typeChamp" value="text" />
                  <label class="form-check-label mb-0" for="radioinline2">Texte</label>
                </div>
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinline3" v-model="typeChampsLibre" type="radio" name="typeChamp" value="date" />
                  <label class="form-check-label mb-0" for="radioinline3">Date</label>
                </div>
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinline4" v-model="typeChampsLibre" type="radio" name="typeChamp" value="number" />
                  <label class="form-check-label mb-0" for="radioinline4">Nombre</label>
                </div>
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinline5" v-model="typeChampsLibre" type="radio" name="typeChamp" value="boolean" />
                  <label class="form-check-label mb-0" for="radioinline5">Indicateur</label>
                </div>
              </div>
              <ErrorMessage name="typeChamp" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4">
            <label class="d-block text-black fw-semibold mb-10">
              Le champ est obligatoire ? 
            </label>
            <div class="form-check-size border rounded-3 p-2">
              <div class="form-check form-check-inline radio radio-primary">
                <Field class="form-check-input" id="radioinli1" v-model="estObligatoire" type="radio" name="estObligatoire" :value="true" />
                <label class="form-check-label mb-0" for="radioinli1">Oui</label>
              </div>
              <div class="form-check form-check-inline radio radio-primary">
                <Field class="form-check-input" id="radioinli2" v-model="estObligatoire" type="radio" name="estObligatoire" :value="false" />
                <label class="form-check-label mb-0" for="radioinli2">Non</label>
              </div>
              <ErrorMessage name="estObligatoire" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom du champ <span class="text-danger">*</span>
              </label>
              <Field name="nomChamp" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du champ" />
              <ErrorMessage name="nomChamp" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Libellé du champ<span class="text-danger">*</span>
              </label>
              <Field name="libelleChamp" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé" />
              <ErrorMessage name="libelleChamp" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Valeur Par Défaut
              </label>
              <Field name="valeurParDefaut" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la valeur" />
              <ErrorMessage name="valeurParDefaut" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6 mb-3" v-if="typeChampsLibre == 'date'">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="d-block text-black fw-semibold mb-10">
                  Date du jour par défaut
                </label>
                <div class="form-check form-switch">
                  <Field name="defaultDate" class="form-check-input" id="today" type="checkbox" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="d-block text-black fw-semibold mb-10">
                  Avec heure
                </label>
                <div class="form-check form-switch">
                  <Field name="avecHeure" class="form-check-input" id="heure" type="checkbox" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-7 mb-3" v-if="typeChampsLibre == 'name'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Mode de saisie
              </label>
              <div class="form-check-size border rounded-3 p-2">
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinlin2" v-model="modeSaisie" type="radio" name="modeSaisie" value="keywordValueList" />
                  <label class="form-check-label mb-0" for="radioinlin2">Liste simple</label>
                </div>
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinlin3" v-model="modeSaisie" type="radio" name="modeSaisie" value="keywordKeyValueList" />
                  <label class="form-check-label mb-0" for="radioinlin3">Liste avec libellés</label>
                </div>
                <div class="form-check form-check-inline radio radio-primary">
                  <Field class="form-check-input" id="radioinlin4" v-model="modeSaisie" type="radio" name="modeSaisie" value="keywordExternalRef" />
                  <label class="form-check-label mb-0" for="radioinlin4">Référentiel externe</label>
                </div>
              </div>
              <ErrorMessage name="modeSaisie" class="text-danger" />
            </div>
          </div>

          <div class="row" v-if="typeChampsLibre == 'name' && (modeSaisie == 'keywordKeyValueList' || modeSaisie == 'keywordValueList')">
            <div class="border border-primary mb-10">
              <div class="row d-flex align-items-center justify-content-between fw-bold py-2" style="background-color: #0a59a4">
                <div class="col-md-7">
                  <h3 class="fs-4 text-white">
                    Valeurs Possibles
                  </h3>
                </div>
                <div class="col-md-5">
                  <div class="d-flex float-end">
                    <button class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success" type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable" @click="addRowValeurPossible()">
                      <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                      Ajouter une valeur possible
                    </button>
                  </div>
                </div>
              </div>
              <div class="row align-items-center justify-content-between mt-10">
                <div class="col-md-5">
                  <label class="d-block text-black fw-semibold">
                    Valeur
                    <span class="text-danger">*</span>
                  </label>
                </div>
                <div class="col-md-5">
                  <label class="d-block text-black fw-semibold">
                    Libelle
                    <span class="text-danger">*</span>
                  </label>
                </div>
                <div class="col-md-2">
                  <label class="d-block text-black fw-semibold">
                    Actions
                    <span class="text-danger">*</span>
                  </label>
                </div>
              </div>
              <hr class="mt-0" />
              <div class="row" v-for="(valeurPossible, index) in valeurPossibles" :key="index">
                <div class="col-md-5 mb-3">
                  <div class="d-block text-black fw-semibold mb-10">
                    <input v-model="valeurPossible.valeur" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Saisir la valeur" />
                    <div class="invalid-feedback" v-if="valideteRowValeurPossible(valeurPossible.valeur)">
                      La valeur est obligatoire.
                    </div>
                  </div>
                </div>
                <div class="col-md-5 mb-3">
                  <div class="d-block text-black fw-semibold mb-10">
                    <input v-model="valeurPossible.libelle" type="text" class="form-control shadow-none fs-md-15 text-black" placeholder="Saisir le libellé" />
                    <div class="invalid-feedback" v-if="valideteRowValeurPossible(valeurPossible.libelle)">
                      Le libellé est obligatoire.
                    </div>
                  </div>
                </div>
                <div class="col-md-2 mb-3">
                  <div class="d-block text-black fw-semibold mb-10">
                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button" @click="removeRowValeurPossible(index)">
                      <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit">
                Modifier un champ libre
              </button>
              <router-link to="/champsLibres/liste-champsLibre" class="btn btn-danger">
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from "vue-router";
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';

export default defineComponent({
  name: "EditChampsLibre",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const champsLibreSchema = Yup.object().shape({
      modeSaisie: Yup.string().notRequired(),
      typeChamp: Yup.string().required('Le type de champs descriptif est obligatoire'),
      libelleChamp: Yup.string().required('Le libellé du champ descriptif est obligatoire'),
      nomChamp: Yup.string()
        .matches(/^[A-Za-z][A-Za-z_]*[A-Za-z]$/, "Les premier et dernier caractères doivent être des lettres. Vous devez utiliser uniquement les lettres et le caractère spécial'_'!")
        .required('Le nom du champ libre est obligatoire'),
      valeurParDefaut: Yup.string().notRequired(),
      estObligatoire: Yup.boolean().notRequired(),
      avecHeure: Yup.boolean().notRequired(),
      defaultDate: Yup.boolean().notRequired(),
    });

    const champsLibreForm = ref<any>(null); // Référence au composant Form
    const router = useRouter();
    const route = useRoute();
    const typeChampsLibre = ref("name");
    const modeSaisie = ref("keywordDefault");
    const estObligatoire = ref(false); // Par défaut "Non"
    const isDisable = ref(true);
    const valeurPossibles = reactive<{ valeur: string; libelle: string }[]>([{ valeur: "", libelle: "" }]);
    const initialValues = ref({});

    const addRowValeurPossible = () => {
      valeurPossibles.push({ valeur: "", libelle: "" });
    };

    const removeRowValeurPossible = (index: number) => {
      if (valeurPossibles.length > 1) valeurPossibles.splice(index, 1);
    };

    const valideteRowValeurPossible = (e: string) => {
      return e === "" || e === "0" || e < "0";
    };

    watch(
      valeurPossibles,
      (newValue) => {
        isDisable.value = newValue.some(
          (valeurPossible) =>
            valideteRowValeurPossible(valeurPossible.valeur) ||
            valideteRowValeurPossible(valeurPossible.libelle)
        );
      },
      { deep: true }
    );

    const getChampsLibre = async (id: number) => {
      try {
        const { data } = await ApiService.get(`/champsLibres/${id}`);
        console.log('Données récupérées:', data.data);

        // Synchroniser les variables réactives
        typeChampsLibre.value = data.data.typeChamp || "name";
        estObligatoire.value = data.data.estObligatoire || false;
        modeSaisie.value = data.data.modeSaisie || "keywordDefault";

        // Remplir valeurPossibles si disponible
        if (data.data.valeurPossible && data.data.valeurPossible.length > 0) {
          valeurPossibles.length = 0; // Vider le tableau actuel
          data.data.valeurPossible.forEach((vp: { valeur: string; libelle: string }) => {
            valeurPossibles.push({ valeur: vp.valeur, libelle: vp.libelle });
          });
        }

        // Définir les valeurs initiales pour le formulaire
        initialValues.value = {
          id: data.data.id,
          typeChamp: data.data.typeChamp,
          nomChamp: data.data.nomChamp,
          libelleChamp: data.data.libelleChamp,
          valeurParDefaut: data.data.valeurParDefaut || "",
          estObligatoire: data.data.estObligatoire,
          avecHeure: data.data.avecHeure || false,
          defaultDate: data.data.defaultDate || false,
          modeSaisie: data.data.modeSaisie,
        };

        // Mettre à jour le formulaire
        if (champsLibreForm.value) {
          champsLibreForm.value.setValues(initialValues.value);
        }
      } catch ({ response }) {
        error(response?.data?.message || "Erreur lors de la récupération des données");
      }
    };

    const editChampsLibre = async (values: any, { resetForm }: any) => {
      values.valeurPossible = valeurPossibles;
      console.log('Valeurs envoyées à l’API:', values);
      try {
        const { data } = await ApiService.put(`/champsLibres/${values.id}`, values);
        console.log('Réponse API:', data);
        if (data.code === 200) {
          success(data.message);
          resetForm();
          router.push({ name: "ListeChampsLibre" });
        }
      } catch ({ response }) {
        error(response.data.message);
      }
    };

    const getAllTypeChampsLibres = async () => {
      try {
        const response = await ApiService.get('/all/champsLibres');
        console.log('Liste des champs libres:', response.data.data.data);
        // Si vous avez besoin de cette liste pour autre chose, mettez-la à jour ici
      } catch (err) {
        error("Erreur lors de la récupération des types de champs libres");
      }
    };

    onMounted(() => {
      getAllTypeChampsLibres();
      if (route.params.id) {
        getChampsLibre(parseInt(route.params.id as string));
      }
    });

    return {
      champsLibreSchema,
      editChampsLibre,
      champsLibreForm,
      removeRowValeurPossible,
      addRowValeurPossible,
      valideteRowValeurPossible,
      estObligatoire,
      isDisable,
      valeurPossibles,
      typeChampsLibre,
      modeSaisie,
      initialValues,
    };
  },
});
</script>

<style scoped>
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