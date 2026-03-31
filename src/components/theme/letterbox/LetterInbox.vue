<template>
    <div class="tab-pane fade show active" id="inbox-pill" role="tabpanel" aria-labelledby="inbox-pill-tab">
        <div class="mail-body-wrapper">
            <ul id="paginated-list" data-current-page="1" aria-live="polite">
                <li class="inbox-data" v-for="(row, index) in get_rows()" :key="index">
                    <div class="inbox-user">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input checkbox-primary" id="emailCheckbox1" type="checkbox"
                                value="option1" />
                            <label class="form-check-label" for="emailCheckbox1"></label>
                        </div>
                        <svg class="important-mail " @click="toggleStar(index)"
                            :class="[{ active: activeStars[index] }, row.isActive]">
                            <use href="@/assets/svg/icon-sprite.svg#fill-star"></use>
                        </svg>
                        <div class="rounded-border"><img class="img-fluid" v-if="row.img" :src="getImgUrl(row.img)"
                                alt="user" />
                            <div v-if="row.textclass" :class="row.circle">
                                <p :class="row.textclass">{{ row.text }}</p>
                            </div>
                        </div>
                        <p>{{ row.name }}</p>
                    </div>
                    <div class="inbox-message">
                        <div class="email-data" @click="toogle()"><span>{{ row.desctitle }} <span>{{ row.desc
                        }}</span></span>
                            <div class="badge " :class="row.badgeclass">{{ row.badge }}</div>
                        </div>
                        <div class="email-timing"><span>{{ row.time }}</span></div>
                        <div class="email-options"><i class="fa fa-envelope-o envelope-1 show"></i><i
                                class="fa fa-envelope-open-o envelope-2 hide"></i><i class="fa fa-trash-o trash-3"
                                @click="deleteItem(row.id)"></i><i class="fa fa-print"></i></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mail-pagination">
            <button class="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page"
                v-on:click="prev()">&lt;</button>
            <div class="pagination-index" id="pagination-numbers" v-for="i in num_pages()" :key="i"
                v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)">{{ i }}</div>
            <button class="pagination-button" id="next-button" aria-label="Next page" v-on:click="change()"
                title="Next page">&gt;</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted, watch } from 'vue'
import { inbox, trash } from "@/core/data/letter-box"
let elementsPerPage = ref<number>(8)
let currentPage = ref<number>(1)
let allData = ref<any[]>([])
let activeStars = ref<boolean[]>([])
let emit = defineEmits(['selected'])
onMounted(() => { allData.value = inbox; })
function toggleStar(index: number) {
    activeStars.value[index] = !activeStars.value[index];
}
function get_rows() {
    var start = (currentPage.value - 1) * elementsPerPage.value;
    var end = start + elementsPerPage.value;
    return allData.value.slice(start, end);
}
function num_pages() {
    return Math.ceil(allData.value.length / elementsPerPage.value);
}
function change_page(page: number) {
    currentPage.value = page;
}
function change() {
    currentPage.value++;
}
function prev() {
    currentPage.value--;
}
function getImgUrl(path: string) {
    return require('@/assets/images/' + path);
}
const deleteItem = (itemId: number) => {
    const index = allData.value.findIndex((item) => item.id === itemId);

    if (index !== -1) {
        const deletedItem = allData.value.splice(index, 1)[0];
        trash.push(deletedItem);
    }
};
function toogle() {
    emit('selected');
}
</script>