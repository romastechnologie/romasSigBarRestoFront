export const menu = [
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
        role: "ListProduit"
        //role: "AddInventaire|ListInventaire|EditInventaire|ListFicheInventaire|AddMouvement|EtatInventaire|ListMouvement"
    },
    {
        title: "Gestion des produits",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListInventaire",
        children: [
            {
                path: "/produits/liste-produits",
                title: " produits",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListProduit"
            },
            {
                path: "/familles/liste-familles",
                title: "familles",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListFamille"
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
                role: "ListMagasin"
            },
        ]
    },
    {
        title: "Gestion des inventaires",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListProduit|ListFamille|ListConditionnement|ListMotifSuivi|ListMagasin|ListPointVente|AddClient|ListClient,ListMarque",
        children: [
            {
                path: "/inventaires/liste-inventaires",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Liste des inventaires",
                isPinned: false,
                type: "link",
                role: "ListProduit"
            },
            {
                path: "/inventaires/liste-fiche-inventaires",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Liste des fiches d'inventaires",
                isPinned: false,
                type: "link",
                role: "ListProduit"
            },
            {
                path: "/inventaires/ajouter-inventaire",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Créer une fiche d'inventaire",
                isPinned: false,
                type: "link",
                role: "ListProduit"
            },
            {
                path: "/inventaires/inventorier",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Inventorier",
                isPinned: false,
                type: "link",
                role: "EditInventaire"
            },
            {
                path: "/inventaires/ajouter-mouvement",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Mouvement",
                isPinned: false,
                type: "link",
                role: "AddMouvement"
            },
            {
                path: "/inventaires/liste-produit-inventaire",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Etats inventaire",
                isPinned: false,
                type: "link",
                role: "ListMouvement"
            },
            {
                path: "/inventaires/liste-mouvements",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Liste des mouvements",
                isPinned: false,
                type: "link",
                role: "ListMouvement"
            },
        ]
    },
    // {
    //     headTitle1: "Gestion des fiches",
    //     headTitle2: "Gestion des fiches",
    //     type: "headtitle",
    //     role: "ListProduit" 
    //     //role: "AddInventaire | ListInventaire | EditInventaire | ListFicheInventaire | AddMouvement | EtatInventaire | ListMouvement"
    // },
    {
        title: "Gestion des fiches",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListInventaire",
        children: [
            {
                path: "/inventaires/ajouter-mouvement-fiche",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Ajouter un mouvement de fiche",
                isPinned: false,
                type: "link",
                role: "ListInventaire"
            },
            {
                path: "/inventaires/liste-mouvements-fiche",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "Liste des mouvements des fiches",
                isPinned: false,
                type: "link",
                role: "ListMouvement"
            },
            {
                path: "/fiches/liste-fiches",
                title: "Fiches de stock",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListMagasin"
            },
            {
                path: "/controls/liste-controls",
                title: "Controle fiche",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListMagasin"
            },
        ]
    },
    // {
    //     headTitle1: "Gestion des produits",
    //     headTitle2: "Gestion des produits",
    //     type: "headtitle",
    //     role: "ListProduit" 
    //     //role: "AddInventaire|ListInventaire|EditInventaire|ListFicheInventaire|AddMouvement|EtatInventaire|ListMouvement"
    // },
    // {
    //     headTitle1: "Gestion des clients",
    //     headTitle2: "Gestion des clients",
    //     type: "headtitle",
    //     role: "ListProduit" 
    //     //role: "AddInventaire|ListInventaire|EditInventaire|ListFicheInventaire|AddMouvement|EtatInventaire|ListMouvement"
    // },
    {
        title: "Gestion des Clients",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListInventaire",
        children: [
            {
                path: "/clients/liste-clients",
                title: "Liste des clients",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListMagasin"
            },
        ]
    },
    {
        title: "Gestion des bons",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListInventaire",
        children: [
            {
                path: "/bons/ajouter-bonLivraison",
                title: "Ajouter un bon",
                type: "link",
                role: "ListInventaire"
            },
            {
                path: "/bons/liste-bonLivraison",
                title: "Liste des bons",
                type: "link",
                role: "ListInventaire"
            },
            {
                path: "/bonretour/ajouter-bonRetour",
                title: "Bon de retour",
                type: "link",
                role: "ListInventaire"
            },
            {
                path: "/bonretour/liste-bonRetour",
                title: "Liste des bons de retour",
                type: "link",
                role: "ListInventaire"
            },
            {
                path: "/bons-commandefournisseurs/ajouter-boncommandefournisseur",
                title: "Commandes fournisseurs",
                type: "link",
                role: "ListInventaire"
            },
            {
                path: "/bons-commandefournisseurs/liste-commandefournisseurs",
                title: "Liste des commandes fournisseurs",
                type: "link",
                role: "ListInventaire"
            },
        ]
    },
    // {
    //     title: "Gestion des bons de retour",
    //     icon: "stroke-user",
    //     icon1: "fill-user",
    //     type: "sub",
    //     badgeType: "light-primary",
    //     active: false,
    //     isPinned: false,
    //     role: "ListInventaire" ,
    //     children: [
    //         {
    //             path: "/bonretour/ajouter-bonRetour",
    //             title: "Bon de retour",
    //             type: "link",
    //             role: "ListInventaire"
    //         },
    //         {
    //             path: "/bonretour/liste-bonRetour",
    //             title: "Liste des bons de retour",
    //             type: "link",
    //            role: "ListInventaire"
    //         },
    //         ]
    // },
    {
        title: "Fournisseurs",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListMagasin",
        children: [
            {
                path: "/fournisseurs/ajouter-fournisseur",
                title: "Ajouter un fournisseur",
                role: "ListMagasin",
                type: "link"
            },
            {
                path: "/fournisseurs/liste-fournisseurs",
                title: "Liste des fournisseurs",
                role: "ListMagasin",
                type: "link"
            },
        ]
    },
    // {
    //     title: "Gestion des Commandes Fournisseurs",
    //     icon: "stroke-user",
    //     icon1: "fill-user",
    //     type: "sub",
    //     badgeType: "light-primary",
    //     active: false,
    //     isPinned: false,
    //     role: "ListInventaire" ,
    //     children: [
    //         {
    //             path: "/bons-commandefournisseurs/ajouter-boncommandefournisseur",
    //             title: "Commandes fournisseurs",
    //             type: "link",
    //             role: "ListInventaire"
    //         },
    //         {
    //             path: "/bons-commandefournisseurs/liste-commandefournisseurs",
    //             title: "Liste des commandes fournisseurs",
    //             type: "link",
    //            role: "ListInventaire"
    //         },
    //         ]
    // },
    {
        title: "Paramètres",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListProduit|ListFamille|ListConditionnement|ListMotifSuivi|ListMagasin|ListPointVente|AddClient|ListClient,ListMarque",
        children: [
            {
                path: "/motifSuivis/liste-motifSuivi",
                icon: "stroke-email",
                icon1: "fill-email",
                title: "MotifSuivi",
                isPinned: false,
                type: "link",
                role: "ListMotifSuivi"
            },
            {
                path: "/codifications/liste-codifications",
                title: "codifications",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListConditionnement"
            },
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
                role: "ListMagasin"
            },
            {
                path: "/liste-taxes",
                title: "Taxe",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListMagasin"
            },
            {
                path: "/liste-type-taxes",
                title: "Type de taxe",
                type: "link",
                icon: "stroke-learning",
                icon1: "fill-learning",
                isPinned: false,
                role: "ListMagasin"
            },
            {
                title: "Champs Descriptifs",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
                role: "ListProduit",
                children: [
                    {
                        path: "/champsLibres/ajouter-champsLibre",
                        title: "Ajouter un champ",
                        type: "link",
                        role: "ListProduit"
                    },
                    {
                        path: "/champsLibres/liste-champsLibre",
                        title: "Liste des champs",
                        type: "link",
                        role: "ListProduit"
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
                role: "ListProduit",
                children: [
                    {
                        path: "/champsLibreFamille/ajouter-champsLibreFamille",
                        title: "Affecter un champ",
                        type: "link",
                        role: "ListProduit"
                    },
                    {
                        path: "/champsLibreFamille/liste-champsLibreFamille",
                        title: "Liste des champs affectés",
                        type: "link",
                        role: "ListProduit"
                    },
                ]
            },
        ]
    },
    {
        headTitle1: "Gestion des utilisateurs",
        headTitle2: "Utilisateurs, Rôles et permissions",
        type: "headtitle",
        role: "ListProduit"
        //role: "AddUser|ListUser|AddRole|ListRole|ListPermission"
    },
    {
        title: "Gestion des utilisateurs",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        role: "ListProduit",
        children: [
            {
                title: "Utilisateurs",
                icon: "stroke-user",
                icon1: "fill-user",
                type: "sub",
                badgeType: "light-primary",
                active: false,
                isPinned: false,
                role: "ListProduit",
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
                role: "ListProduit",
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
                role: "ListProduit",
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
];
//# sourceMappingURL=menu.js.map