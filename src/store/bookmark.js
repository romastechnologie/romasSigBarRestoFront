import { defineStore } from 'pinia';
import { ref } from 'vue';
import { data } from "@/core/data/bookmark";
export const useBookmarkStore = defineStore('bookmark', () => {
    const favourite = ref([]);
    const activeclass = ref('pills_created');
    function add(item) {
        data.push(item);
    }
    return {
        activeclass,
        favourite,
        add
    };
});
//# sourceMappingURL=bookmark.js.map