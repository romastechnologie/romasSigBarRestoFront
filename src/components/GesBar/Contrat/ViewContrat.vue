<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations Générales</h4>
            <router-link to="/contrats/liste-contrats" class="btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            <button @click="downloadContratDetails" class="btn btn-success transition border-0 lh-1 fw-medium ms-2">
              <i class="flaticon-download lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Télécharger
            </button>
          </div>
          <div class="row">
            <div class="col-md-6">
              <table class="table">
                <tbody>
                  <tr>
                    <td class="label-title">Durée du contrat </td>
                    <td>{{ contrat?.dureeContrat || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Date d'embauche</td>
                    <td>{{ formatDate(contrat?.datePriseFonction) || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Salaire de base</td>
                    <td>{{ contrat?.salaireBase || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Mode de tarification</td>
                    <td>{{ contrat?.modetarification?.libelle || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Catégorie de contrat</td>
                    <td>{{ contrat?.categorieContrat || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Période d'essai</td>
                    <td>{{ contrat?.dureePeriodeEssai || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Date de fin de contrat</td>
                    <td>{{ formatDate(contrat?.dateFin) || 'Non renseigné' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-md-6">
              <table class="table">
                <tbody>
                  <tr>
                    <td class="label-title">Renouvelable</td>
                    <td>{{ contrat?.renouvelable || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Date fin de période d'Essai</td>
                    <td>{{ formatDate(contrat?.dateFinperiodeEssai) || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Période de Paie</td>
                    <td>{{ contrat?.periodeDePaie || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Type Contrat</td>
                    <td>{{ contrat?.typeContrat?.libelle || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Personnel</td>
                    <td>{{ contrat?.personnel?.nom + ' ' + contrat?.personnel?.prenom }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Poste Occupé</td>
                    <td>{{ contrat?.poste?.libelle || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                    <td class="label-title">Attributions</td>
                    <span v-if="contrat?.attributioncontrats?.length">
                      {{contrat.attributioncontrats.map(a => a.attribution?.libelle).filter(Boolean).join(', ')}}
                    </span>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Horaires de l'Entreprise</h4>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Jour</th>
                <th>Heure d'ouverture</th>
                <th>Heure de debut de Pause</th>
                <th>Heure de fin de Pause</th>
                <th>Heure de fermeture</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(horaire, index) in contrat?.horaire_personnels" :key="index">
                <td>{{ horaire?.jour || '-' }}</td>
                <td>{{ horaire?.heureArrivee || '-' }}</td>
                <td>{{ horaire?.heureDebutPause || '-' }}</td>
                <td>{{ horaire?.heureFinPause || '-' }}</td>
                <td>{{ horaire?.heureDepart || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error } from "@/utils/utils";
import { useRoute } from "vue-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default defineComponent({
  name: "ViewContrat",
  setup() {
    const route = useRoute();
    const contrat = ref(null);
    const loading = ref(false);

    function formatDate(dateStr: string): string {
  if (!dateStr) return "Non renseigné";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

    async function getContrat(id: string) {
      loading.value = true;
      try {
        const { data } = await ApiService.get(`/contrat/${id}`);
        // console.log('valeurs-Details',data);
        console.log('Structure de Contrat',contrat); 
        console.log('Données attributioncontrats :', contrat.value?.attributioncontrats ?? []);
        if (data?.data) {
          contrat.value = data.data;
        } else {
          throw new Error("Données du contrat non trouvées.");
        }

      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération du contrat");
      } finally {
        loading.value = false;
      }
    }

    function downloadContratDetails() {
      if (contrat.value) {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text("Détails du Contrat", 10, 10);

        const horaires = contrat.value?.horaire_personnels?.map(horaire => ([
                    horaire?.jour || "Non renseigné",
                    horaire?.heureArrivee || "Non renseigné",
                    horaire?.heureDebutPause || "Non renseigné",
                    horaire?.heureFinPause || "Non renseigné",
                    horaire?.heureDepart || "Non renseigné"
])) || [];

        const primes = contrat.value?.contratprimes?.map(prime => ([
                  prime?.typeprime?.nomPrime || "Non renseigné",
                  prime?.typeprime?.valeur || "Non renseigné",
                  prime?.quantite || "Non renseigné",
                  prime?.valeurUnitaire || "Non renseigné",
                  prime?.montant || "Non renseigné"
])) || [];

        const retenues = contrat.value?.contratretenues?.map(retenue => ([
                 retenue?.typesretenue?.nomRetenue || "Non renseigné",
                 retenue?.typesretenue?.valeur || "Non renseigné",
                 retenue?.quantite || "Non renseigné",
                 retenue?.valeurUnitaire || "Non renseigné",
                 retenue?.montant || "Non renseigné"
])) || [];

const detailsContrat = [
  ["Durée du contrat", contrat.value?.dureeContrat || "Non renseigné"],
  ["Date d'embauche", contrat.value?.datePriseFonction || "Non renseigné"],
  ["Salaire de base", contrat.value?.salaireBase || "Non renseigné"],
  ["Mode de tarification", contrat.value?.modetarification?.id || "Non renseigné"],
  ["Catégorie de contrat", contrat.value?.categorieContrat || "Non renseigné"],
  ["Période d'essai", contrat.value?.dureePeriodeEssai || "Non renseigné"],
  ["Date de fin de contrat", contrat.value?.dateFin || "Non renseigné"],
  ["Renouvelable", contrat.value?.renouvelable || "Non renseigné"],
  ["Date fin de période d'Essai", contrat.value?.dateFinperiodeEssai || "Non renseigné"],
  ["Période de Paie", contrat.value?.periodeDePaie || "Non renseigné"],
  ["Type Contrat", contrat.value?.typeContrat?.libelle || "Non renseigné"],
  ["Personnel", `${contrat.value?.personnel?.nom} ${contrat.value?.personnel?.prenom}`],
  ["Poste Occupé", contrat.value?.poste?.libelle || "Non renseigné"],
  ["Attributions", contrat.value?.attributioncontrats?.attribution?.libelle || "Non renseigné"],
];

// detailsContrat.forEach(([key, value], index) => {
//       doc.text(`${key}: ${value}`, 10, 20 + index * 8);
//     });

    autoTable(doc, {
      startY: 20,
      head: [["Champ", "Valeur"]],
      body: detailsContrat,
    });

    // Ajouter les horaires
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["Jour", "Heure d'ouverture", "Heure début pause", "Heure fin pause", "Heure de fermeture"]],
      body: horaires,
    });

    // Ajouter les primes
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["Type prime", "Valeur", "Quantité", "Valeur Unitaire", "Montant"]],
      body: primes,
    });

    // Ajouter les retenues
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["Type retenue", "Valeur", "Quantité", "Valeur Unitaire", "Montant"]],
      body: retenues,
    });

    // Sauvegarde du fichier PDF
    doc.save(`Details_Contrat_${contrat.value?.personnel?.nom || "Inconnu"}.pdf`);
  }
}
    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getContrat(id);

      } else {
        error("ID du contrat non spécifié.");
      }
    });

    return {
      contrat,
      loading,
      downloadContratDetails,
      autoTable,
      formatDate
    };
  },
});
</script>

<style scoped>
.table {
  text-align: left;
}

.tables-container {
  display: flex;
  justify-content: space-between;
}

.table-wrapper {
  flex: 1;
  margin-right: 30px; /* Séparation entre les tables */
}

/* Optionnel : pour ne pas que la dernière table ait de marge à droite */
.table-wrapper:last-child {
  margin-right: 0;
}

.label-title {
  font-weight: 600; /* Plus gras que normal (400) mais pas aussi gras que bold (700) */
  color: #333; /* Optionnel : rend le texte un peu plus foncé */
}

</style>
