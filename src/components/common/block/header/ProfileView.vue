<template>
    <div class="d-flex profile-media align-items-center">
      <img class="img-30" src="@/assets/images/dashboard/profile.jpg"
            alt="">
        <div class="flex-grow-1"><span>{{ userName? userName : "" }} {{ userLastName ? userLastName : "" }}</span>
            <p class="mb-0 font-outfit">{{ userEmail ? userEmail : "" }}<i class="fa fa-angle-down"></i></p>
        </div>
    </div>
    <ul class="profile-dropdown onhover-show-div">
        <!-- <li v-for="(item, index) in profile" :key="index"><router-link :to="item.path"><vue-feather
                    :type="item.icon"></vue-feather><span>{{ item.title }}</span></router-link></li> -->
        <li><router-link  to="/profile"><vue-feather type="user"></vue-feather><span>Mon compte</span></router-link></li>
        <!--<li><PointVenteModal/></li>-->
        <li><a @click="logout()"><vue-feather type="log-in"></vue-feather><span>Déconnexion</span></a></li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import stateStore from "@/utils/store";
import JwtService from "@/services/JwtService";
import { useRouter } from "vue-router";
import { useAuthStore, User } from "@/services/auth";
import { error,showModal } from "@/utils/utils";
import ApiService from "@/services/ApiService";
import { profile } from "@/core/data/header"
import  PointVenteModal  from "@/components/common/block/header/PointVenteModal.vue";
export default defineComponent({
  //name: "MainHeader",
  components: {
    PointVenteModal
  },    
  setup() {
    const stateStoreInstance = stateStore;
    //const isSticky = ref(false);
    const router = useRouter();
    const store = useAuthStore();
    const user = ref<User>();
    const userName = ref("");
    const userLastName = ref("");
    const userEmail = ref("");
    onMounted(() => {
      if(JwtService.getUser()){
        userName.value = JwtService.getUserName()!;
        userLastName.value = JwtService.getUserLastName()!;
        userEmail.value = JwtService.getUserEmail()! ? JwtService.getUserEmail()! : JwtService.getUserPhone()!;
      }
      user.value = store.user;
    });

    // function logout() {

    // router.replace('/auth/login');
    // localStorage.clear('user')
    // }
    const logout = () =>{
        
      ApiService.get(`/auth/logout?userName=${userName.value}&userId=${JwtService.getUser()}&`)
      .then(({ data }) => {
        //
      })
      .catch(({ response }) => { error(response.data.message);  });
      localStorage.clear()
      store.logout()
      if (!store.isAuthenticated) {
        //router.replace('/auth/login');

        router.push({name:'login'})
      }
    }


    return {
      //isSticky,
      userEmail,
      userName,
      userLastName,
      //userPhone,
      stateStoreInstance,
      logout,
      user,
      profile,
    };
  },
});
</script>