<template>
    <div class="container-fluid" style="">
        <div class="row">
            <div class="col-xl-12 p-0">
                <div class="login-card login-dark">
                    <div>
                        <!-- <div><a class="logo ">
                                <router-link to="/">
                                    <img class="img-fluid for-light" src="@/assets/images/logo/logo.png"
                                        alt="looginpage">
                                    <img class="img-fluid for-dark" src="@/assets/images/logo/logo_dark.png"
                                        alt="looginpage">
                                </router-link></a>
                        </div> -->
                        <div class="login-main">
                            <Form class="theme-form" ref="loginForm" @submit="onSubmitReset"
                                :validation-schema="resetSchema">
                                <center>
                                    <h4>Bonjour M./Mme {{ userEmail }}</h4>
                                    <p>Pour la première connexion, veuillez définir <br>votre propre mot de passe</p>
                                </center>
                                <div class="form-group">
                                    <label class="col-form-label">Nouveau Mot de passe</label>
                                    <div class="form-input position-relative">
                                        <Field name="newPassword" :type="showPassword ? 'password' : 'text'"
                                            class="form-control pr-5" placeholder="Entrer votre mot de passe" />
                                        <i :class="{ 'fa fa-eye': !showPassword, 'fa fa-eye-slash': showPassword }"
                                            class="flaticon-eye position-absolute end-0 top-50 translate-middle-y pe-2"
                                            @click="toggleShow" :aria-label="buttonLabel"></i>
                                        <ErrorMessage name="newPassword" class="text-danger" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label">Confimer le Mot de passe</label>
                                    <div class="form-input position-relative">
                                        <Field name="confirmNewPassword" :type="showPassword ? 'password' : 'text'"
                                            class="form-control pr-5" placeholder="confirmer votre mot de passe" />
                                        <i :class="{ 'fa fa-eye': !showPassword, 'fa fa-eye-slash': showPassword }"
                                            class="flaticon-eye position-absolute end-0 top-50 translate-middle-y pe-2"
                                            @click="toggleShow" :aria-label="buttonLabel"></i>
                                        <ErrorMessage name="confirmNewPassword" class="text-danger" />
                                    </div>
                                </div>
                                <div class="form-group mb-0">
                                    <div class="text-end mt-3">
                                        <button ref="submitButton" class="btn btn-primary btn-block py-3 w-100"
                                            type="submit">Modifier mon mot de passe
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import 'vue3-toastify/dist/index.css';
import * as Yup from 'yup';
import { useRouter, useRoute } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/services/auth';
import Swal from 'sweetalert2';

export default defineComponent({
    name: "ResetPasswordFirstPage",
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup: ({ }) => {
        const resetSchema = Yup.object().shape({
            newPassword: Yup.string()
                .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et 8 caractères au moins')
                .required('Le mot de passe est obligatoire'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Les mots de passe ne correspondent pas')
                .required('La confirmation du mot de passe est obligatoire'),
        });

        const router = useRouter();
        const route = useRoute();
        const store = useAuthStore();
        const submitButton = ref<HTMLButtonElement | null>(null);
        const userEmail = route.query.email;
        const reseteToken = route.query.token;
        const loginForm = ref(null);
        const onSubmitReset = async (values: any) => {

            if (submitButton.value) {
                submitButton.value.disabled = true;
            }
            values.token = reseteToken;
            // Send login request
            const data =await store.resetPassword(values);
            const error = Object.values(store.errors);
            console.log('Pas de erreurs', error)

            if (error.length === 0) {
                store.logout();
                router.replace('/auth/login');
            } else {
                Swal.fire({
                    text: data.data.message as string,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    heightAuto: false,
                    customClass: {
                        confirmButton: "btn btn-sm fw-semobold btn-danger",
                    },
                }).then(() => {
                    store.errors = {};
                });
            }
            // eslint-disable-next-line
            submitButton.value!.disabled = false;
        };

        const showPassword = ref(true);
        const password = ref(null);

        const toggleShow = () => {
            showPassword.value = !showPassword.value;
        };

        const buttonLabel = computed(() => (showPassword.value ? 'Hide' : 'Show'));

        onMounted(() => {
           
        });

        return {
            // userEmail,
            userEmail,
            //userLastName,
            onSubmitReset,
            loginForm,
            submitButton,
            showPassword,
            toggleShow,
            buttonLabel,
            password,
            resetSchema,
        }
    }

});
</script>