// src/plugins/tokenVerifier.ts
import router from '@/router';
import ApiService from '@/services/ApiService';
import { useAuthStore } from '@/services/auth';
import JwtService from '@/services/JwtService';
import { error } from '@/utils/utils';
import { App } from 'vue';

interface TokenVerifierOptions {
  interval?: number;
}

export default {
  install(app: App, options: TokenVerifierOptions = { interval: 30000 }) {
    let intervalId: number | null = null;

    const startTokenVerification = () => {
      stopTokenVerification(); // S'assure qu'aucun intervalle précédent ne tourne
      intervalId = window.setInterval(verifyAuth, options.interval);
    };

    const stopTokenVerification = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // const checkTokenValidity = async () => {
    //   const token = localStorage.getItem('token'); // Ou utilisez un autre moyen de stockage
    //   if (!token) {
    //     handleInvalidToken();
    //     return;
    //   }
    //   try {
    //     const response = await fetch('/auth/verify_token', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ api_token: JwtService.getToken() }),
    //     });
    //     const data = await response.json();
    //     if (!data.valid) {
    //       handleInvalidToken();
    //     }
    //   } catch (error) {
    //     console.error('Erreur lors de la vérification du token :', error);
    //     handleInvalidToken();
    //   }
    // };

    const authStore = useAuthStore();

    function verifyAuth() {
        if (JwtService.getToken()) {
          console.log("On est dans le verifyAuth");
          ApiService.post("auth/verify_token", { api_token: JwtService.getToken() })
            .then(({ data }) => {
              //setAuth(data);
              console.log("On est dans le then");
            })
            .catch(({ response }) => {
              console.log("On est dans le catch");
              console.log(response.data);
              stopTokenVerification();
              authStore.purgeAuth();
              error(response.data.message);
              router.push({ name: 'login'});
            });
        } else {
            stopTokenVerification();
            authStore.purgeAuth();
        }
      }

    // const handleInvalidToken = () => {
    //   stopTokenVerification();
    //   // Implémentez ici la logique pour gérer un token invalide, par exemple :
    //   // - Rediriger vers la page de connexion
    //   // - Afficher une notification à l'utilisateur
    // };

    // Ajouter les méthodes au contexte global de l'application
    app.config.globalProperties.$startTokenVerification = startTokenVerification;
    app.config.globalProperties.$stopTokenVerification = stopTokenVerification;
  },
};
