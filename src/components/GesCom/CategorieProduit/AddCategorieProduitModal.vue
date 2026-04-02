<template>
  <div class="modal fade" id="AddCategorieProduitModal" tabindex="-1" role="dialog" ref="addCategorieProduitModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="categorieProduitForm" @submit="addCategorieProduit" :validation-schema="categorieProduitSchema">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code categorieProduit" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libelle" />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>
             
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Parent
                  </label>
                  <Field name="categorieProduit" v-slot="{ field }">
                    <Multiselect :options="categorieProduitOptions" :searchable="true" track-by="label" label="label"
                      v-model="field.value" v-bind="field" placeholder="Sélectionner le parent" />
                  </Field>
                  <ErrorMessage name="categorieProduit" class="text-danger" />
                </div>
              </div>
              <button ref="submitButton" class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
            </div>
          </Form>
        </div>
        <!-- <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button> -->
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
import { CategorieProduit } from '@/models/CategorieProduit';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "AddCategorieProduitModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: Object as () => CategorieProduit | null,
      default: null
    }
  },
  setup(props, { emit }) {
    const categorieProduitSchema = Yup.object().shape({
      categorieProduit: Yup.string().notRequired(),
      code: Yup.string()
      .max(4, "Le code categorieProduit ne doit pas dépasser 4 caractères")
        .required("Le code categorieProduit est obligatoire"),
        // .matches(/^[A-Za-z0-9]+$/, "Le code categorieProduit doit être alphanumérique"), // Optionnel : restreindre aux lettres et chiffres
      // Autres champs...
      libelle: Yup.string().required('Le libellé categorieProduit est obligatoire'),
      
      
    });

    const categorieProduitForm = ref<CategorieProduit | null>(null);
    const addCategorieProduitModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const estService = ref(false);
    const categorieProduitOptions = ref([]);
    const submitButton = ref<HTMLButtonElement | null>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une categorieProduit");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getCategorieProduit(newValue.id);
      isUPDATE.value = true;
      btnTitle();
    });

    watch(estService, () => {
      console.log('estservice', estService.value)
    })


    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier la categorieProduit";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter une categorieProduit";
        btntext.value = "Ajouter";
      }
    }

    const getCategorieProduit = async (id: number) => {
      return ApiService.get("/categorieProduits/" + id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            categorieProduitForm.value?.setFieldValue(key,
              (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
            );
          }
          emit('openmodal', addCategorieProduitModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const fetchCategorieProduit = async () => {
      try {
        const response = await ApiService.get('/categorieProduits');
        const categorieProduitData = response.data.data.data;
        categorieProduitOptions.value = categorieProduitData.map((categorieProduit) => ({
          value: categorieProduit.id,
          label: `${categorieProduit.code} - ${categorieProduit.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchCategorieProduit();
    });


    const addCategorieProduit = async (values: any, categorieProduitForm) => {
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }
      values = values as CategorieProduit;
      values.estService = estService.value;
      if (isUPDATE.value) {
        console.log('values', values)
        ApiService.put("/categorieProduits/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              categorieProduitForm.resetForm();
              hideModal(addCategorieProduitModalRef.value);
              isUPDATE.value = false;
              btnTitle();
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        console.log('estService', values)
        values.estService = estService.value;
        ApiService.post("/categorieProduits", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              categorieProduitForm.resetForm();
              hideModal(addCategorieProduitModalRef.value);
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
      categorieProduitSchema,
      addCategorieProduitModalRef,
      addCategorieProduit,
      submitButton,
      categorieProduitForm, estService,
      title, btntext, resetValue,
      categorieProduitOptions,
    };
  },
});
</script>