<template>
    <div class="col-xxl-3 col-xl-4 col-md-5 box-col-5">
        <div class="left-sidebar-wrapper card">
            <div class="left-sidebar-chat">
                <div class="input-group"><span class="input-group-text"><vue-feather class="search-icon text-gray"
                            type="search"></vue-feather> </span>
                    <input class="form-control" type="text" placeholder="Search here.." v-model="search"
                        v-on:keyup="setSerchUsers">
                </div>
            </div>
            <div class="advance-options">
                <ul class="nav border-tab" id="chat-options-tab" role="tablist">
                    <li class="nav-item"><a class="nav-link active" id="chats-tab" data-bs-toggle="tab" href="#chats"
                            role="tab" aria-controls="chats" aria-selected="true">Chats</a></li>
                    <li class="nav-item"><a class="nav-link" id="contacts-tab" data-bs-toggle="tab" href="#contacts"
                            role="tab" aria-controls="contacts" aria-selected="false">Contacts</a></li>
                </ul>
                <div class="tab-content" id="chat-options-tabContent">
                    <div class="tab-pane fade show active" id="chats" role="tabpanel" aria-labelledby="chats-tab">
                        <div class="common-space">
                            <p>Recent chats</p>
                            <div class="header-top"><a class="btn badge-light-primary f-w-500" href="#!"><i
                                        class="fa fa-plus"></i></a></div>
                        </div>
                        <ul class="chats-user" v-if="search == ''">
                            <li class="common-space" v-for="(item, index) in activeusers" :key="index"
                                @click="setActiveuser(item)">
                                <div class="chat-time">
                                    <div class="active-profile"><img class="img-fluid rounded-circle"
                                            :src="getImages(item.img)" alt="user">
                                        <div class="status " :class="item.bgclass"></div>
                                    </div>
                                    <div> <span>{{ item.name }}</span>
                                        <p>{{ item.msg }}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>{{ item.time }} </p>
                                    <div class="badge badge-light-success" v-if="item.badge">{{ item.badge }}</div>
                                </div>
                            </li>
                        </ul>
                        <ul class="chats-user " v-if="search != ''">
                            <li class="common-space custom-scrollbar" v-for="(item, index) in store.data" :key="index"
                                @click="setActiveuserSerch(item.id)">
                                <div class="chat-time">
                                    <div class="active-profile">
                                        <img class="img-fluid rounded-circle" :src="getImages(item.img)" alt="user">
                                        <div class="status " :class="item.bgclass"></div>
                                    </div>
                                    <div> <span>{{ item.name }}</span>
                                        <p>{{ item.msg }}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>{{ item.time }} </p>
                                    <div class="badge badge-light-success" v-if="item.badge">{{ item.badge }}</div>
                                </div>
                            </li>
                            <div v-if="!store.data.length">
                                <div class="search-not-found chat-search text-center">
                                    <p> Sorry, We didn't find any results matching this search </p>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <ChatContacts />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { chat, chats } from "@/core/data/chat"
import { getImages } from "@/composables/common/getImages"
import { ref, defineAsyncComponent, computed } from 'vue'
import { useChatStore } from "@/store/chat"
const ChatContacts = defineAsyncComponent(() => import("@/components/common/ChatContacts.vue"))
const search = ref<string>('')
const store = useChatStore()


const activeusers = computed(() =>

    store.data.filter(function (user) {

        if (user.active === 'active' && user.id !== 0) return user;
    }))
function setSerchUsers() {
    if (search.value !== '')
        store.setSerchUsers(search.value);
}
function setActiveuser(user: any) {
    store.setActiveuser(user);


}
function setActiveuserSerch(id: number) {
    store.setActiveuser(id);
    search.value = '';
}
</script>