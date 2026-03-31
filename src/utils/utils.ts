import { Modal } from "bootstrap";
import ApiService from "@/services/ApiService";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import JwtService from "@/services/JwtService";


const generateUuid = ()=> {
  return uuidv4(); // Générer un UUID v4
}

const getDatePlusXDays = (x: number) => {
  const currentDate = new Date();
  const futureDate = new Date();

  futureDate.setDate(currentDate.getDate() + x);
  // Obtenez les composants de la date
  const year = futureDate.getFullYear();
  const month = (futureDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
  const day = futureDate.getDate().toString().padStart(2, '0');

  // Formattez la date comme "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }
  const myModal = Modal.getInstance(modalEl);
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  removeModalBackdrop();
  myModal?.hide();

};


const ajouterPeriode = (dateStr, x, frequence) => {
  // Convertir la date en objet Date
  let date = new Date(dateStr);

  // Vérifier la fréquence et ajouter la quantité appropriée
  switch (frequence.toLowerCase()) {
    case "jour":
    case "jours":
      date.setDate(date.getDate() + x);
      break;
    case "mois":
      date.setMonth(date.getMonth() + x);
      break;
    case "année":
    case "années":
    case "an":
    case "ans":
      date.setFullYear(date.getFullYear() + x);
      break;
    case "semaine":
    case "semaines":
      date.setDate(date.getDate() + (x * 7));
      break;
    default:
      console.error("Fréquence non reconnue : ", frequence);
      return null;
  }

  // Retourner la nouvelle date formatée en ISO (aaaa-mm-jj)
  return date.toISOString().split('T')[0];
}

const showModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }
  const myModal = new Modal(modalEl);
  myModal?.show()
};

const getUrlApiForFiles = (nomFichier: string | null, dossier = "") => {
  if (nomFichier) {
    return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/${dossier ? dossier + "/" : ""}${nomFichier}`;
  } else {
    return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/Erreur404.pdf`;
  }
}

const getUrlApiForProductFiles = (nomFichier: string | null = null) => {
  if (nomFichier != null && nomFichier != "" && nomFichier) {
    return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/${nomFichier}`;
  } else {
    return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/show1.png`;
  }
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const onFileChange = (e, accept: any = []) => {

  const file = e.target.files[0];
  const allowedTypes = accept != null ? accept : ['image/jpeg', 'image/png', 'application/pdf'];

  if (file && !allowedTypes.includes(file.type)) {
    // Vide le champ
    e.target.value = '';
    error('Fichier non valide. Veuillez sélectionner une image ou un fichier PDF.')
    return false;
  } else {
    return e.target.files[0];
  }
};
const success = (message: string, temps: number = 5000) => {
  Swal.fire({
    title: 'Succès',
    text: message,
    icon: "success",
    toast: true,
    timer: temps,
    position: 'top-right',
    showConfirmButton: false,
  });
}

const error = (message: string) => {
  Swal.fire({
    title: 'Erreur',
    text: message,
    icon: "error",
    toast: true,
    timer: 5000,
    position: 'top-right',
    showConfirmButton: false
  });
}

const format_date = (value: any) => {
  if (value) {
    return format(new Date(value), 'dd-MM-yyyy HH:mm', { locale: fr });
    //return moment(String(value)).format('DD-MM-YYYY hh:mm')
  }
}
const format_Date = (date: any) => {
  if (date) {
    return format(new Date(date), 'dd-MM-yyyy', { locale: fr });
  }
}

const separateur = (montant)=>{ 
  if(montant > 0 ){
    return montant.toLocaleString('fr-FR')+" FCFA";
  } else {
    return 0
  }
}

const removeModalBackdrop = (): void => {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};


const getAssetPath = (path: string): string => {
  return '' + path;
};

// function getAllCategorieAbonnes(route:string,element:any) {
//   return ApiService.get(`/${route}`)
//   .then(({ data }) => {
//     console.log(data);
//     element.value = data.data
//   })
//   .catch(({ response }) => {
//     console.log(response)
//   });
// } 

const optionPointVente = ():[] => {
  const pointVentes = JwtService.getPointDeVentes();
  console.log("Données reçues:", pointVentes);
  return pointVentes ? pointVentes.map((point: any) => ({
    value: point.id,
    label: point.nomPointVente
  })) : [];
};

const suppression = (id: number, element: any, route: string, entite: string) => {
  Swal.fire({
    text: "Vous êtes sur le point de supprimer " + entite + ". Etes-vous sûr ?",
    icon: "warning",
    buttonsStyling: true,
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: `Annuler`,
    heightAuto: false,
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      ApiService.delete(`/${route}/${id}`)
        .then(({ data }) => {
          Swal.fire({
            title: 'Succès',
            text: data.message,
            icon: "success",
            toast: true,
            timer: 5000,
            position: 'top-right',
            showConfirmButton: false,
          });
          for (let i = 0; i < element.length; i++) {
            if (element[i].id === id) {
              element.splice(i, 1);
            }
          }
        }).catch(({ response }) => {
          Swal.fire({
            text: response.data.message, //'Oups il y a un problème',//
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réssayer à nouveau!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });
    } else if (result.isDenied) {
      Swal.fire("La suppression n'est pas passée", "", "info");
    }
  });
};
const warning = (message: string, temps: number = 5000) => {
  Swal.fire({
    title: 'Attention',
    text: message,
    icon: "warning",
    toast: true,
    timer: temps,
    position: 'top-right',
    showConfirmButton: false,
  });
};

const monSwal = (
    question:string, 
    btnAcceptText = "Accepter", 
    btnAcceptColor = "btn btn-danger",
    btnCancelText = "Annuler",
    cancelMessage = "L'opération a été annulée"
       
  ): Promise<boolean> => {
  return Swal.fire({
      text: question,
      icon: "warning",
      buttonsStyling: true,
      showCancelButton: true,
      confirmButtonText: btnAcceptText,
      cancelButtonText: btnCancelText,
      heightAuto: false,
      customClass: {
        confirmButton: btnAcceptColor,
      },
    }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          if (result.isDismissed) {
            Swal.fire(cancelMessage, "", "info");
          }
          return false;
        }
    });
};



const supRowElement = (id: number, element: any, route: string, entite: string) => {
  Swal.fire({
    text: "Vous êtes sur le point de supprimer " + entite + ". Etes-vous sûr ?",
    icon: "warning",
    buttonsStyling: true,
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: `Annuler`,
    heightAuto: false,
    customClass: {
      confirmButton: "btn btn-danger",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      ApiService.delete(`/${route}/${id}`)
        .then(({ data }) => {
          Swal.fire({
            title: 'Succès',
            text: data.message,
            icon: "success",
            toast: true,
            timer: 5000,
            position: 'top-right',
            showConfirmButton: false,
          });
          for (let i = 0; i < element.length; i++) {
            if (element[i].id === id) {
              element.splice(i, 1);
            }
          }
        }).catch(({ response }) => {
          Swal.fire({
            text: response.data.message, //'Oups il y a un problème',//
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réssayer à nouveau!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });
    } else if (result.isDenied) {
      Swal.fire("La suppression n'est pas passée", "", "info");
    }
  });
};

export {
  optionPointVente,
  getCurrentDateTime,getDatePlusXDays,generateUuid,getUrlApiForProductFiles, ajouterPeriode, onFileChange, removeModalBackdrop, suppression, separateur, hideModal, getAssetPath, format_Date, showModal, format_date, success, error,warning,monSwal,getUrlApiForFiles,
};

