import { defineStore } from 'pinia';
import { ref } from 'vue';
import { simple, flush, multiples, multipledata, iconaccodion } from "@/core/data/uikits";
import { quik, intell, selling, users } from "@/core/data/faq";
import { news, cancals, shippeds } from "@/core/data/ecommerce";
export const useCommonStore = defineStore('Common', () => {
    let data = ref(simple);
    let flushes = ref(flush);
    let multiple = ref(multiples);
    let multi = ref(multipledata);
    let icons = ref(iconaccodion);
    let quiks = ref(quik);
    let int = ref(intell);
    let sell = ref(selling);
    let user = ref(users);
    let newitem = ref(news);
    let cancal = ref(cancals);
    let shipped = ref(shippeds);
    return {
        data,
        flushes,
        multiple,
        multi,
        icons,
        quiks,
        int,
        sell,
        user,
        newitem,
        cancal,
        shipped,
    };
});
//# sourceMappingURL=common.js.map