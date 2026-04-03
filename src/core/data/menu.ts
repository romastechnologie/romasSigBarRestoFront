import ListeTypeTaxePage from "@/pages/GesCom/TypeTaxe/ListeTypeTaxePage.vue";

interface MenuItem {
    headTitle1?: string;
    headTitle2?: string;
    title?: string;
    icon?: string;
    icon1?: string;
    type: string;
    badgeType?: string;
    badgeValue?: string;
    active?: boolean;
    isPinned?: boolean;
    path?: string;
    children?: MenuItem[];
    bookmark?: boolean;
    role?: string;
}

export const menu: MenuItem[] = [
    {
        path: "/accueil/tableau-bord",
        title: "Tableau de bord",
        type: "link",
        icon: "stroke-home",
        icon1: "fill-home",
        active: false,
        isPinned: false,
       role: "DashBord"
    },


    {
        headTitle1: "Gestion des inventaires",
        headTitle2: "Gestion des inventaires",
        type: "headtitle",
        //role: "ListProduit"
        //role: "ListProduit|ListFamille|ListConditionnement|ListMagasin|AddMouvement|EtatInventaire|ListMouvement"
    },
    {
        title: "Gestion des produits",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        //role: "ListProduit",
        children: [
            {
                path: "/produits/liste-produits",
                title: " produits",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                //role: "ListProduit"
            },



            {
                path: "/familles/liste-familles",
                title: "familles",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                //role: "ListFamille"
            },
            

            {
                path: "/conditionnements/liste-conditionnements",
                title: "conditionnements",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListConditionnement"
            },

            {
                path: "/marques/liste-marques",
                title: "Liste des marques",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListMarque"
            },

        ]
    },
    
    {
        title: "Definition de prix",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
       //role: "ListeClient|ListeContrat|AddContrat|ListCompte|AddCompte|AddClient|ListeMesClients",
        children: [
            {
                path: "/prixproduits/ajout-prixfamille",
                title: "Ajouter un prix",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
              // role: "ListeClient"
            },
    
             
             {
                path: "/prixproduits/list-prixfamille",
                title: "Liste des prix",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
              // role: "ListeMesClients"
            },
            
        ]
    },

{
        title: "Gestion des mets",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        //role: "ListMet",
        children: [
            {
                path: "/mets/liste-mets",
                title: "mets",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                //role: "ListMet"
            },

            {
                path: "/marques/liste-marques",
                title: "Liste des marques",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListMarque"
            },

        ]
    },


    {
        title: "Gestion des Clients",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
       role: "ListeClient|ListeContrat|AddContrat|ListCompte|AddCompte|AddClient|ListeMesClients",
        children: [
            {
                path: "/clients/liste-clients",
                title: "Clients",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListeClient"
            },
    
             
             {
                path: "/mesclients/liste-mesclients",
                title: "Mes clients",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListeMesClients"
            },
            
        ]
    },


    {
        title: "Gestion des Reglements",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
       role: "ListReglement|AddReglement",
        children: [
            {
                path: "/reglements/liste-reglements",
                title: "Règlements",
                type: "link",
               role: "ListReglement"
            },
            
        ]
    },

    {
        title: "Personnel",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/personnelles/ajouter-personnel",
                title: "Ajouter un personnel",
                type: "link"
            },
            {
                path: "/personnelles/liste-personnel",
                title: "Liste des personnels",
                type: "link"
            },
        ]
    },
    {
        title: "Contrat",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/contrats/ajouter-contrat",
                title: "Ajouter un contrat",
                type: "link"
            },
            {
                path: "/contrats/liste-contrats",
                title: "Liste des contrats",
                type: "link"
            },
        ]
    },
    {
        title: "Presence",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/presences/ajouter-presence",
                title: "Ajouter une présence",
                type: "link"
            },
            {
                path: "/presences/liste-presence",
                title: "Liste des présences",
                type: "link"
            },
        ]
    },
    
    {
        title: "Vente",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/ventes/ajouter-vente",
                title: "Ajouter une vente",
                type: "link"
            },
            {
                path: "/ventes/liste-ventes",
                title: "Liste des ventes",
                type: "link"
            },
        ]
    },

    {
        title: "Etats",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
             {
                path: "/etats/produits-disponibles",
                title: "stock actuelle",
                type: "link"
            },
            {
                path: "/etats/produits-vendus",
                title: "Liste des produits vendus",
                type: "link"
            },
            {
                path: "/etats/produits-livres",
                title: "Liste des produits livres",
                type: "link"
            },
            {
                path: "/etats/produits-rupture",
                title: "Liste des produits en rupture de stock",
                type: "link"
            },
            {
                path: "/etats/point-commande",
                title: "Liste du point des commandes",
                type: "link"
            },
            {
                path: "/etats/etat-produits-entree",
                title: "Liste des produits entrées",
                type: "link"
            },
            {
                path: "/etats/etats-produits-sorties",
                title: "Liste des produits sorties",
                type: "link"
            },
            {
                path: "/etats/etat-nmbre-pro",
                title: 'Nombre du produits vendus par période',
                type: "link"
            },
            {
                path: "/etats/ca-client",
                title: `Chiffre d'affaire par cient`,
                type: "link"
            }
        ]
    },

    {
        title: "Stock",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
             {
                path: "/detachements/liste-detachements",
                title: "Liste des detachements",
                type: "link"
            },
            {
                path: "/sorties/liste-sorties",
                title: "Liste des sorties",
                type: "link"
            },
            {
                path: "/transferts/liste-transferts",
                title: "Liste des transferts par point de vente",
                type: "link"
            },
            {
               path: "/transferts/liste-transfertMag",
                title: "Liste des transferts par magasin ",
                type: "link"
            },
            {
                path: "/approvisionnements/liste-approvisionnements",
                title: "Liste des approvisionnements",
                type: "link"
            },
          
        ]
    },

    {
        title: "Caisse",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/caisses/liste-caisses",
                title: "Liste des caisses",
                type: "link"
            },

            // {
            //     path: "/depenses/liste-depenses",
            //     title: "Liste des dépenses",
            //     type: "link"
            // },
            // {
            //     path: "/depots/liste-depots",
            //     title: "Liste des dépôts",
            //     type: "link"
            // },
            
            {
                path: "/OuverturesFermetures",
                title: "Liste des caisses ouvertes et fermées",
                type: "link"
            },
            
        ]
    },
     {
         title: "Société",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
             {
                path: "/societes/liste-societes",
                title: "sociétés",
                type: "link"
            },
           
        ]
    },

           

     {
        
         title: "Facture",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/factures/liste-factures",
                title: " factures",
                type: "link"
            },
          
            
        ]
    },

    {
        title: "Paramètres",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
       role: "ListProduit|ListFamille|ListeFamilleProduitChampsLibres|AddFamilleProduitChampsLibres|ListConditionnement|ListMotifSuivi|ListMagasin|ListPointVente|AddChampsLibre|AddClient|ListClient|ListMarque|ListeCodification|ListDomaineActivite|ListTaxe|ListTypeTaxe|ListModeRegelement|ListPiece|ListBanque|ListCompteEntreprise|ListeClientAffecters",
        children: [
            {
                path: "/magasins/liste-magasins",
                title: "magasins",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                type: "link",
               role: "ListMagasin"
            },
            {
                path: "/domaines/liste-domaines",
                title: "domaines",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                type: "link",
               role: "ListDomaineActivite"
            },
            {
                path: "/point-ventes/liste-point-ventes",
                title: "points de vente",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListPointVente"
            },
            {
                path: "/liste-groupe-taxes",
                title: "groupe de taxe",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
            },
            {
                path: "/liste-taxes",
                title: "Taxe",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListTaxe"
            },
            {
                path: "/banques/liste-banques",
                title: "banques",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListBanque"
            },
            {
                path: "/tables/liste-tables",
                title: "tables",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                //role: "Listable"
            },
            {
                path: "/categoriesProduits/liste-categoriesProduits",
                title: "categoriesProduits",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListFamille"
            },
            
            
              {
                path: "/personnelles/liste-personnel",
                title: "personnels",
                type: "link"
            },

                {
                path: "/modele-signataires/liste-modele-signataires",
                title: "modèles de signataires",
                type: "link"
            },

            {
                path: "/liste-type-taxes",
                title: "Type de taxe",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListTypeTaxe"
            },

            {
                path: "/fonctions/liste-fonctions",
                title: "Fonction",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListModeReglement"
            },
            {
                path: "/typeDocuments/liste-typeDocuments",
                title: "TypeDocument",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListModeReglement"
            },


            {
                path: "/mode-reglements/liste-mode-reglements",
                title: "Modes de règlement",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
               role: "ListModeReglement"
            },
           
            {
                title: "Champs Descriptifs",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
               role: "ListeChampsLibre",
                children: [
                    {
                        path: "/champsLibres/ajouter-champsLibre",
                        title: "Ajouter un champ",
                        type: "link",
                       role: "AddChampsLibre"
                    },
                    {
                        path: "/champsLibres/liste-champsLibre",
                        title: "Liste des champs",
                        type: "link",
                       role: "ListeChampsLibre"
                    },

                ]
            },
            {
                title: "Champs Affectés",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
               role: "ListeFamilleProduitChampsLibres",
                children: [
                    {
                        path: "/champsLibreFamille/ajouter-champsLibreFamille",
                        title: "Affecter un champ",
                        type: "link",
                       role: "AddFamilleProduitChampsLibres"
                    },

                    {
                        path: "/champsLibreFamille/liste-champsLibreFamille",
                        title: "Liste des champs affectés",
                        type: "link",
                       role: "ListeFamilleProduitChampsLibres"
                    },
                ]

            },


        ]
    },


    {
        headTitle1: "Gestion des utilisateurs",
        headTitle2: "Utilisateurs, Rôles et permissions",
        type: "headtitle",
       role: "AddUser|ListUser|AddRole|ListRole|ListPermission"
    },

    {
        title: "Gestion des utilisateurs",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
       role: "ListUser",
        children: [

            {
                title: "Utilisateurs",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
               role: "ListUser",
                children: [
                    {
                        path: "/utilisateurs/ajouter-utilisateur",
                        title: "Ajouter un utilisateur",
                        type: "link",
                       role: "AddUser"
                    },
                    {
                        path: "/utilisateurs/liste-utilisateur",
                        title: "Liste des utilisateurs",
                        type: "link",
                       role: "ListUser"
                    },
                ]
            },
            {
                title: "Role",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
              role: "ListRole",
                children: [
                    {
                        path: "/roles/ajouter-role",
                        title: "Ajouter un rôle",
                        type: "link",
                       role: "AddRole"
                    },
                    {
                        path: "/roles/liste-role",
                        title: "Liste des rôles",
                        type: "link",
                       role: "ListRole"
                    },
                ]
            },
            {
                title: "Permissions",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
               role: "ListPermission",
                children: [
                    {
                        path: "/permissions/liste-permission",
                        title: "Liste des permissions",
                        type: "link",
                       role: "ListPermission"
                    },

                ]
            },


        ]
    },
]


