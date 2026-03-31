<template>
  <div class="modal fade" id="AddMagasinModal" tabindex="-1" role="dialog" ref="addMagasinModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="magasinForm" @submit="addMagasin" :validation-schema="magasinSchema">
            <div class="col-md-3">
              <br />
              <div class="form-check mt-3 mb-15 mb-sm-20 mb-md-25">
                <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                  Est Principal ?
                </label>
                <input id="estPrincipal" name="estPrincipal" v-model="estPrincipal" :value="estPrincipal"
                  type="checkbox" class="form-check-input shadow-none" />
                <ErrorMessage name="estPrincipal" class="text-danger" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group ">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code du magasin <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code du magasin" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group ">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom du magasin <span class="text-danger">*</span>
                  </label>
                  <Field name="nomMagasin" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le nom magasin" />
                  <ErrorMessage name="nomMagasin" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12  mb-3">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold mb-10">
                    Magasinier <span class="text-danger">*</span>
                  </label>
                  <Field name="user" v-slot="{ field }">
                    <Multiselect :options="personnelOptions" :searchable="true" track-by="label" label="label"
                      v-model="field.value" v-bind="field" placeholder="Sélectionner le magasinier" />
                  </Field>
                  <ErrorMessage name="user" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold mb-10">
                    Adresse du magasin <span class="text-danger">*</span>
                  </label>
                  <Field name="adresse" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer l'adresse" />
                  <ErrorMessage name="adresse" class="text-danger" />
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
import { Magasin } from '@/models/Magasin';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect';
import axios from 'axios';

export default defineComponent({
  name: "AddMagasinModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const magasinSchema = Yup.object().shape({
      nomMagasin: Yup.string().required('Le nom du magasin est obligatoire'),
      code: Yup.string().required('Le code du magasin est obligatoire'),
      user: Yup.string().required('Le magasinier est obligatoire'),
      adresse: Yup.string().required('L\'adresse est obligatoire'),

    });

    const magasinForm = ref<Magasin | null>(null);
    const addMagasinModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const personnelOptions = ref([]);
    const submitButton = ref<HTMLButtonElement | null>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un magasin");
    const btntext = ref('Ajouter');
    const estPrincipal = ref(false);

    onMounted(async () => {
      await fetchMagasin();
    });

    watch(() => props.item, (newValue) => {
      getMagasin(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier le magasin";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un magasin";
        btntext.value = "Ajouter";
      }
    }

    const getMagasin = async (id: number) => {
      return ApiService.get("/magasins/" + id)
        .then(({ data }) => {
          const donnees = data.data;
          for (const key in donnees) {
            magasinForm.value?.setFieldValue(key,
              (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
            );
          }
          emit('openmodal', addMagasinModalRef.value);

        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const fetchMagasin = async () => {
      try {
        console.log("4nkjnkj ===> ");
        const response = await axios.get('all/users');
        const userData = response.data.data;
        console.log("TTTTTTTTTTtt ===> ", userData);
        personnelOptions.value = userData.map((user) => ({
          value: user.id,
          label: `${user.nom} ${user.prenom}`,
        }));
      } catch (error) {
        console.log("RRYRYFJGHB ==> ", error);
      }
    };



    const addMagasin = async (values: any, magasinForm) => {
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }

      values = values as Magasin;
      console.log("ZZZZZZZZZZZ ===> ", isUPDATE.value)
      if (isUPDATE.value) {
        ApiService.put("/magasins/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              magasinForm.resetForm();
              hideModal(addMagasinModalRef.value);
              isUPDATE.value = false;
              btnTitle();
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        console.log("Création ===> ", values);
        ApiService.post("/magasins", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              magasinForm.resetForm();
              hideModal(addMagasinModalRef.value);
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
      magasinSchema,
      addMagasinModalRef,
      addMagasin,
      submitButton,
      magasinForm,
      title, btntext, resetValue,
      personnelOptions,
    };
  },
});
</script>