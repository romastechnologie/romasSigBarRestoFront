import { ref } from 'vue';
export let src = ref('null');
export let filtered = ref(false);
export let filter = ref(false);
export let lastModified = ref(null);
export function loadFile(event, contact) {
    const file = event.target.files[0];
    src.value = URL.createObjectURL(file);
    contact.imgUrl = src.value;
}
export function collapseFilter() {
    filtered.value = !filtered.value;
}
export function collapse() {
    filter.value = !filter.value;
}
//# sourceMappingURL=contectCom.js.map