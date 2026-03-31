import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./assets/scss/app.scss"
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-rate/dist/vue-rate.css'
import "vue-multiselect/dist/vue-multiselect.css"
import "@vueform/multiselect/themes/default.css";
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import '@globalhive/vuejs-tour/dist/style.css';
import 'vue3-timeline/dist/style.css'
// import 'vue3-openlayers/dist/vue3-openlayers.css'

import VueFeather from "vue-feather";
import VueApexCharts from "vue3-apexcharts";
import Datepicker from '@vuepic/vue-datepicker';
import OpenLayersMap from 'vue3-openlayers'
import { quillEditor } from "vue3-quill";
import Lightbox from 'vue-easy-lightbox'
import rate from 'vue-rate'
import VueNumber from "vue-number-animation";
import VueJsTour from '@globalhive/vuejs-tour';
import Multiselect from 'vue-multiselect';
import AosVue from "aos-vue";
import SimpleTypeahead from 'vue3-simple-typeahead';
import { VueMasonryPlugin } from 'vue-masonry';
import vueChartist from "vue-chartist"
import { plugin } from 'vue3-timeline'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import VueTour from 'v3-tour'
import ApiService from "./services/ApiService";
import formatMontant from './directives/formatMontant'

import English from "@/core/locales/en.json"
import Russian from "@/core/locales/ru.json"
import Arabic from "@/core/locales/ar.json"
import German from "@/core/locales/ge.json"
import لعربية from "@/core/locales/ae.json"
import 简体中文 from "@/core/locales/cn.json"
import Português from "@/core/locales/pt.json"
import Français from "@/core/locales/fr.json"
import Deutsch from "@/core/locales/de.json"
import Español from "@/core/locales/es.json"

import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    legacy: false,
    locale: 'English',
    messages: {
        English: English,
        German: German,
        Russian: Russian,
        Arabic: Arabic,
        Español: Español,
        Deutsch: Deutsch,
        Français: Français,
        Português: Português,
        简体中文: 简体中文,
        لعربية: لعربية,
    }
})

const app = createApp(App);
    app.directive('format-montant', formatMontant)
    app.use(router)
    app.use(createPinia())
    app.use(VueApexCharts)
    app.use(OpenLayersMap)
    app.use(quillEditor)
    app.use(rate)
    app.use(AosVue)
    app.use(vueChartist)
    app.use(VueMasonryPlugin)
    app.use(Lightbox)
    app.use(VueNumber)
    app.use(i18n)
    app.use(VueTour)
    app.use(VueJsTour)
    app.use(plugin)
    app.use(PerfectScrollbar)
    app.use(SimpleTypeahead)
    app.component(VueFeather.name, VueFeather)
    app.component('Datepicker', Datepicker)
    app.component('multiselect', Multiselect)
    ApiService.init(createApp(App));
   // app.use(tokenVerifier, { interval: 30000 });
    app.mount('#app')

