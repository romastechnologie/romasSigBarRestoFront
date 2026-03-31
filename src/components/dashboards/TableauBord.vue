<template>
    <div class="col-12">
      <div class="knowledgebase-bg">
        <img class="bg-img-cover bg-center" src="@/assets/images/knowledgebase/bg_1.jpg" alt="loginpage">
      </div>
      <div class="knowledgebase-search">
        <div colClass="col-xl-5 col-md-6 proorder-xl-1 proorder-md-1" >
          <div class="img-overlay">
            <h1>Bienvenue, {{ userName }} {{ userLastName }}</h1>
            <router-link class="btn" to="/"></router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, defineAsyncComponent } from "vue";
  import stateStore from "@/utils/store";
  import JwtService from "@/services/JwtService";
  import { useRouter } from "vue-router";
  import { useAuthStore, User } from "@/services/auth";
  
  const Card1 = defineAsyncComponent(() => import("@/components/common/card/CardData1.vue"));
  
  export default defineComponent({
    name: "TableauBord",
    setup() {
      const stateStoreInstance = stateStore;
      const router = useRouter();
      const store = useAuthStore();
      const user = ref<User>();
      const userName = ref("");
      const userLastName = ref("");
      const userEmail = ref("");
  
      onMounted(() => {
        if (JwtService.getUser()) {
          userName.value = JwtService.getUserName()!;
          userLastName.value = JwtService.getUserLastName()!;
          userEmail.value = JwtService.getUserEmail() ? JwtService.getUserEmail() : JwtService.getUserPhone()!;
        }
        user.value = store.user;
      });
  
      return {
        userEmail,
        userName,
        userLastName,
        stateStoreInstance,
        user,
      };
    },
  });
  </script>
  