import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BodyView from "@/layout/BodyView.vue"
import AuthView from "@/components/common/block/auth/AuthView.vue"
import ResetPasswordFirstPage from "@/components/common/block/auth/ResetPasswordFirstPage.vue"
import LoginPage from "@/components/common/block/auth/LoginPage.vue"
import indexDefault from "@/pages/dashbords/indexDefault.vue"
import indexProject from "@/pages/dashbords/indexProject.vue"
import loginSimple from "@/pages/authentication/loginSimple.vue"
import loginImage from "@/pages/authentication/loginImage.vue"
import loginImageTwo from "@/pages/authentication/loginImageTwo.vue"
import loginValidation from "@/pages/authentication/loginValidation.vue"
import loginTooltip from "@/pages/authentication/loginTooltip.vue"
import loginSweetalert from "@/pages/authentication/loginSweetalert.vue"
import registerSimple from "@/pages/authentication/registerSimple.vue"
import registerImage from "@/pages/authentication/registerImage.vue"
import registerImageTwo from "@/pages/authentication/registerImageTwo.vue"
import unlockUser from "@/pages/authentication/unlockUser.vue"
import forgetPassword from "@/pages/authentication/forgetPassword.vue"
import resetPassword from "@/pages/authentication/resetPassword.vue"
import maintenanceView from "@/pages/authentication/maintenanceView.vue"
import AddPermissionPage from "@/pages/Permission/AddPermissionPage.vue";
import ListePermissionPage from "@/pages/Permission/ListePermissionPage.vue";
import ListeConditionnementPage from "@/pages/GesCom/Conditionnement/ListeConditionnementPage.vue"



import AddRolePage from "@/pages/Role/AddRolePage.vue";
import ListeRolePage from "@/pages/Role/ListeRolePage.vue";
import EditRolePage from "@/pages/Role/EditRolePage.vue";
import ViewRolePage from "@/pages/Role/ViewRolePage.vue";
import AddUserPage from '@/pages/Users/AddUserPage.vue';
import ListeUserPage from "@/pages/Users/ListeUserPage.vue";
import EditUserPage from "@/pages/Users/EditUserPage.vue";
import EditProfilePage from "@/pages/Users/EditProfilePage.vue";
import ViewUserPage from "@/pages/Users/ViewUserPage.vue";
import TableauBordPage from "@/pages/dashbords/TableauBordPage.vue"

//Gescom
//import ListeFamillePage from "@/pages/GesCom/Familles/ListeFamillePage.vue";
import AddProduitPage from "@/pages/GesCom/Produit/AddProduitPage.vue";
import EditProduitPage from "@/pages/GesCom/Produit/EditProduitPage.vue";
import DupliquerProduitPage from "@/pages/GesCom/Produit/DupliquerProduitPage.vue";
import ListeProduitPage from "@/pages/GesCom/Produit/ListeProduitPage.vue";
import ViewProduitPage from "@/pages/GesCom/Produit/ViewProduitPage.vue";
import ListeMagasinPage from "@/pages/GesCom/Magasin/ListeMagasinPage.vue";

import AddPointVentePage from "@/pages/GesCom/PointVente/AddPointVentePage.vue";
import EditPointVentePage from "@/pages/GesCom/PointVente/EditPointVentePage.vue";
import ListePointVentePage from "@/pages/GesCom/PointVente/ListePointVentePage.vue";
// import ListeRapportInventairePage from '@/pages/GesCom/Inventaire/ListeRapportInventairePage.vue';


//Etats



import ApiService from '@/services/ApiService';

//Fin GesCom/

import { useAuthStore } from "@/services/auth";
import AddClientPage from '@/pages/GesCom/Client/AddClientPage.vue'
import EditClientPage from '@/pages/GesCom/Client/EditClientPage.vue'
import ViewClientPage from '@/pages/GesCom/Client/ViewClientPage.vue'
import ListeClientPage from '@/pages/GesCom/Client/ListeClientPage.vue'
import ListeChampsLibreFamillePage from '@/pages/ChampsLibre/ListeChampsLibreFamillePage.vue'
import EditChampsLibreFamillePage from '@/pages/ChampsLibre/EditChampsLibreFamillePage.vue'
import AddChampsLibreFamillePage from '@/pages/ChampsLibre/AddChampsLibreFamillePage.vue'
import ListeChampsLibrePage from '@/pages/ChampsLibre/ListeChampsLibrePage.vue'
import EditChampsLibrePage from '@/pages/ChampsLibre/EditChampsLibrePage.vue'
import AddChampsLibrePage from '@/pages/ChampsLibre/AddChampsLibrePage.vue'
import ListeGroupeTaxePage from '@/pages/GesCom/GroupeTaxe/ListeGroupeTaxePage.vue'
import ListeTypeTaxePage from '@/pages/GesCom/TypeTaxe/ListeTypeTaxePage.vue'
import ListeTaxePage from '@/pages/GesCom/Taxe/ListeTaxePage.vue'
import AddProduitConditionnementPage from '@/pages/GesCom/Produit/AddProduitConditionnementPage.vue'
import ListeReglementPage from '@/pages/GesCom/Reglement/ListeReglementPage.vue'
import AddReglementPage from '@/pages/GesCom/Reglement/AddReglementPage.vue'
//import ListeClientPage from '@/pages/GesCom/Client/ListeClientPage.vue'
import AddModeReglementModal from '@/components/GesCom/ModeReglement/AddModeReglementModal.vue'
import ListeModeReglement from '@/components/GesCom/ModeReglement/ListeModeReglement.vue'
import AddTransactionPage from '@/pages/GesCom/Transaction/AddTransactionPage.vue'
import EditTransactionPage from '@/pages/GesCom/Transaction/EditTransactionPage.vue'
import ViewTransactionPage from '@/pages/GesCom/Transaction/ViewTransactionPage.vue'

import ListeDomaineActivitePage from '@/pages/GesCom/DomaineActivite/ListeDomaineActivitePage.vue'
import ClientsTransactionPage from '@/pages/GesCom/Client/ClientsTransactionPage.vue'
import AddMagasinPage from '@/pages/GesCom/Magasin/AddMagasinPage.vue'
import EditMagasinPage from '@/pages/GesCom/Magasin/EditMagasinPage.vue'
import ListeMesClientsPage from '@/pages/GesCom/MesClients/ListeMesClientsPage.vue'
import AddVentePage from '@/pages/GesCom/Vente/AddVentePage.vue'
import TransformerProformaPage from '@/pages/GesCom/Vente/TransformerProformaPage.vue'
import ListeVentePage from '@/pages/GesCom/Vente/ListeVentePage.vue'
import ViewVentePage from '@/pages/GesCom/Vente/ViewVentePage.vue'
import EtatProduitsDisponibles from '@/pages/GesCom/Etats/EtatProduitsDisponibles.vue'
import EtatPointProduitLivraisonPage from '@/pages/GesCom/Etats/EtatPointProduitLivraisonPage.vue'
import EtatNombreProduitVenduPage from '@/pages/GesCom/Etats/EtatNombreProduitVenduPage.vue'
import EtatChiffreAffaireClientPage from '@/pages/GesCom/Etats/EtatChiffreAffaireClientPage.vue'
import EtatPointVentePage from '@/pages/GesCom/Etats/EtatPointVentePage.vue'
import EtatProduitsRupturePage from '@/pages/GesCom/Etats/EtatProduitsRupturePage.vue'
import EtatPointCommandePage from '@/pages/GesCom/Etats/EtatPointCommandePage.vue'
import EtatProduitsEntreePage from '@/pages/GesCom/Etats/EtatProduitsEntreePage.vue'
import EtatProduitsSortiesPage from '@/pages/GesCom/Etats/EtatProduitsSortiesPage.vue'
import AddDetachementPage from '@/pages/GesCom/Detachement/AddDetachementPage.vue'
import ListeDetachementPage from '@/pages/GesCom/Detachement/ListeDetachementPage.vue'
import ViewDetachementPage from '@/pages/GesCom/Detachement/ViewDetachementPage.vue'
import AddSortiePage from '@/pages/GesCom/Sortie/AddSortiePage.vue'
import EditSortiePage from '@/pages/GesCom/Sortie/EditSortiePage.vue'
import ListeSortiePage from '@/pages/GesCom/Sortie/ListeSortiePage.vue'
import ViewSortiePage from '@/pages/GesCom/Sortie/ViewSortiePage.vue'
import AddTransfertMagPage from '@/pages/GesCom/Transfert/AddTransfertMagPage.vue'
import AddTransfertPointVentePage from '@/pages/GesCom/Transfert/AddTransfertPointVentePage.vue'
import ListeTransfertPage from '@/pages/GesCom/Transfert/ListeTransfertPage.vue'
import ListeTransfertMagasinPage from '@/pages/GesCom/Transfert/ListeTransfertMagasinPage.vue'
import ViewTransfertMagasinPage from '@/pages/GesCom/Transfert/ViewTransfertMagasinPage.vue'
import ViewTransfertPage from '@/pages/GesCom/Transfert/ViewTransfertPage.vue'
import AddApprovisionnementPage from '@/pages/GesCom/Approvisionnement/AddApprovisionnementPage.vue'
import ListeApprovisionnementPage from '@/pages/GesCom/Approvisionnement/ListeApprovisionnementPage.vue'
import ViewApprovisionnementPage from '@/pages/GesCom/Approvisionnement/ViewApprovisionnementPage.vue'
import AddCaissePage from '@/pages/GesCom/Caisse/AddCaissePage.vue'
import AddFermPage from '@/pages/GesCom/OuvFerm/AddFermPage.vue'
import AddOuvFermPage from '@/pages/GesCom/OuvFerm/AddOuvFermPage.vue'
import ListeCaissePage from '@/pages/GesCom/Caisse/ListeCaissePage.vue'
import ViewOuvFermPage from '@/pages/GesCom/OuvFerm/ViewOuvFermPage.vue'
import ListeOuvFermPage from '@/pages/GesCom/OuvFerm/ListeOuvFermPage.vue'
import ListeFacturePage from '@/pages/GesCom/Facture/ListeFacturePage.vue'
import ListeFactureProformaPage from '@/pages/GesCom/FactureProforma/ListeFactureProformaPage.vue'
import HistoriquePrixProduitPage from '@/pages/GesCom/Produit/HistoriquePrixProduitPage.vue'
import ListePrixProduitCondTypeClientPage from '@/pages/GesCom/PrixProduitCondTypeClient/ListePrixProduitCondTypeClientPage.vue'
import AddPrixProduitCondTypeClientPage2 from '@/pages/GesCom/PrixProduitCondTypeClient/AddPrixProduitCondTypeClientPage2.vue'
import AddPrixProduitCondTypeClientPage from '@/pages/GesCom/PrixProduitCondTypeClient/AddPrixProduitCondTypeClientPage.vue'
import EditSocietePage from '@/pages/GesCom/Societe/EditSocietePage.vue'
import ListeSocietePage from '@/pages/GesCom/Societe/ListeSocietePage.vue'
import ViewSocietePage from '@/pages/GesCom/Societe/ViewSocietePage.vue'
import AddSocietePage from '@/pages/GesCom/Societe/AddSocietePage.vue'
import AddPersonnellePage from '@/pages/GesCom/Personnel/AddPersonnellePage.vue'
import ListePersonnellePage from '@/pages/GesCom/Personnel/ListePersonnellePage.vue'
import ViewPersonnellePage from '@/pages/GesCom/Personnel/ViewPersonnellePage.vue'
import EditPersonnellePage from '@/pages/GesCom/Personnel/EditPersonnellePage.vue'
import EditPersonnellePage2 from '@/pages/GesCom/Personnel/EditPersonnellePage2.vue'
import AddModeleSignatairePage from '@/pages/GesCom/ModeleSignataire/AddModeleSignatairePage.vue'
import ListeModeleSignatairePage from '@/pages/GesCom/ModeleSignataire/ListeModeleSignatairePage.vue'
import ListFonctionPage from '@/pages/GesCom/Fonction/ListFonctionPage.vue'
import AddFonctionPage from '@/pages/GesCom/Fonction/AddFonctionPage.vue'
import ConfirmationPaiementPage from '@/pages/GesCom/OuvFerm/ConfirmationPaiementPage.vue'
import ListeTablePage from '@/pages/GesCom/Table/ListeTablePage.vue'
import AddTablePage from '@/pages/GesCom/Table/AddTablePage.vue'
import ListeCategorieProduitPage from '@/pages/GesCom/CategorieProduit/ListeCategorieProduitPage.vue'
import AddMetPage from '@/pages/GesCom/Met/AddMetPage.vue'
import EditMetPage from '@/pages/GesCom/Met/EditMetPage.vue'
import ListeMetPage from '@/pages/GesCom/Met/ListeMetPage.vue'
import ViewMetPage from '@/pages/GesCom/Met/ViewMetPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BodyView,
    meta: {
      title: 'Romas progiciel',
    },
    children: [
      {
        path: '',
        name: 'TableauBord',
        component: TableauBordPage,
        meta: {
          title: 'Romas progiciel',
        }
      }
    ]
  },
  {
    path: "/accueil",
    component: BodyView,
    children: [
      {
        path: "tableau-bord",
        name: "TableauBord",
        component: TableauBordPage,
        meta: {
          title: 'Tableau de bord',
        }
      },
    ]
  },

  {
    path: "/utilisateurs",
    component: BodyView,
    children: [
      {
        path: "ajouter-utilisateur",
        name: "AddUser",
        component: AddUserPage,
        meta: {
          title: 'Ajouter un utilisateur',
        }
      },
      {
        path: "liste-utilisateur",
        name: "ListeUser",
        component: ListeUserPage,
        meta: {
          title: 'Liste des utilisateurs',
        }
      },
      {
        path: "edit-utilisateur/:id",
        name: "EditUser",
        component: EditUserPage,
        meta: {
          title: 'Modifier un utilisateur',
        }
      },
      {
        path: "view-utilisateur/:id",
        name: "ViewUser",
        component: ViewUserPage,
        meta: {
          title: 'Détails d\'un utilisateur',
        }
      },
    ]
  },
  {
    path: "",
    component: BodyView,
    children: [
      {
        path: "profile",
        name: "EditProfile",
        component: EditProfilePage,
        meta: {
          title: 'Modifier mon profile',
        }
      }
    ]
  },
  {
    path: "/clients",
    component: BodyView,
    children: [
      {
        path: "ajouter-client",
        name: "AddClient",
        component: AddClientPage,
        meta: {
          title: 'Ajouter un client',
        }
      },
      {
        path: "modifier-client/:id",
        name: "EditClient",
        component: EditClientPage,
        meta: {
          title: 'Modifier un client',
        }
      },
      {
        path: "liste-clients",
        name: "ListeClient",
        component: ListeClientPage,
        meta: {
          title: 'Liste des clients',
        }
      },
      {
        path: "view-client/:id",
        name: "ViewClient",
        component: ViewClientPage,
        meta: {
          title: 'Détails d\'un client',
        }
      },
     
      {
        path: "transactions/clients/:id",
        name: "ClientsTransaction",
        component: ClientsTransactionPage,
        meta: {
          title: 'Les transactions d\'un client',
        }
      },
    ]
  },
 
  {
    path: "/prixproduits",
    component: BodyView,
    children: [
      {
        path: "ajout-prixproduits",
        name: "AjoutPrixProduitCondTypeClients",
        component: AddPrixProduitCondTypeClientPage,
        meta: {
          title: 'Ajout des prix produits',
        }
      },
      {
        path: "ajout-prix",
        name: "AddPrixProduitCondTypeClients2",
        component: AddPrixProduitCondTypeClientPage2,
        meta: {
          title: 'Ajouter des prix par categorieclient',
        }
      },
      {
        path: "liste-prixproduits",
        name: "ListePrixProduitCondtionnementTypeClients",
        component: ListePrixProduitCondTypeClientPage,
        meta: {
          title: 'Liste des prix produits',
        }
      },
    ]
  },

  {
    path: "/champsLibres",
    component: BodyView,
    children: [
      {
        path: "/champsLibres/ajouter-champsLibre",
        name: "AddChampsLibre",
        component: AddChampsLibrePage,
        meta: {
          title: 'Ajouter un champs descriptif',
        }
      },
      {
        path: "/champsLibres/editer-champsLibre/:id",
        name: "EditChampsLibre",
        component: EditChampsLibrePage,
        meta: {
          title: 'Editer un champs descriptif',
        }
      },
      {
        path: "/champsLibres/liste-champsLibre",
        name: "ListeChampsLibre",
        component: ListeChampsLibrePage,
        meta: {
          title: 'Liste des champs descriptifs',
        }
      },

      {
        path: "/champsLibreFamille/ajouter-champsLibreFamille",
        name: "AddChampsLibreFamille",
        component: AddChampsLibreFamillePage,
        meta: {
          title: 'Affecter un champ',
        }
      },
      {
        path: "/champsLibreFamille/editer-champsLibreFamille/:id",
        name: "EditChampsLibreFamille",
        component: EditChampsLibreFamillePage,
        meta: {
          title: 'Editer des champs affectés',
        }
      },

      {
        path: "/champsLibreFamille/liste-champsLibreFamille",
        name: "ListeChampsLibreFamille",
        component: ListeChampsLibreFamillePage,
        meta: {
          title: 'Liste des champs affectés',
        }
      },
    ]
  },



  {
    path: "/mesclients",
    component: BodyView,
    children: [

      {
        path: "/mesclients/liste-mesclients",
        name: "ListeMesClients",
        component: ListeMesClientsPage,
        meta: {
          title: 'Liste de mes clients',
        }
      },
    ]
  },


  {
    path: "/transactions",
    component: BodyView,
    children: [
      {
        path: "ajouter-transaction",
        name: "AddTransaction",
        component: AddTransactionPage,
        meta: {
          title: 'Ajouter une transaction',
        }
      },
      {
        path: "modifier-transaction/:id",
        name: "EditTransaction",
        component: EditTransactionPage,
        meta: {
          title: 'Modifier une transaction',
        }
      },
      {
        path: "view-transaction/:id",
        name: "ViewTransaction",
        component: ViewTransactionPage,
        meta: {
          title: 'Détails de la transaction',
        }
      },
    ]
  },

  {
    path: "/domaines",
    component: BodyView,
    children: [
      {
        path: "liste-domaines",
        name: "ListeDomaineActivite",
        component: ListeDomaineActivitePage,
        meta: {
          title: 'Liste des domaines d\'activités',
        }
      },
    ]
  },
  {
    path: "/permissions",
    component: BodyView,
    children: [
      {
        path: "ajouter-permission",
        name: "AddPermissionPage",
        component: AddPermissionPage,
        meta: {
          title: 'Ajouter une permission',
        }
      },
      {
        path: "liste-permission",
        name: "ListePermissionPage",
        component: ListePermissionPage,
        meta: {
          title: 'Liste des permissions',
        }
      }
    ]
  },



  {
    path: "/roles",
    component: BodyView,
    children: [
      {
        path: "ajouter-role",
        name: "AddRolePage",
        component: AddRolePage,
        meta: {
          title: 'Ajouter un role',
        }
      },
      {
        path: "liste-role",
        name: "ListeRolePage",
        component: ListeRolePage,
        meta: {
          title: 'Liste des rôles',
        }
      },
      {
        path: "edit-role/:id",
        name: "EditRolePage",
        component: EditRolePage,
        meta: {
          title: 'Modifier un rôle',
        }
      },
      {
        path: "view-role/:id",
        name: "ViewRolePage",
        component: ViewRolePage,
        meta: {
          title: 'Détails du rôle',
        }
      }
    ]
  },
  // {
  //   path: "/familles",
  //   component: BodyView,
  //   children: [
  //     {
  //       path: "liste-familles",
  //       name: "ListeFamille",
  //       component: ListeFamillePage,
  //       meta: {
  //         title: 'Liste des familles',
  //       }
  //     },
  //   ]
  // },
  {
    path: "/produits",
    component: BodyView,
    children: [
      {
        path: "ajouter-produit",
        name: "AddProduit",
        component: AddProduitPage,
        meta: {
          title: 'Ajouter un produit',
        }
      },
      {
        path: "modifier-produit/:id",
        name: "EditProduit",
        component: EditProduitPage,
        meta: {
          title: 'Modifier un produit',
        }
      },
      {
        path: "dupliquer-produit/:id",
        name: "DupliquerProduit",
        component: DupliquerProduitPage,
        meta: {
          title: 'Dupliquer un produit',
        }
      },
      {
        path: "view-produit/:id",
        name: "ViewProduit",
        component: ViewProduitPage,
        meta: {
          title: 'Détails d\'un produit',
        }
      },
      {
        path: "liste-produits",
        name: "ListeProduit",
        component: ListeProduitPage,
        meta: {
          title: 'Liste des produits',
        }
      },
      {
        path: '/produits/conditionnement/:id',
        name: 'AddProduitConditionnement',
        component: AddProduitConditionnementPage
      },
        {
        path: "historique-prix/:id",
        name: "HistoriquePrixProduitPage",
        component: HistoriquePrixProduitPage,
      },
    ]
  },
  {
    path: "/magasins",
    component: BodyView,
    children: [
      {
        path: "liste-magasins",
        name: "ListeMagasin",
        component: ListeMagasinPage,
        meta: {
          title: 'Liste des magasins',
        }
      },
      {
        path: "ajouter-magasin",
        name: "AddMagasin",
        component: AddMagasinPage,
        meta: {
          title: 'Ajouter un magasin',
        }
      },
      {
        path: "modifier-magasin/:id",
        name: "EditMagasin",
        component: EditMagasinPage,
        meta: {
          title: 'Modifier un magasin',
        }
      },
    ]
  },

  {
    path: "/reglements",
    component: BodyView,
    children: [
      {
        path: "ajouter-reglement",
        name: "AddReglement",
        component: AddReglementPage,
        meta: {
          title: 'Ajouter un règlement',
        }
      },

      {
        path: "liste-reglements",
        name: "ListeReglement",
        component: ListeReglementPage,
        meta: {
          title: 'Liste des règlements',
        }
      },
    ]
  },

  {
    path: "/mode-reglements",
    component: BodyView,
    children: [
      {
        path: "liste-mode-reglements",
        name: "ListeModeReglement",
        component: ListeModeReglement,
        meta: {
          title: 'Liste des modes de règlement'
        }
      },
      {
        path: "add-mode-reglement",
        name: "AddModeReglement",
        component: AddModeReglementModal,
        meta: {
          title: 'Ajouter un mode de règlement'
        }
      },
    ]
  },
  
{
    path: "/tables",
    component: BodyView,
    children: [
      {
        path: "liste-tables",
        name: "ListeTable",
        component: ListeTablePage,
        meta: {
          title: 'Liste des tables'
        }
      },
      {
        path: "add-table",
        name: "AddTable",
        component: AddTablePage,
        meta: {
          title: 'Ajouter une table'
        }
      },
    ]
  },
  {
    path: "/mets",
    component: BodyView,
    children: [
      {
        path: "ajouter-met",
        name: "AddMet",
        component: AddMetPage,
        meta: {
          title: 'Ajouter un met',
        }
      },
      {
        path: "modifier-met/:id",
        name: "EditMet",
        component: EditMetPage,
        meta: {
          title: 'Modifier un met',
        }
      },
      
      {
        path: "view-met/:id",
        name: "ViewMet",
        component: ViewMetPage,
        meta: {
          title: 'Détails d\'un met',
        }
      },
      {
        path: "liste-mets",
        name: "ListeMet",
        component: ListeMetPage,
        meta: {
          title: 'Liste des mets',
        }
      }
        
    ]
  },

  {
    path: "/fonctions",
    component: BodyView,
    children: [
      {
        path: "liste-fonctions",
        name: "ListFonction",
        component: ListFonctionPage,
        meta: {
          title: 'Liste des fonctions'
        }
      },
      {
        path: "add-fonction",
        name: "AddFonction",
        component: AddFonctionPage,
        meta: {
          title: 'Ajouter une fonction'
        }
      },
    ]
  },

  {
    path: "/ventes",
    component: BodyView,
    children: [
      {
        path: "ajouter-vente",
        name: "AddVente",
        component: AddVentePage,
        meta: {
          title: 'Ajouter une vente',
        }
      },

      {
        path: "transformer-proforma/:id",
        name: "TransformerProforma",
        component: TransformerProformaPage,
        meta: {
          title: 'Transformer une facture proforma',
        }
      },
      {
        path: "liste-ventes",
        name: "ListeVente",
        component: ListeVentePage,
        meta: {
          title: 'Liste des ventes',
        }
      },
      {
        path: "view-Vente/:id",
        name: "ViewVente",
        component: ViewVentePage,
        meta: {
          title: 'Détails d\'une vente',
        }
      },

    ]
  },

  {
    path: "/etats",
    component: BodyView,
    children: [
      {
        path: "produits-disponibles",
        name: "EtatProduitsDisponibles",
        component: EtatProduitsDisponibles,
        meta: {
          title: 'Stock du produit',
        }
      },
      {
        path: "produits-livres",
        name: "EtatPointProduitLivraisonPage",
        component: EtatPointProduitLivraisonPage,
        meta: {
          title: 'Liste des produits livrés par période',
        }
      },
      {
        path: "etat-nmbre-pro",
        name: "EtatNombreProduitVenduPage",
        component: EtatNombreProduitVenduPage,
        meta: {
          title: 'Produits vendus par période',
        }
      },
      {
        path: "ca-client",
        name: "EtatChiffreAffaireClientPage",
        component: EtatChiffreAffaireClientPage,
        meta: {
          title: `Chiffre d'affaire par client`,
        }
      },
      {
        path: "produits-vendus",
        name: "EtatPointVentePage",
        component: EtatPointVentePage,
        meta: {
          title: 'Liste des produits vendus',
        }
      },
      {
        path: "produits-rupture",
        name: "EtatProduitsRupturePage",
        component: EtatProduitsRupturePage,
        meta: {
          title: 'Liste des produits en rupture de stock',
        }
      },
      {
        path: "point-commande",
        name: "EtatPointCommandePage",
        component: EtatPointCommandePage,
        meta: {
          title: 'Liste du point des commandes',
        }
      },
      {
        path: "etat-produits-entree",
        name: "EtatProduitsEntreePage",
        component: EtatProduitsEntreePage,
        meta: {
          title: 'Liste des produits entrées',
        }
      },
      {
        path: "etats-produits-sorties",
        name: "EtatProduitsSortiesPage",
        component: EtatProduitsSortiesPage,
        meta: {
          title: 'Liste des produits sorties',
        }
      },
    ]
  },

  {
    path: "/detachements",
    component: BodyView,
    children: [
      {
        path: "ajouter-detachement",
        name: "AddDetachement",
        component: AddDetachementPage,
        meta: {
          title: 'Ajouter un detachement',
        }
      },
 
      {
        path: "liste-detachements",
        name: "ListeDetachement",
        component: ListeDetachementPage,
        meta: {
          title: 'Liste des détachements',
        }
      },
      {
        path: "view-Detachement/:id",
        name: "ViewDetachement",
        component: ViewDetachementPage,
        meta: {
          title: 'Détails d\'un détachement',
        }
      },
    ]
  },
   {
    path: "/categoriesProduits",
    component: BodyView,
    children: [
      {
        path: "liste-categoriesProduits",
        name: "ListeCategorieProduit",
        component: ListeCategorieProduitPage,
        meta: {
          title: 'Liste des catégories',
        }
      },
    ]
  },


  {
    path: "/sorties",
    component: BodyView,
    children: [
      {
        path: "ajouter-sortie",
        name: "AddSortie",
        component: AddSortiePage,
        meta: {
          title: 'Ajouter une sortie',
        }
      },
      {
        path: "modifier-sortie/:id",
        name: "EditSortie",
        component: EditSortiePage,
        meta: {
          title: 'Modifier une sortie',
        }
      },
      {
        path: "liste-sorties",
        name: "ListeSortie",
        component: ListeSortiePage,
        meta: {
          title: 'Liste des sorties',
        }
      },
      {
        path: "view-sortie/:id",
        name: "ViewSortie",
        component: ViewSortiePage,
        meta: {
          title: 'Détails d\'une sortie',
        }
      },
    ]
  },

  {
    path: "/transferts",
    component: BodyView,
    children: [
      {
        path: "ajouter-transfertMag",
        name: "AddTransfert",
        component: AddTransfertMagPage,
        meta: {
          title: 'Ajouter un transfert par magasin',
        }
      },
      {
        path: "ajouter-transfertPointDeVente",
        name: "AddTransfertPointVentePage",
        component: AddTransfertPointVentePage,
        meta: {
          title: 'Ajouter un transfert par point de vente',
        }
      },

      {
        path: "liste-transferts",
        name: "ListeTransfert",
        component: ListeTransfertPage,
        meta: {
          title: 'Liste des transfert',
        }
      },
      {
        path: "liste-transfertMag",
        name: "ListeTransfertMagasin",
        component: ListeTransfertMagasinPage,
        meta: {
          title: 'Liste des transfert Par Magasin',
        }
      },
      {
        path: "view-transfertMag/:id",
        name: "ViewTransfertMagasin",
        component: ViewTransfertMagasinPage,
        meta: {
          title: 'Détails d’un transfert interne de magasin',
        }
      },
      {
        path: "view-transfert/:id",
        name: "ViewTransfert",
        component: ViewTransfertPage,
        meta: {
          title: 'Détails d\'un transfert par point de vente',
        }
      },
    ]
  },



  {
    path: "/approvisionnements",
    component: BodyView,
    children: [
      {
        path: "ajouter-approvisionnement",
        name: "AddApprovisionnement",
        component: AddApprovisionnementPage,
        meta: {
          title: 'Ajouter un approvisionnement',
        }
      },
      {
        path: "liste-approvisionnements",
        name: "ListeApprovisionnement",
        component: ListeApprovisionnementPage,
        meta: {
          title: 'Liste des approvisionnements',
        }
      },
      {
        path: "view-approvisionnement/:id",
        name: "ViewApprovisionnement",
        component: ViewApprovisionnementPage,
        meta: {
          title: 'Détails d\'un approvisionnement',
        }
      },
    ]
  },
  {
    path: "/caisses",
    component: BodyView,
    children: [
      {
        path: "ajouter-caisse",
        name: "AddCaisse",
        component: AddCaissePage,
        meta: {
          title: 'Ajouter une caisse',
        }
      },
    

      {
        path: "/OuverturesFermetures",
        name: "ListeOuvFerm",
        component: ListeOuvFermPage,
      },

    
      {
        path: '/ouverture/:id',
        name: 'ViewOuvFermPage',
        component: ViewOuvFermPage,
      },
       {
        path: '/confirmation',
        name: 'ConfirmationPaiementPage',
        component: ConfirmationPaiementPage,
      },
      {
        path: "liste-caisses",
        name: "ListeCaisse",
        component: ListeCaissePage,
        meta: {
          title: 'Liste des caisses',
        }
      },

      {
        path: "/ajouter-ouvfer",
        name: "AddOuvFermPage",
        component: AddOuvFermPage,
      },
      {
        path: "/ajouter-fer/:id",
        name: "AddFermPage",
        component: AddFermPage,
      },
      
    ]
  },

  

  {
    path: "/personnelles",
    component: BodyView,
    children: [
      {
        path: "ajouter-personnel",
        name: "AddPersonnellePage",
        component: AddPersonnellePage,
        meta: {
          title: 'Ajouter un personnel',
        }
      },
      {
        path: "liste-personnel",
        name: "ListePersonnelPage",
        component: ListePersonnellePage,
        meta: {
          title: 'Liste des personnels',
        },
      },

      {
        path: "view-personnel/:id",
        name: "ViewPersonnellePage",
        component: ViewPersonnellePage,
        meta: {
          title: 'Détail du personnel',
        }
      },
      {
        path: "edit-personnel/:id",
        name: "EditPersonnellePage",
        component: EditPersonnellePage,
        meta: {
          title: 'Modifier un personnel',
        }
      },
      {
        path: "edit-personnel2/:id",
        name: "EditPersonnellePage2",
        component: EditPersonnellePage2,
        meta: {
          title: 'Modifier un personnel',
        }
      }
    ]
  },

  {
    path: "/modele-signataires",
    component: BodyView,
    children: [
      {
        path: "ajouter-modele-signataire",
        name: "AddModeleSignataire",
        component: AddModeleSignatairePage,
        meta: {
          title: 'Ajouter un modèle de signataire',
        }
      },
      {
        path: "liste-modele-signataires",
        name: "ListeModeleSignataire",
        component: ListeModeleSignatairePage,
        meta: {
          title: 'Liste des modèles de signataires',
        }
      },
    //    {
    //   path: "view-modele-signataire/:id", 
    //   name: "ViewModeleSignataire",
    //   component: ViewModeleSignatairePage,
    //   meta: {
    //     title: 'Détails du modèle de signataire',
    //   }
    // },
    ]
  },


  {
    path: "/factures",
    component: BodyView,
    children: [
      {
        path: "liste-factures",
        name: "ListeFacture",
        component: ListeFacturePage,
        meta: {
          title: 'Liste des factures',
        }
      },
      {
        path: "liste-facture-proformas",
        name: "ListeFactureProforma",
        component: ListeFactureProformaPage,
        meta: {
          title: 'Liste des factures proformas',
        }
      },
    ]
  },


  {
    path: "/conditionnements",
    component: BodyView,
    children: [
      {
        path: "liste-conditionnements",
        name: "ListeConditionnement",
        component: ListeConditionnementPage,
        meta: {
          title: 'Liste des conditionnements',
        }
      },

    ]
  },
 
  {
    path: "/",
    component: BodyView,
    children: [
      {
        path: "liste-groupe-taxes",
        name: "ListeGroupeTaxe",
        component: ListeGroupeTaxePage,
        meta: {
          title: 'Liste des groupes de taxes',
        }
      },
      {
        path: "liste-taxes",
        name: "ListeTaxe",
        component: ListeTaxePage,
        meta: {
          title: 'Liste des taxes',
        }
      },
      {
        path: "liste-type-taxes",
        name: "ListeTypeTaxe",
        component: ListeTypeTaxePage,
        meta: {
          title: 'Liste des types de taxes',
        }
      },
    ]
  },
   {
    path: "/societes",
    component: BodyView,
    children: [
      {
        path: "ajouter-societe",
        name: "AddSociete",
        component: AddSocietePage,
        meta: {
          title: 'Ajouter une société',
        }
      },
      {
        path: "modifier-societe/:id",
        name: "EditSociete",
        component: EditSocietePage,
        meta: {
          title: 'Modifier une société',
        }
      },
      {
        path: "liste-societes",
        name: "ListeSociete",
        component: ListeSocietePage,
        meta: {
          title: 'Liste des sociétés',
        }
      },
      {
        path: "view-societe/:id",
        name: "ViewSociete",
        component: ViewSocietePage,
        meta: {
          title: 'Détails d\'une société',
        }
      },
    ]
  },

  {
    path: "/point-ventes",
    component: BodyView,
    children: [
      {
        path: "ajouter-point-vente",
        name: "AddPointVente",
        component: AddPointVentePage,
        meta: {
          title: 'Ajouter un point de vente',
        }
      },
      {
        path: "modifier-point-vente/:id",
        name: "EditPointVente",
        component: EditPointVentePage,
        meta: {
          title: 'Modifier un point de vente',
        }
      },
      {
        path: "liste-point-ventes",
        name: "ListePointVente",
        component: ListePointVentePage,
        meta: {
          title: 'Liste des points de vente',
        }
      },
    ]
  },

  {
    path: "/auth",
    component: AuthView,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginPage,
        meta: {
          title: 'SOMIMAS - Connexion',
        }
      },
      {
        path: "reset_password_first",
        name: "ResetPasswordFirst",
        component: ResetPasswordFirstPage,
        meta: {
          title: 'Reset Password | SOMIMAS',
        }
      },
    ]
  },
  {
    path: "/dashboards",
    component: BodyView,
    children: [
      {
        path: "dashboard_default",
        name: "default",
        component: indexDefault,
        meta: {
          title: 'Dashboards | Mofi - Premium Vue Admin Template',
        }
      },
      {
        path: "dashboard_project",
        name: "project",
        component: indexProject,
        meta: {
          title: 'Dashboards CRM | Mofi - Premium Vue Admin Template',
        }
      },
    ]
  },
  {
    path: "/authentication/simple",
    name: "loginsimple",
    component: loginSimple,
    meta: {
      title: 'Login Simple | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/one",
    name: "loginimage",
    component: loginImage,
    meta: {
      title: 'Login Image | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/two",
    name: "loginImagetwo",
    component: loginImageTwo,
    meta: {
      title: 'Login Image Two | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/validate",
    name: "loginValidation",
    component: loginValidation,
    meta: {
      title: 'Login Validation | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/tooltip",
    name: "loginTooltip",
    component: loginTooltip,
    meta: {
      title: 'Login Tooltip | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/sweetalert",
    name: "loginSweetalert",
    component: loginSweetalert,
    meta: {
      title: 'Login Sweetalert | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/register/two",
    name: "registerImagetwo",
    component: registerImageTwo,
    meta: {
      title: 'Register Image Two | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/auth/register",
    name: "registerSimple",
    component: registerSimple,
    meta: {
      title: 'Register | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/register/one",
    name: "registerImage",
    component: registerImage,
    meta: {
      title: 'Register Image | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/unlock_user",
    name: "unlockUser",
    component: unlockUser,
    meta: {
      title: 'Unlock User | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/forget_password",
    name: "forgetPassword",
    component: forgetPassword,
    meta: {
      title: 'Forget Password | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/reset_password",
    name: "resetPassword",
    component: resetPassword,
    meta: {
      title: 'Reset Password | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/maintenance",
    name: "maintenanceView",
    component: maintenanceView,
    meta: {
      title: 'Maintenance | Mofi - Premium Vue Admin Template',
    }
  }
]


/*const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})*/

const router = createRouter({
  //history: createWebHistory(),
  history: createWebHashHistory(),
  linkExactActiveClass: "active",
  routes,
  /*scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },*/
});

router.beforeEach(async (to, from, next) => {
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title;
  }
  ApiService.setHeader();
  const authStore = useAuthStore();
  await authStore.verifyAuth();
  const path = ['/auth/login', '/auth/register', '/auth/reset_password_first'];
  if (path.includes(to.path) || authStore.isAuthenticated) {
    next();
  } else {
    next('/auth/login');
  }
});

export default router
