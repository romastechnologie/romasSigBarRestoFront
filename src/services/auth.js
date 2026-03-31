import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
export const useAuthStore = defineStore("auth", () => {
    const errors = ref({});
    const user = ref({});
    const isAuthenticated = ref(!!JwtService.getToken());
    function setAuth(authUser) {
        if (authUser.user.firstConnectDate != null) {
            isAuthenticated.value = true;
            user.value = authUser.user;
            errors.value = {};
            formatRole(authUser.user);
            formatPrivilege(authUser.user);
            formatPointVent(authUser.user);
            JwtService.saveUser(user.value.id.toString());
            JwtService.saveToken(authUser.token);
            JwtService.saveUserName(authUser.user.nom);
            JwtService.saveUserLastName(authUser.user.prenom);
            JwtService.saveUserLastName(authUser.user.prenom);
            JwtService.saveUserPhone(authUser.user.telephone);
            JwtService.setUserEmail(authUser.user.email);
            JwtService.saveUserFirstConnectDate(authUser.user.firstConnectDate);
        }
        else {
            JwtService.saveUserLastName(authUser.user.prenom);
            JwtService.saveUserLastName(authUser.user.prenom);
        }
    }
    function formatPrivilege(user) {
        const privile = ref([]);
        user.userRoles.forEach(userRole => {
            if (userRole.role && userRole.role.rolePermissions) {
                userRole.role.rolePermissions.forEach(element => {
                    if (element.permission != null) {
                        privile.value.push(element.permission.nom);
                    }
                });
            }
        });
        JwtService.savePrivilege(JSON.stringify(privile.value));
    }
    function formatRole(user) {
        const rol = ref([]);
        if (user && user.userRoles) {
            user.userRoles.forEach(element => {
                if (element.role != null) {
                    rol.value.push(element.role.nom);
                }
            });
            JwtService.saveRole(JSON.stringify(rol.value));
        }
    }
    function formatPointVent(user) {
        const point = ref([]);
        if (user && user.userpointventes) {
            user.userpointventes.forEach(element => {
                if (element.pointvente != null) {
                    point.value.push({ id: element.pointvente.id, nomPointVente: element.pointvente.nomPointVente, adresse: element.pointvente.adresse, code: element.pointvente.code });
                }
            });
            JwtService.savePointDeVente(point.value[0].nomPointVente);
            JwtService.savePointDeVenteId(point.value[0].id.toString());
            JwtService.savePointDeVentes(JSON.stringify(point.value));
        }
    }
    function setError(error) {
        errors.value = { ...error };
    }
    function purgeAuth() {
        isAuthenticated.value = false;
        user.value = {};
        errors.value = [];
        JwtService.destroyToken();
        JwtService.destroyUserPrivilege();
    }
    function login(credentials) {
        console.log("On est au début ==>", credentials);
        return ApiService.post("auth/login", credentials)
            .then(({ data }) => {
            console.log("TYYYYTYTYYTYYTYTYTY ===> ", data);
            setAuth(data.data);
            return data;
        })
            .catch(({ response }) => {
            setError(response.data);
        });
    }
    function logout() {
        purgeAuth();
    }
    function register(credentials) {
        return ApiService.post("auth/register", credentials)
            .then(({ data }) => {
            setAuth(data);
        })
            .catch(({ response }) => {
            setError(response.data.errors);
        });
    }
    function resetPassword(data) {
        return ApiService.put("/auth/rest_password_first", data)
            .then(({ data }) => {
            setError({});
            return data;
        })
            .catch(({ response }) => {
            setError(response.data.errors);
        });
    }
    function forgotPassword(email) {
        return ApiService.post("auth/forgot_password", email)
            .then(() => {
            setError({});
        })
            .catch(({ response }) => {
            setError(response.data.errors);
        });
    }
    function verifyAuth() {
        if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.post("auth/verify_token", { api_token: JwtService.getToken() })
                .then(({ data }) => {
                setAuth(data);
            })
                .catch(({ response }) => {
                setError(response.data.errors);
                purgeAuth();
            });
        }
        else {
            purgeAuth();
        }
    }
    return {
        errors,
        user,
        isAuthenticated,
        login,
        logout,
        register,
        forgotPassword,
        verifyAuth,
        resetPassword
    };
});
//# sourceMappingURL=auth.js.map