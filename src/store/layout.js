import { defineStore } from "pinia";
import { ref } from "vue";
import { layout } from "@/core/data/layout";
export const uselayoutStore = defineStore("layout", () => {
    const layouts = ref(layout);
    const boxlayout = ref(true);
    const sidebar = ref('default');
    const svg = ref('stroke-svg');
    function setLayout(val) {
        if ((document.body.className == 'rtl' || document.body.className == 'dark-only' || document.body.className == 'light rtl') && val.class == 'dark-only') {
            document.body.className = val.class + ' rtl';
        }
        else if (val.class == 'light' && document.body.getAttribute('main-theme-layout') == 'rtl') {
            document.body.className = 'rtl';
        }
        else if (val.class == 'light' && document.body.getAttribute('main-theme-layout') == 'ltr') {
            document.body.className = 'ltr';
        }
        else if (val.class == 'light' && document.body.getAttribute('main-theme-layout') == 'box-layout') {
            document.body.className = 'box-layout';
        }
        else if (document.body.className == 'box-layout' || document.body.className == 'dark-only' || document.body.className == 'light box-layout') {
            document.body.className = val.class + ' box-layout';
        }
        else if (document.body.className == 'ltr' || document.body.className == 'dark-only' || document.body.className == 'light ltr' || document.body.className == 'light') {
            document.body.className = val.class + ' ltr';
        }
        else {
            document.body.className = val.class;
        }
    }
    document.body.setAttribute("main-theme-layout", layouts.value.settings.layout_type);
    document.getElementsByTagName("html")[0].setAttribute("dir", layouts.value.settings.layout_type);
    var primaryColor = localStorage.getItem("primary_color") || layouts.value.color.primary_color;
    var secondaryColor = localStorage.getItem("secondary_color") || layouts.value.color.secondary_color;
    var layoutVersion = localStorage.getItem("layoutVersion") || layouts.value.color.layout_version;
    if (primaryColor || secondaryColor) {
        addStyle(primaryColor, secondaryColor);
        if (layoutVersion)
            document.body.className = layoutVersion;
    }
    function addStyle(primary, secondary) {
        document.documentElement.style.setProperty("--theme-deafult", primary);
        document.documentElement.style.setProperty("--theme-secondary", secondary);
    }
    function setLayoutType(layout, val) {
        document.body.classList.remove("rtl");
        document.body.classList.remove("ltr");
        document.body.classList.remove("boxed");
        document.documentElement.removeAttribute("dir");
        document.body.setAttribute("class", val);
        document.body.setAttribute("main-theme-layout", val);
        layout.settings.layout_type = val;
        document.getElementsByTagName('html')[0].setAttribute('dir', val);
    }
    function setCustomizeSidebarType(val) {
        sidebar.value = val.type;
        localStorage.setItem("SidebarType", val);
    }
    function setSvg(svgs) {
        svg.value = svgs;
        layouts.value.settings.sidebar_icon = svgs;
    }
    function setColorScheme(color) {
        setColor(color);
        primaryColor = color.primary;
        secondaryColor = color.secondary;
        layouts.value.color.layout_version = "light";
        localStorage.setItem("layoutVersion", layouts.value.color.layout_version);
    }
    function setColor(color) {
        addStyle(color.primary, color.secondary);
        localStorage.setItem("primary_color", color.primary);
        localStorage.setItem("secondary_color", color.secondary);
        window.location.reload();
    }
    return {
        layouts,
        setLayout,
        setLayoutType,
        boxlayout,
        setCustomizeSidebarType,
        setSvg,
        svg,
        setColorScheme
    };
});
//# sourceMappingURL=layout.js.map