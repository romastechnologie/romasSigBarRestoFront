import { defineStore } from 'pinia';
import { ref, computed } from "vue";
import { chat, chats } from "@/core/data/chat";
export const useChatStore = defineStore('chat', () => {
    let data = ref(chat);
    let messages = ref(chats);
    let all = ref(chat);
    let BOT_MSGS = ref([
        "Hi, how are you?",
        "Ohh... I can't understand what you trying to say. Sorry!",
        "I like to play games... But I don't know how to play!",
        "Sorry if my answers are not relevant. :))",
        "I feel sleepy! :(",
    ]);
    let activeuser = ref(chat[0]);
    function setSerchUsers(item) {
        data.value = all.value.filter(function (search) {
            if (search.name.toLowerCase().search(item.toLowerCase()) !== -1 && search.id !== 0)
                return search;
        });
    }
    function setActiveuser(user) {
        activeuser.value = user;
    }
    const currentChat = computed(() => {
        const user = data.value.find(user => {
            if (user.id === activeuser.value.id)
                return user;
        });
        return { ...user, 'chat': chat };
    });
    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function addChat(user) {
        let today = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        let id = activeuser.value;
        let addchat = data.value.find(chat => chat.id === activeuser.value.id);
        let r = random(0, BOT_MSGS.value.length - 1);
        let msgText = BOT_MSGS.value[r];
        let delay = msgText.split(" ").length * 100;
        let msgname = addchat.messages.name;
        addchat.messages.push({ 'sender': 1, 'name': 'Theresa Webb', 'time': today.toLowerCase(), 'text': user });
        setTimeout(function () {
            addchat.messages.push({ 'sender': 0, 'name': msgname, 'time': today.toLowerCase(), 'text': msgText });
        }, 1000);
    }
    function chatData(value, item) {
    }
    function dats(value) {
        all.value = value;
    }
    return {
        chatData,
        data,
        setSerchUsers,
        dats,
        currentChat,
        setActiveuser,
        addChat,
    };
});
//# sourceMappingURL=chat.js.map