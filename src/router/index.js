import { createRouter, createWebHashHistory } from 'vue-router';
import BodyView from "@/layout/BodyView.vue";
import AuthView from "@/components/common/block/auth/AuthView.vue";
import ResetPasswordFirstPage from "@/components/common/block/auth/ResetPasswordFirstPage.vue";
import LoginPage from "@/components/common/block/auth/LoginPage.vue";
import indexDefault from "@/pages/dashbords/indexDefault.vue";
import indexProject from "@/pages/dashbords/indexProject.vue";
import loginSimple from "@/pages/authentication/loginSimple.vue";
import loginImage from "@/pages/authentication/loginImage.vue";
import loginImageTwo from "@/pages/authentication/loginImageTwo.vue";
import loginValidation from "@/pages/authentication/loginValidation.vue";
import loginTooltip from "@/pages/authentication/loginTooltip.vue";
import loginSweetalert from "@/pages/authentication/loginSweetalert.vue";
import registerSimple from "@/pages/authentication/registerSimple.vue";
import registerImage from "@/pages/authentication/registerImage.vue";
import registerImageTwo from "@/pages/authentication/registerImageTwo.vue";
import unlockUser from "@/pages/authentication/unlockUser.vue";
import forgetPassword from "@/pages/authentication/forgetPassword.vue";
import resetPassword from "@/pages/authentication/resetPassword.vue";
import maintenanceView from "@/pages/authentication/maintenanceView.vue";
import AddPermissionPage from "@/pages/Permission/AddPermissionPage.vue";
import ListePermissionPage from "@/pages/Permission/ListePermissionPage.vue";
import ListeConditionnementPage from "@/pages/GesCom/Conditionnement/ListeConditionnementPage.vue";
import ListeMotifSuiviPage from '@/pages/GesCom/MotifSuivi/ListeMotifSuiviPage.vue';
import AddRolePage from "@/pages/Role/AddRolePage.vue";
import ListeRolePage from "@/pages/Role/ListeRolePage.vue";
import EditRolePage from "@/pages/Role/EditRolePage.vue";
import ViewRolePage from "@/pages/Role/ViewRolePage.vue";
import AddUserPage from '@/pages/Users/AddUserPage.vue';
import ListeUserPage from "@/pages/Users/ListeUserPage.vue";
import EditUserPage from "@/pages/Users/EditUserPage.vue";
import EditProfilePage from "@/pages/Users/EditProfilePage.vue";
import ViewUserPage from "@/pages/Users/ViewUserPage.vue";
import TableauBordPage from "@/pages/dashbords/TableauBordPage.vue";
//Gescom
import ListeFamillePage from "@/pages/GesCom/Familles/ListeFamillePage.vue";
import AddProduitPage from "@/pages/GesCom/Produit/AddProduitPage.vue";
import EditProduitPage from "@/pages/GesCom/Produit/EditProduitPage.vue";
import ListeProduitPage from "@/pages/GesCom/Produit/ListeProduitPage.vue";
import ViewProduitPage from "@/pages/GesCom/Produit/ViewProduitPage.vue";
import ListeMagasinPage from "@/pages/GesCom/Magasin/ListeMagasinPage.vue";
import AddInventairePage from "@/pages/GesCom/Inventaire/AddInventairePage.vue";
import AddPointVentePage from "@/pages/GesCom/PointVente/AddPointVentePage.vue";
import EditPointVentePage from "@/pages/GesCom/PointVente/EditPointVentePage.vue";
import ListePointVentePage from "@/pages/GesCom/PointVente/ListePointVentePage.vue";
import MiseAJourInventairePage from '@/pages/GesCom/Inventaire/MiseAJourInventairePage.vue';
import ListeProduitIventairePage from '@/pages/GesCom/Inventaire/ListeProduitIventairePage.vue';
// import ListeRapportInventairePage from '@/pages/GesCom/Inventaire/ListeRapportInventairePage.vue';
import ListeInventairePage from '@/pages/GesCom/Inventaire/ListeInventairePage.vue';
import ListeFicheInventairePage from '@/pages/GesCom/Inventaire/ListeFicheInventairePage.vue';
import EditeFicheInventairePage from "@/pages/GesCom/Inventaire/EditeFicheInventairePage.vue";
//Etats
import DetailInventairePage from "@/pages/GesCom/Inventaire/DetailInventairePage.vue";
import AddMouvementPage from '@/pages/GesCom/Mouvement/AddMouvementPage.vue';
import ListMouvementPage from '@/pages/GesCom/Mouvement/ListeMouvementPage.vue';
import AddMouvementFichePage from '@/pages/GesCom/MouvementFiche/AddMouvementFichePage.vue';
import ListMouvementFichePage from '@/pages/GesCom/MouvementFiche/ListeMouvementFichePage.vue';
import ApiService from '@/services/ApiService';
//Fin GesCom/
import { useAuthStore } from "@/services/auth";
import AddClientPage from '@/pages/GesCom/Client/AddClientPage.vue';
import EditClientPage from '@/pages/GesCom/Client/EditClientPage.vue';
import ViewClientPage from '@/pages/GesCom/Client/ViewClientPage.vue';
import ListeClientPage from '@/pages/GesCom/Client/ListeClientPage.vue';
import AddFicheStockPage from '@/pages/GesCom/FicheStock/AddFicheStockPage.vue';
import ListeFicheStockPage from '@/pages/GesCom/FicheStock/ListeFicheStockPage.vue';
import ListeControlPage from '@/pages/GesCom/Control/ListeControlPage.vue';
import AddControlPage from '@/pages/GesCom/Control/AddControlPage.vue';
import ListeChampsLibreFamillePage from '@/pages/ChampsLibre/ListeChampsLibreFamillePage.vue';
import EditChampsLibreFamillePage from '@/pages/ChampsLibre/EditChampsLibreFamillePage.vue';
import AddChampsLibreFamillePage from '@/pages/ChampsLibre/AddChampsLibreFamillePage.vue';
import ListeChampsLibrePage from '@/pages/ChampsLibre/ListeChampsLibrePage.vue';
import EditChampsLibrePage from '@/pages/ChampsLibre/EditChampsLibrePage.vue';
import AddChampsLibrePage from '@/pages/ChampsLibre/AddChampsLibrePage.vue';
import ListeGroupeTaxePage from '@/pages/GesCom/GroupeTaxe/ListeGroupeTaxePage.vue';
import ListeTypeTaxePage from '@/pages/GesCom/TypeTaxe/ListeTypeTaxePage.vue';
import ListeTaxePage from '@/pages/GesCom/Taxe/ListeTaxePage.vue';
import ListeMarquePage from '@/pages/GesCom/Marque/ListeMarquePage.vue';
import ListeCodificationPage from '@/pages/GesCom/Codification/ListeCodificationPage.vue';
import AddBonLivraisonPage from '@/pages/GesCom/BonLivraison/AddBonLivraisonPage.vue';
import ListeBonLivraisonPage from '@/pages/GesCom/BonLivraison/ListeBonLivraisonPage.vue';
import AddProduitConditionnementPage from '@/pages/GesCom/Produit/AddProduitConditionnementPage.vue';
import ViewBonLivraisonPage from '@/pages/GesCom/BonLivraison/ViewBonLivraisonPage.vue';
import ListeBonRetourPage from '@/pages/GesCom/BonRetour/ListeBonRetourPage.vue';
import AddBonRetourPage from '@/pages/GesCom/BonRetour/AddBonRetourPage.vue';
import ViewBonRetourPage from '@/pages/GesCom/BonRetour/ViewBonRetourPage.vue';
import ListeBonCommandeFournisseurPage from '@/pages/GesCom/BonCommandeFournisseur/ListeBonCommandeFournisseurPage.vue';
import AddBonCommandeFournisseurPage from '@/pages/GesCom/BonCommandeFournisseur/AddBonCommandeFournisseurPage.vue';
import ViewBonCommandeFournisseurPage from '@/pages/GesCom/BonCommandeFournisseur/ViewBonCommandeFournisseurPage.vue';
import EditFournisseurPage from '@/pages/GesCom/Fournisseur/EditFournisseurPage.vue';
import ListeFournisseurPage from '@/pages/GesCom/Fournisseur/ListeFournisseurPage.vue';
import AddFournisseurPage from '@/pages/GesCom/Fournisseur/AddFournisseurPage.vue';
import ViewFournisseurPage from '@/pages/GesCom/Fournisseur/ViewFournisseurPage.vue';
//import ListeClientPage from '@/pages/GesCom/Client/ListeClientPage.vue'
const routes = [
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
        path: "/motifSuivis",
        component: BodyView,
        children: [
            {
                path: "liste-motifSuivi",
                name: "ListeMotifSuivi",
                component: ListeMotifSuiviPage,
                meta: {
                    title: 'Liste des motifs Suivis',
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
        path: "/fiches",
        component: BodyView,
        children: [
            {
                path: "ajouter-fiche",
                name: "AddFicheStock",
                component: AddFicheStockPage,
                meta: {
                    title: 'Ajouter une fiche de stock',
                }
            },
            /*{
              path: "modifier-fiche/:id",
              name: "EditFiche",
              component: EditFichePage,
              meta: {
                title: 'Modifier une fiche',
              }
            },*/
            {
                path: "liste-fiches",
                name: "ListeFicheStock",
                component: ListeFicheStockPage,
                meta: {
                    title: 'Liste des fiches de stock',
                }
            },
            /* {
               path: "view-client/:id",
               name: "ViewClient",
               component: ViewClientPage,
               meta: {
                 title: 'Détails d\'un client',
               }
             },*/
        ]
    },
    {
        path: "/controls",
        component: BodyView,
        children: [
            {
                path: "ajouter-control",
                name: "AddControl",
                component: AddControlPage,
                meta: {
                    title: 'Ajouter un controle de fiche',
                }
            },
            {
                path: "liste-controls",
                name: "ListeControl",
                component: ListeControlPage,
                meta: {
                    title: 'Liste des fiches controlées',
                }
            },
        ]
    },
    // {
    //   path: "/rapportInventaire",
    //   component: BodyView,
    //   children: [
    //     {
    //       path: "liste-rapportInventaires",
    //       name: "liste-rapportInventaires",
    //       component: ListeRapportInventairePage,
    //       meta: {
    //         title: 'Liste Rapport Inventaire',
    //       }
    //     },
    //   ]
    // },
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
    {
        path: "/familles",
        component: BodyView,
        children: [
            {
                path: "liste-familles",
                name: "ListeFamille",
                component: ListeFamillePage,
                meta: {
                    title: 'Liste des familles',
                }
            },
        ]
    },
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
        ]
    },
    {
        path: "/inventaires",
        component: BodyView,
        children: [
            {
                path: "ajouter-inventaire",
                name: "AddInventaire",
                component: AddInventairePage,
                meta: {
                    title: 'Ajouter un inventaire',
                }
            },
            {
                path: "edite-fiche-inventaire/:id",
                name: "EditeFicheInventaire",
                component: EditeFicheInventairePage,
                meta: {
                    title: 'Edite fiche inventaire',
                }
            },
            {
                path: "detail-inventaire/:id",
                name: "DetailInventairePage",
                component: DetailInventairePage,
                meta: {
                    title: 'Détail inventaire',
                }
            },
            {
                path: "inventorier",
                name: "MiseAJourInventaire",
                component: MiseAJourInventairePage,
                meta: {
                    title: 'Inventorier',
                }
            },
            {
                path: "ajouter-mouvement",
                name: "AddMouvement",
                component: AddMouvementPage,
                meta: {
                    title: 'Ajouter un mouvement',
                }
            },
            {
                path: "liste-mouvements",
                name: "ListeMouvement",
                component: ListMouvementPage,
                meta: {
                    title: 'Liste des mouvements',
                }
            },
            {
                path: "ajouter-mouvement-fiche",
                name: "AddMouvementFiche",
                component: AddMouvementFichePage,
                meta: {
                    title: 'Ajouter un mouvement fiche',
                }
            },
            {
                path: "liste-mouvements-fiche",
                name: "ListeMouvementFiche",
                component: ListMouvementFichePage,
                meta: {
                    title: 'Liste des mouvements des fiches',
                }
            },
            {
                path: "liste-fiche-inventaires",
                name: "ListeFicheInventaire",
                component: ListeFicheInventairePage,
                meta: {
                    title: 'Liste des fiches d\'inventaires',
                }
            },
            {
                path: "liste-inventaires",
                name: "ListeInventaire",
                component: ListeInventairePage,
                meta: {
                    title: 'Liste des inventaires',
                }
            },
            {
                path: "liste-produit-inventaire",
                name: "ListeProduitIventaire",
                component: ListeProduitIventairePage,
                meta: {
                    title: 'Liste des produits inventoriers',
                }
            },
        ]
    },
    {
        path: "/bons",
        component: BodyView,
        children: [
            {
                path: "liste-bonLivraison",
                name: "ListeBonLivraison",
                component: ListeBonLivraisonPage,
                meta: {
                    title: 'Liste des bons de livraisons',
                }
            },
            {
                path: "ajouter-bonLivraison",
                name: "AddBonLivraison",
                component: AddBonLivraisonPage,
                meta: {
                    title: 'ajouter un bon',
                }
            },
            {
                path: "view-bon/:id",
                name: "ViewBonLivraison",
                component: ViewBonLivraisonPage,
                meta: {
                    title: 'Détails d\'un bon',
                }
            },
        ]
    },
    {
        path: "/bons-commandefournisseurs",
        component: BodyView,
        children: [
            {
                path: "liste-commandefournisseurs",
                name: "ListeBonCommandeFournisseur",
                component: ListeBonCommandeFournisseurPage,
                meta: {
                    title: 'Liste des commandes fournisseurs',
                }
            },
            {
                path: "ajouter-boncommandefournisseur",
                name: "AddBonCommandeFournisseur",
                component: AddBonCommandeFournisseurPage,
                meta: {
                    title: 'Commandes fournisseurs',
                }
            },
            {
                path: "view-bon-commandefournisseurs/:id",
                name: "ViewBonCommandeFournisseur",
                component: ViewBonCommandeFournisseurPage,
                meta: {
                    title: 'Détails d\'un bon de commandes fournisseurs',
                }
            },
        ]
    },
    {
        path: "/fournisseurs",
        component: BodyView,
        children: [
            {
                path: "ajouter-fournisseur",
                name: "AddFournisseur",
                component: AddFournisseurPage,
                meta: {
                    title: 'Ajouter un fournisseur',
                }
            },
            {
                path: "edit-fournisseur/:id",
                name: "EditFournisseur",
                component: EditFournisseurPage,
                meta: {
                    title: 'Modifier un fournisseur',
                }
            },
            {
                path: "liste-fournisseurs",
                name: "ListeFournisseur",
                component: ListeFournisseurPage,
                meta: {
                    title: 'Liste des fournisseurs',
                }
            },
            {
                path: "view-fournisseur/:id",
                name: "ViewFournisseur",
                component: ViewFournisseurPage,
                meta: {
                    title: 'Détails d\'un fournisseur',
                }
            },
        ]
    },
    {
        path: "/bonretour",
        component: BodyView,
        children: [
            {
                path: "liste-bonRetour",
                name: "ListeBonRetour",
                component: ListeBonRetourPage,
                meta: {
                    title: 'Liste des bons de retour',
                }
            },
            {
                path: "ajouter-bonRetour",
                name: "AddBonRetour",
                component: AddBonRetourPage,
                meta: {
                    title: 'Bon de retour',
                }
            },
            {
                path: "view-bon-retour/:id",
                name: "ViewBonRetour",
                component: ViewBonRetourPage,
                meta: {
                    title: 'Détails d\'un bon de retour',
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
        path: "/codifications",
        component: BodyView,
        children: [
            {
                path: "liste-codifications",
                name: "ListeCodification",
                component: ListeCodificationPage,
                meta: {
                    title: 'Liste des codifications',
                }
            },
        ]
    },
    {
        path: "/marques",
        component: BodyView,
        children: [
            {
                path: "liste-marques",
                name: "ListeMarque",
                component: ListeMarquePage,
                meta: {
                    title: 'Liste des marques',
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
];
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
    const authStore = useAuthStore();
    ApiService.setHeader();
    //await authStore.verifyAuth();
    const path = ['/auth/login', '/auth/register', '/auth/reset_password_first'];
    if (path.includes(to.path) || authStore.isAuthenticated) {
        next();
    }
    else {
        next('/auth/login');
    }
});
export default router;
//# sourceMappingURL=index.js.map