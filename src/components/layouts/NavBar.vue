<template>
    <v-navigation-drawer v-model="navBar" class="float-left" color="blue-grey-darken-4" active-color="selectedColor">
        <v-sheet 
          color="blue-grey-darken-4"
          class="pa-4 centralizado"
          position="relative">
            <v-avatar 
              class="mb-4"
              size="60" 
              color="surface-variant">
              <v-img src="https://media.licdn.com/dms/image/D4D03AQEm1IKLlt96ow/profile-displayphoto-shrink_800_800/0/1694730333398?e=2147483647&v=beta&t=ycSamjv4It_Bzow3HeS_KPO7O9eSQIqrkCda-lG0UCQ" cover></v-img>
            </v-avatar>
            <div >{{ store.usuario.nome }}</div>
        </v-sheet>
        <v-divider></v-divider>
        <Menu />

        <template v-slot:append>
            <v-footer color="blue-grey-darken-4">
                <v-btn
                  block
                  class="mx-auto"
                  variant="tonal"
                  @click="logout()">
                    <v-icon icon="mr-1 mdi mdi-exit-to-app" />
                    Sair
                </v-btn>
            </v-footer>
        </template>
    </v-navigation-drawer>

    <v-app-bar :elevation="2" density="compact" color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="navBar = !navBar"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Sistema de Acompanhamento - Pé de meia</v-app-bar-title>
    </v-app-bar>
</template>

<script setup>
import api from '@/plugins/api';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import Menu from './Menu.vue';
import { ref } from 'vue';

/**
 * Data
 */
const store = useAppStore();
const router = useRouter();
const navBar = ref(true);

/**
 * Methods
 */
const logout = async() => {
    store.usuario.nome = '';

    let params = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('Authorization')}`
      }
    };

    await api.get("/logout", params)
    .then(() => {
        localStorage.clear();
        router.push("/login");
    })
    .catch((error) => {
        console.log(error);
        alert("falha de comunicação com o servidor.")
    });
}
</script>

<style scoped>
.centralizado{
  text-align: center;
}
</style>