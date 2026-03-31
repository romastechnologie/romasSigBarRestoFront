import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import { arrow } from "@popperjs/core";
import { addres } from "@/core/data/ecommerce";
import {  useRouter } from 'vue-router';
import { error } from "@/utils/utils";
import router from "@/router";

/*export interface User {
  nom?: string;
  prenoms?: string;
  email: string;
  password: string;
  telephone?: string;
  api_token?: string;
}*/

export interface Reposes {
  code: number;
  message: string;
  data: Data;
}
export interface Data {
  user: User;
  token: string;
  refreshToken: string;
}

// export interface User {
//   id: number;
//   nomComplet: string;
//   telephone: string;
//   sexe: string;
//   email: string;
//   password: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt?: any;
// }

export interface User {
  id: number
  nom: string
  prenom: string
  telephone: string
  sexe: string
  email: string
  firstConnectDate: string,
  createdAt: string
  updatedAt: string
  role: Role
  userpointventes: Userpointvente[]
  userRoles: UserRole[];
}

export interface PointDeVente {
  id: number
  nomPointVente: string
  adresse: string
  code?: string
}

export interface UserRole {
  role: Role;
  roleId: number;
}
export interface Userpointvente {
  id: number;
  pointvente: PointDeVente;
}

export interface Role {
  id: number
  nom: string
  description: string
  rolePermissions: RolePermission[]
}

export interface RolePermission {
  id: number
  permission?: Permission
}

export interface Permission {
  id: number
  nom: string
  description: string
}


export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());
  const caisseOuverte = ref<any>(null);


  
  function setCaisseOuverte(caisse: any) {
    caisseOuverte.value = caisse;
    localStorage.setItem('caisseOuverte', JSON.stringify(caisse));

  }

  function clearCaisseOuverte() {
    caisseOuverte.value = null;
    localStorage.removeItem('caisseOuverte');
  }


  function loadCaisseFromStorage() {
    const stored = localStorage.getItem('caisseOuverte');
    if(stored){
      try {
        caisseOuverte.value = JSON.parse(stored);
      } catch (e) {
        console.error('Erreur lors du chargement des caisses:' , e);
        localStorage.removeItem('caisseOuverte');
      }
    }
  }

  function getCaisseId() {
    return caisseOuverte.value?.caisse?.id || null;
  }

  function isCaisseOuverte() {
    return !!caisseOuverte.value;
  }


  function setAuth(authUser: Data) {
    if (authUser.user.firstConnectDate != null)
       {
      isAuthenticated.value = true;
      user.value = authUser.user;
      errors.value = {};
      formatRole(authUser.user)
      formatPrivilege(authUser.user)
      formatPointVent(authUser.user)
      JwtService.saveUser(user.value.id.toString());
      JwtService.saveToken(authUser.token);
      JwtService.saveUserName(authUser.user.nom);
      JwtService.saveUserLastName(authUser.user.prenom);
      JwtService.saveUserLastName(authUser.user.prenom);
      JwtService.saveUserPhone(authUser.user.telephone);
      JwtService.setUserEmail(authUser.user.email);
      JwtService.saveUserFirstConnectDate(authUser.user.firstConnectDate);
    } else {
      JwtService.saveUserLastName(authUser.user.prenom);
      JwtService.saveUserLastName(authUser.user.prenom);
    }

  }

  function formatPrivilege(user: User) {
    const privile = ref<Array<string>>([]);

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

  function formatRole(user: User) {
    const rol = ref<Array<string>>([]);

    if (user && user.userRoles) {
      user.userRoles.forEach(element => {
        if (element.role != null) {
          rol.value.push(element.role.nom);
        }
      });

      JwtService.saveRole(JSON.stringify(rol.value));
    }
  }

  function formatPointVent(user: User) {
    const point = ref<Array<PointDeVente>>([]);
    if (user && user.userpointventes) {
      user.userpointventes.forEach(element => {
        if (element.pointvente != null) {
          point.value.push({id:element.pointvente.id, nomPointVente: element.pointvente.nomPointVente,adresse: element.pointvente.adresse,code: element.pointvente.code} as PointDeVente);
        }
      });
      JwtService.savePointDeVente(point.value[0].nomPointVente);
      JwtService.savePointDeVenteId(point.value[0].id.toString());
      JwtService.savePointDeVentes(JSON.stringify(point.value));
    }
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
    JwtService.destroyUserPrivilege();
    JwtService.destroyPointVente();
    JwtService.destroyPointVenteId();
  }

  function login(credentials: User) {
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

  function register(credentials: User) {
    return ApiService.post("auth/register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function resetPassword(data: any) {
    return ApiService.put("/auth/rest_password_first", data)
      .then(({ data }) => {
        setError({});
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("auth/forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  /*function verifyAuth() {
    console.log("On est dans le verifyAuth");
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("auth/verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          //setAuth(data);
        })
        .catch(({ response }) => {
          console.log("On est dans le catch");
          console.log(response.data);
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }*/
  function verifyAuth() {
    if (JwtService.getToken()) {
      console.log("On est dans le verifyAuth");
      ApiService.setHeader();
      ApiService.post("/auth/verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          console.log("On est dans le then");
          //setAuth(data);
        })
        .catch(({ response }) => {
          console.log("On est dans le catch");
          console.log(response);
          error(response.data.message);
          setError(response.data.errors);
          purgeAuth();
          router.push({ name: 'login'});
        });
    } else {
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
    resetPassword,
    purgeAuth,
    caisseOuverte,
    setCaisseOuverte,
    clearCaisseOuverte,
    loadCaisseFromStorage,
    getCaisseId,
    isCaisseOuverte
  };
});