<template>
    <div class="tab-pane fade" id="sent-pill" role="tabpanel" aria-labelledby="sent-pill-tab">
        <div class="mail-body-wrapper">
            <ul>
                <li class="inbox-data" v-for="(item, index) in sent" :key="index">
                    <div class="inbox-user">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input checkbox-primary" id="emailCheckbox1" type="checkbox"
                                value="option1" />
                            <label class="form-check-label" for="emailCheckbox1"></label>
                        </div>
                        <svg class="important-mail" @click="toggleStar(index)" :class="[{ active: activeStars[index] }]">
                            <use href="@/assets/svg/icon-sprite.svg#fill-star"></use>
                        </svg>
                        <div class="rounded-border"><img class="img-fluid" v-if="item.img" :src="getImages(item.img)"
                                alt="user" />
                            <div :class="item.circle" v-if="item.textclass">
                                <p :class="item.textclass">{{ item.text }}</p>
                            </div>
                        </div>
                        <p>{{ item.name }}</p>
                    </div>
                    <div class="inbox-message">
                        <div class="email-data" @click="toogle()"><span>{{ item.desctitle }}<span> {{ item.desc
                        }}</span></span>
                            <div class="badge " :class="item.badgeclass">{{ item.badge }}</div>
                            <div class="badge " :class="item.badgeclass1">{{ item.badge1 }}</div>
                        </div>
                        <div class="email-timing"><span>{{ item.time }}</span></div>
                        <div class="email-options"><i class="fa fa-envelope-o envelope-1 show"></i><i
                                class="fa fa-envelope-open-o envelope-2 hide"></i><i class="fa fa-trash-o trash-3"></i><i
                                class="fa fa-print"></i></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted, watch } from 'vue'
import { sent } from "@/core/data/letter-box"
import { getImages } from "@/composables/common/getImages"
let activeStars = ref<boolean[]>([])
let emit = defineEmits(['selected'])
function toggleStar(index: number) {
    activeStars.value[index] = !activeStars.value[index];
}
function toogle() {
    emit('selected');
}
</script>