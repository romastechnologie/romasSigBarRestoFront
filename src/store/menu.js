import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { menu } from "@/core/data/menu";
export const useMenuStore = defineStore("menu", () => {
    let data = ref(menu);
    let togglesidebar = ref(true);
    let activeoverlay = ref(true);
    let customizer = ref("");
    let searchData = ref([]);
    let searchDatas = ref([]);
    let searchOpen = ref(false);
    let hideRightArrowRTL = ref(false);
    let hideLeftArrowRTL = ref(true);
    let hideRightArrow = ref(true);
    let hideLeftArrow = ref(true);
    let width = ref(0);
    let height = ref(0);
    let margin = ref(0);
    let menuWidth = ref(0);
    let searchKey = ref('');
    let perentName = ref('');
    let subName = ref('');
    let childName = ref('');
    let bodyToggle = ref(false);
    let perentToggle = ref(false);
    let subToggle = ref(false);
    let childToggle = ref(false);
    let active = ref(false);
    onMounted(() => {
        if (window.innerWidth < 991) {
            togglesidebar.value = false;
        }
    });
    function openActives() {
        active.value = !active.value;
    }
    function togglePinned(item) {
        item.isPinned = !item.isPinned;
    }
    ;
    function toggle_sidebar() {
        togglesidebar.value = !togglesidebar.value;
        if (window.innerWidth < 991) {
            activeoverlay.value = true;
        }
        else {
            activeoverlay.value = false;
        }
        activeoverlay.value = false;
    }
    function subMenuToggle(Name) {
        perentName.value = perentName.value != Name ? Name : "";
        perentToggle.value = perentName.value != "" ? true : false;
    }
    function subChildMenu(subTitle) {
        subName.value = subName.value != subTitle ? subTitle : '';
        subToggle.value = subName.value != "" ? true : false;
    }
    function childMenu(childTitle) {
        childName.value = childName.value != childTitle ? childTitle : "";
        childToggle.value = childName.value != '' ? true : false;
    }
    function searchTerm(term) {
        const items = [];
        const searchval = term.toLowerCase();
        data.value.filter((menuItems) => {
            if (menuItems.title?.toLowerCase().includes(term) && menuItems.type === 'link') {
                items.push(menuItems);
            }
            menuItems.children?.filter((subItems) => {
                if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
                    subItems.icon1 = menuItems.icon1;
                    items.push(subItems);
                }
                if (!subItems.children)
                    return false;
                subItems.children?.filter((suSubItems) => {
                    if (suSubItems.title?.toLowerCase().includes(term)) {
                        suSubItems.icon1 = menuItems.icon1;
                        items.push(suSubItems);
                    }
                });
            });
            searchData.value = items;
        });
    }
    function searchterm(terms) {
        const items = [];
        const searchval = terms.toLowerCase();
        data.value.filter((menuItems) => {
            if (menuItems.title?.toLowerCase().includes(terms) && menuItems.type === 'link') {
                items.push(menuItems);
            }
            menuItems.children?.filter((subItems) => {
                if (subItems.title?.toLowerCase().includes(terms) && subItems.type === 'link') {
                    subItems.icon1 = menuItems.icon1;
                    items.push(subItems);
                }
                if (!subItems.children)
                    return false;
                subItems.children?.filter((suSubItems) => {
                    if (suSubItems.title?.toLowerCase().includes(terms)) {
                        suSubItems.icon1 = menuItems.icon1;
                        items.push(suSubItems);
                    }
                });
            });
            searchDatas.value = items;
        });
    }
    function setNavActive(item) {
        if (!item.active) {
            data.value.forEach((a) => {
                if (data.value.includes(item))
                    a.active = false;
                if (!a.children)
                    return false;
                a.children.forEach((b) => {
                    if (a.children.includes(item)) {
                        b.active = false;
                    }
                });
            });
        }
        item.active = !item.active;
        if (item.active) {
            bodyToggle.value = true;
        }
        else {
            bodyToggle.value = false;
        }
    }
    return {
        data,
        togglesidebar,
        activeoverlay,
        toggle_sidebar,
        setNavActive,
        customizer,
        searchTerm,
        togglePinned,
        searchterm,
        searchData,
        searchOpen,
        hideRightArrowRTL,
        hideLeftArrowRTL,
        hideRightArrow,
        hideLeftArrow,
        width,
        height,
        margin,
        menuWidth,
        searchDatas,
        bodyToggle,
        subMenuToggle,
        subChildMenu,
        childMenu,
        perentName,
        subName,
        childName,
        perentToggle,
        subToggle,
        childToggle,
        openActives,
        active
    };
});
//# sourceMappingURL=menu.js.map