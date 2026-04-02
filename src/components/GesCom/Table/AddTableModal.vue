<template>
  <div class="modal fade" id="AddTableModal" tabindex="-1" role="dialog" ref="addTableModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="tableForm" @submit="addTable" :validation-schema="tableSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group ">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code table <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <div class="form-group ">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé ou nom de la table <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libellé" />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group ">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nombre de places <span class="text-danger">*</span>
                  </label>
                  <Field name="nombrePlace" type="number" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le nombre de place" />
                  <ErrorMessage name="nombrePlace" class="text-danger" />
                </div>
              </div>
              

              <button ref="submitButton" class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { hideModal } from '@/utils/utils';
import { Table } from '@/models/Table';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect';

export default defineComponent({
  name: "AddTableModal",
  components: {
    Form,
    Field,
    Multiselect,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const tableSchema = Yup.object().shape({

      libelle: Yup.string().required('Le libelle est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),
      nombrePlace: Yup.string().required('Le nombre de place est obligatoire'),
      
    });

    const tableForm = ref<Table | null>(null);
    const addTableModalRef = ref<null | HTMLElement>(null);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const router = useRouter();
    const tableOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une table");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTable(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier la table";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter une table";
        btntext.value = "Ajouter"
      }
    }

    const getTable = async (id: number) => {
      return ApiService.get("/tables/" + id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            tableForm.value?.setFieldValue(key,
              (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
            );
          }
          emit('openmodal', addTableModalRef.value);

        })
        .catch(({ response }) => {

          error(response.data.message)
        });
    }

    const fetchTable = async () => {
      try {
        const response = await ApiService.get('/tables');
        const tableData = response.data.data.data;
        tableOptions.value = tableData.map((table) => ({
          value: table.id,
          label: table.libelle,
        }));
      } catch (error) {
        //
      }
    };

    const pays = [
      "Afghanistan",
      "Afrique du Sud",
      "Albanie",
      "Algérie",
      "Allemagne",
      "Andorre",
      "Angola",
      "Anguilla",
      "Antarctique",
      "Antigua-et-Barbuda",
      "Antilles Néerlandaises",
      "Arabie Saoudite",
      "Argentine",
      "Arménie",
      "Aruba",
      "Australie",
      "Autriche",
      "Azerbaïdjan",
      "Bahamas",
      "Bahreïn",
      "Bangladesh",
      "Barbade",
      "Bélarus",
      "Belgique",
      "Belize",
      "Bénin",
      "Bermudes",
      "Bhoutan",
      "Bolivie",
      "Bosnie-Herzégovine",
      "Botswana",
      "Brésil",
      "Brunéi Darussalam",
      "Bulgarie",
      "Burkina Faso",
      "Burundi",
      "Cambodge",
      "Cameroun",
      "Canada",
      "Cap-vert",
      "Chili",
      "Chine",
      "Chypre",
      "Colombie",
      "Comores",
      "Costa Rica",
      "Côte d'Ivoire",
      "Croatie",
      "Cuba",
      "Danemark",
      "Djibouti",
      "Dominique",
      "Égypte",
      "El Salvador",
      "Émirats Arabes Unis",
      "Équateur",
      "Érythrée",
      "Espagne",
      "Estonie",
      "États Fédérés de Micronésie",
      "États-Unis",
      "Éthiopie",
      "Fédération de Russie",
      "Fidji",
      "Finlande",
      "France",
      "Gabon",
      "Gambie",
      "Géorgie",
      "Géorgie du Sud et les Îles Sandwich du Sud",
      "Ghana",
      "Gibraltar",
      "Grèce",
      "Grenade",
      "Groenland",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guinée",
      "Guinée Équatoriale",
      "Guinée-Bissau",
      "Guyana",
      "Guyane Française",
      "Haïti",
      "Honduras",
      "Hong-Kong",
      "Hongrie",
      "Île Bouvet",
      "Île Christmas",
      "Île de Man",
      "Île Norfolk",
      "Îles (Malvinas) Falkland",
      "Îles Åland",
      "Îles Caïmanes",
      "Îles Cocos (Keeling)",
      "Îles Cook",
      "Îles Féroé",
      "Îles Heard et McDonald",
      "Îles Mariannes du Nord",
      "Îles Marshall",
      "Îles Mineures Éloignées des États-Unis",
      "Îles Salomon",
      "Îles Turks et Caïques",
      "Îles Vierges Britanniques",
      "Îles Vierges des États-Unis",
      "Inde",
      "Indonésie",
      "Irak",
      "Irlande",
      "Islande",
      "Israël",
      "Italie",
      "Jamahiriya Arabe Libyenne",
      "Jamaïque",
      "Japon",
      "Jordanie",
      "Kazakhstan",
      "Kenya",
      "Kirghizistan",
      "Kiribati",
      "Koweït",
      "L'ex-République Yougoslave de Macédoine",
      "Lesotho",
      "Lettonie",
      "Liban",
      "Libéria",
      "Liechtenstein",
      "Lituanie",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malaisie",
      "Malawi",
      "Maldives",
      "Mali",
      "Malte",
      "Maroc",
      "Martinique",
      "Maurice",
      "Mauritanie",
      "Mayotte",
      "Mexique",
      "Monaco",
      "Mongolie",
      "Montserrat",
      "Mozambique",
      "Myanmar",
      "Namibie",
      "Nauru",
      "Népal",
      "Nicaragua",
      "Niger",
      "Nigéria",
      "Niué",
      "Norvège",
      "Nouvelle-Calédonie",
      "Nouvelle-Zélande",
      "Oman",
      "Ouganda",
      "Ouzbékistan",
      "Pakistan",
      "Palaos",
      "Panama",
      "Papouasie-Nouvelle-Guinée",
      "Paraguay",
      "Pays-Bas",
      "Pérou",
      "Philippines",
      "Pitcairn",
      "Pologne",
      "Polynésie Française",
      "Porto Rico",
      "Portugal",
      "Qatar",
      "République Arabe Syrienne",
      "République Centrafricaine",
      "République de Corée",
      "République de Moldova",
      "République Démocratique du Congo",
      "République Démocratique Populaire Lao",
      "République Dominicaine",
      "République du Congo",
      "République Islamique d'Iran",
      "République Populaire Démocratique de Corée",
      "République Tchèque",
      "République-Unie de Tanzanie",
      "Réunion",
      "Roumanie",
      "Royaume-Uni",
      "Rwanda",
      "Sahara Occidental",
      "Saint-Kitts-et-Nevis",
      "Saint-Marin",
      "Saint-Pierre-et-Miquelon",
      "Saint-Siège (État de la Cité du Vatican)",
      "Saint-Vincent-et-les Grenadines",
      "Sainte-Hélène",
      "Sainte-Lucie",
      "Samoa",
      "Samoa Américaines",
      "Sao Tomé-et-Principe",
      "Sénégal",
      "Serbie-et-Monténégro",
      "Seychelles",
      "Sierra Leone",
      "Singapour",
      "Slovaquie",
      "Slovénie",
      "Somalie",
      "Soudan",
      "Sri Lanka",
      "Suède",
      "Suisse",
      "Suriname",
      "Svalbard et Île Jan Mayen",
      "Swaziland",
      "Tadjikistan",
      "Taïwan",
      "Tchad",
      "Terres Australes Françaises",
      "Territoire Britannique de l'Océan Indien",
      "Territoire Palestinien Occupé",
      "Thaïlande",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinité-et-Tobago",
      "Tunisie",
      "Turkménistan",
      "Turquie",
      "Tuvalu",
      "Ukraine",
      "Uruguay",
      "Vanuatu",
      "Venezuela",
      "Viet Nam",
      "Wallis et Futuna",
      "Yémen",
      "Zambie",
      "Zimbabwe"
    ];


    onMounted(() => {
      fetchTable();
    });

    const addTable = async (values: any, tableForm) => {
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }

      values = values as Table;
      if (isUPDATE.value) {
        ApiService.put("/tables/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              tableForm.resetForm();
              hideModal(addTableModalRef.value);
              isUPDATE.value = false;
              btnTitle();
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        console.log('values', values)
        ApiService.post("/tables", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              tableForm.resetForm();
              hideModal(addTableModalRef.value);
              emit('close');
            }
          })
          .catch(({ response }) => {
            submitButton.value!.disabled = false;
            error(response.data.message);
          });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isUPDATE.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return {
      tableSchema,
      addTableModalRef,
      addTable,
      submitButton,
      tableForm,
      title, btntext, resetValue,
      tableOptions, pays
    };
  },
});
</script>@/models/Table