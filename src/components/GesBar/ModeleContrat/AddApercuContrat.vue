<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="apercucontratForm" @submit="addAperçuContrat" :validation-schema="apercucontratSchema">
          <div class="row">
      
       <div class="card mt-4">
  <div class="card-header d-flex justify-content-between align-items-center">
    <strong>Aperçu du contrat généré</strong>
    <button class="btn btn-outline-primary btn-sm" @click="imprimerApercu" :disabled="loading">
      <i class="fa fa-print me-1"></i> Imprimer
    </button>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="card-body text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement...</span>
    </div>
    <p class="mt-3 text-muted">Génération de l'aperçu en cours...</p>
  </div>

  <!-- Contenu -->
  <div v-else class="card-body apercu-contrat-body" ref="apercuContent" v-html="apercuHtml"></div>
</div>

            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button class="btn btn-outline-primary btn-sm me-3" @click="telechargerPdf" :disabled="loading || telechargement">
                  <i class="fa fa-download me-1"></i> 
                  {{ telechargement ? 'Génération...' : 'Télécharger PDF' }}
                </button>
                <router-link to="/contrats/liste-contrats" class=" btn btn-danger "><i
                    class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </template>
  <script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick,watch, computed } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
//import { ApercuContrat } from '@/models/ApercuContrat';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import Editor from '@tinymce/tinymce-vue';
import { useRoute } from 'vue-router';

interface ContratOption {
  value: number;
  label: string;
}
interface Contrat {
  id: number;
  reference?: string;
  personnel?: {
    nom: string;
    prenom?: string;
    birthdate?: string;
    sexe?: string;
    nationalite?: string;
    adresse?: string;
    situationMatrimoniale?: string;
    qualification?: string;
    cnss?: string;
  };
  typeContrat?: {
    id: number;
    libelle: string;
    description?: string;
  };
  datePriseFonction?: string;
  dateFin?: string;
  salaireBase?: number;
  dureeContrat?: number;
  poste?: { libelle: string };
  lieu?: string;
}


interface TypeContrat {
  id: number;
  libelle?: string;
  description?: string;
  modeleContrats?: ModeleContrat[];
}
interface ModeleContrat {
  id: number;
  description: string;
  date?: string;
  lieu?: string;
  salaireBaseDefaut?: number;
  conditionsSpecifiques?: string | null;
}

  export default defineComponent({
    name: "AddApercuContrat",
    components: {
    Form,
    Field,
    Editor,
    ErrorMessage,
    Multiselect
    },
    setup: () => {
    const loading = ref<boolean>(false);
    const description = ref('');
    const descriptionError = ref('');
    const isEditorReady = ref(false);
    const tinymceApiKey = ref('uz847a8s67ivk7r2bgs2dctztrtids7i68lucoaoja3btzk6'); 
    const typeContratOptions = ref([]);
    const newContrat = ref<number | null>(null);
    const typeContrat = ref<number | null>(null);
    const contratOptions = ref<ContratOption[]>([]);
    const lesContrats = ref<any>([]);
     const salaireDeBase = ref<number>(0);
    const cnss = ref('');
    const route = useRoute();
    const contratIdFromUrl = Number(route.params.id);
    const modeleHtml = ref<string>('');  // HTML brut original
    const apercuHtml = ref<string>('');  // HTML avec les données injectées
    const apercuContent = ref<HTMLElement | null>(null);
    const societe = ref<any>(null);
    const nettoyerHtmlWord = (html: string): string => {
  return html
    .replace(/\s*mso-[^;}"']+;?/gi, '')           // Supprimer styles mso-*
    .replace(/margin\s*:\s*[^;"']+/gi, '')          // Supprimer toutes les marges Word
    .replace(/margin-right\s*:\s*-[\d.]+pt/gi, '')  // Marges négatives droite
    .replace(/margin-left\s*:\s*-[\d.]+pt/gi, '')   // Marges négatives gauche
    .replace(/\slang="[^"]*"/gi, '')                 // Attributs lang inutiles
    .replace(/<a\s+name="[^"]*"><\/a>/gi, '')        // Bookmarks Word
    .replace(/\sstyle="[\s;]*"/gi, '')               // Styles vides restants
    .replace(/&nbsp;/g, ' ')
    .trim();
};


const telechargement = ref<boolean>(false);

const telechargerPdf = async () => {
  if (!apercuContent.value) return;
  telechargement.value = true;

  try {
    const response = await ApiService.postBlob(
      '/generate-pdfcontrat',
      {
        html: apercuContent.value.innerHTML,
        filename: `Contrat_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '_')}`,
      }
    );

    // ── Logs de diagnostic ──
    console.log('Status :', response.status);
    console.log('Content-Type :', response.headers['content-type']);
    console.log('Taille blob :', response.data.size, 'bytes');
    console.log('Type blob :', response.data.type);

    // Lire le contenu brut pour voir si c'est du JSON d'erreur
    const text = await response.data.text();
    console.log('Contenu brut (100 premiers chars) :', text.substring(0, 100));

    // Si c'est du JSON → c'est une erreur serveur déguisée en blob
    if (text.startsWith('{') || text.startsWith('[')) {
      console.error('Le serveur a renvoyé du JSON au lieu d\'un PDF :', text);
      error('Erreur serveur : ' + text);
      return;
    }

    const blob = response.data; 
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Contrat_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (err) {
    console.error('Erreur téléchargement PDF :', err);
    error('Erreur lors du téléchargement du PDF');
  } finally {
    telechargement.value = false;
  }
};
// Fonction utilitaire à ajouter en haut du setup
const formatDateFr = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
    const apercucontratSchema = Yup.object().shape({
    contrat: Yup.string().required("la date est obligatoire."),
    typeContrat: Yup.string().required("Le type de contrat est obligatoire."),
      });
     onMounted(async () => {
  try {
    await getSociete(SOCIETE_ID);

    if (contratIdFromUrl) {
      await getContrat(contratIdFromUrl); // va aussi charger le type de contrat
    }
    initializeEditor();
  } catch (e) {
    console.error(e);
  }
});
      watch(typeContrat, (newVal) => {
  if (newVal) {
    console.log('Type contrat sélectionné :', newVal);
    getTypeContrat(newVal);
  }
});
   const getSociete = async (id: number) => {
  try {
    const response = await ApiService.get(`/societes/${id}`);
    societe.value = response.data.data;
    console.log("Société récupérée :", societe.value);
    if (newContrat.value) {
      apercuHtml.value = injectDonneesDansModele(modeleHtml.value, newContrat.value, societe.value);
    }
  } catch (err) {
    console.error("Erreur récupération société :", err);
  }
};



const imprimerApercu = () => {
  if (!apercuContent.value) return;

  // Créer une fenêtre d'impression dédiée
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) return;

  const contenu = apercuContent.value.innerHTML;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Contrat</title>
      <style>
        /* ── Reset & base ── */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.8;
          color: #000;
          background: #fff;
        }

        .contrat-wrapper {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 20mm 25mm;
        }

        /* ── Texte ── */
        p {
          margin-bottom: 10px;
          text-align: justify;
          orphans: 3;
          widows: 3;
        }

        strong, b {
          font-weight: bold;
        }

        /* ── Soulignement : écarter le trait du texte ── */
        u, ins, span[style*="underline"], [style*="text-decoration: underline"] {
          text-decoration: underline;
          text-underline-offset: 4px;   /* ← écart entre mot et trait */
          text-decoration-thickness: 1px;
        }

        /* ── Listes ── */
        ul, ol {
          margin: 8px 0 8px 25px;
        }

        li {
          margin-bottom: 4px;
          text-align: justify;
        }

        /* ── Sauts de page ── */
        .page-break {
          page-break-before: always;
        }

        p, li {
          page-break-inside: avoid;
        }

        /* ── Styles impression ── */
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .contrat-wrapper {
            width: 100%;
            padding: 0;
            margin: 0;
          }

          @page {
            size: A4 portrait;
            margin: 20mm 25mm;
          }
        }
      </style>
    </head>
    <body>
      <div class="contrat-wrapper">
        ${contenu}
      </div>
      <script>
        // Lancer l'impression automatiquement dès que tout est chargé
        window.onload = () => {
          setTimeout(() => {
            window.print();
            window.close();
          }, 300);
        };
      <\/script>
    </body>
    </html>
  `);

  printWindow.document.close();
};


const getContrat = async (id: number) => {
  loading.value = true; // ← Démarrer le loading
  try {
    const response = await ApiService.get(`/contrat/${id}`);
    const contratData: Contrat = response.data.data;
    console.log("contrat ",contratData);

    salaireDeBase.value = contratData.salaireBase || 0;
    cnss.value = (contratData.personnel as any)?.cnss || '';
    newContrat.value = contratData.id;

    if (contratData.typeContrat?.id) {
      typeContrat.value = contratData.typeContrat.id;
      await getTypeContrat(contratData.typeContrat.id);
    }

    apercuHtml.value = injectDonneesDansModele(modeleHtml.value, contratData, societe.value);

  } catch (error) {
    console.error('Erreur récupération contrat:', error);
  } finally {
    loading.value = false; // ← Arrêter le loading dans tous les cas
  }
};
const SOCIETE_ID = 1;
const injectDonneesDansModele = (template: string, contrat: any, societe?: any): string => {
  
  const primesHtml = (() => {
  const primes = contrat?.contratprimes || contrat?.primes || [];
  if (!primes || primes.length === 0) return '';
  
  return primes
  .filter((p: any) => p?.typeprime?.nomPrime || p?.typePrime?.nomPrime) // ← exclure si pas de nom
  .map((p: any) => `
    <span>
      ${p?.typeprime?.nomPrime || p?.typePrime?.nomPrime} : 
      <strong>${Number(p?.typeprime?.valeur || 0).toLocaleString('fr-FR')} %</strong>
    </span><br/>
  `).join('');
})();

  // const total_primes = (() => {
  //   const primes = contrat?.contratprimes || contrat?.primes || [];
  //   const total = primes.reduce((acc: number, p: any) => acc + (Number(p?.montant) || 0), 0);
  //   return total > 0 ? Number(total).toLocaleString('fr-FR') : '0';
  // })();

  const variables: Record<string, string | number | undefined> = {
    // ... vos variables existantes ...
    employeur_organisation: contrat?.personnel?.organisation?.code || '',
    employeur_organisation_description: contrat?.personnel?.organisation?.nom || '',
    employeur_raison_sociale: societe?.raisonSocial || 'RAISON SOCIALE',
    employeur_adresse: societe?.adresse || 'ADRESSE NON DISPONIBLE',
    employeur_telephone: societe?.telephone || '---',
    employeur_representant: societe?.nomRep ? `${societe.nomRep} ${societe.prenomRep || ''}` : '---',

    employe_nom: `${contrat?.personnel?.nom || ''} ${contrat?.personnel?.prenom || ''}`,
    employe_naissance: formatDateFr(contrat?.personnel?.birthdate) || '',
    employe_sexe: contrat?.personnel?.sexe || '',
    employe_nationalite: contrat?.personnel?.nationalite || '',
    employe_adresse: contrat?.personnel?.adresse || '',
    employe_situation: contrat?.personnel?.situationMatrimoniale || '',
    employe_qualification: contrat?.personnel?.qualification || '',

    contrat_date_debut: formatDateFr(contrat?.datePriseFonction),
    contrat_date_fin: formatDateFr(contrat?.dateFin),
    date_signature: formatDateFr(new Date().toISOString()),
    poste: contrat?.poste?.libelle || '',
    lieu_travail: contrat?.lieu || 'Cotonou',
    salaire_base: contrat?.salaireBase || '',
    ville_signature: 'Cotonou',

    // ── Primes ──
    primes:       primesHtml
  };

  const decoderEntites = (html: string): string => {
    return html
      .replace(/&#123;/g, '{')
      .replace(/&#125;/g, '}')
      .replace(/&lbrace;/g, '{')
      .replace(/&rbrace;/g, '}');
  };

  return decoderEntites(template).replace(/{{(.*?)}}/g, (_, key) => {
    return variables[key.trim()]?.toString() || '';
  });
};

    watch(newContrat, (newVal) => {
  if (newVal) {
    console.log('Contrat sélectionné :', newVal);
    getContrat(newVal);
  }
});
    const getTypeContrat = async (id: number) => {
  try {
    const response = await ApiService.get(`/typeContrats/${id}`);
    const typecontratData: TypeContrat = response.data.data;

    // Prendre le 1er modèle disponible
    if (typecontratData.modeleContrats && typecontratData.modeleContrats.length > 0) {
  modeleHtml.value = nettoyerHtmlWord(
    typecontratData.modeleContrats[0].description || ''
  );
}

    console.log("Modèle de contrat chargé :", modeleHtml.value);
  } catch (error) {
    console.error('Erreur récupération type contrat:', error);
  }
};

   const initializeEditor = async () => {
      await nextTick(); 
      isEditorReady.value = true; 
      console.log('TinyMCE Editor initialization triggered');
    };
    const handleEditorInit = (evt: any, editor: any) => {
      console.log('TinyMCE Editor initialized:', editor);
      setTimeout(() => editor.focus(), 100); 
    };
      const modelcontratForm = ref(null);
      const router = useRouter(); 
      const addApercuContrat = async (values, {resetForm}) => {
          values.description = description.value;
          console.log("valeur contrat", values);
        ApiService.post("/apercuContrats",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeApercuContratPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
      return {loading,imprimerApercu,telechargement, telechargerPdf, modeleHtml,apercuHtml,newContrat,typeContrat,contratOptions,typeContratOptions,apercucontratSchema,addApercuContrat,modelcontratForm, descriptionError, isEditorReady,description, tinymceApiKey,handleEditorInit,  getTypeContrat,apercuContent,
       };
    },
  });
  </script>
  <style scoped>
.tinymce-wrapper {
  position: relative;
  width: 100%;
  min-height: 300px; /* Hauteur minimale pour éviter un affichage réduit */
}
.tinymce-wrapper .tox-tinymce {
  border: 1px solid #ced4da !important; /* Style cohérent avec Bootstrap */
  z-index: 1050; /* Au-dessus de la modale Bootstrap */
}
.apercu-contrat-body {
  font-family: 'Times New Roman', Times, serif;
  font-size: 12pt;
  line-height: 1.6;
  text-align: justify;
  padding: 40px 60px;        /* ← plus de padding */
  color: #000;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  width: 100%;
  max-width: 794px;
  margin: 0 auto;
  background: #fff;
}

.apercu-contrat-body * {
  max-width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;   /* Évite les coupures de mots aux bords */
}

/* Éviter les coupures de page en milieu de paragraphe */
.apercu-contrat-body p {
  page-break-inside: avoid;
  orphans: 3;
  widows: 3;
}

.apercu-contrat-body :deep(*) {
  color: #000 !important;
  max-width: 100%;
  box-sizing: border-box;
}
.apercu-contrat-body :deep(u),
.apercu-contrat-body :deep(ins),
.apercu-contrat-body :deep(span[style*="underline"]) {
  text-decoration: underline !important;
  text-decoration-color: #000 !important;
}
.apercu-contrat-body :deep(p) {
  margin-bottom: 8px;
  text-align: justify;
  orphans: 3;
  widows: 3;
  page-break-inside: avoid;
}
.apercu-contrat-body :deep(strong) {
  font-weight: bold;
  color: #000 !important;
}

/* Listes */
.apercu-contrat-body :deep(ul),
.apercu-contrat-body :deep(ol) {
  margin: 8px 0 8px 25px;
  padding: 0;
}

.apercu-contrat-body :deep(li) {
  margin-bottom: 4px;
  text-align: justify;
}
</style>